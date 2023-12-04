"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      curr: 0,
      //分配模式的总条数
      referItems: []
    };
  },
  props: {
    /**
     * @type {Map} refer 
     */
    refer: Object,
    //是否能编辑
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
      for (let i of this.refer.content) {
        l.push({
          id: i[0],
          ...i[1]
        });
      }
      this.referItems = l;
    }
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    addLine(e) {
      const currentId = this.curr++;
      this.referItems.push({
        id: currentId,
        stitle: "",
        rate: "",
        brief: "",
        detail: "",
        remark: ""
      });
    },
    delLine(id) {
      let index = this.referItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.referItems.splice(index, 1);
      }
      this.refer.content.delete(id);
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
if (!Array) {
  const _easycom_referItem2 = common_vendor.resolveComponent("referItem");
  _easycom_referItem2();
}
const _easycom_referItem = () => "../referItem/referItem.js";
if (!Math) {
  _easycom_referItem();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: !$props.editable,
    b: $props.refer.title,
    c: common_vendor.o(($event) => $props.refer.title = $event.detail.value),
    d: common_vendor.f($data.referItems, (r, k0, i0) => {
      return {
        a: common_vendor.o($options.delLine, r.id),
        b: r.id,
        c: "86c01172-0-" + i0,
        d: common_vendor.p({
          item: r,
          id: r.id,
          editable: $props.editable
        }),
        e: r.id
      };
    }),
    e: $props.editable,
    f: common_vendor.o((...args) => $options.addLine && $options.addLine(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/components/refer/refer.vue"]]);
wx.createComponent(Component);
