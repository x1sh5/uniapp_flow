<template>
    <view class="rg-input">
        <input :value="nickname" maxlength="10" @blur="nicknameCheckEvent" placeholder="请填写昵称"/>
        <view>{{ nicknameCheckTip }}</view>
    </view>
    <view>
        <button class="lgtip-button" @click="setNickname">保存</button>
    </view>
</template>

<script>
import {
    StorageKeys
} from '../../../common/storageKeys';
export default {
    data() {
        return {
            nickname: "",
            nicknameCheckTip: "",
            nicknameVerify: false
        }
    },
    onLoad() {
        this.nickname = this.$store.state.$userName
    },
    methods: {
        nicknameCheckEvent(event) {
            let nickname = event.detail.value;
			this.nickname = nickname;
            if (/[ !@#$%^&*()+{}\[\]:;<>,.?~\-，。？、《》【】（）]/.test(nickname)) {
                this.nicknameCheckTip = "昵称不能包含特殊字符"
                return
            }
            let checkUrl = this.$store.state.apiBaseUrl + "/api/Account/namecheck?username=" + encodeURIComponent(nickname) //需要后端对接
            uni.request({
                url: checkUrl,
                success: (res) => {
                    if (res.statusCode === 200) {
                        this.nicknameCheckTip = res.data.data.msg
                    }
                    if (res.data.data.status) {
                        this.nicknameVerify = true
                    }
                }
            })
        },
        setNickname(event) {
            let nickname = this.nickname
            let checkUrl = this.$store.state.apiBaseUrl + "/api/AuthUser/set/nickname?nickname=" + encodeURIComponent(nickname) //需要后端对接
            uni.requestWithCookie({
                url: checkUrl,
                method:"POST",
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.showToast({
								title: '保存成功',
								icon: 'success',
							})
						this.$store.commit("setUserName", this.nickname);
                        uni.navigateBack()
                    } else {
                        uni.showToast({
								title: '保存失败',
								icon: 'error',
							})
                    }
                    if (res.data.data.status) {
                        this.nicknameVerify = true
                    }
                }
            })
        },
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

.lgtip-button{

  	 z-index: 10;
    transform: translate(0rpx,10rpx) scale(1);
  
    border: 10px solid  #6c4ad1;
    border-radius: 0rpx; /*设置按钮边框为圆角 */
    border: none;
    width: 800rpx;
    height: 150rpx;
    color: rgb(255, 255, 255); 
    background-color: #4d1ae4; 
    font-size: 80rpx;
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