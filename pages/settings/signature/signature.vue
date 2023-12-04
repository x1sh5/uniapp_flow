<template>
    <view class="rg-input">
        <input :value="signature" maxlength="10" @blur="signatureCheckEvent" placeholder="请填写个性签名"/>
    </view>
    <view>
        <button class="lgtip-button" @click="setSignature">保存</button>
    </view>
</template>

<script>
import {
    StorageKeys
} from '../../../common/storageKeys';
export default {
    data() {
        return {
            signature: "",
            signatureVerify: false
        }
    },
    onLoad() {
		
		try {
			const value = uni.getStorageSync(StorageKeys.introduce);
			if (value) {
				this.signature = value;
			}
		} catch (e) {
			// error
		}
        
    },
    methods: {
        signatureCheckEvent(event) {
            let signature = event.detail.value
			this.signature = signature;
            // let checkUrl = this.$store.state.apiBaseUrl + "" + encodeURIComponent(signature) //需要后端对接
            // uni.request({
            //     url: checkUrl,
            //     success: (res) => {
            //         if (res.statusCode === 200) {
            //             this.signatureCheckTip = res.data.data.msg
            //         }
            //         if (res.data.data.status) {
            //             this.signatureVerify = true
            //         }
            //     }
            // })
        },
        setSignature(event) {
            let signature = this.signature
            let checkUrl = this.$store.state.apiBaseUrl + "/api/AuthUser/set/introduce?introduce=" + encodeURIComponent(signature) //需要后端对接
            uni.requestWithCookie({
                url: checkUrl,
                method:"POST",
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.showToast({
								title: '保存成功',
								icon: 'success',
							})
						that.$store.commit("setIntroduce", this.signature);
                        uni.navigateBack()
                    } else {
                        uni.showToast({
								title: '保存失败',
								icon: 'error',
							})
                    }
                    if (res.data.data.status) {
                        this.signatureVerify = true
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