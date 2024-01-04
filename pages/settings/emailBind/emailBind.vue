<template>
	<view>
		<view v-if="mode=='show'">
			<input class="rg-input" :disabled="true" v-model="email" type="text" maxlength="256" placeholder="请输入邮箱" />
			<button class="f" @click="bindChange">更改邮箱</button>
		</view>

		<view v-if="mode=='bindnew'">
			<input class="rg-input" v-model="newEmail" type="text" maxlength="256" placeholder="请输入邮箱" />
			<button class="f" @click="sendCode">发送验证码</button>
			<view v-show="showCode">
				<view>请输入{{email}}收到的验证码</view>
				<xt-verify-code inputType="text" type="bottom" v-model="code"></xt-verify-code>
				<button @click="bindEmail">绑定</button>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: "",
				regex: new RegExp(String.raw`^[a-zA-Z0-9._%#&'*$+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`),
				showCode: false,
				code: "",
				newEmail:"",
				mode:"bindnew"//bindnew, show
			}
		},
		computed: {
			state() {
				if (this.email) return true;
				return false;
			}
		},
		methods: {
			bindChange(e) {
				this.mode = "bindnew"
			},
			async sendCode(e) {
				let match = this.regex.test(this.newEmail);

				if (match) {
					uni.requestWithCookie({
						url: this.$store.state.apiBaseUrl + "/api/AuthUser/emailcode/send?email=" + this
							.newEmail,
						success: (res) => {
							if (res.statusCode !== 204) {
								uni.showModal({
									showCancel: true,
									content: res.data
								});
								
							} else {
								this.showCode = true;
								this.countDown();
							}
						}

					})
				} else {
					uni.showModal({
						showCancel: true,
						content: "不合法的邮箱地址。"
					})
				}

			},
			bindEmail(e) {
				uni.requestWithCookie({
					url: this.$store.state.apiBaseUrl + "/api/AuthUser/emailcode/confirm?code="+this.code,
					method: "POST",
					success: (res) => {
						uni.showModal({
							showCancel: true,
							content: res.data
						})
					}
				})
			},
			//验证码倒计时
			countDown() {
				// 初始化定时器
				let t = null;
				//计时1分钟
				let timer = 60;
				// 按钮禁用
				this.btnDis = true;
				// 计时器清季
				clearInterval(t);
				// 按显示时间
				this.btnText = `${timer}s`;
				t = setInterval(() => {
						// 当倒计时完时，显示重新发送，按钮开启
						if (timer == 0) {
							clearInterval(t);
							this.btnText = "重新发送";
							this.btnDis = false;
							return;
						}
						// 实现倒计时效果
						timer--;
						this.btnText = `${timer}s`;
					},
					1000)
			}
		},
		onLoad() {
			uni.requestWithCookie({
				url: this.$store.state.apiBaseUrl + "/api/AuthUser/email",
				success: (res) => {
					if (res.statusCode === 200) {
						this.email = res.data;
						this.mode = "show"
						
					}
				}
			})
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
	
	.f{
	
	  	 z-index: 10;
	    transform: translate(0rpx,10rpx) scale(1);
	  
	    border: 10px solid  #6c4ad1;
	    border-radius: 0rpx; /*设置按钮边框为圆角 */
	    border: none;
	    width: 800rpx;
	    height: 150rpx;
	    color: rgb(255, 255, 255); 
	    background-color: #4d1ae4; 
	    font-size: 40rpx;
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