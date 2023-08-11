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
			<button v-for="item in taskTypes" :key="item.id" @click="searchByTpe(item.id)">{{ item.name }}</button>
		</view>
		
		<view v-for="item in tasks" :key="item.id" style="margin-top:5px;">
		  <cardinfo v-bind:task="item" v-bind:editable="false" style="margin-top:5px;"/>
		</view>
		
		<uni-pagination prevText="上一页" nextText="下一页" piecePerPageText="页" pageSize="10" :total="total" 
			@update:modelValue="modelChange"></uni-pagination>
	</view>
</template>

<script>
	//import stroe from "./../../store/index.js"
	export default {
		data() {
			return {
				title: 'Hello',
				$total: 0,
			}
		},
		created() {
			let url = this.$store.state.apiBaseUrl+"/api/Assignment/total";
			uni.request({
				url:url,
				dataType: 'text',
				success:(res) =>{
					if(res.statusCode === 200){
						console.log(res.data)
						this.$data.$total = res.data;
						console.log(this.$data.$total);
					}
				}
			});
		},
		onLoad() {
			console.log("page index onload");

		},
		
		computed:{
			tasks:{
				get() {
					console.log("index tasks:",this.$store.getters.getTasks)
					return this.$store.getters.getTasks
				},
				set(value){
					this.$store.commit('updateTasks',value)
				}
			},
			taskTypes(){
				let ts = this.$store.state.taskTypes;
				
				return [{id:"",name:"全部"}, ...ts];
			},
			total(){
				return this.$data.$total;
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
			searchByTpe(id){
				let url = this.$store.state.apiBaseUrl+"/api/Assignment/type/"+id;
				uni.requestWithCookie({
					url:url,
					success:(res)=>{
						console.log(res)
						if(res.statusCode === 200){
							this.tasks = res.data.$values
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
		}
	}
</script>

<style>
	@import url('./index.css');
</style>
