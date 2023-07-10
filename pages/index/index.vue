<template>
	<view class="content">
		<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索任务" clearButton="auto" cancelButton="none" @confirm="search" />
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000"
				:duration="500">
			<swiper-item><view class="swiper-item uni-bg-red">A</view></swiper-item>
			<swiper-item><view class="swiper-item uni-bg-green">B</view></swiper-item>
			<swiper-item><view class="swiper-item uni-bg-blue">C</view></swiper-item>
		</swiper>
		<cardinfo :task="{}" editable="true"></cardinfo>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tasks:[]
			}
		},
		onLoad() {
			    try {
			      const data = await fetchTasks("/Assignment/");
			      console.log(data.$values);  // 查看返回的数据
			      this.setData({
			        //使用data.$values,我使用后端框架的默认数据格式，后面会调整
			        tasks: data.$values
			      });
			    } catch (error) {
			      console.error("Error getting data from the API:", error);
			    }
		},
		methods: {
			async function fetchTasks(urlpath) {
			  return new Promise((resolve, reject) => {
				uni.request({
				  //直接使用地址拼接
				  url: `${app.globalData.apiBaseUrl}`+urlpath,
				  method: "GET",
				  // data 模式会转换成url参数，也就是url会转换成 ${app.globalData.apiBaseUrl}/Assignment?userId=
				  //但真实的请求应该是 ${app.globalData.apiBaseUrl}/Assignment/userId
				  // data: {
				  //   userId: userId,
				  // },
				  success: (res) => {
					if (res.statusCode === 200) {
					  resolve(res.data);
					} else {
					  reject(res);
					}
				  },
				  fail: (err) => {
					reject(err);
				  },
				});
			  });
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		//align-items: center;
		//justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.uni-mt-10 {
		margin-top: 10px;
		display: block;
	}
	
	.swiper {
			height: 300rpx;
		}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.uni-bg-red{
		background-color: red;
	}
	.uni-bg-green{
		background-color: green;
	}
	.uni-bg-blue{
		background-color: blue;
	}
</style>
