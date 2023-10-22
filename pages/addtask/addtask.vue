<template>
	<view>
		  <!-- 2. 改变“请选择创建类型”字体颜色为灰色、大小30px，页面居中，上边距70px <view class="title">请选择创建类型</view>  -->
		  
		  <view class="title1">*即时回报</view> 
		  <view class="title2">*后续收入</view> 
		   <!-- 1. 添加居中灰色分割线 -->
		  <view class="horizontal-line"></view>
		  <view class="horizontal-line-a"></view>
		  <view class="horizontal-line-b"></view> 
		  <view class="horizontal-line-c"></view>
		  <!-- 3. uni-data-checkbox 内容页面居中，上边距70px -->
		  <view class="checkbox-container">
			<uni-data-checkbox mode="button" v-model="defaultT" :localdata="ctype" @change="typeChange"></uni-data-checkbox>
		  </view>
		  <view class="select-container" >
			<uni-data-select :localdata="branchTypes" :showProp="'name'"
			 ref="dataSelect" @data-to-parent="receiveDataFromChild">
			</uni-data-select>
		  </view>
		<!-- <button v-for="item in taskTypes" :key="item.id" @click="editTask(`${item.id}`)">{{item.name}}</button> -->
		<button class="create-button" @click="createTask" :disabled="!Boolean(selected)">创建</button>
	</view>
</template>

<script>
	import {nextTick} from "vue"
	export default {
		data(){//必须函数，对象不再支持
			return {
				selected:undefined,
				$branchTypes: [],
				ctype: [
					{text: '单卡', value: 0}, {text: '多卡', value: 1}
				],
				defaultT:0,
				mode: ''
			}
		},
		computed:{
			branchTypes(){
				return this.$store.state.branchs
			},
		},
		methods:{
			editTask(e){
				console.log(e)
				uni.navigateTo({
				  url:"/pages/newTask/newTask?branchid="+e,
				})
			},
			createTask(e){
				console.log("createTask",e);
				uni.navigateTo({
				  url:"/pages/newTask/newTask?branchid="+this.selected.id+"&createType="+this.defaultT+"&mode="+this.mode,
				})
			},
			typeChange(e){
				console.log("typechange",e)
				if(e.detail.value === 1){
					this.mode = 'mutiple';
					this.$refs.dataSelect.statusDisable(true)
				}
				if(e.detail.value === 0){
					this.mode = 'single';
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
	@import url('./addtask.css');
</style>
