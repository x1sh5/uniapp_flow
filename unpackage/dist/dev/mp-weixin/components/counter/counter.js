"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["number"],
  emits: ["update:number"],
  methods: {
    add() {
      this.$emit("update:number", this.number + 1);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.number),
    b: common_vendor.o((...args) => $options.add && $options.add(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/components/counter/counter.vue"]]);
wx.createComponent(Component);
