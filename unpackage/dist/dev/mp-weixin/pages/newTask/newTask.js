"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      task: {
        "id": false,
        "username": false,
        "branchid": 1,
        "description": "",
        "finishtime": "0001-01-01T00:00:00",
        "presumedtime": false,
        "publishtime": "0001-01-01T00:00:00",
        "reward": "",
        "rewardtype": 1,
        "status": 1,
        "title": "",
        "typeid": false,
        "verify": 0
      },
      tasks: [],
      reffer: ""
    };
  },
  computed: {},
  created(op) {
    console.log("created");
    console.log(op);
  },
  onLoad(op) {
    console.log("onload");
    let reffer = op.createType;
    let taskType = op.typeid;
    console.log("reffer", reffer);
    console.log("taskType", taskType);
    this.task.typeid = taskType;
  },
  methods: {}
};
if (!Array) {
  const _easycom_taskCard2 = common_vendor.resolveComponent("taskCard");
  _easycom_taskCard2();
}
const _easycom_taskCard = () => "../../components/taskCard/taskCard.js";
if (!Math) {
  _easycom_taskCard();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      task: $data.task,
      editable: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/newTask/newTask.vue"]]);
wx.createPage(MiniProgramPage);
