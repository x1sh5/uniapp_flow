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
    editEvent(e) {
      common_vendor.index.navigateTo({
        url: "/pages/editor/editor"
      });
    },
    contact(e) {
      common_vendor.index.navigateTo({
        url: "/pages/chat/chat?cid=" + this.task.id + "&userName=" + this.task.username + "&userId=" + this.task.userId
      });
    },
    gain(e) {
      console.log("接取任务");
      let url = this.$store.state.apiBaseUrl + "/api/Assignment/take/" + this.task.id;
      common_vendor.index.requestWithCookie({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            if (res.data.data.success) {
              common_vendor.index.showModal({
                content: res.data.message
              });
            } else {
              common_vendor.index.showModal({
                content: res.data.data.reason
              });
            }
          } else {
            common_vendor.index.showModal({
              content: "网络出错"
            });
          }
        },
        fail: (err) => {
          console.log("failed");
          common_vendor.index.showModal({
            content: err
          });
        }
      });
    },
    abandon(e) {
      let url = this.$store.state.apiBaseUrl + "/api/AssignmentUser/abandon/" + this.task.id;
      common_vendor.index.requestWithCookie({
        url,
        method: "DELETE",
        success: (res) => {
          if (res.statusCode !== 204) {
            common_vendor.index.showModal({
              content: "网络出错"
            });
          }
          this.$data.$enable = true;
          const pages = getCurrentPages();
          if (pages.length >= 2) {
            const holdTask = pages[pages.length - 2];
            holdTask.removeItem(this.task.id);
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
    d: common_vendor.o((...args) => $options.contact && $options.contact(...args)),
    e: common_vendor.o((...args) => $options.gain && $options.gain(...args))
  } : {}, {
    f: $data.mode == "undone"
  }, $data.mode == "undone" ? {
    g: common_vendor.o((...args) => $options.contact && $options.contact(...args)),
    h: common_vendor.o((...args) => $options.abandon && $options.abandon(...args)),
    i: $options.enable
  } : {}, {
    j: $data.mode == "done"
  }, $data.mode == "done" ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/taskDetail/taskDetail.vue"]]);
wx.createPage(MiniProgramPage);
