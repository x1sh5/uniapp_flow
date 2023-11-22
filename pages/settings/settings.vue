<template>
	<view style="width: 90%;">
		<view class="setting-view">
			头像设置
			<view class="user-avatar" @click="avataSet">
				<image :src="imgsrc" class="user-avatar-img"></image>
			</view>
		</view>
		<view class="driver"></view>
		<view @click="identityCheck" class="setting-view" style="display: flex;flex-direction: row; position: relative">
			<view  >身份验证</view>
			<view style="position: absolute;right: 0;">></view>
		</view>
		
<!-- 		<view class="driver"></view>
		<view @click="unregister" class="setting-view" style="display: flex;flex-direction: row; position: relative">
			<view  >账号注销</view>
			<view style="position: absolute;right: 0;">></view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed:{
			imgsrc(){
				return this.$store.state.useravatar
			}
		},
		methods: {
			identityCheck(e){
				if(!this.$store.getters.IsActive){
					uni.navigateTo({
						url: "identityCheck/identityCheck"
					});
				}else{
					uni.showModal({
						showCancel:true,
						content:"已通过验证！"
					})
				}

			},
			unregister(e){
				uni.navigateTo({
					url: "unregister/unregister"
				});
			},
			avataSet(e){
				uni.showActionSheet({
					itemList: ["选择文件"],
					success: (e) => {

						if(e.tapIndex===0){
							uni.chooseImage({
								count:1,
								crop: {
									with:800,
									height: 800
								},
								success: (e) => {

									if(e.tempFiles[0].size>5*1024*1024){
										uni.showToast({
											title: "图片大小超过5M,请重新选择。"
										})
										return
									}
									uni.uploadFile({
										name: "user-avatar",
										filePath: e.tempFilePaths[0],
										url: this.$store.state.apiBaseUrl+"/api/Image/upload",
										success:(res)=>{

											if(res.statusCode===201){
												let data = JSON.parse(res.data);
												let imgurl = this.$store.state.apiBaseUrl+data[0].url;
												this.$store.commit("setUserAvatar",imgurl);
												uni.requestWithCookie({
													url:this.$store.state.apiBaseUrl+"/api/AuthUser/setavatar?avatar="+encodeURIComponent(imgurl),
													method:"POST",
													success: () => {
														
													}
												})
												
											}
										}
									})
								}
							})
						}

					}
				})
			}
		}
	}
</script>

<style>
	.driver{
		display: block;
		height: 1rpx;
		background-color: #a8a8a8;
		margin: 10rpx 0;
	}
	
	.setting-view{
		margin-left: 10px;
		margin-top: 2px;
		margin-bottom: 2px;
		border-radius: 5px;
		box-sizing: content-box;
		border: 1px solid darkgrey;
		background-color: white;
	}
	.user-avatar{
		width: 48px;
		height: 48px;
	    display: block;
	    position: relative;
	    background-image: url('/static/meactive.png');
	    background-size: cover;
	    border-radius: 100%;
	    margin: 0;
	    padding: 0;
	}
	.user-avatar-img{
		border-radius: 50%;
		border: none;
		display: block;
		object-fit: cover;
		image-rendering: -webkit-optimize-contrast;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    width: 100%;
	    height: 100%;
	}
</style>
