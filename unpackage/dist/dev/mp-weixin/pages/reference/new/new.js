"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      refer: {
        title: "",
        lines: new Array(),
        content: /* @__PURE__ */ new Map()
      }
    };
  },
  computed: {
    lines() {
      let l = [];
      for (let i of Array.from(this.refer.content.keys())) {
        l.push({
          id: i
        });
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
      let content = JSON.stringify(Array.from(this.refer.content));
      let qurl = this.$store.state.apiBaseUrl + "/api/Reference";
      common_vendor.index.requestWithCookie({
        url: qurl,
        method: "POST",
        data: {
          id: 0,
          title: this.refer.title,
          content,
          authId: 0,
          userName: ""
        },
        success: (res) => {
          common_vendor.index.showModal({
            showCancel: false,
            content: res.data
          });
        }
      });
    }
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/reference/new/new.vue"]]);
wx.createPage(MiniProgramPage);
