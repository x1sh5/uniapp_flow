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
    message: Object,
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
    },
    userId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      $imgWidth: 0,
      $imgHeight: 0
    };
  },
  computed: {
    imgsrc() {
      return this.$store.state.apiBaseUrl + this.message.content;
    },
    //图像动态高度
    imgHeight() {
      if (this.$data.$imgWidth > 200)
        return "200px";
      return this.$data.$imgWidth + "px";
    },
    //图像动态长度
    imgWidth() {
      if (this.$data.$imgWidth > 200)
        return "200px";
      return this.$data.$imgWidth + "px";
    }
  },
  methods: {
    preview(e) {
      common_vendor.index.previewImage({
        urls: [this.imgsrc]
      });
    },
    toUserHome(e) {
      common_vendor.index.navigateTo({
        url: "/pages/userhomepage/userhomepage?id="
      });
    }
  },
  beforeMount() {
    if (this.message.contentType == "img") {
      common_vendor.index.getImageInfo({
        src: this.imgsrc,
        success: (img) => {
          this.$data.$imgWidth = img.width;
          this.$data.$imgHeight = img.height;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.isLeft
  }, $props.isLeft ? common_vendor.e({
    b: common_vendor.o((...args) => $options.toUserHome && $options.toUserHome(...args)),
    c: $props.icon,
    d: common_vendor.t($props.nickname),
    e: $props.nameSize,
    f: $props.nameColor,
    g: $props.message.contentType == "string"
  }, $props.message.contentType == "string" ? {
    h: $props.bubbleColor,
    i: common_vendor.t($props.message.content),
    j: $props.bubbleColor,
    k: $props.messageSize,
    l: $props.messageColor
  } : {}, {
    m: $props.message.contentType == "img"
  }, $props.message.contentType == "img" ? {
    n: common_vendor.o((...args) => $options.preview && $options.preview(...args)),
    o: $options.imgWidth,
    p: $options.imgHeight,
    q: $options.imgsrc
  } : {}, {
    r: $props.bgColor
  }) : common_vendor.e({
    s: common_vendor.t($props.nickname),
    t: $props.nameSize,
    v: $props.nameColor,
    w: $props.message.contentType == "string"
  }, $props.message.contentType == "string" ? {
    x: $props.bubbleColor,
    y: common_vendor.t($props.message.content),
    z: $props.bubbleColor,
    A: $props.messageSize,
    B: $props.messageColor
  } : {}, {
    C: $props.message.contentType == "img"
  }, $props.message.contentType == "img" ? {
    D: common_vendor.o((...args) => $options.preview && $options.preview(...args)),
    E: $options.imgWidth,
    F: $options.imgHeight,
    G: $options.imgsrc
  } : {}, {
    H: $props.icon
  }));
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e72a33f9"], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/yd-chatitem/yd-chatitem.vue"]]);
wx.createComponent(Component);
