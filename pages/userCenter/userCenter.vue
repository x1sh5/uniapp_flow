<template>
	<view class="wrapper">
		
		<view class="userinfo">
			<!-- avstar -->
			<image></image>
			<view>username</view>
		</view>
		
		<view class="taskinfobox">
			<view>我发布的</view>
			<view class="taskinfo">
				<view>历史发布</view>
				<view>完成项目</view>
				<view>浏览记录</view>
				<view>草稿箱</view>
			</view>
		</view>
		
		<view class="misc">
			<view>帮助中心</view>
			<view>技能互助文档</view>
			<view>收益来源</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.wrapper{
		display: flex;
		flex-direction: column;
	}
	
	.userinfo{
		display: flex;
		flex-direction: row;
		height: 150rpx;
	}
	
	.taskinfobox{
		display: flex;
		flex-direction: column;
		height: 300rpx;
	}
	
	.taskinfo{
		display: flex;
		flex-direction: row;
		
	}
</style>
