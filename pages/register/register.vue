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

<!-- 			<text style="margin-top:60rpx;margin-left: 60rpx;">请上传身份证信息:</text>
			<view>
				<image :draggable="false" style="width: 350px;height: 200px;margin-left: 15px;" :src="pos"></image>
				<button style="width: 180px;" @click="uploadPos">上传正面照</button>
			</view> -->

		</view>
		<view>
			<checkbox :checked="isChecked" name="aggrement" @click="agreementCheckEvent"
				style="transform:scale(0.7); margin-top: 5%;" />
			<label for="checkbox" style="font-size: smaller;">我已阅读并同意<label @click="toAbout"
					style="color: #6c4ad1;">《流沙任务系统用户服务协议》</label></label>
			<view class="tips">{{aggrementCheckTip}}</view>
		</view>
		<button style="width: 80px;" @click="check">人脸验证</button>
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
				cardNoChecked: false,
				aggrementCheckTip: "",
				isChecked: false
			}
		},
		methods: {
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
			// uploadPos(e) {
			// 	this.$store.dispatch("upload", "pupload")
			// 		.then((res) => {
			// 			this.pos = res.filePath;
			// 			if(res.statusCode===200){
			// 				let o = JSON.parse(res.data)
			// 				this.posMd5 = o[0].md5;
			// 			}

			// 		})
			// 		.catch((err) => {
			// 			uni.showToast({
			// 				title: err.message.errors
			// 			})
			// 		})
			// },
			// uploadNeg(e) {
			// 	this.$store.dispatch("upload")
			// 		.then((res) => {
			// 			let o = JSON.parse(res.data)
			// 			this.neg = res.filePath;
			// 			this.$store.state.apiBaseUrl + o[0].url;
			// 		})
			// 		.catch((err) => {
			// 			uni.showToast({
			// 				title: err.message
			// 			})
			// 		})
			// 	uni.requireNativePlugin
			// },
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
				
				let qurl = this.$store.state.apiBaseUrl + "/api/Account/register/v2";
				if(!this.cardNoChecked){
					uni.showModal({
						showCancel:false,
						content:"身份证号格式不合法"
					})
					return;
				}
				if (this.isChecked == true) {
					uni.uploadFile({
						url: qurl,
						filePath: '123',//this.pos, // 随便填，不为空即可  
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
									url:"livedetect/livedetect?identity="+res.data
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
</style>