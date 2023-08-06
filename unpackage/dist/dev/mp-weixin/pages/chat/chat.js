"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      text1: ""
      //messages:[]
    };
  },
  computed: {
    messages() {
      return this.$store.getters.getMessages;
    }
  },
  methods: {
    send(e) {
      console.log(this.text1);
      this.$store.dispatch("sendMessage", { user: 2, message: this.text1 });
    },
    change(e) {
      this.text1 = e.detail.value;
    },
    back(e) {
      common_vendor.index.navigateBack();
    }
  },
  onLoad() {
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_yd_chatitem2 = common_vendor.resolveComponent("yd-chatitem");
  (_easycom_uni_nav_bar2 + _easycom_yd_chatitem2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_yd_chatitem = () => "../../components/yd-chatitem/yd-chatitem.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_yd_chatitem)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.back),
    b: common_vendor.p({
      ["left-icon"]: "left",
      title: "用户A"
    }),
    c: common_vendor.f($options.messages, (m, k0, i0) => {
      return {
        a: m.id,
        b: "1c5d7166-1-" + i0,
        c: common_vendor.p({
          message: m
        })
      };
    }),
    d: common_vendor.o((...args) => $options.change && $options.change(...args)),
    e: common_vendor.o((...args) => $options.send && $options.send(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
