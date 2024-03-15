"use strict";
const common_vendor = require("../../common/vendor.js");
const common_Task = require("../../common/Task.js");
const common_ossutil = require("../../common/ossutil.js");
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
      return !this.editable;
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
            name: "固定金额",
            selected: true,
            disable: this.taskType && this.taskType.rewardType === "only percent"
          },
          {
            text: "%",
            value: "2",
            name: "回馈比",
            disable: this.taskType && this.taskType.rewardType === "only fixed"
          }
        ]
      };
    }
  },
  methods: {
    handleTimeChange(e) {
      this.selectedTime = e.detail.value;
    },
    addZero(num) {
      return num < 10 ? "0" + num : "" + num;
    },
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
    preprocess(payload) {
      let contentHtml = payload.ctx.html;
      this.updateDes(contentHtml);
      let fmana = common_vendor.wx$1.getFileSystemManager();
      for (let fileinfo of payload.files) {
        let f = {};
        if(fileinfo.attributes["data-custom"]){
          let attrs = fileinfo.attributes["data-custom"].split("&");
          for(let attr of attrs){
            let [k,v] = attr.split("=");
            f[k] = v;
          }
        }
        f["path"] = fileinfo.insert.image;
        fmana.readFile({ filePath: f.path, success: (file) => {
          console.log(file);
          f.data = file.data;
          common_ossutil.uploadFile(f,"images/", (resl) => {
            if (resl.statusCode === 200) {
              common_vendor.index.showToast({
                title: "上传成功！"
              });
              let search = '<img src="' + file.path  + '" alt="图像">';
              let replace = '<img src="' + resl.data.url + '">';
              contentHtml = contentHtml.replace(search, replace);
              this.updateDes(contentHtml);
            } else {
              common_vendor.index.showToast({
                title: file.name + " :上传失败！"
              });
            }
          });
        } });
      }
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
      branchIndex: false,
      selectedTime: [0, 0, 0],
      // 默认选择为 0 天 0 时 0 分
      timeRange: [
        // 天的范围是 0-365，时和分的范围是 0-23 和 0-59
        Array.from({ length: 366 }, (_, i) => `${i} 天`),
        Array.from({ length: 24 }, (_, i) => `${this.addZero(i)} 时`),
        Array.from({ length: 60 }, (_, i) => `${this.addZero(i)} 分`)
      ]
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
    a: common_vendor.n(`bid${$options.branchid} poster`),
    b: common_vendor.t($options.branchid),
    c: common_vendor.t($options.Id),
    d: $options.titleditable,
    e: $options.title,
    f: common_vendor.o((...args) => $options.updateBrief && $options.updateBrief(...args)),
    g: common_vendor.n(`bid${$options.branchid}`),
    h: common_vendor.t($data.selectedTime[0]),
    i: common_vendor.t($data.selectedTime[1]),
    j: common_vendor.t($data.selectedTime[2]),
    k: $data.selectedTime,
    l: $data.timeRange,
    m: common_vendor.o((...args) => $options.handleTimeChange && $options.handleTimeChange(...args)),
    n: common_vendor.n(`bid${$options.branchid}`),
    o: $options.rewardEditable,
    p: $options.reward,
    q: common_vendor.o(($event) => $options.reward = $event.detail.value),
    r: common_vendor.t($options.rewardSymbol),
    s: $props.editable
  }, $props.editable ? {
    t: common_vendor.o($options.rewardTypeChange),
    v: common_vendor.p({
      disabled: $props.task.main === 1,
      localdata: $options.rewardtypeSymbol.options,
      clear: false,
      modelValue: $options.rewardtype,
      placeholder: "回馈类型"
    })
  } : {}, {
    w: $props.editable
  }, $props.editable ? {
    x: common_vendor.o((...args) => $options.showPopup && $options.showPopup(...args))
  } : {}, {
    y: !$props.editable,
    z: $props.task.tag,
    A: common_vendor.o(($event) => $props.task.tag = $event.detail.value),
    B: common_vendor.t($options.branch),
    C: common_vendor.n(`bid${$options.branchid}`),
    D: common_vendor.t($options.userName),
    E: common_vendor.n(`bid${$options.branchid}`),
    F: common_vendor.s($props.editable ? "display:none" : "display:flex;flex-direction: column;"),
    G: common_vendor.t($data.status[$props.task.status]),
    H: common_vendor.s($props.editable ? "display:none" : "display:flex"),
    I: $data.vis
  }, $data.vis ? {
    J: common_vendor.o((...args) => $options.removeTask && $options.removeTask(...args)),
    K: common_vendor.o((...args) => $options.exitDel && $options.exitDel(...args))
  } : {}, {
    L: common_vendor.n(`task${$options.branchid}`),
    M: common_vendor.o((...args) => $options.detail && $options.detail(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/cardinfo/cardinfo.vue"]]);
wx.createComponent(Component);
