"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_storageKeys = require("../../../common/storageKeys.js");
const _sfc_main = {
  data() {
    return {
      signature: "",
      signatureVerify: false
    };
  },
  onLoad() {
    try {
      const value = common_vendor.index.getStorageSync(common_storageKeys.StorageKeys.introduce);
      if (value) {
        this.signature = value;
      }
    } catch (e) {
    }
  },
  methods: {
    signatureCheckEvent(event) {
      let signature = event.detail.value;
      this.signature = signature;
    },
    setSignature(event) {
      let signature = this.signature;
      let checkUrl = this.$store.state.apiBaseUrl + "/api/AuthUser/set/introduce?introduce=" + encodeURIComponent(signature);
      common_vendor.index.requestWithCookie({
        url: checkUrl,
        method: "POST",
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.showToast({
              title: "保存成功",
              icon: "success"
            });
            that.$store.commit("setIntroduce", this.signature);
            common_vendor.index.navigateBack();
          } else {
            common_vendor.index.showToast({
              title: "保存失败",
              icon: "error"
            });
          }
          if (res.data.data.status) {
            this.signatureVerify = true;
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.signature,
    b: common_vendor.o((...args) => $options.signatureCheckEvent && $options.signatureCheckEvent(...args)),
    c: common_vendor.o((...args) => $options.setSignature && $options.setSignature(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/settings/signature/signature.vue"]]);
wx.createPage(MiniProgramPage);
