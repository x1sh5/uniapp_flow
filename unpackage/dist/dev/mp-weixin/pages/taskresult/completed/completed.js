"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _component_t_icon = common_vendor.resolveComponent("t-icon");
  const _component_price = common_vendor.resolveComponent("price");
  (_component_t_icon + _component_price)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      name: "check-circle-filled",
      size: "60rpx",
      color: "#47D368"
    }),
    b: common_vendor.p({
      ["wx:if"]: "{{totalPaid}}",
      price: "{{totalPaid}}",
      ["wr-class"]: "pay-money__price",
      decimalSmaller: true,
      fill: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/taskresult/completed/completed.vue"]]);
wx.createPage(MiniProgramPage);
