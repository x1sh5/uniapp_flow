"use strict";
const common_vendor = require("../../common/vendor.js");
const common_storageKeys = require("../../common/storageKeys.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: {
    hasLogin() {
      return this.$store.state.$hasLogin;
    },
    userName() {
      return this.$store.state.$userName;
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
      common_vendor.index.removeStorage({
        key: common_storageKeys.StorageKeys.cookies
      });
      common_vendor.index.removeStorage({
        key: common_storageKeys.StorageKeys.taskContent
      });
      common_vendor.index.removeStorage({
        key: common_storageKeys.StorageKeys.userName
      });
      this.$store.commit("changeLoginState");
    }
  },
  onLoad() {
    this.$store.commit("initHasLogin");
    this.$store.commit("initUserName");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($options.userName),
    b: common_vendor.o((...args) => $options.userTaskDetail && $options.userTaskDetail(...args)),
    c: common_vendor.o((...args) => $options.userTaskDetail && $options.userTaskDetail(...args)),
    d: common_vendor.o((...args) => $options.draftBox && $options.draftBox(...args)),
    e: common_vendor.o((...args) => $options.holds && $options.holds(...args)),
    f: common_vendor.o((...args) => $options.holds && $options.holds(...args)),
    g: common_vendor.o((...args) => $options.holds && $options.holds(...args)),
    h: $options.hasLogin
  }, $options.hasLogin ? {
    i: common_vendor.o((...args) => $options.signout && $options.signout(...args))
  } : {
    j: common_vendor.o((...args) => $options.signin && $options.signin(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/userCenter/userCenter.vue"]]);
wx.createPage(MiniProgramPage);
