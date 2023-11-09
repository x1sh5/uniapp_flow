"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    isLeft: {
      type: Boolean,
      default: true
    },
    nickname: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "../../static/logo.png"
    },
    bubbleColor: {
      type: String,
      default: "#fff"
    },
    bgColor: {
      type: String,
      default: "#ededed"
    },
    nameSize: {
      type: String,
      default: "9px"
    },
    messageSize: {
      type: String,
      default: "16px"
    },
    nameColor: {
      type: String,
      default: "#9b9b9b"
    },
    messageColor: {
      type: String,
      default: "#000"
    },
    iconSize: {
      type: String,
      default: "90rpx"
    }
  },
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.isLeft
  }, $props.isLeft ? {
    b: $props.icon,
    c: common_vendor.t($props.nickname),
    d: $props.nameSize,
    e: $props.nameColor,
    f: $props.bubbleColor,
    g: common_vendor.t($props.message),
    h: $props.bubbleColor,
    i: $props.messageSize,
    j: $props.messageColor,
    k: $props.bgColor
  } : {
    l: common_vendor.t($props.nickname),
    m: $props.nameSize,
    n: $props.nameColor,
    o: $props.bubbleColor,
    p: common_vendor.t($props.message),
    q: $props.bubbleColor,
    r: $props.messageSize,
    s: $props.messageColor,
    t: $props.icon
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e72a33f9"], ["__file", "E:/uniapp_flow/components/yd-chatitem/yd-chatitem.vue"]]);
wx.createComponent(Component);
