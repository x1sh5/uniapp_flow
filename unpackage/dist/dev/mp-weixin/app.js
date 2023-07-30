"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
require("./signalr_for_uniapp/FetchHttpClient.js");
require("./signalr_for_uniapp/Errors.js");
require("./signalr_for_uniapp/HttpClient.js");
require("./signalr_for_uniapp/ILogger.js");
require("./signalr_for_uniapp/Utils.js");
require("./signalr_for_uniapp/Loggers.js");
require("./signalr_for_uniapp/HubConnection.js");
require("./signalr_for_uniapp/HandshakeProtocol.js");
require("./signalr_for_uniapp/TextMessageFormat.js");
require("./signalr_for_uniapp/IHubProtocol.js");
require("./signalr_for_uniapp/Subject.js");
require("./signalr_for_uniapp/HubConnectionBuilder.js");
require("./signalr_for_uniapp/DefaultReconnectPolicy.js");
require("./signalr_for_uniapp/HttpConnection.js");
require("./signalr_for_uniapp/AccessTokenHttpClient.js");
require("./signalr_for_uniapp/HeaderNames.js");
require("./signalr_for_uniapp/DefaultHttpClient.js");
require("./signalr_for_uniapp/XhrHttpClient.js");
require("./signalr_for_uniapp/UniHttpClient.js");
require("./signalr_for_uniapp/ITransport.js");
require("./signalr_for_uniapp/LongPollingTransport.js");
require("./signalr_for_uniapp/AbortController.js");
require("./signalr_for_uniapp/ServerSentEventsTransport.js");
require("./signalr_for_uniapp/WebSocketTransport.js");
require("./signalr_for_uniapp/JsonHubProtocol.js");
if (!Math) {
  "./pages/addtask/addtask.js";
  "./pages/index/index.js";
  "./pages/userCenter/userCenter.js";
  "./pages/editor/editor.js";
  "./pages/newTask/newTask.js";
  "./pages/message/message.js";
  "./pages/userTaskDetail/userTaskDetail.js";
  "./pages/draftBox/draftBox.js";
  "./pages/logintips/logintips.js";
  "./pages/register/register.js";
  "./pages/login/login.js";
  "./pages/chat/chat.js";
  "./pages/holdTask/holdTask.js";
  "./pages/taskDetail/taskDetail.js";
}
const _sfc_main = {
  async beforeCreate() {
    console.log("before Create");
    await this.$store.dispatch("fetchBranchs");
    await this.$store.dispatch("fetchTaskTypes");
    try {
      if (!this.$store.state.tasks.status) {
        await this.$store.dispatch("fetchTasks");
      }
    } catch (error) {
      console.error("Error getting data from the API:", error);
    }
  },
  onLaunch: function() {
    console.log("App Launch");
    common_vendor.index.onSocketMessage(function(res) {
      console.log("收到服务器内容：" + res.data);
      this.$store.commit("updateMessage", res.data);
    });
    common_vendor.index.onSocketError(function(res) {
      console.log("WebSocket连接打开失败，请检查！");
      this.$store.dispatch("connect");
    });
    common_vendor.index.onSocketClose(function(res) {
      console.log("WebSocket 已关闭！");
      this.$store.dispatch("connect");
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
