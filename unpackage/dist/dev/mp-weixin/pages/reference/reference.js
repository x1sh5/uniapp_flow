"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: {
    datas() {
      return this.$store.getters["Refer/refers"];
    }
  },
  methods: {
    detail(id) {
      common_vendor.index.navigateTo({
        url: "detail/detail?id=" + id
      });
    },
    newRefer(e) {
      common_vendor.index.navigateTo({
        url: "new/new"
      });
    }
  },
  onLoad() {
    let curl = this.$store.state.apiBaseUrl + "/api/Reference/count";
    let qurl = this.$store.state.apiBaseUrl + "/api/Reference/gets";
    common_vendor.index.request({
      url: curl,
      success: (res) => {
        common_vendor.index.requestWithCookie({
          url: qurl,
          method: "GET",
          success: (res2) => {
            this.$store.commit("Refer/updateRefers", res2.data);
          }
        });
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.datas, (d, k0, i0) => {
      return {
        a: common_vendor.t(d.title),
        b: d.id,
        c: common_vendor.o(($event) => $options.detail(d.id), d.id)
      };
    }),
    b: common_vendor.o((...args) => $options.newRefer && $options.newRefer(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/reference/reference.vue"]]);
wx.createPage(MiniProgramPage);
