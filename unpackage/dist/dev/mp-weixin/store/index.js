"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    hasLogin: false,
    branchs: [],
    taskTypes: [],
    apiBaseUrl: "https://localhost:7221/api",
    tasks: {
      status: false,
      values: []
    }
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
    }
  },
  getters: {
    getTasks(state) {
      if (state.tasks.status) {
        return state.tasks.values;
      }
    },
    getBranch: (state) => (branchid) => {
      let i = state.branchs.find((item) => item.id === branchid);
      console.log("branch is: ", i);
      if (i === void 0) {
        return "部门";
      }
      return i["name"];
    },
    getTaskType: (state) => (typeid) => {
      let i = state.taskTypes.find((item) => item.id === typeid);
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
    }
  },
  actions: {
    //获取部门信息
    async fetchBranchs({ commit, state }) {
      try {
        const response = await common_vendor.index.request({
          url: state.apiBaseUrl + "/Information/branchs",
          method: "GET"
        });
        const data = response.data;
        commit("updateBranchs", data["$values"]);
      } catch (error) {
        console.error("fetch branchs error:", error);
      }
    },
    //获取任务类型信息
    async fetchTaskTypes({ commit, state }) {
      try {
        const response = await common_vendor.index.request({
          url: state.apiBaseUrl + "/Information/customtypes",
          method: "GET"
        });
        const data = response.data;
        commit("updateTaskTypes", data["$values"]);
      } catch (error) {
        console.error("fetch updateTaskTypes error:", error);
      }
    },
    async fetchTasks({ commit, state }) {
      try {
        const response = await common_vendor.index.request({
          url: state.apiBaseUrl + "/Assignment",
          method: "GET"
        });
        const data = response.data;
        commit("updateTasks", data["$values"]);
      } catch (error) {
        console.error("fetch tasks error:", error);
      }
    },
    fetchTaskById({ commit }, id) {
    }
  }
});
exports.store = store;
