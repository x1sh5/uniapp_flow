"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../common/storageKeys.js");
require("../../common/ossutil.js");
require("../../common/const.js");
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
          "deadline": "0001-01-01T00:00:00",
          "fixedReward": "",
          "percentReward": "",
          "publishtime": "0001-01-01T00:00:00",
          "rewardtype": 1,
          "status": 1,
          "title": "",
          "tag": "",
          "verify": 0,
          "main": 0
        };
      }
    },
    editable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    mode: {
      type: String,
      default() {
        return "done";
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
        if (this.content.html === void 0) {
          this.setContent(this.task.description);
          return this.task.description;
        }
        return this.content.html;
      },
      set(value) {
        this.content = value;
        this.task.description = value.html;
      }
    }
  },
  onLoad(op) {
    this.$data.task.branchid = op.branchid;
  },
  methods: {
    editEvent(e) {
      this.$store.commit("setEditContent", this.content);
      common_vendor.index.navigateTo({
        url: "/pages/editor/editor?id=" + this.task.id
      });
    },
    setContent(value) {
      this.content.html = value;
    },
    updateT(payload) {
      this.content = payload;
    },
    check() {
      return this.$refs.cardinfo.check();
    },
    preprocess(e) {
      return this.$refs.cardinfo.preprocess(e);
    },
    checkResult(data) {
      this.$emit("check-Result", data);
    },
    put() {
      return this.$refs.cardinfo.put();
    },
    //task发布成功成功后
    afterPublish(e) {
      this.$emit("after-publish", e);
    },
    removeTask(e) {
      this.$emit("remove-task", e);
    },
    taskDetail(e) {
      common_vendor.index.navigateTo({
        url: "/pages/taskContent/taskContent?id=" + this.task.id
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
  return common_vendor.e({
    a: common_vendor.sr("cardinfo", "0f887c44-0"),
    b: common_vendor.o($options.checkResult),
    c: common_vendor.o($options.removeTask),
    d: common_vendor.p({
      task: $props.task,
      editable: $props.editable,
      mode: $props.mode
    }),
    e: !$props.editable
  }, !$props.editable ? {
    f: common_vendor.o((...args) => $options.taskDetail && $options.taskDetail(...args))
  } : {}, {
    g: $props.editable
  }, $props.editable ? {
    h: common_vendor.o((...args) => $options.editEvent && $options.editEvent(...args))
  } : {}, {
    i: common_vendor.o((...args) => $options.checkResult && $options.checkResult(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/taskCard/taskCard.vue"]]);
wx.createComponent(Component);
