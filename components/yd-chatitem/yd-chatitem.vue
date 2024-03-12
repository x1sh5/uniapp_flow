<template>
	<view class="chatitem">
		<view v-if="isLeft" class="leftitem" :style="{backgroundColor: bgColor}">
			<image @click="toUserHome" class="icon" :src="icon" alt="Local Image"></image>
			<view class="info">
				<view class="nickname" :style="{fontSize: nameSize, color: nameColor}">{{ nickname }}</view>
				<view v-if="message.contentType=='string'" class="message"
					:style="{backgroundColor: bubbleColor, fontSize: messageSize, color: messageColor}">
					<view class="angle" :style="{borderRightColor: bubbleColor}"></view>
					{{ message.content }}
				</view>
				<view v-if="message.contentType=='img'">
					<image @click="preview" :style="{width:imgWidth,height:imgHeight}" :src="imgsrc"></image>
				</view>
				<view v-if="message.contentType=='file'">
					<view style="display: flex;" @click="fileview" class="message" 
					:style="{backgroundColor: bubbleColor, fontSize: messageSize, color: messageColor}">
						<view class="angle" :style="{borderRightColor: bubbleColor}"></view>
						{{ message.fileName }}
						<view style="width:50px;height: 50px;hebackground-image:url('../../static/icons/icons8-file-50.png');"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="rightitem">
			<view class="info">
				<view class="nickname" :style="{fontSize: nameSize, color: nameColor}">{{ nickname }}</view>
				<view v-if="message.contentType=='string'" class="message"
					:style="{backgroundColor: bubbleColor, fontSize: messageSize, color: messageColor}">
					<view class="angle" :style="{borderLeftColor: bubbleColor}"></view>
					{{ message.content }}
				</view>
				<view v-if="message.contentType=='img'">
					<image @click="preview" :style="{width:imgWidth,height:imgHeight}" :src="imgsrc"></image>
				</view>
				<view v-if="message.contentType=='file'">
					<view style="display: flex;" @click="fileview" class="message"
					:style="{backgroundColor: bubbleColor, fontSize: messageSize, color: messageColor}">
						<view class="angle" :style="{borderRightColor: bubbleColor}"></view>
						{{ message.fileName }}
						<view style="width:50px;height: 50px;background-image:url('../../static/icons/icons8-file-50.png');"></view>
					</view>
				</view>
			</view>
			<image class="icon" :src="icon" alt="Local Image"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isLeft: {
				type: Boolean,
				default: true
			},
			nickname: {
				type: String,
				default: ""
			},
			message: Object,
			icon: {
				type: String,
				default: "/static/logo.png"
			},
			bubbleColor: {
				type: String,
				default: "#fff"
			},
			bgColor: {
				type: String,
				default: "#ededed"
			},
			nameSize: {
				type: String,
				default: "9px"
			},
			messageSize: {
				type: String,
				default: "16px"
			},
			nameColor: {
				type: String,
				default: "#9b9b9b"
			},
			messageColor: {
				type: String,
				default: "#000"
			},
			iconSize: {
				type: String,
				default: "90rpx"
			},
			userId:{
				type:Number,
				default:-1
			}
		},
		data() {
			return {
				$imgWidth: 0,
				$imgHeight: 0
			};
		},
		computed: {
			imgsrc() {
				return this.$store.state.apiBaseUrl + this.message.content
			},
			//图像动态高度
			imgHeight() {
				if (this.$data.$imgWidth > 200) return '200px';
				return this.$data.$imgWidth+'px';
				
			},
			//图像动态长度
			imgWidth() {
				if (this.$data.$imgWidth > 200) return '200px';
				return this.$data.$imgWidth+'px';
				
			},

		},
		methods: {
			preview(e) {
				uni.previewImage({
					urls: [this.imgsrc],
				});
			},
			toUserHome(e){
				uni.navigateTo({
					url:"/pages/userhomepage/userhomepage?id="
				})
			},
			fileview(e){
				let fpath = this.$store.getters["FileCache/getFile"](this.message.content);
				if(fpath){
					// #ifdef MP-WEIXIN
					uni.getFileSystemManager().getFileInfo({
						filePath:res.tempFilePath
					})
					// #endif
					
					// #ifdef H5
					uni.getFileInfo({
						filePath:res.tempFilePath
					})
					// #endif
				}else{
					uni.downloadFile({
						url:this.message.content,
						success: (res) => {
							this.$store.commit("FileCache/add",this.message.content,res.tempFilePath);
							// #ifdef MP-WEIXIN
							uni.getFileSystemManager().getFileInfo({
								filePath:res.tempFilePath
							})
							// #endif
							
							// #ifdef H5
							uni.getFileInfo({
								filePath:res.tempFilePath
							})
							// #endif
						}
					})
				}

			}
		},
		
		beforeMount() {
			if (this.message.contentType == 'img') {
				uni.getImageInfo({
					src: this.imgsrc,
					success: (img) => {
						this.$data.$imgWidth = img.width;
						this.$data.$imgHeight = img.height
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.iconStyle() {
		display: inline-block;
		width: 60rpx;
		height: 60rpx;
		border-radius: 12rpx;
	}

	.chatitem {
		background-color: #f7f7f7;

		.leftitem {
			display: flex;

			.icon {
				.iconStyle;
			}

			.info {
				margin: 6rpx 20rpx;

				.nickname {
					font-size: 9px;
					color: #9b9b9b;
					display: block;
				}

				.message {
					display: block;
					position: relative;
					top: 0;
					left: 0;
					font-size: 16px;
					margin-top: 6rpx;
					padding: 20rpx 20rpx;
					background-color: #fff;
					border-radius: 10rpx;
					white-space: pre-wrap;
					word-break: break-all;

					.angle {
						position: absolute;
						left: -23rpx;
						top: 28rpx;
						width: 0;
						height: 0;
						border: 10rpx solid transparent;
						border-right: 15rpx solid #fff;
					}
				}
			}
		}

		.rightitem {
			display: flex;
			justify-content: flex-end;

			.icon {
				.iconStyle;
			}

			.info {
				margin: 6rpx 20rpx;
				text-align: right;

				.nickname {
					font-size: 9px;
					color: #9b9b9b;
					display: block;
				}

				.message {
					display: block;
					position: relative;
					top: 0;
					right: 0;
					font-size: 16px;
					margin-top: 6rpx;
					padding: 20rpx 20rpx;
					background-color: #fff;
					border-radius: 10rpx;

					.angle {
						position: absolute;
						right: -23rpx;
						top: 28rpx;
						width: 0;
						height: 0;
						border: 10rpx solid transparent;
						border-left: 15rpx solid #fff;
					}
				}
			}
		}
	}
</style>