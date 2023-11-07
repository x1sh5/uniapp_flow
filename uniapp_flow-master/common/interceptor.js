export default {
	uni.addInterceptor('request', {
	  // invoke(args) {
	  //   // request 触发前拼接 url 
	  //   args.url = 'https://www.example.com/'+args.url
	  // },
	  // success(args) {
	  //   // 请求成功后，修改code值为1
	  //   args.data.code = 1
	  // }, 
	  fail(err) {
	    console.log('interceptor-fail',err)
	  }, 
	  complete(res) {
	    console.log('interceptor-complete',res)
	  }
	});
	//let originQuest = {};
	//let hasRefresh = false;
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
}
