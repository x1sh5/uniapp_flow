<template>
	<view class="content">
		<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索任务" :value="searchWord" focus="true"
		 clearButton="auto" cancelButton="none" @clear="clear" @confirm="search" />
		 
		<view>
			<!-- 最近搜索 -->
			<view>
				<view></view>
			</view>
			<!-- 搜索发现 -->
			<view>
				<view>搜索发现</view>
				<view></view>
			</view>
		</view>
		 
		<view v-for="item in tasks" :key="item.id" style="margin-top:5px;">
		  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="'waitfor'" style="margin-top:5px;"/>
		</view>
		
		<uni-load-more iconType="auto" :contentText="contentText" :status="status"></uni-load-more>
		
	</view>
</template>

<script>
	//import stroe from "./../../store/index.js"
	export default {
		data() {
			return {
				status: "more",
				contentText: {contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"},
				searchWord:"",
				tasks:[]
			}
		},
		onLoad() {
			console.log("page index onload")
		},
		
		computed:{
			maxid(){
				if(this.tasks.length===0){
					return 0
				}
				return this.tasks[this.tasks.length-1].id;
			}
		},
		methods:{
			search(e){
				this.searchWord = e.value;
				uni.requestWithCookie({
					url:this.$store.state.apiBaseUrl+"/api/Assignment/search/"+encodeURI(this.searchWord)+"?count=10&offset="+this.maxid,
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
			clear(e){
				
			}
		},
		onReachBottom() {
			this.status = "loading";
			uni.requestWithCookie({
				url:this.$store.state.apiBaseUrl+"/api/Assignment/search/"+encodeURI(this.searchWord)+"?count=10&offset="+this.maxid,
				success:(res)=>{
					if(res.statusCode === 200){
						this.tasks = res.data;
						this.status = "more";
					}else{
						uni.showToast({
							title: "网络出错！"
						})
					}
					
				}
			})
		},
		onLoad(e){
			
		}
		
	}
</script>

<style>
	@import url('../index/index.css');
</style>
