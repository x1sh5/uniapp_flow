export class ChatChannel{
	cid;
	unread;
	title;
	lasttime;
	message;
	mtype=1;//default 1
	constructor(cid,unread,title,lasttime,message,mtype=1){
		this.cid = cid;
		this.unread = unread;
		this.title = title;
		this.lasttime = lasttime;
		this.message = message;
		this.mtype = mtype;
	}
}

export const Messages = {
	namespaced: true,
	state:{
		//objs obj like {cid:int,unread:int,title:string,lasttime:datatime,message:string,mtype:default 1}
		chatChannels:[]
	},
	mutations:{
		add({state}, payload){
			if(payload instanceof ChatChannel){
				state.ChatChannel.push(payload);
			}
		},
		delete({state}, payload){
			let index = state.chatChannels.findIndex(item=>item.cid == payload.cid );
			if(index!== -1){
				state.chatChannels.splice(index,1);
			}
		},
		update({state,commit}, payload){
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
		getById({state}, payload){
			let cc = state.chatChannels.findIndex(item=>item.cid == parseInt(payload));
			if(cc!== -1){
				return state.chatChannels[cc];
			}
			return null;
		},
		exists({state}, payload){
			let index = state.chatChannels.findIndex(item=>item.cid==parseInt(payload));
			if(index!==-1){
				return true;
			}
			return false;
		},
	},
	getters:{
		
	},
	actions:{
		add({commit, state},payload){
			commit("add",payload);
		},
		delete({commit, state},payload){
			commit("delete",payload);
		},
		update({commit, state},payload){
			commit("update",payload);
		},
		getById({commit, state},payload){},
		exists({commit, state},payload){
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