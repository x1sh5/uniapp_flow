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
      common_vendor.index.request({
        url: this.$store.state.apiBaseUrl + "/Account/login",
        method: "POST",
        data: JSON.stringify(e.detail.value),
        success(res) {
          console.log(res);
          that.$store.commit("changeLoginState");
          common_vendor.index.navigateBack({
            delta: that.depth
          });
        },
        fail(err) {
          console.log(err);
        },
        complete() {
        }
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
    a: common_vendor.o((...args) => $options.login && $options.login(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
