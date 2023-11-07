<template>
	<view v-for="item in myreqs" :key="item.id">
		<simpleCard :simpleInfo="item" :showbutton="false"></simpleCard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myreqs: []
			}
		},
		computed:{
			taskType(id){//["name"]
				
				return this.$store.getters.getTaskType(id)
				
			}
		},
		methods: {

		},
		onLoad() {
			let qurl = this.$store.state.apiBaseUrl+"/api/TaskRequest/myapply"
			uni.requestWithCookie({
				url: qurl,
				success: (res) => {
					if(res.statusCode==200){
						this.myreqs = res.data
					}
				}
			})
		}
	}
</script>

<style>

</style>
