<template>
	<view class="ch-wrapper" @click="jump" @longpress="showDelete">
		<view style="box-sizing: border-box;">
			<view class="user-avatar"><image :src="imgsrc" class="user-avatar-img"></image></view>
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
	export default {
		name:"channelStyle",
		props:{
			cc:{
				type:Object
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
				imgsrc: ""
				// lastmessage:"你好",
				// time:"22:41",
				// unreadcount:2
				
			}
		},
		computed:{

		},
		beforeMount() {
			uni.requestWithCookie({
				url:this.$store.state.apiBaseUrl+"/api/AuthUser/avatar?id="+this.cc.cid,
				success: (res) => {

					this.imgsrc = res.data
				}
			})
		},
		onLoad() {

		},
		onShow() {
		},
		methods:{
			jump(){
				
				this.$store.dispatch("unreadChange",this.cc.unread)
				
				let userId = this.cc.cid;
				let userName = this.cc.senderName;
				uni.navigateTo({
					url:"/pages/message/chat/chat?userId="+userId+"&userName="+userName,
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