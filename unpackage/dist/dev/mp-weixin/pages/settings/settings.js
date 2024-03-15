"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../common/storageKeys.js");
const common_ossutil = require("../../common/ossutil.js");
require("../../common/const.js");
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
            common_vendor.wx$1.chooseMessageFile({
              count: 1,
              type: "image",
              success: (res) => {
                let fileinfo = res.tempFiles[0];
                if (fileinfo.size > 2 * 1024 * 1024) {
                  common_vendor.index.showToast({
                    title: "图片大小超过2M,请重新选择。"
                  });
                  return;
                }
                let fmana = common_vendor.wx$1.getFileSystemManager();
                fmana.readFile({ filePath: fileinfo.path, success: (file) => {
                  console.log(file);
                  fileinfo.data = file.data;
                  common_ossutil.uploadFile(fileinfo, "images/", (resl) => {
                    if (res.statusCode === 200) {
                      let data = JSON.parse(res.data);
                      let imgurl = this.$store.state.apiBaseUrl + data.url;
                      this.$store.commit("setUserAvatar", imgurl);
                      common_vendor.index.requestWithCookie({
                        url: this.$store.state.apiBaseUrl + "/api/AuthUser/setavatar?avatar=" + encodeURIComponent(imgurl),
                        method: "POST",
                        success: () => {
                        }
                      });
                    }
                  });
                } });
              },
              fail: (err) => {
                console.log(err);
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
    f: common_vendor.o((...args) => _ctx.toinstructions && _ctx.toinstructions(...args)),
    g: common_vendor.o((...args) => _ctx.toinstructions && _ctx.toinstructions(...args)),
    h: common_vendor.o((...args) => $options.emailBind && $options.emailBind(...args)),
    i: common_vendor.o((...args) => $options.unregister && $options.unregister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/settings/settings.vue"]]);
wx.createPage(MiniProgramPage);
