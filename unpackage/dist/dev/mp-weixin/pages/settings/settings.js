"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: {
    imgsrc() {
      return this.$store.state.useravatar;
    }
  },
  methods: {
    identityCheck(e) {
      common_vendor.index.navigateTo({
        url: "identityCheck/identityCheck"
      });
    },
    unregister(e) {
      common_vendor.index.navigateTo({
        url: "unregister/unregister"
      });
    },
    avataSet(e) {
      common_vendor.index.showActionSheet({
        itemList: ["选择文件"],
        success: (e2) => {
          console.log(e2);
          if (e2.tapIndex === 0) {
            common_vendor.index.chooseImage({
              count: 1,
              crop: {
                with: 800,
                height: 800
              },
              success: (e3) => {
                console.log(e3);
                if (e3.tempFiles[0].size > 2 * 1024 * 1024) {
                  common_vendor.index.showToast({
                    title: "图片大小超过2M,请重新选择。"
                  });
                  return;
                }
                common_vendor.index.uploadFile({
                  name: "user-avatar",
                  filePath: e3.tempFilePaths[0],
                  url: this.$store.state.apiBaseUrl + "/api/Image/upload",
                  success: (res) => {
                    console.log(res);
                    if (res.statusCode === 201) {
                      let data = JSON.parse(res.data);
                      let imgurl = this.$store.state.apiBaseUrl + data[0].url;
                      this.$store.commit("setUserAvatar", imgurl);
                      common_vendor.index.requestWithCookie({
                        url: this.$store.state.apiBaseUrl + "/api/AuthUser/setavatar?avatar=" + encodeURIComponent(imgurl),
                        method: "POST",
                        success: () => {
                        }
                      });
                    }
                  }
                });
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
    a: $options.imgsrc,
    b: common_vendor.o((...args) => $options.avataSet && $options.avataSet(...args)),
    c: common_vendor.o((...args) => $options.identityCheck && $options.identityCheck(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/settings/settings.vue"]]);
wx.createPage(MiniProgramPage);
