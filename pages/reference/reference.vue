<template>
	
	<view class="content">
		<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索审核区间" clearButton="auto" cancelButton="none"
			@focus="search" />
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			
		</swiper></view>
		
		
	<view>
		<view v-for="d in datas" :key="d.id" @click="detail(d.id)" class="title">
			{{d.title}}
		</view>
		<view class="addcontainer" @click="newRefer">
			<text class="add-icon icon-jiahao"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			datas(){
				return this.$store.getters["Refer/refers"]
			}
		},
		methods: {
			detail(id){
				
				uni.navigateTo({
					url:"detail/detail?id="+id
				})
			},
			newRefer(e){
				uni.navigateTo({
					url: "new/new"
				})
			}
		},
		onLoad() {
			let curl = this.$store.state.apiBaseUrl+"/api/Reference/count";
			
			let qurl = this.$store.state.apiBaseUrl+"/api/Reference/gets";
			
			uni.request({
				url: curl,
				success: (res) => {
					uni.requestWithCookie({
						url: qurl,
						method: "GET",
						success: (res) => {
							this.$store.commit("Refer/updateRefers", res.data);
						}
					});
				}
			})
			
			

		}
	}
</script>

<style>
	@import url('../../common/myicon.css');
	
  .title{
	display: flex;
    height: 40px;
    width: 80%;
    background-color: rgb(218 175 178 / 10%);
    margin-left: auto;
    margin-right: auto;
    /* align-content: center; */
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
	margin-bottom: 5px;
  }
	 
  .addcontainer{
	  width: 55px;
	  height: 55px;
	  position: fixed;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  z-index: 10;
	  border-width: 0px;
	  border-radius: 45px;
	  box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.3);
	  right: 50px;
	  bottom: 50px;
	  background-color: rgb(0, 122, 255);
  }
  
  .add-icon{
	  color: rgb(255, 255, 255);
	  font-size: 32px;
	  font-weight: 200;
	  font-family: myicon;
	  text-decoration: none;
	  text-align: center;
  }
  
  
</style>
