<script>
	import {StorageKeys} from "./common/storageKeys.js";
	import * as signalR from "/common/signalr.js"
	
	
	export default {
		async beforeCreate() {
			console.log("before Create")
			this.$store.dispatch("loginTest").then(()=>{
				this.$store.state.$hasLogin = true;
				console.log(this.$store.state.$hasLogin);
				uni.setStorageSync(StorageKeys.hasLogin,true);
			},
				()=>{
					this.$store.state.$hasLogin = false;
					console.log(this.$store.state.$hasLogin);
					uni.setStorageSync(StorageKeys.hasLogin,false);
					this.$store.commit("clearStorageInfo");
				}
			).catch((err)=>{
				
					this.$store.state.$hasLogin = false;
					console.log(this.$store.state.$hasLogin);
					uni.setStorageSync(StorageKeys.hasLogin,false);
					this.$store.commit("clearStorageInfo");
				
			})
			
		},
		async onLaunch() {
			
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
		},
		mounted() {
			//连接socket服务器,ReceiveMessage的名称由后端api里ChatHub中指定
			this.$store.state.workSocket.on("ReceiveMessage", (user, message) => {
				console.log("receiveMessage",user,message);
				this.$store.dispatch("receiveMsg",{user:user,message:message})
			}); 
			this.$store.dispatch("connect");
			
			this.$store.commit("Msgs/initChatChannels");
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>