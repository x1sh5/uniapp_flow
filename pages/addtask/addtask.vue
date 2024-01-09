<template>
	<view>
		  <!-- <view class="title1">*即时回报的<br>单次任务</view> 
		  <view class="title2">*后续收入的多项任务</view>   -->
		
		 
		   <!-- 1. 添加居中灰色分割线 -->
		   <!-- <view class="horizontal-line-0"></view>-->
		   <view class="horizontal-line"></view>
		  <view class="horizontal-line-a"></view>
		  <view class="horizontal-line-c"></view>
		  <view class="horizontal-line-b"></view> 
		  <view class="horizontal-line-d"></view> 
		  <view class="container" style="background-image: url('/static/addtask.png');">
		  
		  </view>  <!-- 页面内容 -->
		  <!--  
		  
		  
		   -->
		  
		  <!-- 3. uni-data-checkbox 内容页面居中，上边距70px -->
		  <view class="checkbox-container" >
			<uni-data-checkbox mode="button" v-model="defaultT" :localdata="ctype" @change="typeChange"></uni-data-checkbox>
		  </view>
		  <view class="select-container"  >
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
					{text: '单次', value: 0}, {text: '多项', value: 1}
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

				uni.navigateTo({
				  url:"/pages/newTask/newTask?branchid="+e,
				})
			},
			createTask(e){

				uni.navigateTo({
				  url:"/pages/newTask/newTask?branchid="+this.selected.id+"&createType="+this.defaultT+"&mode="+this.mode,
				})
			},
				
				
			typeChange(e){

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

			      this.selected = data;

			}
		},
	mounted() {
			// 在组件挂载时调用 statusDisable(false) 来初始化状态
			this.$refs.dataSelect.statusDisable(false);
		}
	}
</script>

<style lang="less">
	@import url('./addtask.css');
</style>
