<template>
	<view class="usercenter">
		<form @submit="login" style="margin: 20px 10px;">
			<text>用户名：</text><input name="userName" class="lg-input" type="text" value="lisi" />
			<text>密码：</text><input name="password" class="lg-input" type="safe-password" value="lisi1234"/>
			<button form-type="submit">登录</button>
		</form>
		<button @click="register">注册</button>
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
				const url = this.$store.state.apiBaseUrl+"/api/Account/login"
				uni.requestWithCookie({
					url:url,
					method:"POST",
					data:JSON.stringify(e.detail.value),
					success(res) {
						console.log(res);
						console.log(that.$store);
						let domain = url.split("/")[2].split(":")[0];
						uni.setResponseCookies(res.data.accessToken,domain);
						uni.setResponseCookies(res.data.refreshToken,domain);
						that.$store.commit("changeLoginState");
						that.$store.commit("setUserName", res.data.userName);
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
			},
			register(){
				uni.navigateTo({
					url:"/pages/register/register"
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
	@import url('./login.css');
</style>
