<template>
	<view>
		<refer v-if="dataLoaded" :refer="r"></refer>
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
		mounted() {
			setTimeout(() => {
			      this.dataLoaded = true;
			    }, 2000); // 假设加载数据需要2秒
		},
		computed: {
			r(){
				return this.refer;
			}
		},
		onLoad(op){
			this.id = op.id;
			let r = this.$store.getters["Refer/getReferById"](this.id);
			let kv = JSON.parse(r.content);
			let content = new Map();
			if(kv[Symbol.iterator] === 'function'){
				for(let e of kv){
					if(Array.isArray(e)&&e.length===2){
						content.set(e[0],e[1]);
					}
				}
			}
			r.content = content;
			this.refer = r;
			this.dataLoaded = true;
		}
	}
</script>

<style>

</style>
