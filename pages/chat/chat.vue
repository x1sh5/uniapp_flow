<template>
	<view>
		<uni-nav-bar left-icon="left" @clickLeft="back" :title="userName"></uni-nav-bar>
		
		<!-- <view v-for="m in messages" :key="m.id">{{m.message}}</view> -->
		<view class="chat-container">
			<view class="chat-messages">
				<yd-chatitem v-for="m in messages" :key="m.id" :message="m.content" :isLeft="m.isLeft"></yd-chatitem>
			</view>
			
			<view class="chat-input-container">
			      <input type="text" class="chat-input" v-model="inputValue" @blur="change" ref="input">
			      <button class="send-button" @click="send">发送</button>
			</view>
			
<!-- 			<view class="transmit">
					<input class="input" v-model="inputValue" type="text" @blur="change" ref="input"/>
					<button class="sendbutton" @click="send">发送</button>
			</view> -->
		</view>

	</view>
</template>

<script>
	import { ChatChannel } from "../../common/customTypes.js";
	export default {
		data() {
			return {
				text1:"",
				userName:"",
				userId:NaN,//发卡人id
				inputValue:"",
				//messages:[]
			}
		},
		computed:{
			messages(){
				return this.$store.getters.getMessages(this.userId)
			},

		},
		methods: {
			async send(e){
				console.log(this.text1)
				this.inputValue = "";
				//
				let cc = this.$store.commit("Msgs/getById",this.userId)
				if(!cc){
					let ncc = new ChatChannel(this.userId,0,this.userName,new Date().toLocaleString(),"");
					await this.$store.dispatch("Msgs/addChatAsync",ncc);
				}
				
				this.$store.dispatch("sendMsg",{user:this.userId,message:this.text1})
				
			},
			change(e){
				
				this.text1 = e.detail.value
			},
			back(e){
				uni.navigateBack()
			},
			
		},
		onLoad(op) {
			this.userName = op.userName;
			this.userId = parseInt(op.userId);
			
			//let [lastid] = this.messages.slice(-1);
			let qurl = this.$store.state.apiBaseUrl+"/api/messages/receives?receiverId="+this.userId
			+"&count=10";
			uni.requestWithCookie({
				url:qurl,
				success: (res) => {
					if(res.statusCode===200){
						for(let m of res.data){
							this.$store.dispatch("receiveMsg",{user:m.from,message:m})
						}
					}
					if(res.statusCode>=400){
						uni.showToast({
							title:"网络异常，请稍后再试!"
						})
					}
				}
			});
		},
		onUnload() {
			let chatChannel = this.$store.commit("Msgs/getById",this.userId);
			chatChannel.unread = '';
		}
	}
</script>

<style>
	@import url('./chat.css');
</style>
