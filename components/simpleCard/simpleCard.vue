/**
* 任务申请组件
*/
<template>
	<view>
		<view class="simplecard">
			<view class="title" style="width: 75%;height: 40px;">{{ title }}</view>
			<view class="sc-comment" placeholder="留言...">{{ comment }}</view>
			<view class="proposer">申请人：</view>
			<view>
				<view class="name">{{ simpleInfo.userName }}</view>
				<button class="contact" @click="contact">👉沟通</button>
			</view>

			<view v-show="simpleInfo.agree === 2" style=" flex-direction: row;">
				<button class="agree" @click="agree">同意并设置交付期限</button>
				<button class="disagree" @click="disagree">拒绝</button>
			</view>
			<view class="reply" v-if="simpleInfo.agree === 0">
				已拒绝
			</view>
			<view class="reply" v-if="simpleInfo.agree === 1">
				已同意
			</view>
			<view v-if="deadline.isArchive">
				<view v-if="deadline.finish">任务已完成</view>
				<view v-else>任务失败</view>
			</view>
			<view v-else>
				<view  style="margin-top: 30rpx;" v-if="simpleInfo.agree === 1 && deadline">
					<uni-countdown class="t"  :day="deadline.days" :hour="deadline.hours" :minute="deadline.minutes"
						:second="deadline.seconds">
					</uni-countdown>
					<view>
						<button class="r" @click="complete">确认完成✔</button>
						<button class="w" @click="failure">未达到要求×</button>
					</view>
				</view>
			</view>

			<uni-datetime-picker style="width: 0px;height: 0px;" ref="calendar" type="datetime"
				@deadtime-change="deadtimeChange" v-model="deadtime">
				<view class="uni-input"></view>
			</uni-datetime-picker>


		</view>

	</view>
</template>

