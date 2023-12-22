"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../common/storageKeys.js");
const _sfc_main = {
  data() {
    return {
      nickname: ""
    };
  },
  onLoad() {
    this.nickname = this.$store.state.$userName;
  },
  computed: {
    imgsrc() {
      return this.$store.state.useravatar;
    },
    NickName() {
      return this.$store.state.$userName;
    }
  },
  methods: {
    avataSet(e) {
      common_vendor.index.showActionSheet({
        itemList: ["选择文件"],
        success: (e2) => {
          if (e2.tapIndex === 0) {
            common_vendor.index.chooseImage({
              count: 1,
              crop: {
                with: 800,
                height: 800
              },
              success: (e3) => {
                if (e3.tempFiles[0].size > 5 * 1024 * 1024) {
                  common_vendor.index.showToast({
                    title: "图片大小超过5M,请重新选择。"
                  });
                  return;
                }
                common_vendor.index.uploadFile({
                  name: "user-avatar",
                  filePath: e3.tempFilePaths[0],
                  url: this.$store.state.apiBaseUrl + "/api/Image/upload",
                  success: (res) => {
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
    },
    nicknameSetting(e) {
      common_vendor.index.navigateTo({
        url: "nickname/nickname"
      });
    },
    signatureSetting(e) {
      common_vendor.index.navigateTo({
        url: "signature/signature"
      });
    },
    phoneBind(e) {
      common_vendor.index.navigateTo({
        url: "phoneBind/phoneBind"
      });
    },
    emailBind(e) {
      common_vendor.index.navigateTo({
        url: "emailBind/emailBind"
      });
    },
    unregister(e) {
      common_vendor.index.navigateTo({
        url: "unregister/unregister"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.imgsrc,
    b: common_vendor.o((...args) => $options.avataSet && $options.avataSet(...args)),
    c: common_vendor.t(_ctx.Nickname),
    d: common_vendor.o((...args) => $options.nicknameSetting && $options.nicknameSetting(...args)),
    e: common_vendor.o((...args) => $options.signatureSetting && $options.signatureSetting(...args)),
    f: common_vendor.o((...args) => $options.emailBind && $options.emailBind(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/settings/settings.vue"]]);
wx.createPage(MiniProgramPage);
