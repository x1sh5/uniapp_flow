/**
 * 文件缓存
 */
export const FileCache = {
	namespaced: true,
	state:{
		filename:[],
		filePath:[]
	},
	getters:{
		getFile:(state)=>(name)=>{
			name =  name.split("?")[0];
			name = name.split("https://liusha-images.oss-cn-chengdu.aliyuncs.com/")[1];
			let index = state.filename.findIndex(fname=>fname==name);
			if(index!=-1){
				return state.filePath[index]
			}
			return undefined;
		}
	},
	mutations:{
		add(state,fname,fpath){
			fname =  fname.split("?")[0];
			fname = fname.split("https://liusha-images.oss-cn-chengdu.aliyuncs.com/")[1];
			let index = state.filename.findIndex(name=>name==fname);
			if(index!=-1){
				state.filePath[index]=fpath
			}else{
				if(state.filename.length>40){
					state.filename.shift();
					state.filePath.shift();
				}
			}
		},
		remove(state,fname){
			let index = state.filename.findIndex(fname=>fname==name);
			if(index!=-1){
				state.filename.splice(index,1);
				state.filePath.splice(index,1);
			}
		}
	},
	actions:{
		
	}
}