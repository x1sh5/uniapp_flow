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