<script>
	import * as signalR from "/common/signalr.js"
	
	
	export default {
		async beforeCreate() {
			let hasLogin = this.$store.commit("loginTest");
			if(!hasLogin){
				this.$store.commit("clearStorageInfo");
			}
			
			//连接socket服务器
			this.$store.state.workSocket.on("ReceiveMessage", (user, message) => {
				console.log("receiveMessage",user,message);
				this.$store.dispatch("receiveMsg",{user:user,message:message})
			}); 
			this.$store.dispatch("connect");
			
			this.$store.commit("Msgs/initChatChannels");
			let originQuest = {};
			let hasRefresh = false;
			// uni.addInterceptor('request', {
			//   invoke(args) {
			//   	console.log(args);
			// 	originQuest = args;
			//   },
			//   complete(res) {
			//     console.log('interceptor-complete')
			// 	if(!hasRefresh){
			// 		if(res.statusCode === 401){
			// 			uni.request({
			// 				url:this.$store.state.apiBaseUrl+"/api/Account/refresh-token?" + uni.getRequestQueries(o, "/"),
			// 				success(res) {
			// 					hasRefresh = true;
			// 					if(res.statusCode !== 200){
			// 						uni.showToast({
			// 							title:"登录过期！",
			// 							duration: 1000
			// 						});
			// 						uni.reLaunch({
			// 							url:"/pages/login/login"
			// 						});
			// 					}
			// 					else{
			// 						uni.requestWithCookie(originQuest)
			// 					}
			// 				},
			// 				fail() {
			// 					hasRefresh = true;
			// 					uni.showToast({
			// 						title:"登录过期！",
			// 						duration: 1000
			// 					});
			// 					uni.reLaunch({
			// 						url:"/pages/login/login"
			// 					});
			// 				}
			// 			})
			// 		}
				
			// 	}
			//   }
			// });
		},
		async onLaunch() {
			console.log("before Create")
			await this.$store.dispatch('fetchBranchs');
			this.$store.dispatch('fetchTaskTypes')
			.then(data=>{
				this.$store.commit('updateTaskTypes', data);
			})
			.catch (error =>{
			    console.error("fetch updateTaskTypes error:",error);
			});
		    
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
