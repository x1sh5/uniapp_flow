<template>
	<view class="wrapper">
		
		<view class="userinfo">
			<!-- avatar -->
			<view class="user-avatar"><image :src="imgsrc" class="user-avatar-img"></image></view>
			<view>{{ userName }}</view>
		</view>
		
		<view class="driver"></view>
		
		<view class="taskinfobox">
			<view style="position: relative;margin-left: 10rpx;">我发布的</view>
			<view class="taskinfo">
				<view class="wr icon1" @click="myPublishs"><view class="item_title">历史发布</view></view>
				<view class="wr icon3" @click="history"><view class="item_title">浏览记录</view></view>
				<view class="wr icon6" @click="taskReq"><view class="item_title">任务请求</view></view>
			</view>
		</view>
		
		<view class="driver" @click="holds"></view>
		<view class="taskinfobox">
			<view style="position: relative;margin-left: 10rpx;">已经接取任务</view>
			<view class="taskinfo">
				<view class="uni-icons icon-incomplete" @click="holds(0)"><view class="item_title">待完成</view></view>
				<view class="wr icon2" @click="holds(1)"><view class="item_title">完成项目</view></view>
				<view class="wr icon7" @click="myApply"><view class="item_title">我的申请</view></view>
			</view>
		</view>
		
		<view class="driver"></view>
		
		<view class="misc">
			<view @click="toReference" class="user-view" style="display: flex;flex-direction: row; position: relative">
				<view  >审核区间参考</view>
				<view style="position: absolute;right: 0;">></view>
			</view>
			<view class="driver"></view>
			<view class="user-view">帮助中心</view>
			<view class="driver"></view>
			<view class="user-view">技能互助文档</view>
			<view class="driver"></view>
			<view class="user-view">收益来源</view>
			<view class="driver"></view>
			<view @click="toSetting" class="user-view" style="display: flex;flex-direction: row; position: relative">
				<view >用户设置</view>
				<view style="position: absolute;right: 0;">></view>
			</view>
			
		</view>
		
		<view class="driver"></view>
		<view v-show="hasLogin">
			<button @click="signout">退出</button>
		</view>
		
		<view v-show="!hasLogin">
			<button  @click="signin">登录</button>
			<button  @click="signup">注册</button>
		</view>
		
		
	</view>
</template>

<script>
	import { StorageKeys } from "../../common/storageKeys.js";

	export default {
		data() {
			return {
				imgsrc:"",
				login: false
			};
		},
		computed:{
			hasLogin:{
				get(){
					return this.login;
				},
				set(value){
					this.login = value
				}
			},
			userName(){
				return this.$store.state.$userName;
			}
		},
		methods:{
			toReference(e){
				uni.navigateTo({
					url: "/pages/reference/reference"
				})
			},
			myPublishs(e){
				uni.navigateTo({
					url:"/pages/myPublishs/myPublishs"
				})
			},
			history(e){
				console.log(e)
				uni.navigateTo({
					url:"/pages/history/history"
				})
			},
			holds(t){
				//任务接取情况
				let turl = "/pages/holdTask/holdTask?current="+t;
				uni.navigateTo({
					url:turl
				})
			},
			taskReq(e){
				console.log(e);
				uni.navigateTo({
					url:"/pages/taskReq/taskReq"
				});
			},
			myApply(e){
				console.log(e);
				uni.navigateTo({
					url:"/pages/myApply/myApply"
				});
			},
			signin(e){
				uni.navigateTo({
					url:"/pages/login/login?refer=usercenter"
				});
			},
			signup(e){
				uni.navigateTo({
					url:"/pages/register/register"
				});
			},
			signout(e){
				console.log("signout")
				const lurl = this.$store.state.apiBaseUrl+"/api/Account/logout"
				uni.requestWithCookie({
					url: lurl,
					method: "POST",
					success:()=>{
						this.$store.commit("loginOut");
						this.hasLogin = this.$store.getters.hasLogin();
						this.$nextTick();
					}
				});
				uni.removeStorage({
					key:StorageKeys.cookies
				});
				uni.removeStorage({
					key:StorageKeys.taskContent
				});
				uni.removeStorage({
					key:StorageKeys.userName
				});
				
			},
			toSetting(e){
				uni.navigateTo({
					url:"/pages/settings/settings"
				});
			}
		},
		onLoad() {
			this.$store.commit("initHasLogin");
			this.$store.commit("initUserName");
			
		},
		
		created() {
			this.hasLogin = this.$store.getters.hasLogin();
			// #ifdef MP-WEIXIN
			uni.showModal({
				content:"小程序将使用用户微信头像作为默认头像",
				cancelText: "不同意",
				confirmText: "同意",
				success:()=>{
					uni.getUserInfo({
						success:(res)=>{
							this.imgsrc = res.userInfo.avatarUrl;
						}
					});
				}
			});
			// #endif
		}
		
	}
</script>

<style lang="less">
	@import url('./userCenter.less');
	
</style>
