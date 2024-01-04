<template>
	<view>
		<refer v-if="dataLoaded" :refer="refer" :editable="false"></refer>
		<button class="x" @click="edit">给予修改更新</button>
		<view class="blank" style="width: 100%; height: 80rpx; border: 0px solid  #6c4ad1;  background-color: #ffffff; "></view>
		<view class="history" @click="history">编辑历史</view>
		<!--分割线-->
		<view class="driver"
			style="position: relative; margin: 0 40rpx;height: 2rpx;width: 90%;background-color: #c6b8f1;margin-top: 10rpx;z-index: 2;">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/**
				 * @type {object} refer 审核区间参考
				 * @type {Number} refer.id 
				 * @type {String} refer.title 标题 
				 * @type {String} refer.createtime 创建时间
				 * @type {String} refer.content 内容：Map {Id:referItem}序列化后的内容
				 * @type {String} refer.authid 作者id
				 * @type {String} refer.version 版本
				 * @type {String} refer.username 作者用户名
				 */
				refer: {},
				dataLoaded: false
			}
		},
		methods: {
			edit(e) {
				uni.navigateTo({
					url: "/pages/reference/edit/edit?id=" + this.id
				})
			},
			history(e) {
				uni.navigateTo({
					url: "/pages/reference/history/history?id=" + this.id
				})
			}
		},
		computed: {
			r() {
				return this.refer;
			}
		},
		onLoad(op) {
			this.id = op.id;

			//setTimeout(() => {
			// }, 2000); // 假设加载数据需要2秒
			let kv;
			let r = this.$store.getters["Refer/getReferById"](this.id);

			if (!(r.content instanceof Map)) {
				kv = JSON.parse(r.content);
				let content = new Map();
				if (typeof kv[Symbol.iterator] === 'function') {
					for (let e of kv) {
						if (Array.isArray(e) && e.length === 2) {
							content.set(e[0], e[1]);
						}
					}
				}
				r.content = content;
			}


			this.refer = r;
			this.dataLoaded = true;

		}
	}
</script>

<style>
.x {
z-index: 30;
		border: 1px solid #6c4ad1;
		border-radius: 00rpx;
transform: translate(0rpx, 0rpx) scale(1);
    /* translate 请尽量使用百分比 */
	/* 	 */
	
		/* 新增：设置按钮边框为圆角 */
		width: 350rpx;
		height: 70rpx;
		color: #6c4ad1;
		/* 新增：设置按钮文字颜色为白色 */
		background-color: #ffffff;
		text-align: center;
		/* top: calc(150vh - 350rpx);
	   */

		font-size: 26rpx;
		display: flex;
		/* 使用Flex布局 */
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		margin-top: 50rpx;
		margin-left: -20px;
		box-shadow: 0ch;

		box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
}
.history {
	display: flex;
	justify-content: center;
	/* 水平居中 */
	align-items: center;
	/* 垂直居中 */
	z-index: 9;
	bottom: 1rpx;
	right: 1rpx;
	font-size: 24rpx;
	/*font-style: italic; 斜体 */
	font-weight: 900;
	color: #723de4;
	text-decoration: underline;
	/* 添加下划线 */
	text-decoration-thickness: 15rpx;
	/* 设置下划线的粗细 */
}
/* 分割线*/
.driver {
	z-index: 1;
	display: flex;top: 6rpx;
}
</style>