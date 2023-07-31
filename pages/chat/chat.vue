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
				//messages:[]
			}
		},
		computed:{
			messages(){
				return this.$store.getters.getMessages
			}
		},
		methods: {
			send(e){
				console.log(this.text1)
				this.$store.dispatch("sendMessage",{user:2,message:this.text1})
			},
			change(e){
				
				this.text1 = e.detail.value
			},
			back(e){
				uni.navigateBack()
			},
			
		},
		onLoad() {
			this.$store.state.workSocket.on("ReceiveMessage", (user, message) => {
				console.log("receiveMessage",user,message);
				this.$store.dispatch("receiveMessage",{user:user,message:message})
			}); 
			this.$store.dispatch("connect")
		}
	}
</script>

<style>
	@import url('./chat.css');
</style>
