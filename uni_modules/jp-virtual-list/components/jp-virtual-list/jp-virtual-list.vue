<template>
	<view ref="listtop" id="listtop">
		<scroll-view :scroll-top="scrollTop" :scroll-y="scrollY" class="scroll-view scroll-Y" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll" :scroll-into-view="scrollView" :lower-threshold="30"
			id="scroll-view">
			<view class="scrolls">
				<view v-if="refresherm && JzscrollTop>10">
					<view v-if="triggeredType==0" :class="direction=='bottom'?'refreshermB':'refresherm'"
						:style="'height:' + JzscrollTop + 'px'">{{direction=='bottom'?'下拉刷新':'上拉刷新'}}</view>
					<view v-if="triggeredType==1" :class="direction=='bottom'?'refreshermB':'refresherm'"
						:style="'height:' + JzscrollTop + 'px'">松开刷新</view>
					<view v-if="triggeredType==2" :class="direction=='bottom'?'refreshermB':'refresherm'"
						:style="'height:' + JzscrollTop + 'px'">
						<loading></loading>
					</view>
					<view v-if="triggeredType==3" :class="direction=='bottom'?'refreshermB':'refresherm'"
						:style="'height:' + JzscrollTop + 'px'">刷新成功</view>
				</view>
				<view ref="listx" id="listx" @touchstart="touchstart3" @touchmove="touchmove3" @touchend="touchend3">
					<view class="ball" v-if="direction=='bottom'" :style="'height:' + heights + 'px'"></view>
					<view v-if="list2 && list2.length > 0" ref="listItem" id="listItem">
						<slot :list="list2"></slot>
					</view>
					<view class="ball" v-if="direction=='top'" :style="'height:' + heights + 'px'"></view>
				</view>
			</view>
		</scroll-view>
		<div class="_backtop" v-if="isBackTop && direction=='bottom'" @click.stop="toTop">
			<view v-if="old.scrollTop > 100">
				<transition name="fade" appear>
					<div class="top">
						<image src="./top.png"></image>
					</div>
				</transition>
			</view>
		</div>
	</view>
</template>
<!-- 
现有问题如下:
 1、因为小程序局限问题，移动到端指定元素无法使用组件的形式，且小程序需要定义滚动组件的高度，所以建议小程序复制代码后操作
 2、当用户疯狂滑动页面，可能会导致页面白屏问题
 -->
