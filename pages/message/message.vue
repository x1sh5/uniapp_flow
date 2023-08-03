<template>
	<view>
		<view v-for="m in messages" :key="m.id">{{m.message}}</view>
		
		<channelStyle v-for="c in chatChannels" :key="c"></channelStyle>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatChannels:[1,2,3,4],
			};
		},
		methods:{
			send(e){
				this.messages.push(e)
			}
		},
		onLoad(e) {
			this.$store.state.workSocket.on("ReceiveMessage", (user, message) => {
				console.log("receiveMessage",user,message);
				this.$store.dispatch("receiveMessage",{user:user,message:message})
			}); 
			this.$store.dispatch("connect");
		}
	}
</script>

<style lang="less">
	@import url('./message.css');
</style>
