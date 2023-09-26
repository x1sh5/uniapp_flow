"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      currentTypeId: "",
      taskTypeName: "全部"
    };
  },
  onLoad() {
    console.log("page index onload");
  },
  mounted() {
    this.$store.dispatch("fetchTasks", { count: 10, offset: 0, typeId: "" }).then((data) => {
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
    taskTypes() {
      let ts = this.$store.state.taskTypes;
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
      this.currentTypeId = id;
      this.taskTypeName = name;
      let url = this.$store.state.apiBaseUrl + "/api/Assignment/type/" + id;
      if (this.$store.state.tasks.get(this.taskTypeName).length === 0) {
        common_vendor.index.requestWithCookie({
          url,
          success: (res) => {
            console.log(res);
            if (res.statusCode === 200) {
              this.tasks = res.data;
            } else {
              common_vendor.index.showToast({
                title: "网络出错了！"
              });
            }
          }
        });
      }
    },
    inputEvent(e) {
      console.log(e);
    },
    changeEvent(e) {
      console.log(e);
    },
    modelChange(e) {
      console.log(e);
    }
  },
  //上拉更新数据
  onReachBottom() {
    let maxIndex = this.maxIndex;
    this.$store.dispatch("fetchTasks", { count: 10, offset: maxIndex, typeId: this.currentTypeId }).then((data) => {
      this.$store.commit("updateTasks", { taskTypeName: this.taskTypeName, data });
    }).catch((error) => {
      console.error("获取数据失败：", error);
    });
  },
  //下拉刷新页面
  async onPullDownRefresh() {
    await this.$store.dispatch("fetchBranchs");
    await this.$store.dispatch("fetchTaskTypes");
    this.$store.dispatch("fetchTasks", { count: 10, offset: 0, typeId: this.currentTypeId }).then((data) => {
      this.$store.commit("setTasks", { taskTypeName: this.taskTypeName, data });
    }).catch((error) => {
      console.error("获取数据失败：", error);
    });
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
        c: common_vendor.o(($event) => $options.searchByTpe(item.id, item.name), item.id)
      };
    }),
    d: common_vendor.f($options.tasks, (item, k0, i0) => {
      return {
        a: "4d84c736-1-" + i0,
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
