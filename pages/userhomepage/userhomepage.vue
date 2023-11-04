<template>
	
	<view class="userinfo" >
		<!-- avatar -->
		<view class="user-avatar"><image :src="imgsrc" class="user-avatar-img"></image></view>
		<view>{{ userName }}</view>
	</view>
	
	<!--分割线-->
	<view class="driver" style="position: relative; margin: 0 40rpx;height: 2rpx;width: 90%;background-color: #6c4ad1;margin-top: 10rpx;" ></view>
	<!--分割线-->
	<view class="driver2" ></view>
	
	<view class="text">历史发布</view>
	
		<view class="text2">历史接受</view>
<view>
		<view v-for="item in publishs" :key="item.id" class="custom-margin" >
			<!-- #ifdef H5 -->
			<cardinfo v-bind:task="item" v-bind:editable="false" :mode="mode(item)" @click.native="toDetails(item.id)" style="margin-top:5px;"/>
			<!-- #endif -->
		  <!-- #ifdef MP-WEIXIN -->
		  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="mode(item)" @click.capture="toDetails(item.id)" style="margin-top:5px;"/>
		  <!-- #endif -->
		  
		</view>
	</view>
		
</template>

<script>
import { TaskStatus } from '../../common/Task';
	export default {
		data() {
			return {
				hasPushlishs:false,
				$publishs:[],
			}
		},
		computed:{
			publishs(){
				//必须使用this.$data.$publishs;而不能使用this.$publishs;
				//because it starts with a reserved character ("$" or "_") and is not proxied on the render context
				return this.$data.$publishs;
			},
			maxid(){
				if(this.$data.$publishs.length===0){
					return 0
				}
				return this.$data.$publishs[this.$data.$publishs.length-1].id;
			}
		},
		methods: {
			mode(item){
				if(item.status===TaskStatus.WaitForAccept)return 'waitfor';//待接状态
				if(item.status===TaskStatus.Unfinished)return 'undone';//待完成
				return 'done';
			},
			toDetails(e){
				uni.navigateTo({
					url:"/pages/myTaskDetail/myTaskDetail?id="+e
				})
			},
			removeById(id){
				let index = this.publishs.findIndex(item=>item.id==id);
				if(index!=-1){
					this.publishs.splice(index,1);
				}
			},

		},
		onLoad() {
			if(!this.hasPushlishs){
				console.log("get user task")
				uni.requestWithCookie({
					url:this.$store.state.apiBaseUrl+"/api/Assignment/user?count=10&offset="+this.maxid,
					success: (res) => {//必须用箭头函数
						this.$data.$publishs = res.data;
						this.hasPushlishs = true;
					}
				})
			}
		},
		onReachBottom() {
			
		}
	}
</script>

<style>
	.userinfo {
		z-index: 10;
	  display: flex;
	  flex-direction: row;
	  height: 150rpx;
	}
	.user-avatar{
		z-index: 10;
		width: 48px;
		height: 48px;
	    display: block;
	    position: relative;
	    background-image: url('/static/meactive.png');
	    background-size: cover;
	    border-radius: 100%;
	    margin: 0;
	    padding: 0;
	}
	.user-avatar-img{
		z-index: 10;
		border-radius: 50%;
		border: none;
		display: block;
		object-fit: cover;
		image-rendering: -webkit-optimize-contrast;
	    position: absolute;
	    top: 1%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    width: 100%;
	    height: 100%;
	}
	.user-avatar-img{
		z-index: 10;
		border-radius: 50%;
		border: none;
		display: block;
		object-fit: cover;
		image-rendering: -webkit-optimize-contrast;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    width: 100%;
	    height: 100%;
	}
	
	
	.text{
	display: flex;
	flex-direction: row;
	margin-top: 0px;
	justify-content: center;
	align-items: center;
	 color: #4d1ae4;
	  font-size: 29rpx;
	   letter-spacing: 6rpx; /* 设置文字间 隔 */
  transform: translate(-180rpx,-60rpx) scale(1);
  
  text-decoration: underline; /* 添加下划线 */
  text-decoration-thickness: 4rpx; /* 设 置下划线的粗细 */
	}
		
		
	.text2{
		display: flex;
		flex-direction: row;
		margin-top: 0px;
		justify-content: center;
		align-items: center;
		 color: #4d1ae4;
		  font-size: 29rpx;
		   letter-spacing: 7rpx; /* 设置文字间隔 */
	transform: translate(180rpx,-100rpx) scale(1);
	
	text-decoration: underline; /* 添加下划线 */
	text-decoration-thickness: 4rpx; /* 设置下划线的  粗细 */
		}
			
	
	.driver2{
		z-index: -1;
 display: flex;  /* 使用Flex布局 */
	    justify-content: center;  /* 水平居中 */
	 align-items: center;   /* 垂直居中 */
	 

	  align-items: center;
	height: 80rpx;
	width: 1rpx;
	background-color: #6c4ad1;
	margin-top: 10rpx;
	margin-left: 400rpx;
	}
	
	
	
	
		.custom-margin{
			z-index: -1;
	display: flex;  /* 使用Flex布局 */
		    justify-content: center;  /* 水平居中 */
		 align-items: center;   /* 垂直居中 */
		 
		  transform: translate(-150rpx,50rpx) scale(0.4);
	
		  align-items: center;
margin-top: -200rpx;
		}
</style>