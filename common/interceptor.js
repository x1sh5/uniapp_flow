export default {
	//#ifdef MP-MP-WEIXIN
	uni.addInterceptor('request', {
	  invoke(args) {
	    // request 触发前拼接 url 
	    args.url = 'https://www.example.com/'+args.url
	  },
	  success(args) {
	    // 请求成功后，修改code值为1
	    args.data.code = 1
	  }, 
	  fail(err) {
	    console.log('interceptor-fail',err)
	  }, 
	  complete(res) {
	    console.log('interceptor-complete',res)
	  }
	})
	//#endif
}
