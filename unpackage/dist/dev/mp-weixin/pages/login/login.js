"use strict";
const common_vendor = require("../../common/vendor.js");
const common_weappCookie = require("../../common/weapp-cookie.js");
require("../../common/const.js");
const _sfc_main = {
  data() {
    return {
      depth: 1
    };
  },
  methods: {
    skip(e) {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    login(e) {
      console.log(e);
      const that = this;
      const url = this.$store.state.apiBaseUrl + "/api/Account/login";
      e.detail.value.openId = this.$store.state.openid;
      common_vendor.index.request({
        url,
        method: "POST",
        data: JSON.stringify(e.detail.value),
        success: (res) => {
          console.log(res);
          if (res.statusCode === 200) {
            let domain = url.split("/")[2].split(":")[0];
            common_weappCookie.cookieManager.default.setResponseCookies(res.data.accessToken, domain);
            common_weappCookie.cookieManager.default.setResponseCookies(res.data.refreshToken, domain);
            that.$store.commit("login");
            that.$store.commit("setUserName", res.data.userName);
            that.$store.commit("setUserAvatar", res.data.avatar);
            that.$store.commit("setIntroduce", res.data.introduce);
            if (this.refer === "order") {
              common_vendor.index.redirectTo({
                url: "/pages/order/order"
              });
            } else {
              common_vendor.index.reLaunch({
                url: "/pages/userCenter/userCenter"
              });
            }
          } else if (res.statusCode === 401) {
            common_vendor.index.showModal({
              content: res.data,
              showCancel: false
            });
          }
        },
        complete() {
        }
      });
    },
    // weixin_login(){
    // 	uni.login({
    // 		success (res) {
    // 			console.log(res.code)
    // 			if (res.code) {
    // 	   		//发起网络请求
    // 		 		 uni.request({
    // 					url: url,
    // 					method: 'POST',
    // 		  			data: {
    // 		     			code: res.code,
    // 						appSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    //              			appId: 'wxbef31cb0acc4e14c'
    // 		    		}
    // 		  		})
    // 			} else {
    // 			console.log('登录失败！' + res.errMsg)
    // 			}
    // 		}
    // 	})
    // },
    register() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    }
  },
  onLoad(op) {
    const refer = op.refer;
    this.refer = refer;
    if (refer === "usercenter") {
      this.depth = 1;
    } else {
      this.depth = 3;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.skip && $options.skip(...args)),
    b: common_vendor.o((...args) => $options.login && $options.login(...args)),
    c: common_vendor.o((...args) => $options.register && $options.register(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
