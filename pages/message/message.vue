<template>
	<view>
		<channelStyle v-for="c in chatChannels" :key="c" @delete-Cc="deleteCc"></channelStyle>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//chatChannels:[1,2,3,4],
			};
		},
		methods:{
			send(e){
				this.messages.push(e)
			},
			deleteCc(e){
				this.$store.commit("Msgs/delete",e);
			}
		},
		computed:{
			chatChannels(){
				return this.$store.state.Msgs.chatChannels;
			}
		},
		onLoad(e) {
			this.$store.state.workSocket.on("ReceiveMessage", (user, message) => {
				console.log("receiveMessage",user,message);
				this.$store.dispatch("receiveMsg",{user:user,message:message})
			}); 
			this.$store.dispatch("connect");
		}
	}
</script>

<style lang="less">
	@import url('./message.css');
</style>
