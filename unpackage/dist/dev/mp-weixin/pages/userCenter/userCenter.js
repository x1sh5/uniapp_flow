"use strict";
const common_vendor = require("../../common/vendor.js");
const common_storageKeys = require("../../common/storageKeys.js");
const _sfc_main = {
  data() {
    return {
      imgsrc: "",
      login: false
    };
  },
  computed: {
    hasLogin: {
      get() {
        return this.$store.state.$hasLogin;
      },
      set(value) {
        this.login = value;
        this.$store.state.$hasLogin = value;
      }
    },
    userName() {
      return this.$store.state.$userName;
    }
  },
  methods: {
    toReference(e) {
      common_vendor.index.navigateTo({
        url: "/pages/reference/reference"
      });
    },
    myPublishs(e) {
      common_vendor.index.navigateTo({
        url: "/pages/myPublishs/myPublishs"
      });
    },
    history(e) {
      console.log(e);
      common_vendor.index.navigateTo({
        url: "/pages/history/history"
      });
    },
    holds(t) {
      let turl = "/pages/holdTask/holdTask?current=" + t;
      common_vendor.index.navigateTo({
        url: turl
      });
    },
    taskReq(e) {
      console.log(e);
      common_vendor.index.navigateTo({
        url: "/pages/taskReq/taskReq"
      });
    },
    myApply(e) {
      console.log(e);
      common_vendor.index.navigateTo({
        url: "/pages/myApply/myApply"
      });
    },
    toOrder(e) {
      common_vendor.index.navigateTo({
        url: "/pages/order/order"
      });
    },
    signin(e) {
      common_vendor.index.navigateTo({
        url: "/pages/login/login?refer=usercenter"
      });
    },
    signup(e) {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    },
    signout(e) {
      console.log("signout");
      const lurl = this.$store.state.apiBaseUrl + "/api/Account/logout";
      common_vendor.index.requestWithCookie({
        url: lurl,
        method: "POST",
        success: () => {
          this.$store.commit("loginOut");
          this.hasLogin = this.$store.getters.hasLogin();
          this.$nextTick();
        }
      });
      common_vendor.index.removeStorage({
        key: common_storageKeys.StorageKeys.cookies
      });
      common_vendor.index.removeStorage({
        key: common_storageKeys.StorageKeys.taskContent
      });
      common_vendor.index.removeStorage({
        key: common_storageKeys.StorageKeys.userName
      });
    },
    toSetting(e) {
      common_vendor.index.navigateTo({
        url: "/pages/settings/settings"
      });
    }
  },
  onLoad() {
    this.$store.commit("initHasLogin");
    this.$store.commit("initUserName");
  },
  created() {
    this.hasLogin = this.$store.getters.hasLogin();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.imgsrc,
    b: common_vendor.t($options.userName),
    c: common_vendor.o((...args) => $options.myPublishs && $options.myPublishs(...args)),
    d: common_vendor.o((...args) => $options.history && $options.history(...args)),
    e: common_vendor.o((...args) => $options.taskReq && $options.taskReq(...args)),
    f: common_vendor.o((...args) => $options.holds && $options.holds(...args)),
    g: common_vendor.o(($event) => $options.holds(0)),
    h: common_vendor.o(($event) => $options.holds(1)),
    i: common_vendor.o((...args) => $options.myApply && $options.myApply(...args)),
    j: common_vendor.o((...args) => $options.toReference && $options.toReference(...args)),
    k: common_vendor.o((...args) => $options.toOrder && $options.toOrder(...args)),
    l: common_vendor.o((...args) => $options.toSetting && $options.toSetting(...args)),
    m: common_vendor.o((...args) => $options.signout && $options.signout(...args)),
    n: $options.hasLogin,
    o: common_vendor.o((...args) => $options.signin && $options.signin(...args)),
    p: common_vendor.o((...args) => $options.signup && $options.signup(...args)),
    q: !$options.hasLogin
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/userCenter/userCenter.vue"]]);
wx.createPage(MiniProgramPage);
