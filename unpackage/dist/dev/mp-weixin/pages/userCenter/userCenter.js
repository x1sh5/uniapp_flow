"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: {
    hasLogin() {
      return this.$store.state.hasLogin;
    }
  },
  methods: {
    userTaskDetail(e) {
      console.log(e);
      common_vendor.index.navigateTo({
        url: "/pages/userTaskDetail/userTaskDetail"
      });
    },
    holds() {
      common_vendor.index.navigateTo({
        url: "/pages/holdTask/holdTask"
      });
    },
    draftBox(e) {
      console.log(e);
      common_vendor.index.navigateTo({
        url: "/pages/draftBox/draftBox"
      });
    },
    signin(e) {
      common_vendor.index.navigateTo({
        url: "/pages/login/login?refer=usercenter"
      });
    },
    signout(e) {
      console.log("signout");
      this.$store.commit("changeLoginState");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.userTaskDetail && $options.userTaskDetail(...args)),
    b: common_vendor.o((...args) => $options.userTaskDetail && $options.userTaskDetail(...args)),
    c: common_vendor.o((...args) => $options.draftBox && $options.draftBox(...args)),
    d: common_vendor.o((...args) => $options.holds && $options.holds(...args)),
    e: common_vendor.o((...args) => $options.holds && $options.holds(...args)),
    f: common_vendor.o((...args) => $options.holds && $options.holds(...args)),
    g: $options.hasLogin
  }, $options.hasLogin ? {
    h: common_vendor.o((...args) => $options.signout && $options.signout(...args))
  } : {
    i: common_vendor.o((...args) => $options.signin && $options.signin(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/userCenter/userCenter.vue"]]);
wx.createPage(MiniProgramPage);
