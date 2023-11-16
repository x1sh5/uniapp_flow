<template>
	<view>
		<view v-for="item in publishs" :key="item.id" class="custom-margin">
			<!-- #ifdef H5 -->
			<cardinfo v-bind:task="item" v-bind:editable="false" :mode="mode(item)" @click.native="toDetails(item.id)" style="margin-top:5px;"/>
			<!-- #endif -->
		  <!-- #ifdef MP-WEIXIN -->
		  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="mode(item)" @click.capture="toDetails(item.id)" style="margin-top:5px;"/>
		  <!-- #endif -->
		  
		</view>
	</view>
</template>

<script>
	import { TaskStatus } from '../../common/Task';
	export default {
		data() {
			return {
				hasPushlishs:false,
				$publishs:[],//以发布任务
			}
		},
		computed:{
			publishs(){
				//必须使用this.$data.$publishs;而不能使用this.$publishs;
				//because it starts with a reserved character ("$" or "_") and is not proxied on the render context
				return this.$data.$publishs;
			},
			maxid(){
				if(this.$data.$publishs.length===0){
					return 0
				}
				return this.$data.$publishs[this.$data.$publishs.length-1].id;
			}
		},
		methods: {
			mode(item){
				if(item.status===TaskStatus.WaitForAccept)return 'waitfor';//待接状态
				if(item.status===TaskStatus.Unfinished)return 'undone';//待完成
				return 'done';
			},
			toDetails(e){
				uni.navigateTo({
					url:"/pages/myTaskDetail/myTaskDetail?id="+e
				})
			},
			removeById(id){
				let index = this.publishs.findIndex(item=>item.id==id);
				if(index!=-1){
					this.publishs.splice(index,1);
				}
			},

		},
		onLoad() {
			if(!this.hasPushlishs){
				console.log("get user task")
				uni.requestWithCookie({
					url:this.$store.state.apiBaseUrl+"/api/Assignment/user?count=10&offset="+this.maxid,
					success: (res) => {//必须用箭头函数
						this.$data.$publishs = res.data;
						this.hasPushlishs = true;
					}
				})
			}
		},
		onReachBottom() {
			
		}
	}
</script>

<style>
	@import url("../../common/commen.css");
</style>
