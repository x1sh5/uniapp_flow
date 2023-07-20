"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      task: {
        "id": false,
        "username": false,
        "branchid": 1,
        "description": "任务描述",
        "finishtime": "0001-01-01T00:00:00",
        "presumedtime": false,
        "publishtime": "0001-01-01T00:00:00",
        "reward": "",
        "rewardtype": 1,
        "status": 1,
        "title": "",
        "typeid": false,
        "verify": 0
      }
    };
  },
  computed: {
    html: {
      get() {
        return this.task.description;
      }
    }
  },
  onLoad(op) {
    console.log("options:", op);
    const id = op.id;
    let t = this.$store.getters.getTaskById(id);
    if (t !== void 0 && t !== null) {
      this.task = t;
    }
  },
  methods: {
    editEvent(e) {
      common_vendor.index.navigateTo({
        url: "/pages/editor/editor"
      });
    },
    contact(e) {
      common_vendor.index.navigateTo({
        url: "/pages/chat/chat"
      });
    },
    gain(e) {
      console.log("接取任务");
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
    a: common_vendor.p({
      task: $data.task,
      editable: true
    }),
    b: $options.html,
    c: common_vendor.o((...args) => $options.contact && $options.contact(...args)),
    d: common_vendor.o((...args) => $options.gain && $options.gain(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/taskDetail/taskDetail.vue"]]);
wx.createPage(MiniProgramPage);
