"use strict";
const FileCache = {
  namespaced: true,
  state: {
    filename: [],
    filePath: []
  },
  getters: {
    getFile: (state) => (name2) => {
      name2 = name2.split("?")[0];
      name2 = name2.split("https://liusha-images.oss-cn-chengdu.aliyuncs.com/")[1];
      let index = state.filename.findIndex((fname) => fname == name2);
      if (index != -1) {
        return state.filePath[index];
      }
      return void 0;
    }
  },
  mutations: {
    add(state, fname, fpath) {
      fname = fname.split("?")[0];
      fname = fname.split("https://liusha-images.oss-cn-chengdu.aliyuncs.com/")[1];
      let index = state.filename.findIndex((name2) => name2 == fname);
      if (index != -1) {
        state.filePath[index] = fpath;
      } else {
        if (state.filename.length > 40) {
          state.filename.shift();
          state.filePath.shift();
        }
      }
    },
    remove(state, fname) {
      let index = state.filename.findIndex((fname2) => fname2 == name);
      if (index != -1) {
        state.filename.splice(index, 1);
        state.filePath.splice(index, 1);
      }
    }
  },
  actions: {}
};
exports.FileCache = FileCache;
