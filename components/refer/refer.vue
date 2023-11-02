<!-- 审核区间参考
 style="width: 90%;margin-left: auto;margin-right: auto;"-->
<!-- 原代码备份，无误后可删除
 <view>
 	
 		<view style="text-align: center;">
 			<input :disabled="!editable" v-model="refer.title" type="text" placeholder="*填写您设立项目的总名称"/>
 		</view>
 		<view>
 			
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
 					<view class="del" v-show="editable">
 						<button @click="delLine(t.id)" style="color: red;">x</button>
 					</view>
 				</view>
 			</view>
 
 		</view>
 		<view v-show="editable"  class="addLine" @click="addLine">
 			<view style="margin-top: auto;margin-bottom:auto;text-align: center;">+</view>
 		</view>
 		
 	
 </view>

 -->

<template>
<view class="th">
  <!-- 第一行的各个标题-->
  <view class="table-row" >
    <view class="table-cell a">建立新审核区间</view>
    <view class="table-cell b">总比例</view>
    <view class="table-cell c">修改时间</view>
    <view class="table-cell d">修改人</view>
  </view>
  <!-- 第一行各个标题搭配的输入框 -->
  <view class="table-row">
    <view class="table-cell aa">
      <input  type="text" auto-height class="textarea-field-aa"  placeholder="*填写您设立项目的总名称"  />
    </view>
    <view class="table-cell-bb">100%</view>
    <view class="table-cell-cc">
      <textarea auto-height class="textarea-field-cc" placeholder="*修改时间"></textarea>
    </view>
    <view class="table-cell-dd">
      <textarea auto-height class="textarea-field-dd" placeholder="*修改人"></textarea>
    </view>
  </view>



			<view class="table-cell aa">
				<input :disabled="!editable" v-model="refer.title" type="text" placeholder="*填写您设立项目的总名称"/>
			</view>
			<view class="table-cell-bb">100%</view>
			
	
			
			<view class="table-row" style="position: relative; margin: 0 40rpx;">
				
				<view class="table-cell">
					<view class="table-cell-e"><textarea auto-height="true" rows="1" value="区间分配项" disabled /></view>
					<view class="table-cell-f"><textarea auto-height="true" rows="1" value="分配比例区间" disabled /></view>
					<view class="table-cell-g"><textarea  auto-height="true" rows="1" value="设立来源" disabled /></view>
					<view class="detail"><textarea auto-height="true" rows="1" value="分配理由" disabled /></view>
					<view class="remark"><textarea auto-height="true" rows="1" value="备注" disabled /></view>
					<view ></view>
				</view>
				<view>
				   <view  class="td">
						<view class="stitle">
							<textarea :disabled="!editable"  auto-height="true" rows="3" inputmode="text"/>
						</view>
						<view class="rate">
							<textarea :disabled="!editable"  auto-height="true" rows="3" inputmode="text"/>
						</view>
						<view class="brief">
							<textarea :disabled="!editable"  auto-height="true" rows="3" inputmode="text"/>
						</view>
						<view class="detail">
							<textarea :disabled="!editable"  maxlength="400" auto-height="true" rows="3" inputmode="text"/>
						</view>
						<view class="remark">
							<textarea :disabled="!editable"   auto-height="true" rows="3" inputmode="text"/>
						</view>
						<view class="del" v-show="editable">
							<button  style="color: red;">x</button>
						</view>
					</view>
				</view>


 <!-- 区间添加模块 ，其中包括标题，和对应的输入框。输入框可根据输入内容调整大小。-->
  <view v-for="t in lines" :key="t.id" class="td" style="position: relative; margin: 0 40rpx;">
  <view class="table-cell">
    <view class="stitle">区间分配项</view>
    <textarea  :ref="'stitle'+`${t.id}`" @blur="stitleChange(t.id)" v-model="refer.content.get(t.id).stitle"  rows="3" inputmode="text"  auto-height class="textarea-field-ee" placeholder="*填写为达成总目标而拆解出的单个任务名称" maxlength="1000"></textarea>
  </view>
  <view class="table-cell">
    <view class="rate">分配比例区间</view>
    <textarea :ref="'brief'+`${t.id}`" @blur="briefChange(t.id)" v-model="refer.content.get(t.id).rate"  rows="3" inputmode="text"  auto-height class="textarea-field-ff" placeholder="*填写当前任务占总项目预估劳动量的百分比" maxlength="1000"></textarea>
  </view>
  <view class="table-cell">
    <view class="brief">设立来源</view>
    <textarea :ref="'brief'+`${t.id}`" @blur="briefChange(t.id)" v-model="refer.content.get(t.id).brief" rows="3" inputmode="text"  auto-height class="textarea-field-gg" placeholder="*阐明在现实需求中的设立来源" maxlength="1000"></textarea>
  </view>
  <view class="table-cell">
    <view class="detail">分配理由</view>
    <textarea  :ref="'brief'+`${t.id}`" @blur="briefChange(t.id)" v-model="refer.content.get(t.id).detail"  rows="3" inputmode="text"  auto-height class="textarea-field-hh" placeholder="*给出这样分配报酬比例的理由" maxlength="1000"></textarea>
  </view>
  
   <!-- 一段空白位置，起一个间隔作用 -->
