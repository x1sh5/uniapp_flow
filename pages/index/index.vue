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
		  <cardinfo v-bind:task="item" v-bind:editable="false" style="margin-top:5px;"/>
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
		
		computed:{
			tasks:{
				get() {
					console.log("index tasks:",this.$store.getters.getTasks)
					return this.$store.getters.getTasks
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
	@import url('./index.css');
</style>
