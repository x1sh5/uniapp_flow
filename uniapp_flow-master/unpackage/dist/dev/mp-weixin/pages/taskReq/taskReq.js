"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      reqs: []
    };
  },
  onLoad() {
    let qurl = this.$store.state.apiBaseUrl + "/api/TaskRequest/applytome";
    common_vendor.index.requestWithCookie({
      url: qurl,
      success: (res) => {
        if (res.statusCode == 200) {
          this.reqs = res.data;
        }
      }
    });
  }
};
if (!Array) {
  const _easycom_simpleCard2 = common_vendor.resolveComponent("simpleCard");
  _easycom_simpleCard2();
}
const _easycom_simpleCard = () => "../../components/simpleCard/simpleCard.js";
if (!Math) {
  _easycom_simpleCard();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.reqs, (item, k0, i0) => {
      return {
        a: "cb6a9302-0-" + i0,
        b: common_vendor.p({
          simpleInfo: item
        }),
        c: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/Beifen/20230512流沙小程序开发/新建文件夹 (7)/uniapp_flow/pages/taskReq/taskReq.vue"]]);
wx.createPage(MiniProgramPage);
