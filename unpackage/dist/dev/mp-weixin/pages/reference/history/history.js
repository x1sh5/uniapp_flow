"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      versions: []
    };
  },
  methods: {
    detail(v) {
      common_vendor.index.navigateTo({
        url: "detail/detail?refer=" + JSON.stringify(v)
      });
    }
  },
  onLoad(op) {
    this.id = op.id;
    let qurl = this.$store.state.apiBaseUrl + "/api/Reference/history/" + this.id;
    common_vendor.index.requestWithCookie({
      url: qurl,
      success: (res) => {
        if (res.statusCode === 200) {
          this.versions = res.data;
        }
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.versions, (d, k0, i0) => {
      return {
        a: common_vendor.t(d.title),
        b: common_vendor.t(d.editTime),
        c: d.id,
        d: common_vendor.o(($event) => $options.detail(d), d.id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/reference/history/history.vue"]]);
wx.createPage(MiniProgramPage);
