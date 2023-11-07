<template>
	<view class="h100">
		<view style="line-height: 40px;display: flex;justify-content: space-between;">
			<view @click="toAssign">滚动到：Item999</view>
			<view @click="toAssign1">滚动到：Item100</view>
			<view @click="toAssign2">滚动到：Item0</view>
		</view>
		<jp-virtual-list code="id" class="h100" :refresher="true" isBackTop @scrolltoupper="scrolltoupper" @refresher="refresher" :data="listx" ref="search">
			<template v-slot="{ list }">
				<view v-for="item in list" :key="item.id" :id="item.id" :ref="item.id">
					<view class="list_item" :style="'height:' + item.height +'rpx'">
						{{item.id}}随机高度：{{item.height}}
					</view>
				</view>
			</template>
		</jp-virtual-list>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				listx: [],
				key: ''
			}
		},
		mounted() {
			const data = []
			for (let i = 0; i < 10000; i++) {
				data.push({
					name: `Item ${i}`,
					index: i,
					id: `Item${i}`,
					height: (Math.floor(Math.random() * 100)+100)
				})
			}
			this.listx = data
		},
		methods: {
			toAssign(){
				this.$refs.search.toAssign('Item999',this)
			},
			toAssign1(){
				this.$refs.search.toAssign('Item100',this)
			},
			toAssign2(){
				this.$refs.search.toAssign('Item0',this)
			},
			scrolltoupper(){
				const data = []
				for (let i = 0; i < 30; i++) {
					data.push({
						name: `Itemc ${i}`,
						index: i,
						id: `Itemc${i}${(Math.floor(Math.random() * 100)+100)}`,
						height: (Math.floor(Math.random() * 100)+100)
					})
				}
				setTimeout(()=>{
					// 告诉组件我需要添加该数据
					this.$refs.search.addPage(data)
				},1000)
			},
			refresher(){
				const data = []
				for (let i = 0; i < 10000; i++) {
					data.push({
						name: `Item ${i}`,
						index: i,
						id: `Item${i}`,
						height: (Math.floor(Math.random() * 100)+100)
					})
				}
				setTimeout(()=>{
					this.listx = data
					// 告诉组件刷新成功了
					this.$refs.search.refreshers()
				},2000)
			},
		}
	}
</script>

<style lang="scss">
	.h100{
		height: calc(100vh - 80px);
	}
	.list_item {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #f5f5f5;
	}
</style>