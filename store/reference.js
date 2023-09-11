export const References = {
	namespaced: true,
	state:{
		datas: new Array(),
	},
	getters:{
		refers(state){
			return state.datas
		},
		getReferById: (state)=>(id)=>{
			let index = state.datas.find(item=>item.id===id);
			if(index!==-1){
				return state.datas[index]
			}
		}
	},
	mutations:{
		
	},
	actions:{
		
	}
	
}