<script>
	export default {
		name: "simpleCard",
		data() {
			return {
				deadline: "0001-01-01T00:00:00",
				resetDeadline: false,
				newDeadtime: undefined
			};
		},
		props: {
			/**
			 * @type {object} simpleInfo
			 * @type {number} simpleInfo.id 
			 * @type {number} simpleInfo.agree 是否同意接取，2：未读，1：同意，0：不同意
			 * @type {number} simpleInfo.taskId 任务id
			 * @type {string} simpleInfo.userName 申请人姓名
			 * @type {string} simpleInfo.title 要申请的任务的标题
			 * @type {number} simpleInfo.userId 申请人ID
			 * @type {string} simpleInfo.comment 留言
			 * @type {string} simpleInfo.tag 任务类型
			 */
			simpleInfo: Object,
			showbutton: true
		},
		methods: {
			//重设截止日期
			agree(e) {

				this.$refs.calendar.show();

			},
			disagree(e) {
				let url = this.$store.state.apiBaseUrl + "/api/TaskRequest/disagree/" + this.simpleInfo.id;
				uni.requestWithCookie({
					url: url,
					method: "PUT",
					data: this.simpleInfo,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.showModal({
								showCancel: false,
								content: res.data
							});
							this.simpleInfo.agree = 0;
						} else {
							uni.showModal({
								showCancel: false,
								content: res.data.title
							});
						}


					},
					fail: (err) => {
						uni.showModal({
							content: err
						})
					}
				});
			},
			contact(e) {

				uni.navigateTo({
					url: "/pages/message/chat/chat?cid=" + this.simpleInfo.taskId +
						"&userName=" + this.simpleInfo.userName + "&userId=" + this.simpleInfo.userId,
				})
			},
			archiveyes(ensure) {
				uni.showModal({
					title: "进行‘确认’操作后, 任务将不再能修改。",
					editable: true,
					placeholderText: "输入‘确认’完成任务！",
					success: (res) => {
						if (res.confirm) {
							if (res.content == '确认') {
								uni.request({
									url: this.$store.state.apiBaseUrl + "/api/Assignment/archive/" +
										this.simpleInfo.taskId,
									data: {
										complete: ensure
									},
									method: "POST",
									success: (resl) => {
										if (resl.statusCode !== 200) {
											uni.showToast({
												title: "操作失败"
											})
										} else {
											uni.navigateTo({
												url: "/pages/taskresult/completed/completed"
											})
										}
									}
								});
							} else {
								uni.showToast({
									title: "内容无效。"
								})
							}
						}
					}
				})

			},
			archiveno(ensure) {
				uni.showModal({
					title: "进行‘确认’操作后, 任务将不再能修改。",
					editable: true,
					placeholderText: "输入‘未达标’完成操作！",
					success: (res) => {
						if (res.confirm) {
							if (res.content == '未达标') {
								uni.request({
									url: this.$store.state.apiBaseUrl + "/api/Assignment/archive/" +
										this.simpleInfo.taskId,
									data: {
										complete: ensure
									},
									method: "POST",
									success: (resl) => {
										if (resl.statusCode !== 200) {
											uni.showToast({
												title: "操作失败。"
											})
										} else {
											uni.navigateTo({
												url: "/pages/taskresult/failed/failed"
											})
										}
									}
								});
							} else {
								uni.showToast({
									title: "内容无效。"
								})
							}
						}
					}
				})

			},
			complete(e) {
				this.archiveyes('yes');

			},
			failure(e) {
				this.archiveno('no')

			},
			//接取任务
			deadtimeChange(e) {
				if (e == 'cancel') {
					this.resetDeadline = false;
					this.newDeadtime = this.oldDeadline
				}
				if (e == 'ensure') {
					this.resetDeadline = true;
					let url = this.$store.state.apiBaseUrl + "/api/Assignment/take/" + this.simpleInfo.id;
					uni.requestWithCookie({
						url: url,
						data: {
							deadline: this.deadtime
						},
						success: (res) => {
							if (res.statusCode === 200) {
								if (res.data.data.success) {
									uni.showModal({
										content: res.data.message
									});
									this.simpleInfo.agree = 1;
								} else {
									uni.showModal({
										content: res.data.data.reason
									})
								}
							} else {
								uni.showModal({
									content: "网络出错"
								})
							}

						},
						fail: (err) => {
							uni.showModal({
								content: err
							})
						}
					});
				}
			}
		},
		computed: {
			title() {
				if (this.simpleInfo && this.simpleInfo.title) {
					return this.simpleInfo.title;
				}
				return "标题出错";
			},
			type() {
				if (this.simpleInfo && this.simpleInfo.tag) {
					//return this.$store.getters.getTaskType(this.simpleInfo.typeId).name;
					return this.simpleInfo.tag
				}
				return "类型";
			},
			//留言
			comment() {
				if (this.simpleInfo && this.simpleInfo.comment) {
					return this.simpleInfo.comment;
				}
				return "";
			},
			deadtime: {
				get() {
					if (!this.newDeadtime) return this.oldDeadline;
					return this.newDeadtime;
				},
				set(value) {
					this.newDeadtime = value;
				}
			},
		},
		beforeMount() {

			if (this.simpleInfo.agree === 1) {
				//获取计时器相关信息
				uni.requestWithCookie({
					url: this.$store.state.apiBaseUrl + "/api/Assignment/deadline/" + this.simpleInfo.taskId,
					success: (res) => {
						if (res.statusCode === 200) {
							this.deadline = res.data;
							this.oldDeadline = res.data.OriDeadline.indexOf("T").substring(0, index);
						}
					}
				})
			}
		},

	}
</script>

