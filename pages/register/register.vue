<template>
	<view>
		<form @submit="register" style="display: flex;flex-direction: column;">
			<view style="display: flex;flex-direction: row;">
				<text>姓名：</text><input class="rg-input" name="name" @blur="nameCheckEvent" maxlength="15"/>
				<view>{{nameCheckTip}}</view>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>密码：</text><input class="rg-input" name="password" type="safe-password" @blur="pwdCheckEvent" maxlength="20"/>
				<view>{{pwdCheckTip}}</view>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>确认密码：</text><input class="rg-input" name="affirm" type="safe-password" @blur="pwdVerifyEvent" maxlength="20"/>
				<view>{{pwdVerifyTip}}</view>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>邮件：</text><input class="rg-input" name="email" @blur="emailCheckEvent" maxlength="20"/>
				<view>{{emailCheckTip}}</view>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>电话：</text><input class="rg-input" name="phone" @blur="phoneCheckEvent" maxlength="12"/>
				<view>{{phoneCheckTip}}</view>
			</view>
			<button form-type="submit">注册</button>
			<view style="height: 20px;">{{logintips}}</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logintips:"",
				nameCheckTip: "", //名字检查出错后的提示
				nameVerify: false,
				pwdCheckTip: "",
				pwdVerify: false,
				pwdVerifyTip: "",
				pwdAffirm: false,
				pwd: "",//密码暂存
				emailCheckTip: "",
				emailVerify: false,
				phoneCheckTip: "",
				phoneVerify: false
			}
		},
		methods: {
			nameCheckEvent(event){
				console.log(event)
				let name = event.detail.value;
				if(name.length<1){
					this.nameCheckTip = "姓名不能为空";
					return
				}
				let checkUrl = this.$store.state.apiBaseUrl+"/api/Account/namecheck?username="+encodeURI(name);
				uni.request({
					url:checkUrl,
					success:(res)=> {
						if(res.statusCode === 200){
							this.nameCheckTip = res.data.data.msg;
							if(res.data.data.status){
								this.nameVerify = true
							}
						}
					}
				});
			},
			pwdCheckEvent(event){
				console.log(event)
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
				  this.pwdCheckTip = "";
				  this.pwd = password;
				  this.pwdVerify = true;
			},
			pwdVerifyEvent(event){
				console.log(event)
				let affirmPwd = event.detail.value;
				if(affirmPwd !== this.pwd){
					this.pwdVerifyTip = "必须跟密码保持一致。";
					return
				}
				this.pwdAffirm = true;
			},
			emailCheckEvent(event){
				console.log(event)
				let email = event.detail.value;
				const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				let isOk =  regex.test(email);
				if(!isOk){
					this.emailCheckTip = "邮箱格式不正确";
					return
				}
				let checkUrl = this.$store.state.apiBaseUrl+"/api/Account/emailcheck?email="+encodeURI(email) ;
				uni.request({
					url:checkUrl,
					success:(res)=> {
						if(res.statusCode === 200){
							this.emailCheckTip = res.data.data.msg;
							if(res.data.data.status){
								this.emailVerify = true
							}
						}
					}
				});
			},
			phoneCheckEvent(event){
				console.log(event)
				let phone = event.detail.value;
				let checkUrl = this.$store.state.apiBaseUrl+"/api/Account/phonecheck?phoneNo="+encodeURI(phone);
				uni.request({
					url:checkUrl,
					success:(res)=> {
						this.phoneCheckTip = res.data.data.msg;
						if(res.data.data.status){
							this.phoneVerify = true;
						}
					}
				});
			},
			register(e){
				console.log(e)
				let registerView = {
					userName: e.detail.value.name,
					phoneNo: e.detail.value.phone,
					password: e.detail.value.affirm,
					email: e.detail.value.email
				}
				let url = this.$store.state.apiBaseUrl+"/api/Account/register";
				uni.request({
					url:url,
					method:"POST",
					data: registerView,
					success:(res)=> {
						if(res.statusCode === 200){
							uni.showModal({
								title: '',
								content: '注册成功',
								cancelText: '返回',
								confirmText: '去登录',
								success: function (res) {
									if (res.confirm) {
										uni.switchTab({
											url: "/pages/userCenter/userCenter"
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
							
						}else{
							this.logintips = res.data.message;
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url('./register.css');
</style>
