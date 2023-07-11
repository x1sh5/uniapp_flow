"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "cardinfo",
  props: {
    task: Object,
    //颜色代码
    colorid: Number,
    //可编辑组件（input,textarea等）是否能编辑，默认不能编辑
    editable: Boolean
  },
  created() {
    console.log(this.task);
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
    branchs() {
      return this.$store.state.branchs;
    },
    taskTypes() {
      return this.$store.state.taskTypes;
    },
    branch: {
      get() {
        return this.editable ? this.branchs[index]["name"] : this.branchs[this.task.branchid]["name"];
      },
      set(value) {
        this.task.branchid = value;
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
      this.branch = e.detail.value;
    }
  },
  data() {
    return {
      // 预计时间
      spendtime: "",
      deparment: "",
      index: 0,
      tasktype: "类型",
      status: ["代接", "完成", "审核中"],
      rewardtype: {
        value: "￥",
        options: [
          {
            text: "元",
            value: "￥",
            selected: true
          },
          {
            text: "百分比",
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
    a: common_vendor.n(`fontcolor{Id%3} poster`),
    b: common_vendor.t($options.Id),
    c: !$props.editable,
    d: $options.title,
    e: common_vendor.n(`fontcolor{Id%3}`),
    f: !$props.editable,
    g: $props.editable ? "" : $data.spendtime,
    h: common_vendor.n(`fontcolor{Id%3}`),
    i: common_vendor.t($props.task.reward),
    j: common_vendor.t($data.rewardtype.value),
    k: common_vendor.o(($event) => _ctx.value = $event),
    l: common_vendor.p({
      localdata: $data.rewardtype.options,
      clear: false,
      placeholder: "类型",
      modelValue: _ctx.value
    }),
    m: common_vendor.t($data.tasktype),
    n: common_vendor.t($options.branch),
    o: !$props.editable,
    p: $options.branchs,
    q: _ctx.name,
    r: $data.index,
    s: common_vendor.o((...args) => $options.branchChange && $options.branchChange(...args)),
    t: common_vendor.t($options.userName),
    v: common_vendor.n(`fontcolor{Id%3}`),
    w: common_vendor.t($data.status[$props.task.status]),
    x: common_vendor.n(`task{Id%3} columnlayout`)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/components/cardinfo/cardinfo.vue"]]);
wx.createComponent(Component);