<style>
	.simplecard {
		display: flex;
		flex-direction: column;
		height: 530rpx;
		margin-left: 50px;
		margin-bottom: 10px;
		background-color: #ffffff;
		border: 1px solid #6c4ad1;
	}

	.title {
		z-index: 3;
		display: flex;
		margin-left: 50rpx;
		margin-top: 30rpx;
		transform: translate(0rpx, 0rpx) scale(1);
		padding-left: 0px;
		/* 右缩进 */
		border: 0px solid #6c4ad1;
		font-weight: 900;

		color: #4723b3;
		font-size: 36rpx;
	}

	/* 申请人 */
	.proposer {
		z-index: 5;
		display: flex;
		margin-left: 50rpx;
		transform: translate(500rpx, 30rpx) scale(1);
		background-color: #ffffff;

		padding-left: 15px;
		border: 1px solid #6c4ad1;
		background-color: rgb(255, 255, 255);
		color: #4723b3;
		font-size: 10px;
	}


	.name {
		z-index: 10;
		display: flex;
		margin-left: 0rpx;
		transform: translate(480rpx, 50rpx) scale(1);
		margin-top: -30rpx;
		padding-left: 15px;
		/* 右缩进 */
		border: 1px solid #6c4ad1;
		background-color: rgb(255, 255, 255);
		color: #4723b3;
		font-size: 26px;
	}

	.sc-comment:empty::before {

		display: flex;
		content: attr(placeholder);

		background-color: #ffffff;
	}

	.sc-comment {
		z-index: 1;
		height: 100rpx;
		width: 700rpx;

		margin-top: 30rpx;
		margin-left: 50rpx;
		border: 1px solid black;

		display: flex;
		margin-left: 50rpx;
		transform: translate(0rpx, 0rpx) scale(1);
		padding-left: 15px;
		/* 右缩进 */
		border: 1px solid #6c4ad1;
		background-color: rgb(255, 255, 255);
		color: #4723b3;
		font-size: 10px;

	}

	/* 联系 */
	.contact {
		z-index: 10;

		display: flex;
		/* 使用Flex布局 */
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */

		transform: translate(0rpx, -60rpx) scale(1);

		border: 10px solid #6c4ad1;
		border-radius: 0rpx;
		/*设置按钮边框为圆角 */
		border: none;

		width: 700rpx;
		height: 150rpx;

		color: rgb(255, 255, 255);
		background-color: #4d1ae4;
		font-size: 60rpx;
		text-align: center;
		/* top: calc(150vh - 350rpx);
	   */


		margin-left: -120px;
		margin-top: 0rpx;
		box-shadow: 0ch;
		padding-left: 300rpx;
		box-shadow: 0px 5px 2px rgba(116, 116, 116, 0.5);
		background-image: -webkit-linear-gradient(0deg, #4d1ae4 0%, #886cdb 100%);
	}


	.agree {
		display: flex;
		/* 使用Flex布局 */
		z-index: 10;

		transform: translate(300rpx, 100rpx) scale(1);

		border: 1px solid #6c4ad1;
		border-radius: 670rpx;
		/* 新增：设置按钮边框为圆角 */

		width: 700rpx;
		height: 90rpx;

		color: rgb(255, 255, 255);
		background-color: #6c4ad1;
		/* 新增：设置按钮背景颜色为绿色 */
		/*text-align: center;
			 top: calc(150vh - 350rpx);
		     */
		margin-top: 00rpx;
		padding-left: -100rpx;
		margin-left: 00px;


		align-items: center;
		/* 垂直居中 */

		box-shadow: 0ch;

		box-shadow: 0px 5px 2px rgba(116, 116, 116, 0.5);
		background-image: -webkit-linear-gradient(0deg, #886cdb, #4d1ae4 100%);
	}

	.disagree {
		display: flex;

		align-items: center;
		/* 垂直居中 */
		z-index: 10;
		transform: translate(450rpx, 120rpx) scale(1);
		border: 1px solid #6c4ad1;
		border-radius: 60px;
		/* 新增：设置按钮边框为圆角 */

		width: 700rpx;
		height: 90rpx;

		margin-top: 0rpx;
		padding-left: -500rpx;
		margin-left: 00rpx;



		color: #6c4ad1;
		/* 新增：设置注册按钮文字颜色为绿色 */
		background-color: rgb(255, 255, 255);
		/* 新增：设置注册按钮背景颜色为白色 */
		box-shadow: 0px 5px 2px rgba(116, 116, 116, 0.5);
	}

	/* 回复 */
	.reply {
		z-index: 1;
		display: flex;
		margin-left: 0rpx;
		margin-top: 0rpx;
		transform: translate(480rpx, -90rpx) scale(1);
		background-color: #ffffff;

		padding-left: 15px;
		/* 右缩进 */
		border: 1px solid #6c4ad1;
		background-color: #6c4ad1;
		color: #ffffff;
		font-size: 10px;
	}
	
	.t {
		text-color: #ffffff;
		font-size: 14rpx;
	   
	}
	.r {
		z-index: 10;

		display: flex;
		/* 使用Flex布局 */
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */

		transform: translate(0rpx, 0rpx) scale(1);

		border: 10px solid #6c4ad1;
		border-radius: 0rpx;
		/*设置按钮边框为圆角 */
		border: none;

		width: 700rpx;
		height: 80rpx;

		color: rgb(255, 255, 255);
		background-color: #4d1ae4;
		font-size: 30rpx;
		text-align: center;
		/* top: calc(150vh - 350rpx);
	   */


		margin-left: -120px;
		margin-top: 0rpx;
		box-shadow: 0ch;
		padding-left: 400rpx;
		box-shadow: 0px 5px 2px rgba(116, 116, 116, 0.5);
		background-image: -webkit-linear-gradient(0deg, #4d1ae4 0%, #886cdb 100%);
	}
	
	.w {
		z-index: 10;	height: 70rpx; 	align-items: center;
		display: flex;
		margin-left: 0rpx;
		transform: translate(480rpx, -20rpx) scale(1);
		margin-top: -30rpx;
		padding-left: 15px;
		/* 右缩进 */
		border: 1rpx solid #6c4ad1;border-radius: 0px; 
		background-color: rgb(255, 255, 255);
		color: #4723b3;
		font-size: 14rpx;
	   
	}
	
</style>