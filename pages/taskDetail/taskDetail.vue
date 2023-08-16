<template>
	<view  class="newtaskbox">
		<view style="width: 90%;">
			<cardinfo :task="task" :editable="false"></cardinfo>
			<view class="ql-container">  
			    <rich-text class="ql-editor" :nodes="html"></rich-text>  
			</view>
			
			<view v-if="mode=='show'">
				<button @click="contact">联系发布人</button>
				<button @click="gain">接取任务</button>
			</view>
			
			<view v-if="mode=='todo'">
				<button @click="contact">联系发布人</button>
				<button @click="abandon">放弃任务</button>
			</view>
			
			<view v-if="mode=='done'">
			</view>
			
		</view>
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
					  "description": "任务描述",
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
				mode:{
					type:String,
					default(){
						return "done"
					}
				}
				}
		},
		computed:{
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
		  let t  = this.$store.getters.getTaskById(id)
		  if(t!==undefined && t!==null){
			  this.task  = t
		  }
		},
		methods:{
			editEvent(e){
				uni.navigateTo({
					url:"/pages/editor/editor"
				})
			},
			contact(e){
				uni.navigateTo({
					url:"/pages/chat/chat"
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
					success: (res) => {
						if(res.statusCode !== 204){
							uni.showModal({
								content: "网络出错"
							})
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
