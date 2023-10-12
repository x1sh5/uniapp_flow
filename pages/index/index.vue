<template>
	<view class="content">
		<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索任务" clearButton="auto" cancelButton="none" @focus="search" />
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000"
				:duration="500">
			<swiper-item><view class="swiper-item uni-bg-red">A</view></swiper-item>
			<swiper-item><view class="swiper-item uni-bg-green">B</view></swiper-item>
			<swiper-item><view class="swiper-item uni-bg-blue">C</view></swiper-item>
		</swiper>
		
		<view style="display: flex;flex-direction: row;height: 80px;">
			<button v-for="item in branchTypes" :key="item.id" @click="searchByTpe(item.id,item.name)">{{ item.name }}</button>
		</view>
		
		<view v-for="item in tasks" :key="item.id" class="custom-margin">
		  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="'waitfor'" style="margin-top:5px;"/>
		</view>
		
		<!-- <uni-pagination prevText="上一页" nextText="下一页" piecePerPageText="页" pageSize="10" :total="total" 
			@update:modelValue="modelChange"></uni-pagination> -->
	</view>
</template>

<script>
	//import stroe from "./../../store/index.js"
	export default {
		data() {
			return {
				title: 'Hello',
				currentTypeId:"",
				taskTypeName:"全部"
			}
		},
		onLoad() {
			console.log("page index onload");
			
		},
		mounted() {
			this.$store.dispatch('fetchTasks',{count:10,offset:0, typeId:""})
			.then(data => {
							 this.$store.commit('setTasks', {taskTypeName: "全部", data: data});
							 // 在这里处理获取到的数据
			  })
			  .catch(error => {
							 console.error('获取数据失败：', error);
							 // 在这里处理错误情况
			  });
		},
		computed:{
			tasks:{
				get() {
					//console.log("index tasks:",this.$store.getters.getTasks(this.taskTypeName))
					return this.$store.getters.getTasks(this.taskTypeName)
				},
				set(value){
					this.$store.commit('setTasks',{taskTypeName: this.taskTypeName, data: value})
				}
			},
			branchTypes(){
				let ts = this.$store.state.branchs;
				
				return [{id:"",name:"全部"}, ...ts];
			},
			total(){
				return this.$data.$total;
			},
			maxIndex(){
				if(this.tasks.length>0){
					return this.tasks[this.tasks.length-1].id
				}
				return 0;
			}
		},
		methods:{
			search(e){
				console.log("confirm:",e)
				let searchWord = e.value;
				uni.navigateTo({
					url:"/pages/searchResult/searchResult"

				})
			},//requestWithCookie
			searchByTpe(id, name){
				this.currentTypeId = id;
				this.taskTypeName = name;
				let url = this.$store.state.apiBaseUrl+"/api/Assignment/type/"+id;
				
				uni.requestWithCookie({
					url:url,
					success:(res)=>{
						console.log(res)
						if(res.statusCode === 200){
							this.tasks = res.data
						}else{
							uni.showToast({
								title:"网络出错了！"
							})
						}
					}
				});
				
				
			},
			inputEvent(e){
				console.log(e)
			},
			changeEvent(e){
				console.log(e)
			},
			modelChange(e){
				console.log(e)
			}
		},
		//上拉更新数据
		 onReachBottom() {
			let maxIndex = this.maxIndex;
			this.$store.dispatch('fetchTasks',{count:10,offset:maxIndex, typeId:this.currentTypeId})
			.then(data => {
				 this.$store.commit('updateTasks', {taskTypeName: this.taskTypeName, data: data});
				 // 在这里处理获取到的数据
			  })
			  .catch(error => {
				 console.error('获取数据失败：', error);
				 // 在这里处理错误情况
			  });
		},
		//下拉刷新页面
		async onPullDownRefresh() {
			await this.$store.dispatch("fetchBranchs");
			await this.$store.dispatch("fetchTaskTypes");
			 this.$store.dispatch('fetchTasks',{count:10,offset:0, typeId:this.currentTypeId})
			 .then(data => {
				 this.$store.commit('setTasks', {taskTypeName: this.taskTypeName, data: data});
				 // 在这里处理获取到的数据
			   })
			   .catch(error => {
				 console.error('获取数据失败：', error);
				 // 在这里处理错误情况
			   });

		}
	}
</script>

<style>
	@import url('./index.css');
	@import url("../../common/commen.css");
</style>
