<template>
	<view>
		<uni-segmented-control :current="current" :values="items" style-type="text"
			active-color="#4cd964" @clickItem="onClickItem" ></uni-segmented-control>
		<view style="width: 96%;margin-left: auto;margin-right: auto;">
			<view v-if="current === 0">
				<view v-for="item in all" :key="item.id" style="margin-top:5px;">
				  <bill v-bind:bill="item" style="margin-top:5px;"/>
				</view>
			</view>
			
			<view v-if="current === 1">
				<view v-for="item in completes" :key="item.id" style="margin-top:5px;">
				  <bill v-bind:bill="item" style="margin-top:5px;"/>
				</view>
			</view>
			
			<view v-if="current === 2">
				<view v-for="item in incompletes" :key="item.id" style="margin-top:5px;">
				  <bill v-bind:bill="item" style="margin-top:5px;"/>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				items:["全部","已完成","未完成"],
				all: []
			}
		},
		computed:{
			incompletes(){
				return this.all.filter(item=>item.status===0)
			},
			completes(){
				return this.all.filter(item=>item.status===1)
			}
		},
		mounted() {
			let qurl = this.$store.state.apiBaseUrl+"/api/Bill";
			uni.request({
				url: qurl,
				success: (res) => {
					if(res.statusCode===200){
						this.all = res.data;
					}
				}
			})
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			}
		},
		onLoad() {
			if(!this.$store.state.$hasLogin){
				uni.navigateTo({
					url:"/pages/login/login?refer=order"
				})
			}
		}
	}
</script>

<style>

</style>
