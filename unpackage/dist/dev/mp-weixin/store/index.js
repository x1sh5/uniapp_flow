"use strict";
const common_vendor = require("../common/vendor.js");
const common_storageKeys = require("../common/storageKeys.js");
const store_messages = require("./messages.js");
const store_reference = require("./reference.js");
const store_contentUrl = require("./contentUrl.js");
const store_filecache = require("./filecache.js");
const common_const = require("../common/const.js");
new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "console" has been externalized for browser compatibility. Cannot access "console.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
const signalR = require("../common/signalr.js");
const store = common_vendor.createStore({
  state: {
    $hasLogin: false,
    $userName: "未登录",
    userid: void 0,
    introduce: "",
    useravatar: "/static/meactive.png",
    branchs: [],
    openid: "",
    currentTask: {},
    taskTypes: [],
    //未读信息
    unread: 0,
    apiBaseUrl: common_const.baseUrl,
    //"https://testsite:7221/api", 
    tasks: /* @__PURE__ */ new Map(),
    workSocket: common_vendor.markRaw(new signalR.HubConnectionBuilder().withUrl(common_const.baseUrl + "/chathub").withAutomaticReconnect().configureLogging(signalR.LogLevel.Critical).build()),
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
      if (payload !== void 0) {
        state2.branchs = common_vendor.toRaw(payload);
      }
    },
    updateTaskTypes(state2, payload) {
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
      if (payload !== void 0) {
        let t = payload.taskTypeName;
        state2.tasks.set(t, payload.data);
      }
    },
    updateTasks(state2, payload) {
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
    setUserId(state2, id2) {
      state2.userid = parseInt(id2);
    },
    setUserAvatar(state2, payload) {
      state2.useravatar = payload;
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.userAvatar, payload);
    },
    setIntroduce(state2, payload) {
      state2.introduce = payload;
      common_vendor.index.setStorageSync(common_storageKeys.StorageKeys.introduce, payload);
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
      common_vendor.index.removeStorageSync(common_storageKeys.StorageKeys.isActive);
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
      if (i === void 0) {
        return "部门";
      }
      return i["name"];
    },
    //deprecated 弃用
    getTaskType: (state2) => (typeId) => {
      let i = state2.taskTypes.find((item) => item.id === parseInt(typeId));
      if (i === void 0) {
        return {
          id: 0,
          name: "类型",
          "rewardType": "all"
        };
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
    },
    //是否已经通过验证
    IsActive: () => {
      let Login;
      try {
        Login = common_vendor.index.getStorageSync(common_storageKeys.StorageKeys.isActive);
      } catch (e) {
        Login = false;
        console.error(e);
      }
      return Login;
    }
  },
  actions: {
    //获取部门信息
    async fetchBranchs({
      commit,
      state: state2
    }) {
      try {
        const response = await common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Information/branchs",
          method: "GET",
          complete() {
          },
          success: function(res) {
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
    async fetchTaskTypes({
      commit,
      state: state2
    }) {
      return new Promise((resolve, reject) => {
        common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Information/customtypes",
          method: "GET",
          complete() {
          },
          success: function(res) {
            let data = res.data;
            resolve(data);
          }
        });
      });
    },
    fetchTasks({
      commit,
      state: state2
    }, {
      count,
      offset,
      branchid
    }) {
      return new Promise((resolve, reject) => {
        common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Assignment?count=" + count + "&offset=" + offset + "&branchid=" + branchid,
          method: "GET",
          success: (res) => {
            let data = res.data;
            resolve(data);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    async fetchTaskById({
      commit
    }, id2) {
      let qurl = state.apiBaseUrl + "/api/Assignment/" + id2;
      try {
        const response = await common_vendor.index.requestWithCookie({
          url: qurl,
          method: "GET",
          success: function(res) {
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
    async sendMsg({
      commit,
      state: state2
    }, { user, message, contentType, fileName }) {
      await state2.workSocket.invoke("SendToUser", user, message, contentType, fileName);
      let userId = parseInt(user);
      let chat = state2.messages.get(userId);
      if (typeof chat === "undefined") {
        state2.messages.set(userId, new Array());
      }
      state2.messages.get(userId).push({
        isLeft: false,
        content: message
      });
    },
    receiveMsg({ commit, state: state2, dispatch }, { user, message }) {
      state2.unread += 1;
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: state2.unread
      });
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
    //对话消息
    async eachMsg({ state: state2 }, { message }) {
      let cid = parseInt(message.to);
      if (cid == state2.userid) {
        cid = parseInt(message.from);
      }
      message.cid = cid;
      let chat = state2.messages.get(cid);
      if (typeof chat === "undefined") {
        state2.messages.set(cid, new Array());
      }
      if (message.to == state2.userId) {
        message.isLeft = true;
      } else {
        message.isLeft = false;
      }
      state2.messages.get(cid).push(message);
    },
    unreadChange({
      state: state2
    }, count) {
      state2.unread -= count;
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: state2.unread
      });
    },
    async connect({
      state: state2,
      actions
    }) {
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
    loginTest({
      state: state2
    }) {
      return new Promise((resolve, reject) => {
        common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/Account/loginTest",
          method: "HEAD",
          success: (res) => {
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
    genHistory({
      state: state2
    }, id2) {
      let qurl = state2.apiBaseUrl + "/api/History";
      common_vendor.index.requestWithCookie({
        url: qurl,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          asgid: id2
        },
        // 接口参数，json格式，底层自动转为FormData的格式数据  
        success: (res) => {
          console.log(res.statusCode);
        }
      });
    },
    getOpenid({ state: state2 }) {
      common_vendor.wx$1.login({
        success: (res) => {
          if (res.code) {
            common_vendor.index.requestWithCookie({
              url: state2.apiBaseUrl + "/api/Bill/openId?code=" + res.code,
              success: (result) => {
                if (result.statusCode === 200) {
                  state2.openid = result.data;
                }
              }
            });
          }
        }
      });
    },
    upload({
      state: state2
    }, path = "upload") {
      return new Promise((resolve, reject) => {
        common_vendor.index.showActionSheet({
          itemList: ["选择文件"],
          success: (e) => {
            if (e.tapIndex === 0) {
              common_vendor.wx$1.chooseMessageFile({
                count: 1,
                type: "image",
                success: (res) => {
                  let fileinfo = res.tempFiles[0];
                  if (fileinfo.size > 2 * 1024 * 1024) {
                    common_vendor.index.showToast({
                      title: "图片大小超过2M,请重新选择。"
                    });
                    return;
                  }
                  let fmana = common_vendor.wx$1.getFileSystemManager();
                  fmana.readFile({ filePath: fileinfo.path, success: (file) => {
                    fileinfo.data = file.data;
                    uploadFile(fileinfo, "images/", (resl) => {
                      if (res.statusCode === 200) {
                        let data = JSON.parse(res.data);
                        let imgurl = this.$store.state.apiBaseUrl + data.url;
                        this.$store.commit("setUserAvatar", imgurl);
                        common_vendor.index.requestWithCookie({
                          url: this.$store.state.apiBaseUrl + "/api/AuthUser/setavatar?avatar=" + encodeURIComponent(imgurl),
                          method: "POST",
                          success: () => {
                          }
                        });
                      }
                    });
                  } });
                },
                fail: (err) => {
                  console.log(err);
                }
              });
            }
          }
        });
      });
    },
    activeValidate({
      state: state2,
      getters
    }) {
      let isActive = getters.isActive;
      if (!isActive) {
        common_vendor.index.requestWithCookie({
          url: state2.apiBaseUrl + "/api/IdentityInfo/validate",
          success: (res) => {
            if (res.statusCode == 200) {
              common_vendor.index.setStorage({
                key: common_storageKeys.StorageKeys.isActive,
                data: true
              });
            }
          }
        });
      }
    }
  },
  modules: {
    Msgs: store_messages.Messages,
    Refer: store_reference.References,
    UrlCache: store_contentUrl.ContentUrlCache,
    FileCache: store_filecache.FileCache
  }
});
exports.store = store;
