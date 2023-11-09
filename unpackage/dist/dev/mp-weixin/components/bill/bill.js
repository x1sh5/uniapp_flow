"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "bill",
  data() {
    return {};
  },
  props: {
    bill: Object
  },
  computed: {
    status() {
      if (this.bill && this.bill.status) {
        if (this.bill.status === 1)
          return "完成";
        if (this.bill.status === 0)
          return "未完成";
      }
      return "未完成";
    },
    mount() {
      if (this.bill && this.bill.mount)
        return this.bill.mount / 100;
      return "";
    },
    odate() {
      if (this.bill && this.bill.date)
        return this.bill.date.replace("T", " ");
      return "";
    }
  },
  methods: {
    todetail() {
      common_vendor.index.navigateTo({
        url: "/pages/myTaskDetail/myTaskDetail?id=" + this.bill.assignmentId
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.bill.description),
    b: common_vendor.t($options.odate),
    c: common_vendor.t($options.mount),
    d: common_vendor.t($options.status),
    e: common_vendor.o((...args) => $options.todetail && $options.todetail(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/components/bill/bill.vue"]]);
wx.createComponent(Component);
