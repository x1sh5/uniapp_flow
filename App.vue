<script>
	//import 'weapp-cookie';
	import cookies from "weapp-cookie/dist/weapp-cookie.umd";
	import * as signalR from "./common/signalr.js";
	//import * as signalR from "D:/signalr_for_uniapp/dist/signalr"
	
	export default {
		async beforeCreate() {
			let hasLogin = this.$store.commit("loginTest");
			if(!hasLogin){
				uni.clearStorageSync();
			}
		},
		async onLaunch() {
			console.log("before Create")
			await this.$store.dispatch('fetchBranchs');
			await this.$store.dispatch('fetchTaskTypes');
			try {
			  if(!this.$store.state.tasks.status){
				 await this.$store.dispatch('fetchTasks')
			  }
			} catch (error) {
			  console.error("Error getting data from the API:", error);
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
