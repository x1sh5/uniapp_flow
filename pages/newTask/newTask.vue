<template>
	<view>
		<cardinfo :task="task" :editable="true"></cardinfo>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				task:{
					  "$id": "2",
					  "id": 1,
					  "username": "",
					  "branchid": 1,
					  "description": "2张风景插画，一张要有树，另一张也要有树。",
					  "finishtime": "0001-01-01T00:00:00",
					  "presumedtime": 2,
					  "publishtime": "0001-01-01T00:00:00",
					  "reward": 0,
					  "rewardtype": 1,
					  "status": 1,
					  "title": "风景插画2张",
					  "typeid": 1,
					  "verify": 0,
					  },
				}
			},
		onLoad(op) {
		  console.log("options:",op)
		},
	}
</script>

<style lang="less">

</style>
