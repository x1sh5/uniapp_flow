"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_storageKeys = require("../../../common/storageKeys.js");
const _sfc_main = {
  data() {
    return {
      pos: "",
      //正面照
      neg: "",
      //反面照
      posMd5: "",
      name: "",
      cardNo: "",
      cardNoChecked: false
    };
  },
  methods: {
    CardNoCheck(e) {
      if (/[0-9X]{18}/.test(this.cardNo)) {
        this.cardNoChecked = true;
        return;
      }
      common_vendor.index.showModal({
        showCancel: false,
        content: "身份证号格式不合法"
      });
    },
    check(e) {
      let qurl = this.$store.state.apiBaseUrl + "/api/IdentityInfo/check";
      if (!this.cardNoChecked) {
        common_vendor.index.showModal({
          showCancel: false,
          content: "身份证号格式不合法"
        });
        return;
      }
      common_vendor.index.uploadFile({
        url: qurl,
        filePath: this.pos,
        // 随便填，不为空即可  
        name: "posimg",
        // 随便填，不为空即可  
        //header: header, // 可以加access_token等  
        formData: {
          name: this.name,
          cardNo: this.cardNo
        },
        // 接口参数，json格式，底层自动转为FormData的格式数据  
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.setStorage({
              key: common_storageKeys.StorageKeys.isActive,
              data: true
            });
            common_vendor.index.navigateTo({
              url: "accountInfo/accountInfo?identity=" + res.data
            });
          } else {
            common_vendor.index.showModal({
              showCancel: true,
              content: res.data
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.name,
    b: common_vendor.o(($event) => $data.name = $event.detail.value),
    c: common_vendor.o((...args) => $options.CardNoCheck && $options.CardNoCheck(...args)),
    d: $data.cardNo,
    e: common_vendor.o(($event) => $data.cardNo = $event.detail.value),
    f: common_vendor.o((...args) => $options.check && $options.check(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/register/v2/v2.vue"]]);
wx.createPage(MiniProgramPage);
