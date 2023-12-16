<template>
	<view>
		<form class="usercenter" @submit="register">
			<view>
				<input class="rg-input" name="name" @blur="nameCheckEvent" maxlength="15" placeholder="昵称：" />
				<view class="tips">{{nameCheckTip}}</view>
			</view>
			<view>
				<input class="rg-input" name="password" type="safe-password" @blur="pwdCheckEvent" maxlength="20"
					placeholder="密码：" />
				<view class="tips">{{pwdCheckTip}}</view>
			</view>
			<view>
				<input class="rg-input" name="affirm" type="safe-password" @blur="pwdVerifyEvent" maxlength="20"
					placeholder="确认密码：" />
				<view class="tips">{{pwdVerifyTip}}</view>
			</view>
			<view>
				<input class="rg-input" name="email" @blur="emailCheckEvent" maxlength="25" placeholder="邮箱(选填)：" />
				<view class="tips">{{emailCheckTip}}</view>
			</view>
			<view>
				<input class="rg-input" name="phone" @blur="phoneCheckEvent" maxlength="12" placeholder="手机号码(选填)：" />
				<view class="tips">{{phoneCheckTip}}</view>
			</view>
			<view>
				<checkbox :checked="isChecked" name="aggrement" @click="agreementCheckEvent"
					style="transform:scale(0.7); margin-top: 5%;" />
				<label for="checkbox" style="font-size: smaller;">我已阅读并同意<label @click="toAbout"
						style="color: #6c4ad1;">《流沙任务系统用户服务协议》</label></label>
				<view class="tips">{{aggrementCheckTip}}</view>
			</view>
			<button class="lgtip-button" form-type="submit">注册</button>
			<view class="tips" style="height: 20px;">{{logintips}}</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logintips: "",
				nameCheckTip: "", //名字检查出错后的提示
				nameVerify: false,
				pwdCheckTip: "",
				pwdVerify: false,
				pwdVerifyTip: "",
				pwdAffirm: false,
				pwd: "", //密码暂存
				emailCheckTip: "",
				emailVerify: false,
				phoneCheckTip: "",
				phoneVerify: false,
				aggrementCheckTip: "",
				isChecked: false
			}
		},
		methods: {
			nameCheckEvent(event) {

				let name = event.detail.value;
				if (name.length < 1) {
					this.nameCheckTip = "姓名不能为空";
					return
				}
				let checkUrl = this.$store.state.apiBaseUrl + "/api/Account/namecheck?username=" + encodeURIComponent(
				name);
				uni.request({
					url: checkUrl,
					success: (res) => {
						if (res.statusCode === 200) {
							this.nameCheckTip = res.data.data.msg;
							if (res.data.data.status) {
								this.nameVerify = true
							}
						}
					}
				});
			},
			pwdCheckEvent(event) {

				let password = event.detail.value;
				if (password.length < 8) {
					this.pwdCheckTip = "长度必须大于7位"
					return
				}

				// 检查是否包含大写字母
				if (!/[A-Z]/.test(password)) {
					this.pwdCheckTip = "密码中必须要有大写字母";
					return
				}

				// 检查是否包含数字
				if (!/\d/.test(password)) {
					this.pwdCheckTip = "密码中必须要有数字";
					return
				}

				// 检查是否包含特殊符号，您可以根据需要修改特殊符号的正则表达式
				if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password)) {
					this.pwdCheckTip = "密码中必须要有特殊字母";
					return
				}
				this.pwdCheckTip = "密码可用";
				this.pwd = password;
				this.pwdVerify = true;
			},
			pwdVerifyEvent(event) {

				let affirmPwd = event.detail.value;
				if (affirmPwd !== this.pwd) {
					this.pwdVerifyTip = "必须跟密码保持一致";
					return
				}
				this.pwdAffirm = true;
				this.pwdVerifyTip = "密码确认成功";
			},
			emailCheckEvent(event) {

				let email = event.detail.value;
				const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				let isOk = regex.test(email);
				if (!isOk) {
					this.emailCheckTip = "邮箱格式不正确";
					return
				}
				let checkUrl = this.$store.state.apiBaseUrl + "/api/Account/emailcheck?email=" + encodeURIComponent(email);
				uni.request({
					url: checkUrl,
					success: (res) => {
						if (res.statusCode === 200) {
							this.emailCheckTip = res.data.data.msg;
							if (res.data.data.status) {
								this.emailVerify = true
							}
						}
					}
				});
			},
			phoneCheckEvent(event) {

				let phone = event.detail.value;

				let checkUrl = this.$store.state.apiBaseUrl + "/api/Account/phonecheck?phoneNo=" + encodeURIComponent(
					phone);
				uni.request({
					url: checkUrl,
					success: (res) => {
						this.phoneCheckTip = res.data.data.msg;
						if (res.data.data.status) {
							this.phoneVerify = true;
						}
					}
				});
			},
			agreementCheckEvent(event) {
				this.isChecked = !this.isChecked

				if (this.isChecked == false) {
					this.aggrementCheckTip = "请勾选同意《用户协议》";
					return
				}
				if (this.isChecked == true) {
					this.aggrementCheckTip = "";
					return
				}
			},
			toAbout(e) {
				uni.navigateTo({
					url: "/pages/userCenter/about/about"
				});
			},
			register(e) {

				let registerView = {
					userName: e.detail.value.name,
					phoneNo: e.detail.value.phone,
					password: e.detail.value.affirm,
					email: e.detail.value.email
				}
				let url = this.$store.state.apiBaseUrl + "/api/Account/register";
				if (this.isChecked == true) {
					uni.request({
						url: url,
						method: "POST",
						data: registerView,
						success: (res) => {
							if (res.statusCode === 200) {
								uni.showModal({
									title: '',
									content: '注册成功',
									cancelText: '去登录',
									confirmText: '实名认证',
									success: function(res) {
										if (res.confirm) {
											uni.navigateTo({
												url:"/pages/settings/identityCheck/identityCheck"
											})
										} else if (res.cancel) {
											uni.switchTab({
												url: "/pages/userCenter/userCenter"
											})
										}
									}
								});
							} else {
								uni.showModal({
									showCancel:true,
									content:res.data.message
								})
								this.logintips = res.data.message;
							}
						}
					})
				} else {
					uni.showModal({
						title: '',
						content: '请先勾选同意《用户协议》',
						showCancel: false,
						confirmText: '返回',
					});
				}
			}
		}
	}
</script>

<style>
	@import url('./accountInfo.css');
</style>