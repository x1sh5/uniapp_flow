<template>
	<view class="wrapper">
		
		<view class="userinfo">
			<!-- avatar -->
			<view class="user-avatar"><image src="https://wx.qlogo.cn/mmhead/PiajxSqBRaEI2Vb5Lp2pyzDTF41qKU7ibeBXArLoXdJVpDhMGfib2VWEQ/0" class="user-avatar-img"></image></view>
			<view>{{ userName }}</view>
		</view>
		
		<view class="driver"></view>
		
		<view class="taskinfobox">
			<view style="position: relative;margin-left: 10rpx;">我发布的</view>
			<view class="taskinfo">
				<view class="wr icon1" @click="myPublishs"><view class="item_title">历史发布</view></view>
				<view class="wr icon3" @click="history"><view class="item_title">浏览记录</view></view>
				<view class="wr icon4" @click="draftBox"><view class="item_title">草稿箱</view></view>
			</view>
		</view>
		
		<view class="driver" @click="holds"></view>
		<view class="taskinfobox">
			<view style="position: relative;margin-left: 10rpx;">已经接取任务</view>
			<view class="taskinfo">
				<view class="uni-icons icon-incomplete" @click="holds(0)"><view class="item_title">待完成</view></view>
				<view class="wr icon2" @click="holds(1)"><view class="item_title">完成项目</view></view>
			</view>
		</view>
		
		<view class="driver"></view>
		
		<view class="misc">
			<view>帮助中心</view>
			<view>技能互助文档</view>
			<view>收益来源</view>
			<view @click="toSetting">用户设置</view>
		</view>
		
		<view class="driver"></view>
		
		<button v-if="hasLogin" @click="signout">注销</button>
		<view v-else>
			<button  @click="signin">登录</button>
			<button v-if="!hasLogin"  @click="signup">注册</button>
		</view>
		
		
	</view>
</template>

<script>
	import { StorageKeys } from "../../common/storageKeys.js";
	export default {
		data() {
			return {
				imgsrc:"",
			};
		},
		computed:{
			hasLogin(){
				return this.$store.state.$hasLogin
			},
			userName(){
				return this.$store.state.$userName;
			}
		},
		methods:{
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
			draftBox(e){
				console.log(e)
				uni.navigateTo({
					url:"/pages/draftBox/draftBox"
				})
			},
			signin(e){
				uni.navigateTo({
					url:"/pages/login/login?refer=usercenter"
				})
			},
			signup(e){
				uni.navigateTo({
					url:"/pages/register/register"
				})
			},
			signout(e){
				console.log("signout")
				uni.removeStorage({
					key:StorageKeys.cookies
				});
				uni.removeStorage({
					key:StorageKeys.taskContent
				});
				uni.removeStorage({
					key:StorageKeys.userName
				});
				this.$store.commit("changeLoginState")
			},
			toSetting(e){
				uni.navigateTo({
					url:"pages/settings/settings"
				});
			}
		},
		onLoad() {
			this.$store.commit("initHasLogin");
			this.$store.commit("initUserName");
		},
		// #ifdef MP-WEIXIN
		created() {
			uni.showModal({
				content:"小程序将使用用户微信头像作为默认头像",
				success:()=>{
					uni.getUserInfo({
						success:(res)=>{
							this.imgsrc = res.userInfo.avatarUrl;
						}
					});
				}
			});

		}
		// #endif
	}
</script>

<style lang="less">
	@import url('./userCenter.less');
</style>
