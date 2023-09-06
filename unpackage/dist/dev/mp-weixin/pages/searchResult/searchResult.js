"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      searchWord: "",
      tasks: []
    };
  },
  onLoad() {
    console.log("page index onload");
  },
  computed: {},
  methods: {
    search(e) {
      let searchWord = e.value;
      common_vendor.index.requestWithCookie({
        url: this.$store.state.apiBaseUrl + "/api/Assignment/search/" + encodeURI(searchWord),
        success: (res) => {
          if (res.statusCode === 200) {
            this.tasks = res.data.$values;
          } else {
            common_vendor.index.showToast({
              title: "网络出错！"
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_cardinfo2 = common_vendor.resolveComponent("cardinfo");
  (_easycom_uni_search_bar2 + _easycom_cardinfo2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_cardinfo = () => "../../components/cardinfo/cardinfo.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_cardinfo)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.search),
    b: common_vendor.p({
      radius: "5",
      placeholder: "搜索任务",
      value: $data.searchWord,
      focus: "true",
      clearButton: "auto",
      cancelButton: "none"
    }),
    c: common_vendor.f($data.tasks, (item, k0, i0) => {
      return {
        a: "42edecf4-1-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false,
          mode: "waitfor"
        }),
        c: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/searchResult/searchResult.vue"]]);
wx.createPage(MiniProgramPage);
