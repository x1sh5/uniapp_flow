<template>
	<view>
		<!-- 任务卡片 -->
		<view :class="`task{Id%3} columnlayout`" >
		  <!-- 上部分，包括： 标题，类型，工时，回馈 两行 -->
		  <view class="task-top rowlayout">
		    <!-- 左半部分，包括：标题，工时，回馈比 -->
		    <view class="task-top-left columnlayout">
		    <!-- 第一层：需求内容 编号 -->
		      <view class="rowlayout">
		        <view :class="`fontcolor{Id%3} poster`" >需求内容</view>
		        <!-- 序列号 -->
		        <view class="serialNo">k8963245{{Id}}</view>
		      </view>
		      <!-- 第二层：标题 -->
		      <view class="title">
		        <textarea :disabled="!editable" class="brief" :value="title" placeholder="一句话简述任务内容">
		        </textarea>
		      </view>
		      <!-- 第三层：预计工时，回馈 -->
		      <view class="timeandreward">
		          <!-- 预计工时 -->
		          <view class="columnlayout spendtime">
		            <view :class="`fontcolor{Id%3}`">预计工时</view>
		            <view class="rowlayout">
		              <input maxlength="8" :disabled="!editable" type="digit" 
		              :value="editable? '':spendtime" class="input" />h
		            </view>
		            
		          </view>
		          <!-- 回馈值 -->
		          <view class="columnlayout reward">
		            <view :class="`fontcolor{Id%3}`">回馈值</view>
		            <view class="rowlayout">
		              <view style="width: 40px;border-bottom: 1px dashed gray;">{{task.reward}}</view>
		              <view>{{ rewardtype.value }}</view>
					  <uni-data-select :localdata="rewardtype.options" :clear="false"
					   v-model="value" placeholder="类型">
						  
					  </uni-data-select>
<!-- 		              <t-dropdown-menu style="width: 20px;height: 20px;">
		                <t-dropdown-item style="z-index: 99;align-self: center;align-items: center;align-content: center;text-align: right;" 
		                options="rewardtype.options" value="rewardtype.label"
		                 @change="onChange" />
		              </t-dropdown-menu> -->
		            </view>
		          </view>
		          
		        </view>
		    </view>
		    <!-- 右半部分，只包括：类型 -->
		    <view class="task-top-right columnlayout" >
		        <view class="tasktype columnlayout">{{ tasktype }}</view>
		    </view>
		  </view>
		  <!-- 部门，发起人，状态 -->
		  <view class="task-bottom rowlayout">
		   <!-- 部门 -->
		   <!-- range-key 用于指定显示名称属性值 -->
		    <picker :disabled="!editable" :range="branchs" :range-key="name" :value="index"
		     class="`department fontcolor{Id%3}`" @change="branchChange">
		     {{branch}}</picker>
		    <!-- 发起人 -->
		    <view class="organigerpart" wx:if="!editable">
		      <view>{{userName}}</view>
		      <view :class="`fontcolor{Id%3}`">发起人</view>
		    </view>
		    <!-- 状态 -->
		    <view class="status" hidden="editable">{{status[task.status]}}</view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"cardinfo",
		props:{
		    task:Object,
		    //颜色代码
		    colorid:Number,
		    //可编辑组件（input,textarea等）是否能编辑，默认不能编辑
		    editable:Boolean
		},
		created() {
			console.log(this.task)
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
			branchs(){
				return this.$store.state.branchs
			},
			taskTypes(){
				return this.$store.state.taskTypes
			},
			branch:{
				get(){
					return this.editable ? this.branchs[index]["name"] : this.branchs[this.task.branchid]["name"]
				},
				set(value) {
					this.task.branchid = value
				}
			},
			title:{
				get() {
					return this.task.title
				},
				set(value) {
					this.task.title = value
				}
			}
		},
		methods:{
			branchChange(e) {
				console.log('picker发送选择改变，携带值为', e)
				this.branch = e.detail.value
			},
		},
		data() {
			return {
				    // 预计时间
				    spendtime:"",
				    deparment:"",
				    index:0,
				    tasktype:"类型",
				    status:["代接","完成","审核中"],
				    rewardtype: {
				      value: '￥',
				      options: [
				        {
				          text: '元',
				          value: '￥',
						  selected: true
				        },
				        {
				          text: '百分比',
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
	  height: 195px;
	  width: 100%;
	  align-self: center;
	  position: relative;
	  border: 2px solid #04882c;
	  margin: 0px 5px;
	  z-index: 0;
	}
	.taskbefore(){
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  content: "";
	  position: absolute;
	  clip-path: circle(11rem at 100% 2rem);
	  z-index: -1;
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
	
	
	.task-top{
	height: 70%;
	z-index: 99;
	}
	
	.task-bottom{
	display: flex;
	flex-direction: row;
	z-index: 99;
	}
	
	.task-top-left{
	width: 50%;
	}
	
	.task-top-right{
	  width: 50%;
	  align-self: flex-end;
	  align-content: flex-end;
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
	
	//预计用时
	.spendtime{
	  width: 50%;
	  margin-right: 5px;
	}
	
	//回馈
	.reward{
	  width: 50%;
	  //margin-top: 5px;
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
	}
	
	.organigerpart{
	  .columnlayout();
	  .margin-right10();
	  display: flex;
	  padding-bottom: 5px;
	  align-self: flex-end;
	}
	
	.status{
	  //.margin-right10();
	  margin-left: 20px;
	  height: 32px;
	  border: 2px solid rgb(241, 91, 4);
	  border-radius: 50%;
	  color: white;
	  display: flex;
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