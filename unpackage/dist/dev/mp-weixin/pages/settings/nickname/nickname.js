"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../common/storageKeys.js");
const _sfc_main = {
  data() {
    return {
      nickname: "",
      nicknameCheckTip: "",
      nicknameVerify: false
    };
  },
  onLoad() {
    this.nickname = this.$store.state.$userName;
  },
  methods: {
    nicknameCheckEvent(event) {
      let nickname = event.detail.value;
      this.nickname = nickname;
      if (/[ !@#$%^&*()+{}\[\]:;<>,.?~\-，。？、《》【】（）]/.test(nickname)) {
        this.nicknameCheckTip = "昵称不能包含特殊字符";
        return;
      }
      let checkUrl = this.$store.state.apiBaseUrl + "/api/Account/namecheck?username=" + encodeURIComponent(nickname);
      common_vendor.index.request({
        url: checkUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            this.nicknameCheckTip = res.data.data.msg;
          }
          if (res.data.data.status) {
            this.nicknameVerify = true;
          }
        }
      });
    },
    setNickname(event) {
      let nickname = this.nickname;
      let checkUrl = this.$store.state.apiBaseUrl + "/api/AuthUser/set/nickname?nickname=" + encodeURIComponent(nickname);
      common_vendor.index.requestWithCookie({
        url: checkUrl,
        method: "POST",
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.showToast({
              title: "保存成功",
              icon: "success"
            });
            this.$store.commit("setUserName", this.nickname);
            common_vendor.index.navigateBack();
          } else {
            common_vendor.index.showToast({
              title: "保存失败",
              icon: "error"
            });
          }
          if (res.data.data.status) {
            this.nicknameVerify = true;
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.nickname,
    b: common_vendor.o((...args) => $options.nicknameCheckEvent && $options.nicknameCheckEvent(...args)),
    c: common_vendor.t($data.nicknameCheckTip),
    d: common_vendor.o((...args) => $options.setNickname && $options.setNickname(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/settings/nickname/nickname.vue"]]);
wx.createPage(MiniProgramPage);
