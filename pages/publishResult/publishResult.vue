<template>
	<view>
		<view v-for="item in results" :key="item" style="height: 40px;">
			{{ item.message }}
		</view>
		<button @click="flush">继续发布任务</button>
		<button v-show="success" @click="detail">查看任务详情</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		mounted() {

		},
		onLoad(e) {
			
		},
		methods: {
			detail(e){
				uni.navigateTo({
					url: "/pages/myTaskDetail/myTaskDetail?refer=newtask&id="+this.results[0].id
				})
			}
			,flush(e){
				uni.switchTab({
					url:"/pages/addtask/addtaskView"
				})
			}
		},
		computed:{
			results(){

				return this.$store.getters.publishResults
			},
			success(){
				return !this.results[0].id==undefined;
			}
		}
	}
</script>

<style>
/* 水平 居 中 */
</style>
