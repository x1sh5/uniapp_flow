<template>
	<view  class="newtaskbox">
		<view style="width: 90%;">
			<cardinfo :task="task" :editable="true"></cardinfo>
			<editor></editor>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				task:{
					  "id": false,
					  "username": false,
					  "branchid": 1,
					  "description": "",
					  "finishtime": "0001-01-01T00:00:00",
					  "presumedtime": false,
					  "publishtime": "0001-01-01T00:00:00",
					  "reward": '',
					  "rewardtype": 1,
					  "status": 1,
					  "title": "",
					  "typeid": false,
					  "verify": 0,
					  },
				}
			},
		onLoad(op) {
		  console.log("options:",op)
		  this.$data.task.typeid = op.typeid
		  console.log("typeid is ",this.$data.task.typeid)
		},
	}
</script>

<style lang="less">
	.newtaskbox{
		display: flex;
		flex-direction: row;
		justify-content: center;
		//align-content: stretch;
		//flex-wrap: wrap;
		
	}
</style>
