<template>
	<view id="topanchor"></view>
	<view class="content">
		<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索任务" clearButton="auto" cancelButton="none"
			@focus="search" />
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500">
			<swiper-item>
			  <image 
			    class="swiper-item-image"
			    src="/static/p1.png">
			  </image>
			</swiper-item>
			
			<swiper-item>
			  <image
			   class="swiper-item-image"
			   src="/static/p2.png">
			  </image>  
			</swiper-item>
			
			<swiper-item>
			  <image
			   class="swiper-item-image" 
			   src="/static/p3.png">
			  </image>
			</swiper-item>
		</swiper>

		<!-- 	 	<view class="button-container" >
			<button class="button" v-for="item in branchTypes" :key="item.id" @click="searchByTpe(item.id,item.name)">{{ item.name }}</button>
		</view> -->

		<view>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
				<view :style="{color:currentTab==index ? '#6c4ad1' : '#8d8aa1'}" :data-current="index"
					v-for="(item,index) in branchTypes" :key="index" class="sc-button"
					@click="searchByTpe(item.id,item.name)">{{ item.name }}</view>
			</scroll-view>
		</view>

		<!-- 		<swiper :current="currentTab" @change="itemChange">
			<swiper-item v-for="(item,index) in branchTypes" :key="item.id">
				<view v-for="item in tasks" :key="item.id" class="custom-margin">
					<cardinfo v-bind:task="item" v-bind:editable="false" :mode="'waitfor'" style="margin-top:5px;"/>
				</view>
			</swiper-item>
		</swiper> -->

		<view v-for="item in tasks" :key="item.id" class="custom-margin">
			<cardinfo v-bind:task="item" v-bind:editable="false" :mode="'waitfor'" style="margin-top:5px;" />
		</view>
		<uni-load-more v-show="showmore" iconType="auto" :contentText="contentText" :status="status"></uni-load-more>

		<view id="top" class="totop" @click="backtotop">
			<view class="topicon"></view>
			<view>顶部</view>
		</view>
		<!-- <uni-paginati on prevText="上一页" nextText="下一页" piecePerPageText="页" pageSize="10" :total="total" 
			@update:modelValue="modelChange"></uni-pagination>  -->
	</view>

</template>

<script>
	//import stroe from "./../../store/index.js"
	export default {
		data() {
			return {
				title: 'Hello',
				currentTab: 0,
				curBranchid: "",
				taskTypeName: "全部",
				status: "more",
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		onLoad() {
			console.log("page index onload");

		},
		mounted() {
			this.$store.dispatch('fetchTasks', {
					count: 10,
					offset: 0,
					branchid: ""
				})
				.then(data => {
					this.$store.commit('setTasks', {
						taskTypeName: "全部",
						data: data
					});
					// 在这里处理获取到的数据
				})
				.catch(error => {
					console.error('获取数据失败：', error);
					// 在这里处理错误情况
				});
		},
		computed: {
			tasks: {
				get() {
					//console.log("index tasks:",this.$store.getters.getTasks(this.taskTypeName))
					return this.$store.getters.getTasks(this.taskTypeName)
				},
				set(value) {
					this.$store.commit('setTasks', {
						taskTypeName: this.taskTypeName,
						data: value
					})
				}
			},
			allTasks() {
				return this.$store.state.tasks.values()
			},
			branchTypes() {
				let ts = this.$store.state.branchs;

				return [{
					id: "",
					name: "全部"
				}, ...ts];
			},
			branchs() {
				return this.$store.state.branchs;
			},
			total() {
				return this.$data.$total;
			},
			maxIndex() {
				if (this.tasks.length > 0) {
					return this.tasks[this.tasks.length - 1].id
				}
				return 0;
			},
			showmore() {
				return this.tasks && this.tasks.length > 0
			}
		},
		methods: {

			// 计算每个按钮的宽度
			calculateButtonWidth() {
				const containerWidth = 1500; // 容器的固定宽度
				const buttonCount = this.branchTypes.length; // 按钮数量
				return `${containerWidth / buttonCount}px`;
			},


			search(e) {
				console.log("confirm:", e)
				let searchWord = e.value;
				uni.navigateTo({
					url: "/pages/searchResult/searchResult"

				})
			}, //requestWithCookie
			searchByTpe(id, name) {
				if(id===''){
					this.currentTab = 0
				}
				else{
					this.currentTab = id
				}

				this.curBranchid = id;
				this.taskTypeName = name;
				this.updateData();

			},
			inputEvent(e) {
				console.log(e)
			},
			changeEvent(e) {
				console.log(e)
			},
			modelChange(e) {
				console.log(e)
			},
			backtotop(e) {
				uni.pageScrollTo({
					selector: "#app",
					scrollTop: 0
				})
				// uni.createSelectorQuery()
				// .select(".custom-margin")
				// .boundingClientRect((res)=>{
				// 	console.log(res)

				// }).exec()
			},
			updateData() {
				let maxIndex = this.maxIndex;
				this.status = "loading";
				this.$store.dispatch('fetchTasks', {
						count: 10,
						offset: maxIndex,
						branchid: this.curBranchid
					})
					.then(data => {
						this.$store.commit('updateTasks', {
							taskTypeName: this.taskTypeName,
							data: data
						});
						// 在这里处理获取到的数据
						this.status = "more";
					})
					.catch(error => {
						console.error('获取数据失败：', error);
						// 在这里处理错误情况
					});
			}
		},
		//上拉更新数据
		onReachBottom() {
			this.updateData()
		},
		//下拉刷新页面
		async onPullDownRefresh() {
			await this.$store.dispatch("fetchBranchs");
			await this.$store.dispatch("fetchTaskTypes");
			this.$store.dispatch('fetchTasks', {
					count: 10,
					offset: 0,
					branchid: this.curBranchid
				})
				.then(data => {
					this.$store.commit('setTasks', {
						taskTypeName: this.taskTypeName,
						data: data
					});
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

	.scroll-Y {
		height: 300rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.select {
		color: #fb6583;
	}
</style>