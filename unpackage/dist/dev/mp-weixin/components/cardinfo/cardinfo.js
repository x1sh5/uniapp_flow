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
    //模式：单卡："single",多卡："mutiple"
    mode: String
  },
  created() {
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
      //类型概括
      get() {
        return this.task.tag;
      }
    },
    reward: {
      get() {
        if (this.task.rewardtype === common_Task.RewardType.Fiexd) {
          if (this.task.fixedReward && this.task.fixedReward !== 0) {
            return this.task.fixedReward / 100;
          } else {
            return "";
          }
        } else {
          if (this.task.percentReward && this.task.percentReward !== 0) {
            return this.task.percentReward / 100;
          } else {
            return "";
          }
        }
      },
      set(value) {
        if (this.task.rewardtype === common_Task.RewardType.Fiexd) {
          this.task.fixedReward = !isNaN(parseFloat(value)) ? parseInt(parseFloat(value) * 100) : 0;
        }
        if (this.task.rewardtype === common_Task.RewardType.Percent) {
          this.task.percentReward = !isNaN(parseFloat(value)) ? parseInt(parseFloat(value) * 100) : 0;
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
    rewardEditable() {
      return !this.editable || this.task.main === 1 && this.rewardtype === 2;
    },
    branch: {
      get() {
        return this.$store.getters.getBranch(this.task.branchid);
      }
    },
    branchid() {
      return this.task.branchid;
    },
    depart() {
      let d;
      try {
        d = this.branchs[this.branchOrder];
      } catch (e) {
        d = "??";
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
    titleditable() {
      return !this.editable;
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
            disable: this.taskType && this.taskType.rewardType === "only percent"
          },
          {
            text: "%",
            value: "2",
            name: "百分比",
            disable: this.taskType && this.taskType.rewardType === "only fixed"
          }
        ]
      };
    }
  },
  methods: {
    branchChange(e) {
      let branchIndex = e.detail.value;
      this.branchIndex = branchIndex;
      this.task.branchid = branchIndex;
    },
    rewardTypeChange(e) {
      this.task.rewardtype = parseInt(e.value);
      let pages = getCurrentPages();
      let current = pages[pages.length - 1];
      if (current.mode && current.mode == "single") {
        this.task.percentReward = 1e4;
        this.task.fixedReward = 0;
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
              url: "/pages/taskDetail/taskDetail?id=" + this.task.id
            });
          }
        }
      }
    },
    // updateReward(event){
    // 	if(this.task.rewardtype === RewardType.Fiexd){
    // 		this.task.fixedReward = event.detail.value ;
    // 	}else if(this.task.rewardtype === RewardType.Percent){
    // 		this.task.percentReward = event.detail.value;
    // 	}
    // },
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
      this.task.deadline = e;
    },
    check() {
      if (!this.task.title) {
        this.$emit("check-Result", false);
        common_vendor.index.showModal({
          content: "标题不能为空！"
        });
        return;
      }
      if (!this.task.tag) {
        this.$emit("check-Result", false);
        common_vendor.index.showModal({
          content: "类型概括不能为空！"
        });
        return;
      }
      if (this.task.rewardtype === common_Task.RewardType.Fiexd && !this.task.fixedReward) {
        this.$emit("check-Result", false);
        common_vendor.index.showModal({
          content: "回馈值不能为空！"
        });
        return;
      }
      if (this.task.rewardtype === common_Task.RewardType.Percent && !this.task.percentReward) {
        this.$emit("check-Result", false);
        common_vendor.index.showModal({
          content: "回馈值不能为空！"
        });
        return;
      }
      if (!this.task.deadline) {
        this.$emit("check-Result", false);
        common_vendor.index.showModal({
          content: "截止日期不能为空！"
        });
        return;
      }
      this.$emit("check-Result", true);
      return;
    },
    put() {
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
            this.$store.state.$publishResults.push({
              success: true,
              message: "任务：" + this.task.title + "修改成功",
              errMsg: "ok"
            });
            this.$emit("after-publish", this.task.id);
          } else {
            this.$store.state.$publishResults.push({
              success: false,
              message: "任务：" + this.task.title + "修改失败",
              errMsg: "server error"
            });
          }
        },
        fail: (err) => {
          console.error(err);
          this.$store.state.$publishResults.push({
            success: false,
            message: "任务：" + this.task.title + "修改失败",
            errMsg: "client error"
          });
        }
      });
    },
    removeTask(e) {
      if (this.task.main === 1) {
        common_vendor.index.showModal({
          title: "错误！",
          showCancel: false,
          content: "主任务不能被移除。只能返回后重新创建新任务。"
        });
        return;
      }
      this.$emit("remove-task", this.task.id);
    },
    showPopup(e) {
      this.vis = true;
    },
    exitDel(e) {
      this.vis = false;
    }
  },
  data() {
    return {
      // 预计时间
      //spendtime:"",
      //tasktype:"类型",
      vis: false,
      status: ["待接", "待完成", "完成", "公示"],
      branchIndex: false
    };
  }
};
if (!Array) {
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  (_easycom_uni_datetime_picker2 + _easycom_uni_data_select2)();
}
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
if (!Math) {
  (_easycom_uni_datetime_picker + _easycom_uni_data_select)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n(`bid${$options.branchid} poster`),
    b: common_vendor.t($options.branchid),
    c: common_vendor.t($options.Id),
    d: $options.titleditable,
    e: $options.title,
    f: common_vendor.o((...args) => $options.updateBrief && $options.updateBrief(...args)),
    g: common_vendor.n(`bid${$options.branchid}`),
    h: common_vendor.t($options.deadline),
    i: common_vendor.o($options.biupdatePt),
    j: common_vendor.o(($event) => $options.deadline = $event),
    k: common_vendor.p({
      disabled: !$props.editable,
      type: "datetime",
      modelValue: $options.deadline
    }),
    l: common_vendor.n(`bid${$options.branchid}`),
    m: $options.rewardEditable,
    n: $options.reward,
    o: common_vendor.o(($event) => $options.reward = $event.detail.value),
    p: common_vendor.t($options.rewardSymbol),
    q: $props.editable
  }, $props.editable ? {
    r: common_vendor.o($options.rewardTypeChange),
    s: common_vendor.p({
      disabled: $props.task.main === 1,
      localdata: $options.rewardtypeSymbol.options,
      clear: false,
      modelValue: $options.rewardtype,
      placeholder: "类型"
    })
  } : {}, {
    t: $props.editable
  }, $props.editable ? {
    v: common_vendor.o((...args) => $options.showPopup && $options.showPopup(...args))
  } : {}, {
    w: !$props.editable,
    x: $props.task.tag,
    y: common_vendor.o(($event) => $props.task.tag = $event.detail.value),
    z: common_vendor.t($options.branch),
    A: common_vendor.n(`bid${$options.branchid}`),
    B: common_vendor.t($options.userName),
    C: common_vendor.n(`bid${$options.branchid}`),
    D: common_vendor.s($props.editable ? "display:none" : "display:flex;flex-direction: column;"),
    E: common_vendor.t($data.status[$props.task.status]),
    F: common_vendor.s($props.editable ? "display:none" : "display:flex"),
    G: $data.vis
  }, $data.vis ? {
    H: common_vendor.o((...args) => $options.removeTask && $options.removeTask(...args)),
    I: common_vendor.o((...args) => $options.exitDel && $options.exitDel(...args))
  } : {}, {
    J: common_vendor.n(`task${$options.branchid}`),
    K: common_vendor.o((...args) => $options.detail && $options.detail(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/cardinfo/cardinfo.vue"]]);
wx.createComponent(Component);
