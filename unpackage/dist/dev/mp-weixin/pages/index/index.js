"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
    console.log("page index onload");
  },
  created() {
    console.log(this.$store);
    this.$store.commit("getBranchs");
    this.$store.commit("getTaskTypes");
    try {
      if (!this.$store.state.tasks.status) {
        this.$store.commit("getTasks");
      }
    } catch (error) {
      console.error("Error getting data from the API:", error);
    }
  },
  computed: {
    tasks: {
      get() {
        console.log("index tasks:", this.$store.getters.fetchTasks);
        return this.$store.getters.fetchTasks;
      },
      set(value) {
        this.$store.commit("getTasks", value);
      }
    }
  },
  methods: {}
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
    a: common_vendor.o(_ctx.search),
    b: common_vendor.p({
      radius: "5",
      placeholder: "搜索任务",
      clearButton: "auto",
      cancelButton: "none"
    }),
    c: common_vendor.f($options.tasks, (item, k0, i0) => {
      return {
        a: "4d84c736-1-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false
        }),
        c: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
