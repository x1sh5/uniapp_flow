<template>
	<view>
		<button @click="toB">toB</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toB(e){
				uni.navigateTo({
					url: "/pages/test/B/B"
				})
			}
		}
	}
</script>

<style>

</style>
