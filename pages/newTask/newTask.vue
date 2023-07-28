<template>
	<view  class="newtaskbox">
		<view style="width: 90%;">
			<cardinfo :task="task" :editable="true"></cardinfo>
			<view class="ql-container">  
			    <rich-text class="ql-editor" :nodes="html"></rich-text>  
			</view>
			<button class="editbutton" @click="editEvent">编辑内容...</button>
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
					  "description": "",
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
					return uni.getStorageSync("html")
				}
			},
		},
		onLoad(op) {
		  console.log("options:",op)
		  this.$data.task.typeid = op.typeid
		  console.log("typeid is ",this.$data.task.typeid)
		},
		methods:{
			editEvent(e){
				uni.navigateTo({
					url:"/pages/editor/editor"
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('./newTask.css');
</style>
