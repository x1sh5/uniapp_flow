import {createStore} from "vuex";
import {toRaw,nextTick} from "vue";
//import * as signalr from "signalr-for-wx/dist/index"
//import * as signalr from "../signalr_for_uniapp/index.js"


const baseUrl = "https://www.wangyan.net"; //"https://localhost:7221"; 

const store = createStore({
	state:{
		hasLogin:false,
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
		messages:[]
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
			state.hasLogin = !state.hasLogin
		},
		updateMessage(state,payload){
			state.messages.push(payload)
		},
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
		async fetchTasks({commit,state}){
			try {
			        const response = await uni.requestWithCookie({
			          url: state.apiBaseUrl+"/api/Assignment",
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
		fetchTaskById({commit},id){
			
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