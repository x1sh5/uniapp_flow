"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      $enable: false,
      task: {
        "id": false,
        "username": false,
        "branchid": 1,
        "description": "任务描述",
        "finishtime": "0001-01-01T00:00:00",
        "deadline": "",
        "publishtime": "0001-01-01T00:00:00",
        "fixedReward": "",
        "percentReward": "",
        "rewardtype": 1,
        "status": 1,
        "title": "",
        "typeId": false,
        "verify": 0
      },
      mode: {
        type: String,
        default() {
          return "done";
        }
      },
      status: ["waitfor", "undone", "done"]
    };
  },
  created() {
    this.task = this.$store.state.currentTask;
  },
  computed: {
    enable() {
      return this.$data.$enable;
    },
    html: {
      get() {
        return this.task.description;
      }
    }
  },
  onLoad(op) {
    console.log("options:", op);
    op.id;
    this.mode = this.status[this.task.status];
  },
  methods: {
    edit(e) {
      common_vendor.index.navigateTo({
        url: "/pages/editTask/editTask"
      });
    },
    del(e) {
      let qurl = this.$store.state.apiBaseUrl + "/api/Assignment/delete/" + this.task.id;
      common_vendor.index.requestWithCookie({
        url: qurl,
        method: "DELETE",
        success: (res) => {
          if (res.statusCode === 204) {
            common_vendor.index.showToast({
              title: "删除成功。"
            });
            const pages = getCurrentPages();
            let prep = pages[pages.length - 2];
            prep.removeById(this.task.id);
            common_vendor.index.navigateBack();
          }
          if (res.statusCode === 404) {
            common_vendor.index.showModal({
              content: "无效的任务。"
            });
          }
          if (res.statusCode === 409) {
            common_vendor.index.showModal({
              content: "任务已被他人接取,请等待任务完成或被放弃。"
            });
          }
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
  return common_vendor.e({
    a: common_vendor.p({
      task: $data.task,
      editable: false
    }),
    b: $options.html,
    c: $data.mode == "waitfor"
  }, $data.mode == "waitfor" ? {
    d: common_vendor.o((...args) => $options.edit && $options.edit(...args)),
    e: common_vendor.o((...args) => $options.del && $options.del(...args))
  } : {}, {
    f: $data.mode == "undone"
  }, $data.mode == "undone" ? {} : {}, {
    g: $data.mode == "done"
  }, $data.mode == "done" ? {
    h: common_vendor.o((...args) => $options.del && $options.del(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/myTaskDetail/myTaskDetail.vue"]]);
wx.createPage(MiniProgramPage);
