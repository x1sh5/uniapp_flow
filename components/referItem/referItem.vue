<!-- 分配模板中的单条记录 -->
<template>
	<view style="position: relative; margin: 0 40rpx;">
		<!-- 区间添加模块 ，其中包括标题，和对应的输入框。输入框可根据输入内容调整大小。-->
		<view class="table-cell" style="position: relative; margin: 0 40rpx;">
			<view class="table-cell">
				<view class="stitle">区间分配项</view>
				<textarea :disabled="!editable" :value="item.stitle" @blur="stitleChange" rows="3" inputmode="text"
					auto-height class="textarea-field-ee" placeholder="*填写为达成总目标而拆解出的单个任务名称"
					maxlength="1000"></textarea>
			</view>
			<view class="table-cell">
				<view class="rate">分配比例区间</view>
				<view  style="display: flex;flex-direction: row;">
					<input v-model="min" class="refer-input" type="digit"/>%-<input v-model="max" class="refer-input" type="digit"/>%
				</view>
				<!-- <textarea :disabled="!editable" :value="rate" @blur="rateChange" rows="3" inputmode="text"
					auto-height class="textarea-field-ff" placeholder="*次任务占总预估劳动量的百分比范围例如:1%-10%"
					maxlength="1000"></textarea> -->
			</view>
			<view class="table-cell">
				<view class="brief">设立来源</view>
				<textarea :disabled="!editable" :value="item.brief" @blur="briefChange" rows="3" inputmode="text"
					auto-height class="textarea-field-gg" placeholder="*阐明在现实需求中的设立来源" maxlength="1000"></textarea>
			</view>
			<view class="table-cell">
				<view class="detail">分配理由</view>
				<textarea :disabled="!editable" :value="item.detail" @blur="detailChange" rows="3" inputmode="text"
					auto-height class="textarea-field-hh" placeholder="*给出这样分配报酬比例的理由(工作量角度)"
					maxlength="1000"></textarea>
			</view>

			<!-- 一段空白位置，起一个间隔作用 -->
			<view class="blank" style="width: 730rpx; height: 78rpx;   background-color: #ffffff; "></view>
			<!-- 添加删除 -->
			<view v-show="editable">
				<button class="deLine" @click="delLine">x</button>
			</view>
		</view>


	</view>
</template>

<script>
	/**
	 * @property {Number} id 行号
	 * @property {Object} item 单条分配情况
	 * @property {String} item.stitle 行标题
	 * @property {String} item.rate 分配比例区间
	 * @property {String} item.brief 设立来源
	 * @property {String} item.detail 分配理由
	 * @property {String} item.remark 备注
	 */
	export default {
		name: "referItem",
		data() {
			return {

				
			};
		},
		props: {
			item:Object,
			id: Number,
			// stitle: {
			// 	type: String,
			// 	default: ""
			// },
			// rate: {
			// 	type: String,
			// 	default: ""
			// },
			// brief: {
			// 	type: String,
			// 	default: ""
			// },
			// detail: {
			// 	type: String,
			// 	default: ""
			// },
			// remark: {
			// 	type: String,
			// 	default: ""
			// },
			//是否能编辑
			editable: {
				type: Boolean,
				default () {
					return false;
				}
			}
		},
		computed:{
			min:{
				get(){
					let mm = this.item.rate.split("-");
					if(mm.length==2){
						return mm[0]
					}
					return ""
				},
				set(value){
					this.item.rate = `${value}-${this.max}`
				}
			},
			max:{
				get(){
					let mm = this.item.rate.split("-");
					if(mm.length==2){
						return mm[1]
					}
					return ""
				},
				set(value){
					
					this.item.rate = `${this.min}-${value}`
				}
			}
		},
		methods: {
			delLine(e) {
				this.$emit("del-Line", this.id)
			},
			stitleChange(e) {
				//let x = this.$refs['stitle'+e];
				this.item.stitle = e.detail.value
			},
			rateChange(e) {
				this.item.rate = e.detail.value
			},
			briefChange(e) {
				this.item.brief = e.detail.value
			},
			detailChange(e) {
				this.item.detail = e.detail.value
			},
			remarkChange(e) {
				this.item.remark = e.detail.value
			}
		}

	}
</script>

<style>
	.table-cell {
		display: flex;
		flex-direction: column;
	}
	
	.stitle {
	
		z-index: 4;
		display: table-cell;
		padding: 0rpx;
		/* 内边距 */
		transform: translate(0rpx, -380rpx) scale(1);
	
		width: 100%;
		height: 70rpx;
	
		display: flex;
		/*变为弹性容器 */
		align-items: center;
		/*垂直居中对齐 */
	
		text-decoration: none;
		padding-left: 8rpx;
		/* 右缩进 */
		font-size: 36rpx;
		/* 尺寸 */
		letter-spacing: 6rpx;
		/* 字母之间的间距 */
		line-height: 00rpx;
		/* 文本上下位置 */
	
		color: #ffffff;
		/* 字体颜色 */
		margin: rpx 0;
		/* 上下位置 */
	
		background-image: -webkit-linear-gradient(0deg, #4d1ae4 0%, #886cdb 100%);
	}
	
	.rate {
		z-index: 5;
		transform: translate(0rpx, -360rpx) scale(1);
		background-color: #ffffff;
		/*设置背景颜色 */
	
		width: 30%;
		height: 80rpx;
	
		font-size: 26rpx;
	
		display: flex;
		/*变为弹性容器 */
		align-items: center;
		/*垂直居中对齐 */
		color: #4a1cd3;
	}
	
	.brief {
		z-index: 6;
		transform: translate(0rpx, -360rpx) scale(1);
		background-color: #ffffff;
		/*设置背景颜色 */
	
		width: 30%;
		height: 80rpx;
	
		font-size: 26rpx;
	
		display: flex;
		/*变为弹性容器 */
		align-items: center;
		/*垂直居中对齐 */
		color: #4a1cd3;
	}
	
	.detail {
		z-index: 7;
		transform: translate(0rpx, -360rpx) scale(1);
		background-color: #ffffff;
		/*设置背景颜色 */
	
		width: 30%;
		height: 80rpx;
	
		font-size: 26rpx;
	
		display: flex;
		/*变为弹性容器 */
		align-items: center;
		/*垂直居中对齐 */
		color: #4a1cd3;
	}
	
	.deLine {
		z-index: 20;
		display: flex;
		/* 使用Flex布局 */
	
		//transform: translate(400rpx, -420rpx) scale(1);
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		border-radius: 60rpx;
		/* 新增：设置按钮边框为圆角 */
		width: 250rpx;
		height: 30rpx;
		color: #6c4ad1;
		border: 1px solid #6c4ad1;
	
		/* top: calc(150vh - 350rpx);
	 
			margin-top: 0rpx;
			margin-left: 300px;
			
			/*设置背景颜色 */
		font-size: 34rpx;
		box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
	
	}
	
	.th>textarea {
		height: 30px;
	}
	
	.refer-input{
		border: 1rpx solid #6c4ad1;
		width: 80rpx;
		height: 40rpx;
	}
	
	.td {
	
		height: auto;
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
</style>