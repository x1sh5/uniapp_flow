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
      console.log(e);
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
          console.log(res);
          if (res.confirm) {
            common_vendor.index.uploadFileWithCookie({
              url: qurl,
              filePath: "123",
              // 随便填，不为空即可  
              name: "123",
              // 随便填，不为空即可  
              //header: header, // 可以加access_token等  
              formData: { password: res.content },
              // 接口参数，json格式，底层自动转为FormData的格式数据  
              success: (res2) => {
                console.log(res2);
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/settings/unregister/unregister.vue"]]);
wx.createPage(MiniProgramPage);
