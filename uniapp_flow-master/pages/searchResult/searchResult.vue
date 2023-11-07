<template>
	<view class="content">
		<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索任务" v-model="searchWord" :focus="true"
		 clearButton="auto" cancelButton="none" @clear="clear" @confirm="search" />
		 
		<view v-if="show">
			<!-- 最近搜索 -->
			<view style="display: flex;flex-direction: column;">
				<view v-for="r in recents" :key="r" class="history-item">
					<view class="clock myicons icon-shizhong"></view>
					<text @click="searchx(r)">{{r}}</text>
					<view class="delbtn myicons icon-chahao" @click="del(r)"></view>
				</view>
			</view>

			<!-- 搜索发现 -->
			<view>
				<view>搜索发现</view>
				<view class="container">
					<view v-for="h in hots" :key="h" class="item">
						<view @click="searchx(h)">{{h}}</view>
					</view>
				</view>
				
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
	import { StorageKeys } from "/common/storageKeys.js"
	export default {
		data() {
			return {
				status: "more",
				contentText: {contentdown: "",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"},
				searchWord:"",
				hots: [],
				tasks:[],
				recents: [],
				show:true
			}
		},
		onLoad() {
			console.log("page index onload")
		},
		mounted() {
			uni.requestWithCookie({
				url:this.$store.state.apiBaseUrl+"/api/Information/popular",
				success: (res) => {
					if(res.statusCode===200){
						this.hots = res.data
					}
				}
			})
		},
		computed:{
			maxid(){
				if(this.tasks.length===0){
					return 0
				}
				return this.tasks[this.tasks.length-1].id;
			},
		},
		methods:{
			search(e){
				this.searchWord = e.value;
				uni.requestWithCookie({
					url:this.$store.state.apiBaseUrl+"/api/Assignment/search/"+encodeURIComponent(this.searchWord)+"?count=10&offset="+this.maxid,
					success:(res)=>{
						if(res.statusCode === 200){
							this.tasks = res.data;
							this.show = false
						}else{
							uni.showToast({
								title: "网络出错！"
							})
						}
						
					}
				});
				const i = this.recents.findIndex((item)=>item===e.value)
				if(i!==-1){
					this.recents.splice(i,1);
					this.recents.unshift(e.value);
				}else{
					if(this.recents.length>=10){
						this.recents.pop();
					}
					this.recents.unshift(e.value);
				}
				uni.setStorage({
					key:StorageKeys.searchs,
					data:this.recents
				})
			},
			searchx(w){
				let e = {};
				e.value = w;
				this.search(e)
			},
			clear(e){
				this.tasks = [];
				this.show = true
			},
			del(e){
				const i = this.recents.findIndex((item)=>item===e)
				if(i!==-1){
					this.recents.splice(i,1)
				}
				uni.setStorage({
					key:StorageKeys.searchs,
					data:this.recents
				})
			}
		},
		onReachBottom() {
			this.status = "loading";
			uni.requestWithCookie({
				url:this.$store.state.apiBaseUrl+"/api/Assignment/search/"+encodeURIComponent(this.searchWord)+"?count=10&offset="+this.maxid,
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
			this.recents = uni.getStorageSync(StorageKeys.searchs)||this.recents;
			uni.request({
				url:this.$store.state.apiBaseUrl+"/api/Information/popular",
				success: (res) => {
					if(res.statusCode===200){
						this.hots = res.data
					}
				}
				
			})
		}
		
	}
</script>

<style>
	@import url('../../common/myicon.css');
	@import url('../index/index.css');
	.container {
	  display: flex;
	  flex-wrap: wrap;
	}
	
	.item {
	  flex: 0 0 50%; /* 每列占50%的宽度 */
	  padding: 10px;
	  box-sizing: border-box;
	}
	
	.history-item{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 40px;
	}
	
	.clock{
		width: 30px;
		margin-right: 40px;
	}
	
	.delbtn{
		position: fixed;
		right: 20px;
	}

</style>
