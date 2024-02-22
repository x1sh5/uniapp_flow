<template>
	<view>
		{{sd}}
	</view>
	<view>{{ws}}</view>
<!-- 	<image style="width: 200px; height: 200px; background-color: #eeeeee;"  :src="url"></image> -->

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
				url:""
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
								let mdstr = btoa(md5(res));
								let name=mdstr+"_"+file.name;
								let requestObj = {
									url:"https://sdfsdafasdf.oss-cn-shanghai.aliyuncs.com",
									method:"PUT",
									header:{
										"Content-Type": file.type,
										"Content-Length": file.size,
										"Content-MD5": mdstr
									},
									callback:{
										"callbackUrl":"https://www.liusha-gy.com/api/OSSNotify",
										"callbackBody":`bucket=sdfsdafasdf&object=${"/sdfsdafasdf/"+name}&size=${file.size}&mimeType=${file.type}&contentMd5=${mdstr}`
									},
									callback_var:{"x:userid":1}
								}
								
								putObject(requestObj,"/sdfsdafasdf/"+name)
							})
						}
						
					}
				})
			}
		},
		onLoad() {
			// ossGetUrl("/sdfsdafasdf/IMG_20190119_144633_1.jpg").then((url)=>{
			// 	console.log(url);
			// 	this.url = url;
			// });

		},
		onShow() {
			ossGetUrl("/sdfsdafasdf/IMG_20190119_144633_1.jpg").then((url)=>{
				console.log(url);
				this.url = url ;
			});
		}
	}
</script>

<style>

</style>
