<script>
	import 'weapp-cookie';
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
			console.log('App Launch')
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
