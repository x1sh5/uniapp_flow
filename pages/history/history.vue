<template>
	<view>
		<view v-for="item in $historys" :key="item.id" style="margin-top:5px;">
		  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="'show'" style="margin-top:5px;"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasHistorys:false,
				$historys:[],
			}
		},
		methods: {
			getHistories(count,offset){
				return new Promise((resolve,reject)=>{
					let qurl = this.$store.state.apiBaseUrl+"/api/History?count="+count+"&offset="+offset;
					uni.requestWithCookie({
						url:qurl,
						success: (res) => {
							if(res.statusCode === 200){
								if(res.data["$values"]){
									resolve(res.data["$values"])
								}
								
							}else{
								reject()
							}
						},
						fail:(err)=>{
							reject(err)
						}
					});
				});
			}
		},
		computed:{
			history(){
				return this.$historys;
			}
		},
		onReachBottom() {
			
		},
		onLoad() {
			this.getHistories(30,0)
				.then((res)=>{
					this.$historys = res
				})
				.catch((err)=>{
					console.error(err)
				})
		}
	}
</script>

<style>

</style>
