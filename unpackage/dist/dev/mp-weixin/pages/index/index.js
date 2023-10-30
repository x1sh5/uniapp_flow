"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      curBranchid: "",
      taskTypeName: "全部",
      status: "more",
      contentText: { contentdown: "上拉显示更多", contentrefresh: "正在加载...", contentnomore: "没有更多数据了" }
    };
  },
  onLoad() {
    console.log("page index onload");
  },
  mounted() {
    this.$store.dispatch("fetchTasks", { count: 10, offset: 0, branchid: "" }).then((data) => {
      this.$store.commit("setTasks", { taskTypeName: "全部", data });
    }).catch((error) => {
      console.error("获取数据失败：", error);
    });
  },
  computed: {
    tasks: {
      get() {
        return this.$store.getters.getTasks(this.taskTypeName);
      },
      set(value) {
        this.$store.commit("setTasks", { taskTypeName: this.taskTypeName, data: value });
      }
    },
    branchTypes() {
      let ts = this.$store.state.branchs;
      return [{ id: "", name: "全部" }, ...ts];
    },
    total() {
      return this.$data.$total;
    },
    maxIndex() {
      if (this.tasks.length > 0) {
        return this.tasks[this.tasks.length - 1].id;
      }
      return 0;
    },
    showmore() {
      return this.tasks && this.tasks.length > 0;
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
    searchByTpe(id, name) {
      this.curBranchid = id;
      this.taskTypeName = name;
      this.updateData();
    },
    inputEvent(e) {
      console.log(e);
    },
    changeEvent(e) {
      console.log(e);
    },
    modelChange(e) {
      console.log(e);
    },
    backtotop(e) {
      common_vendor.index.pageScrollTo({
        selector: "#app",
        scrollTop: 0
      });
    },
    updateData() {
      let maxIndex = this.maxIndex;
      this.status = "loading";
      this.$store.dispatch("fetchTasks", { count: 10, offset: maxIndex, branchid: this.curBranchid }).then((data) => {
        this.$store.commit("updateTasks", { taskTypeName: this.taskTypeName, data });
        this.status = "more";
      }).catch((error) => {
        console.error("获取数据失败：", error);
      });
    }
  },
  //上拉更新数据
  onReachBottom() {
    this.updateData();
  },
  //下拉刷新页面
  async onPullDownRefresh() {
    await this.$store.dispatch("fetchBranchs");
    await this.$store.dispatch("fetchTaskTypes");
    this.$store.dispatch("fetchTasks", { count: 10, offset: 0, branchid: this.curBranchid }).then((data) => {
      this.$store.commit("setTasks", { taskTypeName: this.taskTypeName, data });
    }).catch((error) => {
      console.error("获取数据失败：", error);
    });
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_cardinfo2 = common_vendor.resolveComponent("cardinfo");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_search_bar2 + _easycom_cardinfo2 + _easycom_uni_load_more2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_cardinfo = () => "../../components/cardinfo/cardinfo.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_cardinfo + _easycom_uni_load_more)();
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
    c: common_vendor.f($options.branchTypes, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: common_vendor.o(($event) => $options.searchByTpe(item.id, item.name), item.id)
      };
    }),
    d: common_vendor.f($options.tasks, (item, k0, i0) => {
      return {
        a: "427cab31-1-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false,
          mode: "waitfor"
        }),
        c: item.id
      };
    }),
    e: $options.showmore,
    f: common_vendor.p({
      iconType: "auto",
      contentText: $data.contentText,
      status: $data.status
    }),
    g: common_vendor.o((...args) => $options.backtotop && $options.backtotop(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/Beifen/20230512流沙小程序开发/新建文件夹 (7)/uniapp_flow/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
