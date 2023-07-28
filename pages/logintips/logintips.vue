<template>
	<view class="lgtip-wrapper">
		<text>未登录！</text>
		<view @click="login" class="lgtip-button">登录</view>
		<view @click="register" class="lgtip-button">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			login(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			register(){
				uni.navigateTo({
					url:"/pages/register/register"
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('./logintips.css');
</style>
