<template>
	<view class="ch-wrapper" @click="jump">
		<view style="box-sizing: border-box;">
			<view class="user-avatar"><image class="user-avatar-img"></image></view>
		</view>
		
		<view>
			<view >{{title}}</view>
			<view >{{lastmessage}}</view>
		</view>
			
		<view>
			<view>{{time}}</view>
			<view>{{unreadcount}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"channelStyle",
		data() {
			return {
				title:"测试任务标题",
				lastmessage:"你好",
				time:"22:41",
				unreadcount:2
			}
		},
		methods:{
			jump(){
				uni.navigateTo({
					url:"/pages/chat/chat"
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('../../common/commen.css');
	
	@import url('./channelStyle.css');
</style>