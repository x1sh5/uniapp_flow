<template>
	<view>
		<view class="simplecard">
			<view style="width: 75%;height: 40px;">{{title}}</view>
			<view class="sc-comment" placeholder="留言...">{{comment}}</view>
			<view>申请人：</view>
			<view style="display: flex;flex-direction: row;">
				<view class="">{{simpleInfo.userName}}</view>
				<button @click="contact">联系</button>
			</view>
			
			<view v-show="showbutton&&simpleInfo.agree===2" style="display: flex;flex-direction: row;">
				<button @click="agree">同意</button>
				<button @click="disagree">拒绝</button>
			</view>
			<view v-if="simpleInfo.agree===0">
				已拒绝
			</view>
			<view v-if="simpleInfo.agree===1">
				已同意
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"simpleCard",
		data() {
			return {

			};
		},
		props:{
			simpleInfo:Object,
			showbutton:true
		},
		methods:{
			agree(e){
				console.log("接取任务")
				let url = this.$store.state.apiBaseUrl+"/api/Assignment/take/"+this.simpleInfo.id;
				uni.requestWithCookie({
					url:url,
					success: (res) => {
						if(res.statusCode === 200){
							if(res.data.data.success){
								uni.showModal({
									content: res.data.message
								});
								this.simpleInfo.agree=1;
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
			disagree(e){
				let url = this.$store.state.apiBaseUrl+"/api/TaskRequest/disagree/"+this.simpleInfo.id;
				uni.requestWithCookie({
					url:url,
					method: "PUT",
					data: this.simpleInfo,
					success: (res) => {
						if(res.statusCode===200){
							uni.showModal({
								showCancel: false,
								content: res.data
							});
							this.simpleInfo.agree=0;
						}else{
							uni.showModal({
								showCancel: false,
								content: res.data.title
							});
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
			contact(e){
				
				uni.navigateTo({
					url:"/pages/chat/chat?cid="+this.simpleInfo.taskId+
						"&userName="+this.simpleInfo.userName+"&userId="+this.simpleInfo.userId,
				})
			}
		},
		computed:{
			title(){
				if(this.simpleInfo&&this.simpleInfo.title){
					return this.simpleInfo.title;
				}
				return "标题出错";
			},
			type(){
				if(this.simpleInfo&&this.simpleInfo.tag){
					//return this.$store.getters.getTaskType(this.simpleInfo.typeId).name;
					return this.simpleInfo.tag
				}
				return "类型";
			},
			comment(){
				if(this.simpleInfo&&this.simpleInfo.comment){
					return this.simpleInfo.comment;
				}
				return "";
			}
		}
	}
</script>

<style>
	.simplecard{
		display: flex;
		flex-direction: column;
		height: 300px;
		margin-left: 30px;
		margin-bottom: 10px;
		background-color:aliceblue;
	}
	.sc-comment{
		height: 100px;
		width: 75%;
		border: 1px solid black;
	}
	
	.sc-comment:empty::before{
		content: attr(placeholder);
		color: gray;
	}
</style>