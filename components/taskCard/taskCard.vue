<template>
	<view  class="newtaskbox">
		<view style="width: 90%;">
			<cardinfo :task="task" :editable="editable"></cardinfo>
			<view class="ql-container">  
			    <rich-text class="ql-editor" :nodes="html"></rich-text>  
			</view>
			<button v-if="editable" class="editbutton" @click="editEvent">编辑内容...</button>
		</view>
	</view>
</template>

<script>
	import { StorageKeys } from "../../common/storageKeys.js";
	export default {
		name:"taskCard",
		props:{
			task:{
				type:Object,
				default(){
					return {
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
					  }
				}
			},
			editable:{
				type:Boolean,
				default(){
					return false
				}
			},
		},
		data() {
			return {
				content:{}
			}
		},
		computed:{
			html:{
				get(){
					return this.content.html;
				},
				set(value){
					this.content = value;
					this.task.description = value.html
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
				this.$store.commit("setEditContent",this.content);
				uni.navigateTo({
					url:"/pages/editor/editor?id="+this.task.id
				})
			},
			updateT(payload){
				console.log("updateT trigger")
				this.content = payload;
			},
			publish(){
				let posturl = this.$store.state.apiBaseUrl + "/api/Assignment"
				uni.requestWithCookie({
					url:posturl,
					method:"POST",
					data:this.task,
					success:(res)=> {
						if(res.statusCode === 200){
							return {success:true, message:"任务："+this.task.title+"发布成功", errMsg:"ok"}
						}else{
							return {success:false, message:"任务："+this.task.title+"发布失败", errMsg:"server error"}
						}
					},
					fail:(err)=>{
						console.error(err);
						return {success:false, message:"任务："+this.task.title+"发布失败", errMsg:"client error"}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url('./newTask.css');
</style>
