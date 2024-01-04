<template>
	<view>
		<view style="display: flex;flex-direction: column;">
			<!-- <view>
				<input placeholder="姓名" maxlength="20"/>
			</view> -->
			<view>
				<input class="rg-input" v-model="name" maxlength="15" placeholder="真实姓名：" />
			</view>

			<view>
				<input class="rg-input" v-model="cardNo" @blur="CardNoCheck" maxlength="18" placeholder="身份证号：" />
			</view>

		</view>
		<button class="button" style="width: 80px;" @click="check">下一步</button>
		<text style="margin-left: auto;margin-right: auto;font-size: small;margin-top: 2px;">信息仅用于身份验证，我们依照隐私政策保护您的个人信息</text>
	</view>
</template>

<script>
	import {
		StorageKeys
	} from '/common/storageKeys';
	export default {
		data() {
			return {
				pos: "", //正面照
				neg: "", //反面照
				posMd5: "",
				name: "",
				cardNo: "",
				cardNoChecked: false
			}
		},
		methods: {
			CardNoCheck(e){
				if(/[0-9X]{18}/.test(this.cardNo)){
					this.cardNoChecked = true;
					return
				}
				uni.showModal({
					showCancel:false,
					content:"身份证号格式不合法"
				})
			},
			check(e) {
				let qurl = this.$store.state.apiBaseUrl + "/api/IdentityInfo/check";
				if(!this.cardNoChecked){
					uni.showModal({
						showCancel:false,
						content:"身份证号格式不合法"
					})
					return;
				}
				uni.uploadFile({
					url: qurl,
					filePath: this.pos, // 随便填，不为空即可  
					name: 'posimg', // 随便填，不为空即可  
					//header: header, // 可以加access_token等  
					formData: {
						name: this.name,
						cardNo: this.cardNo
					}, // 接口参数，json格式，底层自动转为FormData的格式数据  
					success: (res) => {
						if (res.statusCode === 200) {
							uni.setStorage({
								key: StorageKeys.isActive,
								data: true
							});
							uni.navigateTo({
								url:"accountInfo/accountInfo?identity="+res.data
							})
						} else {
							uni.showModal({
								showCancel: true,
								content: res.data
							})
						}

					}
				})
			}
		}
	}
</script>

<style>
	.rg-input {
		margin-top: 100rpx;
		margin-left: 60rpx;
		width: 300px;
		height: 20rpx;
		border: 2px solid #6c4ad1;


		border-radius: 0px;
		/* 将输入框的圆角设置为50 */
		border: none;
		/* 移除默认边框 */
		border-bottom: 1px solid #6c4ad1;
		/* 添加底部边框，可以根据需要调整颜色和粗细 */
		outline: none;
		/* 移除默认的焦点边框 */
		background: transparent;
		/* 设置背景为透明，以便底部边框显示 */
		padding: 0;
		/* 移除默认内边距，可以根据需要设置 */

	}
	.button{
	  border: 0px solid  #6c4ad1;
	  font-size: 13px;
	  border-radius: 20px; /* 新增：设置按钮边框为圆角 */
	  width: 100px;
	  height: 35px;
	  margin-top: 0rpx;
	 display: flex;  /* 使用Flex布局 */ 
	   justify-content: center;  /* 水平居中 */
	   align-items: center; /* 垂直居中 */
	   margin-left: 280px;
	   color: #6c4ad1; /* 新增：设置注册按钮文字颜色为绿色 */
	   background-color: rgba(0, 0, 0, 0);
	   text-decoration: underline; 
	 
	   
	}
	
</style>