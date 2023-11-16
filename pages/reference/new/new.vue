<template>

	<view class="table-row">
		<view class="table-cell a">建立新审核区间</view>
	</view>
	
	<view>
		<refer :refer="refer" :editable="true"></refer>
	</view>
	<view>
		<button class="commit-btn" @click="commit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refer: {
					title: "",
					lines: new Array(),
					content: new Map()
				}

			}
		},
		computed: {
			lines() {
				let l = [];
				for (let i of Array.from(this.refer.content.keys())) {
					l.push({
						id: i
					});
				}
				return l;
			}
		},
		methods: {
			commit(e) {
				if (this.refer.title === "") {
					uni.showToast({
						title: "标题不能为空。"
					});
					return
				}

				if (this.lines.length === 0) {
					uni.showToast({
						title: "内容不能为空。"
					});
					return
				}

				let content = JSON.stringify(Array.from(this.refer.content));
				let qurl = this.$store.state.apiBaseUrl + "/api/Reference";
				uni.requestWithCookie({
					url: qurl,
					method: "POST",
					data: {
						id: 0,
						title: this.refer.title,
						content: content,
						authId: 0,
						userName: ""
					},
					success: (res) => {
						uni.showModal({
							showCancel: false,
							content: res.data
						})
					}
				});
			},
		}
	}
</script>

<style>
	.commit-btn {
		display: flex;
		height: 70px;
		width: 100%;
		background-color: #5500ff;
		margin-left: auto;
		margin-right: auto;
		/* align-content: center; */
		justify-content: center;
		flex-wrap: nowrap;
		align-items: center;
		margin-bottom: 5px;
		color: #ffffff;
		border: 1px solid #5500ff;
		transform: translate(0rpx, -180rpx) scale(1);
		position: relative;
		margin-top:300px;
	}
	
	.a {
		z-index: -1;
		padding: 20rpx;
		/* 内边距 */
	
		width: 100%;
		text-decoration: none;
		font-size: 40rpx;
		/* 尺寸 */
		letter-spacing: 6rpx;
		/* 字母之间的间距 */
		line-height: 50rpx;
		/* 文本上下位置 */
		height: 70rpx;
		/* 背景高度 */
		color: #ffffff;
		/* 字体颜色 */

		padding-left: 20rpx;
		/* 右缩进 */
	
		text-align: center;
		/*水平居中对齐 */
		display: flex;
		/*变为弹性容器 */
		justify-content: center;
		/*主轴上水平居中对齐 */
		align-items: center;
		/*垂直居中对齐 */
		background-image: -webkit-linear-gradient(0deg, #4d1ae4 0%, #886cdb 100%);
	
	}
</style>