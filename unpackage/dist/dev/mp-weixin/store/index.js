"use strict";
const common_vendor = require("../common/vendor.js");
const common_storageKeys = require("../common/storageKeys.js");
const store_messages = require("./messages.js");
const store_reference = require("./reference.js");
const signalR = require("../common/signalr.js");
const baseUrl = "https://www.liusha-gy.com";
const store = common_vendor.createStore({
  state: {
    $hasLogin: false,
    $userName: "未登录",
    useravatar: "/static/meactive.png",
    branchs: [],
    currentTask: {},
    taskTypes: [],
    apiBaseUrl: baseUrl,
    //"https://testsite:7221/api", 
    tasks: /* @__PURE__ */ new Map(),
    workSocket: common_vendor.markRaw(new signalR.HubConnectionBuilder().withUrl(baseUrl + "/chathub").withAutomaticReconnect().configureLogging(signalR.LogLevel.Error).build()),
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
      if (payload !== void 0) {
        state2.branchs = common_vendor.toRaw(payload);
      }
    },
    updateTaskTypes(state2, payload) {
      console.log("taskTypes:", payload);
      if (payload !== void 0) {
        state2.taskTypes = common_vendor.toRaw(payload);
      }
      state2.tasks.set("全部", []);
      if (typeof state2.taskTypes[Symbol.iterator] === "function") {
        for (let t of state2.taskTypes) {
          state2.tasks.set(t.name, []);
        }
      }
    },
    setTasks(state2, payload) {
      console.log("tasks:", payload);
      if (payload !== void 0) {
        let t = payload.taskTypeName;
        state2.tasks.set(t, payload.data);
      }
    },
    updateTasks(state2, payload) {
      console.log("tasks:", payload);
      if (payload !== void 0) {
        let t = payload.taskTypeName;
        state2.tasks.get(t).push(...payload.data);
      }
    },
    updateTaskById(state2, payload) {
      let task = null;
      for (let [key, value] of state2.tasks) {
        for (let item of value) {
          if (item.id === parseInt(id)) {
            task = item;
            break;
          }
        }
      }
      if (task != null) {
        let qurl = state2.apiBaseUrl + "/api/Assignment/" + payload;
        common_vendor.index.requestWithCookie({
          url: qurl,
          success: (res) => {
            if (res.statusCode === 200) {
              task = res.data;
            }
          }
        });
      }
    },
    updateLocalTask(payload) {
      for (let item of $publishs) {
        if (item.id === parseInt(payload.id)) {
          break;
        }
      }
    },
    login(state2) {
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.hasLogin, true);
      state2.$hasLogin = true;
    },
    loginOut(state2) {
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.hasLogin, false);
      state2.$hasLogin = false;
    },
    setUserName(state2, payload) {
      state2.$userName = payload;
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.userName, payload);
    },
    setUserAvatar(state2, payload) {
      state2.useravatar = payload;
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.userAvatar, payload);
    },
    initUserInfo: (state2) => {
      try {
        const userName = common_vendor.index.getStorageSync(common_storageKeys.StorageKeys.userName);
        state2.$userName = userName;
        const useravatar = common_vendor.index.getStorageSync(common_storageKeys.StorageKeys.userAvatar);
        state2.useravatar = useravatar;
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
    //设置正在编辑的任务中的description
    setEditContent(state2, payload) {
      state2.$currentContent = payload;
    },
    setPublishResults(state2, payload) {
      if (payload !== void 0) {
        state2.$publishResults = payload;
      }
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
      common_vendor.index.removeStorageSync(common_storageKeys.StorageKeys.hasLogin);
      common_vendor.index.removeStorageSync(common_storageKeys.StorageKeys.userName);
      common_vendor.index.removeStorageSync(common_storageKeys.StorageKeys.cookies);
      common_vendor.index.removeStorageSync(common_storageKeys.StorageKeys.taskContent);
    },
    disconnect(state2) {
      state2.workSocket.stop();
    }
  },
  getters: {
    getTasks: (state2) => (taskTypeName) => {
      return state2.tasks.get(taskTypeName);
    },
    getTaskById: (state2) => (id2) => {
      let task = null;
      for (let [key, value] of state2.tasks) {
        for (let item of value) {
          if (item.id === parseInt(id2)) {
            task = item;
            break;
          }
        }
      }
      if (task != null) {
        return task;
      }
      return void 0;
    },
    getBranch: (state2) => (branchid) => {
      let i = state2.branchs.find((item) => item.id === parseInt(branchid));
      console.log("branch is: ", i);
      if (i === void 0) {
        return "部门";
      }
      return i["name"];
    },
    //deprecated 弃用
    getTaskType: (state2) => (typeId) => {
      let i = state2.taskTypes.find((item) => item.id === parseInt(typeId));
      console.log("taskType is: ", i);
      if (i === void 0) {
        return { id: 0, name: "类型", "rewardType": "all" };
      }
      return i;
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
    },
    hasLogin: (state2) => (p = 1) => {
      let Login;
      try {
        Login = common_vendor.index.getStorageSync(common_storageKeys.StorageKeys.hasLogin);
      } catch (e) {
        Login = false;
        console.error(e);
      }
      return Login;
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
      return new Promise((resolve, reject) => {
        common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Information/customtypes",
          method: "GET",
          complete() {
          },
          success: function(res) {
            console.log(res);
            let data = res.data;
            resolve(data);
          }
        });
      });
    },
    fetchTasks({ commit, state: state2 }, { count, offset, branchid }) {
      return new Promise((resolve, reject) => {
        common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Assignment?count=" + count + "&offset=" + offset + "&branchid=" + branchid,
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
    async fetchTaskById({ commit }, id2) {
      let qurl = state.apiBaseUrl + "/api/Assignment/" + id2;
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
    //判断是否登录
    loginTest({ state: state2 }) {
      return new Promise((resolve, reject) => {
        common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Account/loginTest",
          method: "HEAD",
          success: (res) => {
            console.log(res);
            if (res.statusCode === 200) {
              resolve();
            } else {
              reject();
            }
          },
          fail: (err) => {
            reject();
          }
        });
      });
    },
    genHistory({ state: state2 }, id2) {
      let qurl = state2.apiBaseUrl + "/api/History";
      common_vendor.index.uploadFileWithCookie({
        url: qurl,
        filePath: "123",
        // 随便填，不为空即可  
        name: "123",
        // 随便填，不为空即可  
        //header: header, // 可以加access_token等  
        formData: { asgid: id2 },
        // 接口参数，json格式，底层自动转为FormData的格式数据  
        success: (res) => {
          console.log(res);
        }
      });
    },
    upload({ state: state2 }) {
      return new Promise((resolve, reject) => {
        common_vendor.index.showActionSheet({
          itemList: ["选择文件"],
          success: (e) => {
            console.log(e);
            if (e.tapIndex === 0) {
              common_vendor.index.chooseImage({
                count: 1,
                crop: {
                  with: 800,
                  height: 800
                },
                success: (e2) => {
                  console.log(e2);
                  if (e2.tempFiles[0].size > 2 * 1024 * 1024) {
                    common_vendor.index.showToast({
                      title: "图片大小超过2M,请重新选择。"
                    });
                    return;
                  }
                  common_vendor.index.uploadFile({
                    name: "user-avatar",
                    filePath: e2.tempFilePaths[0],
                    url: state2.apiBaseUrl + "/api/Image/upload",
                    success: (res) => {
                      resolve(res);
                    },
                    fail: (err) => {
                    }
                  });
                },
                fail: (err) => {
                  reject(err);
                }
              });
            }
          }
        });
      });
    }
  },
  modules: {
    Msgs: store_messages.Messages,
    Refer: store_reference.References
  }
});
exports.store = store;
