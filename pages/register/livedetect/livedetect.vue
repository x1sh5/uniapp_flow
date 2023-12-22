<template>
	<view>
		<web-view src="https://liusha-gy.com/detect/"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				identity:null
			}
		},
		methods: {
			
		},
		onLoad(e) {
			let id = e.identity;
			if(id){
				this.identity = id;
			}
			
		}
	}
</script>

<style>

</style>
