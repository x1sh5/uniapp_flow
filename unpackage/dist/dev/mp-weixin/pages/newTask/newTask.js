"use strict";
const common_vendor = require("../../common/vendor.js");
const common_Task = require("../../common/Task.js");
const _sfc_main = {
  data() {
    return {
      counter: 1,
      tasks: [{
        "id": 0,
        "branchid": 1,
        "description": "",
        "finishtime": "0001-01-01T00:00:00",
        "presumedtime": false,
        "publishtime": "0001-01-01T00:00:00",
        "reward": "",
        "rewardtype": common_Task.RewardType.Fixed,
        "status": common_Task.TaskStatus.WaitForAccept,
        "title": "",
        "typeid": false,
        "verify": 0
      }],
      reffer: ""
    };
  },
  computed: {
    taskTypes() {
      return this.$store.state.taskTypes;
    }
  },
  created(op) {
    console.log("created");
    console.log(op);
  },
  onLoad(op) {
    console.log("onload");
    let reffer = op.createType;
    let taskType = op.typeid;
    console.log("reffer", reffer);
    console.log("taskType", taskType);
    this.tasks[0].typeid = taskType;
  },
  methods: {
    backEvent() {
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
    },
    submitEvent() {
      for (let item of this.tasks) {
        this.$refs["id" + item.id][0].publish();
      }
      common_vendor.index.navigateTo({
        url: "/pages/publishResult/publishResult"
      });
    },
    createTask(e) {
      console.log(e);
      this.tasks.push({
        "id": this.counter++,
        "username": false,
        "branchid": 1,
        "description": "",
        "finishtime": "0001-01-01T00:00:00",
        "presumedtime": false,
        "publishtime": "0001-01-01T00:00:00",
        "reward": "",
        "rewardtype": common_Task.RewardType.Fixed,
        "status": common_Task.TaskStatus.WaitForAccept,
        "title": "",
        "typeid": e.item.id,
        "verify": 0
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
  return {
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
        d: "329834dc-1-" + i0,
        e: common_vendor.p({
          task: item,
          editable: true
        })
      };
    }),
    e: common_vendor.o($options.createTask),
    f: common_vendor.p({
      horizontal: "right",
      content: $options.taskTypes,
      showProp: "name"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/newTask/newTask.vue"]]);
wx.createPage(MiniProgramPage);
