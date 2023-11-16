<template>

	<view class="userinfo">
		<!-- avatar -->
		<view class="user-avatar">
			<image :src="imgsrc" class="user-avatar-img"></image>
		</view>
		<view>{{ userName }}</view>
	</view>

	<!--分割线-->
	<view class="driver"
		style="position: relative; margin: 0 40rpx;height: 2rpx;width: 90%;background-color: #6c4ad1;margin-top: 10rpx;">
	</view>
	<!--分割线-->
	<view class="driver2"></view>

	<view class="text" :style="{textDecoration: curIndex===0?'underline':'',color:curIndex===0?'#4d1ae4':''}" @click="HisPublish">历史发布</view>

	<view class="text2" :style="{textDecoration: curIndex===1?'underline':'',color:curIndex===1?'#4d1ae4':''}" @click="HisAccipt">历史接受</view>
	<view v-if="curIndex==0">
		<view v-for="item in hispubs" :key="item.id" class="custom-margin">
			<!-- #ifdef H5 -->
			<cardinfo v-bind:task="item" v-bind:editable="false" :mode="mode(item)" @click.native="toDetails(item.id)"
				style="margin-top:5px;" />
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<cardinfo v-bind:task="item" v-bind:editable="false" :mode="mode(item)" @click.capture="toDetails(item.id)"
				style="margin-top:5px;" />
			<!-- #endif -->

		</view>
	</view>
	<view v-else>
		<view v-for="item in hisacpt" :key="item.id" class="custom-margin">
			<!-- #ifdef H5 -->
			<cardinfo v-bind:task="item" v-bind:editable="false" :mode="mode(item)" @click.native="toDetails(item.id)"
				style="margin-top:5px;" />
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<cardinfo v-bind:task="item" v-bind:editable="false" :mode="mode(item)" @click.capture="toDetails(item.id)"
				style="margin-top:5px;" />
			<!-- #endif -->
		
		</view>
	</view>

</template>

<script>
	import {
		TaskStatus
	} from '../../common/Task';
	export default {
		data() {
			return {
				user:{},
				$hispubs:[],
				$hisacpt:[],
				curIndex:0
			}
		},
		computed: {
			
			hispubs(){

				return this.$data.$hispubs
			},
			hisacpt(){

				return this.$data.$hisacpt
			},
			pubMaxid() {
				if (this.$data.$hispubs.length === 0) {
					return 0
				}
				return this.$data.$hispubs[this.$data.$hispubs.length - 1].id;
			},
			acptMaxid() {
				if (this.$data.$hisacpt.length === 0) {
					return 0
				}
				return this.$data.$hisacpt[this.$data.$hisacpt.length - 1].id;
			}
		},
		mounted() {
			if(this.$data.$hisacpt.length===0){
				uni.requestWithCookie({
					url:this.$store.state.apiBaseUrl+"/api/AssignmentUser/holds/"+this.id+"?count=10&offset="+this.pubMaxid,
					success: (res) => {//必须用箭头函数
						this.$data.$hisacpt = res.data;
					}
				})
			}
			
			if(this.$data.$hispubs.length===0){
				uni.requestWithCookie({
					url:this.$store.state.apiBaseUrl+"/api/Assignment/byuser?id="+this.id+"&count=10&offset="+this.pubMaxid,
					success: (res) => {//必须用箭头函数
						this.$data.$hispubs = res.data;
					}
				})
			}
		},
		methods: {
			mode(item) {
				if (item.status === TaskStatus.WaitForAccept) return 'waitfor'; //待接状态
				if (item.status === TaskStatus.Unfinished) return 'undone'; //待完成
				return 'done';
			},
			toDetails(e) {
				uni.navigateTo({
					url: "/pages/myTaskDetail/myTaskDetail?id=" + e
				})
			},
			removeById(id) {
				let index = this.publishs.findIndex(item => item.id == id);
				if (index != -1) {
					this.publishs.splice(index, 1);
				}
			},
			HisPublish(e){
				this.curIndex = 0;
			},
			HisAccipt(e){
				this.curIndex = 1;
			}

		},
		onLoad(op) {
			this.id = op.id;
			if(id){
				uni.requestWithCookie({
					url: this.$store.state.apiBaseUrl + "/api/AuthUser/" + id,
					success: (res) => {
						this.user = res.data
					}
				})
			}


		},
		onReachBottom() {

		}
	}
</script>

<style>
	.userinfo {
		z-index: 10;
		display: flex;
		flex-direction: row;
		height: 150rpx;
	}

	.user-avatar {
		z-index: 10;
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

	.user-avatar-img {
		z-index: 10;
		border-radius: 50%;
		border: none;
		display: block;
		object-fit: cover;
		image-rendering: -webkit-optimize-contrast;
		position: absolute;
		top: 1%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
	}


	.text {
		display: flex;
		flex-direction: row;
		margin-top: 0px;
		justify-content: center;
		align-items: center;
		color: #4d1ae4;
		font-size: 29rpx;
		letter-spacing: 6rpx;
		/* 设置文 字 间 隔 */
		transform: translate(-180rpx, -60rpx) scale(1);

		text-decoration: underline;
		/* 添加下划线 */
		text-decoration-thickness: 4rpx;
		/* 设 置下划线的粗细 */
	}


	.text2 {
		display: flex;
		flex-direction: row;
		margin-top: 0px;
		justify-content: center;
		align-items: center;
		color: #4d1ae4;
		font-size: 29rpx;
		letter-spacing: 7rpx;
		/* 设置文字间隔 */
		transform: translate(180rpx, -100rpx) scale(1);

		text-decoration: underline;
		/* 添加下划线 */
		text-decoration-thickness: 4rpx;
		/* 设置下划线的  粗细 */
	}


	.driver2 {
		z-index: -1;
		display: flex;
		/* 使用Flex布局 */
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */


		align-items: center;
		height: 80rpx;
		width: 1rpx;
		background-color: #6c4ad1;
		margin-top: 10rpx;
		margin-left: 400rpx;
	}




	.custom-margin {
		z-index: -1;
		display: flex;
		/* 使用Flex布局 */
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */

		transform: translate(-150rpx, 50rpx) scale(0.4);

		align-items: center;
		margin-top: -200rpx;
	}
</style>