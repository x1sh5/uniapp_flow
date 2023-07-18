<template>
<!-- 	<view> -->
	<!-- 任务卡片 -->
	<!-- 任务卡片 -->
	<view :class="`task${Id%3}`" @click="detail">
		<!-- 编号 标题 -->
		<!-- 第一行，第一列起横跨2列 -->
		<view class="r12c13">
			<view class="columnlayout">
				<!-- 第一层：需求内容 编号 -->
				  <view class="rowlayout">
					<view :class="`fontcolor${Id%3} poster`" >需求内容</view>
					<!-- 序列号 -->
					<view class="serialNo">k8963245{{Id}}</view>
				  </view>
				  <!-- 第二层：标题 -->
				  <view class="title">
					<textarea :disabled="!editable" class="brief" :value="title" placeholder="一句话简述任务内容">
					</textarea>
				  </view>
		  </view>
		</view>

	  <!-- 预计工时 第二行第一列 -->
		  <view class="presumedtime">
			<view :class="`fontcolor${Id%3}`">预计工时</view>
			<view class="rowlayout">
			  <input maxlength="8" :disabled="!editable" type="digit" 
			  :value="spendtime" class="input" />h
			</view>
			
		  </view>
		  
		  <!-- 回馈值 第二行第二列 -->
		  <view class="rewardbox">
			<view :class="`fontcolor${Id%3}`">回馈值</view>
			<view class="rowlayout">
			  <input maxlength="6" :disabled="!editable" type="digit" class="reward" :value="task.reward" />
			  <!-- <view>{{ rewardtype.value }}</view> -->
			  <uni-data-select :localdata="rewardtype.options" :clear="false"
			   v-model="$rewardTypeValue" placeholder="类型" @change="rewardTypeChange" 
			   style="z-index: 2;width: 20px;margin-left: 5rpx;margin-bottom: 5rpx;" 
			   :disabled="!editable">
				  
			  </uni-data-select>
			</view>
		  </view>
			  

		<!-- 右半部分，只包括：类型 -->
		<view class="bigtype" >
			<view class="tasktype columnlayout">{{ taskType }}</view>
		</view>

	   <!-- 部门 -->
	   <!-- range-key 用于指定显示名称属性值 -->
		<picker mode="selector" :disabled="!editable" :range="branchs" range-key="name" 
		:value="branchOrder" :class="`fontcolor${Id%3}`" @change="branchChange" class="department">
		{{branchs[branchOrder]["name"]}}</picker>
		<!-- 发起人 -->
		<view class="organigerpart" :style="editable?'display:none':'display:flex'">
		  <view>{{userName}}</view>
		  <view :class="`fontcolor${Id%3}`" >发起人</view>
		</view>
		<!-- 状态 -->
		<view class="status" :style="editable?'display:none':'display:flex'">
			<view class="statuscontent" >{{status[task.status]}}</view>
		</view>

	</view>
<!-- 	</view> -->
</template>

<script>
	export default {
		name:"cardinfo",
		props:{
			taskIndex:Number, //task 在数组中的索引
		    task:Object,
		    //颜色代码
		    colorid:Number,
		    //可编辑组件（input,textarea等）是否能编辑，默认不能编辑
		    editable:Boolean
		},
		created() {
			console.log("task is:",this.task)
		},
		computed:{
			Id(){
				return this.task.id
			},
			userName:{
				get() {
					return this.task.username
				},
				set(value) {
					this.task.username = value
				}
			},
			taskType:{
				get() {
					return this.$store.getters.getTaskType(this.task.typeid)
				}
			},
			branch:{
				get(){
					return this.$store.getters.getBranch(this.task.branchid)
				},
			},
			branchOrder:{
				get(){
					if(!this.branchIndex){
						return this.$store.getters.getBranchIndex(this.task.branchid)
					}
					return this.branchIndex
				},
				set(value) {
					this.branchIndex = value
				}
			},
			branchs(){
				//console.log(this.$store.state.branchs)
				return this.$store.state.branchs
			},
			nullTask(){
				if(this.task===null || this.task===undefined){
					return true
				}
				return false
			},
			spendtime:{
				get() {
					if(this.task.presumedtime===false){
						return ""
					}
					if(!this.nullTask){
						return (this.task.presumedtime/60).toFixed(2)
					}
					return ""
				},
				set(value) {
					this.task.presumedtime = value*60
				}
			},
			title:{
				get() {
					return this.task.title
				},
				set(value) {
					this.task.title = value
				}
			},
		},
		methods:{
			branchChange(e) {
				console.log('picker发送选择改变，携带值为', e)
				this.branchIndex = e.detail.value
			},
			rewardTypeChange(e){
				console.log('rewardType 改变，携带值为', e)
				this.$rewardTypeValue = e
			},
			detail(e){
				if(!this.$store.state.hasLogin){
					uni.navigateTo({
						url:"/pages/logintips/logintips"
					})
				}else{
					uni.navigateTo({
						url:"/pages/taskDetail/taskDetail?id="+this.task.id,
						
					})
				}

			}
		},
		data() {
			return {
				// 预计时间
				//spendtime:"",
				//tasktype:"类型",
				status:["代接","完成","审核中"],
				branchIndex:false,
				$rewardTypeValue: 0,
				rewardtype: {
				  value: 0,
				  options: [
					{
					  text: '￥',
					  value: "￥",
					  selected: true
					},
					{
					  text: '%',
					  value: '%',
					},]
				}
			};
		}
	}
