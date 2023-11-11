<template>
	<view>
		<view class="simplecard">
			<view class="title" style="width: 75%;height: 40px;">{{title}}</view>
			<view class="sc-comment" placeholder="留言...">{{comment}}</view>
			<view class="proposer">申请人：</view>
			<view >
				<view class="name">{{simpleInfo.userName}}</view>
				<button class="contact" @click="contact">联系</button>
			</view>
			
			<view v-show="showbutton&&simpleInfo.agree===2" style=" flex-direction: row;">
				<button class="agree" @click="agree">同意</button>
				<button class="disagree" @click="disagree">拒绝</button>
			</view>
			<view class="reply" v-if="simpleInfo.agree===0">
				已拒绝
			</view>
			<view class="reply" v-if="simpleInfo.agree===1">
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
			/**
			 * @type {object} simpleInfo
			 * @type {number} simpleInfo.id 
			 * @type {number} simpleInfo.agree 是否同意接取，2：未读，1：同意，0：不同意
			 * @type {number} simpleInfo.taskId 任务id
			 * @type {string} simpleInfo.userName 申请人姓名
			 * @type {string} simpleInfo.title 要申请的任务的标题
			 * @type {number} simpleInfo.userId 申请人ID
			 * @type {string} simpleInfo.comment 留言
			 * @type {string} simpleInfo.tag 任务类型
			 */
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
					url:"/pages/message/chat/chat?cid="+this.simpleInfo.taskId+
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
		height: 700px;
		margin-left: 50px;
		margin-bottom: 10px;
		  background-color: #ffffff; 
	}
	.title{
		 z-index:3;
	display: flex;
		margin-left: 50rpx;
		margin-top: 30rpx;
		 transform: translate(0rpx,0rpx) scale(1);
	padding-left:0px;/* 右缩进 */
	border: 0px solid #6c4ad1;
	 font-weight: 900;

	color: #4723b3;
	font-size: 36rpx;
	}
	
	.proposer{
		 z-index:5;
	display: flex;
		margin-left: 50rpx;
		 transform: translate(400rpx,-180rpx) scale(1);
	  background-color: #ffffff; 

	  padding-left: 15px;/* 右缩进 */
	  border: 1px solid #6c4ad1;
	  background-color: rgb(255, 255, 255);
	  color: #4723b3;
	  font-size: 10px;
	}


	.name{
		 z-index:10;
	display: flex;
		margin-left:0rpx;
		 transform: translate(450rpx,-150rpx) scale(1);
		 margin-top: -30rpx;
	padding-left: 15px;/* 右缩进 */
	border: 1px solid #6c4ad1;
	background-color: rgb(255, 255, 255);
	color: #4723b3;
	font-size: 10px;
	}
	.sc-comment:empty::before{
		
		display: flex;
		content: attr(placeholder);
	
		  background-color: #ffffff; 
	}
	.sc-comment{
		 z-index:1;
		height: 100rpx;
		width: 700rpx;
		
		margin-top: 30rpx;
		margin-left: 50rpx;
		border: 1px solid black;
		
	display: flex;
		margin-left: 50rpx;
		 transform: translate(0rpx,0rpx) scale(1);
	padding-left: 15px;/* 右缩进 */
	border: 1px solid #6c4ad1;
	background-color: rgb(255, 255, 255);
	color: #4723b3;
	font-size: 10px;
		  
	}
	
	 /* 联系 */
	.contact{
	 z-index: 10;
	 
	 display: flex;  /* 使用Flex布局 */
	    justify-content: center;  /* 水平居中 */
	 align-items: center;   /* 垂直居中 */
	 
  transform: translate(0rpx,0rpx) scale(1);

  border: 10px solid  #6c4ad1;
  border-radius: 80rpx; /*设置按钮边框为圆角 */
  border: none;
  
  width: 700rpx;
  height: 150rpx;
  
  color: rgb(255, 255, 255); 
  background-color: #4d1ae4; 
  font-size: 80rpx;
  text-align: center;
/* top: calc(150vh - 350rpx);
   */
 

 margin-left: -120px;
   margin-top: 0rpx;
   box-shadow:0ch;
 padding-left: 500rpx; 
   box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
 background-image: -webkit-linear-gradient(0deg, #4d1ae4 0%, #886cdb 100%);
	}
	
	
	.agree{
	 display: flex;  /* 使用Flex布局 */ 
	 z-index: 10;
	 
	  transform: translate(300rpx,100rpx) scale(1);
	  
	    border: 1px solid  #6c4ad1;
	    border-radius:670rpx; /* 新增：设置按钮边框为圆角 */
		
	    width: 700rpx;
	    height: 90rpx;
		
	   color: rgb(255, 255, 255); 
	    background-color: #6c4ad1; /* 新增：设置按钮背景颜色为绿色 */
		/*text-align: center;
		 top: calc(150vh - 350rpx);
	     */
		    margin-top: 00rpx;
		 padding-left: -100rpx; 
		      margin-left: 00px;
	 

	     align-items: center; /* 垂直居中 */
	 
	     box-shadow:0ch;
	
	     box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
		  background-image: -webkit-linear-gradient(0deg, #886cdb%, #4d1ae4 100%);
	}
	
	.disagree{
		 display: flex; 
	
		 align-items: center; /* 垂直居中 */
		 z-index: 10;
	  transform: translate(450rpx,120rpx) scale(1);
	  border: 1px solid  #6c4ad1;
	  border-radius: 60px; /* 新增：设置按钮边框为圆角 */
	  
	  width: 700rpx;
	  height: 90rpx;
	  
	  margin-top: 0rpx;
	   padding-left: -500rpx; 
	      margin-left: 00rpx;
	
	
	
	   color: #6c4ad1; /* 新增：设置注册按钮文字颜色为绿色 */
	   background-color: rgb(255, 255, 255); /* 新增：设置注册按钮背景颜色为白色 */
	   box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
	}
	.reply{
		 z-index: 1;
	display: flex;
		margin-left: 50rpx;
		  margin-top: -190rpx;
		 transform: translate(0rpx,0rpx) scale(1);
	  background-color: #ffffff; 
	
	  padding-left: 15px;/* 右缩进 */
	  border: 1px solid #6c4ad1;
	  background-color: rgb(255, 255, 255);
	  color: #4723b3;
	  font-size: 10px;
	}
</style>