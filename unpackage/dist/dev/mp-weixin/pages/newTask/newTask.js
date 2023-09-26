"use strict";
const common_vendor = require("../../common/vendor.js");
const common_Task = require("../../common/Task.js");
const _sfc_main = {
  data() {
    return {
      counter: 1,
      results: [],
      tasks: [{
        "id": 0,
        "branchid": 1,
        "description": "",
        "finishtime": "",
        "deadline": (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        "publishtime": "0001-01-01T00:00:00",
        "fixedReward": 0,
        "percentReward": 1e4,
        "rewardtype": common_Task.RewardType.Percent,
        "status": common_Task.TaskStatus.WaitForAccept,
        "title": "",
        "canTake": 0,
        "typeId": false,
        "verify": 0,
        "main": 1
      }],
      reffer: "",
      $mode: ""
    };
  },
  computed: {
    taskTypes() {
      return this.$store.state.taskTypes;
    },
    mode() {
      return this.$data.$mode;
    }
  },
  created(op) {
    console.log("created");
    console.log(op);
  },
  onLoad(op) {
    console.log("onload");
    let reffer = op.createType;
    let taskType = op.typeId;
    this.$data.$mode = op.mode;
    console.log("reffer", reffer);
    console.log("taskType", taskType);
    this.tasks[0].typeId = taskType;
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
          content: "返回后以编辑的内容将会消失，是否放弃修改。",
          success: function(res) {
            if (res.confirm) {
              common_vendor.index.navigateBack();
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      } else {
        common_vendor.index.navigateBack();
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
      this.$store.commit("setPublishResults", []);
      for (let item of this.tasks) {
        this.$refs["id" + item.id][0].check();
      }
      if (this.results.length > 0 && this.results.every((ele) => Boolean(ele))) {
        let posturl = this.$store.state.apiBaseUrl + "/api/Assignment/posts";
        common_vendor.index.requestWithCookie({
          url: posturl,
          method: "POST",
          data: this.tasks,
          success: (res) => {
            if (res.statusCode === 201) {
              this.$store.state.$publishResults.push({ success: true, message: "任务发布成功", errMsg: "ok", id: res.data.id });
            } else {
              this.$store.state.$publishResults.push({ success: false, message: "任务发布失败", errMsg: "server error" });
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
      console.log(e);
      this.tasks.push({
        "id": this.counter++,
        "username": false,
        "branchid": 1,
        "description": "",
        "finishtime": "",
        "deadline": (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        "publishtime": "0001-01-01T00:00:00",
        "fixedReward": 0,
        "percentReward": 0,
        "rewardtype": this.rewardType(e.item.id),
        "status": common_Task.TaskStatus.WaitForAccept,
        "title": "",
        "typeId": e.item.id,
        "verify": 0,
        "canTake": 1,
        "main": 0
      });
    },
    updateTask(id, payload) {
      console.log("updateTask triggered", id, payload);
      console.log(this.tasks);
      let index = this.tasks.findIndex((item) => item.id === parseInt(id));
      console.log(index);
      if (index !== -1) {
        this.tasks[index].description = payload.html;
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
    console.log(this.$refs);
  },
  onShow() {
    console.log(this.$refs);
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
      rightText: "发布",
      title: "内容编辑",
      backgroundColor: "#f8f8f8"
    }),
    d: common_vendor.f($data.tasks, (item, index, i0) => {
      return {
        a: common_vendor.sr("id" + item.id, "329834dc-1-" + i0, {
          "f": 1
        }),
        b: item.id,
        c: "id" + item.id,
        d: common_vendor.o($options.checkResult, item.id),
        e: common_vendor.o($options.removeTask, item.id),
        f: "329834dc-1-" + i0,
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/newTask/newTask.vue"]]);
wx.createPage(MiniProgramPage);
