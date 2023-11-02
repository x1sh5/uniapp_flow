<template>
	<view class="a" v-for="item in reqs" :key="item.id">
		<simpleCard :simpleInfo="item"></simpleCard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reqs: []
			};
		},
		onLoad() {
			let qurl = this.$store.state.apiBaseUrl+"/api/TaskRequest/applytome"
			uni.requestWithCookie({
				url: qurl,
				success: (res) => {
					if(res.statusCode==200){
						this.reqs = res.data
					}
				}
			})
		}
		
	}
</script>

<style lang="less">
.a{
	  background-color: #6c4ad1; 
}

.b{
	  background-color: #00aaff; 
}


</style>
