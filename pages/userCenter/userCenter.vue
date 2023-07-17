<template>
	<view class="wrapper">
		
		<view class="userinfo">
			<!-- avatar -->
			<view class="user-avatar"><image class="user-avatar-img"></image></view>
			<view>username</view>
		</view>
		
		<view class="driver"></view>
		
		<view class="taskinfobox">
			<view style="position: relative;margin-left: 10rpx;">我发布的</view>
			<view class="taskinfo">
				<view class="wr icon1" @click="userTaskDetail"><view class="item_title">历史发布</view></view>
				<view class="wr icon2" @click="userTaskDetail"><view class="item_title">完成项目</view></view>
				<view class="wr icon3" @click="userTaskDetail"><view class="item_title">浏览记录</view></view>
				<view class="wr icon4" @click="draftBox"><view class="item_title">草稿箱</view></view>
			</view>
		</view>
		
		<view class="driver"></view>
		
		<view class="misc">
			<view>帮助中心</view>
			<view>技能互助文档</view>
			<view>收益来源</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			userTaskDetail(e){
				console.log(e)
				uni.navigateTo({
					url:"/pages/userTaskDetail/userTaskDetail"
				})
			},
			draftBox(e){
				console.log(e)
				uni.navigateTo({
					url:"/pages/draftBox/draftBox"
				})
			}
		},
	}
</script>

<style lang="less">
	@import url('icon.css');
	@import url('../../common/commen.css');
	
	.wrapper{
		display: flex;
		flex-direction: column;
	}
	
	.userinfo{
		display: flex;
		flex-direction: row;
		height: 150rpx;
	}
	
	.taskinfobox{
		display: flex;
		flex-direction: column;
		height: 300rpx;
	}
	
	.taskinfo{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
		align-content: center;
		overflow: hidden;
		width: 100%;
		height: 300rpx;
		border-radius: 0 0 16rpx 16rpx;
	}
	
	.driver{
		display: block;
		height: 3rpx;
		background-color: #a8a8a8;
		margin: 10rpx 0;
	}
	
	.item_title{
		font-size: 24rpx;
		color: #666;
		line-height: 32rpx;
	}
	
	.icon1{
		font-size: 23px;
		background-image: -webkit-linear-gradient(90deg, #6a6a6a 0%,#929292 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-align: center;
		display: block;
	}
	
	.icon1::before{
		content: '\e046';
	}
	
	.icon2,.icon3,.icon4{
		.icon1()
	}
	
	.icon2::before{
		content: '\e00b';
	}
	
	.icon3::before{
		content: '\e00e';
	}
	
	.icon4::before{
		content: '\e044';
	}
	
	.misc{
		margin: 10rpx 5rpx;
	}
</style>
