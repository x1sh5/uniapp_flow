<template>
	<view style="width: 90%;margin-left: auto;margin-right: auto;">
		<form @submit="commit" >
			<view style="text-align: center;">
				<input name="title" type="text" placeholder="标题"/>
			</view>
			<view>
				<!-- 标头 -->
				<view class="th">
					<view class="stitle"><textarea auto-height="true" rows="1" value="区间分配项" disabled /></view>
					<view class="rate"><textarea auto-height="true" rows="1" value="分配比例区间" disabled /></view>
					<view class="brief"><textarea  auto-height="true" rows="1" value="设立来源" disabled /></view>
					<view class="detail"><textarea auto-height="true" rows="1" value="分配理由" disabled /></view>
					<view class="remark"><textarea auto-height="true" rows="1" value="备注" disabled /></view>
					<view ></view>
				</view>
				<view>
				   <view v-for="t in lines" :key="t.id" class="td">
						<view class="stitle"><textarea @blur="stitleChange(t.id)" auto-height="true" rows="3" inputmode="text"/></view>
						<view class="rate"><textarea @blur="rateChange(t.id)" auto-height="true" rows="3" inputmode="text"/></view>
						<view class="brief"><textarea @blur="briefChange(t.id)" auto-height="true" rows="3" inputmode="text"/></view>
						<view class="detail"><textarea @blur="detailChange(t.id)" maxlength="400" auto-height="true" rows="3" inputmode="text"/></view>
						<view class="remark"><textarea @blur="remarkChange(t.id)"  auto-height="true" rows="3" inputmode="text"/></view>
						<view class="del"><button @click="delLine(t.id)" style="color: red;">x</button></view>
					</view>
				</view>

			</view>
			<view class="addLine" @click="addLine">
				<view style="margin-top: auto;margin-bottom:auto;text-align: center;">+</view>
			</view>
			<button style="width: 80px;height: 40px;"  form-type="submit">提交</button>
		</form>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				lines: new Array(),
				curr:0,
			}
		},
		methods: {
			addLine(e){
				this.lines.push({id:this.curr++})
			},
			delLine(id){
				let index = this.lines.find(item=>item.id===id);
				if(index!==-1){
					this.lines.splice(index,1)
				}
			},
			commit(e){
				console.log(e);
				let qurl = this.$store.state.apiBaseUrl+"/api/Reference";
				uni.request({
					url: qurl,
					method: "POST",
					data: e
				});
			},
			stitleChange:(e)=>(id)=>{
				console.log(3)
				console.log(e,id)
			},
			rateChange(id){
				
			},
			briefChange(id){
				
			},
			detailChange(id){
				
			},
			remarkChange(id){
				
			}
			
		}
	}
</script>

<style>

	.td, .th{
		border: 1px solid black;
		display: flex;
		flex-direction: row;
		min-height: 30px;
		
		width: 100%;
	}
	
	.th{
		text-align: center;
		height: 30px;
	}
	
	.th > textarea{
		height: 30px;
	}
	
	.td{
		
		height: auto;
	}
	
	.stitle, .rate, .brief, .detail, .remark{
		border: 1px solid black;
		box-sizing: border-box;
	}
	
	from > view {
		text-align: center;
	}
	
	.addLine{
		margin-top: 5px;
		margin-bottom: 5px;
		width: 40px;
		height: 20px;
		margin-left: auto;
		margin-right: auto;
		border: 1px solid black;
		border-radius: 10px;
	}
	
	.del{
		width: 40px;
		margin-top: auto;
		margin-bottom: auto;
		border: 1px solid black;
	}
</style>
