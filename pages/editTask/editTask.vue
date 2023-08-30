<template>
	<uni-nav-bar left-icon="left" leftText="返回" rightText="确认" right-icon="checkmarkempty" title="任务编辑" backgroundColor="#f8f8f8"
	 @clickLeft="backEvent" @clickRight="submitEvent"></uni-nav-bar>
	<view>
		<taskCard :task="item" :editable="true" :ref="'id'+item.id"
		 style="margin: 2px 3px;"></taskCard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:{}
			}
		},
		methods: {
			
		},
		
	}
</script>

<style>

</style>
