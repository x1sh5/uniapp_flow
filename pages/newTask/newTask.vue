<template>
	<view style="width: 100%;height: 60px;"></view>
	<!-- left-icon的值为uni组件中uniicons下uniicons.css中的类名去掉前缀uniui-后得到的值 -->
	<uni-nav-bar left-icon="left" leftText="返回" rightText="发布" title="内容编辑" backgroundColor="#f8f8f8"
	 @clickLeft="backEvent" @clickRight="submitEvent"></uni-nav-bar>
	<view data-denpend="">
		<taskCard v-for="(item,index) in tasks" :key="item.id" :task="item" :editable="true" :ref="'id'+item.id" 
		@check-Result="checkResult" @remove-task="removeTask" style="margin: 2px 3px;"></taskCard>
	</view>
	<view v-if="mode=='mutiple'">
		<uni-fab :horizontal="'right'" :content="taskTypes" :showProp="'name'" @trigger="createTask"></uni-fab>
	</view>
	<view class="pay-container">
		<view class="balance">金额：{{ balance }}</view>
		<button @click="pay">支付</button>
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
				results: [],
				tasks:[{
					  "id": 0,
					  "branchid": 1,
					  "description": "",
					  "finishtime": "",
					  "deadline": new Date().toISOString().slice(0, 10),
					  "publishtime": "0001-01-01T00:00:00",
					  "fixedReward": 0,
					  "percentReward": 10000,
					  "rewardtype": RewardType.Percent,
					  "status": TaskStatus.WaitForAccept,
					  "title": "",
					  "typeId": false,
					  "verify": 0,
					  "main": 1
					  }],
				reffer:"",
				$mode: ''
			}
		},
		computed:{
			taskTypes(){
				return this.$store.state.taskTypes
			}
			,mode(){
				return this.$data.$mode
			},
			balance(){
				const fixs = this.tasks.reduce((newarr,item)=>{
					if(item.rewardtype === RewardType.Fiexd)newarr.push(item);
					return newarr;
				}, []);
				const sum = fixs.reduce((total, obj) => total +obj.fixedReward, 0);
				return sum/100;
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
			this.$data.$mode = op.mode;
			
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
			checkResult(data){
				this.results.push(data)
			},
			submitEvent(){
				this.$store.commit("setPublishResults",[]);
				for(let item of this.tasks){
					this.$refs['id'+item.id][0].check();
					
				}
				if(this.results.every(ele=>Boolean(ele)) ){
					let posturl = this.$store.state.apiBaseUrl + "/api/Assignment/posts"
					uni.requestWithCookie({
						url:posturl,
						method:"POST",
						data:this.tasks,
						success:(res)=> {
							if(res.statusCode === 201){
								this.$store.state.$publishResults.push({success:true, message:"任务发布成功", errMsg:"ok"});
								this.afterPublish();
							}else{
								this.$store.state.$publishResults.push({success:false, message:"任务发布失败", errMsg:"server error"})
							}
							
						},
						complete(){
							this.results = []
						}
					});
					uni.navigateTo({
						url:"/pages/publishResult/publishResult"
					})
				}

			},
			rewardType(tasktype){
				let t =  this.$store.getters.getTaskType(tasktype)
				if(t.rewardType === "only fixed"){
					return RewardType.Fiexd;
				}
				else if(t.rewardType === "only percent"){
					return RewardType.Percent;
				}
				else{
					return RewardType.Percent;
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
					"finishtime": "",
					"deadline": new Date().toISOString().slice(0, 10),
					"publishtime": "0001-01-01T00:00:00",
					"fixedReward": 0,
					"percentReward": 0,
					"rewardtype": this.rewardType(e.item.id),
					"status": TaskStatus.WaitForAccept,
					"title": "",
					"typeId": e.item.id,
					"verify": 0,
					"main": 0
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
				this.tasks = [];
			},
			removeTask(id){
				let index = this.tasks.findIndex((item)=>item.id === parseInt(id));
				this.tasks.splice(index,1);
			},
			pay(e){
				uni.requestPayment({
					timeStamp: Date.now(),
					nonceStr: '',
					package: '',
					paySign: '',
					success:(res)=>{
						
					},
					fail: (err)=>{
						
					}
				})
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
	@import url("./newTask.css");
</style>
