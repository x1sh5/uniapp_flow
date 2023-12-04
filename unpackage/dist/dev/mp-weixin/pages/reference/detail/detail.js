"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /**
       * @type {object} refer 审核区间参考
       * @type {Number} refer.id 
       * @type {String} refer.title 标题 
       * @type {String} refer.createtime 创建时间
       * @type {String} refer.content 内容：Map {Id:referItem}序列化后的内容
       * @type {String} refer.authid 作者id
       * @type {String} refer.version 版本
       * @type {String} refer.username 作者用户名
       */
      refer: {},
      dataLoaded: false
    };
  },
  methods: {
    edit(e) {
      common_vendor.index.navigateTo({
        url: "/pages/reference/edit/edit?id=" + this.id
      });
    },
    history(e) {
      common_vendor.index.navigateTo({
        url: "/pages/reference/history/history?id=" + this.id
      });
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  beforeRouteEnter() {
    console.log("beforeRouteEnter");
  },
  beforeRouteLeave() {
    console.log("beforeRouteLeave");
  },
  mounted() {
    console.log("mounted");
  },
  computed: {
    r() {
      return this.refer;
    }
  },
  onLoad(op) {
    console.log("onload");
    this.id = op.id;
    let kv;
    let r = this.$store.getters["Refer/getReferById"](this.id);
    if (!(r.content instanceof Map)) {
      kv = JSON.parse(r.content);
      let content = /* @__PURE__ */ new Map();
      if (typeof kv[Symbol.iterator] === "function") {
        for (let e of kv) {
          if (Array.isArray(e) && e.length === 2) {
            content.set(e[0], e[1]);
          }
        }
      }
      r.content = content;
    }
    this.refer = r;
    this.dataLoaded = true;
  }
};
if (!Array) {
  const _easycom_refer2 = common_vendor.resolveComponent("refer");
  _easycom_refer2();
}
const _easycom_refer = () => "../../../components/refer/refer.js";
if (!Math) {
  _easycom_refer();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.dataLoaded
  }, $data.dataLoaded ? {
    b: common_vendor.p({
      refer: $data.refer,
      editable: false
    })
  } : {}, {
    c: common_vendor.o((...args) => $options.edit && $options.edit(...args)),
    d: common_vendor.o((...args) => $options.history && $options.history(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/reference/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
