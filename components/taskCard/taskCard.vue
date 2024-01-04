<template>
	<view class="newtaskbox" @check-Result="checkResult">
		<view>
			<cardinfo :task="task" :editable="editable" ref="cardinfo" :mode="mode" @check-Result="checkResult"
				@remove-task="removeTask"></cardinfo>
			<!--空白<view class="blank" style="width: 100%; height: 68rpx; border: 3px solid  #6c4ad1;  background-color: #ffffff; " ></view>-->
			<!--文字-->
			<view class="tasktype">任务说明</view>
			<!--分割线-->
			<view class="driver"
				style="position: relative; margin: 0 40rpx;height: 2rpx;width: 90%;background-color: #c6b8f1;margin-top: 10rpx;z-index: 2;">
			</view>
			<!--输入结果的显示区域-->
			<view class="ql-container" style="position: relative; margin: 0 40rpx;">
				<rich-text class="content" :nodes="html" style="word-break: keep-all; overflow-wrap: anywhere;"></rich-text>
			</view>
			
			<!--输入按钮-->
			<button v-if="editable" class="editbutton" @click="editEvent">+编辑制作说明...</button>
		</view>
		<view class="blank" style="width: 100%; height: 80rpx; border: 0px solid  #6c4ad1;  background-color: #ffffff; ">
		</view>
	</view>
</template>

<script>
import { StorageKeys } from "../../common/storageKeys.js";
export default {
	name: "taskCard",
	props: {
		task: {
			type: Object,
			default() {
				return {
					"id": false,
					"username": false,
					"branchid": 1,
					"description": "",
					"finishtime": "0001-01-01T00:00:00",
					"deadline": "",
					"fixedReward": '',
					"percentReward": '',
					"publishtime": "0001-01-01T00:00:00",
					"rewardtype": 1,
					"status": 1,
					"title": "",
					"tag": "",
					"verify": 0,
					"main": 0
				}
			}
		},
		editable: {
			type: Boolean,
			default() {
				return false
			}
		},
		mode: {
			type: String,
			default() {
				return 'done'
			}
		}
	},
	data() {
		return {
			content: {}
		}
	},
	computed: {
		html: {
			get() {
				if (this.content.html === void 0) {
					this.setContent(this.task.description)
					return this.task.description;
				}
				return this.content.html;
			},
			set(value) {
				this.content = value;
				this.task.description = value.html
			}
		},
	},
	onLoad(op) {

		this.$data.task.branchid = op.branchid
	},
	methods: {
		editEvent(e) {
			this.$store.commit("setEditContent", this.content);
			uni.navigateTo({
				url: "/pages/editor/editor?id=" + this.task.id
			})
		},
		setContent(value) {
			this.content.html = value
		},
		updateT(payload) {
			//{ctx:res, files: lastFiles}

			for (let file of payload.files) {
				let index = payload.ctx.delta.ops.indexOf(x => x.attributes && x.attributes["data-local"] === file.path)
				uni.uploadFileWithCookie({
					url: this.$store.state.apiBaseUrl + "/api/Image/upload",
					filePath: file.path,
					name: file.name,
					success: (res) => {
						let data = JSON.parse(res.data)
						if (('' + res.statusCode).startsWith('2')) {
							let search = "<img src=\"" + file.path + "\" data-local=\"" + file.path + "\" alt=\"图像\">";
							let replace = "<img src=\"" + this.$store.state.apiBaseUrl + "/flow/static/" + data.$values[0].url + "\">"

							let newHtml = payload.ctx.html.replace(search, replace)
							this.$refs.cardinfo.updateDes(newHtml)
						}
					}
				});
			}
			this.content = payload.ctx;

		},
		check() {
			return this.$refs.cardinfo.check();
		},
		checkResult(data) {
			this.$emit("check-Result", data);
		},
		put() {
			return this.$refs.cardinfo.put();
		},
		//task发布成功成功后
		afterPublish(e) {
			this.$emit('after-publish', e)
		},
		removeTask(e) {
			this.$emit('remove-task', e)
		}
	}
}
</script>

<style lang="less">
@import url('./newTask.css');
</style>
