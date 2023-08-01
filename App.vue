<script>
	//import 'weapp-cookie';
	import cookies from "weapp-cookie/dist/weapp-cookie.umd";
	import * as signalR from "./common/signalr.js";
	export default {
		async beforeCreate() {
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
		onLaunch: function() {
			// console.log('App Launch')
			// uni.onSocketMessage(function (res) {
			//   console.log('收到服务器内容：' + res.data);
			//   this.$store.commit("updateMessage",res.data)
			// });
			
			// uni.onSocketError(function (res) {
			//   console.log('WebSocket连接打开失败，请检查！');
			//   this.$store.dispatch("connect")
			// });
			
			// uni.onSocketClose(function (res) {
			//   console.log('WebSocket 已关闭！');
			//   this.$store.dispatch("connect")
			// });
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
