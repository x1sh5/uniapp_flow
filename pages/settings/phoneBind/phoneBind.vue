<template>
	<view>
		<input class="rg-input" type="digit" maxlength="15" placeholder="请输入手机号码"/>
		<view v-if="!phone">
			<button>切换手机号</button>>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:""
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