<script>
	import loading from './loading.vue'
	let observer = null;
	let scrollTop1 = null;
	let scrollTop2 = null;
	export default {
		components: {
			loading
		},
		data() {
			return {
				scrollY: true,
				scrollClientY: 0,
				JzscrollTop: 0,
				refresherm: false,
				triggeredType: 0,
				scrollTop: 99999,
				old: {
					scrollTop: 0
				},
				list2: [],
				clientHeight: 0,
				heights: 0,
				heightt: 0,
				lowers: true,
				copyList: [],
				listPage: [],
				page: 0,
				scrollView: '',
				noLower: true,
				virtualHeight: 0
			};
		},
		props: {
			direction: {
				// 加载分页默认20
				type: String,
				default: 'bottom'
			},
			refresher: {
				// 是否拥有下拉刷新
				type: Boolean,
				default: true
			},
			pageSizes: {
				// 加载分页默认20
				type: Number,
				default: 20
			},
			code: {
				// 加载分页默认20
				type: String,
				default: 'id'
			},
			data: {
				//数据
				type: Array,
				default () {
					return [];
				}
			},
			isBackTop: {
				//是否拥有回到顶部
				type: Boolean,
				default: false
			},
		},
		onUnload() {
			if (observer) {
				observer.disconnect()
			}
		},
		created() {
			if (this.direction == 'top') {
				this.list = JSON.parse(JSON.stringify(this.data));
				this.listPage = this.splitArrayIntoGroups(this.list, this.pageSizes);
				this.getList();
			} else {
				this.scrollTop = 0
				this.list = JSON.parse(JSON.stringify(this.data));
				this.listPage = this.splitArrayIntoGroups2(this.list, this.pageSizes);
				this.list2 = this.listPage[0]
			}
		},
		mounted() {
			observer = uni.createIntersectionObserver(this);
			observer.relativeTo('.scroll-view', {
				bottom: 100
			}).observe('.ball', (res) => {
				if (res.intersectionRatio > 0) {
					let that = this
					if (this.page > 0 && this.heights > 0) {
						if (this.direction == 'top') {
							that.scrollY = false
							this.page--;
							this.list2.splice(0, this.pageSizes);
							this.list2 = [...this.list2, ...this.listPage[this.page - 1]];
							this.$nextTick(() => {
								this.heights = this.heightList[this.page - 1];
								that.scrollY = true
							})
						} else {
							that.scrollY = false
							this.page--;
							this.list2.splice(this.list2.length - this.pageSizes, that.pageSizes);
							this.list2 = [...this.listPage[this.page - 1], ...this.list2]
							this.$nextTick(() => {
								this.heights = this.heightList[this.page - 1];
								that.scrollY = true
							})

						}
					}
				}
			})
			// #ifdef MP-WEIXIN || APP
			const query = uni.createSelectorQuery().in(this);
			query.select('#listtop').boundingClientRect(data => {
				this.clientHeight = data.height
			}).exec();
			// #endif
			// #ifdef H5
			this.clientHeight = this.$refs.listtop.$el.clientHeight
			// #endif

		},
		watch: {
			data() {
				// 数据变动之后初始化数据
				if (this.direction == 'top') {
					this.page = 0;
					this.heights = 0;
					this.heightList = [0];
					this.list = JSON.parse(JSON.stringify(this.data));
					this.listPage = this.splitArrayIntoGroups(this.list, this.pageSizes);
					this.getList();
				} else {
					this.page = 0;
					this.heights = 0;
					this.heightList = [0];
					this.list = JSON.parse(JSON.stringify(this.data));
					this.listPage = this.splitArrayIntoGroups2(this.list, this.pageSizes);
					this.list2 = this.listPage[0]
				}
			}
		},
		methods: {
			toTop() {
				if (this.direction == 'top') {
					
				} else {
					let that = this
					let scrollTops = this.old.scrollTop
					const duration = 1000 // duration 默认为 1000ms
					const easing = (t) => t * (2 - t) // 缓动函数
					let start = scrollTops // 起始位置
					let end = 0 // 结束位置
					let change = end - start // 变化量
					let currentTime = 0 // 当前时间
					// 滚动动画函数
					const animateScroll = function() {
						currentTime += 16 // 设定定时器暂停时间，16ms
						let val = easing(currentTime / duration) * change + start
						that.scrollTop = val
						if (currentTime < duration) {
							setTimeout(animateScroll, 16)
						}
					}
					animateScroll()
				}

			},
			addPage(list) {
				if (this.direction == 'top') {
					let id = list[0][this.code]
					let li = list.reverse()
					this.listPage.push(li)
					this.upper()
					this.scrollView = null
					let that = this
					this.$nextTick(function() {
						this.scrollView = id
					});
				} else {
					let id = list[0][this.code]
					let li = list
					this.listPage.push(li)
					this.lower()
					this.scrollView = null
					let that = this
					this.$nextTick(function() {
						this.scrollView = id
					});
				}
			},
			async toAssign(val, secl) {
				this.noLower = false
				let that = this
				const query2 = uni.createSelectorQuery().in(this);
				let obj = null
				for (var i = 0; i < this.listPage.length; i++) {
					let list = this.listPage[i]
					for (var j = 0; j < list.length; j++) {
						let item = list[j]
						if (item[this.code] == val) {
							obj = {
								page: i + 1,
								index: j,
								id: val
							}
							break
						}
					}
					if (obj) {
						break
					}
				}
				// 检查元素是否在当前dom
				if (this.list2.some(el => {
						return el[this.code] == val
					})) {
					this.scrollView = null
					this.$nextTick(function() {
						this.scrollView = val
					});
				} else {
					// 滚动到指定page
					// 向上查找
					if (this.page < obj.page) {

						let c = (obj.page + this.page) >= this.listPage.length ? (obj.page - this.page - 1) : (obj
							.page - this.page)

						if (this.heightList[this.page + c - 1]) {
							if (this.direction == 'top') {
								this.list2 = [...this.listPage[this.page + c], ...this.listPage[this.page + c - 1]]
							} else {
								this.list2 = [...this.listPage[this.page + c - 1], ...this.listPage[this.page + c]]
							}
							this.heights = this.heightList[this.page + c - 1];
							this.scrollView = ''
							this.page = this.page + c
							this.$nextTick(function() {
								this.scrollView = val
								// #ifdef MP-WEIXIN
								const query = uni.createSelectorQuery().in(secl);
								let id = '#' + val
								query.select(id).boundingClientRect(data => {
									if (data.top) {
										that.scrollTop = data.top
									}
								}).exec();
								// #endif
							});
						} else {
							let pasc = that.page
							for (let i = 0; i < c; i++) {
								pasc++
								let a = await this.toUpper(pasc)
							}
							this.scrollView = ''
							this.$nextTick(function() {
								this.scrollView = val
								setTimeout(() => {
									that.noLower = true
								}, 1000)
								// #ifdef MP-WEIXIN
								const query = uni.createSelectorQuery().in(secl);
								let id = '#' + val
								query.select(id).boundingClientRect(data => {
									if (data.top) {
										that.scrollTop = data.top
									}
								}).exec();
								// #endif
							});
						}
					} else {
						let c = this.page - obj.page
						for (let i = 0; i < c; i++) {
							let a = await this.tolower()
						}
						this.scrollView = ''
						this.$nextTick(function() {
							this.scrollView = val
							setTimeout(() => {
								that.noLower = true
							}, 1000)
							// #ifdef MP-WEIXIN
							const query = uni.createSelectorQuery().in(secl);
							let id = '#' + val
							query.select(id).boundingClientRect(data => {
								if (data.top) {
									that.scrollTop = data.top
								}
							}).exec();
							// #endif
						});
					}
				}
			},
			tolower: function() { //向上加载数据
				return new Promise(resolve => {
					let that = this
					if (this.direction == 'top') {
						this.page--;
						this.list2.splice(0, this.pageSizes);
						this.list2 = [...this.list2, ...this.listPage[this.page - 1]];
						this.$nextTick(() => {
							this.heights = this.heightList[this.page - 1];
							resolve()
						})
					} else {
						this.page--;
						this.list2.splice(this.list2.length - this.pageSizes, this.pageSizes);
						this.list2 = [...this.listPage[this.page - 1], ...this.list2]
						this.$nextTick(() => {
							this.heights = this.heightList[this.page - 1];
							resolve()
						})

					}
				})
			},
			toUpper: function(pasc) { //向上加载数据
				return new Promise(resolve => {
					let that = this
					if (this.direction == 'top') {
						if (this.listPage.length - 1 > this.page) {
							this.scrollTop = this.old.scrollTop
							this.$nextTick(function() {
								this.scrollTop = 100
							});
							// #ifdef MP-WEIXIN || APP
							const query = uni.createSelectorQuery().in(this);
							query.select('#listx').boundingClientRect(data => {
								this.page++
								if (!this.heightList[this.page]) {
									this.heightList.push(data.height);
								}
								this.list2 = [...this.listPage[this.page], ...this.list2]
								this.$nextTick(() => {
									if (this.list2.length > this.pageSizes * 2) {
										this.list2.splice(this.list2.length - this.pageSizes,
											that.pageSizes);
										this.heights = this.heightList[this.page - 1];
									}
									setTimeout(() => {
										resolve(1)
									}, 80)
								})
							}).exec();
							// #endif
							// #ifdef H5
							let container = this.$refs.listx.$el
							this.page++
							if (!this.heightList[this.page]) {
								this.heightList.push(container.clientHeight);
							}
							this.list2 = [...this.listPage[this.page], ...this.list2]
							this.$nextTick(() => {
								if (that.list2.length > that.pageSizes * 2) {
									that.list2.splice(that.list2.length - that.pageSizes, that
										.pageSizes);
									that.heights = that.heightList[that.page - 1];
								}
								setTimeout(() => {
									resolve(1)
								}, 80)
							})
							// #endif
						} else {
							resolve(1)
						}
					} else {
						if (this.listPage.length - 1 > this.page) {
							this.scrollTop = this.old.scrollTop
							// #ifdef MP-WEIXIN || APP
							this.$nextTick(function() {
								that.page = pasc
								const query = uni.createSelectorQuery().in(this);
								query.select('#listx').boundingClientRect(data => {
									if (!that.heightList[that.page]) {
										that.heightList.push(data.height);
									}
									that.list2 = [...that.list2, ...that.listPage[that.page]]
									that.$nextTick(() => {
										if (that.list2.length > (that.listPage[that
												.page].length + that.listPage[that
												.page - 1].length)) {
											that.list2.splice(0, that.pageSizes);
											that.heights = that.heightList[that.page -
												1];
										}
										setTimeout(() => {
											resolve(1)
										}, 80)
									})
								}).exec();
							});
							// #endif
							// #ifdef H5
							let container = this.$refs.listx.$el
							this.page++
							if (!this.heightList[this.page]) {
								this.heightList.push(container.clientHeight);
							}
							this.list2 = [...this.list2, ...this.listPage[this.page]]
							that.scrollTop = 0
							this.$nextTick(() => {
								// 有问题
								if (that.list2.length > (that.listPage[this.page].length + that
										.listPage[this.page - 1].length)) {
									that.list2.splice(0, this.pageSizes);
									that.heights = that.heightList[that.page - 1];
									that.scrollTop = 999999
								}
								setTimeout(() => {
									resolve(1)
								}, 80)
							})
							// #endif
						} else {
							resolve(1)
						}

					}
				})

			},
			// 刷新
			refreshers() {
				if (this.direction == 'top') {
					this.triggeredType = 3
					let that = this
					setTimeout(() => {
						that.refresherm = false
						that.JzscrollTop = 0
						that.goTop()
						that.lowers = true
						that.scrollY = true
					}, 500)
				} else {
					this.triggeredType = 3
					let that = this
					setTimeout(() => {
						that.refresherm = false
						that.JzscrollTop = 0
						that.lowers = true
						that.scrollY = true
					}, 500)
				}
			},
			
			
			touchend3(e) { //当手指从屏幕上离开的时候触发。
				if (this.direction == 'top') {
					if(this.heights == 0 && (this.scrollTop == 99999 || this.lowers)){
						this.touchend(e)
					}
				}else{
					if(this.heights == 0 && (this.old.scrollTop == 0 || this.lowers)){
						this.touchend2(e)
					}
				}
			},
			touchstart3(e) { //当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
				if (this.direction == 'top') {
					if(this.heights == 0 && (this.scrollTop == 99999 || this.lowers)){
						this.touchstart(e)
					}
				}else{
					if(this.heights == 0 && (this.old.scrollTop == 0 || this.lowers)){
						this.touchstart2(e)
					}
				}
			},
			touchmove3(e) { //当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动
				if (this.direction == 'top') {
					if(this.heights == 0 && (this.scrollTop == 99999 || this.lowers)){
						this.touchmove(e)
					}
				}else{
					if(this.heights == 0 && (this.old.scrollTop == 0 || this.lowers)){
						this.touchmove2(e)
					}
				}
			},
			
			
			// 上拉加载
			touchend(e) { //当手指从屏幕上离开的时候触发。
				if (this.heights == 0 && this.refresherm) {
					if (this.JzscrollTop >= 80) {
						this.triggeredType = 2
						this.JzscrollTop = 80
						this.$emit('refresher')
					} else {
						this.triggeredType = 0
						this.JzscrollTop = 0
						this.scrollY = true
					}
				} else {
					this.scrollY = true
					this.JzscrollTop = 0
				}
			},
			touchstart(e) { //当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
				console.log(this.refresher)
				if (this.refresher && this.heights == 0 && (this.scrollTop == 99999 || this.lowers)) {
					this.refresherm = true
					let pas = e.changedTouches[0]
					this.scrollClientY = pas.pageY
					this.JzscrollTop = 0
				}
			},
			touchmove(e) { //当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动
				if (this.heights == 0 && this.refresherm && this.triggeredType != 2) {
					let pas = e.changedTouches[0]
					if (this.scrollClientY > pas.pageY) {
						this.scrollY = false
						// 上拉
						let y = (this.scrollClientY - pas.pageY)
						this.JzscrollTop = y > 150 ? 150 : y
						if (this.JzscrollTop >= 100) {
							this.triggeredType = 1
						} else {
							this.triggeredType = 0
						}
						this.$forceUpdate()
					}
				}
			},
			// 下拉刷新
			touchend2(e) { //当手指从屏幕上离开的时候触发。
				if (this.heights == 0 && this.refresherm) {
					if (this.JzscrollTop >= 80) {
						this.triggeredType = 2
						this.JzscrollTop = 80
						this.$emit('refresher')
					} else {
						this.triggeredType = 0
						this.JzscrollTop = 0
						this.scrollY = true
					}
				} else {
					this.scrollY = true
					this.JzscrollTop = 0
				}
			},
			touchstart2(e) { //当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
				if (this.refresher && this.heights == 0 && (this.scrollTop == 0 || this.lowers)) {
					this.refresherm = true
					let pas = e.changedTouches[0]
					this.scrollClientY = pas.pageY
					this.JzscrollTop = 0

				}
			},
			touchmove2(e) { //当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动
				if (this.heights == 0 && this.refresherm && this.triggeredType != 2) {
					let pas = e.changedTouches[0]
					if (this.scrollClientY < pas.pageY) {
						this.scrollY = false
						// 上
						let y = (pas.pageY - this.scrollClientY)
						this.JzscrollTop = y > 150 ? 150 : y
						if (this.JzscrollTop >= 100) {
							this.triggeredType = 1
						} else {
							this.triggeredType = 0
						}
						this.$forceUpdate()
					}
				}
			},
			// 数据处理
			upper: function(e) { //到达顶部，开始加载数据
				if (!this.noLower) {
					return
				}
				if (this.direction == 'top') {
					if (this.listPage.length - 1 > this.page) {
						console.log('到达顶部，开始加载数据')
						let that = this
						// #ifdef MP-WEIXIN || APP
						const query = uni.createSelectorQuery().in(this);
						query.select('#listx').boundingClientRect(data => {
							this.page++
							if (!this.heightList[this.page]) {
								this.heightList.push(data.height);
							}
							this.list2 = [...this.listPage[this.page], ...this.list2]
							// #ifndef APP
							this.$nextTick(() => {
								if (this.list2.length > this.pageSizes * 2) {
									this.list2.splice(this.list2.length - this.pageSizes, that
										.pageSizes);
									this.heights = this.heightList[this.page - 1];
								}
							})
							// #endif
							// #ifndef MP-WEIXIN
							setTimeout(() => {
								if (this.list2.length > this.pageSizes * 2) {
									this.list2.splice(this.list2.length - this.pageSizes, that
										.pageSizes);
									this.heights = this.heightList[this.page - 1];
								}
							}, 80)
							// #endif
						}).exec();
						// #endif
						// #ifdef H5
						let container = this.$refs.listx.$el
						this.page++
						if (!this.heightList[this.page]) {
							this.heightList.push(container.clientHeight);
						}
						console.log(this.heightList, this.listPage)
						this.list2 = [...this.listPage[this.page], ...this.list2]
						this.$nextTick(() => {
							// 有问题
							if (that.list2.length > (that.listPage[this.page].length + that.listPage[this
									.page - 1].length)) {
								that.list2.splice(that.list2.length - that.pageSizes, that.pageSizes);
								that.heights = that.heightList[that.page - 1];
							}
						})
						// #endif
					} else {
						this.$emit('scrolltoupper', this.page)
					}
				} else {
					this.lowers = true
				}
			},
			lower: function(e) { //到达底部数据还原
				if (!this.noLower) {
					return
				}
				if (this.direction == 'top') {
					this.lowers = true
				} else {
					if (this.noLower && this.listPage.length - 1 > this.page) {
						console.log('到达底部，开始加载数据')
						let that = this
						// #ifdef MP-WEIXIN || APP
						const query = uni.createSelectorQuery().in(this);
						query.select('#listx').boundingClientRect(data => {
							this.page++
							if (!this.heightList[this.page]) {
								this.heightList.push(data.height);
							}
							this.list2 = [...this.list2, ...this.listPage[this.page]]
							// #ifndef APP
							this.$nextTick(() => {
								if (this.list2.length > this.pageSizes * 2) {
									this.list2.splice(0, this.pageSizes);
									this.heights = this.heightList[this.page - 1];
								}
							})
							// #endif
							// #ifndef MP-WEIXIN
							setTimeout(() => {
								if (this.list2.length > this.pageSizes * 2) {
									this.list2.splice(0, this.pageSizes);
									this.heights = this.heightList[this.page - 1];
								}
							}, 80)
							// #endif
						}).exec();
						// #endif
						// #ifdef H5
						let container = this.$refs.listx.$el
						this.page++
						if (!this.heightList[this.page]) {
							this.heightList.push(container.clientHeight);
						}
						this.list2 = [...this.list2, ...this.listPage[this.page]]
						this.$nextTick(() => {
							// 有问题
							if (that.list2.length > (that.listPage[this.page].length + that.listPage[this
									.page - 1].length)) {
								that.list2.splice(0, this.pageSizes);
								that.heights = that.heightList[that.page - 1];
							}
						})
						// #endif
					} else {
						this.$emit('scrolltoupper', this.page)
					}
				}
			},
			scroll: function(e) { //滚动过程
				let that = this
				if (e.detail.scrollHeight > (e.detail.scrollTop + this.clientHeight + 200)) {
					this.lowers = false
				}
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 999999
				});
			},
			// ***********  加载操作  ***************
			splitArrayIntoGroups(array, groupSize) {
				// 数据处理
				const groups = [];
				for (let i = 0; i < array.length; i += groupSize) {
					groups.push(array.slice(i, i + groupSize).reverse());
				}
				return groups;
			},
			splitArrayIntoGroups2(array, groupSize) {
				const groups = [];
				for (let i = 0; i < array.length; i += groupSize) {
					groups.push(array.slice(i, i + groupSize));
				}
				return groups;
			},
			getList() {
				this.list2 = this.listPage[0]
				this.$nextTick(function() {
					this.goTop()
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	._backtop {
		position: absolute;
		z-index: 1;
		right: 30rpx;
		bottom: 50px;

		.top {
			width: 60px;
			height: 30px;
			box-shadow: 0.3rem 0.3rem 0.6rem rgba(0, 0, 0, .3), -0.2rem -0.2rem 0.5rem rgba(255, 255, 255, .3);
			background: #fff;
			border-radius: 50%;
			padding: 15px 0;
			text-align: center;

			image {
				width: 30px;
				height: 30px;
			}
		}

		/* 过渡类名 */
		.fade-enter-active,
		.fade-leave-active {
			transition: opacity 0.7s;
		}

		.fade-enter,
		.fade-leave-to

		/* .fade-leave-active below version 2.1.8 */
			{
			opacity: 0;
		}
	}

	.list_item {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #f5f5f5;
	}

	.scrolls {
		position: relative;
	}

	.refreshermB {
		text-align: center;
		line-height: 60px;
		height: 0px;
		color: #999;
		background-color: #fff;
	}

	.refresherm {
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		line-height: 60px;
		height: 0px;
		color: #999;
		z-index: 99;
		background-color: #fff;
	}

	.scroll-Y {
		/* #ifndef MP-WEIXIN */
		height: 100%;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 80px);
		/* #endif */
		position: relative;
	}
</style>