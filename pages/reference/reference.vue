<template>
	<view>
		<view v-for="d in datas" :key="d.id" @click="detail(d.id)">
			{{d.title}}
		</view>
		<view class="addcontainer" @click="newRefer">
			<text class="add-icon"></text>
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
					if(this.datas.length!== parseInt(res.data)){
						uni.requestWithCookie({
							url: qurl,
							method: "GET",
							success: (res) => {
								this.datas = res.data;
							}
						})
					}
				}
			})
			
			

		}
	}
</script>

<style>
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
	  font-family: uniicons;
	  text-decoration: none;
	  text-align: center;
  }
  
  .add-icon::before{
	  content: "\e67b";
  }
  
</style>
