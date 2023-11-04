<template>
	<view id="topanchor"></view>
	<view class="content">
		<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索任务" clearButton="auto" cancelButton="none" @focus="search" />
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000"
				:duration="500">
			<swiper-item><view class="swiper-item uni-bg-red">A</view></swiper-item>
			<swiper-item><view class="swiper-item uni-bg-green">B</view></swiper-item>
			<swiper-item><view class="swiper-item uni-bg-blue">C</view></swiper-item>
		</swiper>
		
		<view class="button-container" >
			<button class="button" v-for="item in branchTypes" :key="item.id" @click="searchByTpe(item.id,item.name)">{{ item.name }}</button>
		</view>
		
		<view v-for="item in tasks" :key="item.id" class="custom-margin">
		  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="'waitfor'" style="margin-top:5px;"/>
		</view>
		<uni-load-more v-show="showmore" iconType="auto" :contentText="contentText" :status="status"></uni-load-more>
		
		<view id="top" class="totop" @click="backtotop">
			<view class="topicon"></view>
			<view>顶部</view>
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
				curBranchid:"",
				taskTypeName:"全部",
				status: "more",
				contentText: {contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"}
			}
		},
		onLoad() {
			console.log("page index onload");
			
		},
		mounted() {
			
			
			    // 获取容器元素
			    const container = document.querySelector('.button-container');
			    
			    // 添加滚动监听
			    container.addEventListener('scroll', (event) => {
			      // 获取滚动位置
			      const scrollLeft = event.target.scrollLeft;
			
			      // 判断是否需要隐藏或显示按钮
			      const buttons = document.querySelectorAll('.button');
			      buttons.forEach((button) => {
			        const buttonLeft = button.offsetLeft;
			        const buttonWidth = button.offsetWidth;
			
			        // 判断按钮是否在可视区域内，你可以根据滚动位置和按钮位置来判断
			        if (buttonLeft < scrollLeft || buttonLeft > scrollLeft + container.offsetWidth) {
			          button.style.display = 'none';
			        } else {
			          button.style.display = 'block';
			        }
			      });
			    });
			    
			
			
			this.$store.dispatch('fetchTasks',{count:10,offset:0, branchid:""})
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
			},
			showmore(){
				return this.tasks&&this.tasks.length>0
			}
		},
		methods:{
			
			  // 计算每个按钮的宽度
			  calculateButtonWidth() {
			    const containerWidth = 1500; // 容器的固定宽度
			    const buttonCount = this.branchTypes.length; // 按钮数量
			    return `${containerWidth / buttonCount}px`;
			  },
			
			
			search(e){
				console.log("confirm:",e)
				let searchWord = e.value;
				uni.navigateTo({
					url:"/pages/searchResult/searchResult"

				})
			},//requestWithCookie
			searchByTpe(id, name){
				this.curBranchid = id;
				this.taskTypeName = name;
				this.updateData();
				
			},
			inputEvent(e){
				console.log(e)
			},
			changeEvent(e){
				console.log(e)
			},
			modelChange(e){
				console.log(e)
			},
			backtotop(e){
				uni.pageScrollTo({
					selector:"#app",
					scrollTop:0
				})
				// uni.createSelectorQuery()
				// .select(".custom-margin")
				// .boundingClientRect((res)=>{
				// 	console.log(res)

				// }).exec()
			},
			updateData(){
				let maxIndex = this.maxIndex;
				this.status = "loading";
				this.$store.dispatch('fetchTasks',{count:10,offset:maxIndex, branchid:this.curBranchid})
				.then(data => {
					 this.$store.commit('updateTasks', {taskTypeName: this.taskTypeName, data: data});
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
			 this.$store.dispatch('fetchTasks',{count:10,offset:0, branchid:this.curBranchid})
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
