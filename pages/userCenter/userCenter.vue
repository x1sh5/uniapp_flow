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
				<view class="wr icon3" @click="userTaskDetail"><view class="item_title">浏览记录</view></view>
				<view class="wr icon4" @click="draftBox"><view class="item_title">草稿箱</view></view>
			</view>
		</view>
		
		<view class="driver" @click="holds"></view>
		<view class="taskinfobox">
			<view style="position: relative;margin-left: 10rpx;">已经接取任务</view>
			<view class="taskinfo">
				<view class="uni-icons icon-incomplete" @click="holds"><view class="item_title">待完成</view></view>
				<view class="wr icon2" @click="holds"><view class="item_title">完成项目</view></view>
			</view>
		</view>
		
		<view class="driver"></view>
		
		<view class="misc">
			<view>帮助中心</view>
			<view>技能互助文档</view>
			<view>收益来源</view>
		</view>
		
		<view class="driver"></view>
		
		<button v-if="hasLogin" @click="signout">注销</button>
		<button v-else @click="signin">登录</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			hasLogin(){
				return this.$store.state.hasLogin
			}
		},
		methods:{
			userTaskDetail(e){
				console.log(e)
				uni.navigateTo({
					url:"/pages/userTaskDetail/userTaskDetail"
				})
			},
			holds(){
				//任务接取情况
				uni.navigateTo({
					url:"/pages/holdTask/holdTask"
				})
			},
			draftBox(e){
				console.log(e)
				uni.navigateTo({
					url:"/pages/draftBox/draftBox"
				})
			},
			signin(e){
				uni.navigateTo({
					url:"/pages/login/login?refer=usercenter"
				})
			},
			signout(e){
				console.log("signout")
				this.$store.commit("changeLoginState")
			}
		},
	}
</script>

<style lang="less">
	@import url('./userCenter.less');
</style>
