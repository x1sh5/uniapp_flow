import {createStore} from "vuex"

const store = createStore({
	state:{
		hasLogin:false,
		branchs:[],
		taskTypes:[],
		apiBaseUrl:"https://localhost:7221/api",
		tasks:{
			status:false,
			values:[]
		}
	},
	mutations:{
		//获取部门信息
		getBranchs(state){
			uni.request({
				url:state.apiBaseUrl+"/Information/branchs",
				method:"GET",
				success(res) {
					console.log("branchs:",res.data)
					state.branchs = res.data["$values"]
				},
				fail(err) {
					uni.showModal({
						content:err.errMsg
					})
				}
			})
		},
		//获取任务类型信息
		getTaskTypes(state){
			uni.request({
				url:state.apiBaseUrl+"/Information/customtypes",
				method:'GET',
				success(res){
					console.log("tasktypes:",res.data)
					state.taskTypes = res.data["$values"]
				},
				fail(err) {
					uni.showModal({
						content:err.errMsg
					})
				}
			})
		},
		getTasks(state){
			uni.request({
				url:state.apiBaseUrl+"/Assignment",
				method:'GET',
				success(res){
					console.log("tasks:",res.data)
					state.tasks.status = true
					state.tasks.values= res.data["$values"]
				}
			})
		}
	},
	getters:{
		fetchTasks(state){
			if(state.tasks.status){
				return state.tasks.values
			}
		}
	},
	actions:{

		getTaskById({commit},id){
			
		}
	}
})

export default store