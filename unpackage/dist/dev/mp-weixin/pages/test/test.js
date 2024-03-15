"use strict";
const common_vendor = require("../../common/vendor.js");
const common_ossutil = require("../../common/ossutil.js");
require("../../common/const.js");
const _sfc_main = {
  data() {
    return {
      ws: "",
      url: null
    };
  },
  methods: {
    chooseFile(e) {
      common_vendor.wx$1.chooseMessageFile({
        count: 10,
        success: (e2) => {
          let fmana = common_vendor.wx$1.getFileSystemManager();
          for (let fileinfo of e2.tempFiles) {
            fmana.readFile({ filePath: fileinfo.path, success: (file) => {
              console.log(file);
              fileinfo.data = file.data;
              common_ossutil.uploadFile(fileinfo);
            } });
          }
        }
      });
    }
  },
  onLoad() {
  },
  onShow() {
    if (!this.url) {
      common_ossutil.ossGetUrl("/sdfsdafasdf/IMG_20190119_144633_1.jpg").then((url) => {
        console.log(url);
        this.url = url;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.ws),
    b: $data.url,
    c: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
