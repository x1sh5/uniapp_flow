"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      common_vendor.index.navigateTo({
        url: "/pages/myTaskDetail/myTaskDetail?refer=newtask&id=" + this.results[0].id
      });
    }, 1e3);
  },
  methods: {},
  computed: {
    results() {
      return this.$store.getters.publishResults;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.results, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.message),
        b: item
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/publishResult/publishResult.vue"]]);
wx.createPage(MiniProgramPage);
