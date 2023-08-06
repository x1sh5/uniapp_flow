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
  computed: {
    tasks: {
      get() {
        console.log("index tasks:", this.$store.getters.getTasks);
        return this.$store.getters.getTasks;
      },
      set(value) {
        this.$store.commit("updateTasks", value);
      }
    },
    taskTypes() {
      let ts = this.$store.state.taskTypes;
      return [{ id: "", name: "全部" }, ...ts];
    }
  },
  methods: {
    search(e) {
      console.log("confirm:", e);
      e.value;
      common_vendor.index.navigateTo({
        url: "/pages/searchResult/searchResult"
      });
    },
    //requestWithCookie
    searchByTpe(id) {
      let url = this.$store.state.apiBaseUrl + "/api/Assignment/type/" + id;
      common_vendor.index.requestWithCookie({
        url,
        success: (res) => {
          console.log(res);
          if (res.statusCode === 200) {
            this.tasks = res.data.$values;
          } else {
            common_vendor.index.showToast({
              title: "网络出错了！"
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
      clearButton: "auto",
      cancelButton: "none"
    }),
    c: common_vendor.f($options.taskTypes, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: common_vendor.o(($event) => $options.searchByTpe(item.id), item.id)
      };
    }),
    d: common_vendor.f($options.tasks, (item, k0, i0) => {
      return {
        a: "0c9de768-1-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false
        }),
        c: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
