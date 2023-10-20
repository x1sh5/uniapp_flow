<template>
	<view class="container" style="background-image: url('/static/beijing.png');">
	  <!-- 页面内容 -->
	</view>
	<text class="t">让生活自在掌握~</text>
	<view class="usercenter">
	<form @submit="login" >
	<text class="y">用户名：</text>
	<input name="userName" class="lg-input" type="text" value=""/>
	<text class="y">密码：</text>
	<input name="password" class="lg-input" password value=""/>
	<button class="login-button" form-type="submit">登录</button>
	</form>
	<button class="register-button" @click="register">还未注册？</button>
	
	</view>
</template>

<script>
	// #ifdef MP-WEIXIN
	const cookieManager = require("../common/weapp-cookie.js");
	// #endif
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
					success:(res)=> {
						console.log(res);
						if(res.statusCode===200){
							let domain = url.split("/")[2].split(":")[0];
							cookieManager.default.setResponseCookies(res.data.accessToken,domain);
							cookieManager.default.setResponseCookies(res.data.refreshToken,domain);
							that.$store.commit("login");
							that.$store.commit("setUserName", res.data.userName);
							that.$store.commit("setUserAvatar",res.data.Avatar);
							// uni.navigateBack({
							// 	delta:that.depth
							// })
							if(this.refer === "order"){
								uni.redirectTo({
									url: "/pages/order/order"
								});
							}else{
								uni.reLaunch({
									url: '/pages/userCenter/userCenter'
								})
							}

						}else if(res.statusCode===401){
							uni.showModal({
								content: res.data,
								showCancel:false
							})
						}

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
			this.refer = refer;
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
