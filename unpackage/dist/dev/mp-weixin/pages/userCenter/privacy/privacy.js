"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    toabout(e) {
      common_vendor.index.navigateTo({
        url: "/pages/userCenter/about/about"
      });
    },
    topbout(e) {
      common_vendor.index.navigateTo({
        url: "/pages/userCenter/privacy/privacy"
      });
    },
    toibout(e) {
      common_vendor.index.navigateTo({
        url: "/pages/userCenter/instructions/instructions"
      });
    },
    tocbout(e) {
      common_vendor.index.navigateTo({
        url: "/pages/userCenter/cost/cost"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.toabout && $options.toabout(...args)),
    b: common_vendor.o((...args) => $options.toibout && $options.toibout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/userCenter/privacy/privacy.vue"]]);
wx.createPage(MiniProgramPage);
