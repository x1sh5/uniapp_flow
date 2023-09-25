"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_weappCookie = require("./common/weapp-cookie.js");
require("./common/signalr.js");
const store_index = require("./store/index.js");
require("./common/storageKeys.js");
require("./store/messages.js");
require("./store/reference.js");
if (!Math) {
  "./pages/userCenter/userCenter.js";
  "./pages/addtask/addtask.js";
  "./pages/index/index.js";
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
  "./pages/chat/chat.js";
  "./pages/holdTask/holdTask.js";
  "./pages/taskDetail/taskDetail.js";
  "./pages/test/test.js";
  "./pages/searchResult/searchResult.js";
  "./pages/publishResult/publishResult.js";
  "./pages/settings/settings.js";
  "./pages/myTaskDetail/myTaskDetail.js";
  "./pages/editTask/editTask.js";
  "./pages/reference/reference.js";
  "./pages/reference/detail/detail.js";
  "./pages/reference/new/new.js";
  "./pages/reference/edit/edit.js";
  "./pages/reference/history/history.js";
  "./pages/reference/history/detail/detail.js";
  "./pages/test/A/A.js";
  "./pages/test/B/B.js";
  "./pages/settings/unregister/unregister.js";
  "./pages/settings/identityCheck/identityCheck.js";
  "./pages/myApply/myApply.js";
}
common_weappCookie.cookieManager.default.getCookie("accesstoken", "www.liusha-gy.com");
const _sfc_main = {
  async beforeCreate() {
    let hasLogin = this.$store.commit("loginTest");
    if (!hasLogin) {
      this.$store.commit("clearStorageInfo");
    }
    this.$store.state.workSocket.on("ReceiveMessage", (user, message) => {
      console.log("receiveMessage", user, message);
      this.$store.dispatch("receiveMsg", { user, message });
    });
    this.$store.dispatch("connect");
    this.$store.commit("Msgs/initChatChannels");
  },
  async onLaunch() {
    console.log("before Create");
    await this.$store.dispatch("fetchBranchs");
    await this.$store.dispatch("fetchTaskTypes");
    this.$store.dispatch("fetchTasks", { count: 10, offset: 0, typeId: "" }).then((data) => {
      this.$store.commit("setTasks", { taskTypeName: "全部", data });
    }).catch((error) => {
      console.error("获取数据失败：", error);
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/x/Documents/HBuilderProjects/flow/App.vue"]]);
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
