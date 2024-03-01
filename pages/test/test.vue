<template>
	<view>
		{{sd}}
	</view>
	<view>{{ws}}</view>
	<image style="width: 200px; height: 200px; background-color: #eeeeee;"  :src="url"></image>

	<button @click="chooseFile">选择文件</button>
	
</template>

<script>
	import { putObject,ossGetUrl } from '../../common/ossutil.js';
	import { md5 } from 'js-md5';

	export default {
		data() {
			return {
				sd:putObject,
				ws:"",
				url:null
			}
		},
		methods: {
			chooseFile(e){
				uni.chooseFile({
					count:10,
					success: (e) => {
						console.log(e)
						for(const file of e.tempFiles){
							file.slice().arrayBuffer().then((res)=>{
								console.log(res)
								let mdstr = md5.base64(res);;
								let name=md5(res)+"_"+file.name;
								let resourcePath = "/sdfsdafasdf/"+file.name;
								let requestObj = {
									url:"https://sdfsdafasdf.oss-cn-shanghai.aliyuncs.com",
									method:"PUT",
									header:{
										"Content-Type": file.type?file.type:"application/octet-stream",
										// "Content-Length": file.size,
										"Content-MD5": mdstr,
										"cache-control":"no-cache"
									},
									callback:{
										"callbackUrl":"https://www.liusha-gy.com/api/OSSNotify/callback",
										"callbackBody":`bucket=sdfsdafasdf&object=${resourcePath}&size=${file.size}&mimeType=${file.type}&contentMd5=${mdstr}`
									},
									data:res,
									success:function(resl){
										if(resl.statusCode === 200){
											uni.showToast({
												title:"上传成功！",
											})
										}
									},
									callback_var:{"x:userid":"1"}
								}
								console.log(encodeURIComponent(mdstr));
								putObject(requestObj,resourcePath)
							})
						}
						
					}
				})
			},

		},
		onLoad() {
			// ossGetUrl("/sdfsdafasdf/IMG_20190119_144633_1.jpg").then((url)=>{
			// 	console.log(url);
			// 	this.url = url;
			// });

		},
		onShow() {
			if(!this.url){
				ossGetUrl("/sdfsdafasdf/IMG_20190119_144633_1.jpg").then((url)=>{
					console.log(url);
					this.url = url ;
				});
			}

		}
	}
</script>

<style>

</style>
