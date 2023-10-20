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
        itemList: ["从相册选择", "拍照"],
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
                    if (res.statusCode === 201)
                      this.$store.commit("setUserAvatar", res.data[0].url);
                  }
                });
              }
            });
          }
          if (e2.tapIndex === 1)
            ;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.imgsrc,
    b: common_vendor.o((...args) => $options.avataSet && $options.avataSet(...args)),
    c: common_vendor.o((...args) => $options.identityCheck && $options.identityCheck(...args)),
    d: common_vendor.o((...args) => $options.unregister && $options.unregister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/settings/settings.vue"]]);
wx.createPage(MiniProgramPage);
