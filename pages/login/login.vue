<template>
	<view>
		<form @submit="login" style="margin: 20px 10px;">
			<text>用户名：</text><input name="userName" class="lg-input" type="text" />
			<text>密码：</text><input name="password" class="lg-input" type="safe-password"/>
			<button form-type="submit">登录</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				depth:1
			};
		},
		methods:{
			login(e){
				console.log(e)
				const that = this;
				uni.request({
					url:this.$store.state.apiBaseUrl+"/Account/login",
					method:"POST",
					data:JSON.stringify(e.detail.value),
					success(res) {
						console.log(res);
						//console.log(that.$store);
						that.$store.commit("changeLoginState");
						uni.navigateBack({
							delta:that.depth
						})
					},
					fail(err) {
						console.log(err)
					},
					complete() {
						
					}
				})
			}
		},
		onLoad(op) {
			const refer = op.refer
			console.log(refer)
			if(refer==='usercenter'){
				console.log("equal")
				this.depth = 1
			}else{
				this.depth = 3
			}
		},
		
	}
</script>

<style lang="less">
	.lg-input{
		border: 1px solid #aaff7f;
		width: 70%;
		height: 32px;
	}
</style>
