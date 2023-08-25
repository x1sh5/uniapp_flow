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
	import { ChatChannel } from "../../common/customTypes.js";
	export default {
		data() {
			return {
				text1:"",
				chatId:NaN,
				userName:"",
				userId:NaN,//发卡人id
				inputValue:"",
				//messages:[]
			}
		},
		computed:{
			messages(){
				return this.$store.getters.getMessages(this.chatId)
			},

		},
		methods: {
			async send(e){
				console.log(this.text1)
				this.inputValue = "";
				let cc = this.$store.commit("getById",this.chatId)
				if(!cc){
					let ncc = new ChatChannel(this.task.id,0,this.task.username,new Date().toLocaleString(),"");
					await this.$store.dispatch("Msgs/addAsync",ncc);
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
			this.chatId = op.cid;
			this.userName = op.userName;
			this.userId = op.userId;
			
			let [lastid] = this.messages.slice(-1);
			let qurl = this.$store.state.apiBaseUrl+"/api/messages/receives?reciverId="+this.userId
			+"count=10";
			uni.request({
				url:qurl,
				success: (res) => {
					if(res.statusCode===200){
						for(let m of res.data){
							this.$store.dispatch("receiveMsg",{user:m.from,message:m.content})
						}
						this.messages.push(...res.data)
					}else{
						uni.showToast({
							title:"网络异常，请稍后再试!"
						})
					}
				}
			});
		}
	}
</script>

<style>
	@import url('./chat.css');
</style>
