<template>
	<!-- left-icon的值为uni组件中uniicons下uniicons.css中的类名去掉前缀uniui-后得到的值 -->
	
	<view style="width: 100%;height: 115px;background-color: aliceblue;position: fixed;top: 0px;z-index: 9;">
		<uni-nav-bar left-icon="left" leftText="返回" rightText="发布" title="内容编辑" backgroundColor="#f8f8f8"
		 @clickLeft="backEvent" @clickRight="submitEvent" class="uni-navbar"></uni-nav-bar>
	</view>
	 
	<view data-denpend="" style="margin-top: 120px;">
		<taskCard v-for="(item,index) in tasks" :key="item.id" :task="item" :editable="true" :ref="'id'+item.id" 
		@check-Result="checkResult" @remove-task="removeTask" style="margin: 2px 3px;"></taskCard>
	</view>
	<view v-if="mode=='mutiple'">
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
				results: [],
				tasks:[],
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
		},
		created(op) {
			console.log("created");
			console.log(op);
		},
		onLoad(op) {
			console.log("onload")
			let reffer = op.createType;
			let branchType = op.branchid;
			this.$data.$mode = op.mode;
			
			let t = {
					  "id": 0,
					  "branchid": branchType,
					  "description": "",
					  "finishtime": "",
					  "deadline": new Date().toISOString().slice(0, 10),
					  "publishtime": "0001-01-01T00:00:00",
					  "fixedReward": 0,
					  "percentReward": 10000,
					  "rewardtype": op.mode==="single"?RewardType.Fiexd:RewardType.Percent,
					  "status": TaskStatus.WaitForAccept,
					  "title": "",
					  "canTake": 0,
					  "tag": "",
					  "verify": 0,
					  "main": 1,
					  "tag":""
					  };
			this.tasks.push(t);

		},
		methods:{
			getUuid() {
			  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			    var r = (Math.random() * 16) | 0,
			      v = c == 'x' ? r : (r & 0x3) | 0x8;
			    return v.toString(16);
			  }).replace('-','');
			},
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
			async showModal() {
			  return new Promise((resolve, reject) => {
			    uni.showModal({
				  showCancel:false,
			      title: '提示',
			      content: "还有比例未分配完整。",
			      success: function (res) {
			        if (res.confirm) {
			          resolve(); // 解决Promise表示操作成功
			        } else if (res.cancel) {
			          reject(new Error('用户取消操作')); // 拒绝Promise表示操作失败，并传递错误信息
			        }
			      },
			      fail: function (error) {
			        reject(error); // 如果 showModal 出现错误，也拒绝Promise并传递错误信息
			      }
			    });
			  });
			},
			async submitEvent(){
				if(this.mode==="mutiple"){
					let sum = this.tasks.reduce((a,b)=>{
						  if (b.rewardtype === RewardType.Percent&&b.main===0) {
							return a + b.percentReward;
						  }
						  return a;
						}, 0);
					if(sum!==10000){
						try {
						    await this.showModal(); // 等待 showModal 执行完成
							return
						    // 这里可以执行模态弹窗成功后的后续代码
						  } catch (error) {
						    // 这里可以处理模态弹窗操作失败的情况
						  }
						  
					}
				}

				this.$store.commit("setPublishResults",[]);
				for(let item of this.tasks){
					this.$refs['id'+item.id][0].check();
					
				}
				if(this.results.length>0&&this.results.every(ele=>Boolean(ele)) ){
					let posturl = this.$store.state.apiBaseUrl + "/api/Assignment/posts"
					uni.requestWithCookie({
						url:posturl,
						method:"POST",
						data:this.tasks,
						success:(res)=> {
							if(res.statusCode === 201){
								this.$store.state.$publishResults.push({success:true, message:"任务发布成功", errMsg:"ok",id:res.data.id});
								//this.afterPublish();
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
				this.results = [];
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
					"branchid": e.item.id,
					"verify": 0,
					"canTake": 1,
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
