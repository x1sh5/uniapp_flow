<template>
<!-- 	<view> -->
	<!-- 任务卡片 -->
	<!-- 任务卡片 -->
	<view @click.stop="detail" @longpress="removeTask">
		<view :class="`task${Id%3}`">
			<!-- 编号 标题 -->
			<!-- 第一行，第一列起横跨2列 -->
			<view class="r12c13">
				<view class="columnlayout" style="width: 100%;height: 100%;">
					<!-- 第一层：需求内容 编号 -->
					  <view class="rowlayout">
						<view :class="`fontcolor${Id%3} poster`" >需求内容</view>
						<!-- 序列号 -->
						<view class="serialNo">k8963245{{Id}}</view>
					  </view>
					  <!-- 第二层：标题 -->
					  <view class="title">
						<textarea :disabled="!editable" class="brief" :value="title" placeholder="一句话简述任务内容" @blur="updateBrief">
						</textarea>
					  </view>
			  </view>
			</view>
		
		  <!-- 预计工时 第二行第一列 -->
			  <view class="presumedtime">
				<view :class="`fontcolor${Id%3}`">截止日期</view>
				<view class="rowlayout">
<!-- 				  <input maxlength="20" :disabled="!editable" type="text" 
				  :value="deadline" class="input" @blur="updatePt"/>h -->
				   
							<picker class="input" mode="date" :value="deadline" @change="biupdatePt">
								<view class="uni-input">{{deadline}}</view>
							</picker>
				  		
				</view>
				
			  </view>
			  
			  <!-- 回馈值 第二行第二列 -->
			  <view class="rewardbox">
				<view :class="`fontcolor${Id%3}`">回馈值</view>
				<view class="rowlayout">
				  <input maxlength="6" :disabled="!editable" type="digit" class="reward" 
				  v-model="reward" @blur="updateReward"/>
				  <view style="min-width: 1em;margin-bottom: auto;margin-top: auto;">{{ rewardSymbol }}</view>
				  <uni-data-select :localdata="rewardtypeSymbol.options" :clear="false" :modelValue="rewardtype" 
				    placeholder="类型" @change="rewardTypeChange" 
				   style="z-index: 2;width: auto;min-width: 10px;margin-left: 5rpx;margin-bottom: 5rpx;" 
				   v-if="editable">
					  
				  </uni-data-select>
				</view>
			  </view>
				  
		
			<!-- 右半部分，只包括：类型 -->
			<view class="bigtype" >
				<view v-if="editable" class="popupbutton" @click="showPopup">...</view>
				<view class="tasktype columnlayout">{{ taskType }}</view>
			</view>
		
		   <!-- 部门 -->
		   <!-- range-key 用于指定显示名称属性值 -->
			<picker mode="selector" :disabled="!editable" :range="branchs" range-key="name" 
			:value="branchOrder" :class="`fontcolor${Id%3}`" @change="branchChange" class="department">
			{{ depart["name"] }}</picker>
			<!-- 发起人 -->
			<view class="organigerpart" :style="editable?'display:none':'display:flex;flex-direction: column;'">
			  <view>{{userName}}</view>
			  <view :class="`fontcolor${Id%3}`" >发起人</view>
			</view>
			<!-- 状态 -->
			<view class="status" :style="editable?'display:none':'display:flex'">
				<view class="statuscontent" >{{status[task.status]}}</view>
			</view>
			
			
			<view  v-if="vis" class="popup" @click="exitDel">
				<button class="delbtn" @click="removeTask">删除</button>
			</view>
		
		</view>


	</view>

<!-- 	</view> -->
</template>

