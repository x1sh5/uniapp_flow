<template>
	<view>
		<button @click="toA">toA</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toA(e){
				uni.navigateTo({
					url: "/pages/test/A/A"
				})
			}
		}
	}
</script>

<style>

</style>
