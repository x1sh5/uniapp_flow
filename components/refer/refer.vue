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
	
.textarea-field-aa {
		z-index: 9;
		transform: translate(0rpx, 0rpx) scale(1);
		border: 2rpx solid #886cdb;
		/* 边框颜色 */

		width: 100%;
		height: 60rpx;

		font-size: 26rpx;
		color: #000000;
	}
	/*添加步骤按钮*/
	.addLine {
		z-index: 30;
		border: 1px solid #6c4ad1;
		border-radius: 00rpx;

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
		margin-top: 50rpx;
		margin-left: -20px;
		box-shadow: 0ch;

		box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
	}
</style>