<template>
	<view>
		<uni-segmented-control :current="current" :values="items" style-type="text"
			active-color="#4cd964" @clickItem="onClickItem" ></uni-segmented-control>
		<view style="width: 90%;">
			<view v-if="current === 0">
				<view v-for="item in $incompletes" :key="item.id" style="margin-top:5px;">
				  <cardinfo v-bind:task="item" v-bind:editable="false" style="margin-top:5px;"/>
				</view>
			</view>
			
			<view v-if="current === 1">
				<view v-for="item in $completes" :key="item.id" style="margin-top:5px;">
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
				items:["待完成","完成项目"],
				current: 0,
				$incompletes:false,//数组，false表示为初始化
				$completes:false,//数组，false表示为初始化
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
				if(!this.$publish){
					uni.requestWithCookie({
						url:this.$store.state.apiBaseUrl+"/api/Assignment/user",
						success(res) {
							this.$nextTick(
								function(e){
									this.$publish = res.data["$values"]
								}
							)
						}
					})
				}
				return this.$publish;
			}
		}
	}
</script>

<style lang="less">

</style>
