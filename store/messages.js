import { ChatChannel } from "../common/customTypes.js";

export const Messages = {
	namespaced: true,
	state:{
		//objs obj like {cid:int,unread:int,title:string,lasttime:datatime,message:string,mtype:default 1}
		$chatChannels:[],
		
	},
	mutations:{
		addChat(state, payload){
			if(payload instanceof ChatChannel){
				state.$chatChannels.push(payload);
				uni.setStorage({
					key:'cc'+payload.cid,
					data:payload
				});
			}
		},
		delete(state, payload){
			let index = state.$chatChannels.findIndex(item=>item.cid == payload.cid );
			if(index!== -1){
				state.$chatChannels.splice(index,1);
			}
		},
		update(state, payload){
			let cco = commit("getById",payload.cid);
			if(!cco){
				return;
			}
			if(payload&&payload.title){
				cco.title = payload.title;
			}
			if(payload&&payload.lasttime){
				cco.lasttime = payload.lasttime;
			}
			if(payload&&payload.message){
				cco.message = payload.message;
			}
			cco.unread +=1;
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