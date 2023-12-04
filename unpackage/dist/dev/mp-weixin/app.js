"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_storageKeys = require("./common/storageKeys.js");
require("./common/signalr.js");
const store_index = require("./store/index.js");
require("./common/weapp-cookie.js");
require("./store/messages.js");
require("./store/reference.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/userCenter/userCenter.js";
  "./pages/addtask/addtask.js";
  "./pages/editor/editor.js";
  "./pages/newTask/newTask.js";
  "./pages/message/message.js";
  "./pages/userTaskDetail/userTaskDetail.js";
  "./pages/taskReq/taskReq.js";
  "./pages/history/history.js";
  "./pages/myPublishs/myPublishs.js";
  "./pages/logintips/logintips.js";
  "./pages/register/register.js";
  "./pages/login/login.js";
  "./pages/message/chat/chat.js";
  "./pages/holdTask/holdTask.js";
  "./pages/taskDetail/taskDetail.js";
  "./pages/searchResult/searchResult.js";
  "./pages/publishResult/publishResult.js";
  "./pages/pay-result/pay-result.js";
  "./pages/taskresult/completed/completed.js";
  "./pages/taskresult/failed/failed.js";
  "./pages/userhomepage/userhomepage.js";
  "./pages/settings/settings.js";
  "./pages/myTaskDetail/myTaskDetail.js";
  "./pages/editTask/editTask.js";
  "./pages/reference/reference.js";
  "./pages/reference/detail/detail.js";
  "./pages/reference/new/new.js";
  "./pages/reference/edit/edit.js";
  "./pages/reference/history/history.js";
  "./pages/reference/history/detail/detail.js";
  "./pages/settings/unregister/unregister.js";
  "./pages/settings/identityCheck/identityCheck.js";
  "./pages/myApply/myApply.js";
  "./pages/order/order.js";
  "./pages/userCenter/about/about.js";
  "./pages/userCenter/instructions/instructions.js";
}
const _sfc_main = {
  async beforeCreate() {
    console.log("before Create");
    this.$store.dispatch("loginTest").then(
      () => {
        this.$store.state.$hasLogin = true;
        console.log(this.$store.state.$hasLogin);
        common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.hasLogin, true);
      },
      () => {
        this.$store.state.$hasLogin = false;
        console.log(this.$store.state.$hasLogin);
        common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.hasLogin, false);
        this.$store.commit("clearStorageInfo");
      }
    ).catch((err) => {
      this.$store.state.$hasLogin = false;
      console.log(this.$store.state.$hasLogin);
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.hasLogin, false);
      this.$store.commit("clearStorageInfo");
    });
  },
  async onLaunch() {
    await this.$store.dispatch("fetchBranchs");
    this.$store.dispatch("fetchTaskTypes").then((data) => {
      this.$store.commit("updateTaskTypes", data);
    }).catch((error) => {
      console.error("fetch updateTaskTypes error:", error);
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  mounted() {
    this.$store.state.workSocket.on("ReceiveMessage", (user, message) => {
      console.log("receiveMessage", user, message);
      this.$store.dispatch("receiveMsg", { user, message });
    });
    this.$store.dispatch("connect");
    this.$store.commit("Msgs/initChatChannels");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp_flow/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  app.config.globalProperties.$adpid = "1111111111";
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: "00:00:00"
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
