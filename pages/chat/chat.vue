<template>
	<view>
		<uni-nav-bar left-icon="left" @clickLeft="back" title="用户A"></uni-nav-bar>
		
		<!-- <view v-for="m in messages" :key="m.id">{{m.message}}</view> -->
		<yd-chatitem v-for="m in messages" :key="m.id" :message="m"></yd-chatitem>
		
		<view class="transmit">
				<input class="input" type="text" @blur="change"/>
				<button class="sendbutton" @click="send">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text1:"",
				messages:[]
			}
		},
		methods: {
			send(e){
				console.log(this.text1)
				this.messages.push(this.text1)
			},
			change(e){
				
				this.text1 = e.detail.value
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
