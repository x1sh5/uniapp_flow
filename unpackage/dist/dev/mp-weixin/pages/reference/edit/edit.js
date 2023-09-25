"use strict";
const common_vendor = require("../../../common/vendor.js");
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    const newArray = [];
    for (let i = 0; i < obj.length; i++) {
      newArray[i] = deepClone(obj[i]);
    }
    return newArray;
  }
  const newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key]);
    }
  }
  return newObj;
}
const _sfc_main = {
  data() {
    return {
      refer: {},
      dataLoaded: false
    };
  },
  computed: {
    lines() {
      let l = [];
      for (let i of Array.from(this.refer.content.keys())) {
        l.push({ id: i });
      }
      return l;
    }
  },
  methods: {
    commit(e) {
      if (this.refer.title === "") {
        common_vendor.index.showToast({
          title: "标题不能为空。"
        });
        return;
      }
      if (this.lines.length === 0) {
        common_vendor.index.showToast({
          title: "内容不能为空。"
        });
        return;
      }
      if (_.isEqual(this.refer, this.old)) {
        common_vendor.index.showToast({
          title: "内容未做改变。"
        });
        return;
      }
      let content = JSON.stringify(Array.from(this.refer.content));
      let qurl = this.$store.state.apiBaseUrl + "/api/Reference/" + this.refer.id;
      common_vendor.index.requestWithCookie({
        url: qurl,
        method: "PUT",
        data: { ...this.refer, content },
        success: (res) => {
          common_vendor.index.showModal({
            showCancel: false,
            content: res.data,
            success(r) {
              if (r.confirm) {
                common_vendor.index.navigateBack();
              }
            }
          });
        }
      });
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
    this.old = deepClone(common_vendor.markRaw(r));
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
  return {
    a: common_vendor.p({
      refer: $data.refer,
      editable: true
    }),
    b: common_vendor.o((...args) => $options.commit && $options.commit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/reference/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
