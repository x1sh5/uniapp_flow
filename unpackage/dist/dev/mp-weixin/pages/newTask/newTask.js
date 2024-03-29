"use strict";
const common_vendor = require("../../common/vendor.js");
const common_Task = require("../../common/Task.js");
const _sfc_main = {
  data() {
    return {
      counter: 1,
      results: [],
      tasks: [],
      reffer: "",
      $mode: ""
    };
  },
  computed: {
    taskTypes() {
      return this.$store.state.taskTypes.filter((i) => ["制作", "资金", "分发"].includes(i.name));
    },
    mode() {
      return this.$data.$mode;
    }
  },
  created(op) {
  },
  onLoad(op) {
    op.createType;
    let branchType = op.branchid;
    this.$data.$mode = op.mode;
    let t = {
      "id": 0,
      "branchid": branchType,
      "description": "",
      "finishtime": "0001-01-01T00:00:00",
      "deadline": (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      "publishtime": "0001-01-01T00:00:00",
      "fixedReward": 0,
      "percentReward": 1e4,
      "rewardtype": op.mode === "single" ? common_Task.RewardType.Fiexd : common_Task.RewardType.Percent,
      "status": common_Task.TaskStatus.WaitForAccept,
      "title": "",
      "canTake": 0,
      "tag": "",
      "verify": 0,
      "main": 1,
      "tag": ""
    };
    this.tasks.push(t);
  },
  methods: {
    getUuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      }).replace("-", "");
    },
    backEvent() {
      if (this.tasks.length > 0) {
        common_vendor.index.showModal({
          content: "返回后已编辑的内容将会消失，是否放弃修改？",
          success: function(res) {
            if (res.confirm) {
              common_vendor.index.navigateBack({
                url: "/pages/addtask/addtask"
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      } else {
        common_vendor.index.navigateBack({
          url: "/pages/addtask/addtask"
        });
      }
    },
    checkResult(data) {
      this.results.push(data);
    },
    async showModal() {
      return new Promise((resolve, reject) => {
        common_vendor.index.showModal({
          showCancel: false,
          title: "提示",
          content: "还有比例未分配完整。",
          success: function(res) {
            if (res.confirm) {
              resolve();
            } else if (res.cancel) {
              reject(new Error("用户取消操作"));
            }
          },
          fail: function(error) {
            reject(error);
          }
        });
      });
    },
    async submitEvent() {
      if (this.mode === "mutiple") {
        let sum = this.tasks.reduce((a, b) => {
          if (b.rewardtype === common_Task.RewardType.Percent && b.main === 0) {
            return a + b.percentReward;
          }
          return a;
        }, 0);
        if (sum !== 1e4) {
          try {
            await this.showModal();
            return;
          } catch (error) {
          }
        }
      }
      this.$store.commit("setPublishResults", []);
      for (let item of this.tasks) {
        this.$refs["id" + item.id][0].check();
      }
      for (const t of this.tasks) {
        const ref = this.$refs["id" + t.id][0];
        ref.preprocess(ref.content);
      }
      if (this.results.length > 0 && this.results.every((ele) => Boolean(ele))) {
        let posturl = this.$store.state.apiBaseUrl + "/api/Assignment/posts";
        common_vendor.index.requestWithCookie({
          url: posturl,
          method: "POST",
          data: this.tasks,
          success: (res) => {
            if (res.statusCode === 201) {
              this.$store.state.$publishResults.push({
                success: true,
                message: "任务发布成功",
                errMsg: "ok",
                id: res.data.id
              });
            } else {
              this.$store.state.$publishResults.push({
                success: false,
                message: "任务发布失败",
                errMsg: "server error"
              });
            }
          },
          complete() {
            this.results = [];
          }
        });
        common_vendor.index.navigateTo({
          url: "/pages/publishResult/publishResult"
        });
      }
      this.results = [];
    },
    rewardType(tasktype) {
      let t = this.$store.getters.getTaskType(tasktype);
      if (t.rewardType === "only fixed") {
        return common_Task.RewardType.Fiexd;
      } else if (t.rewardType === "only percent") {
        return common_Task.RewardType.Percent;
      } else {
        return common_Task.RewardType.Percent;
      }
    },
    createTask(e) {
      this.tasks.push({
        "id": this.counter++,
        "username": false,
        "branchid": 1,
        "description": "",
        "finishtime": "0001-01-01T00:00:00",
        "deadline": (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        "publishtime": "0001-01-01T00:00:00",
        "fixedReward": 0,
        "percentReward": 0,
        "rewardtype": this.rewardType(e.item.id),
        "status": common_Task.TaskStatus.WaitForAccept,
        "title": "",
        "branchid": e.item.id,
        "verify": 0,
        "canTake": 1,
        "main": 0
      });
    },
    updateTask(id, payload) {
      let index = this.tasks.findIndex((item) => item.id === parseInt(id));
      if (index !== -1) {
        this.$refs["id" + id][0].updateT(payload);
      }
    },
    //发布成功后，移除task
    afterPublish(id) {
      this.tasks = [];
    },
    removeTask(id) {
      let index = this.tasks.findIndex((item) => item.id === parseInt(id));
      this.tasks.splice(index, 1);
    }
  },
  mounted() {
  },
  onShow() {
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_taskCard2 = common_vendor.resolveComponent("taskCard");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_nav_bar2 + _easycom_taskCard2 + _easycom_uni_fab2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_taskCard = () => "../../components/taskCard/taskCard.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_taskCard + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.backEvent),
    b: common_vendor.o($options.submitEvent),
    c: common_vendor.p({
      ["left-icon"]: "left",
      leftText: "返回",
      rightText: "下一步",
      backgroundColor: "#f8f8f8"
    }),
    d: common_vendor.f($data.tasks, (item, index, i0) => {
      return {
        a: common_vendor.sr("id" + item.id, "9360021c-1-" + i0, {
          "f": 1
        }),
        b: item.id,
        c: "id" + item.id,
        d: common_vendor.o($options.checkResult, item.id),
        e: common_vendor.o($options.removeTask, item.id),
        f: "9360021c-1-" + i0,
        g: common_vendor.p({
          task: item,
          editable: true
        })
      };
    }),
    e: $options.mode == "mutiple"
  }, $options.mode == "mutiple" ? {
    f: common_vendor.o($options.createTask),
    g: common_vendor.p({
      horizontal: "right",
      content: $options.taskTypes,
      showProp: "name"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/newTask/newTask.vue"]]);
wx.createPage(MiniProgramPage);
