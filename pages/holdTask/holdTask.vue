<template>
	<view>
		<uni-segmented-control :current="current" :values="items" style-type="text"
			active-color="#4cd964" @clickItem="onClickItem" ></uni-segmented-control>
		<view style="width: 90%;">
			<view v-if="current === 0">
				<view v-for="item in $incompletes" :key="item.id" style="margin-top:5px;">
				  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="'todo'" style="margin-top:5px;"/>
				</view>
			</view>
			
			<view v-if="current === 1">
				<view v-for="item in $completes" :key="item.id" style="margin-top:5px;">
				  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="'done'" style="margin-top:5px;"/>
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
			// 1 incomplete 2 completed
			getByStatus(status){
				return new Promise((resolve,reject)=>{
					let qurl = this.$store.state.apiBaseUrl+"/api/AssignmentUser/status/"+status;
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
			incompletes(){
				return this.$data.$incompletes;
			},
			completes(){
				return this.$data.$completes;
			}
		},
		onLoad() {
			this.getByStatus(1)
				.then((res)=>this.$data.$incompletes = res)
				.catch((err)=>console.log(err));
				
			this.getByStatus(2)
				.then((res)=>this.$data.$completes = res)
				.catch((err)=>console.log(err));
		}
	}
</script>

<style lang="less">

</style>
