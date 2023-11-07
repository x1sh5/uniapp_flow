"use strict";
const References = {
  namespaced: true,
  state: {
    datas: new Array()
  },
  getters: {
    refers(state) {
      return state.datas;
    },
    getReferById: (state) => (id) => {
      let r = state.datas.find((item) => item.id === parseInt(id));
      if (r !== void 0) {
        return r;
      }
    }
  },
  mutations: {
    updateRefers(state, payload) {
      if (payload) {
        state.datas = payload;
      }
    }
  },
  actions: {}
};
exports.References = References;
