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
    margin-top: 150rpx;
    margin-left: 40rpx;
    margin-right: 40rpx;
    border: 2px solid #6c4ad1;
    border-radius: 0px; /* 将输入框的圆角设置为50 */
    border: none; /* 移除默认边框 */
    border-bottom: 1px solid #6c4ad1; /* 添加底部边框，可以根据需要调整颜色和粗细 */
    outline: none; /* 移除默认的焦点边框 */
    background: transparent; /* 设置背景为透明，以便底部边框显示 */
    padding: 0; /* 移除默认内边距，可以根据需要设置 */
}

.lgtip-button{
    border: 1px solid  #6c4ad1;
    border-radius: 20px; /* 新增：设置按钮边框为圆角 */
    width: 150px;
    height: 40px;
    margin-top: 60rpx;
    display: flex;  /* 使用Flex布局 */ 
    justify-content: center;  /* 水平居中 */
    align-items: center; /* 垂直居中 */
    color: #ffffff; /* 新增：设置注册按钮文字颜色为绿色 */
    background-color: #6c4ad1; /* 新增：设置注册按钮背景颜色为白色 */
    box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
}
</style>