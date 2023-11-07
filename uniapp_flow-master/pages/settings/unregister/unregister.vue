<template>
	<view>
		<view style="width: 90%;height: 100%;">
			<view>账号注销后，有关账号的一切信息与资料均会被删除，且无法恢复。</view>
			<checkbox-group @change="checkboxChange">
				<checkbox value="true" ></checkbox><view>我已知晓</view>
			</checkbox-group>
			
			<button :disabled="!known" @click="unregister">注销账号</button>
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
				console.log(e);
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
						console.log(res);
						if(res.confirm){
							uni.uploadFileWithCookie({
							    url: qurl,  
							    filePath: '123', // 随便填，不为空即可  
							    name: '123', // 随便填，不为空即可  
							    //header: header, // 可以加access_token等  
							    formData:{password:res.content}, // 接口参数，json格式，底层自动转为FormData的格式数据  
							    success: (res)=>{  
							            console.log(res);  
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

</style>
