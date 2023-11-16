export const References = {
	namespaced: true,
	state:{
		//存储参考区间的竖直对象
		datas: new Array(),
	},
	getters:{
		refers(state){
			return state.datas
		},
		getReferById: (state)=>(id)=>{
			let r = state.datas.find(item=>item.id=== parseInt(id) );
			if(r!== void 0){
				return r;
			}
		}
	},
	mutations:{
		updateRefers(state,payload){
			if(payload){
				state.datas = payload;
			}
		}
	},
	actions:{
		
	}
	
}