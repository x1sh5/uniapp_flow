<template>
	<view>
		<uni-segmented-control :current="current" :values="items" style-type="text"
			active-color="#4cd964" @clickItem="onClickItem" ></uni-segmented-control>
		<view style="width: 90%;">
			<view v-if="current === 0">
				<view v-for="item in $publishs" :key="item.id" style="margin-top:5px;">
				  <cardinfo v-bind:task="item" v-bind:editable="false" style="margin-top:5px;"/>
				</view>
			</view>
			
			<view v-if="current === 1">
				<view v-for="item in $historys" :key="item.id" style="margin-top:5px;">
				  <cardinfo v-bind:task="item" v-bind:editable="false" style="margin-top:5px;"/>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {nextTick} from "vue"
	export default {
		data() {
			return {
				items:["历史发布","浏览记录","草稿箱"],
				current: 0,
				$publishs:false,//数组，false表示为初始化
				$historys:false,//数组，false表示为初始化
				//$complete:false,//数组，false表示为初始化
			};
		},
		methods:{
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
		},
		computed:{
			publishs(){
				if(!this.$publishs){
					console.log("get user task")
					uni.requestWithCookie({
						url:this.$store.state.apiBaseUrl+"/Assignment/user",
						success(res) {
							this.$nextTick(
								function(e){
									this.$publishs = res.data["$values"]
								}
							)
						}
					})
				}
				return this.$publishs;
			}
		},
		onLoad(options) {
			console.log("get user task")
			uni.requestWithCookie({
				url:this.$store.state.apiBaseUrl+"/Assignment/user",
				success(res) {
					this.$publishs = res.data["$values"]
				}
			})
		}
	}
</script>

<style lang="less">

</style>
