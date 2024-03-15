"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      identity: null
    };
  },
  methods: {},
  onLoad(e) {
    let id = e.identity;
    if (id) {
      this.identity = id;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/register/livedetect/livedetect.vue"]]);
wx.createPage(MiniProgramPage);
