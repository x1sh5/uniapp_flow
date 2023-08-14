"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./common/signalr.js");
const store_index = require("./store/index.js");
require("./common/storageKeys.js");
if (!Math) {
  "./pages/userCenter/userCenter.js";
  "./pages/addtask/addtask.js";
  "./pages/index/index.js";
  "./pages/editor/editor.js";
  "./pages/newTask/newTask.js";
  "./pages/message/message.js";
  "./pages/userTaskDetail/userTaskDetail.js";
  "./pages/draftBox/draftBox.js";
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
}
const _sfc_main = {
  async beforeCreate() {
    let hasLogin = this.$store.commit("loginTest");
    if (!hasLogin) {
      common_vendor.index.clearStorageSync();
    }
  },
  async onLaunch() {
    console.log("before Create");
    await this.$store.dispatch("fetchBranchs");
    await this.$store.dispatch("fetchTaskTypes");
    if (!this.$store.state.tasks.status) {
      this.$store.dispatch("fetchTasks", { count: 10, offset: 0 }).then((data) => {
        this.$store.commit("setTasks", data["$values"]);
      }).catch((error) => {
        console.error("获取数据失败：", error);
      });
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/流沙任务系统uniapp/uniapp_flow/App.vue"]]);
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
