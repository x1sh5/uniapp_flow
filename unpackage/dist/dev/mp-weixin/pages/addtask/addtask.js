"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      a: "2",
      $taskTypes: [],
      ctype: [
        { text: "单卡", value: 0 },
        { text: "多卡", value: 1 }
      ],
      defaultT: 0
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
    },
    createTask(e) {
      console.log("createTask");
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
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  (_easycom_uni_data_checkbox2 + _easycom_uni_data_select2)();
}
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
if (!Math) {
  (_easycom_uni_data_checkbox + _easycom_uni_data_select)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.defaultT = $event),
    b: common_vendor.p({
      mode: "button",
      localdata: $data.ctype,
      modelValue: $data.defaultT
    }),
    c: common_vendor.o(($event) => $data.a = $event),
    d: common_vendor.p({
      localdata: $options.taskTypes,
      modelValue: $data.a
    }),
    e: common_vendor.o((...args) => $options.createTask && $options.createTask(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/addtask/addtask.vue"]]);
wx.createPage(MiniProgramPage);
