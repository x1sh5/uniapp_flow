<template>
	<view>
		<uni-nav-bar left-icon="left" @clickLeft="back" :title="userName"></uni-nav-bar>
		
		<!-- <view v-for="m in messages" :key="m.id">{{m.message}}</view> -->
		<yd-chatitem v-for="m in messages" :key="m.id" :message="m"></yd-chatitem>
		
		<view class="transmit">
				<input class="input" v-model="inputValue" type="text" @blur="change" ref="input"/>
				<button class="sendbutton" @click="send">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text1:"",
				chatId:NaN,
				userName:"",
				userId:NaN,
				inputValue:""
				//messages:[]
			}
		},
		computed:{
			messages(){
				return this.$store.getters.getMessages
			},

		},
		methods: {
			send(e){
				console.log(this.text1)
				this.$store.dispatch("sendMsg",{user:this.userId,message:this.text1})
				this.inputValue = "";
			},
			change(e){
				
				this.text1 = e.detail.value
			},
			back(e){
				uni.navigateBack()
			},
			
		},
		onLoad(op) {
			this.chatId = op.cid;
			this.userName = op.userName;
			this.userId = op.userId;
		}
	}
</script>

<style>
	@import url('./chat.css');
</style>
