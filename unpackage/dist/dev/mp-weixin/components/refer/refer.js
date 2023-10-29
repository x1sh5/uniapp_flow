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
    d: common_vendor.f($data.lines, (t, k0, i0) => {
      return {
        a: `stitle${t.id}`,
        b: common_vendor.o(($event) => $options.stitleChange(t.id), t.id),
        c: $props.refer.content.get(t.id).stitle,
        d: common_vendor.o(($event) => $props.refer.content.get(t.id).stitle = $event.detail.value, t.id),
        e: `rate${t.id}`,
        f: common_vendor.o(($event) => $options.rateChange(t.id), t.id),
        g: $props.refer.content.get(t.id).rate,
        h: common_vendor.o(($event) => $props.refer.content.get(t.id).rate = $event.detail.value, t.id),
        i: `brief${t.id}`,
        j: common_vendor.o(($event) => $options.briefChange(t.id), t.id),
        k: $props.refer.content.get(t.id).brief,
        l: common_vendor.o(($event) => $props.refer.content.get(t.id).brief = $event.detail.value, t.id),
        m: `detail${t.id}`,
        n: common_vendor.o(($event) => $options.detailChange(t.id), t.id),
        o: $props.refer.content.get(t.id).detail,
        p: common_vendor.o(($event) => $props.refer.content.get(t.id).detail = $event.detail.value, t.id),
        q: `remark${t.id}`,
        r: common_vendor.o(($event) => $options.remarkChange(t.id), t.id),
        s: $props.refer.content.get(t.id).remark,
        t: common_vendor.o(($event) => $props.refer.content.get(t.id).remark = $event.detail.value, t.id),
        v: common_vendor.o(($event) => $options.delLine(t.id), t.id),
        w: t.id
      };
    }),
    e: !$props.editable,
    f: !$props.editable,
    g: !$props.editable,
    h: !$props.editable,
    i: !$props.editable,
    j: $props.editable,
    k: $props.editable,
    l: common_vendor.o((...args) => $options.addLine && $options.addLine(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/refer/refer.vue"]]);
wx.createComponent(Component);
