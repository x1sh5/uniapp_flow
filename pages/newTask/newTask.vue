<template>
	<taskCard :editable="true"></taskCard>
</template>

<script>
	export default {
		data() {
			return {
				tasks:[],
				reffer:"",
			}
		},
		computed:{

		},
		onLoad(op) {
			let reffer = op.createType;
			let taskType = op.selected;
			console.log(reffer);
			console.log(taskType);
		},
		methods:{

		}
	}
</script>

<style lang="less">
	
</style>
