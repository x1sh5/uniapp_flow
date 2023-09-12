<!-- 审核区间参考 -->

<template>
	<view style="width: 90%;margin-left: auto;margin-right: auto;">
		
			<view style="text-align: center;">
				<input :disabled="!editable" v-model="refer.title" type="text" placeholder="标题"/>
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
						<view class="stitle">
							<textarea :disabled="!editable" :ref="'stitle'+`${t.id}`" @blur="stitleChange(t.id)" v-model="refer.content.get(t.id).stitle" auto-height="true" rows="3" inputmode="text"/>
						</view>
						<view class="rate">
							<textarea :disabled="!editable" :ref="'rate'+`${t.id}`" @blur="rateChange(t.id)" v-model="refer.content.get(t.id).rate" auto-height="true" rows="3" inputmode="text"/>
						</view>
						<view class="brief">
							<textarea :disabled="!editable" :ref="'brief'+`${t.id}`" @blur="briefChange(t.id)" v-model="refer.content.get(t.id).brief" auto-height="true" rows="3" inputmode="text"/>
						</view>
						<view class="detail">
							<textarea :disabled="!editable" :ref="'detail'+`${t.id}`" @blur="detailChange(t.id)" v-model="refer.content.get(t.id).detail" maxlength="400" auto-height="true" rows="3" inputmode="text"/>
						</view>
						<view class="remark">
							<textarea :disabled="!editable" :ref="'remark'+`${t.id}`" @blur="remarkChange(t.id)" v-model="refer.content.get(t.id).remark"  auto-height="true" rows="3" inputmode="text"/>
						</view>
						<view class="del" v-show="!editable">
							<button @click="delLine(t.id)" style="color: red;">x</button>
						</view>
					</view>
				</view>

			</view>
			<view v-show="editable"  class="addLine" @click="addLine">
				<view style="margin-top: auto;margin-bottom:auto;text-align: center;">+</view>
			</view>
			<button v-show="editable" style="width: 80px;height: 40px;"  @click="commit">提交</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curr:0,
				lines: []
			}
		},
		props: {
			refer: Object,
			editable: {
				type: Boolean,
				default(){
					return false;
				}
			}
		},
		computed: {

		},
		beforeMount() {
			console.log("beforeMount");
			this.curr = this.refer.content.size;
			let l = [];
			for(let i of Array.from(this.refer.content.keys()) ){
				l.push({id: i});
			}
			this.lines = l; 
		},
		mounted() {
			
		},
		methods: {
			addLine(e){
				this.refer.content.set(this.curr,{ stitle:"", rate: "", brief: "", detail: "", remark: "" });
				this.lines.push({id:this.curr++});
			},
			delLine(id){
				let index = this.lines.find(item=>item.id===id);
				if(index!==-1){
					this.lines.splice(index,1);
				}
				this.refer.content.delete(id);
			},
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
					data: {id:0, title: this.refer.title, content: content, authId:0},
					success: (res) => {
						uni.showModal({
							showCancel: false,
							content: res.data
						})
					}
				});
			},
			stitleChange(e){
				console.log(e);
				//let x = this.$refs['stitle'+e];
			},
			rateChange(id){
				
			},
			briefChange(id){
				
			},
			detailChange(id){
				
			},
			remarkChange(id){
				
			}
			
		},
		beforeCreate() {
			console.log("beforeCreate");
		},
		created() {
			console.log("created");
		},
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
