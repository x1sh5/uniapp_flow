"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      a: "2",
      $taskTypes: []
    };
  },
  computed: {
    taskTypes() {
      return this.$store.state.taskTypes;
    }
  },
  methods: {
    editTask(e) {
      console.log(e);
      common_vendor.index.navigateTo({
        url: "/pages/newTask/newTask?typeid=" + e
      });
    }
  },
  async created() {
    console.log("addtask create");
  },
  onLoad() {
    console.log("onload");
  },
  onShow() {
    console.log("onshow");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.taskTypes, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: common_vendor.o(($event) => $options.editTask(`${item.id}`), item.id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/addtask/addtask.vue"]]);
wx.createPage(MiniProgramPage);
