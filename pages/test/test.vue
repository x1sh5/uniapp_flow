	<template>
		<view>
			<view>父组件-count的值是：{{count}}</view>
			<button type="default" @click="count +=1">+1</button>
			<counter v-model:number="count"></counter>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					count:0
				}
			}
		}
	</script>
