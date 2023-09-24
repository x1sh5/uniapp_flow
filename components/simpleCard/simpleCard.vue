<template>
	<view>
		<view class="simplecard">
			<view>{{title}}</view><view>{{type}}</view>
			<view>{{comment}}</view>
			<view>
				<button @click="agree">同意</button>
				<button @click="disagree">拒绝</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"simpleCard",
		data() {
			return {
				simpleInfo: {
					typeId:1,
					
				}
			};
		},
		methods:{
			agree(e){
				console.log("接取任务")
				let url = this.$store.state.apiBaseUrl+"/api/Assignment/take/"+this.simpleInfo.id;
				uni.requestWithCookie({
					url:url,
					success: (res) => {
						if(res.statusCode === 200){
							if(res.data.data.success){
								uni.showModal({
									content: res.data.message
								})
							}else{
								uni.showModal({
									content: res.data.data.reason
								})
							}
						}else{
							uni.showModal({
								content: "网络出错"
							})
						}
				
					},
					fail:(err)=>{
						console.log("failed")
						uni.showModal({
							content: err
						})
					}
				});
			},
			disagree(e){
				
			}
		},
		computed:{
			title(){
				if(simpleInfo.title){
					return this.simpleInfo.title;
				}
				return "标题出错";
			},
			type(){
				if(this.simpleInfo.typeId){
					return this.$store.getters.getTaskType(this.simpleInfo.typeId);
				}
				return "";
			},
			comment(){
				return this.simpleInfo.comment;
			}
		}
	}
</script>

<style>
	.simplecard{
		display: flex;
		flex-direction: column;
		
	}
</style>