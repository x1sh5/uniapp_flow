<!-- 审核区间参考 -->

<template>
	<view class="th">
		<!-- 第一行的各个标题-->
		<!-- 		<view class="table-row">
			<view class="table-cell a">建立新审核区间</view>
			<view class="table-cell b">总比例</view>
			<view class="table-cell c">修改时间</view>
			<view class="table-cell d">修改人</view>

		</view> -->
		<!-- 第一行各个标题搭配的输入框 -->


		<view>
			<input :disabled="!editable" v-model="refer.title" type="text" auto-height class="textarea-field-aa"
				placeholder="*填写您设立项目的总名称" />
		</view>


		<view v-for="r in referItems" :key="r.id">
			<referItem @del-Line="delLine" :item="r" :id="r.id" :editable="editable"></referItem>
		</view>



		<!-- 添加按钮可在当前页面重复添加区间添加模块 -->
		<view v-show="editable" class="addLine" @click="addLine">
			<view>+添加一个新分配项</view>
		</view>

	</view>


</template>

<script>
	export default {
		data() {
			return {
				curr: 0,
				//分配模式的总条数
				referItems: []
			}
		},
		props: {
			/**
			 * @type {Map} refer 
			 */
			refer: Object,
			//是否能编辑
			editable: {
				type: Boolean,
				default () {
					return false;
				}
			}
		},
		computed: {

		},
		beforeMount() {
			this.curr = this.refer.content.size;

			if (this.curr > 0) {
				let l = [];
				for (let i of this.refer.content) {
					l.push({
						id: i[0],
						...i[1]
					});
				}
				this.referItems = l;
			}

		},
		mounted() {

		},
		methods: {

			addLine(e) {
				const currentId = this.curr++;
				// this.refer.content.set(currentId, {
				// 	stitle: "",
				// 	rate: "",
				// 	brief: "",
				// 	detail: "",
				// 	remark: ""
				// });
				this.referItems.push({
					id: currentId,
					stitle: "",
					rate: "",
					brief: "",
					detail: "",
					remark: ""
				});
			},
			delLine(id) {
				let index = this.referItems.findIndex(item => item.id === id);
				if (index !== -1) {
					this.referItems.splice(index, 1);
				}
				this.refer.content.delete(id);
			},


		}
	}
</script>

