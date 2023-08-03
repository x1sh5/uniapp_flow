	<!-- 我是counter组件 -->
	<template>
		<view>
			  <view>子组件-count的值是：{{number}}</view>
			  <button type="default" @click="add">+1</button>
		</view>
	</template>
	<script>
		export default {
			props:['number'],
			emits:['update:number'],
			methods:{
				add(){
					this.$emit('update:number',this.number +1)//子组件通过this.$emit()方法修改number值
				}
			}
		}
	</script>