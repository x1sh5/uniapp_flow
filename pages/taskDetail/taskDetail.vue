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
			
			<view v-else>
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
			console.log("created")//1
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
			console.log("mounted")//3
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
		  console.log("options:",op)//2
		  this.id = op.id;
		  
		  let task = this.$store.getters.getTaskById(this.id);
		  if(task!==undefined){
		  	this.task = task
		  }else{
		  	let qurl = this.$store.state.apiBaseUrl+"/api/Assignment/"+this.id;
		  	uni.requestWithCookie({
		  		url: qurl,
		  		success: (res) => {
		  			if(res.statusCode==200){
		  				this.task = res.data
		  			}
		  		}
		  	})
		  }
		  
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
				let gurl = this.$store.state.apiBaseUrl+"/api/TaskRequest";
				uni.showModal({
					editable:true,
					title:"输入留言。",
					placeholderText:"输入留言。",
					success: (res) => {
						if (res.confirm) {
							uni.requestWithCookie({
								url: gurl,
								method: "POST",
								data: {  id: 0,
											  userId: 0,
											  title: this.task.title,
											  typeid: this.task.typeid,
											  taskId: this.task.id,
											  agree: 2,
											  requestDate: new Date(),
											  agreeDate: new Date(),
											  comment: res.content},
								success: (result)=>{
									uni.showModal({
										content: result.data,
										showCancel: false
									});
								},
								fail: (err)=>{
									uni.showModal({
										content:err
									})
								}
							})
						}
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
						}else{
							uni.showModal({
								content: "已放弃该任务。"
							})
						}
						this.$data.$enable = true;
						this.$store.commit("updateTaskById",this.task.id); 
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
