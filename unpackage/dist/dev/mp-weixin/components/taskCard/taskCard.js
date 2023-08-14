"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../common/storageKeys.js");
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
    return {
      content: {}
    };
  },
  computed: {
    html: {
      get() {
        return this.content.html;
      },
      set(value) {
        this.content = value;
        this.task.description = value.html;
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
      this.$store.commit("setEditContent", this.content);
      common_vendor.index.navigateTo({
        url: "/pages/editor/editor?id=" + this.task.id
      });
    },
    updateT(payload) {
      console.log("updateT trigger");
      this.content = payload;
      this.$refs.cardinfo.updateDes(payload.html);
    },
    publish() {
      this.$refs.cardinfo.publish();
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
  return common_vendor.e({
    a: common_vendor.sr("cardinfo", "445dab1a-0"),
    b: common_vendor.p({
      task: $props.task,
      editable: $props.editable
    }),
    c: $options.html,
    d: $props.editable
  }, $props.editable ? {
    e: common_vendor.o((...args) => $options.editEvent && $options.editEvent(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/components/taskCard/taskCard.vue"]]);
wx.createComponent(Component);
