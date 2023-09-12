<template>
	<view>
		<refer :refer="refer" :editable="true"></refer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refer: {title: "", lines: new Array(), content: new Map()}

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
