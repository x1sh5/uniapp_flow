<template>
	<view>
		<uni-segmented-control :current="current" :values="items" style-type="text" 
			active-color="#4cd964" @clickItem="onClickItem" ></uni-segmented-control>
		<view style="width:96%; margin-lef:auto;margin-right:auto;">
			<view v-if="current === 0">
				<view v-for="item in $incompletes" :key="item.id" style="margin-top:5px;  background-color: #4d1ae4; ">
				  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="'undone'" style="margin-top:5px;"/>
				</view>
			</view>
			
			<view v-if="current === 1">
				<view v-for="item in $completes" :key="item.id" style="margin-top:5px;">
				  <cardinfo v-bind:task="item" v-bind:editable="false" :mode="'done'" style="margin-top:5px;"/>
				</view>
			</view>

		</view>
	</view>
	<view v-if="res === undefined">
		<p style="color:#696969; text-align:center; margin-top: 50%;">这里空空如也哦~<br/>去大胆实践吧，勇敢的行动者！</p>
	</view>
</template>

<script>
	import {nextTick} from "vue"
	export default {
		data() {
			return {
				items:["待完成","完成项目"],
				current: 0,
				$incompletes:false,//数组，false表示为初始化
				$completes:false,//数组，false表示为初始化
			};
		},
		methods:{
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			// 1 incomplete 2 completed
			getByStatus(status){
				return new Promise((resolve,reject)=>{
					let qurl = this.$store.state.apiBaseUrl+"/api/AssignmentUser/status/"+status;
					uni.requestWithCookie({
						url:qurl,
						success: (res) => {
							if(res.statusCode === 200){
								if(res.data){
									resolve(res.data)
								}
								
							}else{
								reject()
							}
						},
						fail:(err)=>{
							reject(err)
						},
					});
				});
			},
			removeItem(id){
				let index = this.$data.$incompletes.findIndex(item=>item.id==id);
				if(index!==-1){
					this.$data.$incompletes.splice(index,1);
				}
			}
		},
		computed:{
			incompletes(){
				return this.$data.$incompletes;
			},
			completes(){
				return this.$data.$completes;
			}
		},
		onLoad(op) {
			this.current = parseInt(op.current) ;
			
			this.getByStatus(1)
				.then((res)=>this.$data.$incompletes = res)
				.catch((err)=>console.log(err));
			setTimeout(()=>{
				this.getByStatus(2)
					.then((res)=>this.$data.$completes = res)
					.catch((err)=>console.log(err));
			},2000)

		}
	}
</script>

<style lang="less">

</style>
