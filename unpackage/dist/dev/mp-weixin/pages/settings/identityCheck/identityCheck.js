"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      pos: "",
      neg: ""
    };
  },
  methods: {
    uploadPos(e) {
      this.$store.dispatch("upload").then((res) => {
        let o = JSON.parse(res.data);
        this.pos = this.$store.state.apiBaseUrl + o[0].url;
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err.message
        });
      });
    },
    uploadNeg(e) {
      this.$store.dispatch("upload").then((res) => {
        let o = JSON.parse(res.data);
        this.neg = this.$store.state.apiBaseUrl + o[0].url;
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err.message
        });
      });
    },
    check(e) {
      let qurl = this.$store.state.apiBaseUrl + "/api/Image/upload";
      common_vendor.index.uploadFile({
        url: qurl,
        filePath: "123",
        // 随便填，不为空即可  
        name: "123",
        // 随便填，不为空即可  
        //header: header, // 可以加access_token等  
        formData: { posimg: this.pos, negimg: this.neg },
        // 接口参数，json格式，底层自动转为FormData的格式数据  
        success: (res) => {
          console.log(res);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.pos,
    b: common_vendor.o((...args) => $options.uploadPos && $options.uploadPos(...args)),
    c: $data.neg,
    d: common_vendor.o((...args) => $options.uploadNeg && $options.uploadNeg(...args)),
    e: common_vendor.o((...args) => $options.check && $options.check(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/settings/identityCheck/identityCheck.vue"]]);
wx.createPage(MiniProgramPage);
