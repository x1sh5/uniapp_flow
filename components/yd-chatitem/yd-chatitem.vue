<template>
	<view class="chatitem">
		<view v-if="isLeft" class="leftitem" :style="{backgroundColor: bgColor}">
			<image class="icon" :src="icon" :style="{height: iconSize, width: iconSize}" alt="Local Image"></image>
			<view class="info">
				<text class="nickname" :style="{fontSize: nameSize, color: nameColor}">{{ nickname }}</text>
				<text class="message" :style="{backgroundColor: bubbleColor, fontSize: messageSize, color: messageColor}">
					<view class="angle" :style="{borderRightColor: bubbleColor}"></view>
					{{ message }}
				</text>
			</view>
		</view>
		<view v-else class="rightitem">
			<view class="info">
				<text class="nickname" :style="{fontSize: nameSize, color: nameColor}">{{ nickname }}</text>
				<text class="message" :style="{backgroundColor: bubbleColor, fontSize: messageSize, color: messageColor}">
					<view class="angle" :style="{borderLeftColor: bubbleColor}"></view>
					{{ message }}
				</text>
			</view>
			<image class="icon" :src="icon" :style="{height: iconSize, width: iconSize}" alt="Local Image"></image>
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
				default: "默认"
			},
			message: {
				type: String,
				default: "你好呀"
			},
			icon: {
				type: String,
				default: "../../static/logo.png"
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
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>

	.iconStyle() {
		display: inline-block;
		width: 90rpx;
		height: 90rpx;
		border-radius: 12rpx;
	}
	.chatitem {
		background-color: #ededed;
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
