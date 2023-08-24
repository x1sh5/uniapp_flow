<template>
	<view class="ch-wrapper" @click="jump" @longpress="showDelete">
		<view style="box-sizing: border-box;">
			<view class="user-avatar"><image class="user-avatar-img"></image></view>
		</view>
		
		<view>
			<view >{{cc.title}}</view>
			<view >{{cc.message}}</view>
		</view>
			
		<view>
			<view>{{cc.lasttime}}</view>
			<view>{{cc.unread}}</view>
		</view>
	</view>
</template>

<script>
	import { ChatChannel } from "../../common/customTypes.js";
	export default {
		name:"channelStyle",
		props:{
			cc:{
				type:ChatChannel
			},
			// title:{
			// 	type:String,
			// 	default(){
			// 		return "测试任务标题";
			// 	}
			// }
		},
		data() {
			return {
				// lastmessage:"你好",
				// time:"22:41",
				// unreadcount:2
			}
		},
		methods:{
			jump(){
				uni.navigateTo({
					url:"/pages/chat/chat"
				})
			},
			showDelete(e){
				
			},
			delete(e){
				this.$emit("delete-Cc",e)
			}
		}
	}
</script>

<style lang="less">
	@import url('../../common/commen.css');
	
	@import url('./channelStyle.css');
</style>