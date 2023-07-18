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
						uni.navigateBack()
					},
					fail(err) {
						console.log(err)
					},
					complete() {
						
					}
				})
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
