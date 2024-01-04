<template>
	<!-- 	<view> -->
	<!-- 任务卡片 -->
	<!--<view class="container" style="position:relative;margin: 0 10rpx;" ></view>-->
	<!-- 任务卡片 -->
	<view @click.stop="detail">
		<view :class="`task${branchid}`">
			<!-- 编号 标题 -->
			<!-- 第一行，第一列起横跨2列 -->
			<view class="r12c13">
				<view class="columnlayout" style="position:relative;margin: 0 8rpx;">
					<!-- 第一层：需求内容 编号 -->
					<view class="rowlayout">
						<view :class="`bid${branchid} poster`">需求内容</view>
						<!-- 序列号 -->
						<view class="serialNo">k{{branchid}}{{Id}}</view>
					</view>
					<!-- 第二层：标题 -->
					<view class="title">
						<textarea :disabled="titleditable" class="brief" :value="title" placeholder="一句话简述任务内容"
							@blur="updateBrief">
						</textarea>
					</view>
				</view>
			</view>

			<!-- 预计工时 第二行第一列 -->
			<view class="presumedtime">
				<view :class="`bid${branchid}` " style="position:relative;margin: 0 8rpx;">预计工时</view>
				<view class="rowlayout-y" style="position:relative;margin: 0 8rpx;">
					<!-- 				  <input maxlength="20" :disabled="!editable" type="text" 
				  :value="deadline" class="input" @blur="updatePt"/>h -->
					<uni-datetime-picker :disabled="!editable" type="datetime" v-model="deadline" @change="biupdatePt">
						<view class="uni-input">{{deadline}}</view>
					</uni-datetime-picker>
					<!-- <picker class="input" mode="date" :value="deadline" @change="biupdatePt">
								<view class="uni-input">{{deadline}}</view>
							</picker> -->

				</view>

			</view>

			<!-- 回馈值 第二行第二列style="z-index: 2;width: auto;min-width: 10px;margin-left: 5rpx;margin-bottom: 5rpx;" -->
			<view class="rewardbox">
				<view :class="`bid${branchid}`">回馈值</view>
				<view class="rowlayout-h">
					<input maxlength="6" :disabled="rewardEditable" type="digit" class="reward" v-model="reward" />
					<!-- @blur="updateReward" -->
					<view style="min-width: 1em;margin-bottom: auto;margin-top: auto;">{{ rewardSymbol }}</view>
					<uni-data-select class="s" :disabled="task.main===1" :localdata="rewardtypeSymbol.options"
						:clear="false" :modelValue="rewardtype" placeholder="类型" @change="rewardTypeChange"
						v-if="editable">

					</uni-data-select>
				</view>
			</view>


			<!-- 右半部分，只包括：类型概括 -->
			<view class="bigtype" style="position:relative;margin: 0 8rpx;">
				<view v-if="editable" class="popupbutton" @click="showPopup">...</view>
				<!-- <view class="tasktype columnlayout">{{ taskType["name"] }}</view> -->
				<input maxlength="2" :disabled="!editable" type="text" class="tasktype columnlayout"
					v-model="task.tag" placeholder="主题">
			</view>

			<!-- 部门 -->
			<!-- range-key 用于指定显示名称属性值 -->
			<!-- 			<picker mode="selector" :disabled="!editable" :range="branchs" range-key="name" 
			:value="branchOrder" :class="`fontcolor${Id%3}`" @change="branchChange" class="department">
			{{ depart?depart["name"]:'' }}</picker> -->

			<view :class="`bid${branchid}`" class="department">{{ branch }}卡</view>

			<!-- 发起人 -->
			<view class="organigerpart" :style="editable?'display:none':'display:flex;flex-direction: column;'">
				<view>{{userName}}</view>
				<view :class="`bid${branchid}`">发起人</view>
			</view>
			<!-- 状态 -->
			<view class="status" :style="editable?'display:none':'display:flex'">
				<view class="statuscontent">{{status[task.status]}}</view>
			</view>


			<view v-if="vis" class="popup" @click="exitDel">
				<button class="delbtn" @click="removeTask">删除</button>
			</view>

		</view>
		<view class="blank" style="width: 730rpx; height: 18rpx;   background-color: #ffffff; "></view>

	</view>

	<!-- 	</view> -->
