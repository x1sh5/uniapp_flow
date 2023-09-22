<template>
	<view  class="newtaskbox">
		<view >
			<taskCard :task="task" :editable="false"></taskCard>
			
			<view v-if="mode=='waitfor'">
				<button class="detail-btn" @click="contact">联系发布人</button>
				<button class="detail-btn" @click="gain">申请接取任务</button>
			</view>
			
			<view v-if="mode=='undone'">
				<button class="detail-btn" @click="contact">联系发布人</button>
				<button class="detail-btn" @click="abandon" :disabled="enable">放弃任务</button>
			</view>
			
			<view v-if="mode=='done'">
			</view>
			
		</view>
		
		<view class="driver"></view>
		<view class="relate">
			<view style="color: orangered;margin-bottom: 10px;">相关任务:</view>
			<view>
				<view v-if="ptask">
					<cardinfo @click="reloadTask(ptask)" :task="ptask" :editable="false"></cardinfo>
				</view>
			</view>
			<view>
				<view v-if="ctasks">
					<view v-for="c in ctasks" :key="c.id">
						<cardinfo @click="reloadTask(c)" style="margin-top:5px;" :task="c" :editable="false"></cardinfo>
					</view>
				</view>
				
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
				ptask: undefined,
				ctasks: undefined,
				task:{
					  "id": false,
					  "username": false,
					  "branchid": 1,
					  "description": "任务描述",
					  "finishtime": "0001-01-01T00:00:00",
					  "deadline": '',
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
			let task = this.$store.getters.getTaskById(this.id);
			if(task!==undefined){
				this.task = task
			}else{
				let qurl = this.$store.state.apiBaseUrl+"/api/Assignment/";
				uni.request({
					url: qurl,
					success: (res) => {
						
					}
				})
			}

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
		mounted() {
			let curl = this.$store.state.apiBaseUrl+"/api/Assignment/childs/"+this.task.id;
			let purl = this.$store.state.apiBaseUrl+"/api/Assignment/parent/"+this.task.id;
			
			if(!this.ptask){
				uni.request({
					url: curl,
					success:(res)=> {
						if(res.statusCode === 200){
							this.ctasks = res.data;
						}
					}
				});
			}
			
			if(!this.ctasks){
				uni.request({
					url: purl,
					success: (res) => {
						if(res.statusCode === 200){
							this.ptask = res.data;
						}
					}
				});
			}

		},
		onLoad(op) {
		  console.log("options:",op)
		  this.id = op.id
		  //this.mode = op.mode
		  this.mode = this.status[this.task.status]
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
				})
			},
			gain(e){
				let gurl = this.$store.state.apiBaseUrl+"/api/TaskRequest;
				uni.request({
					url: gurl,
					method: "POST",
					data: new {id:0,}
					success: (res)=>{
						uni.showModal({
							content: res.data,
							showCancel: false
						});
					},
					fail: (err)=>{
						uni.showModal({
							content:err
						})
					}
				})
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
			reloadTask(task){
				console.log(task.id);
				this.$store.commit("setCurrentTask",task);
				uni.redirectTo({
					url:"/pages/taskDetail/taskDetail?id="+task.id
				});
			}
		}
	}
</script>

<style lang="less">
	@import url('./taskDetail.css');
</style>
