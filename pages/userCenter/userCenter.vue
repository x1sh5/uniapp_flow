<template>
	<view class="wrapper">

		<view class="userinfo">
			<!-- avatar -->
			<view class="user-avatar">
				<image :src="imgsrc" class="user-avatar-img"></image>
			</view>
			<view>{{ userName }}</view>
		</view>



		<view class="taskinfobox">
			<view class="t" style="position: relative;margin-left: 10rpx;">我发布的</view>
			<view class="taskinfo">
				<view class="my-icons icon-huangguan" @click="myPublishs">
					<view class="item_title">历史发布</view>
				</view>
				<view class="my-icons icon-liebiaomoshi" @click="history">
					<view class="item_title">浏览记录</view>
				</view>
				<view class="my-icons icon-goucha" @click="taskReq">
					<view class="item_title">任务请求</view>
				</view>
			</view>
		</view>


		<view class="taskinfobox">
			<view class="t" style="position: relative;margin-left: 10rpx;">我接受的</view>
			<view class="taskinfo">
				<view class="my-icons icon-tianxie" @click="holds(0)">
					<view class="item_title">待完成</view>
				</view>
				<view class="my-icons icon-duigou" @click="holds(1)">
					<view class="item_title">完成项目</view>
				</view>
				<view class="my-icons icon-fuwuqingqiu" @click="myApply">
					<view class="item_title">任务申请</view>
				</view>
			</view>
		</view>



		<view class="misc">
			<view @click="toReference" class="user-view" style="display: flex;flex-direction: row; position: relative">
				<view>审核区间</view>
				<view style="position: absolute;right: 0;">></view>
			</view>


			<view class="user-view">帮助中心</view>
			<view style="position: absolute;right: 20rpx;margin-top: -90rpx;">v</view>


			<view @click="toOrder" class="user-view2" style="display: flex; flex-direction: row;">
				<view>我的支付</view>
				<view style="position: absolute;right: 710rpx;">></view>
			</view>

			<view class="user-view2" @click="showDevelopmentTip">技能互助文档</view>

			<view class="user-view2">收益来源</view>


			<!-- -->

			<view @click="toinstructions" class="user-view2"
				style="display: flex;flex-direction: row; position: relative">
				<view>使用说明</view>
				<view style="position: absolute;right: 710rpx;">></view>
			</view>


			<view @click="toSetting" class="user-view2" style="display: flex;flex-direction: row; position: relative">
				<view>用户设置</view>
				<view style="position: absolute;right:  710rpx;">></view>
			</view>
			<view class="driver"></view>
		</view>


		<view v-show="hasLogin">
			<button @click="signout">退出</button>
		</view>

		<view v-show="!hasLogin">
			<button @click="signin">登录</button>
			<button @click="signup">注册</button>
		</view>


	</view>
</template>

<script>
	import {
		StorageKeys
	} from "../../common/storageKeys.js";

	export default {
		data() {
			return {
				login: false,
				isPanelCollapsed: true, // 默认折叠
			};
		},
		computed: {
			hasLogin: {
				get() {
					return this.$store.state.$hasLogin;
				},
				set(value) {
					this.login = value;
					this.$store.state.$hasLogin = value;
				}
			},
			userName() {
				return this.$store.state.$userName;
			},
			imgsrc() {
				return this.$store.state.useravatar
			}
		},
		methods: {

			showDevelopmentTip() {
				uni.showToast({
					title: '正在开发中',
					icon: 'none', // 不显示图标
					duration: 4000, // 提示持续时间，单位为毫秒

				});
			},
			toReference(e) {
				uni.navigateTo({
					url: "/pages/reference/reference"
				})
			},
			myPublishs(e) {
				uni.navigateTo({
					url: "/pages/myPublishs/myPublishs"
				})
			},
			history(e) {
				console.log(e)
				uni.navigateTo({
					url: "/pages/history/history"
				})
			},
			holds(t) {
				//任务接取情况
				let turl = "/pages/holdTask/holdTask?current=" + t;
				uni.navigateTo({
					url: turl
				})
			},
			taskReq(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/taskReq/taskReq"
				});
			},
			myApply(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/myApply/myApply"
				});
			},
			toOrder(e) {
				uni.navigateTo({
					url: "/pages/order/order"
				});
			},
			toinstructions(e) {
				uni.navigateTo({
					url: "/pages/userCenter/instructions/instructions"
				});
			},
			signin(e) {
				uni.navigateTo({
					url: "/pages/login/login?refer=usercenter"
				});
			},
			signup(e) {
				uni.navigateTo({
					url: "/pages/register/register"
				});
			},
			signout(e) {
				console.log("signout")
				const lurl = this.$store.state.apiBaseUrl + "/api/Account/logout"
				uni.requestWithCookie({
					url: lurl,
					method: "POST",
					success: () => {
						this.$store.commit("loginOut");
						this.hasLogin = this.$store.getters.hasLogin();
						this.$nextTick();
					}
				});
				uni.removeStorage({
					key: StorageKeys.cookies
				});
				uni.removeStorage({
					key: StorageKeys.taskContent
				});
				uni.removeStorage({
					key: StorageKeys.userName
				});

			},
			toSetting(e) {
				uni.navigateTo({
					url: "/pages/settings/settings"
				});
			}
		},
		onLoad() {
			this.$store.commit("initHasLogin");
			this.$store.commit("initUserInfo");

		},

		created() {
			this.hasLogin = this.$store.getters.hasLogin();
		}

	}
</script>

<style lang="less">
	@import url('./userCenter.less');
</style>