<template>
	<view>
		<refer :refer="refer" :editable="true"></refer>
	</view>
	<view>
		<button class="t"  @click="commit">提交</button>
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
 .t{
	display: flex;
    height: 70px;
    width: 100%;
    background-color:#5500ff;
    margin-left: auto;
    margin-right: auto;
    /* align-content: center; */
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
	margin-bottom: 5px;
	color: #ffffff;
	border: 1px solid #5500ff;
	transform: translate(0rpx, -180rpx) scale(1);
  }
</style>
