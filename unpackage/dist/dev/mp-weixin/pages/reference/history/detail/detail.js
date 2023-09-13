"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      refer: {}
    };
  },
  methods: {},
  onLoad(op) {
    this.refer = JSON.parse(op.refer);
  }
};
if (!Array) {
  const _easycom_refer2 = common_vendor.resolveComponent("refer");
  _easycom_refer2();
}
const _easycom_refer = () => "../../../../components/refer/refer.js";
if (!Math) {
  _easycom_refer();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      editable: false,
      refer: $data.refer
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/reference/history/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
