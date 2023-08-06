"use strict";
const common_vendor = require("../../common/vendor.js");
const common_storageKeys = require("../../common/storageKeys.js");
const _sfc_main = {
  name: "taskCard",
  props: {
    task: {
      type: Object,
      default() {
        return {
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
        };
      }
    },
    editable: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    html: {
      get() {
        return common_vendor.index.getStorageSync(common_storageKeys.StorageKeys.taskContent);
      }
    }
  },
  onLoad(op) {
    console.log("options:", op);
    this.$data.task.typeid = op.typeid;
    console.log("typeid is ", this.$data.task.typeid);
  },
  methods: {
    editEvent(e) {
      common_vendor.index.navigateTo({
        url: "/pages/editor/editor"
      });
    }
  }
};
if (!Array) {
  const _easycom_cardinfo2 = common_vendor.resolveComponent("cardinfo");
  _easycom_cardinfo2();
}
const _easycom_cardinfo = () => "../cardinfo/cardinfo.js";
if (!Math) {
  _easycom_cardinfo();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      task: $props.task,
      editable: $props.editable
    }),
    b: $options.html,
    c: common_vendor.o((...args) => $options.editEvent && $options.editEvent(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/taskCard/taskCard.vue"]]);
wx.createComponent(Component);
