"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  mounted() {
  },
  onLoad(e) {
  },
  methods: {
    detail(e) {
      common_vendor.index.navigateTo({
        url: "/pages/myTaskDetail/myTaskDetail?refer=newtask&id=" + this.results[0].id
      });
    },
    flush(e) {
      common_vendor.index.switchTab({
        url: "/pages/addtask/addtaskView"
      });
    }
  },
  computed: {
    results() {
      return this.$store.getters.publishResults;
    },
    success() {
      return !this.results[0].id == void 0;
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
    }),
    b: common_vendor.o((...args) => $options.flush && $options.flush(...args)),
    c: $options.success,
    d: common_vendor.o((...args) => $options.detail && $options.detail(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/publishResult/publishResult.vue"]]);
wx.createPage(MiniProgramPage);
