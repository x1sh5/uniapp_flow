<template>
	<view>
		<form submit="register" style="display: flex;flex-direction: column;">
			<view style="display: flex;flex-direction: row;">
				<text>姓名：</text><input class="rg-input"/>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>密码：</text><input class="rg-input" type="safe-password"/>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>确认密码：</text><input class="rg-input" type="safe-password"/>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>邮件：</text><input class="rg-input"/>
			</view>
			<view style="display: flex;flex-direction: row;">
				<text>电话：</text><input class="rg-input"/>
			</view>
			
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.rg-input{
		border: 1px solid #aaff7f;
		width: 70%;
		height: 32px;
	}
</style>
