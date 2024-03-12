<template>
	<view class="user-view" style="display: flex;flex-direction: row; position: relative">
		<view class="user-view2">
			头像设置
			<view class="user-avatar" @click="avataSet">
				<image :src="imgsrc" class="user-avatar-img"></image>
			</view>
		</view>

		<view @click="nicknameSetting" class="user-view2" style="display: flex;flex-direction: row; position: relative">
			<view>昵称</view>
			<view style="position: absolute;right: 0;">{{ Nickname }}></view>
		</view>

		<view @click="signatureSetting" class="user-view2" style="display: flex;flex-direction: row; position: relative">
			<view>个性签名</view>
			<!-- <view style="position: absolute;right: 0;">{{ signature }}></view> -->
		</view>

		
<!-- 		<view @click="phoneBind" class="setting-view" style="display: flex;flex-direction: row; position: relative">
			<view>绑定手机号</view>
			<view style="position: absolute;right: 0;">></view>
		</view> -->
		
		
		
<!-- 		<view class="driver"></view>
		<view @click="unregister" class="setting-view" style="display: flex;flex-direction: row; position: relative">
			<view>账号注销</view>
			<view style="position: absolute;right: 0;">></view>
		</view> -->
		
	</view>
	<view class="user-view"  >身份验证</view>
	<view @click="toinstructions" class="user-view2" style="display: flex;flex-direction: row; position: relative">
		<view>绑定手机号</view>
		<view style="position: absolute;right: 710rpx;">></view>
	</view>
	<view @click="toinstructions" class="user-view2" style="display: flex;flex-direction: row; position: relative">
		<view>绑定银行卡</view>
		<view style="position: absolute;right: 710rpx;">></view>
	</view>
	<view @click="emailBind" class="user-view2" style="display: flex;flex-direction: row; position: relative">
		<view>绑定邮箱</view>
		<view style="position: absolute;right: 710rpx;">></view>
	</view>
	<view @click="unregister" class="user-view2" style="display: flex;flex-direction: row; position: relative">
		<view>账号注销</view>
		<view style="position: absolute;right:710rpx;">></view>
	</view> 
</template>

<script>
import { StorageKeys } from '../../common/storageKeys';
import { uploadFile } from '../../common/ossutil.js';

	export default {
		data() {
			return {
				nickname:""
			}
		},
		onLoad(){
			this.nickname = this.$store.state.$userName;
		},
		computed:{
			imgsrc(){
				return this.$store.state.useravatar
			},
			NickName(){
				return this.$store.state.$userName
			}
		},
		methods: {
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

									if(e.tempFiles[0].size>2*1024*1024){
										uni.showToast({
											title: "图片大小超过2M,请重新选择。"
										})
										return
									}
									uploadFile(e.tempFilePaths[0],"images/",(resl)=>{
										if(res.statusCode===201){
											let data = JSON.parse(res.data);
											let imgurl = this.$store.state.apiBaseUrl+data.url;
											this.$store.commit("setUserAvatar",imgurl);
											uni.requestWithCookie({
												url:this.$store.state.apiBaseUrl+"/api/AuthUser/setavatar?avatar="+encodeURIComponent(imgurl),
												method:"POST",
												success: () => {
													
												}
											})
											
										}
									})

								}
							})
						}

					}
				})
			},
			nicknameSetting(e){
				uni.navigateTo({
					url: "nickname/nickname"
				})
			},
			signatureSetting(e){
				uni.navigateTo({
					url: "signature/signature"
				})
			},
			phoneBind(e){
				uni.navigateTo({
					url:"phoneBind/phoneBind"
				})
			},
			emailBind(e){
				uni.navigateTo({
					url:"emailBind/emailBind"
				})
			},
			unregister(e){
				uni.navigateTo({
					url: "unregister/unregister"
				});
			},
		}
	}
</script>

<style>
	.user-view {
	  width: auto; /* 自适应内容宽度 */
	  margin-left: 6rpx;
	  margin-top: 2px;
	  margin-bottom: 2px;
	  border-radius: 5px;
	  box-sizing: content-box;
	  padding-left: 15px;/* 右缩进 */
	  border: 1px solid #6c4ad1;
	  background-color: rgb(255, 255, 255);
	  color: #4723b3;
	  font-size: 20px;
	  margin-bottom: 10px;
	  padding-top: 10px; /* 上内边距设置为 10px */
	  padding-bottom: 10px; /* 下内边距设置为 10px */
	  /* background-image: -webkit-linear-gradient(0deg, #9781da 0%, #999fd8 100%);*/
	}
	.user-view2 {
	  
	  margin-left: 5px;
	  margin-top: 0px;
	  margin-bottom: 2px;
	  border-radius: 5px;
	  padding-left: 15px;/* 右缩进 */
	  box-sizing: content-box;
	  border: 0px solid rgb(245, 245, 245);
	  background-color: rgb(255, 255, 255);
	  color: #6c4ad1;
	  font-size: 15px;
	  
	  padding-top: 0px; /* 上内边距设置为 10px */
	  padding-bottom: 10px; /* 下内边距设置为 10px */
	  /* background-image: -webkit-linear-gradient(0deg, #9781da 0%, #999fd8 100%);*/
	}
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
