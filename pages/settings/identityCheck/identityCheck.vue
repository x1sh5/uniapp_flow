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
				<input class="rg-input" v-model="cardNo" maxlength="18" placeholder="身份证号码：" />
			</view>

			<text style="margin-top:60rpx;margin-left: 60rpx;">上传身份证信息:</text>
			<view>
				<image :draggable="false" style="width: 350px;height: 200px;margin-left: 15px;" :src="pos"></image>
				<button style="width: 180px;" @click="uploadPos">上传正面照</button>
			</view>
			<!-- <view>
				<image :draggable="false" style="width: 350px;height: 200px;margin-left: 15px;" :src="neg"></image>
				<button style="width: 180px;" @click="uploadNeg">上传反面照</button>
			</view> -->
		</view>
		<button style="width: 80px;" @click="check">认证</button>
	</view>
</template>

<script>
	import {
		StorageKeys
	} from '../../../common/storageKeys';
	export default {
		data() {
			return {
				pos: "", //正面照
				neg: "", //反面照
				posMd5: "",
				name: "",
				cardNo: ""
			}
		},
		methods: {
			uploadPos(e) {
				this.$store.dispatch("upload", "pupload")
					.then((res) => {
						this.pos = res.filePath;
						if(res.statusCode===200){
							let o = JSON.parse(res.data)
							this.posMd5 = this.$store.state.apiBaseUrl + o[0].md5;
						}

					})
					.catch((err) => {
						uni.showToast({
							title: err.message
						})
					})
			},
			uploadNeg(e) {
				this.$store.dispatch("upload")
					.then((res) => {
						let o = JSON.parse(res.data)
						this.neg = res.filePath;
						this.$store.state.apiBaseUrl + o[0].url;
					})
					.catch((err) => {
						uni.showToast({
							title: err.message
						})
					})
				uni.requireNativePlugin
			},
			check(e) {
				let qurl = this.$store.state.apiBaseUrl + "/api/IdentityInfo/check";
				uni.uploadFile({
					url: qurl,
					filePath: '123', // 随便填，不为空即可  
					name: '123', // 随便填，不为空即可  
					//header: header, // 可以加access_token等  
					formData: {
						posimg: this.pos,
						name: this.name,
						cardNo: this.cardNo
					}, // 接口参数，json格式，底层自动转为FormData的格式数据  
					success: (res) => {
						if (res.statusCode === 200) {
							uni.setStorage({
								key: StorageKeys.isActive,
								data: true
							});
							uni.showModal({
								showCancel: true,
								content: res.data,
								success() {
									uni.navigateBack();
								}
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
</style>