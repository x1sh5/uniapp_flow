"use strict";
const common_vendor = require("../common/vendor.js");
require("../signalr_for_uniapp/FetchHttpClient.js");
require("../signalr_for_uniapp/Utils.js");
const signalr_for_uniapp_ILogger = require("../signalr_for_uniapp/ILogger.js");
require("../signalr_for_uniapp/HubConnection.js");
const signalr_for_uniapp_HubConnectionBuilder = require("../signalr_for_uniapp/HubConnectionBuilder.js");
require("../signalr_for_uniapp/IHubProtocol.js");
require("../signalr_for_uniapp/ITransport.js");
require("../signalr_for_uniapp/Loggers.js");
require("../signalr_for_uniapp/TextMessageFormat.js");
const baseUrl = "https://www.wangyan.net";
const store = common_vendor.createStore({
  state: {
    hasLogin: false,
    branchs: [],
    taskTypes: [],
    apiBaseUrl: baseUrl,
    //"https://testsite:7221/api", 
    tasks: {
      status: false,
      values: []
    },
    workSocket: new signalr_for_uniapp_HubConnectionBuilder.HubConnectionBuilder().withUrl(baseUrl + "/chathub").configureLogging(signalr_for_uniapp_ILogger.LogLevel.Information).build(),
    messages: []
  },
  mutations: {
    updateBranchs(state, payload) {
      console.log("branchs:", payload);
      state.branchs = common_vendor.toRaw(payload);
    },
    updateTaskTypes(state, payload) {
      console.log("taskTypes:", payload);
      state.taskTypes = common_vendor.toRaw(payload);
    },
    updateTasks(state, payload) {
      console.log("tasks:", payload);
      state.tasks.status = true;
      state.tasks.values = payload;
    },
    changeLoginState(state) {
      state.hasLogin = !state.hasLogin;
    },
    updateMessage(state, payload) {
      state.messages.push(payload);
    }
  },
  getters: {
    getTasks(state) {
      if (state.tasks.status) {
        return state.tasks.values;
      }
    },
    getTaskById: (state) => (id) => {
      if (state.tasks.status) {
        let i = state.tasks.values.find((item) => item.id === parseInt(id));
        return i;
      }
    },
    getBranch: (state) => (branchid) => {
      let i = state.branchs.find((item) => item.id === parseInt(branchid));
      console.log("branch is: ", i);
      if (i === void 0) {
        return "部门";
      }
      return i["name"];
    },
    getTaskType: (state) => (typeid) => {
      console.log("typeid is ", typeid);
      console.log("taskTypes are ", state.taskTypes);
      let i = state.taskTypes.find((item) => item.id === parseInt(typeid));
      console.log("taskType is: ", i);
      if (i === void 0) {
        return "类型";
      }
      return i["name"];
    },
    getBranchIndex: (state) => (branchid) => {
      let i = state.branchs.findIndex((item) => item.id === branchid);
      if (i === void 0) {
        return 0;
      }
      return i;
    },
    getMessages: (state) => {
      return state.messages;
    }
  },
  actions: {
    //获取部门信息
    async fetchBranchs({ commit, state }) {
      try {
        const response = await common_vendor.index.requestWithCookie({
          url: state.apiBaseUrl + "/api/Information/branchs",
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
    async fetchTaskTypes({ commit, state }) {
      try {
        const response = await common_vendor.index.requestWithCookie({
          url: state.apiBaseUrl + "/api/Information/customtypes",
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
    async fetchTasks({ commit, state }) {
      try {
        const response = await common_vendor.index.requestWithCookie({
          url: state.apiBaseUrl + "/api/Assignment",
          method: "GET",
          success: function(res) {
            console.log(res);
            let data = res.data;
            common_vendor.nextTick$1(() => {
              commit("updateTasks", data["$values"]);
            });
          },
          complete() {
          }
          //  header:{
          // 'Access-Control-Allow-Origin': '*'
          //  }
        });
      } catch (error) {
        console.error("fetch tasks error:", error);
      }
    },
    fetchTaskById({ commit }, id) {
    },
    async sendMessage({ commit, state }, { user, message }) {
      await state.workSocket.invoke("SendMessage", user, message);
      state.messages.push(message);
    },
    async connect({ state, actions }) {
      try {
        await state.workSocket.start();
        console.log("SignalR Connected.");
      } catch (err) {
        console.log(err);
        setTimeout(actions.connect, 5e3);
      }
    }
  }
});
exports.store = store;
