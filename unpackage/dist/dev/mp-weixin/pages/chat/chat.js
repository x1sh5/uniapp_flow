"use strict";
const common_vendor = require("../../common/vendor.js");
const common_customTypes = require("../../common/customTypes.js");
const _sfc_main = {
  data() {
    return {
      text1: "",
      //输入框消息
      userName: "",
      userId: NaN,
      //发卡人id
      calcHeight: NaN
      //
      //messages:[],
    };
  },
  computed: {
    messages() {
      return this.$store.getters.getMessages(this.userId);
    },
    canSend() {
      if (this.text1 !== null && this.text1 !== "" && this.text1 !== void 0) {
        return false;
      }
      return true;
    }
  },
  methods: {
    async send(e) {
      console.log(this.text1);
      let cc = this.$store.getters["Msgs/getCcById"](this.userId);
      if (!cc) {
        let ncc = new common_customTypes.ChatChannel(this.userId, 0, this.userName, (/* @__PURE__ */ new Date()).toLocaleString(), "");
        await this.$store.dispatch("Msgs/addChatAsync", ncc);
      }
      this.$store.dispatch("sendMsg", { user: this.userId, message: this.text1 });
      this.text1 = "";
    },
    back(e) {
      common_vendor.index.navigateBack();
    },
    receiveOld() {
      console.log("scroll up");
      let lastid = this.messages[0].cid;
      let qurl = this.$store.state.apiBaseUrl + "/api/messages/receives?receiverId=" + this.userId + "&lastid=" + lastid + "&count=10";
      common_vendor.index.requestWithCookie({
        url: qurl,
        success: (res) => {
          if (res.statusCode === 200) {
            for (let m of res.data) {
              this.$store.dispatch("receiveMsg", { user: m.from, message: m });
            }
          }
          if (res.statusCode >= 400) {
            common_vendor.index.showToast({
              title: "网络异常，请稍后再试!"
            });
          }
        }
      });
    },
    scrollDown() {
      console.log("scroll down");
    }
  },
  onLoad(op) {
    this.userName = op.userName;
    this.userId = parseInt(op.userId);
    let info = common_vendor.index.getWindowInfo();
    this.calcHeight = info.windowHeight * 96 / 100 - 66 - 74;
    let hasLoad = this.$store.getters["Msgs/getHasFirstLoad"](this.userId);
    if (!hasLoad) {
      let qurl = this.$store.state.apiBaseUrl + "/api/messages/receives?receiverId=" + this.userId + "&count=10";
      common_vendor.index.requestWithCookie({
        url: qurl,
        success: (res) => {
          if (res.statusCode === 200) {
            for (let m of res.data) {
              this.$store.dispatch("receiveMsg", { user: m.from, message: m });
            }
          }
          if (res.statusCode >= 400) {
            common_vendor.index.showToast({
              title: "网络异常，请稍后再试!"
            });
          }
        }
      });
      this.$store.dispatch("Msgs/updateHasFirstLoad", this.userId);
    }
  },
  onUnload() {
    this.$store.commit("Msgs/clearUnread", this.userId);
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
      title: $data.userName
    }),
    c: common_vendor.f($options.messages, (m, k0, i0) => {
      return {
        a: m.id,
        b: "ae524260-1-" + i0,
        c: common_vendor.p({
          message: m.content,
          isLeft: m.isLeft,
          bgColor: "#f7f7f7"
        })
      };
    }),
    d: common_vendor.s(`height:${$data.calcHeight}px`),
    e: common_vendor.o((...args) => $options.receiveOld && $options.receiveOld(...args)),
    f: common_vendor.o((...args) => $options.scrollDown && $options.scrollDown(...args)),
    g: $data.text1,
    h: common_vendor.o(($event) => $data.text1 = $event.detail.value),
    i: $options.canSend,
    j: common_vendor.o((...args) => $options.send && $options.send(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
