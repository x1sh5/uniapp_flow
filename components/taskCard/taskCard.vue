<template>
	<view  class="newtaskbox" @check-Result="checkResult">
		<view style="width: 90%;">
			<cardinfo :task="task" :editable="editable" ref="cardinfo" :mode="mode" 
			@remove-task="removeTask" ></cardinfo>
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
					  "deadline": "",
					  "fixedReward": '',
					  "percentReward": '',
					  "publishtime": "0001-01-01T00:00:00",
					  "rewardtype": 1,
					  "status": 1,
					  "title": "",
					  "typeId": false,
					  "verify": 0,
					  "main": 0
					  }
				}
			},
			editable:{
				type:Boolean,
				default(){
					return false
				}
			},
			mode:{
				type:String,
				default(){
					return 'done'
				}
			}
		},
		data() {
			return {
				content:{}
			}
		},
		computed:{
			html:{
				get(){
					if(this.content.html===void 0){
						this.setContent(this.task.description)
						return this.task.description;
					}
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
		  this.$data.task.typeId = op.typeId
		  console.log("typeId is ",this.$data.task.typeId)
		},
		methods:{
			editEvent(e){
				this.$store.commit("setEditContent",this.content);
				uni.navigateTo({
					url:"/pages/editor/editor?id="+this.task.id
				})
			},
			setContent(value){
				this.content.html = value
			},
			updateT(payload){
				//{ctx:res, files: lastFiles}
				console.log("updateT trigger",payload)
				for(let file of payload.files){
					let index = payload.ctx.delta.ops.indexOf(x=>x.attributes&&x.attributes["data-local"] === file.path)
					uni.uploadFileWithCookie({
					            url: this.$store.state.apiBaseUrl+"/api/Image/upload",
					            filePath: file.path,
					            name: file.name,
								success: (res) => {
									let data = JSON.parse(res.data)
									if((''+res.statusCode).startsWith('2')){
										let search = "<img src=\""+file.path+"\" data-local=\""+file.path+"\" alt=\"图像\">";
										let replace = "<img src=\""+this.$store.state.apiBaseUrl+"/flow/static/"+data.$values[0].url+"\">"
										console.log(search,replace)
										let newHtml = payload.ctx.html.replace(search,replace)
										console.log(newHtml)
										this.$refs.cardinfo.updateDes(newHtml)
									}
								}
						});
				}
				this.content = payload.ctx;
				
			},
			check(){
				return this.$refs.cardinfo.check();
			},
			checkResult(data){
				this.$emit("check-Result",data);
			},
			put(){
				return this.$refs.cardinfo.put();
			},
			//task发布成功成功后
			afterPublish(e){
				this.$emit('after-publish',e)
			},
			removeTask(e){
				this.$emit('remove-task',e)
			}
		}
	}
</script>

<style lang="less">
	@import url('./newTask.css');
</style>