</template>

<script>
	import {
		RewardType
	} from '../../common/Task'
	export default {
		name: "cardinfo",
		props: {
			taskIndex: Number, //task 在数组中的索引
			task: Object,
			//颜色代码
			colorid: Number,
			//可编辑组件（input,textarea等）是否能编辑，默认不能编辑
			editable: Boolean,
			//模式：单卡："single",多卡："mutiple"
			mode: String,
		},
		created() {

		},
		computed: {
			Id() {
				return this.task.id
			},
			userName: {
				get() {
					return this.task.username
				},
				set(value) {
					this.task.username = value
				}
			},
			taskType: { //类型概括
				get() {
					//return this.$store.getters.getTaskType(this.task.tag)
					return this.task.tag
				}
			},
			reward: {
				get() {
					if (this.task.rewardtype === RewardType.Fiexd) {
						if (this.task.fixedReward && this.task.fixedReward !== 0) {
							return this.task.fixedReward / 100
						} else {
							return ''
						}

					} else {
						if (this.task.percentReward && this.task.percentReward !== 0) {
							return this.task.percentReward / 100
						} else {
							return ''
						}
					}
					return '';
				},
				set(value) {
					if (this.task.rewardtype === RewardType.Fiexd) {
						this.task.fixedReward = !isNaN(parseFloat(value)) ? parseInt(parseFloat(value) * 100) : 0;
					}
					if (this.task.rewardtype === RewardType.Percent) {
						this.task.percentReward = !isNaN(parseFloat(value)) ? parseInt(parseFloat(value) * 100) : 0;
					}
				}
			},
			rewardtype: {
				get() {
					return this.task.rewardtype
				},
				set(value) {
					this.task.rewardtype = parseInt(value)
				}
			},
			rewardSymbol() {
				if (this.task.rewardtype === RewardType.Fiexd) {
					return '￥'
				}
				if (this.task.rewardtype === RewardType.Percent) {
					return '%'
				}
				return ''
			},
			rewardEditable() {
				return !this.editable || (this.task.main === 1 && this.rewardtype === 2)
			},
			branch: {
				get() {
					return this.$store.getters.getBranch(this.task.branchid)
				},
			},
			branchid() {
				return this.task.branchid
			},
			depart() {
				let d;
				try {
					d = this.branchs[this.branchOrder];
				} catch (e) {
					//TODO handle the exception
					d = "??";
				}

				return d
			},
			branchOrder: {
				get() {
					if (!this.branchIndex) {
						return this.$store.getters.getBranchIndex(this.task.branchid)
					}
					return this.branchIndex
				},
				set(value) {
					this.branchIndex = value
				}
			},
			branchs() {
				//console.log(this.$store.state.branchs)
				return this.$store.state.branchs
			},
			nullTask() {
				if (this.task === null || this.task === undefined) {
					return true
				}
				return false
			},
			deadline: {
				get() {
					try {
						let index = this.task.deadline.indexOf("T");
						if (index !== -1) {
							return this.task.deadline.substring(0, index);
						}

					} catch (e) {
						//TODO handle the exception
					}
					return this.task.deadline;
				},
				set(value) {
					this.task.deadline = value;
				}
			},
			title: {
				get() {
					return this.task.title
				},
				set(value) {
					this.task.title = value
				}
			},
			titleditable() {
				return !this.editable
			},
			rewardtypeSymbol() {
				return {
					text: '%',
					options: [{
							text: '￥',
							value: '1',
							name: "固定",
							selected: true,
							disable: this.taskType && this.taskType.rewardType === "only percent"
						},
						{
							text: '%',
							value: '2',
							name: "百分比",
							disable: this.taskType && this.taskType.rewardType === "only fixed"
						},
					]
				}
			}
		},
		methods: {
			branchChange(e) {

				let branchIndex = e.detail.value;
				this.branchIndex = branchIndex;
				this.task.branchid = branchIndex;
				// let d = this.branchs[this.branchOrder];
				// if(d.rewardType==="only percent"){
				// 	this.task.rewardtype = 2
				// }
				// if(d.rewardType==="only fixed"){
				// 	this.task.rewardtype = 1
				// }
			},
			rewardTypeChange(e) {

				this.task.rewardtype = parseInt(e.value);
				let pages = getCurrentPages();
				let current = pages[pages.length - 1]
				if (current.mode && current.mode == "single") {
					this.task.percentReward = 10000;
					this.task.fixedReward = 0;
				} else {
					this.task.percentReward = '';
				}

			},
			detail(e) {
				if (!this.editable) {
					if (!this.$store.state.$hasLogin) {
						uni.navigateTo({
							url: "/pages/logintips/logintips"
						})
					} else {
						const pages = getCurrentPages();
						let current = pages[pages.length - 1];
						if (current.route.split("/").at(-1) !== 'taskDetail' && current.route.split("/").at(-1) !==
							'myTaskDetail') {
							this.$store.commit('setCurrentTask', this.task);
							this.$store.dispatch('genHistory', this.task.id);
							uni.navigateTo({
								url: "/pages/taskDetail/taskDetail?id=" + this.task.id,

							})
						}

					}
				}
			},
			// updateReward(event){
			// 	if(this.task.rewardtype === RewardType.Fiexd){
			// 		this.task.fixedReward = event.detail.value ;
			// 	}else if(this.task.rewardtype === RewardType.Percent){
			// 		this.task.percentReward = event.detail.value;
			// 	}

			// },
			updateBrief(event) {
				this.task.title = event.detail.value;
			},
			//更新预计时间
			updatePt(event) {
				this.task.deadline = event.detail.value;
			},
			//更新描述
			updateDes(data) {
				this.task.description = data;
			},
			biupdatePt(e) {

				this.task.deadline = e
			},
			check() {

				if (!this.task.title) {
					this.$emit("check-Result", false);
					uni.showModal({
						content: "标题不能为空！"
					});

					return;
				}
				if (!this.task.tag) {
					this.$emit("check-Result", false);
					uni.showModal({
						content: "类型概括不能为空！"
					});

					return;
				}
				if (this.task.rewardtype === RewardType.Fiexd && !this.task.fixedReward) {
					this.$emit("check-Result", false);
					uni.showModal({
						content: "回馈值不能为空！"
					});

					return;
				}
				if (this.task.rewardtype === RewardType.Percent && !this.task.percentReward) {
					this.$emit("check-Result", false);
					uni.showModal({
						content: "回馈值不能为空！"
					});

					return;
				}
				if (!this.task.deadline) {
					this.$emit("check-Result", false);
					uni.showModal({
						content: "截止日期不能为空！"
					});

					return;
				}

				this.$emit("check-Result", true);
				return;
				// this.$store.commit("updatePublishResults", 
				// 	{data: {success:true, message:"任务："+this.task.title+"发布成功", errMsg:"ok"}, func: Array.prototype.push} )
				//发布任务

			},
			put() {

				if (!this.task.title) {
					uni.showModal({
						content: "标题不能为空！"
					});
					return false;
				}
				if (this.task.rewardtype === RewardType.Fiexd && !this.task.fixedReward) {
					uni.showModal({
						content: "回馈值不能为空！"
					});
					return false;
				}
				if (this.task.rewardtype === RewardType.Percent && !this.task.percentReward) {
					uni.showModal({
						content: "回馈值不能为空！"
					});
					return false;
				}
				if (!this.task.deadline) {
					uni.showModal({
						content: "截止日期不能为空！"
					});
					return false;
				}

				// this.$store.commit("updatePublishResults", 
				// 	{data: {success:true, message:"任务："+this.task.title+"发布成功", errMsg:"ok"}, func: Array.prototype.push} )
				// 发布任务

				let posturl = this.$store.state.apiBaseUrl + "/api/Assignment/" + this.task.id
				uni.requestWithCookie({
					url: posturl,
					method: "PUT",
					data: this.task,
					success: (res) => {
						if (res.statusCode === 204) {
							this.$store.state.$publishResults.push({
								success: true,
								message: "任务：" + this.task.title + "修改成功",
								errMsg: "ok"
							});
							this.$emit('after-publish', this.task.id)
						} else {
							this.$store.state.$publishResults.push({
								success: false,
								message: "任务：" + this.task.title + "修改失败",
								errMsg: "server error"
							})
						}
					},
					fail: (err) => {
						console.error(err);
						this.$store.state.$publishResults.push({
							success: false,
							message: "任务：" + this.task.title + "修改失败",
							errMsg: "client error"
						})
					}
				});
			},
			removeTask(e) {

				if (this.task.main === 1) {
					uni.showModal({
						title: "错误！",
						showCancel: false,
						content: "主任务不能被移除。只能返回后重新创建新任务。"
					});
					return;
				}
				this.$emit('remove-task', this.task.id)
			},
			showPopup(e) {

				//this.vis = 'visible';
				this.vis = true
			},
			exitDel(e) {

				//this.vis = 'hidden';
				this.vis = false
			}

		},
		data() {
			return {
				// 预计时间
				//spendtime:"",
				//tasktype:"类型",
				vis: false,
				status: ["待接", "待完成", "完成", "公示"],
				branchIndex: false,

			};
		}
	}
