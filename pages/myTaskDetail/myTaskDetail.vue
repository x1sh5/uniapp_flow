<template>
	<view  class="newtaskbox">
		<view style="width: 90%;">
			<cardinfo :task="task" :editable="false"></cardinfo>
			<view class="ql-container">  
			    <rich-text class="ql-editor" :nodes="html"></rich-text>  
			</view>
			
			<view v-if="mode=='waitfor'">
				<button @click="edit">编辑</button>
				<button @click="del">删除</button>
			</view>
			
			<view v-if="mode=='undone'">
			</view>
			
			<view v-if="mode=='done'">
				<button @click="del">删除</button>
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
					  "deadline": "",
					  "publishtime": "0001-01-01T00:00:00",
					  "fixedReward": '',
					  "percentReward": '',
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
				},
				status:["waitfor","undone","done","announcement"]
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
		  //this.mode = op.mode
		  this.mode = this.status[this.task.status]
		  // let t  = this.$store.getters.getTaskById(id)
		  // if(t!==undefined && t!==null){
			 //  this.task  = t
		  // }
		},
		methods:{
			edit(e){
				
				uni.navigateTo({
					url:"/pages/editTask/editTask"
				})
			},
			del(e){
				let qurl = this.$store.state.apiBaseUrl+"/api/Assignment/delete/"+this.task.id;
				uni.requestWithCookie({
					url:qurl,
					method:"DELETE",
					success: (res) => {
						if(res.statusCode===204){
							uni.showToast({
								title:"删除成功。"
							});
							const pages = getCurrentPages();
							let prep = pages[pages.length-2];
							prep.removeById(this.task.id);
							uni.navigateBack();
						}
						if(res.statusCode===404){
							uni.showModal({
								content:"无效的任务。"
							})
						}
						
						if(res.statusCode===409){
							uni.showModal({
								content:"任务已被他人接取,请等待任务完成或被放弃。"
							})
						}
					}
				})
			}
			
		}
	}
</script>

<style lang="less">
	@import url('../taskDetail/taskDetail.css');
</style>
