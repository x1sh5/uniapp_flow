<template>
	<view>
		<view>选择创建类型</view>
		<uni-data-checkbox mode="button" v-model="defaultT" :localdata="ctype" @change="typeChange"></uni-data-checkbox>
		<uni-data-select :localdata="taskTypes" :showProp="'name'" ref="dataSelect" @data-to-parent="receiveDataFromChild"></uni-data-select>
		<!-- <button v-for="item in taskTypes" :key="item.id" @click="editTask(`${item.id}`)">{{item.name}}</button> -->
		<button @click="createTask" :disabled="!Boolean(selected)">创建</button>
	</view>
</template>

<script>
	import {nextTick} from "vue"
	export default {
		data(){//必须函数，对象不再支持
			return {
				selected:undefined,
				$taskTypes: [],
				ctype: [
					{text: '单卡', value: 0}, {text: '多卡', value: 1}
				],
				defaultT:0
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
				  url:"/pages/newTask/newTask?typeId="+e,
				})
			},
			createTask(e){
				console.log("createTask",e);
				uni.navigateTo({
				  url:"/pages/newTask/newTask?typeId="+this.selected.id+"&createType="+this.defaultT,
				})
			},
			typeChange(e){
				console.log("typechange",e)
				if(e.detail.value === 1){
					this.$refs.dataSelect.statusDisable(true)
				}
				if(e.detail.value === 0){
					this.$refs.dataSelect.statusDisable(false)
				}
			},
			receiveDataFromChild(data) {
			      // This method will be called when the custom event 'data-to-parent' is emitted from the child component
				  console.log("data",data)
			      this.selected = data;
				  console.log("this.selected",this.selected)
			}
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
