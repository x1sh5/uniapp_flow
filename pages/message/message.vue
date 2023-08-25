<template>
	<view>
		<channelStyle v-for="channel in chatChannels" :cc="channel" :key="channel.cid" @delete-Cc="deleteCc"></channelStyle>
		
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
				return this.$store.state.Msgs.$chatChannels;
			}
		},
		onLoad(e) {

		}
	}
</script>

<style lang="less">
	@import url('./message.css');
</style>
