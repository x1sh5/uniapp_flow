<template>
	<view class="container" style="background-image: url('https://liusha-gy.com/flow/static/beijing.png'); background-size: cover; background-position: center center;">
	    <!-- 页面内容 -->
	</view>
	<text class="t">让生活自在掌握~</text>
	
	<!--考虑了一下跳过暂时可以不用加，用户不想登录可以直接左上退出页面-->
	<!----><button @click="skip" style="position: absolute;right: 0px;margin-right: 20px;width: 60px;height: 40px;">跳过</button>
	<view class="usercenter">
		<form @submit="login">
			<text class="y">用户名：</text>
			<input name="userName" class="lg-input" type="text" value="" />
			<text class="y">密码：</text>
			<input name="password" class="lg-input" password value="" />
			<button class="login-button" form-type="submit">登录</button>
			
		</form>
		<button class="register-button" @click="register">还未注册？</button>
		<!-- <button class="weixin-login-button" @click="weixin_login">使用微信登录</button> -->

	</view>
</template>

<script>
	import {
		cookieManager
	} from "/common/weapp-cookie.js"
	export default {
		data() {
			return {
				depth: 1
			};
		},
		methods: {
			skip(e){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			login(e) {
				console.log(e)
				const that = this;
				const url = this.$store.state.apiBaseUrl + "/api/Account/login";
				e.detail.value.openId = this.$store.state.openid;
				uni.request({
					url: url,
					method: "POST",
					data: JSON.stringify(e.detail.value),
					success: (res) => {
						console.log(res);
						if (res.statusCode === 200) {
							let domain = url.split("/")[2].split(":")[0];
							cookieManager.default.setResponseCookies(res.data.accessToken, domain);
							cookieManager.default.setResponseCookies(res.data.refreshToken, domain);
							that.$store.commit("login");
							that.$store.commit("setUserName", res.data.userName);
							that.$store.commit("setUserAvatar", res.data.avatar);
							that.$store.commit("setIntroduce", res.data.introduce);
							// uni.navigateBack({
							// 	delta:that.depth
							// })
							if (this.refer === "order") {
								uni.redirectTo({
									url: "/pages/order/order"
								});
							} else {
								uni.reLaunch({
									url: '/pages/userCenter/userCenter'
								})
							}

						} else if (res.statusCode === 401) {
							uni.showModal({
								content: res.data,
								showCancel: false
							})
						}

					},
					complete() {

					}
				})
			},
			// weixin_login(){
			// 	uni.login({
 			// 		success (res) {
			// 			console.log(res.code)
    		// 			if (res.code) {
   			// 	   		//发起网络请求
    		// 		 		 uni.request({
			// 					url: url,
			// 					method: 'POST',
      		// 		  			data: {
     		// 		     			code: res.code,
			// 						appSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            //              			appId: 'wxbef31cb0acc4e14c'
    		// 		    		}
    		// 		  		})
    		// 			} else {
      		// 			console.log('登录失败！' + res.errMsg)
   			// 			}
 			// 		}
			// 	})
			// },
			register() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			}
		},
		onLoad(op) {
			const refer = op.refer;
			this.refer = refer;
			if (refer === 'usercenter') {

				this.depth = 1
			} else {
				this.depth = 3
			}
		},

	}
</script>

<style lang="less">
	@import url('./login.css');
</style>