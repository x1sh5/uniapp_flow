<template>
	<uni-nav-bar left-icon="left" leftText="返回" rightText="发布" title="内容编辑" backgroundColor="#f8f8f8"
	 @clickLeft="backEvent" @clickRight="submitEvent"></uni-nav-bar>
	<view data-denpend="">
		<taskCard v-for="(item,index) in tasks" :key="item.id" :task="item" :editable="true" :ref="'id'+item.id"></taskCard>
	</view>
	<view>
		<uni-fab :horizontal="'right'" :content="taskTypes" :showProp="'name'" @trigger="createTask"></uni-fab>
	</view>
	
</template>

<script>
	// import {Task,TaskStatus,RewardType} from "../../common/Task.js";
	// new Task(1,false,"",false,false,"","",RewardType.Fixed,TaskStatus.WaitForAccept);
	import {TaskStatus,RewardType} from "../../common/Task.js";
	export default {
		data() {
			return {
				counter:1,
				tasks:[{
					  "id": 0,
					  "username": false,
					  "branchid": 1,
					  "description": "",
					  "finishtime": "0001-01-01T00:00:00",
					  "presumedtime": false,
					  "publishtime": "0001-01-01T00:00:00",
					  "reward": '',
					  "rewardtype": RewardType.Fixed,
					  "status": TaskStatus.WaitForAccept,
					  "title": "",
					  "typeid": false,
					  "verify": 0,
					  }],
				reffer:"",
			}
		},
		computed:{
			taskTypes(){
				return this.$store.state.taskTypes
			}
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
			this.tasks[0].typeid= taskType;

		},
		methods:{
			backEvent(){
				uni.showModal({
					content:"返回后以编辑的内容将会消失，是否放弃修改。",
					success: function (res) {
						if (res.confirm) {
							uni.navigateBack();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
			},
			submitEvent(){
				for(let item of this.tasks){
					this.$refs['id'+id][0].publish()
				}
				uni.navigateBack()
			},
			createTask(e){
				console.log(e);
				this.tasks.push({
					"id": this.counter++,
					"username": false,
					"branchid": 1,
					"description": "",
					"finishtime": "0001-01-01T00:00:00",
					"presumedtime": false,
					"publishtime": "0001-01-01T00:00:00",
					"reward": '',
					"rewardtype": RewardType.Fixed,
					"status": TaskStatus.WaitForAccept,
					"title": "",
					"typeid": e.item.id,
					"verify": 0,
				})
			},
			updateTask(id,payload){
				console.log("updateTask triggered",id,payload)
				console.log(this.tasks)
				let index = this.tasks.findIndex((item)=>item.id === parseInt(id));
				console.log(index)
				if(index!== -1){
					this.tasks[index].description = payload;
					this.$refs['id'+id][0].updateT(payload);
				}
			}
		},
		mounted() {
			console.log(this.$refs)
		},
		onShow() {
			console.log(this.$refs)
		}
	}
</script>

<style lang="less">
	
</style>
