<template>
	<view class="newtaskbox">
		<view style="width: 90%;">
			<cardinfo :task="task" :editable="false"></cardinfo>
			<view class="ql-container">
				<rich-text class="ql-editor" :nodes="html"></rich-text>
			</view>

			<view v-if="mode=='waitfor'">
				<button @click="del">删除</button>
			</view>

			<view v-if="mode=='undone'">
			</view>

			<view v-if="task.canTake==0&&task.main==1&&task.payed==0" class="pay-container">
				<view class="balance">金额：{{ balance }}</view>
				<button v-show="balance*100>0" @click="pay">支付</button>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		TaskStatus
	} from "../../common/customTypes.js"
	export default {
		data() {
			return {
				$enable: false,
				task: {
					"id": false,
					"username": false,
					"branchid": 1,
					"description": "任务描述",
					"finishtime": "0001-01-01T00:00:00",
					"deadline": "",
					"publishtime": "0001-01-01T00:00:00",
					"fixedReward": '',
					"percentReward": '',
					"rewardtype": 1,
					"status": 1,
					"title": "",
					"tag": "",
					"verify": 0,
				},
				mode: {
					type: String,
					default () {
						return "done"
					}
				},
				status: TaskStatus
			}
		},
		created() {
			this.task = this.$store.state.currentTask;
		},
		computed: {
			enable() {
				return this.$data.$enable;
			},
			html: {
				get() {
					return this.task.description
				}
			},
			balance() {
				return this.task.fixedReward / 100;
			}
		},
		onLoad(op) {
			console.log("options:", op)
			this.id = op.id;
			//来源自哪，重定向回原路
			this.refer = op.refer;

			let task = this.$store.getters.getTaskById(this.id);
			if (task !== undefined) {
				this.task = task;
				this.mode = this.status[this.task.status]
			} else {
				let qurl = this.$store.state.apiBaseUrl + "/api/Assignment/" + this.id;
				const ps = new Promise((resolve, reject) => {
					uni.requestWithCookie({
						url: qurl,
						success: (res) => {
							if (res.statusCode == 200) {
								resolve(res.data)

							}
						}
					})
				});
				ps.then((o) => {
					this.task = o;
					this.mode = this.status[o.status]
				})

			}
		},
		methods: {
			del(e) {
				let qurl = this.$store.state.apiBaseUrl + "/api/Assignment/delete/" + this.task.id;
				uni.requestWithCookie({
					url: qurl,
					method: "DELETE",
					success: (res) => {
						if (res.statusCode === 204) {
							uni.showToast({
								title: "删除成功。"
							});
							const pages = getCurrentPages();
							let prep = pages[pages.length - 2];
							prep.removeById(this.task.id);
							uni.navigateBack();
						}
						if (res.statusCode === 404) {
							uni.showModal({
								content: "无效的任务。"
							})
						}

						if (res.statusCode === 409) {
							uni.showModal({
								content: "任务已被他人接取,请等待任务完成或被放弃。"
							})
						}
					}
				})
			},

			pay(e) {
				let qurl = this.$store.state.apiBaseUrl + "/api/Bill/pubPayV3";
				let notify = this.$store.state.apiBaseUrl + "/api/wechatpay/v3/notify/transactions";
				let praypay;
				if (!(this.task && this.task.id)) {
					return
				}
				wx.login({
					success: (res) => {
						if (res.code) {
							uni.requestWithCookie({
								url: qurl,
								method: "POST",
								data: {
									OutTradeNo: "1",
									Description: "任务" + this.task.id + "的固定预支付费用",
									Total: this.balance * 100,
									JsCode: res.code,
									NotifyUrl: notify,
									Attach: "taskid=" + this.task.id
								},
								success: (result) => {
									if (result.statusCode === 200) {
										let praypay = result.data;
										console.log(praypay)
										uni.requestPayment({
											timeStamp: praypay.timeStamp,
											nonceStr: praypay.nonceStr,
											package: praypay.package,
											signType: 'RSA',
											paySign: praypay.paySign,
											success: (res) => {

												this.task.payed = 1;
												this.$store.commit(
													"updateLocalTaskById", this
													.task)
												uni.showModal({
													title: "支付成功",
													showCancel: false,
													success: (res) => {
														if (res.confirm) {
															// if(this.refer==="newtask"){
															// 	uni.reLaunch({
															// 		url: '/pages/addtask/addtask'
															// 	})
															// }
															uni.navigateTo({
																url: "/pages/pay-result/pay-result?taskid=" +
																	this
																	.task
																	.id
															})
														}
													}
												});
											},
											fail: (err) => {
												uni.showModal({
													title: "支付失败",
													showCancel: false,
													content: err.message
												})
											}
										})
									}

								},
								fail: (err) => {

								}
							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url('../taskDetail/taskDetail.css');

	.pay-container {
		display: flex;
		flex-direction: row;
		margin-top: 10px;
		justify-content: center;
		align-items: center;
	}

	.balance {
		margin-left: 30px;
	}
</style>