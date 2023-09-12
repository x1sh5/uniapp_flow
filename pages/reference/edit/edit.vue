<template>
	<view>
		<refer :refer="refer" :editable="true"></refer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refer: {},
				dataLoaded: false
			}
		},
		methods: {
			
		},
		onLoad(op){
			console.log("onload");
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
			this.dataLoaded = true;
			   
		}
	}
</script>

<style>

</style>
