"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      chatChannels: [1, 2, 3, 4]
    };
  },
  methods: {
    send(e) {
      this.messages.push(e);
    }
  },
  onLoad(e) {
    this.$store.state.workSocket.on("ReceiveMessage", (user, message) => {
      console.log("receiveMessage", user, message);
      this.$store.dispatch("receiveMessage", { user, message });
    });
    this.$store.dispatch("connect");
  }
};
if (!Array) {
  const _easycom_channelStyle2 = common_vendor.resolveComponent("channelStyle");
  _easycom_channelStyle2();
}
const _easycom_channelStyle = () => "../../components/channelStyle/channelStyle.js";
if (!Math) {
  _easycom_channelStyle();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.messages, (m, k0, i0) => {
      return {
        a: common_vendor.t(m.message),
        b: m.id
      };
    }),
    b: common_vendor.f($data.chatChannels, (c, k0, i0) => {
      return {
        a: c,
        b: "62afb476-0-" + i0
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);
