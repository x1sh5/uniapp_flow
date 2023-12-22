"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      phone: "",
      showCode: false,
      code: "",
      newphone: "",
      mode: "bindnew"
      //bindnew, show
    };
  },
  methods: {
    bindPhone(e) {
    },
    sendCode(e) {
    },
    bindChange(e) {
    }
  }
};
if (!Array) {
  const _easycom_xt_verify_code2 = common_vendor.resolveComponent("xt-verify-code");
  _easycom_xt_verify_code2();
}
const _easycom_xt_verify_code = () => "../../../uni_modules/xt-verify-code/components/xt-verify-code/xt-verify-code.js";
if (!Math) {
  _easycom_xt_verify_code();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.mode == "show"
  }, $data.mode == "show" ? {
    b: $data.phone,
    c: common_vendor.o(($event) => $data.phone = $event.detail.value),
    d: common_vendor.o((...args) => $options.bindChange && $options.bindChange(...args))
  } : {}, {
    e: $data.mode == "bindnew"
  }, $data.mode == "bindnew" ? {
    f: $data.newphone,
    g: common_vendor.o(($event) => $data.newphone = $event.detail.value),
    h: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    i: common_vendor.t(_ctx.email),
    j: common_vendor.o(($event) => $data.code = $event),
    k: common_vendor.p({
      inputType: "text",
      type: "bottom",
      modelValue: $data.code
    }),
    l: common_vendor.o((...args) => $options.bindPhone && $options.bindPhone(...args)),
    m: $data.showCode
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/settings/phoneBind/phoneBind.vue"]]);
wx.createPage(MiniProgramPage);
