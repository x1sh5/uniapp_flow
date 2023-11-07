## 虚拟列表-解决大数据列表操作问题
> **组件名：jp-virtual-list**

### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

##有项目需要开发的请联系 QQ:371524845
###开发不易，如果帮助到你的，请支持 有问题请留言，作者会积极更新

### 基本用法

```html
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
```

##### 

## API

### Props

|  属性名	|    类型	| 默认值	| 说明			|
|			|			|			|				|
| direction| String	| 'bottom'	| 数据加载方向（bottom/top）	|
| lazy		| 	Boolean|false	| 【2.0以上版本已弃用】  是否懒加载，两种模式一种懒加载（数据量在5000以下），虚拟dom（大数据模式）	|
| pageSizes| Number	| 20	| 加载分页数	|
| data	| Array	|  []		| 数据列表	|
| refresher| Boolean	|false| 是否拥有下拉刷新	|
| code| String	|'id'| 到达指定元素（需要设置元素的id和ref为当前值，参考基本用法）	|
| isBackTop	| Boolean	|  false	| 是否拥有回到顶部(当前只用 direction=='bottom' 时启用)	|
##### * 注意jp-virtual-list需要一个高度

### 回调
|  事件名	|    类型	|  回调参数	|    说明		|
|			|			|			|				|
| @operate	| function	|无			| 操作数据成功之后的回调	|
| @refresher	| function	|无			| 下拉刷新的回调	|

### 事件
|  事件名	|      说明		|
|			|			|
|	refreshers		|	 下拉刷新成功之后调用，用来关闭刷新动画	|
| toAssign| 到达指定元素（需要设置到达元素的id和ref值为指定的数据，需要和code统一）	|
| addPage| 向数组最后添加数据	|




