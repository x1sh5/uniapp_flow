"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "channelStyle",
  props: {
    cc: {
      type: Object
    }
    // title:{
    // 	type:String,
    // 	default(){
    // 		return "测试任务标题";
    // 	}
    // }
  },
  data() {
    return {
      // lastmessage:"你好",
      // time:"22:41",
      // unreadcount:2
    };
  },
  methods: {
    jump() {
      let userId = this.cc.cid;
      let userName = this.cc.title;
      common_vendor.index.navigateTo({
        url: "/pages/chat/chat?userId=" + userId + "&userName=" + userName
      });
    },
    showDelete(e) {
    },
    delete(e) {
      this.$emit("delete-Cc", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.cc.title),
    b: common_vendor.t($props.cc.message),
    c: common_vendor.t($props.cc.lasttime),
    d: common_vendor.t($props.cc.unread),
    e: common_vendor.o((...args) => $options.jump && $options.jump(...args)),
    f: common_vendor.o((...args) => $options.showDelete && $options.showDelete(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/components/channelStyle/channelStyle.vue"]]);
wx.createComponent(Component);
