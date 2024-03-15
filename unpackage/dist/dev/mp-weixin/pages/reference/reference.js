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
    },
    search(e) {
      e.value;
      common_vendor.index.navigateTo({
        url: "/pages/searchResult/searchResult"
      });
    }
  },
  searchByTpe(id, name) {
    if (id === "") {
      this.currentTab = 0;
    } else {
      this.currentTab = id;
    }
    this.curBranchid = id;
    this.taskTypeName = name;
    this.updateData();
  },
  onLoad() {
    let curl = this.$store.state.apiBaseUrl + "/api/Reference/count";
    let qurl = this.$store.state.apiBaseUrl + "/api/Reference/gets?count=10&offset=0";
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
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.search),
    b: common_vendor.p({
      radius: "5",
      placeholder: "搜索任务",
      clearButton: "auto",
      cancelButton: "none"
    }),
    c: common_vendor.f($options.datas, (d, k0, i0) => {
      return {
        a: common_vendor.t(d.title),
        b: d.id,
        c: common_vendor.o(($event) => $options.detail(d.id), d.id)
      };
    }),
    d: common_vendor.o((...args) => $options.newRefer && $options.newRefer(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/reference/reference.vue"]]);
wx.createPage(MiniProgramPage);
