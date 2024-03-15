"use strict";
const common_weappCookie = require("../../common/weapp-cookie.js");
const common_const = require("../../common/const.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      url: null,
      loaded: false
    };
  },
  methods: {},
  onLoad(param) {
    let domain = common_const.baseUrl.split("/")[2].split(":")[0];
    let cookie = common_weappCookie.cookieManager.default.getRequestQueries(domain, "/");
    this.url = common_const.baseUrl + "/api/Assignment/content/" + param.id + "?" + cookie;
  },
  onReady() {
    if (!this.loaded) {
      this.loaded = true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.loaded
  }, $data.loaded ? {
    b: $data.url
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/taskContent/taskContent.vue"]]);
wx.createPage(MiniProgramPage);
