"use strict";
const common_vendor = require("../../common/vendor.js");
const common_weappCookie = require("../../common/weapp-cookie.js");
const _sfc_main = {
  data() {
    return {
      depth: 1
    };
  },
  methods: {
    login(e) {
      console.log(e);
      const that = this;
      const url = this.$store.state.apiBaseUrl + "/api/Account/login";
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
    register() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    }
  },
  onLoad(op) {
    const refer = op.refer;
    console.log(refer);
    this.refer = refer;
    if (refer === "usercenter") {
      console.log("equal");
      this.depth = 1;
    } else {
      this.depth = 3;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.login && $options.login(...args)),
    b: common_vendor.o((...args) => $options.register && $options.register(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
