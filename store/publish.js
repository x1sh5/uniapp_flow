export const Publish = {
	namespaced: true,
	state:{
		a:"name",
		counter:1,
		tasks:[{
			  "id": 0,
			  "branchid": 1,
			  "description": "",
			  "finishtime": "0001-01-01T00:00:00",
			  "deadline": '0001-01-01T00:00:00',
			  "publishtime": "0001-01-01T00:00:00",
			  "fixedReward": '',
			  "percentReward": '',
			  "rewardtype": RewardType.Fixed,
			  "status": TaskStatus.WaitForAccept,
			  "title": "",
			  "tag": "",
			  "verify": 0,
			  }],
		reffer:"",
	},
	mutations:{
		createTask({state},e){
			state.counter++;
			state.tasks.push(e)
		},
		updateTask({state},{id,payload}){
			let index = state.tasks.findIndex((item)=>item.id === parseInt(id));
			console.log(index)
			if(index!== -1){
				state.tasks[index].description = payload.html;
				this.$refs['id'+id][0].updateT(payload);
			}
		}
	},
	getters:{
		
	},
	actions:{
		
	}
}
// default Publish=Publish;