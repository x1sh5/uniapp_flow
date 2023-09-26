"use strict";
const common_vendor = require("../../common/vendor.js");
const common_Task = require("../../common/Task.js");
const _sfc_main = {
  data() {
    return {
      hasPushlishs: false,
      $publishs: []
    };
  },
  computed: {
    publishs() {
      return this.$data.$publishs;
    }
  },
  methods: {
    mode(item) {
      if (item.status === common_Task.TaskStatus.WaitForAccept)
        return "waitfor";
      if (item.status === common_Task.TaskStatus.Unfinished)
        return "undone";
      return "done";
    },
    toDetails(e) {
      common_vendor.index.navigateTo({
        url: "/pages/myTaskDetail/myTaskDetail?id=" + e
      });
    },
    removeById(id) {
      let index = this.publishs.findIndex((item) => item.id == id);
      if (index != -1) {
        this.publishs.splice(index, 1);
      }
    }
  },
  onLoad() {
    if (!this.hasPushlishs) {
      console.log("get user task");
      common_vendor.index.requestWithCookie({
        url: this.$store.state.apiBaseUrl + "/api/Assignment/user",
        success: (res) => {
          this.$data.$publishs = res.data;
          this.hasPushlishs = true;
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_cardinfo2 = common_vendor.resolveComponent("cardinfo");
  _easycom_cardinfo2();
}
const _easycom_cardinfo = () => "../../components/cardinfo/cardinfo.js";
if (!Math) {
  _easycom_cardinfo();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.publishs, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.toDetails(item.id), item.id),
        b: "e0884de0-0-" + i0,
        c: common_vendor.p({
          task: item,
          editable: false,
          mode: $options.mode(item)
        }),
        d: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/myPublishs/myPublishs.vue"]]);
wx.createPage(MiniProgramPage);
