"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "cardinfo",
  props: {
    taskIndex: Number,
    //task 在数组中的索引
    task: Object,
    //颜色代码
    colorid: Number,
    //可编辑组件（input,textarea等）是否能编辑，默认不能编辑
    editable: Boolean
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
        return this.$store.getters.getTaskType(this.task.typeid);
      }
    },
    branch: {
      get() {
        return this.$store.getters.getBranch(this.task.branchid);
      }
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
    spendtime: {
      get() {
        if (this.task.presumedtime === false) {
          return "";
        }
        if (!this.nullTask) {
          return (this.task.presumedtime / 60).toFixed(2);
        }
        return "";
      },
      set(value) {
        this.task.presumedtime = value * 60;
      }
    },
    title: {
      get() {
        return this.task.title;
      },
      set(value) {
        this.task.title = value;
      }
    }
  },
  methods: {
    branchChange(e) {
      console.log("picker发送选择改变，携带值为", e);
      this.branchIndex = e.detail.value;
    },
    rewardTypeChange(e) {
      console.log("rewardType 改变，携带值为", e);
      this.$rewardTypeValue = e;
    },
    detail(e) {
      if (!this.$store.state.$hasLogin) {
        common_vendor.index.navigateTo({
          url: "/pages/logintips/logintips"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/taskDetail/taskDetail?id=" + this.task.id
        });
      }
    }
  },
  data() {
    return {
      // 预计时间
      //spendtime:"",
      //tasktype:"类型",
      status: ["代接", "完成", "审核中"],
      branchIndex: false,
      $rewardTypeValue: 0,
      rewardtype: {
        value: 0,
        options: [
          {
            text: "￥",
            value: "￥",
            selected: true
          },
          {
            text: "%",
            value: "%"
          }
        ]
      }
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
  return {
    a: common_vendor.n(`fontcolor${$options.Id % 3} poster`),
    b: common_vendor.t($options.Id),
    c: !$props.editable,
    d: $options.title,
    e: common_vendor.n(`fontcolor${$options.Id % 3}`),
    f: !$props.editable,
    g: $options.spendtime,
    h: common_vendor.n(`fontcolor${$options.Id % 3}`),
    i: !$props.editable,
    j: $props.task.reward,
    k: common_vendor.o($options.rewardTypeChange),
    l: common_vendor.o(($event) => $data.$rewardTypeValue = $event),
    m: common_vendor.p({
      localdata: $data.rewardtype.options,
      clear: false,
      placeholder: "类型",
      disabled: !$props.editable,
      modelValue: $data.$rewardTypeValue
    }),
    n: common_vendor.t($options.taskType),
    o: common_vendor.t($options.branchs[$options.branchOrder]["name"]),
    p: !$props.editable,
    q: $options.branchs,
    r: $options.branchOrder,
    s: common_vendor.n(`fontcolor${$options.Id % 3}`),
    t: common_vendor.o((...args) => $options.branchChange && $options.branchChange(...args)),
    v: common_vendor.t($options.userName),
    w: common_vendor.n(`fontcolor${$options.Id % 3}`),
    x: common_vendor.s($props.editable ? "display:none" : "display:flex"),
    y: common_vendor.t($data.status[$props.task.status]),
    z: common_vendor.s($props.editable ? "display:none" : "display:flex"),
    A: common_vendor.n(`task${$options.Id % 3}`),
    B: common_vendor.o((...args) => $options.detail && $options.detail(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/cardinfo/cardinfo.vue"]]);
wx.createComponent(Component);
