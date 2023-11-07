<template>
	<view>
		<refer :refer="refer" :editable="true"></refer>
	</view>
	<view>
		<button style="width: 80px;height: 40px;"  @click="commit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refer: {title: "", lines: new Array(), content: new Map()}

			}
		},
		computed: {
			lines(){
				let l = [];
				for(let i of Array.from(this.refer.content.keys()) ){
					l.push({id: i});
				}
				return l;
			}
		},
		methods: {
			commit(e){
				if(this.refer.title===""){
					uni.showToast({
						title: "标题不能为空。"
					});
					return
				}
				
				if(this.lines.length === 0){
					uni.showToast({
						title: "内容不能为空。"
					});
					return
				}
				
				let content = JSON.stringify(Array.from(this.refer.content));
				let qurl = this.$store.state.apiBaseUrl+"/api/Reference";
				uni.requestWithCookie({
					url: qurl,
					method: "POST",
					data: {id:0, title: this.refer.title, content: content, authId:0, userName: ""},
					success: (res) => {
						uni.showModal({
							showCancel: false,
							content: res.data
						})
					}
				});
			},
		}
	}
</script>

<style>

</style>
