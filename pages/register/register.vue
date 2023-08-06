<template>
	<view>
		<form submit="register" style="display: flex;flex-direction: column;">
			<view style="display: flex;flex-direction: row;">
				<text>姓名：</text><input class="rg-input" @blur="nameCheckEvent"/>
				<view>{{nameCheck}}</view>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>密码：</text><input class="rg-input" type="safe-password" @blur="pwdCheckEvent"/>
				<view>{{pwdCheck}}</view>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>确认密码：</text><input class="rg-input" type="safe-password" @blur="pwdVerifyEvent"/>
				<view>{{pwdVerify}}</view>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>邮件：</text><input class="rg-input" @blur="emailCheckEvent"/>
				<view>{{emailCheck}}</view>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>电话：</text><input class="rg-input" @blur="phoneCheckEvent"/>
				<view>{{phoneCheck}}</view>
			</view>
			<button @click="register">注册</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nameCheck:"",
				pwdCheck:"",
				pwdVerify:"",
				emailCheck:"",
				phoneCheck:"",
			}
		},
		methods: {
			nameCheckEvent(event){
				console.log(event)
				if(event.detail.value.length<1){
					this.nameCheck = "姓名不能为空"
				}
			},
			pwdCheckEvent(event){
				console.log(event)
				const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
				let isOk = regex.test(event.detail.value);
				if(!isOk){
					this.pwdCheck = "密码不符合规范"
				}else{
					this.pwdCheck = ""
				}
			},
			pwdVerifyEvent(event){
				console.log(event)
			},
			emailCheckEvent(event){
				console.log(event)
			},
			phoneCheckEvent(event){
				console.log(event)
			},
			register(e){
				
			}
		}
	}
</script>

<style>
	@import url('./register.css');
</style>