<script>
import { RewardType } from '../../common/Task'
	export default {
		name:"cardinfo",
		props:{
			taskIndex:Number, //task 在数组中的索引
		    task:Object,
		    //颜色代码
		    colorid:Number,
		    //可编辑组件（input,textarea等）是否能编辑，默认不能编辑
		    editable:Boolean,
			mode:String
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
					return this.$store.getters.getTaskType(this.task.typeId)
				}
			},
			reward:{
				get(){
					return this.task.rewardtype===RewardType.Fiexd?this.task.fixedReward:this.task.percentReward;
				},
				set(value){
					if(this.task.rewardtype===RewardType.Fiexd){
						this.task.fixedReward = value;
					}
					if(this.task.rewardtype===RewardType.Percent){
						this.task.percentReward = value;
					}
				}
			},
			rewardtype:{
				get(){
					return this.task.rewardtype
				},
				set(value){
					this.task.rewardtype = parseInt(value)
				}
			},
			rewardSymbol(){
				if(this.task.rewardtype===RewardType.Fiexd){
					return '￥'
				}
				if(this.task.rewardtype===RewardType.Percent){
					return '%'
				}
				return ''
			},
			branch:{
				get(){
					return this.$store.getters.getBranch(this.task.branchid)
				},
			},
			depart(){
				let d;
				try{
					d = this.branchs[this.branchOrder];
				}catch(e){
					//TODO handle the exception
					d = "部门";
				}

				return d
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
			deadline:{
				get() {
					try{
						let index = this.task.deadline.indexOf("T");
						if(index!==-1){
							return this.task.deadline.substring(0,index);
						}
						
					}catch(e){
						//TODO handle the exception
					}
					return this.task.deadline;
				},
				set(value) {
					this.task.deadline = value;
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
			rewardtypeSymbol(){
				return {
				  text: '%',
				  options: [
					{
					  text: '￥',
					  value: '1',
					  name: "固定",
					  selected: true,
					  disable: this.depart&&this.depart.rewardType === "only percent"
					},
					{
					  text: '%',
					  value: '2',
					  name: "百分比",
					  disable: this.depart&&this.depart.rewardType === "only fixed"
					},]
				}
			}
		},
		methods:{
			branchChange(e) {
				console.log('picker发送选择改变，携带值为', e)
				let branchIndex = e.detail.value;
				this.branchIndex = branchIndex;
				this.task.branchid = branchIndex;
				let d = this.branchs[this.branchOrder];
				if(d.rewardType==="only percent"){
					this.task.rewardtype = 2
				}
				if(d.rewardType==="only fixed"){
					this.task.rewardtype = 1
				}
			},
			rewardTypeChange(e){
				console.log('rewardType 改变，携带值为', e)
				this.task.rewardtype = parseInt(e.value);
				let pages = getCurrentPages();
				let current = pages[pages.length-1]
				if(current.mode&&current.mode=="single"){
					this.task.percentReward = 100;
				}else{
					this.task.percentReward  = '';
				}
				
			},
			detail(e){
				if(!this.editable){
					if(!this.$store.state.$hasLogin){
						uni.navigateTo({
							url:"/pages/logintips/logintips"
						})
					}else{
						const pages = getCurrentPages();
						let current = pages[pages.length-1];
						if(current.route.split("/").at(-1)!=='taskDetail'&&current.route.split("/").at(-1)!=='myTaskDetail'){
							this.$store.commit('setCurrentTask',this.task);
							this.$store.dispatch('genHistory',this.task.id);
							uni.navigateTo({
								url:"/pages/taskDetail/taskDetail?id="+this.task.id+"&mode="+this.mode,
								
							})
						}

					}
				}
			},
			updateReward(event){
				if(this.task.rewardtype === RewardType.Fiexd){
					this.task.fixedReward = event.detail.value;
				}else if(this.task.rewardtype === RewardType.Percent){
					this.task.percentReward = event.detail.value;
				}

			},
			updateBrief(event){
				this.task.title = event.detail.value;
			},
			//更新预计时间
			updatePt(event){
				this.task.deadline = event.detail.value;
			},
			//更新描述
			updateDes(data){
				this.task.description = data;
			},
			biupdatePt(e){
				console.log(e);
				this.task.deadline = e.detail.value
			},
			publish(){
				console.log(this.task);
				if(!this.task.title){
					uni.showModal({
						content:"标题不能为空！"
					});
					return false;
				}
				if(this.task.rewardtype === RewardType.Fiexd&&!this.task.fixedReward){
					uni.showModal({
						content:"回馈值不能为空！"
					});
					return false;
				}
				if(this.task.rewardtype === RewardType.Percent&&!this.task.percentReward){
					uni.showModal({
						content:"回馈值不能为空！"
					});
					return false;
				}
				if(!this.task.deadline){
					uni.showModal({
						content:"截止日期不能为空！"
					});
					return false;
				}
				
				// this.$store.commit("updatePublishResults", 
				// 	{data: {success:true, message:"任务："+this.task.title+"发布成功", errMsg:"ok"}, func: Array.prototype.push} )
				//发布任务
				
				let posturl = this.$store.state.apiBaseUrl + "/api/Assignment"
				uni.requestWithCookie({
					url:posturl,
					method:"POST",
					data:this.task,
					success:(res)=> {
						if(res.statusCode === 200){
							this.$store.state.$publishResults.push({success:true, message:"任务："+this.task.title+"发布成功", errMsg:"ok"});
							this.$emit('after-publish',this.task.id)
						}else{
							this.$store.state.$publishResults.push({success:false, message:"任务："+this.task.title+"发布失败", errMsg:"server error"})
						}
					},
					fail:(err)=>{
						console.error(err);
						this.$store.state.$publishResults.push({success:false, message:"任务："+this.task.title+"发布失败", errMsg:"client error"})
					}
				});
			},
			put(){
				console.log(this.task);
				if(!this.task.title){
					uni.showModal({
						content:"标题不能为空！"
					});
					return false;
				}
				if(this.task.rewardtype === RewardType.Fiexd&&!this.task.fixedReward){
					uni.showModal({
						content:"回馈值不能为空！"
					});
					return false;
				}
				if(this.task.rewardtype === RewardType.Percent&&!this.task.percentReward){
					uni.showModal({
						content:"回馈值不能为空！"
					});
					return false;
				}
				if(!this.task.deadline){
					uni.showModal({
						content:"截止日期不能为空！"
					});
					return false;
				}
				
				// this.$store.commit("updatePublishResults", 
				// 	{data: {success:true, message:"任务："+this.task.title+"发布成功", errMsg:"ok"}, func: Array.prototype.push} )
				// 发布任务
				
				let posturl = this.$store.state.apiBaseUrl + "/api/Assignment/"+this.task.id
				uni.requestWithCookie({
					url:posturl,
					method:"PUT",
					data:this.task,
					success:(res)=> {
						if(res.statusCode === 204){
							this.$store.state.$publishResults.push({success:true, message:"任务："+this.task.title+"修改成功", errMsg:"ok"});
							this.$emit('after-publish',this.task.id)
						}else{
							this.$store.state.$publishResults.push({success:false, message:"任务："+this.task.title+"修改失败", errMsg:"server error"})
						}
					},
					fail:(err)=>{
						console.error(err);
						this.$store.state.$publishResults.push({success:false, message:"任务："+this.task.title+"修改失败", errMsg:"client error"})
					}
				});
			},
			removeTask(e){
				console.log(e);
				this.$emit('remove-task',this.task.id)
			},
			showPopup(e){
				console.log("click show");
				//this.vis = 'visible';
				this.vis = true
			},
			exitDel(e){
				console.log("exit");
				//this.vis = 'hidden';
				this.vis = false
			}
			
		},
		data() {
			return {
				// 预计时间
				//spendtime:"",
				//tasktype:"类型",
				vis: false,
				status:["代接","待完成","完成"],
				branchIndex:false,

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
	
	.popupbutton{
		display: block;
		position: absolute;
		width: 40px;
		height: 40px;
		line-height: 24px;
		right: 5px;
		top: 10px;
		margin: 0px auto;
		font-size: 20px;
		word-wrap: break-word;
		writing-mode: vertical-lr;
		color: red;
	}
	
	.popup {
		// display: block;
		// position: absolute;
		// width: 100%;
		// height: 100%;
		// top: 0;
		// left: 0;
		// background-color: #4b4444;
		// opacity: 70%;
		// border: 1px solid #ccc;
		// padding: 10px;
		// box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		  position:absolute; 
		  z-index: 9;
		  top:0; 
		  left:0; 
		  padding:10px; 
		  width:100%; 
		  height:100%; 
		  background:rgba(0,0,0,0.8); 
		  color:#fff; 
		  opacity:1; 
		  //visibility:visible; 
		   -webkit-transition:all 0.5s ease;
		  -ms-transition:all 0.5s ease;
		  -o-transition:all 0.5s ease;
		  transition:all 0.5s ease;
	}
	
	.delbtn{
		position: absolute;
		left: 40%;
		top: 40%;
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
		margin-top: 10px;
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
	  width: 80%;
	}
	.input{
	  width: 60%;
	  text-align: center;
	  border-bottom: 1px dashed gray;
	  margin-top: 10px;
	  //border-bottom: 1px,rgb(10, 221, 63),dashed;
	}
	.brief{
	  .title();
	  white-space: pre-wrap;
	}
	.uni-textarea-compute{
		visibility: visible;
	}
</style>