<template>
	<view>
		<view>选择创建类型</view>
		<button v-for="item in taskTypes" :key="item.id" @click="editTask(`${item.id}`)">{{item.name}}</button>
	</view>
</template>

<script>
	import {nextTick} from "vue"
	export default {
		data(){//必须函数，对象不再支持
			return {
				a:"2",
				$taskTypes: []
			}
		},
		computed:{
			taskTypes(){
				return this.$store.state.taskTypes
			},
		},
		methods:{
			editTask(e){
				console.log(e)
				uni.navigateTo({
				  url:"/pages/newTask/newTask?typeid="+e,
				})
			},
		},
		async created() {
			console.log("addtask create")
			// this.$data.$taskTypes = this.$store.state.taskTypes
			// await nextTick();
			// await this.$nextTick()
			// console.log(this.$data.$taskTypes)
		},
		onLoad() {
			//level > created
			console.log("onload")
			//console.log(this.$data.$taskTypes)
		},
		onShow() {
			console.log("onshow")
			//console.log(this.$data.$taskTypes)
		}

	}
</script>

<style lang="less">

</style>
