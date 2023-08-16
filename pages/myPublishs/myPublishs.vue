<template>
	<view>
		<view v-for="item in publishs" :key="item.id" style="margin-top:5px;">
		  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="'show'" style="margin-top:5px;"/>
		</view>
	</view>
</template>

<script>
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
			
		},
		onLoad() {
			if(!this.hasPushlishs){
				console.log("get user task")
				uni.requestWithCookie({
					url:this.$store.state.apiBaseUrl+"/api/Assignment/user",
					success: (res) => {//必须用箭头函数
						this.$data.$publishs = res.data["$values"];
						this.hasPushlishs = true;
					}
				})
			}
		}
	}
</script>

<style>

</style>
