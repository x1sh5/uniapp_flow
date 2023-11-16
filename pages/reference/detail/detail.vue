<template>
	<view>
		<refer v-if="dataLoaded" :refer="refer" :editable="false"></refer>
		<button style="width: 80px;height: 40px;margin-top: 10px;" @click="edit">编辑</button>
		<view @click="history">编辑历史</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/**
				 * @type {object} refer 审核区间参考
				 * @type {Number} refer.id 
				 * @type {String} refer.title 标题 
				 * @type {String} refer.createtime 创建时间
				 * @type {String} refer.content 内容：Map {Id:referItem}序列化后的内容
				 * @type {String} refer.authid 作者id
				 * @type {String} refer.version 版本
				 * @type {String} refer.username 作者用户名
				 */
				refer: {},
				dataLoaded: false
			}
		},
		methods: {
			edit(e) {
				uni.navigateTo({
					url: "/pages/reference/edit/edit?id=" + this.id
				})
			},
			history(e) {
				uni.navigateTo({
					url: "/pages/reference/history/history?id=" + this.id
				})
			}
		},
		beforeCreate() {
			console.log("beforeCreate")
		},
		created() {
			console.log("created")
		},
		beforeMount() {
			console.log("beforeMount")
		},
		beforeRouteEnter() {
			console.log("beforeRouteEnter")
		},
		beforeRouteLeave() {
			console.log("beforeRouteLeave")
		},
		mounted() {
			console.log("mounted")

		},
		computed: {
			r() {
				return this.refer;
			}
		},
		onLoad(op) {
			console.log("onload");
			this.id = op.id;

			//setTimeout(() => {
			// }, 2000); // 假设加载数据需要2秒
			let kv;
			let r = this.$store.getters["Refer/getReferById"](this.id);

			if (!(r.content instanceof Map)) {
				kv = JSON.parse(r.content);
				let content = new Map();
				if (typeof kv[Symbol.iterator] === 'function') {
					for (let e of kv) {
						if (Array.isArray(e) && e.length === 2) {
							content.set(e[0], e[1]);
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