"use strict";
const common_vendor = require("../../common/vendor.js");
const common_Task = require("../../common/Task.js");
const _sfc_main = {
  name: "cardinfo",
  props: {
    taskIndex: Number,
    //task 在数组中的索引
    task: Object,
    //颜色代码
    colorid: Number,
    //可编辑组件（input,textarea等）是否能编辑，默认不能编辑
    editable: Boolean,
    mode: String
  },
  created() {
    console.log("task is:", this.task);
  },
  computed: {
    Id() {
      return this.task.id;
    },
    userName: {
      get() {
        return this.task.username;
      },
      set(value) {
        this.task.username = value;
      }
    },
    taskType: {
      get() {
        return this.$store.getters.getTaskType(this.task.typeId);
      }
    },
    reward: {
      get() {
        return this.task.rewardtype === common_Task.RewardType.Fiexd ? this.task.fixedReward : this.task.percentReward;
      },
      set(value) {
        if (this.task.rewardtype === common_Task.RewardType.Fiexd) {
          this.task.fixedReward = value;
        }
        if (this.task.rewardtype === common_Task.RewardType.Percent) {
          this.task.percentReward = value;
        }
      }
    },
    rewardtype: {
      get() {
        return this.task.rewardtype;
      },
      set(value) {
        this.task.rewardtype = parseInt(value);
      }
    },
    rewardSymbol() {
      if (this.task.rewardtype === common_Task.RewardType.Fiexd) {
        return "￥";
      }
      if (this.task.rewardtype === common_Task.RewardType.Percent) {
        return "%";
      }
      return "";
    },
    branch: {
      get() {
        return this.$store.getters.getBranch(this.task.branchid);
      }
    },
    depart() {
      let d;
      try {
        d = this.branchs[this.branchOrder];
      } catch (e) {
        d = "部门";
      }
      return d;
    },
    branchOrder: {
      get() {
        if (!this.branchIndex) {
          return this.$store.getters.getBranchIndex(this.task.branchid);
        }
        return this.branchIndex;
      },
      set(value) {
        this.branchIndex = value;
      }
    },
    branchs() {
      return this.$store.state.branchs;
    },
    nullTask() {
      if (this.task === null || this.task === void 0) {
        return true;
      }
      return false;
    },
    deadline: {
      get() {
        try {
          let index = this.task.deadline.indexOf("T");
          if (index !== -1) {
            return this.task.deadline.substring(0, index);
          }
        } catch (e) {
        }
        return this.task.deadline;
      },
      set(value) {
        this.task.deadline = value;
      }
    },
    title: {
      get() {
        return this.task.title;
      },
      set(value) {
        this.task.title = value;
      }
    },
    rewardtypeSymbol() {
      return {
        text: "%",
        options: [
          {
            text: "￥",
            value: "1",
            name: "固定",
            selected: true,
            disable: this.depart && this.depart.rewardType === "only percent"
          },
          {
            text: "%",
            value: "2",
            name: "百分比",
            disable: this.depart && this.depart.rewardType === "only fixed"
          }
        ]
      };
    }
  },
  methods: {
    branchChange(e) {
      console.log("picker发送选择改变，携带值为", e);
      let branchIndex = e.detail.value;
      this.branchIndex = branchIndex;
      this.task.branchid = branchIndex;
      let d = this.branchs[this.branchOrder];
      if (d.rewardType === "only percent") {
        this.task.rewardtype = 2;
      }
      if (d.rewardType === "only fixed") {
        this.task.rewardtype = 1;
      }
    },
    rewardTypeChange(e) {
      console.log("rewardType 改变，携带值为", e);
      this.task.rewardtype = parseInt(e.value);
      let pages = getCurrentPages();
      let current = pages[pages.length - 1];
      if (current.mode && current.mode == "single") {
        this.task.percentReward = 100;
      } else {
        this.task.percentReward = "";
      }
    },
    detail(e) {
      if (!this.editable) {
        if (!this.$store.state.$hasLogin) {
          common_vendor.index.navigateTo({
            url: "/pages/logintips/logintips"
          });
        } else {
          const pages = getCurrentPages();
          let current = pages[pages.length - 1];
          if (current.route.split("/").at(-1) !== "taskDetail" && current.route.split("/").at(-1) !== "myTaskDetail") {
            this.$store.commit("setCurrentTask", this.task);
            this.$store.dispatch("genHistory", this.task.id);
            common_vendor.index.navigateTo({
              url: "/pages/taskDetail/taskDetail?id=" + this.task.id + "&mode=" + this.mode
            });
          }
        }
      }
    },
    updateReward(event) {
      if (this.task.rewardtype === common_Task.RewardType.Fiexd) {
        this.task.fixedReward = event.detail.value;
      } else if (this.task.rewardtype === common_Task.RewardType.Percent) {
        this.task.percentReward = event.detail.value;
      }
    },
    updateBrief(event) {
      this.task.title = event.detail.value;
    },
    //更新预计时间
    updatePt(event) {
      this.task.deadline = event.detail.value;
    },
    //更新描述
    updateDes(data) {
      this.task.description = data;
    },
    biupdatePt(e) {
      console.log(e);
      this.task.deadline = e.detail.value;
    },
    publish() {
      console.log(this.task);
      if (!this.task.title) {
        common_vendor.index.showModal({
          content: "标题不能为空！"
        });
        return false;
      }
      if (this.task.rewardtype === common_Task.RewardType.Fiexd && !this.task.fixedReward) {
        common_vendor.index.showModal({
          content: "回馈值不能为空！"
        });
        return false;
      }
      if (this.task.rewardtype === common_Task.RewardType.Percent && !this.task.percentReward) {
        common_vendor.index.showModal({
          content: "回馈值不能为空！"
        });
        return false;
      }
      if (!this.task.deadline) {
        common_vendor.index.showModal({
          content: "截止日期不能为空！"
        });
        return false;
      }
      let posturl = this.$store.state.apiBaseUrl + "/api/Assignment";
      common_vendor.index.requestWithCookie({
        url: posturl,
        method: "POST",
        data: this.task,
        success: (res) => {
          if (res.statusCode === 200) {
            this.$store.state.$publishResults.push({ success: true, message: "任务：" + this.task.title + "发布成功", errMsg: "ok" });
            this.$emit("after-publish", this.task.id);
          } else {
            this.$store.state.$publishResults.push({ success: false, message: "任务：" + this.task.title + "发布失败", errMsg: "server error" });
          }
        },
        fail: (err) => {
          console.error(err);
          this.$store.state.$publishResults.push({ success: false, message: "任务：" + this.task.title + "发布失败", errMsg: "client error" });
        }
      });
    },
    put() {
      console.log(this.task);
      if (!this.task.title) {
        common_vendor.index.showModal({
          content: "标题不能为空！"
        });
        return false;
      }
      if (this.task.rewardtype === common_Task.RewardType.Fiexd && !this.task.fixedReward) {
        common_vendor.index.showModal({
          content: "回馈值不能为空！"
        });
        return false;
      }
      if (this.task.rewardtype === common_Task.RewardType.Percent && !this.task.percentReward) {
        common_vendor.index.showModal({
          content: "回馈值不能为空！"
        });
        return false;
      }
      if (!this.task.deadline) {
        common_vendor.index.showModal({
          content: "截止日期不能为空！"
        });
        return false;
      }
      let posturl = this.$store.state.apiBaseUrl + "/api/Assignment/" + this.task.id;
      common_vendor.index.requestWithCookie({
        url: posturl,
        method: "PUT",
        data: this.task,
        success: (res) => {
          if (res.statusCode === 204) {
            this.$store.state.$publishResults.push({ success: true, message: "任务：" + this.task.title + "修改成功", errMsg: "ok" });
            this.$emit("after-publish", this.task.id);
          } else {
            this.$store.state.$publishResults.push({ success: false, message: "任务：" + this.task.title + "修改失败", errMsg: "server error" });
          }
        },
        fail: (err) => {
          console.error(err);
          this.$store.state.$publishResults.push({ success: false, message: "任务：" + this.task.title + "修改失败", errMsg: "client error" });
        }
      });
    },
    removeTask(e) {
      console.log(e);
      this.$emit("remove-task", this.task.id);
    },
    showPopup(e) {
      console.log("click show");
      this.vis = true;
    },
    exitDel(e) {
      console.log("exit");
      this.vis = false;
    }
  },
  data() {
    return {
      // 预计时间
      //spendtime:"",
      //tasktype:"类型",
      vis: false,
      status: ["代接", "待完成", "完成"],
      branchIndex: false
    };
  }
};
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  _easycom_uni_data_select2();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
if (!Math) {
  _easycom_uni_data_select();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n(`fontcolor${$options.Id % 3} poster`),
    b: common_vendor.t($options.Id),
    c: !$props.editable,
    d: $options.title,
    e: common_vendor.o((...args) => $options.updateBrief && $options.updateBrief(...args)),
    f: common_vendor.n(`fontcolor${$options.Id % 3}`),
    g: common_vendor.t($options.deadline),
    h: $options.deadline,
    i: common_vendor.o((...args) => $options.biupdatePt && $options.biupdatePt(...args)),
    j: common_vendor.n(`fontcolor${$options.Id % 3}`),
    k: !$props.editable,
    l: common_vendor.o((...args) => $options.updateReward && $options.updateReward(...args)),
    m: $options.reward,
    n: common_vendor.o(($event) => $options.reward = $event.detail.value),
    o: common_vendor.t($options.rewardSymbol),
    p: $props.editable
  }, $props.editable ? {
    q: common_vendor.o($options.rewardTypeChange),
    r: common_vendor.p({
      localdata: $options.rewardtypeSymbol.options,
      clear: false,
      modelValue: $options.rewardtype,
      placeholder: "类型"
    })
  } : {}, {
    s: $props.editable
  }, $props.editable ? {
    t: common_vendor.o((...args) => $options.showPopup && $options.showPopup(...args))
  } : {}, {
    v: common_vendor.t($options.taskType),
    w: common_vendor.t($options.depart ? $options.depart["name"] : ""),
    x: !$props.editable,
    y: $options.branchs,
    z: $options.branchOrder,
    A: common_vendor.n(`fontcolor${$options.Id % 3}`),
    B: common_vendor.o((...args) => $options.branchChange && $options.branchChange(...args)),
    C: common_vendor.t($options.userName),
    D: common_vendor.n(`fontcolor${$options.Id % 3}`),
    E: common_vendor.s($props.editable ? "display:none" : "display:flex;flex-direction: column;"),
    F: common_vendor.t($data.status[$props.task.status]),
    G: common_vendor.s($props.editable ? "display:none" : "display:flex"),
    H: $data.vis
  }, $data.vis ? {
    I: common_vendor.o((...args) => $options.removeTask && $options.removeTask(...args)),
    J: common_vendor.o((...args) => $options.exitDel && $options.exitDel(...args))
  } : {}, {
    K: common_vendor.n(`task${$options.Id % 3}`),
    L: common_vendor.o((...args) => $options.detail && $options.detail(...args)),
    M: common_vendor.o((...args) => $options.removeTask && $options.removeTask(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/components/cardinfo/cardinfo.vue"]]);
wx.createComponent(Component);
