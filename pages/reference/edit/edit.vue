<template>
	<view>
		<refer :refer="refer" :editable="true"></refer>
	</view>
	<view>
		<button style="width: 80px;height: 40px;"  @click="commit">提交</button>
	</view>
</template>

<script>
import { markRaw } from "vue";

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj; // 如果不是对象或为null，直接返回原值
  }

  if (Array.isArray(obj)) {
    // 如果是数组，创建一个新数组并递归克隆每个元素
    const newArray = [];
    for (let i = 0; i < obj.length; i++) {
      newArray[i] = deepClone(obj[i]);
    }
    return newArray;
  }

  // 如果是普通对象，创建一个新对象并递归克隆每个属性
  const newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key]);
    }
  }
  return newObj;
}

	export default {
		data() {
			return {
				refer: {},
				dataLoaded: false
			}
		},
		computed: {
			lines(){
				let l = [];
				for(let i of Array.from(this.refer.content.keys()) ){
					l.push({id: i});
				}
				return l;
			}
		},
		methods: {
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
				if(_.isEqual(this.refer, this.old)){
					uni.showToast({
						title: "内容未做改变。"
					});
					return
				}
				let content = JSON.stringify(Array.from(this.refer.content));
				let qurl = this.$store.state.apiBaseUrl+"/api/Reference/"+this.refer.id;
				uni.requestWithCookie({
					url: qurl,
					method: "PUT",
					data: {...this.refer, content: content},
					success: (res) => {
						uni.showModal({
							showCancel: false,
							content: res.data,
							success(r) {
								if (r.confirm) {
									uni.navigateBack();
								} 
								
							},
							
						})
					}
				});
			},
		},
		onLoad(op){

			this.id = op.id;
		
			//setTimeout(() => {
				// }, 2000); // 假设加载数据需要2秒
				let kv;
				let r = this.$store.getters["Refer/getReferById"](this.id);
				
				if( !(r.content instanceof Map)){
					kv = JSON.parse(r.content);
					let content = new Map();
					if(typeof kv[Symbol.iterator] === 'function'){
						for(let e of kv){
							if(Array.isArray(e)&&e.length===2){
								content.set(e[0],e[1]);
							}
						}
					}
					r.content = content;
				}
		
			this.refer = r;
			this.old = deepClone(markRaw(r));
			this.dataLoaded = true;
			   
		}
	}
</script>

<style>

</style>
