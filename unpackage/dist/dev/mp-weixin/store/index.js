"use strict";
const common_vendor = require("../common/vendor.js");
const common_storageKeys = require("../common/storageKeys.js");
const signalR = require("../common/signalr.js");
const store_messages = require("./messages.js");
const baseUrl = "https://www.liusha-gy.com";
const store = common_vendor.createStore({
  state: {
    $hasLogin: false,
    $userName: "未登录",
    branchs: [],
    currentTask: {},
    taskTypes: [],
    apiBaseUrl: baseUrl,
    //"https://testsite:7221/api", 
    tasks: /* @__PURE__ */ new Map(),
    workSocket: common_vendor.markRaw(new signalR.HubConnectionBuilder().withUrl(baseUrl + "/chathub").configureLogging(signalR.LogLevel.Trace).withAutomaticReconnect().build()),
    messages: /* @__PURE__ */ new Map(),
    //对话消息
    $currentContent: {},
    //当前正在编辑的task.description
    $publishResults: []
    //发布结果
  },
  mutations: {
    setCurrentTask(state2, payload) {
      state2.currentTask = payload;
    },
    updateBranchs(state2, payload) {
      console.log("branchs:", payload);
      state2.branchs = common_vendor.toRaw(payload);
    },
    updateTaskTypes(state2, payload) {
      console.log("taskTypes:", payload);
      state2.taskTypes = common_vendor.toRaw(payload);
      state2.tasks.set("全部", []);
      if(state2.taskTypes && typeof state2.taskTypes[Symbol.iterator] === 'function'){
        for (let t of state2.taskTypes) {
          state2.tasks.set(t.name, []);
        }
      }

    },
    setTasks(state2, payload) {
      console.log("tasks:", payload);
      if(payload!==void 0){
        let t = payload.taskTypeName;
        state2.tasks.set(t, payload.data);
      }

    },
    updateTasks(state2, payload) {
      console.log("tasks:", payload);
      if(payload !== void 0){
        let t = payload.taskTypeName;
        state2.tasks.get(t).push(...payload.data);
      }

    },
    changeLoginState(state2) {
      state2.$hasLogin = !state2.$hasLogin;
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.hasLogin, state2.$hasLogin);
    },
    setUserName(state2, payload) {
      state2.$userName = payload;
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.userName, payload);
    },
    initUserName: (state2) => {
      try {
        const userName = common_vendor.index.getStorageSync(common_storageKeys.StorageKeys.userName);
        state2.$userName = userName;
      } catch (e) {
        console.error(e);
      }
    },
    //获取本地登录标记
    initHasLogin: (state2) => {
      let hasLogin = false;
      try {
        hasLogin = common_vendor.index.getStorageSync(common_storageKeys.StorageKeys.hasLogin);
      } catch (e) {
        hasLogin = false;
        console.error(e);
      }
      state2.$hasLogin = hasLogin;
    },
    //判断是否登录
    loginTest: (state2) => {
      let login = false;
      common_vendor.index.requestWithCookie({
        url: state2.apiBaseUrl + "/api/Account/loginTest",
        method: "HEAD",
        success: (res) => {
          if (res.statusCode === 200)
            login = true;
        }
      });
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.hasLogin, login);
      return login;
    },
    //设置正在编辑的任务中的description
    setEditContent(state2, payload) {
      state2.$currentContent = payload;
    },
    setPublishResults(state2, payload) {
      state2.$publishResults = payload;
    },
    updatePublishResults(state2, payload) {
      console.log("call");
      if (typeof payload.func === "function") {
        payload.func.call(state2.$publishResults, payload.data);
      } else {
        console.error("Invalid input");
      }
    },
    clearStorageInfo(state2) {
      common_vendor.index.removeStorageSync(common_storageKeys.StorageKeys._hasLogin);
      common_vendor.index.removeStorageSync(common_storageKeys.StorageKeys._userName);
      common_vendor.index.removeStorageSync(common_storageKeys.StorageKeys.__cookie_store__);
      common_vendor.index.removeStorageSync(common_storageKeys.StorageKeys._task_content);
    }
  },
  getters: {
    getTasks: (state2) => (taskTypeName) => {
      return state2.tasks.get(taskTypeName);
    },
    getTaskById: (state2) => (id) => {
      let i = state2.tasks.get("全部").find((item) => item.id === parseInt(id));
      return i;
    },
    getBranch: (state2) => (branchid) => {
      let i = state2.branchs.find((item) => item.id === parseInt(branchid));
      console.log("branch is: ", i);
      if (i === void 0) {
        return "部门";
      }
      return i["name"];
    },
    getTaskType: (state2) => (typeId) => {
      console.log("typeId is ", typeId);
      console.log("taskTypes are ", state2.taskTypes);
      let i = state2.taskTypes.find((item) => item.id === parseInt(typeId));
      console.log("taskType is: ", i);
      if (i === void 0) {
        return "类型";
      }
      return i["name"];
    },
    getBranchIndex: (state2) => (branchid) => {
      let i = state2.branchs.findIndex((item) => item.id === branchid);
      if (i === void 0) {
        return 0;
      }
      return i;
    },
    getMessages: (state2) => (toUserId) => {
      return state2.messages.get(parseInt(toUserId));
    },
    currentEditContent(state2) {
      return state2.$currentContent;
    },
    publishResults(state2) {
      return state2.$publishResults;
    }
  },
  actions: {
    //获取部门信息
    async fetchBranchs({ commit, state: state2 }) {
      try {
        const response = await common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Information/branchs",
          method: "GET",
          complete() {
          },
          success: function(res) {
            console.log(res);
            let data = res.data;
            commit("updateBranchs", data);
          }
          //  header:{
          // 'Access-Control-Allow-Origin': '*'
          //  }
        });
      } catch (error) {
        console.error("fetch branchs error:", error);
      }
    },
    //获取任务类型信息
    async fetchTaskTypes({ commit, state: state2 }) {
      try {
        const response = await common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Information/customtypes",
          method: "GET",
          complete() {
          },
          success: function(res) {
            console.log(res);
            let data = res.data;
            commit("updateTaskTypes", data);
          }
          //  header:{
          // 'Access-Control-Allow-Origin': '*'
          //  }
        });
      } catch (error) {
        console.error("fetch updateTaskTypes error:", error);
      }
    },
    fetchTasks({ commit, state: state2 }, { count, offset, typeId }) {
      return new Promise((resolve, reject) => {
        common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Assignment?count=" + count + "&offset=" + offset + "&typeId=" + typeId,
          method: "GET",
          success: (res) => {
            console.log(res);
            let data = res.data;
            resolve(data);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    async fetchTaskById({ commit }, id) {
      let qurl = state.apiBaseUrl + "/api/Assignment/" + id;
      try {
        const response = await common_vendor.index.requestWithCookie({
          url: qurl,
          method: "GET",
          success: function(res) {
            console.log(res);
            let data = res.data;
            common_vendor.nextTick$1(() => {
              commit("setTasks", data);
            });
          }
        });
      } catch (error) {
        console.error("fetch tasks error:", error);
      }
    },
    async sendMsg({ commit, state: state2 }, { user, message }) {
      await state2.workSocket.invoke("SendToUser", user, message);
      console.log("sendMsg");
      let userId = parseInt(user);
      let chat = state2.messages.get(userId);
      if (typeof chat === "undefined") {
        state2.messages.set(userId, new Array());
      }
      state2.messages.get(userId).push({ isLeft: false, content: message });
    },
    receiveMsg({ commit, state: state2, dispatch }, { user, message }) {
      console.log("receiveMsg");
      let userId = parseInt(user);
      message.cid = userId;
      let chat = state2.messages.get(userId);
      if (typeof chat === "undefined") {
        state2.messages.set(userId, new Array());
      }
      message.isLeft = true;
      state2.messages.get(userId).push(message);
      dispatch("Msgs/updateAsync", message);
    },
    async connect({ state: state2, actions }) {
      async function reconnect() {
        try {
          await state2.workSocket.start();
          console.log("SignalR Connected.");
        } catch (err) {
          console.log(err);
          setTimeout(reconnect, 5e3);
        }
      }
      await reconnect();
    },
    genHistory({ state: state2 }, id) {
      let qurl = state2.apiBaseUrl + "/api/History";
      common_vendor.index.uploadFileWithCookie({
        url: qurl,
        filePath: "123",
        // 随便填，不为空即可  
        name: "123",
        // 随便填，不为空即可  
        //header: header, // 可以加access_token等  
        formData: { asgid: id },
        // 接口参数，json格式，底层自动转为FormData的格式数据  
        success: (res) => {
          console.log(res);
        }
      });
    }
  },
  modules: {
    Msgs: store_messages.Messages
  }
});
exports.store = store;
