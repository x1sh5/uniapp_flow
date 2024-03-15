"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      known: false
    };
  },
  methods: {
    checkboxChange(e) {
      if (e.detail.value[0]) {
        this.known = true;
      } else {
        this.known = false;
      }
    },
    unregister(e) {
      let qurl = this.$store.state.apiBaseUrl + "/api/Account/unregister/";
      common_vendor.index.showModal({
        title: "请输入密码确认！",
        editable: true,
        placeholderText: "密码...",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.requestWithCookie({
              url: qurl,
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: { password: res.content },
              // 接口参数，json格式，底层自动转为FormData的格式数据  
              success: (res2) => {
                if (res2.statusCode === 200) {
                  common_vendor.index.showModal({
                    content: res2.data,
                    showCancel: false,
                    success: (res3) => {
                      this.$store.commit("disconnect");
                      common_vendor.index.clearStorageSync();
                      common_vendor.index.reLaunch({
                        url: "/pages/userCenter/userCenter"
                      });
                    }
                  });
                } else {
                  common_vendor.index.showModal({
                    content: res2.data
                  });
                }
              }
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args)),
    b: !$data.known,
    c: common_vendor.o((...args) => $options.unregister && $options.unregister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/settings/unregister/unregister.vue"]]);
wx.createPage(MiniProgramPage);
