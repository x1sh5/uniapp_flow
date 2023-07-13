<template>
	<view>
		<view>选择创建类型</view>
		<button v-for="item in taskTypes" :key="item.id" @click="editTask">qq{{item.name}}</button>
	</view>
</template>

<script>
	export default {
		data:{
			a:"2",
			taskTypess: []
		},
		computed:{
			taskTypes(){
				return this.$store.getters.taskTypes
			},
		},
		methods:{
			editTask(e){
				console.log(e)
				uni.navigateTo({
				  url:"/pages/newTask/newTask?a=1&b=2",
				})
			},
		},
		created() {
			console.log("addtask create")
			this.taskTypes = this.$store.getters.taskTypes
			console.log(this.taskTypes)
		},
		onLoad() {
			console.log("onload")
			console.log(this.taskTypes)
		},
		onShow() {
			console.log(this.taskTypes)
		}

	}
</script>

<style lang="less">

</style>
