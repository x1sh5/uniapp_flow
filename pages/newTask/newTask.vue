<template>
	<!-- left-icon的值为uni组件中uniicons下uniicons.css中的类名去掉前缀uniui-后得到的值 -->
	<uni-nav-bar left-icon="left" leftText="返回" rightText="发布" title="内容编辑" backgroundColor="#f8f8f8"
	 @clickLeft="backEvent" @clickRight="submitEvent"></uni-nav-bar>
	<view data-denpend="">
		<taskCard v-for="(item,index) in tasks" :key="item.id" :task="item" :editable="true" :ref="'id'+item.id" 
		@after-pulish="afterPulish" @remove-task="removeTask" style="margin: 2px 3px;"></taskCard>
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
					  "branchid": 1,
					  "description": "",
					  "finishtime": "0001-01-01T00:00:00",
					  "deadline": new Date().toISOString().slice(0, 10),
					  "publishtime": "0001-01-01T00:00:00",
					  "fixedreward": '',
					  "percentreward": '',
					  "rewardtype": RewardType.Fixed,
					  "status": TaskStatus.WaitForAccept,
					  "title": "",
					  "typeId": false,
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
			let taskType = op.typeId;
			console.log("reffer",reffer);
			console.log("taskType",taskType);
			this.tasks[0].typeId= taskType;

		},
		methods:{
			backEvent(){
				if(this.tasks.length>0){
					uni.showModal({
						content:"返回后以编辑的内容将会消失，是否放弃修改。",
						success: function (res) {
							if (res.confirm) {
								uni.navigateBack();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else{
					uni.navigateBack();
				}
				
			},
			submitEvent(){
				let results = [];
				for(let item of this.tasks){
					let res = this.$refs['id'+item.id][0].publish();
					results.push(res)
				}
				if(results.every(ele=>Boolean(ele)) ){
					uni.navigateTo({
						url:"/pages/publishResult/publishResult"
					})
				}

			},
			createTask(e){
				console.log(e);
				//this.$store.commit('publish/createTask',{})
				this.tasks.push({
					"id": this.counter++,
					"username": false,
					"branchid": 1,
					"description": "",
					"finishtime": "0001-01-01T00:00:00",
					"deadline": '',
					"publishtime": "0001-01-01T00:00:00",
					"fixedreward": '',
					"percentreward": '',
					"rewardtype": RewardType.Fixed,
					"status": TaskStatus.WaitForAccept,
					"title": "",
					"typeId": e.item.id,
					"verify": 0,
				})
			},
			updateTask(id,payload){
				//{ctx:res, files: lastFiles}
				console.log("updateTask triggered",id,payload)
				console.log(this.tasks)
				let index = this.tasks.findIndex((item)=>item.id === parseInt(id));
				console.log(index)
				if(index!== -1){
					this.tasks[index].description = payload.html;
					this.$refs['id'+id][0].updateT(payload);
				}
			},
			//发布成功后，移除task
			afterPublish(id){
				let index = this.tasks.findIndex((item)=>item.id === parseInt(id));
				this.tasks.splice(index,1);
			},
			removeTask(id){
				let index = this.tasks.findIndex((item)=>item.id === parseInt(id));
				this.tasks.splice(index,1);
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
