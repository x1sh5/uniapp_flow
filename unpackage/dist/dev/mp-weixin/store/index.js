"use strict";
const common_vendor = require("../common/vendor.js");
const common_storageKeys = require("../common/storageKeys.js");
const signalR = require("../common/signalr.js");
const baseUrl = "https://localhost:7221";
const store = common_vendor.createStore({
  state: {
    $hasLogin: false,
    $userName: "未登录",
    branchs: [],
    taskTypes: [],
    apiBaseUrl: baseUrl,
    //"https://testsite:7221/api", 
    tasks: {
      status: false,
      values: []
    },
    workSocket: new signalR.HubConnectionBuilder().withUrl(baseUrl + "/chathub").configureLogging(signalR.LogLevel.Trace).build(),
    messages: [],
    $currentContent: {},
    //当前正在编辑的task.description
    $publishResults: []
  },
  mutations: {
    updateBranchs(state2, payload) {
      console.log("branchs:", payload);
      state2.branchs = common_vendor.toRaw(payload);
    },
    updateTaskTypes(state2, payload) {
      console.log("taskTypes:", payload);
      state2.taskTypes = common_vendor.toRaw(payload);
    },
    setTasks(state2, payload) {
      console.log("tasks:", payload);
      state2.tasks.status = true;
      state2.tasks.values = payload;
    },
    updateTasks(state2, payload) {
      console.log("tasks:", payload);
      state2.tasks.status = true;
      state2.tasks.values = state2.tasks.values.concat(payload);
    },
    changeLoginState(state2) {
      state2.$hasLogin = !state2.$hasLogin;
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.hasLogin, state2.$hasLogin);
    },
    updateMessage(state2, payload) {
      state2.messages.push(payload);
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
    }
  },
  getters: {
    getTasks(state2) {
      if (state2.tasks.status) {
        return state2.tasks.values;
      }
    },
    getTaskById: (state2) => (id) => {
      if (state2.tasks.status) {
        let i = state2.tasks.values.find((item) => item.id === parseInt(id));
        return i;
      }
    },
    getBranch: (state2) => (branchid) => {
      let i = state2.branchs.find((item) => item.id === parseInt(branchid));
      console.log("branch is: ", i);
      if (i === void 0) {
        return "部门";
      }
      return i["name"];
    },
    getTaskType: (state2) => (typeid) => {
      console.log("typeid is ", typeid);
      console.log("taskTypes are ", state2.taskTypes);
      let i = state2.taskTypes.find((item) => item.id === parseInt(typeid));
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
    getMessages: (state2) => {
      return state2.messages;
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
            common_vendor.nextTick$1(() => {
              commit("updateBranchs", data["$values"]);
            });
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
            common_vendor.nextTick$1(() => {
              commit("updateTaskTypes", data["$values"]);
            });
          }
          //  header:{
          // 'Access-Control-Allow-Origin': '*'
          //  }
        });
      } catch (error) {
        console.error("fetch updateTaskTypes error:", error);
      }
    },
    fetchTasks({ commit, state: state2 }, { count, offset }) {
      return new Promise((resolve, reject) => {
        common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Assignment?count=" + count + "&offset=" + offset,
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
              commit("setTasks", data["$values"]);
            });
          }
        });
      } catch (error) {
        console.error("fetch tasks error:", error);
      }
    },
    async sendMessage({ commit, state: state2 }, { user, message }) {
      await state2.workSocket.invoke("SendMessage", [user, message]);
      console.log("sendMessage");
      state2.messages.push(message);
    },
    receiveMessage({ commit, state: state2 }, { user, message }) {
      console.log("receiveMessage");
      state2.messages.push(message);
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
    }
  }
});
exports.store = store;
