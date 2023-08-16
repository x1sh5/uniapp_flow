<template>
	<view  class="newtaskbox">
		<view style="width: 90%;">
			<cardinfo :task="task" :editable="editable" ref="cardinfo" :mode="mode"></cardinfo>
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
			publish(){
				this.$refs.cardinfo.publish();
			}
		}
	}
</script>

<style lang="less">
	@import url('./newTask.css');
</style>
