"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      email: "",
      regex: new RegExp(String.raw`^[a-zA-Z0-9._%#&'*$+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`),
      showCode: false,
      code: "",
      newEmail: "",
      mode: "bindnew"
      //bindnew, show
    };
  },
  computed: {
    state() {
      if (this.email)
        return true;
      return false;
    }
  },
  methods: {
    bindChange(e) {
      this.mode = "bindnew";
    },
    async sendCode(e) {
      let match = this.regex.test(this.newEmail);
      if (match) {
        common_vendor.index.requestWithCookie({
          url: this.$store.state.apiBaseUrl + "/api/AuthUser/emailcode/send?email=" + this.newEmail,
          success: (res) => {
            if (res.statusCode !== 204) {
              common_vendor.index.showModal({
                showCancel: true,
                content: res.data
              });
            } else {
              this.showCode = true;
              this.countDown();
            }
          }
        });
      } else {
        common_vendor.index.showModal({
          showCancel: true,
          content: "不合法的邮箱地址。"
        });
      }
    },
    bindEmail(e) {
      common_vendor.index.requestWithCookie({
        url: this.$store.state.apiBaseUrl + "/api/AuthUser/emailcode/confirm?code=" + this.code,
        method: "POST",
        success: (res) => {
          common_vendor.index.showModal({
            showCancel: true,
            content: res.data
          });
        }
      });
    },
    //验证码倒计时
    countDown() {
      let t = null;
      let timer = 60;
      this.btnDis = true;
      clearInterval(t);
      this.btnText = `${timer}s`;
      t = setInterval(
        () => {
          if (timer == 0) {
            clearInterval(t);
            this.btnText = "重新发送";
            this.btnDis = false;
            return;
          }
          timer--;
          this.btnText = `${timer}s`;
        },
        1e3
      );
    }
  },
  onLoad() {
    common_vendor.index.requestWithCookie({
      url: this.$store.state.apiBaseUrl + "/api/AuthUser/email",
      success: (res) => {
        if (res.statusCode === 200) {
          this.email = res.data;
          this.mode = "show";
        }
      }
    });
  }
};
if (!Array) {
  const _easycom_xt_verify_code2 = common_vendor.resolveComponent("xt-verify-code");
  _easycom_xt_verify_code2();
}
const _easycom_xt_verify_code = () => "../../../uni_modules/xt-verify-code/components/xt-verify-code/xt-verify-code.js";
if (!Math) {
  _easycom_xt_verify_code();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.mode == "show"
  }, $data.mode == "show" ? {
    b: $data.email,
    c: common_vendor.o(($event) => $data.email = $event.detail.value),
    d: common_vendor.o((...args) => $options.bindChange && $options.bindChange(...args))
  } : {}, {
    e: $data.mode == "bindnew"
  }, $data.mode == "bindnew" ? {
    f: $data.newEmail,
    g: common_vendor.o(($event) => $data.newEmail = $event.detail.value),
    h: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    i: common_vendor.t($data.email),
    j: common_vendor.o(($event) => $data.code = $event),
    k: common_vendor.p({
      inputType: "text",
      type: "bottom",
      modelValue: $data.code
    }),
    l: common_vendor.o((...args) => $options.bindEmail && $options.bindEmail(...args)),
    m: $data.showCode
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/settings/emailBind/emailBind.vue"]]);
wx.createPage(MiniProgramPage);
