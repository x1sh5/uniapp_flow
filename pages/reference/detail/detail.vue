<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			
		},
		computed: {
			refer(){
				return this.$store.getters["Refer/getReferById"](this.id)
			}
		},
		onLoad(op){
			this.id = op.id;
		}
	}
</script>

<style>

</style>
