<template>
	<view>
		<uni-nav-bar left-icon="left" @clickLeft="back" title="用户A"></uni-nav-bar>
		
		<view v-for="m in messages" :key="m.id">{{m.message}}</view>
		
		<view class="transmit">
				<input class="input" type="text"/>
				<button class="sendbutton" @click="send">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messages:[]
			}
		},
		methods: {
			send(e){
				this.messages.push(e)
			},
			back(e){
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	.input{
		width: 80%;
		height: 32rpx;
		border: 2px solid #4ade00;
	}
	
	.transmit{
		display: flex;
		padding: 8rpx 5rpx;
		width: 100%;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 40px;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		bottom: 40rpx;
	}
	
	.sendbutton{
		height: 40px;
	}
</style>
