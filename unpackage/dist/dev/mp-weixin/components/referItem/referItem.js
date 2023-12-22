"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "referItem",
  data() {
    return {};
  },
  props: {
    item: Object,
    id: Number,
    // stitle: {
    // 	type: String,
    // 	default: ""
    // },
    // rate: {
    // 	type: String,
    // 	default: ""
    // },
    // brief: {
    // 	type: String,
    // 	default: ""
    // },
    // detail: {
    // 	type: String,
    // 	default: ""
    // },
    // remark: {
    // 	type: String,
    // 	default: ""
    // },
    //是否能编辑
    editable: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    min: {
      get() {
        let mm = this.item.rate.split("-");
        if (mm.length == 2) {
          return mm[0];
        }
        return "";
      },
      set(value) {
        this.item.rate = `${value}-${this.max}`;
      }
    },
    max: {
      get() {
        let mm = this.item.rate.split("-");
        if (mm.length == 2) {
          return mm[1];
        }
        return "";
      },
      set(value) {
        this.item.rate = `${this.min}-${value}`;
      }
    }
  },
  methods: {
    delLine(e) {
      this.$emit("del-Line", this.id);
    },
    stitleChange(e) {
      this.item.stitle = e.detail.value;
    },
    rateChange(e) {
      this.item.rate = e.detail.value;
    },
    briefChange(e) {
      this.item.brief = e.detail.value;
    },
    detailChange(e) {
      this.item.detail = e.detail.value;
    },
    remarkChange(e) {
      this.item.remark = e.detail.value;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: !$props.editable,
    b: $props.item.stitle,
    c: common_vendor.o((...args) => $options.stitleChange && $options.stitleChange(...args)),
    d: $options.min,
    e: common_vendor.o(($event) => $options.min = $event.detail.value),
    f: $options.max,
    g: common_vendor.o(($event) => $options.max = $event.detail.value),
    h: !$props.editable,
    i: $props.item.brief,
    j: common_vendor.o((...args) => $options.briefChange && $options.briefChange(...args)),
    k: !$props.editable,
    l: $props.item.detail,
    m: common_vendor.o((...args) => $options.detailChange && $options.detailChange(...args)),
    n: common_vendor.o((...args) => $options.delLine && $options.delLine(...args)),
    o: $props.editable
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/referItem/referItem.vue"]]);
wx.createComponent(Component);
