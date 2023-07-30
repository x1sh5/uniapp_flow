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
      default: "默认"
    },
    message: {
      type: String,
      default: "你好呀"
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
    c: $props.iconSize,
    d: $props.iconSize,
    e: common_vendor.t($props.nickname),
    f: $props.nameSize,
    g: $props.nameColor,
    h: $props.bubbleColor,
    i: common_vendor.t($props.message),
    j: $props.bubbleColor,
    k: $props.messageSize,
    l: $props.messageColor,
    m: $props.bgColor
  } : {
    n: common_vendor.t($props.nickname),
    o: $props.nameSize,
    p: $props.nameColor,
    q: $props.bubbleColor,
    r: common_vendor.t($props.message),
    s: $props.bubbleColor,
    t: $props.messageSize,
    v: $props.messageColor,
    w: $props.icon,
    x: $props.iconSize,
    y: $props.iconSize
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e72a33f9"], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/yd-chatitem/yd-chatitem.vue"]]);
wx.createComponent(Component);
