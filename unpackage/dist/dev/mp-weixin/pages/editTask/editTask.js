"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      item: {}
    };
  },
  methods: {
    backEvent() {
      common_vendor.index.showModal({
        content: "返回后以编辑的内容将会消失，是否放弃修改。",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.navigateBack();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    submitEvent() {
      let results = [];
      let res = this.$refs["id" + this.item.id].put();
      results.push(res);
      if (results.every((ele) => Boolean(ele))) {
        common_vendor.index.navigateTo({
          url: "/pages/publishResult/publishResult"
        });
      }
    },
    updateTask(id, payload) {
      console.log("updateTask triggered", id, payload);
      this.item.description = payload.html;
      this.$refs["id" + id].updateT(payload);
    }
  },
  created() {
    this.item = this.$store.state.currentTask;
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_taskCard2 = common_vendor.resolveComponent("taskCard");
  (_easycom_uni_nav_bar2 + _easycom_taskCard2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_taskCard = () => "../../components/taskCard/taskCard.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_taskCard)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.backEvent),
    b: common_vendor.o($options.submitEvent),
    c: common_vendor.p({
      ["left-icon"]: "left",
      leftText: "返回",
      rightText: "确认",
      ["right-icon"]: "checkmarkempty",
      title: "任务编辑",
      backgroundColor: "#f8f8f8"
    }),
    d: common_vendor.sr("id" + $data.item.id, "71f8c7f6-1"),
    e: "id" + $data.item.id,
    f: common_vendor.p({
      task: $data.item,
      editable: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/editTask/editTask.vue"]]);
wx.createPage(MiniProgramPage);
