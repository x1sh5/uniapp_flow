<template>
	<view  class="newtaskbox">
		<view style="width: 90%;">
			<cardinfo :task="task" :editable="false"></cardinfo>
			<view class="ql-container">  
			    <rich-text class="ql-editor" :nodes="html"></rich-text>  
			</view>
			
			<view>
				<button @click="contact">联系发布人</button>
				<button @click="gain">接取任务</button>
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
			}
		}
	}
</script>

<style lang="less">
	@import url('./taskDetail.css');
</style>
