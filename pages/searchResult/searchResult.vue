<template>
	<view class="content">
		<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索任务" :value="searchWord" focus="true" clearButton="auto" cancelButton="none" @confirm="search" />
		<view v-for="item in tasks" :key="item.id" style="margin-top:5px;">
		  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="'waitfor'" style="margin-top:5px;"/>
		</view>
	</view>
</template>

<script>
	//import stroe from "./../../store/index.js"
	export default {
		data() {
			return {
				title: 'Hello',
				searchWord:"",
				tasks:[]
			}
		},
		onLoad() {
			console.log("page index onload")
		},
		
		computed:{

		},
		methods:{
			search(e){
				let searchWord = e.value;
				uni.requestWithCookie({
					url:this.$store.state.apiBaseUrl+"/api/Assignment/search/"+encodeURI(searchWord),
					success:(res)=>{
						if(res.statusCode === 200){
							this.tasks = res.data
						}else{
							uni.showToast({
								title: "网络出错！"
							})
						}
						
					}
				})
			},
		},

	}
</script>

<style>
	@import url('../index/index.css');
</style>
