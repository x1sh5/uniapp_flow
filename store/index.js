import {createStore} from "vuex";
import {toRaw,nextTick} from "vue";
import { StorageKeys } from "../common/storageKeys.js"
//import * as signalr from "signalr-for-wx/dist/index"
//import * as signalr from "../signalr_for_uniapp/index.js"


const baseUrl = "https://localhost:7221"; //"https://www.wangyan.net"; 

const store = createStore({
	state:{
		$hasLogin:false,
		$userName: "未登录",
		branchs:[],
		taskTypes:[],
		apiBaseUrl: baseUrl, //"https://testsite:7221/api", 
		tasks:{
			status:false,
			values:[]
		},
		workSocket : new signalR.HubConnectionBuilder()
        .withUrl(baseUrl+"/chathub") //, { accessTokenFactory: () => this.loginToken }
        .configureLogging(signalR.LogLevel.Trace)
        .build(),
		messages:[],
		$currentContent:{}, //当前正在编辑的task.description
		$publishResults:[]
	},
	mutations:{
		updateBranchs(state,payload){
			console.log("branchs:",payload)
			state.branchs = toRaw(payload)
		},
		updateTaskTypes(state,payload){
			console.log("taskTypes:",payload)
			state.taskTypes = toRaw(payload)
		},
		updateTasks(state,payload){
			console.log("tasks:",payload)
			state.tasks.status = true
			state.tasks.values= payload
		},
		changeLoginState(state){
			state.$hasLogin = !state.$hasLogin
			uni.setStorageSync(StorageKeys.hasLogin,state.$hasLogin);
		},
		updateMessage(state,payload){
			state.messages.push(payload)
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
		  
		}
	},
	getters:{
		getTasks(state){
			if(state.tasks.status){
				return state.tasks.values
			}
		},
		getTaskById:(state)=>(id)=>{
			if(state.tasks.status){
				let i = state.tasks.values.find(item=>item.id === parseInt(id))
				return i
			}
			
		},
		getBranch:(state)=>(branchid)=>{
			let i = state.branchs.find(item => item.id === parseInt(branchid))
			console.log("branch is: ",i)
			if(i===undefined){
				return "部门"
			}
			return i["name"]
		},
		getTaskType:(state)=>(typeid)=>{
			console.log("typeid is ",typeid)
			console.log("taskTypes are ",state.taskTypes)
			let i = state.taskTypes.find(item => item.id === parseInt(typeid))
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
		getMessages:(state)=>{
			return state.messages
		},
		currentEditContent(state){
			return state.$currentContent
		},
		publishResults(state){
			return state.$publishResults
		}
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
		async fetchTasks({commit,state},{count,offset}){
			try {
			        const response = await uni.requestWithCookie({
			          url: state.apiBaseUrl+"/api/Assignment"+"?count="+count+"&offset="+offset ,
			          method: 'GET',
					  success:function(res){
						  console.log(res)
						  let data = res.data
						  nextTick(()=>{
							  commit('updateTasks', data["$values"]);
						  })
						  
					  },
					  complete(){
					  						  
					  }
					 //  header:{
						// 'Access-Control-Allow-Origin': '*'
					 //  }
			        });
			    } catch (error) {
					// uni.showModal({
					// 	content:err.errMsg
					// })
			        console.error("fetch tasks error:",error);
			    }

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
							  commit('updateTasks', data["$values"]);
						  })
						  
					  },
			        });
			    } catch (error) {
			        console.error("fetch tasks error:",error);
			    }
		},
		async sendMessage({commit,state},{user,message}){
			await state.workSocket.invoke("SendMessage", [user, message]);
			console.log("sendMessage")
			state.messages.push(message)
		},
		receiveMessage({commit,state},{user,message}){
			console.log("receiveMessage")
			state.messages.push(message)
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

	}
})

export default store