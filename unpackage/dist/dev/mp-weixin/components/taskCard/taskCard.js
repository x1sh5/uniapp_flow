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
          "deadline": "",
          "fixedreward": "",
          "percentreward": "",
          "publishtime": "0001-01-01T00:00:00",
          "rewardtype": 1,
          "status": 1,
          "title": "",
          "typeId": false,
          "verify": 0
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
    this.$data.task.typeId = op.typeId;
    console.log("typeId is ", this.$data.task.typeId);
  },
  methods: {
    editEvent(e) {
      this.$store.commit("setEditContent", this.content);
      common_vendor.index.navigateTo({
        url: "/pages/editor/editor?id=" + this.task.id
      });
    },
    updateT(payload) {
      console.log("updateT trigger", payload);
      for (let file of payload.files) {
        payload.ctx.delta.ops.indexOf((x) => x.attributes && x.attributes["data-local"] === file.path);
        common_vendor.index.uploadFileWithCookie({
          url: this.$store.state.apiBaseUrl + "/api/Image/upload",
          filePath: file.path,
          name: file.name,
          success: (res) => {
            let data = JSON.parse(res.data);
            if (("" + res.statusCode).startsWith("2")) {
              let search = '<img src="' + file.path + '" data-local="' + file.path + '" alt="图像">';
              let replace = '<img src="' + this.$store.state.apiBaseUrl + "/flow/static/" + data.$values[0].url + '">';
              console.log(search, replace);
              let newHtml = payload.ctx.html.replace(search, replace);
              console.log(newHtml);
              this.$refs.cardinfo.updateDes(newHtml);
            }
          }
        });
      }
      this.content = payload.ctx;
    },
    publish() {
      return this.$refs.cardinfo.publish();
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
    b: common_vendor.o($options.removeTask),
    c: common_vendor.o($options.afterPublish),
    d: common_vendor.p({
      task: $props.task,
      editable: $props.editable,
      mode: $props.mode
    }),
    e: $options.html,
    f: $props.editable
  }, $props.editable ? {
    g: common_vendor.o((...args) => $options.editEvent && $options.editEvent(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/components/taskCard/taskCard.vue"]]);
wx.createComponent(Component);
