"use strict";
const common_vendor = require("../common/vendor.js");
const Messages = {
  namespaced: true,
  state: {
    //objs obj like {cid:int,unread:int,title:string,lasttime:datatime,message:string,mtype:default 1}
    $chatChannels: []
  },
  mutations: {
    addChat(state, payload) {
      if (payload) {
        state.$chatChannels.push(payload);
        common_vendor.index.setStorage({
          key: "cc" + payload.cid,
          data: payload
        });
      }
    },
    delete(state, payload) {
      let index = state.$chatChannels.findIndex((item) => item.cid == parseInt(payload.cid));
      if (index !== -1) {
        state.$chatChannels.splice(index, 1);
      }
    },
    update(state, payload) {
      let cco;
      let cc = state.$chatChannels.findIndex((item) => item.cid == parseInt(payload.cid));
      if (cc !== -1) {
        cco = state.$chatChannels[cc];
      }
      if (!cco) {
        this.commit("Msgs/addChat", payload);
        return;
      }
      if (payload && payload.title) {
        cco.title = payload.title;
      }
      if (payload && payload.date) {
        cco.date = payload.date;
      }
      if (payload && payload.content) {
        cco.content = payload.content;
      }
      if (cco.unread) {
        cco.unread += 1;
      } else {
        cco.unread = 1;
      }
    },
    getById(state, cid) {
      let cc = state.$chatChannels.findIndex((item) => item.cid == parseInt(cid));
      if (cc !== -1) {
        return state.$chatChannels[cc];
      }
      return null;
    },
    clearUnread(state, cid) {
      let cc = state.$chatChannels.findIndex((item) => item.cid == parseInt(cid));
      if (cc !== -1) {
        return state.$chatChannels[cc].unread = "";
      }
    },
    exists(state, cid) {
      let index = state.$chatChannels.findIndex((item) => item.cid == parseInt(cid));
      if (index !== -1) {
        return true;
      }
      return false;
    },
    initChatChannels(state) {
      const res = common_vendor.index.getStorageInfoSync();
      let ccs = res.keys.filter((item) => item.startsWith("cc"));
      for (let name of ccs) {
        state.$chatChannels.push(common_vendor.index.getStorageSync(name));
      }
    }
  },
  getters: {
    getCcById: (state) => (id) => {
    }
  },
  actions: {
    addChatAsync({ commit, state }, payload) {
      commit("addChat", payload);
    },
    deleteAsync({ commit, state }, payload) {
      commit("delete", payload);
    },
    updateAsync({ commit, state }, payload) {
      commit("update", payload);
    },
    getByIdAsync({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(
          () => {
            resolve(commit("getById", payload));
          },
          2e3
        );
      });
    },
    existsAsync({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(
          () => {
            resolve(commit("exists", payload));
          },
          2e3
        );
      });
    }
  }
};
exports.Messages = Messages;
