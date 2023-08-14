"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      hasPushlishs: false,
      $publishs: []
    };
  },
  computed: {
    publishs() {
      return this.$data.$publishs;
    }
  },
  methods: {},
  onLoad() {
    if (!this.hasPushlishs) {
      console.log("get user task");
      common_vendor.index.requestWithCookie({
        url: this.$store.state.apiBaseUrl + "/api/Assignment/user",
        success: (res) => {
          this.$data.$publishs = res.data["$values"];
          this.hasPushlishs = true;
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_cardinfo2 = common_vendor.resolveComponent("cardinfo");
  _easycom_cardinfo2();
}
const _easycom_cardinfo = () => "../../components/cardinfo/cardinfo.js";
if (!Math) {
  _easycom_cardinfo();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.publishs, (item, k0, i0) => {
      return {
        a: "e0884de0-0-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false
        }),
        c: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/myPublishs/myPublishs.vue"]]);
wx.createPage(MiniProgramPage);
