"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "channelStyle",
  data() {
    return {
      title: "测试任务标题",
      lastmessage: "你好",
      time: "22:41",
      unreadcount: 2
    };
  },
  methods: {
    jump() {
      common_vendor.index.navigateTo({
        url: "/pages/chat/chat"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title),
    b: common_vendor.t($data.lastmessage),
    c: common_vendor.t($data.time),
    d: common_vendor.t($data.unreadcount),
    e: common_vendor.o((...args) => $options.jump && $options.jump(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/components/channelStyle/channelStyle.vue"]]);
wx.createComponent(Component);
