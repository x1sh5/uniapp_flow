<template>
	<view class="container" style="background-image: url('https://liusha-gy.com/flow/static/beijing.png');">
	  <!-- 页面内容 -->
	</view>
	
	<view class="text"><text>您还未登录~<br>
	注册进入社区，共创理想生活！</text>
	<view @click="login" class="lgtip-up-button">登录</view>
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
