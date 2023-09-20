<template>
	<view style="width: 90%;">
		<view class="setting-view">头像设置</view>
		<view class="driver"></view>
		<view @click="identityCheck" class="setting-view" style="display: flex;flex-direction: row; position: relative">
			<view  >身份验证</view>
			<view style="position: absolute;right: 0;">></view>
		</view>
		
		<view class="driver"></view>
		<view @click="unregister" class="setting-view" style="display: flex;flex-direction: row; position: relative">
			<view  >账号注销</view>
			<view style="position: absolute;right: 0;">></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			identityCheck(e){
				uni.navigateTo({
					url: "identityCheck/identityCheck"
				});
			},
			unregister(e){
				uni.navigateTo({
					url: "unregister/unregister"
				});
			}
		}
	}
</script>

<style>
	.driver{
		display: block;
		height: 1rpx;
		background-color: #a8a8a8;
		margin: 10rpx 0;
	}
	
	.setting-view{
		margin-left: 10px;
		margin-top: 2px;
		margin-bottom: 2px;
		border-radius: 5px;
		box-sizing: content-box;
		border: 1px solid darkgrey;
		background-color: white;
	}
</style>
