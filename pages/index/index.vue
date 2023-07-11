<template>
	<view class="content">
		<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索任务" clearButton="auto" cancelButton="none" @confirm="search" />
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000"
				:duration="500">
			<swiper-item><view class="swiper-item uni-bg-red">A</view></swiper-item>
			<swiper-item><view class="swiper-item uni-bg-green">B</view></swiper-item>
			<swiper-item><view class="swiper-item uni-bg-blue">C</view></swiper-item>
		</swiper>
		
		<view v-for="item in tasks" :key="item.id" style="margin-top:5px;">
		  <cardinfo v-bind:task="item" v-bind:editable="true" style="margin-top:5px;"/>
		</view>
	</view>
</template>

<script>
	//import stroe from "./../../store/index.js"
	export default {
		data() {
			return {
				title: 'Hello',
			}
		},
		onLoad() {
			console.log("page index onload")
		},
		beforeCreate() {
			console.log("before Create")
			this.$store.commit('getBranchs');
			this.$store.commit('getTaskTypes');
			try {
			  if(!this.$store.state.tasks.status){
				  this.$store.commit('getTasks')
			  }
			} catch (error) {
			  console.error("Error getting data from the API:", error);
			}
		},
		computed:{
			tasks:{
				get() {
					console.log("index tasks:",this.$store.getters.fetchTasks)
					return this.$store.getters.fetchTasks
				},
				set(value){
					this.$store.commit('getTasks',value)
				}
			}
		},
		methods:{
			search(e){
				console.log("confirm:",e)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		//align-items: center;
		//justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.uni-mt-10 {
		margin-top: 10px;
		display: block;
	}
	
	.swiper {
			height: 300rpx;
		}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.uni-bg-red{
		background-color: red;
	}
	.uni-bg-green{
		background-color: green;
	}
	.uni-bg-blue{
		background-color: blue;
	}
</style>
