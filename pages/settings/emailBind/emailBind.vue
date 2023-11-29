<template>
	<view>
		<input class="rg-input" type="digit" maxlength="15" placeholder="请输入邮箱"/>
		<button>下一步</button>
		
		<view v-if="state">
			<view>请输入验证码</view>
			<view>请输入{{email}}收到的验证码</view>
			<input >
			<button>重新发送验证码</button>
		</view>
		
		<view v-if="!email">
			<button>更改邮箱</button>>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:"",
				state:""
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.rg-input {
  margin-top:100rpx;
  width: 300px;
    height:20rpx;
    border: 2px solid #6c4ad1;

   
    border-radius: 0px; /* 将输入框的圆角设置为50 */
    border: none; /* 移除默认边框 */
    border-bottom: 1px solid #6c4ad1; /* 添加底部边框，可以根据需要调整颜色和粗细 */
    outline: none; /* 移除默认的焦点边框 */
    background: transparent; /* 设置背景为透明，以便底部边框显示 */
    padding: 0; /* 移除默认内边距，可以根据需要设置 */

}
</style>
