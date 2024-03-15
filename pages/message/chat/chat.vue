<template>
	<view>
		<view style="width: 100%;height: 44px;"></view>
		<uni-nav-bar left-icon="left" @clickLeft="back" :title="userName"></uni-nav-bar>

		<!-- <view v-for="m in messages" :key="m.id">{{m.message}}</view> -->
		<view class="chat-container">

			<!-- <view style="height: 96%;"> -->
			<scroll-view :style="`height:${calcHeight}px`" class="chat-messages" scroll-y="true" :scroll-top="0"
				@scrolltoupper="receiveOld" @scrolltolower="scrollDown">

<!-- 				<yd-chatitem v-for="m in messages" :key="m.id" :message="m" :isLeft="m.isLeft" :bgColor="'#f7f7f7'"
					:userId="m.id"></yd-chatitem> -->

				<yd-chatitem v-for="m in messages" :key="m.id" :message="m" :isLeft="m.isLeft"
					:icon="m.isLeft?imgsrc:meAvatar" :bgColor="'#f7f7f7'" :userId="m.id"></yd-chatitem>

			</scroll-view>
			<!-- </view> -->

			<view class="chat-input-container">
				<input type="text" class="chat-input" v-model="text1" ref="input">
				<button v-show="canSend" @click="sendImg">+</button>
				<button v-show="!canSend" class="send-button" :disabled="canSend" @click="send">发送</button>
			</view>

			<!-- 			<view class="transmit">
					<input class="input" v-model="inputValue" type="text" @blur="change" ref="input"/>
					<button class="sendbutton" @click="send">发送</button>
			</view> -->
		</view>

	</view>
</template>

<script>
	import {
		ChatChannel
	} from "/common/customTypes.js";
	import { uploadFile } from '../../../common/ossutil.js';
	import { md5 } from 'js-md5';
import { v3 } from "uuid";
	export default {
		data() {
			return {
				text1: "", //输入框消息
				userName: "",
				userId: NaN, //发卡人id
				calcHeight: NaN, //计算后的scrollview高度
				img_src:"",
				//messages:[],

			}
		},
		computed: {
			messages() {
				return this.$store.getters.getMessages(this.userId)
			},
			canSend() {
				if (this.text1 !== null && this.text1 !== "" && this.text1 !== void 0) {
					return false;
				}
				return true;
			},
			imgsrc(){
				if(!this.img_src){
					uni.requestWithCookie({
						url:this.$store.state.apiBaseUrl +"/api/AuthUser/avatar?id="+this.userId,
						success: (res) => {
							if(res.statusCode===200){
								this.img_src=res.data
							}
						}
					})
				}
				return this.img_src;
			},
			meAvatar(){
				return this.$store.state.useravatar;
			}
		},
		methods: {
			async send(e) {
				//
				let cc = this.$store.getters["Msgs/getCcById"](this.userId)
				if (!cc) {
					let ncc = new ChatChannel(this.userId, 0, this.userName, new Date().toLocaleString(), "");
					await this.$store.dispatch("Msgs/addChatAsync", ncc);
				}

				this.$store.dispatch("sendMsg", {
					user: this.userId,
					message: this.text1,
					contentType: 'string',
					fileName:""
				});

				this.text1 = "";
			},
			sendImg(e) {
				// #ifdef MP-WEIXIN
				wx.chooseMessageFile({
					count:3,
					success:(res)=>{
						const tempFilePaths = res.tempFiles;
						for(const file of tempFilePaths){
							uploadFile(file,"files/",(resl)=>{
								if(resl.statusCode === 200){
									this.$store.dispatch("sendMsg", {
										user: this.userId,
										message: resl.data.url,
										contentType: file.type.split('/')[0]=="image"?"img":"file",
										fileName:file.name
									});
								}
								else{
										uni.showToast({
											title:file.name+" :上传失败！",
										})
									}
				
							})
						}
					}
				})
				// #endif
				
				// #ifdef H5
				uni.chooseFile({
					count:3,
					success:(res)=>{
						const tempFilePaths = res.tempFiles;
						for(const file of tempFilePaths){
							uploadFile(file,"files/",(resl)=>{
								if(resl.statusCode === 200){
									this.$store.dispatch("sendMsg", {
										user: this.userId,
										message: resl.data.url,
										contentType: file.type=="image"?"img":"file",
										fileName:file.name
									});
								}
								else{
										uni.showToast({
											title:file.name+" :上传失败！",
										})
									}
									
							})
						}
					}
				})
				// #endif

			},
			back(e) {
				uni.navigateBack()
			},
			receiveOld() {

				let lastid = this.messages[0].cid;
				let qurl = this.$store.state.apiBaseUrl + "/api/messages/each?receiverId=" + this.userId + "&lastid=" +
					lastid +
					"&count=10";
				uni.requestWithCookie({
					url: qurl,
					success: (res) => {
						if (res.statusCode === 200) {
							for (let m of res.data) {
								this.$store.dispatch("eachMsg", {
									userid: m.from,
									message: m
								})
							}
						}
						if (res.statusCode >= 400) {
							uni.showToast({
								title: "网络异常，请稍后再试!"
							})
						}
					}
				});
			},
			scrollDown() {

			}
		},
		onLoad(op) {
			this.userName = op.userName;
			this.userId = parseInt(op.userId);

			let info = uni.getWindowInfo();
			this.calcHeight = info.windowHeight * 96 / 100 - 66 - 74;

			let hasLoad = this.$store.getters["Msgs/getHasFirstLoad"](this.userId)
			if (!hasLoad) {
				//let [lastid] = this.messages.slice(-1);
				let qurl = this.$store.state.apiBaseUrl + "/api/messages/each?receiverId=" + this.userId +
					"&count=10";
				uni.requestWithCookie({
					url: qurl,
					success: (res) => {
						if (res.statusCode === 200) {
							for (let m of res.data) {
								this.$store.dispatch("eachMsg", {
									message: m
								})
							}
						}
						if (res.statusCode >= 400) {
							uni.showToast({
								title: "网络异常，请稍后再试!"
							})
						}
					}
				});

				this.$store.dispatch("Msgs/updateHasFirstLoad", this.userId);
			}
		},
		onUnload() {

			this.$store.commit("Msgs/clearUnread", this.userId);


		},
	}
</script>

<style>
	@import url('./chat.css');
</style>