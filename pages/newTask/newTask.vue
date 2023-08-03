<template>
	<view data-denpend="">
		<taskCard :task="task" :editable="true"></taskCard>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				task:{
					  "id": false,
					  "username": false,
					  "branchid": 1,
					  "description": "",
					  "finishtime": "0001-01-01T00:00:00",
					  "presumedtime": false,
					  "publishtime": "0001-01-01T00:00:00",
					  "reward": '',
					  "rewardtype": 1,
					  "status": 1,
					  "title": "",
					  "typeid": false,
					  "verify": 0,
					  },
				tasks:[],
				reffer:"",
			}
		},
		computed:{

		},
		created(op) {
			console.log("created");
			console.log(op);
		},
		onLoad(op) {
			console.log("onload")
			let reffer = op.createType;
			let taskType = op.typeid;
			console.log("reffer",reffer);
			console.log("taskType",taskType);
			this.task.typeid= taskType;

		},
		methods:{

		}
	}
</script>

<style lang="less">
	
</style>