</script>

<style lang="less">
	@import url('../../common/common.less');
	.size(@width,@height){
	  width: @width;
	  height: @height;
	}
	
	.example1{
	  .size(200px,300px);
	}
	
	.colorset(@color){
	  color: @color;
	}
	//
	.fontcolor0{
	  .colorset(rgb(30, 30, 245));
	}
	.fontcolor1{
	  color: rgb(20, 226, 226);
	}
	.fontcolor2{
	  color: rgb(45, 145, 238);
	}
	
	.task(){
	  display: grid;
	  grid-template-rows: 2fr 1fr 1fr;
	  grid-template-columns: 3fr 3fr 4fr;
	  position: relative;
	}
	.taskbefore(){
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  content: "";
	  position: absolute;
	  height: inherit;
	  clip-path: circle(65% at 100% 0%);
	  z-index: -1;
	}
	
	.r12c13{
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 3;
	}
	
	.bigtype{
		grid-row-start: 1;
		grid-row-end: 3;
		grid-column-start: 3;
		grid-column-end: 4;
	}
	
	.presumedtime{
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 1;
		grid-column-end: 2;
		margin-bottom: 15rpx;
	}
	
	.task0{
	  .task();
	}
	
	.task0:before{
	  .taskbefore();
	  background-color: rgb(30, 30, 245);
	
	}
	
	.task1{
	  .task();
	}
	
	.task1:before{
	  .taskbefore();
	  background-color: rgb(20, 226, 226);
	}
	
	.task2{
	  .task();
	}
	
	.task2:before{
	  .taskbefore();
	  background-color: rgb(45, 145, 238);
	}
	
	.tasktype{
	  bottom: 0px;
	  right: 0px;
	  font-size: 2cm;
	  font-style: italic;
	  color:white;
	  //position:fixed;
	  // align-self: flex-end;
	  // align-content: flex-end;
	}
	
	.margin-top5{
	  margin-top: 5px;
	}
	
	//预计用时量
	.spendtime{
	  width: 50%;
	  margin-right: 5px;
	}
	
	//回馈
	.rewardbox{
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 2;
		grid-column-end: 3;
		margin-bottom: 10rpx;
	}
	
	.reward{
		border-bottom: 1px dashed gray;
		flex-basis: 60rpx;
		text-align: center;
	}
	
	.margin-right10{
	  margin-right:10px;
	}
	.serialNo{
	  display: flex;
	  flex-direction: column;
	  align-self: flex-end;
	  font-size: x-small;
	  margin-left: 2px;
	}
	
	.poster{
	  //.italic();
	  margin-right: 2px;
	}
	
	.department{
	  .margin-right10();
	  font-size: 1.0cm;
	  grid-row: 3 / 4;
	  grid-column: 1 / 2;
	}
	
	.organigerpart{
	  .margin-right10();
	  padding-bottom: 5px;
	  grid-row: 3 / 4;
	  grid-column: 2 / 3;
	}
	
	//status 和 statuscontent 都必须使用flex布局才能使align-items: center;生效
	.status{
	  grid-row-start: 3;
	  grid-row-end: 4;
	  grid-column-start: 3;
	  grid-column-end: 4;

	}
	.statuscontent{
		margin-left: 20px;
		height: 32px;
		border: 2px solid rgb(241, 91, 4);
		border-radius: 50%;
		color: white;
		align-items: center;
		text-align: center;
	}
	
	.timeandreward{
	  .rowlayout();
	  .margin-top5();
	}
	
	.title{
	  .blackcolor();
	  .margin-top5();
	  height: 62%;
	}
	.input{
	  width: 60%;
	  text-align: center;
	  border-bottom: 1px dashed gray;
	  //border-bottom: 1px,rgb(10, 221, 63),dashed;
	}
	.brief{
	  .title();
	  width: 100%;
	  white-space: pre-wrap;
	}
</style>