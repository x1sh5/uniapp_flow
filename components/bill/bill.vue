<template>
	<view @click="todetail" style="background-color: azure;">
		<view style="display: flex;flex-direction: row;">
			<view style="width: 75%;">
				<view>{{bill.description}}</view>
				<view>日期: {{odate}}</view>
				<view>金额: {{mount}}</view>
			</view>
			<view>{{status}}</view>
		</view>
	</view>
</template>

<script>
import { replace } from 'lodash';
	export default {
		name:"bill",
		data() {
			return {
				
			};
		},
		props:{
			bill:Object
		},
		computed:{
			status(){
				if(this.bill&&this.bill.status){
					if(this.bill.status === 1)return "完成";
					if(this.bill.status === 0)return "未完成";
				}
				return "未完成";
			},
			mount(){
				if(this.bill&&this.bill.mount)
					return this.bill.mount/100;
				return "";
			},
			odate(){
				if(this.bill&&this.bill.date)
					return this.bill.date.replace("T"," ")
				return "";
			}
		},
		methods:{
			todetail(){
				uni.navigateTo({
					url: "/pages/myTaskDetail/myTaskDetail?id="+this.bill.assignmentId
				})
			}
		}
	}
</script>

<style>

</style>