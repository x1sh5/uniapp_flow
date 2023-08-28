import { ChatChannel } from "../common/customTypes.js";

export const Messages = {
	namespaced: true,
	state:{
		//objs obj like {cid:int,unread:int,title:string,lasttime:datatime,message:string,mtype:default 1}
		$chatChannels:[],
		
	},
	mutations:{
		addChat(state, payload){
			if(payload){
				state.$chatChannels.push(payload);
				uni.setStorage({
					key:'cc'+payload.cid,
					data:payload
				});
			}
		},
		delete(state, payload){
			let index = state.$chatChannels.findIndex(item=>item.cid == parseInt(payload.cid));
			if(index!== -1){
				state.$chatChannels.splice(index,1);
			}
			//this.dispatch('someAction'); // 在 mutations 中调用 action
		},
		update(state, payload){
			//this.commit('getById', payload.cid) //this.getById(payload.cid)
			let cco;
			let cc = state.$chatChannels.findIndex(item=>item.cid == parseInt(payload.cid));
			if(cc!== -1){
				cco = state.$chatChannels[cc];
			}
			if(!cco){
				this.commit('Msgs/addChat',payload);
				return;
			}
			if(payload&&payload.title){
				cco.title = payload.title;
			}
			if(payload&&payload.date){
				cco.date = payload.date;
			}
			if(payload&&payload.content){
				cco.content = payload.content;
			}
			if(cco.unread){
				cco.unread += 1
			}else{
				cco.unread = 1
			}
		},
		getById(state, payload){
			let cc = state.$chatChannels.findIndex(item=>item.cid == parseInt(payload));
			if(cc!== -1){
				return state.$chatChannels[cc];
			}
			return null;
		},
		exists(state, payload){
			let index = state.$chatChannels.findIndex(item=>item.cid==parseInt(payload));
			if(index!==-1){
				return true;
			}
			return false;
		},
		initChatChannels(state){
			const res = uni.getStorageInfoSync();
			let ccs = res.keys.filter(item=>item.startsWith('cc'));
			for(let name of ccs){
				state.$chatChannels.push(uni.getStorageSync(name));
			}
			
		}
		
	},
	getters:{
		getCcById:(state)=>(id)=>{
			
		}
	},
	actions:{
		addChatAsync({commit, state},payload){
			commit("addChat",payload);
		},
		deleteAsync({commit, state},payload){
			commit("delete",payload);
		},
		updateAsync({commit, state},payload){
			commit("update",payload);
		},
		getByIdAsync({commit, state},payload){
			return new Promise((resolve,reject)=>{
				setTimeout(
					()=>{
						resolve(commit('getById',payload));
					},
				2000);
				
			}) 
		},
		existsAsync({commit, state},payload){
			return new Promise((resolve,reject)=>{
				setTimeout(
					()=>{
						resolve(commit('exists',payload));
					},
				2000);
				
			}) 
		}
	}
}