import {createStore} from "vuex";
import {toRaw,nextTick} from "vue";
import { StorageKeys } from "../common/storageKeys.js";
//import { Publish } from "./publish.js"
import { Messages } from "./messages.js"
//import * as signalr from "signalr-for-wx/dist/index"
//import * as signalr from "../signalr_for_uniapp/index.js"


const baseUrl = "https://localhost:7221"//"https://localhost:7221"; //"https://www.wangyan.net"; 

const store = createStore({
	state:{
		$hasLogin:false,
		$userName: "未登录",
		branchs:[],
		currentTask:{},
		taskTypes:[],
		apiBaseUrl: baseUrl, //"https://testsite:7221/api", 
		tasks:new Map(),
		workSocket : new signalR.HubConnectionBuilder()
        .withUrl(baseUrl+"/chathub") //, { accessTokenFactory: () => this.loginToken }
        .configureLogging(signalR.LogLevel.Trace)
        .build(),
		messages:new Map(), //对话消息
		$currentContent:{}, //当前正在编辑的task.description
		$publishResults:[] //发布结果
	},
	mutations:{
		setCurrentTask(state,payload){
			state.currentTask = payload;
		},
		updateBranchs(state,payload){
			console.log("branchs:",payload)
			state.branchs = toRaw(payload)
		},
		updateTaskTypes(state,payload){
			console.log("taskTypes:",payload)
			state.taskTypes = toRaw(payload)
			state.tasks.set("全部",[]);
			for(let t of state.taskTypes){
				state.tasks.set(t.name,[]);
			}
		},
		setTasks(state,payload){
			console.log("tasks:",payload)
			let t = payload.taskTypeName;
			state.tasks.set(t, payload.data);
		},
		updateTasks(state,payload){
			console.log("tasks:",payload)
			let t = payload.taskTypeName;
			state.tasks.get(t).push(...payload.data);
		},
		changeLoginState(state){
			state.$hasLogin = !state.$hasLogin
			uni.setStorageSync(StorageKeys.hasLogin,state.$hasLogin);
		},
		setUserName(state,payload){
			state.$userName = payload;
			uni.setStorageSync(StorageKeys.userName,payload);
		},
		initUserName:(state)=>{
			try{
				const userName = uni.getStorageSync(StorageKeys.userName);
				state.$userName = userName;
			}catch(e){
				console.error(e)
			}
		},
		//获取本地登录标记
		initHasLogin:(state)=>{
			let hasLogin = false;
			try{
				hasLogin = uni.getStorageSync(StorageKeys.hasLogin);
			}catch(e){
				hasLogin = false;
				console.error(e);
			}
			state.$hasLogin = hasLogin;
		},
		//判断是否登录
		loginTest:(state)=>{
			let login = false;
			uni.requestWithCookie({
				url:state.apiBaseUrl+"/api/Account/loginTest",
				method:"HEAD",
				success:(res)=>{
					if(res.statusCode === 200)login = true
				}
			 });
			uni.setStorageSync(StorageKeys.hasLogin,login);
			return login;
		},
		//设置正在编辑的任务中的description
		setEditContent(state,payload){
			state.$currentContent = payload;
		},
		setPublishResults(state,payload){
			state.$publishResults = payload;
		},
		updatePublishResults(state, payload){
			console.log("call")
		  if (typeof payload.func === 'function') {
			payload.func.call(state.$publishResults, payload.data);
		  } else {
			console.error('Invalid input');
		  }
		  
		},
		clearStorageInfo(state){
			uni.removeStorageSync(StorageKeys._hasLogin);
			uni.removeStorageSync(StorageKeys._userName);
			uni.removeStorageSync(StorageKeys.__cookie_store__);
			uni.removeStorageSync(StorageKeys._task_content);
		}
	},
	getters:{
		getTasks:(state)=>(taskTypeName)=>{
			return state.tasks.get(taskTypeName)

		},
		getTaskById:(state)=>(id)=>{
			let i = state.tasks.get("全部").find(item=>item.id === parseInt(id))
			return i
			
		},
		getBranch:(state)=>(branchid)=>{
			let i = state.branchs.find(item => item.id === parseInt(branchid))
			console.log("branch is: ",i)
			if(i===undefined){
				return "部门"
			}
			return i["name"]
		},
		getTaskType:(state)=>(typeId)=>{
			console.log("typeId is ",typeId)
			console.log("taskTypes are ",state.taskTypes)
			let i = state.taskTypes.find(item => item.id === parseInt(typeId))
			console.log("taskType is: ",i)
			if(i===undefined){
				return "类型"
			}
			return i["name"]
		},
		getBranchIndex:(state)=>(branchid)=>{
			let i = state.branchs.findIndex(item => item.id === branchid)
			if(i===undefined){
				return 0
			}
			return i
		},
		getMessages:(state)=>(toUserId)=>{
			return state.messages.get(parseInt(toUserId))
		},
		currentEditContent(state){
			return state.$currentContent
		},
		publishResults(state){
			return state.$publishResults
		},
	},
	actions:{
		//获取部门信息
		async fetchBranchs({commit,state}){
			try {
			        const response = await uni.requestWithCookie({
			          url: state.apiBaseUrl+"/api/Information/branchs",
			          method: 'GET',
					  complete(){
						  
					  },
					  success:function(res){
						  console.log(res)
						  let data = res.data
						  nextTick(()=>{
							  commit('updateBranchs', data["$values"]);
						  })
					  						  
					  },
					 //  header:{
						// 'Access-Control-Allow-Origin': '*'
					 //  }
			        });

			    } catch (error) {
					// uni.showModal({
					// 	content:err.errMsg
					// })
			        console.error("fetch branchs error:",error);
			    }

		},
		//获取任务类型信息
		async fetchTaskTypes({commit,state}){
			try {
			        const response = await uni.requestWithCookie({
			          url: state.apiBaseUrl+"/api/Information/customtypes",
			          method: 'GET',
					  complete(){
					  						  
					  },
					  success:function(res){
						  console.log(res)
						  let data = res.data
						  nextTick(()=>{
							  commit('updateTaskTypes', data["$values"]);
						  })
					  						  
					  },
					 //  header:{
						// 'Access-Control-Allow-Origin': '*'
					 //  }
			        });

			    } catch (error) {
					// uni.showModal({
					// 	content:err.errMsg
					// })
			        console.error("fetch updateTaskTypes error:",error);
			    }
				
		},
		fetchTasks({commit,state},{count,offset,typeId}){
			return new Promise((resolve,reject)=> {
				uni.requestWithCookie({
				  url: state.apiBaseUrl+"/api/Assignment"+"?count="+count+"&offset="+offset+"&typeId="+typeId ,
				  method: 'GET',
				  success:(res)=>{
					  console.log(res)
					  let data = res.data
					  resolve(data);
					  
				  },
				  fail:(err)=>{
					  reject(err);
				  }
				});
			});
		},		
		async fetchTaskById({commit},id){
			let qurl = state.apiBaseUrl+"/api/Assignment/"+id;
			try {
			        const response = await uni.requestWithCookie({
			          url: qurl,
			          method: 'GET',
					  success:function(res){
						  console.log(res)
						  let data = res.data
						  nextTick(()=>{
							  commit('setTasks', data["$values"]);
						  })
						  
					  },
			        });
			    } catch (error) {
			        console.error("fetch tasks error:",error);
			    }
		},
		async sendMsg({commit,state},{user,message}){
			//SendToUser为后端api处理消息的函数，位于ChatHub中
			//state.workSocket.invoke("SendMessage", [user, message]);
			await state.workSocket.invoke("SendToUser", user, message);
			console.log("sendMsg")
			let userId = parseInt(user);
			let chat = state.messages.get(userId)
			if(typeof(chat) === 'undefined'){
				state.messages.set(userId,new Array())
			}
			state.messages.get(userId).push({isLeft: false,content: message});
			
		},
		receiveMsg({commit,state,dispatch},{user,message}){
			console.log("receiveMsg")
			let userId = parseInt(user);
			message.cid = userId;
			let chat = state.messages.get(userId)
			if(typeof(chat) === 'undefined'){
				state.messages.set(userId,new Array())
			}
			message.isLeft = true;
			state.messages.get(userId).push(message);
			dispatch('Msgs/updateAsync', message)
			
		},
	    async connect({state,actions}) {
	        // try {
	        //     await state.workSocket.start();
	        //     console.log("SignalR Connected.");
	        // } catch (err) {
	        //     console.log(err);
	        //     setTimeout(()=>{dispatch("connect");}, 5000);
	        // }
			async function reconnect() {
			      try {
			        await state.workSocket.start();
			        console.log("SignalR Connected.");
			      } catch (err) {
			        console.log(err);
			        setTimeout(reconnect, 5000);
			      }
			    }
			
			    await reconnect();
	    },
		genHistory({state},id){
			let qurl = state.apiBaseUrl + "/api/History";
			uni.uploadFileWithCookie({  
			    url: qurl,  
			    filePath: '123', // 随便填，不为空即可  
			    name: '123', // 随便填，不为空即可  
			    //header: header, // 可以加access_token等  
			    formData:{asgid:id}, // 接口参数，json格式，底层自动转为FormData的格式数据  
			    success: (res)=>{  
			            console.log(res);  
			        }  
			    });
		}

	},
	modules:{
		Msgs:Messages
	}
})

export default store