<template>
	<view>
		<view style="display: flex;flex-direction: column;">
			<!-- <view>
				<input placeholder="姓名" maxlength="20"/>
			</view> -->
			<text>上传身份证信息</text>
			<view>
				<image :draggable="false" style="width: 350px;height: 200px;margin-left: 15px;" :src="pos"></image>
				<button style="width: 180px;" @click="uploadPos">上传正面照</button>
			</view>
			<view>
				<image :draggable="false" style="width: 350px;height: 200px;margin-left: 15px;" :src="neg"></image>
				<button style="width: 180px;" @click="uploadNeg">上传反面照</button>
			</view>
		</view>
		<button style="width: 80px;" @click="check">认证</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pos:"",
				neg:""
			}
		},
		methods: {
			uploadPos(e){
				this.$store.dispatch("upload")
					.then((res)=>{
						let o = JSON.parse(res.data)
						this.pos = this.$store.state.apiBaseUrl+ o[0].url;
				})
					.catch((err)=>{
						uni.showToast({
							title:err.message
						})
					})
			},
			uploadNeg(e){
				this.$store.dispatch("upload")
					.then((res)=>{
					let o = JSON.parse(res.data)
					this.neg = this.$store.state.apiBaseUrl+ o[0].url;
				})
					.catch((err)=>{
						uni.showToast({
							title:err.message
						})
					})
			},
			check(e){
				let qurl = this.$store.state.apiBaseUrl+"/api/Image/upload";
				uni.uploadFile({
					url: qurl,
					filePath: '123', // 随便填，不为空即可  
					name: '123', // 随便填，不为空即可  
					//header: header, // 可以加access_token等  
					formData:{posimg:this.pos,negimg:this.neg}, // 接口参数，json格式，底层自动转为FormData的格式数据  
					success: (res)=>{  
					        console.log(res);  
					    }  
				})
			}
		}
	}
</script>

<style>

</style>
