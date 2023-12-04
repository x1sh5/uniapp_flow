<template>
	<view>
		<view v-if="mode=='show'">
			<input class="rg-input" :disabled="true" v-model="phone" type="text" maxlength="256" placeholder="请输入手机号码" />
			<button @click="bindChange">更改号码</button>
		</view>
		
		<view v-if="mode=='bindnew'">
			<input class="rg-input" v-model="newphone" type="text" maxlength="256" placeholder="请输入手机号码" />
			<button @click="sendCode">发送验证码</button>
			<view v-show="showCode">
				<view>请输入{{email}}收到的验证码</view>
				<xt-verify-code inputType="text" type="bottom" v-model="code"></xt-verify-code>
				<button @click="bindPhone">绑定</button>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				showCode: false,
				code: "",
				newphone:"",
				mode:"bindnew"//bindnew, show
			}
		},
		methods: {
			bindPhone(e){
				
			},
			sendCode(e){
				
			},
			bindChange(e){
				
			}
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
