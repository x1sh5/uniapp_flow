<template>
	<view class="pay-result">
		<view class="pay-status">
			<t-icon name="check-circle-filled" size="60rpx" color="#47D368" />
			<text>任务完成</text><!---->
		</view>
		<view class="pay-money">
			已归档
			<price wx:if="{{totalPaid}}" price="{{totalPaid}}" wr-class="pay-money__price" decimalSmaller fill />
		</view>
		<button class="share" @click="share">分享</button>
		<view class="btn-wrapper">
			<view class="status-btn" data-type="orderList" bindtap="onTapReturn" @click="show">查看任务</view>
			<view class="status-btn" data-type="home" bindtap="onTapReturn" @click="back">返回首页</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: this.id,
		};
	},
	onLoad() {
		let qurl = this.$store.state.apiBaseUrl + "/api/TaskRequest/applytome"
		uni.requestWithCookie({
			url: qurl,
			success: (res) => {
				if (res.statusCode == 200) {
					this.id = res.data[0].id
				}
			}
		})
	},
	methods: {
		show() {
			uni.navigateTo({
				url: "/pages/myTaskDetail/myTaskDetail?id=" + this.id
			});
		},
		back() {
			uni.switchTab({ url: '/pages/index/index' })
		},
		share() {
			uni.share({
				provider: 'weixin',
				scene: "WXSceneSession",
				type: 5,
				imageUrl: '',
				title: '快和我一起劳动吧！',
				miniProgram: {
					id: '',
					path: 'pages/index/index',
					type: 0,
				},
				success: ret => {
					console.log(JSON.stringify(ret));
				}
			});

		}
	}
}
</script>


<style>
.pay-result {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.pay-result .pay-status {
	margin-top: 100rpx;
	font-size: 48rpx;
	line-height: 72rpx;
	font-weight: bold;
	color: #6536f1;
	display: flex;
	align-items: center;
}

.pay-result .pay-status text {
	padding-left: 12rpx;
}

.pay-result .pay-money {
	color: #6c4ad1;
	font-size: 28rpx;
	line-height: 48rpx;
	margin-top: 28rpx;
	display: flex;
	align-items: baseline;
	text-decoration: underline;
}

.pay-result .pay-money .pay-money__price {
	font-size: 36rpx;
	line-height: 48rpx;
	color: #fa4126;
}
.share{
	color: #6c4ad1;
	font-size: 28rpx;
	line-height: 48rpx;
	margin-top: 28rpx;
	display: flex;
	align-items: baseline;
	text-decoration: underline;
}

.pay-result .btn-wrapper {
	margin-top: 48rpx;
	padding: 12rpx 32rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
}

.pay-result .btn-wrapper .status-btn {
	height: 88rpx;
	width: 334rpx;
	border-radius: 44rpx;
	border: 2rpx solid #6c4ad1;
	color: #6c4ad1;
	font-size: 28rpx;
	font-weight: bold;
	line-height: 88rpx;
	text-align: center;
	/* 水  平居中 */
}
</style>