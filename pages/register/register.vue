<template>
	<view>
		<view style="display: flex;flex-direction: column;">
			<!-- <view>
				<input placeholder="姓名" maxlength="20"/>
			</view> -->
			<view>
				<input class="rg-input" v-model="name" maxlength="15" placeholder="真实姓名：" />
			</view>

			<view>
				<input class="rg-input" v-model="cardNo" @blur="CardNoCheck" maxlength="18" placeholder="身份证号：" />
			</view>

<!-- 			<text style="margin-top:60rpx;margin-left: 60rpx;">请上传身份证信息:</text>
			<view>
				<image :draggable="false" style="width: 350px;height: 200px;margin-left: 15px;" :src="pos"></image>
				<button style="width: 180px;" @click="uploadPos">上传正面照</button>
			</view> -->

		</view>
		<view>
			<checkbox :checked="isChecked" name="aggrement" @click="agreementCheckEvent"
				style="transform:scale(0.7); margin-top: 5%;" />
			<label for="checkbox" style="font-size: smaller;">我已阅读并同意<label @click="toAbout"
					style="color: #6c4ad1;">《流沙任务系统用户服务协议》</label></label>
					<text class="lianjie"  @click="topbout">《隐私政策》</text>
					<text  @click="toibout" class="lianjie">《流沙任务系统使用说明》</text>
					<text class="lianjie"  @click="tocbout">《成本分摊方略》</text><text>\n\n</text>
			<view class="tips">{{aggrementCheckTip}}</view>
		</view>
		<button class="button" style="width: 80px;" @click="check">人脸验证</button>
		<text style="margin-left: auto;margin-right: auto;font-size: small;margin-top: 2px;">*信息仅用于身份验证，我们依照隐私政策保护您的个人信息</text>
	</view>
</template>

<script>
	import {
		StorageKeys
	} from '/common/storageKeys';
	export default {
		data() {
			return {
				pos: "", //正面照
				neg: "", //反面照
				posMd5: "",
				name: "",
				nameChecked:false,
				cardNo: "",
				cardNoChecked: false,
				aggrementCheckTip: "",
				isChecked: false
			}
		},
		methods: {
			agreementCheckEvent(event) {
				this.isChecked = !this.isChecked
			
				if (this.isChecked == false) {
					this.aggrementCheckTip = "请勾选同意《用户协议》";
					return
				}
				if (this.isChecked == true) {
					this.aggrementCheckTip = "";
					return
				}
			},
					
			topbout(e) {
				uni.navigateTo({
					url: "/pages/userCenter/privacy/privacy"
				});
			},
			toibout(e) {
				uni.navigateTo({
					url: "/pages/userCenter/instructions/instructions"
				});
			},
					
			tocbout(e) {
				uni.navigateTo({
					url: "/pages/userCenter/cost/cost"
				});
			},
			
			
			toAbout(e) {
				uni.navigateTo({
					url: "/pages/userCenter/about/about"
				});
			},
			CardNoCheck(e){
				if(/[0-9X]{18}/.test(this.cardNo)){
					this.cardNoChecked = true;
					return
				}
				uni.showModal({
					showCancel:false,
					content:"身份证号格式不合法"
				})
			},
			check(e) {
				
				let qurl = this.$store.state.apiBaseUrl + "/api/Account/register/v2";
				if(!this.cardNoChecked){
					uni.showModal({
						showCancel:false,
						content:"身份证号格式不合法"
					})
					return;
				}
				if(this.name==""){
					uni.showToast({
						title:"姓名不能为空。"
					})
					return;
				}
				
				if (this.isChecked == true) {
					uni.request({
						url: qurl,
						header:{
							"Content-Type":"application/x-www-form-urlencoded"
						},
						method:"POST",
						data: {
							name: this.name,
							cardNo: this.cardNo
						}, // 接口参数，json格式，底层自动转为FormData的格式数据  
						success: (res) => {
							if (res.statusCode === 200) {
								uni.setStorage({
									key: StorageKeys.isActive,
									data: true
								});
								uni.navigateTo({
									url:"livedetect/livedetect?identity="+res.data
								})
							} else {
								uni.showModal({
									showCancel: true,
									content: res.data?res.data:"网络错误！"
								})
							}
					
						},
						fail:(err)=>{
							console.log(err)
						}
					})
				}else{
					uni.showToast({
						title:"未勾选协议。"
					})
				}

			}
		}
	}
</script>

<style>
	.rg-input {
  margin-top:40rpx;
  width: 300px;
    height:30rpx;
    border: 1rpx solid #6c4ad1;

   /* font-family: uniicons;*/
    text-decoration: none;
    padding-left: 15px;/* 右缩进 */
    font-size: 30rpx; /* 尺寸 */
    letter-spacing: 3px;
    line-height: 40rpx;/* 文本上下位置 */
    height: 70rpx;/* 背景高度 */
    color: #ffffff;/* 字体颜色 */
    margin: rpx 0;/* 上下位置 */
    background-image: -webkit-linear-gradient(0deg, #4d1ae4 0%, #886cdb 100%);
   
    border-bottom:0rpx solid #6c4ad1; /* 添加底部边框，可以根据需要调整颜色和粗细 */
    outline: none; /* 移除默认的焦点边框 */
	}
	.button{
	  border: 0px solid  #6c4ad1;
	  font-size: 13px;
	  border-radius: 0px; /* 新增：设置按钮边框为圆角 */
	  width: 100px;
	  height: 35px;
	  margin-top: 0rpx;
	 display: flex;  /* 使用Flex布局 */ 
	   justify-content: center;  /* 水平居中 */
	   align-items: center; /* 垂直居中 */
	   margin-left: 500rpx;
	   color: #6c4ad1; /* 新增：设置注册按钮文字颜色为绿色 */
	   background-color: rgba(0, 0, 0, 0);
	   text-decoration: underline; 
	 
	   
	}
	.lianjie {
		font-size: 26rpx;
		color: #5500ff;
	}
</style>