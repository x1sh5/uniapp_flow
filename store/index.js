import {createStore} from "vuex"
import {toRaw} from "vue"
import {HubConnectionBuilder,LogLevel} from "@microsoft/signalr"

const store = createStore({
	state:{
		hasLogin:false,
		branchs:[],
		taskTypes:[],
		apiBaseUrl: "https://localhost:7221/api", //"https://www.wangyan.net/api",
		tasks:{
			status:false,
			values:[]
		},
		workSocket : new HubConnectionBuilder()
        .withUrl("/chathub") //, { accessTokenFactory: () => this.loginToken }
        .configureLogging(LogLevel.Information)
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
			        const response = await uni.request({
			          url: state.apiBaseUrl+"/Information/branchs",
			          method: 'GET',
					 //  header:{
						// 'Access-Control-Allow-Origin': '*'
					 //  }
			        });
			        const data = response.data;
			        commit('updateBranchs', data["$values"]);
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
			        const response = await uni.request({
			          url: state.apiBaseUrl+"/Information/customtypes",
			          method: 'GET',
					 //  header:{
						// 'Access-Control-Allow-Origin': '*'
					 //  }
			        });
			        const data = response.data;
			        commit('updateTaskTypes', data["$values"]);
			    } catch (error) {
					// uni.showModal({
					// 	content:err.errMsg
					// })
			        console.error("fetch updateTaskTypes error:",error);
			    }
				
		},
		async fetchTasks({commit,state}){
			try {
			        const response = await uni.request({
			          url: state.apiBaseUrl+"/Assignment",
			          method: 'GET',
					 //  header:{
						// 'Access-Control-Allow-Origin': '*'
					 //  }
			        });
			        const data = response.data;
			        commit('updateTasks', data["$values"]);
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
			await state.workSocket.invoke("SendMessage", user, message);
			state.messages.push(message)
		},
	    async connect({state,actions}) {
	        try {
	            await state.workSocket.start();
	            console.log("SignalR Connected.");
	        } catch (err) {
	            console.log(err);
	            setTimeout(actions.connect, 5000);
	        }
	    },	
	}
})

export default store