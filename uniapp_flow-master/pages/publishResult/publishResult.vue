<template>
	<view>
		<view v-for="item in results" :key="item" style="height: 40px;">
			{{ item.message }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			setTimeout(()=> {
			  uni.navigateTo({
			  	url: "/pages/myTaskDetail/myTaskDetail?refer=newtask&id="+this.results[0].id
			  })
			}, 1000); // 延时 1 秒执行
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
/* 水平 居 中 */
</style>
