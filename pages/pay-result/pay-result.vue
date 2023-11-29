<template>
	<!-- <t-navbar background="#ffffff" left-icon="slot"  /> -->
	<view class="pay-result">
		<view class="pay-status">
			<!-- <t-icon name="check-circle-filled" size="60rpx" color="#47D368" /> -->
			<text>支付成功√</text>
		</view>
		<view class="pay-money">
		已提交审核
<!-- 			<price
			 wx:if="{{totalPaid}}"
			 price="{{totalPaid}}"
			 wr-class="pay-money__price"
			 decimalSmaller
			 fill
			/> -->
		</view>
		<view class="btn-wrapper">
			<view class="status-btn" data-type="orderList" @click="viewTask">查看任务</view>
			<view class="status-btn" data-type="home" @click="goHome">返回首页</view>
		</view>
	</view>
	

</template>

<script>
	export default{
		props:{
			taskid:Number
		},
		methods:{
			viewTask(e){
				if(this.taskid){
					uni.navigateTo({
						url:"/pages/taskDetail/taskDetail?id="+this.taskid
					})
				}

			},
			goHome(e){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style>
	.pay-result {
	  display: flex;
	  flex-direction:column;
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
	  color: #6c4ad1 ;
	  font-size: 28rpx;
	  line-height: 48rpx;
	  margin-top: 28rpx;
	  display: flex;
	  align-items: baseline;
	  text-decoration: underline;
	}
	
	.pay-result .pay-money .pay-money__price {
	  font-size: 36rpx;
	  line-height: 48rpx ;
	  color: #fa4126;
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
	  border:  2rpx solid #6c4ad1;
	  color: #6c4ad1;
	  font-size: 28rpx;
	  font-weight: bold;
	  line-height: 88rpx;
	  text-align: center;/* 水平居 中 */
	}

</style>