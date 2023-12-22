"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    taskid: Number
  },
  methods: {
    viewTask(e) {
      if (this.taskid) {
        common_vendor.index.navigateTo({
          url: "/pages/taskDetail/taskDetail?id=" + this.taskid
        });
      }
    },
    goHome(e) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.viewTask && $options.viewTask(...args)),
    b: common_vendor.o((...args) => $options.goHome && $options.goHome(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/pay-result/pay-result.vue"]]);
wx.createPage(MiniProgramPage);
