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
      imgsrc: ""
      // lastmessage:"你好",
      // time:"22:41",
      // unreadcount:2
    };
  },
  computed: {},
  beforeMount() {
    common_vendor.index.requestWithCookie({
      url: this.$store.state.apiBaseUrl + "/api/AuthUser/avatar?id=" + this.cc.cid,
      success: (res) => {
        console.log(res.data);
        this.imgsrc = res.data;
      }
    });
  },
  onLoad() {
  },
  onShow() {
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
    a: $data.imgsrc,
    b: common_vendor.t($props.cc.title),
    c: common_vendor.t($props.cc.message),
    d: common_vendor.t($props.cc.lasttime),
    e: common_vendor.t($props.cc.unread),
    f: common_vendor.o((...args) => $options.jump && $options.jump(...args)),
    g: common_vendor.o((...args) => $options.showDelete && $options.showDelete(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/components/channelStyle/channelStyle.vue"]]);
wx.createComponent(Component);