<view class="blank" style="width: 730rpx; height: 78rpx;   background-color: #ffffff; " ></view>

</view>
 <!-- 添加删除 -->
<view  v-show="editable">
 						<button class="del" @click="delLine(t.id)" >-</button>
 					</view>

 <!-- 添加按钮可在当前页面重复添加区间添加模块 -->
 		<view v-show="editable"  class="addLine" @click="addLine">
 			<view >+添加一个新分配项</view>
 		</view>
 		
 	
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

			if(this.curr>0){
				let l = [];
				for(let i of Array.from(this.refer.content.keys()) ){
					l.push({id: i});
				}
				this.lines = l; 
			}
			
		},
		mounted() {
			console.log("mounted");
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
		beforeRouteEnter(){
			console.log("beforeRouteEnter");
		},
		beforeRouteLeave(){
			console.log("beforeRouteLeave");
		}
	}
</script>

<style>

	/*.td, .th{
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
	
	*/
	
	.a {
  z-index: -1;
  display: table-cell;
  padding: 20rpx;/* 内边距 */
  
  width: 100%;
  height: 40rpx;

  text-decoration: none;
  font-size:40rpx; /* 尺寸 */
  letter-spacing: 6rpx;/* 字母之间的间距 */
  line-height:50rpx;/* 文本上下位置 */
  height: 70rpx;/* 背景高度 */
  color: #ffffff;/* 字体颜色 */
  margin: rpx 0;/* 上下位置 */
  padding-left: 20rpx;/* 右缩进 */

  text-align: center; /*水平居中对齐 */
  display: flex;/*变为弹性容器 */
  justify-content: center;/*主轴上水平居中对齐 */
  align-items: center;/*垂直居中对齐 */
  background-image: -webkit-linear-gradient(0deg, #4d1ae4 0%, #886cdb 100%);

}

 .b {
  z-index: 2;
  transform: translate(440rpx,20rpx) scale(1);
  background-color: #ffffff;   /*设置背景颜色 */
 
  width: 13%;
  height: 110rpx;
 
  text-align: center; /*水平居中对齐 */
  display: flex;/*变为弹性容器 */
  justify-content: center;/*主轴上水平居中对齐 */
  align-items: center;/*垂直居中对齐 */
  color: #472d97; 

}


.c {
  z-index: 2;
  transform: translate(550rpx,-90rpx) scale(1);
  background-color: #ffffff;   /*设置背景颜色 */

  width: 14%;
  height:110rpx;

  font-size: 26rpx;
  text-align: center; /*水平居中对齐 */
  display: flex;/*变为弹性容器 */
  justify-content: center;/*主轴上水平居中对齐 */
  align-items: center;/*垂直居中对齐 */
  color: #472d97; 
}
.d {
  z-index: 2;
  transform: translate(652rpx,-200rpx) scale(1);
  background-color: #ffffff;   /*设置背景颜色 */

  width: 13%;
  height: 110rpx;

  font-size: 26rpx;
  text-align: center; /*水平居中对齐 */
  display: flex;/*变为弹性容器 */
  justify-content: center;/*主轴上水平居中对齐 */
  align-items: center;/*垂直居中对齐 */
  color: #472d97; 
}
.textarea-field-aa {
  z-index: 3;
  transform: translate(2rpx, -220rpx) scale(1);
  border: 2rpx solid #886cdb;/* 边框颜色 */

  width:428rpx;
  height:60rpx;

  font-size: 26rpx;
  color: #f0f0f0; 
 }
 .table-cell-bb {
  z-index: 3; 
  background-color: #886cdb;   /*设置背景颜色 */
  transform: translate(440rpx, -280rpx) scale(1);
 
  width: 13%;
  height: 60rpx;

  text-align: center; /*水平居中对齐 */
  display: flex;/*变为弹性容器 */
  justify-content: center;/*主轴上水平居中对齐 */
  align-items: center;/*垂直居中对齐 */
  color: #f0f0f0; 
}
.table-cell-cc {
  z-index:3;
  border: 2rpx solid #886cdb;/* 边框颜色 */
  transform: translate(544rpx,-342rpx) scale(1);

  width: 14%;
  height: 60rpx;

  font-size: 20rpx;
  text-align: center; /*水平居中对齐 */
  display: flex;/*变为弹性容器 */
  justify-content: center;/*主轴上水平居中对齐 */
  align-items: center;/*垂直居中对齐 */
  color: #f0f0f0; 
}
.table-cell-dd {
  z-index: 3;
  border: 2rpx solid #886cdb;/* 边框颜色 */
  transform: translate(660rpx,-406rpx) scale(1);

  width: 11%;
  height: 60rpx;

  font-size: 20rpx;
  text-align: center; /*水平居中对齐 */
  display: flex;/*变为弹性容器 */
  justify-content: center;/*主轴上水平居中对齐 */
  align-items: center;/*垂直居中对齐 */
  color: #f0f0f0; 
}

.stitle {

  z-index: 4;
  display: table-cell;
  padding: 0rpx;/* 内边距 */
  transform: translate(0rpx,-380rpx) scale(1);

  width: 100%;
  height:70rpx;

  display: flex;/*变为弹性容器 */
  align-items: center;/*垂直居中对齐 */

  text-decoration: none;
  padding-left: 8rpx;/* 右缩进 */
  font-size:36rpx; /* 尺寸 */
  letter-spacing: 6rpx;/* 字母之间的间距 */
  line-height:00rpx;/* 文本上下位置 */
 
  color: #ffffff;/* 字体颜色 */
  margin: rpx 0;/* 上下位置 */

  background-image: -webkit-linear-gradient(0deg, #4d1ae4 0%, #886cdb 100%);
}
.textarea-field-ee {
  z-index: 4;
  transform: translate(0rpx, -380rpx) scale(1);
  border: 2rpx solid #886cdb;/* 边框颜色 */

  width:100%;
  height:60rpx;

  font-size: 26rpx;
  color: #f0f0f0; 

  
 }

 .rate {
  z-index: 5;
  transform: translate(0rpx,-360rpx) scale(1);
  background-color: #ffffff;   /*设置背景颜色 */

  width: 30%;
  height: 80rpx;

  font-size: 26rpx;

  display: flex;/*变为弹性容器 */
  align-items: center;/*垂直居中对齐 */
  color: #4a1cd3; 
}


.textarea-field-ff {
  z-index: 5;
  transform: translate(0rpx, -380rpx) scale(1);
  border: 2rpx solid #886cdb;/* 边框颜色 */

  width:100%;
  height:120rpx;

  font-size: 26rpx;
  color: #f0f0f0; 
 }


 .brief{
  z-index: 6;
  transform: translate(0rpx,-360rpx) scale(1);
  background-color: #ffffff;   /*设置背景颜色 */

  width: 30%;
  height: 80rpx;

  font-size: 26rpx;

  display: flex;/*变为弹性容器 */
  align-items: center;/*垂直居中对齐 */
  color: #4a1cd3; 
}


.textarea-field-gg {
  z-index:6;
  transform: translate(0rpx, -380rpx) scale(1);
  border: 2rpx solid #886cdb;/* 边框颜色 */

  width:100%;
  height:120rpx;

  font-size: 26rpx;
  color: #f0f0f0; 
 }


 .detail {
  z-index: 7;
  transform: translate(0rpx,-360rpx) scale(1);
  background-color: #ffffff;   /*设置背景颜色 */

  width: 30%;
  height: 80rpx;

  font-size: 26rpx;

  display: flex;/*变为弹性容器 */
  align-items: center;/*垂直居中对齐 */
  color: #4a1cd3; 
}


.textarea-field-hh {
  z-index: 7;
  transform: translate(0rpx, -380rpx) scale(1);
  border: 2rpx solid #886cdb;/* 边框颜色 */

  width:100%;
  height:120rpx;

  font-size: 26rpx;
  color: #f0f0f0; 
 }

 /*添加步骤按钮*/
.addLine{
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
 
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  border-radius: 10px;
}


.del{
	z-index: 20;
 display: flex;  /* 使用Flex布局 */
   justify-content: center;  /* 水平居中 */
   align-items: center; /* 垂直居中 */
  border-radius: 40rpx; /* 新增：设置按钮边框为圆角 */
  width: 150rpx;
  height: 70rpx;
  color:#6c4ad1; 
 border: 1px solid  #6c4ad1; 
text-align: center;
/* top: calc(150vh - 350rpx);
   */
   margin-top:0rpx;
margin-left: 280px;
 background-color: #ffffff;   /*设置背景颜色 */
 
   box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
}
	
 
.addLine{
	z-index: 30;
  border: 1px solid  #6c4ad1;
  border-radius: 40rpx; /* 新增：设置按钮边框为圆角 */
  width: 450rpx;
  height: 70rpx;
  color: rgb(255, 255, 255); /* 新增：设置按钮文字颜色为白色 */
  background-color: #6c4ad1;
text-align: center;
/* top: calc(150vh - 350rpx);
   */

  
 display: flex;  /* 使用Flex布局 */ 
   justify-content: center;  /* 水平居中 */
   align-items: center; /* 垂直居中 */
   margin-top: -70rpx;
   margin-left: 20px;
   box-shadow:0ch;
 
   box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
}

</style>
