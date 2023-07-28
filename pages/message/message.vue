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
		}
	}
</script>

<style lang="less">
	@import url('./message.css');
</style>