</script>

<style lang="less">
	@import url('../../common/common.less');

	.size(@width, @height) {
		width: @width;
		height: @height;
	}

	.popupbutton {

		display: block;
		position: absolute;
		width: 40px;
		height: 40px;
		line-height: 24px;
		right: 5px;
		top: 10px;
		margin: 0px auto;
		font-size: 20px;
		word-wrap: break-word;
		writing-mode: vertical-lr;
		color: red;
		z-index: 99;
	}

	.popup {
		display: block;
		position: absolute;
		// width: 100%;
		// height: 100%;
		// top: 0;
		// left: 0;
		// background-color: #4b4444;
		// opacity: 70%;
		// border: 1px solid #ccc;
		// padding: 10px;
		// box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		position: absolute;
		z-index: 9;
		top: 0;
		left: 0;
		padding: 10px;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		color: #fff;
		opacity: 1;
		//visibility:visible; 
		-webkit-transition: all 0.5s ease;
		-ms-transition: all 0.5s ease;
		-o-transition: all 0.5s ease;
		transition: all 0.5s ease;
	}

	.delbtn {
		display: block;
		position: absolute;
		left: 40%;
		top: 40%;
		background-color: #ff0000;
		/*设置背景颜色 */
	}

	.example1 {
		.size(200px, 300px);
	}

	.colorset(@color) {
		color: @color;
	}

	//
	.fontcolor0 {
		.colorset(rgb(30, 30, 245));
	}

	.bid1 {
		//”审核“
		color: #3734c1;
		
	}

	.bid2 {
		//”制作“ #509cf5
		color: #046ef1;
	}

	.bid3 {
		// ”信息“ #54cfa5
		color: #31c695;
		
	}

	.bid4 {
		//”技术“ #42c9dd
		color: #1ebdd7;
	}

	.bid5 {
		//”资金“ #d169cd
		color: #c5308b;
		
	}

	.bid6 {
		//”分发“ #e0ba46
		color: #f3af00;
	}

	.bid7 {
		//”建设“ #5656cb
		color: #000000;
		
	}

	.task() {
		display: block;
		position: absolute;
		z-index: 2;
		display: grid;
		grid-template-rows: 1.5fr 4fr 0.5fr 0.5fr 3fr;
		grid-template-columns: 0.8fr 0.3fr 0.8fr 1fr;
		position: relative;


		width: 730rpx;
		height: 365rpx;
		border-radius: 10rpx;


		background-color: #ffffff;
		/*设置背景颜色 */
		box-shadow: 5rpx 16rpx 20rpx rgba(161, 161, 161, 0.5);
	}

	.taskbefore() {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		content: "";
		position: absolute;
		height: inherit;
		-webkit-clip-path: circle(75% at 100% 0%);
		clip-path: circle(75% at 100% 0%);

		z-index: -1;
	}



	.r12c13 {
		display: block;
		position: absolute;
		z-index: 1;
		grid-row-start: 1;
		grid-row-end: 5;
		grid-column-start: 1;
		grid-column-end: 5;

		height: 165rpx;

	}





	.task1,
	.task2,
	.task3,
	.task4,
	.task5,
	.task6,
	.task7 {
		.task();

	}

	.task1:before {
		//审核
		.taskbefore();
		background-image: -webkit-linear-gradient(-90deg, #5654ca 0%, #6a77d1 100%);
		
	}

	.task2:before {
		//制作
		.taskbefore();
		background-image: -webkit-linear-gradient(-90deg, #2d87f3 0%, #42a7f4 100%);
	}

	.task3:before {
		//信息
		.taskbefore();
		background-image: -webkit-linear-gradient(-90deg, #53cfa5 0%, #62d3a0 100%);
		
	}

	.task4:before {
		//技术
		.taskbefore();
		background-image: -webkit-linear-gradient(-90deg, #42c8dd 0%, #58e1e0 100%);
	}

	.task5:before {
		//资金
		.taskbefore();
		background-image: -webkit-linear-gradient(-90deg, #d457a4 0%, #d96bbc 100%);
		
	}

	.task6:before {
		//分发
		.taskbefore();
		background-image: -webkit-linear-gradient(-90deg, #e0bb45 0%, #f6ae3b 100%);
	}

	.task7:before {
		//建设
		.taskbefore();
		
		background-image: -webkit-linear-gradient(-90deg, #000000 0%, #242121 100%);
	
	}

	.tasktype {
		display: block;
		position: absolute;
		bottom: 0px;
		right: 0px;
		font-size: 2cm;
		font-style: italic;
		color: #ff0000;
		//position:fixed;
		// align-self: flex-end;
		// align-content: flex-end;
	}

	.title {
		.blackcolor();
		.margin-top5();

		z-index: 3;
		height: 62%;
		width: 80%;

	}

	/**/
	/*编号*/
	.serialNo {
		z-index: 1;
		display: flex;
		position: absolute;
		/* display: flex;
	  position: absolute;
	  flex-direction: column;
	  align-self: flex-end;
	  
	  */
		margin-left: 80px;
		font-size: x-small;

	}

	/*需求内容 */
	.poster {
		display: block;
		position: absolute;
		//.italic();
		margin-right: 0rpx;
		height: 40rpx;
		width: 160rpx;

	}

	/*一句话*/
	.brief {
		display: block;
		position: absolute;
		z-index: 3;
		color: rgb(129, 129, 129);
		margin-top: 40rpx;
		height: 130rpx;
		width: 400rpx;
		white-space: pre-wrap;
		grid-row-start: 2;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 1;

	}


	.margin-top5 {
		display: block;
		position: absolute;
		margin-top: 6rpx;

	}

	//预计用时量
	.spendtime {
		display: block;
		position: absolute;
		width: 20%;
		margin-right: 10rpx;

	}

	/*预计工时   margin-bottom: 15rpx;*/
	.presumedtime {
		display: block;
		position: absolute;
		z-index: 30;
		grid-row-start: 3;
		grid-row-end: 3;
		grid-column-start: 1;
		grid-column-end: 1;
		margin-top: -40rpx;
		margin-bottom: 0rpx;

	}


	.rowlayout-y {
		display: block;
		position: absolute;
		z-index: 2;
		grid-row-start: 1;
		grid-row-end: 1;
		grid-column-start: 1;
		grid-column-end: 1;
		font-size: 20rpx;

		height: 40rpx;
		width: 160rpx;

	}

	/*回馈值*/
	.rewardbox {
		display: block;
		position: absolute;
		z-index: 1;
		grid-row-start: 3;
		grid-row-end: 3;
		grid-column-start: 2;
		grid-column-end: 2;
		margin-left: -10px;
		margin-top: -40rpx;
		width: 130rpx;

		/*	margin-bottom: 0rpx;*/
	}

	.rowlayout-h {
		display: block;
		position: absolute;
		z-index: 2;
		grid-row-start: 4;
		grid-row-end: 4;
		grid-column-start: 1;
		grid-column-end: 1;

		margin-left: 70rpx;
		font-size: 24rpx;
		height: 40rpx;
		width: 130rpx;

	}

	/*回馈值选择框*/
	.reward {
		display: block;
		position: absolute;
		z-index: 2;
		border-bottom: 1px dashed gray;
		flex-basis: 20rpx;
		text-align: center;

		margin-left: -40px;
		font-size: 20rpx;
		grid-row-start: 3;
		grid-row-end: 3;
		grid-column-start: 3;
		grid-column-end: 3;
		height: 40rpx;
		width: 60rpx;


	}

	/*回馈值选择框*/
	.s {
		display: block;
		position: absolute;
		z-index: 2;
		border-bottom: 1px dashed gray;
		flex-basis: 20rpx;
		text-align: center;

		margin-top: 30rpx;
		margin-left: -50rpx;
		font-size: 20rpx;
		grid-row-start: 3;
		grid-row-end: 3;
		grid-column-start: 3;
		grid-column-end: 3;
		height: 40rpx;
		width: 60rpx;

		background-color: #2d87f3;
	}

	/*大标题*/
	.bigtype {
		display: block;
		position: absolute;
		z-index: 2;
		grid-row-start: 1;
		grid-row-end: 4;
		grid-column-start: 3;
		grid-column-end: 5;
		margin-left: 70rpx;



	}

	/* /*卡片类型文字样式*/
	.tasktype {
		display: block;
		position: absolute;
		z-index: 3;
		bottom: 1rpx;
		right: 1rpx;
		font-size: 170rpx;
		font-style: italic;
		color: rgb(255, 255, 255);
		margin-left: 60rpx;


	}

	.margin-right10 {
		display: block;
		position: absolute;
		margin-right: 1px;



	}


	/*卡片类型*/
	.department {
		.margin-right10();
		display: block;
		position: absolute;
		position: relative;
		margin: 0 8rpx;
		z-index: 1;
		font-size: 74rpx;
		height: 100rpx;
		width: 230rpx;
		grid-row-start: 5;
		grid-row-end: 5;
		grid-column-start: 1;
		grid-column-end: 1;

	}

	/*发起人*/
	.organigerpart {
		display: block;
		position: absolute;
		z-index: 3;
		padding-bottom: 0rpx;
		grid-row-start: 5;
		grid-row-end: 5;
		grid-column-start: 2;
		grid-column-end: 4;

		margin-left: 10px;
		height: 40rpx;
		width: 80rpx;
		margin-top: 30rpx;
		font-size: 18rpx;

	}

	//status 和 statuscontent 都必须使用flex布局才能使align-items: center;生效

	/*圈*/
	.status {
		display: flex;
		position: absolute;
		z-index: 2;
		.margin-right10();
		padding-bottom: 10rpx;
		grid-row: 4/ 5;
		grid-column: 1/ 5;
		margin-right: 0px;

		height: 90rpx;
		width: 90rpx;

		grid-row-start: 5;
		grid-row-end: 5;
		grid-column-start: 4;
		grid-column-end: 4;

	}

	/*圈样式*/
	.statuscontent {
		display: flex;
		position: absolute;
		z-index: 1;
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */

		opacity: 0.6;
		/* 默认完全不透明 */
		transition: opacity 1s;
		/* 添加过渡效果 */

		margin-left: 0rpx;
		height: 80rpx;
		width: 80rpx;
		margin-top: -10rpx;

		font-size: 24rpx;
		border: 6rpx solid #f15b04;
		border-radius: 50%;
		color: white;
		align-items: center;
		text-align: center;

	}

	/*.timeandreward{
	  .rowlayout();
	  .margin-top5();
	} */

	.input {
		display: block;
		position: absolute;
		z-index: 2;
		width: 100%;
		text-align: center;
		border-bottom: 1px dashed gray;
		margin-top: 1px;
	}

	.uni-textarea-compute {
		display: block;
		position: absolute;
		visibility: visible;
	}
</style>

