<template>
	<view  class="newtaskbox">
		<view style="width: 90%;">
			<cardinfo :task="task" :editable="false"></cardinfo>
			<view class="ql-container">  
			    <rich-text class="ql-editor" :nodes="html"></rich-text>  
			</view>
			
			<view v-if="mode=='waitfor'">
				<button @click="contact">联系发布人</button>
				<button @click="gain">接取任务</button>
			</view>
			
			<view v-if="mode=='undone'">
				<button @click="contact">联系发布人</button>
				<button @click="abandon" :disabled="enable">放弃任务</button>
			</view>
			
			<view v-if="mode=='done'">
			</view>
			
		</view>
	</view>
</template>

<script>
	import { ChatChannel } from "../../common/customTypes.js";
	export default {
		data() {
			return {
				$enable:false,
				task:{
					  "id": false,
					  "username": false,
					  "branchid": 1,
					  "description": "任务描述",
					  "finishtime": "0001-01-01T00:00:00",
					  "presumedtime": false,
					  "publishtime": "0001-01-01T00:00:00",
					  "reward": '',
					  "rewardtype": 1,
					  "status": 1,
					  "title": "",
					  "typeId": false,
					  "verify": 0,
					  },
				mode:{
					type:String,
					default(){
						return "done"
					}
				}
				}
		},
		created() {
			this.task = this.$store.state.currentTask;
		},
		computed:{
			enable(){
				return this.$data.$enable;
			},
			html:{
				get(){
					return this.task.description
				}
			},
		},
		onLoad(op) {
		  console.log("options:",op)
		  const id = op.id
		  this.mode = op.mode
		  // let t  = this.$store.getters.getTaskById(id)
		  // if(t!==undefined && t!==null){
			 //  this.task  = t
		  // }
		},
		methods:{
			editEvent(e){
				uni.navigateTo({
					url:"/pages/editor/editor"
				})
			},
			contact(e){
				uni.navigateTo({
					url:"/pages/chat/chat?cid="+this.task.id+"&userName="+this.task.username+"&userId="+this.task.userId,
					success:()=> {
						let cc = new ChatChannel(this.task.id,0,this.task.username,new Date(),"");
						this.$store.dispatch("Msgs/addAsync",cc);
					}
				})
			},
			gain(e){
				console.log("接取任务")
				let url = this.$store.state.apiBaseUrl+"/api/Assignment/take/"+this.task.id;
				uni.requestWithCookie({
					url:url,
					success: (res) => {
						if(res.statusCode === 200){
							if(res.data.data.success){
								uni.showModal({
									content: res.data.message
								})
							}else{
								uni.showModal({
									content: res.data.data.reason
								})
							}
						}else{
							uni.showModal({
								content: "网络出错"
							})
						}

					},
					fail:(err)=>{
						console.log("failed")
						uni.showModal({
							content: err
						})
					}
				});
			},
			abandon(e){
				let url = this.$store.state.apiBaseUrl+"/api/AssignmentUser/abandon/"+this.task.id;
				uni.requestWithCookie({
					url:url,
					method:"DELETE",
					success: (res) => {
						if(res.statusCode !== 204){
							uni.showModal({
								content: "网络出错"
							})
						}
						this.$data.$enable = true;
						const pages = getCurrentPages();
						if (pages.length >= 2) {
							const holdTask = pages[pages.length - 2]; // 获取页面A的实例
							holdTask.removeItem(this.task.id); // 修改页面A的属性a1的值
						}
				},
				});
			},
		}
	}
</script>

<style lang="less">
	@import url('./taskDetail.css');
</style>
