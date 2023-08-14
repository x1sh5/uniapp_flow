"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selected: void 0,
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
      console.log("createTask", e);
      common_vendor.index.navigateTo({
        url: "/pages/newTask/newTask?typeid=" + this.selected.id + "&createType=" + this.defaultT
      });
    },
    typeChange(e) {
      console.log("typechange", e);
      if (e.detail.value === 1) {
        this.$refs.dataSelect.statusDisable(true);
      }
      if (e.detail.value === 0) {
        this.$refs.dataSelect.statusDisable(false);
      }
    },
    receiveDataFromChild(data) {
      console.log("data", data);
      this.selected = data;
      console.log("this.selected", this.selected);
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
    a: common_vendor.o($options.typeChange),
    b: common_vendor.o(($event) => $data.defaultT = $event),
    c: common_vendor.p({
      mode: "button",
      localdata: $data.ctype,
      modelValue: $data.defaultT
    }),
    d: common_vendor.sr("dataSelect", "adab10c4-1"),
    e: common_vendor.o($options.receiveDataFromChild),
    f: common_vendor.p({
      localdata: $options.taskTypes,
      showProp: "name"
    }),
    g: common_vendor.o((...args) => $options.createTask && $options.createTask(...args)),
    h: !Boolean($data.selected)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/addtask/addtask.vue"]]);
wx.createPage(MiniProgramPage);
