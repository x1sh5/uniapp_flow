<template>
	<view>
		<refer :editable="false" :refer="refer"></refer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refer: {}
			}
		},
		methods: {
			
		},
		onLoad(op) {
			this.refer = JSON.parse(op.refer);
		}
	}
</script>

<style>

</style>
