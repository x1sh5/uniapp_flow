"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      $enable: false,
      ptask: void 0,
      ctasks: void 0,
      mode: {
        type: String,
        default() {
          return "done";
        }
      },
      status: ["waitfor", "undone", "done", "announcement"]
    };
  },
  created() {
    console.log("created");
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
  mounted() {
    console.log("mounted");
    let curl = this.$store.state.apiBaseUrl + "/api/Assignment/childs/" + this.task.id;
    let purl = this.$store.state.apiBaseUrl + "/api/Assignment/parent/" + this.task.id;
    if (!this.ptask) {
      common_vendor.index.request({
        url: curl,
        success: (res) => {
          if (res.statusCode === 200) {
            this.ctasks = res.data;
          }
        }
      });
    }
    if (!this.ctasks) {
      common_vendor.index.request({
        url: purl,
        success: (res) => {
          if (res.statusCode === 200) {
            this.ptask = res.data;
          }
        }
      });
    }
  },
  onLoad(op) {
    console.log("options:", op);
    this.id = op.id;
    let task = this.$store.getters.getTaskById(this.id);
    if (task !== void 0) {
      this.task = task;
    } else {
      let qurl = this.$store.state.apiBaseUrl + "/api/Assignment/" + this.id;
      common_vendor.index.requestWithCookie({
        url: qurl,
        success: (res) => {
          if (res.statusCode == 200) {
            this.task = res.data;
          }
        }
      });
    }
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
      let gurl = this.$store.state.apiBaseUrl + "/api/TaskRequest";
      common_vendor.index.showModal({
        editable: true,
        title: "输入留言。",
        placeholderText: "输入留言。",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.requestWithCookie({
              url: gurl,
              method: "POST",
              data: {
                id: 0,
                userId: 0,
                title: this.task.title,
                typeid: this.task.typeid,
                taskId: this.task.id,
                agree: 2,
                requestDate: /* @__PURE__ */ new Date(),
                agreeDate: /* @__PURE__ */ new Date(),
                comment: res.content
              },
              success: (result) => {
                common_vendor.index.showModal({
                  content: result.data,
                  showCancel: false
                });
              },
              fail: (err) => {
                common_vendor.index.showModal({
                  content: err
                });
              }
            });
          }
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
          } else {
            common_vendor.index.showModal({
              content: "已放弃该任务。"
            });
          }
          this.$data.$enable = true;
          this.$store.commit("updateTaskById", this.task.id);
        }
      });
    },
    reloadTask(task) {
      console.log(task.id);
      this.$store.commit("setCurrentTask", task);
      common_vendor.index.redirectTo({
        url: "/pages/taskDetail/taskDetail?id=" + task.id
      });
    }
  }
};
if (!Array) {
  const _easycom_taskCard2 = common_vendor.resolveComponent("taskCard");
  const _easycom_cardinfo2 = common_vendor.resolveComponent("cardinfo");
  (_easycom_taskCard2 + _easycom_cardinfo2)();
}
const _easycom_taskCard = () => "../../components/taskCard/taskCard.js";
const _easycom_cardinfo = () => "../../components/cardinfo/cardinfo.js";
if (!Math) {
  (_easycom_taskCard + _easycom_cardinfo)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      task: _ctx.task,
      editable: false
    }),
    b: $data.mode == "waitfor"
  }, $data.mode == "waitfor" ? {
    c: common_vendor.o((...args) => $options.contact && $options.contact(...args)),
    d: common_vendor.o((...args) => $options.gain && $options.gain(...args))
  } : {}, {
    e: $data.mode == "undone"
  }, $data.mode == "undone" ? {
    f: common_vendor.o((...args) => $options.contact && $options.contact(...args)),
    g: common_vendor.o((...args) => $options.abandon && $options.abandon(...args)),
    h: $options.enable
  } : {}, {
    i: $data.ptask
  }, $data.ptask ? {
    j: common_vendor.o(($event) => $options.reloadTask($data.ptask)),
    k: common_vendor.p({
      task: $data.ptask,
      editable: false
    })
  } : {}, {
    l: $data.ctasks
  }, $data.ctasks ? {
    m: common_vendor.f($data.ctasks, (c, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.reloadTask(c), c.id),
        b: "2d5c3560-2-" + i0,
        c: common_vendor.p({
          task: c,
          editable: false
        }),
        d: c.id
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/taskDetail/taskDetail.vue"]]);
wx.createPage(MiniProgramPage);
