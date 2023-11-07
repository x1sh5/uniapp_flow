"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      curr: 0,
      lines: []
    };
  },
  props: {
    refer: Object,
    editable: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {},
  beforeMount() {
    console.log("beforeMount");
    this.curr = this.refer.content.size;
    if (this.curr > 0) {
      let l = [];
      for (let i of Array.from(this.refer.content.keys())) {
        l.push({ id: i });
      }
      this.lines = l;
    }
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    addLine(e) {
      this.refer.content.set(this.curr, { stitle: "", rate: "", brief: "", detail: "", remark: "" });
      this.lines.push({ id: this.curr++ });
    },
    delLine(id) {
      let index = this.lines.find((item) => item.id === id);
      if (index !== -1) {
        this.lines.splice(index, 1);
      }
      this.refer.content.delete(id);
    },
    stitleChange(e) {
      console.log(e);
    },
    rateChange(id) {
    },
    briefChange(id) {
    },
    detailChange(id) {
    },
    remarkChange(id) {
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeRouteEnter() {
    console.log("beforeRouteEnter");
  },
  beforeRouteLeave() {
    console.log("beforeRouteLeave");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: !$props.editable,
    b: $props.refer.title,
    c: common_vendor.o(($event) => $props.refer.title = $event.detail.value),
    d: !$props.editable,
    e: `stitle${_ctx.t.id}`,
    f: common_vendor.o(($event) => $options.stitleChange(_ctx.t.id)),
    g: $props.refer.content.get(_ctx.t.id).stitle,
    h: common_vendor.o(($event) => $props.refer.content.get(_ctx.t.id).stitle = $event.detail.value),
    i: !$props.editable,
    j: `rate${_ctx.t.id}`,
    k: common_vendor.o(($event) => $options.rateChange(_ctx.t.id)),
    l: $props.refer.content.get(_ctx.t.id).rate,
    m: common_vendor.o(($event) => $props.refer.content.get(_ctx.t.id).rate = $event.detail.value),
    n: !$props.editable,
    o: `brief${_ctx.t.id}`,
    p: common_vendor.o(($event) => $options.briefChange(_ctx.t.id)),
    q: $props.refer.content.get(_ctx.t.id).brief,
    r: common_vendor.o(($event) => $props.refer.content.get(_ctx.t.id).brief = $event.detail.value),
    s: !$props.editable,
    t: `detail${_ctx.t.id}`,
    v: common_vendor.o(($event) => $options.detailChange(_ctx.t.id)),
    w: $props.refer.content.get(_ctx.t.id).detail,
    x: common_vendor.o(($event) => $props.refer.content.get(_ctx.t.id).detail = $event.detail.value),
    y: !$props.editable,
    z: `remark${_ctx.t.id}`,
    A: common_vendor.o(($event) => $options.remarkChange(_ctx.t.id)),
    B: $props.refer.content.get(_ctx.t.id).remark,
    C: common_vendor.o(($event) => $props.refer.content.get(_ctx.t.id).remark = $event.detail.value),
    D: common_vendor.o(($event) => $options.delLine(_ctx.t.id)),
    E: $props.editable,
    F: $props.editable,
    G: common_vendor.o((...args) => $options.addLine && $options.addLine(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/Beifen/20230512流沙小程序开发/新建文件夹 (7)/uniapp_flow/components/refer/refer.vue"]]);
wx.createComponent(Component);
