"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      id: this.id
    };
  },
  onLoad() {
    let qurl = this.$store.state.apiBaseUrl + "/api/TaskRequest/applytome";
    common_vendor.index.requestWithCookie({
      url: qurl,
      success: (res) => {
        if (res.statusCode == 200) {
          this.id = res.data[0].id;
        }
      }
    });
  },
  methods: {
    show() {
      common_vendor.index.navigateTo({
        url: "/pages/myTaskDetail/myTaskDetail?id=" + this.id
      });
    },
    back() {
      common_vendor.index.switchTab({ url: "/pages/index/index" });
    },
    share() {
      common_vendor.index.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 5,
        imageUrl: "",
        title: "快和我一起劳动吧！",
        miniProgram: {
          id: "",
          path: "pages/index/index",
          type: 0
        },
        success: (ret) => {
        }
      });
    }
  }
};
if (!Array) {
  const _component_t_icon = common_vendor.resolveComponent("t-icon");
  const _component_price = common_vendor.resolveComponent("price");
  (_component_t_icon + _component_price)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
    }),
    c: common_vendor.o((...args) => $options.share && $options.share(...args)),
    d: common_vendor.o((...args) => $options.show && $options.show(...args)),
    e: common_vendor.o((...args) => $options.back && $options.back(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/taskresult/completed/completed.vue"]]);
wx.createPage(MiniProgramPage);
