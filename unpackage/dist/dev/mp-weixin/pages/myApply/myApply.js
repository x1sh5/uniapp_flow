"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      myreqs: []
    };
  },
  computed: {
    taskType(id) {
      return this.$store.getters.getTaskType(id);
    }
  },
  methods: {},
  onLoad() {
    let qurl = this.$store.state.apiBaseUrl + "/api/TaskRequest/myapply";
    common_vendor.index.requestWithCookie({
      url: qurl,
      success: (res) => {
        if (res.statusCode == 200) {
          this.myreqs = res.data;
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
    a: common_vendor.f($data.myreqs, (item, k0, i0) => {
      return {
        a: "2fc27696-0-" + i0,
        b: common_vendor.p({
          simpleInfo: item,
          showbutton: false
        }),
        c: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/myApply/myApply.vue"]]);
wx.createPage(MiniProgramPage);
