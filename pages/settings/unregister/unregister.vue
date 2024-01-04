<template>
	<view>
		<view >
			<view><text class="bold">您需熟知：<br />
				
				</text>
				<text>\n\n</text>·账号注销后，有关账号的一切信息与资料均会被删除，且无法恢复。<text>\n</text>·无多项任务发布的注册用户可随意注销；有违规记录或发布过多项任务的用户按法律需求保留数据不可主动注销账号。本服务协议于账号注销之日终止</view>
			<text>\n\n</text>
			<!-- <view>
				<checkbox :checked="isChecked" name="aggrement" @click="agreementCheckEvent"
					style="transform:scale(0.7); margin-top: 5%;" />
				<label for="checkbox" style="font-size: smaller;">我已阅读并同意<label @click="toAbout"
						style="color: #6c4ad1;">《流沙任务系统用户服务协议》</label></label>
				<view class="tips">{{aggrementCheckTip}}</view>
			</view>-->
			
			
			
			<checkbox-group @change="checkboxChange">
				<checkbox class="true" value="true" ></checkbox>
			</checkbox-group><view class="true">我已知晓</view>
			
			<button class="z" :disabled="!known" @click="unregister">注销账号</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				known: false
			}
		},
		methods: {
			checkboxChange(e){

				if(e.detail.value[0]){
					this.known = true;
				}else{
					this.known = false;
				}
				
			},
			unregister(e){
				let qurl = this.$store.state.apiBaseUrl+"/api/Account/unregister/";
				
				uni.showModal({
					title: "请输入密码确认！",
					editable: true,
					placeholderText: "密码...",
					success: (res) => {

						if(res.confirm){
							uni.uploadFileWithCookie({
							    url: qurl,  
							    filePath: '123', // 随便填，不为空即可  
							    name: '123', // 随便填，不为空即可  
							    //header: header, // 可以加access_token等  
							    formData:{password:res.content}, // 接口参数，json格式，底层自动转为FormData的格式数据  
							    success: (res)=>{  

										if(res.statusCode===200){
											uni.showModal({
												content:res.data,
												showCancel: false,
												success: (res) => {
													this.$store.commit("disconnect");
													uni.clearStorageSync();
													uni.reLaunch({
														url:"/pages/userCenter/userCenter"
													})
												}
											})
										}else{
											uni.showModal({
												content:res.data
											})
										}
										
							        }  
							    });
						}

					}
				})
				

			}
		}
	}
</script>

<style>
.text {
		size: 20rpx;
	}

	.true {
		font-weight: bold;
		top: 20rpx;
	padding-left: 15px;/* 右缩进 */
	}
	.bold {
		font-weight: bold;
	}

	.underline {
		text-decoration: underline;
	}

	.sectitle {
		font-size: 1.2rem;
		font-weight: bold;
	}
	
	
	.z {
	 z-index: 10;
  transform: translate(0rpx,0rpx) scale(1);

  border: 1px solid  #ffaa00;
  border-radius: 0rpx; /*设置按钮边框为圆角 */
  border: none;
  width: 800rpx;
  height: 150rpx;
  color: rgb(255, 255, 255); 
  background-color: #ffaa00; 
  font-size: 48rpx;
  text-align: center;
/* top: calc(150vh - 350rpx);
   */
 
 display: flex;  /* 使用Flex布局 */ 
    justify-content: center;  /* 水平居中 */
 align-items: center;   /* 垂直居中 */
   margin-top: 0rpx;
   box-shadow:0ch;
 padding-left: 500rpx; 
   box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
	}
	
	
</style>
