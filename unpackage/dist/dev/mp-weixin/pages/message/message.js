"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      //chatChannels:[1,2,3,4],
    };
  },
  methods: {
    send(e) {
      this.messages.push(e);
    },
    deleteCc(e) {
      this.$store.commit("Msgs/delete", e);
    }
  },
  computed: {
    chatChannels() {
      return this.$store.state.Msgs.$chatChannels;
    }
  },
  onLoad(e) {
  },
  onShow() {
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
    a: common_vendor.f($options.chatChannels, (channel, k0, i0) => {
      return {
        a: channel.cid,
        b: common_vendor.o($options.deleteCc, channel.cid),
        c: "8dbad916-0-" + i0,
        d: common_vendor.p({
          cc: channel
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);
