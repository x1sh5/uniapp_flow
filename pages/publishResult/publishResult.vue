<template>
	<view>
		<view v-for="item in publishResults" :key="item" style="height: 40px;">{{ item.message }}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		computed:{
			results(){
				return this.$store.getters.publishResults
			}
		}
	}
</script>

<style>

</style>