<style>
	/*
		
		
		.th > textarea{
			height: 30px;
		}
		
		.td{
			
			height: auto;
		}
		
		.stitle, .rate, .brief, .detail, .remark{
			border: 1px solid black;
			box-sizing: border-box;
		}
		
		from > view {
			text-align: center;
		}
		
		.addLine{
			margin-top: 5px;
			margin-bottom: 5px;
			width: 40px;
			height: 20px;
			margin-left: auto;
			margin-right: auto;
			border: 1px solid black;
			border-radius: 10px;
		}
		
		.del{
			width: 40px;
			margin-top: auto;
			margin-bottom: auto;
			border: 1px solid black;
		}
		
		*/
	.table-row {
		width: 100%;
		height: 40px;
		box-sizing: border-box;
	}

	.th{
		display: flex;
		flex-direction: column;
	}

	.td {
		height: auto;
	}

	.a {
		z-index: -1;
		display: table-cell;
		padding: 20rpx;
		/* 内边距 */

		width: 100%;
		height: 40rpx;

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
		margin: rpx 0;
		/* 上下位置 */
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

	.b {
		z-index: 2;
		transform: translate(440rpx, 20rpx) scale(1);
		background-color: #ffffff;
		/*设置背景颜色 */

		width: 13%;
		height: 110rpx;
		font-size: 28rpx;
		text-align: center;
		/*水平居中对齐 */
		display: flex;
		/*变为弹性容器 */
		justify-content: center;
		/*主轴上水平居中对齐 */
		align-items: center;
		/*垂直居中对齐 */
		color: #472d97;

	}


	.c {
		z-index: 2;
		transform: translate(550rpx, -90rpx) scale(1);
		background-color: #ffffff;
		/*设置背景颜色 */

		width: 14%;
		height: 110rpx;

		font-size: 26rpx;
		text-align: center;
		/*水平居中对齐 */
		display: flex;
		/*变为弹性容器 */
		justify-content: center;
		/*主轴上水平居中对齐 */
		align-items: center;
		/*垂直居中对齐 */
		color: #472d97;
	}

	.d {
		z-index: 2;
		transform: translate(652rpx, -200rpx) scale(1);
		background-color: #ffffff;
		/*设置背景颜色 */

		width: 13%;
		height: 110rpx;

		font-size: 26rpx;
		text-align: center;
		/*水平居中对齐 */
		display: flex;
		/*变为弹性容器 */
		justify-content: center;
		/*主轴上水平居中对齐 */
		align-items: center;
		/*垂直居中对齐 */
		color: #472d97;
	}

	.textarea-field-aa {
		z-index: 3;
		transform: translate(2rpx, -220rpx) scale(1);
		border: 2rpx solid #886cdb;
		/* 边框颜色 */

		width: 428rpx;
		height: 60rpx;

		font-size: 26rpx;
		color: #000000;
	}

	.table-cell-bb {
		z-index: 3;
		background-color: #886cdb;
		/*设置背景颜色 */
		transform: translate(440rpx, -280rpx) scale(1);

		width: 13%;
		height: 60rpx;

		text-align: center;
		/*水平居中对齐 */
		display: flex;
		/*变为弹性容器 */
		justify-content: center;
		/*主轴上水平居中对齐 */
		align-items: center;
		/*垂直居中对齐 */
		color: #ffffff;
	}

	.table-cell-cc {
		z-index: 3;
		border: 2rpx solid #886cdb;
		/* 边框颜色 */
		transform: translate(544rpx, -342rpx) scale(1);

		width: 14%;
		height: 60rpx;

		font-size: 20rpx;
		text-align: center;
		/*水平居中对齐 */
		display: flex;
		/*变为弹性容器 */
		justify-content: center;
		/*主轴上水平居中对齐 */
		align-items: center;
		/*垂直居中对齐 */
		color: #000000;
	}

	.table-cell-dd {
		z-index: 3;
		border: 2rpx solid #886cdb;
		/* 边框颜色 */
		transform: translate(660rpx, -406rpx) scale(1);

		width: 11%;
		height: 60rpx;

		font-size: 20rpx;
		text-align: center;
		/*水平居中对齐 */
		display: flex;
		/*变为弹性容器 */
		justify-content: center;
		/*主轴上水平居中对齐 */
		align-items: center;
		/*垂直居中对齐 */
		color: #000000;
	}


	.textarea-field-ee {
		z-index: 4;
		transform: translate(0rpx, -380rpx) scale(1);
		border: 2rpx solid #886cdb;
		/* 边框颜色 */

		width: 100%;
		height: 60rpx;

		font-size: 26rpx;
		color: #000000;


	}


	.textarea-field-ff {
		z-index: 5;
		transform: translate(0rpx, -380rpx) scale(1);
		border: 2rpx solid #886cdb;
		/* 边框颜色 */

		width: 100%;
		height: 120rpx;

		font-size: 26rpx;
		color: #000000;
	}


	.textarea-field-gg {
		z-index: 6;
		transform: translate(0rpx, -380rpx) scale(1);
		border: 2rpx solid #886cdb;
		/* 边框颜色 */

		width: 100%;
		height: 120rpx;

		font-size: 26rpx;
		color: #000000;
	}

	.textarea-field-hh {
		z-index: 7;
		transform: translate(0rpx, -380rpx) scale(1);
		border: 2rpx solid #886cdb;
		/* 边框颜色 */

		width: 100%;
		height: 120rpx;

		font-size: 26rpx;
		color: #000000;
	}


	/*添加步骤按钮*/
	.addLine {
		z-index: 30;
		border: 1px solid #6c4ad1;
		border-radius: 40rpx;

    /* translate 请尽量使用百分比 */
	/* 	transform: translate(-100rpx, -330rpx) scale(1); */
	
		/* 新增：设置按钮边框为圆角 */
		width: 350rpx;
		height: 70rpx;
		color: rgb(255, 255, 255);
		/* 新增：设置按钮文字颜色为白色 */
		background-color: #5500ff;
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
		margin-top: 0rpx;
		margin-left: 10px;
		box-shadow: 0ch;

		box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
	}
</style>