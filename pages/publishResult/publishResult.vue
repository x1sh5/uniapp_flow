<template>
	<view>
		<view v-for="item in results" :key="item" style="height: 40px;">{{ item }}</view>
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
				console.log(this.$store.getters.publishResults);
				return this.$store.getters.publishResults
			}
		}
	}
</script>

<style>

</style>
