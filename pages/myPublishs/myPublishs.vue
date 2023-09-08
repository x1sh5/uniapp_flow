<template>
	<view>
		<view v-for="item in publishs" :key="item.id" class="custom-margin">
		  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="mode(item)" @click.native="toDetails" style="margin-top:5px;"/>
		</view>
	</view>
</template>

<script>
	import { TaskStatus } from '../../common/Task';
	export default {
		data() {
			return {
				hasPushlishs:false,
				$publishs:[],
			}
		},
		computed:{
			publishs(){
				//必须使用this.$data.$publishs;而不能使用this.$publishs;
				//because it starts with a reserved character ("$" or "_") and is not proxied on the render context
				return this.$data.$publishs;
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
					url:"/pages/myTaskDetail/myTaskDetail"
				})
			},
			removeById(id){
				let index = this.publishs.findIndex(item=>item.id==id);
				if(index!=-1){
					this.publishs.splice(index,1);
				}
			}
		},
		onLoad() {
			if(!this.hasPushlishs){
				console.log("get user task")
				uni.requestWithCookie({
					url:this.$store.state.apiBaseUrl+"/api/Assignment/user",
					success: (res) => {//必须用箭头函数
						this.$data.$publishs = res.data;
						this.hasPushlishs = true;
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../common/commen.css");
</style>
