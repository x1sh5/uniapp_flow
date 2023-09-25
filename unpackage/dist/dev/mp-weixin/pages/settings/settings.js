"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    identityCheck(e) {
      common_vendor.index.navigateTo({
        url: "identityCheck/identityCheck"
      });
    },
    unregister(e) {
      common_vendor.index.navigateTo({
        url: "unregister/unregister"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.identityCheck && $options.identityCheck(...args)),
    b: common_vendor.o((...args) => $options.unregister && $options.unregister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/settings/settings.vue"]]);
wx.createPage(MiniProgramPage);
