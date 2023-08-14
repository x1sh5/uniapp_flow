"use strict";
const common_vendor = require("../../common/vendor.js");
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
      common_vendor.index.requestWithCookie({
        url,
        method: "POST",
        data: JSON.stringify(e.detail.value),
        success(res) {
          console.log(res);
          console.log(that.$store);
          let domain = url.split("/")[2].split(":")[0];
          common_vendor.index.setResponseCookies(res.data.accessToken, domain);
          common_vendor.index.setResponseCookies(res.data.refreshToken, domain);
          that.$store.commit("changeLoginState");
          that.$store.commit("setUserName", res.data.userName);
          common_vendor.index.reLaunch({
            url: "/pages/userCenter/userCenter"
          });
        },
        fail(err) {
          console.log(err);
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
