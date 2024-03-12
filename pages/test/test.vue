<template>
	<view>{{ws}}</view>
	<image style="width: 200px; height: 200px; background-color: #eeeeee;"  :src="url"></image>

	<button @click="chooseFile">选择文件</button>
	
</template>

<script>
	import { uploadFile,ossGetUrl } from '../../common/ossutil.js';
	import { md5 } from 'js-md5';

	export default {
		data() {
			return {
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
							uploadFile(file)
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
