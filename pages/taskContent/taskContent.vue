<template>
	<web-view :src="url"></web-view>
</template>

<script>
	import {
		cookieManager
	} from "/common/weapp-cookie.js";
	import { baseUrl } from "../../common/const.js"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad(param) {
			let domain = baseUrl.split("/")[2].split(":")[0];
			let cookie = cookieManager.default.getRequestQueries(domain,"/")
			this.url = baseUrl+"/api/Assignment/content/" +param.id+"?"+cookie
		}
	}
</script>

<style>

</style>
