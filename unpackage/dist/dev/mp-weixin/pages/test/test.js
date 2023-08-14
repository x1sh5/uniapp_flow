"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      count: 0
    };
  }
};
if (!Array) {
  const _easycom_counter2 = common_vendor.resolveComponent("counter");
  _easycom_counter2();
}
const _easycom_counter = () => "../../components/counter/counter.js";
if (!Math) {
  _easycom_counter();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.count),
    b: common_vendor.o(($event) => $data.count += 1),
    c: common_vendor.o(($event) => $data.count = $event),
    d: common_vendor.p({
      number: $data.count
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
