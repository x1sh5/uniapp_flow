<template>
	<view style="width: 100%;height: 60px;"></view>
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
			backEvent(){
				uni.showModal({
					content:"返回后以编辑的内容将会消失，是否放弃修改。",
					success: function (res) {
						if (res.confirm) {
							uni.navigateBack();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			submitEvent(){
				let results = [];
				let res = this.$refs['id'+this.item.id].put();
				results.push(res)
				
				if(results.every(ele=>Boolean(ele)) ){
					uni.navigateTo({
						url:"/pages/publishResult/publishResult"
					})
				}
			
			},
			updateTask(id,payload){
				//{ctx:res, files: lastFiles}
				console.log("updateTask triggered",id,payload)

				this.item.description = payload.html;
				this.$refs['id'+id].updateT(payload);
			},

		},
		created() {
			this.item = this.$store.state.currentTask;
		},
	}
</script>

<style>

</style>
