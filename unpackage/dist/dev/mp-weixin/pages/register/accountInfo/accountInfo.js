"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      logintips: "",
      nameCheckTip: "",
      //名字检查出错后的提示
      nameVerify: false,
      pwdCheckTip: "",
      pwdVerify: false,
      pwdVerifyTip: "",
      pwdAffirm: false,
      pwd: "",
      //密码暂存
      emailCheckTip: "",
      emailVerify: false,
      phoneCheckTip: "",
      phoneVerify: false
    };
  },
  methods: {
    nameCheckEvent(event) {
      let name = event.detail.value;
      if (name.length < 1) {
        this.nameCheckTip = "姓名不能为空";
        return;
      }
      let checkUrl = this.$store.state.apiBaseUrl + "/api/Account/namecheck?username=" + encodeURIComponent(
        name
      );
      common_vendor.index.request({
        url: checkUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            this.nameCheckTip = res.data.data.msg;
            if (res.data.data.status) {
              this.nameVerify = true;
            }
          }
        }
      });
    },
    pwdCheckEvent(event) {
      let password = event.detail.value;
      if (password.length < 8) {
        this.pwdCheckTip = "长度必须大于7位";
        return;
      }
      if (!/[A-Z]/.test(password)) {
        this.pwdCheckTip = "密码中必须要有大写字母";
        return;
      }
      if (!/\d/.test(password)) {
        this.pwdCheckTip = "密码中必须要有数字";
        return;
      }
      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password)) {
        this.pwdCheckTip = "密码中必须要有特殊字母";
        return;
      }
      this.pwdCheckTip = "密码可用";
      this.pwd = password;
      this.pwdVerify = true;
    },
    pwdVerifyEvent(event) {
      let affirmPwd = event.detail.value;
      if (affirmPwd !== this.pwd) {
        this.pwdVerifyTip = "必须跟密码保持一致";
        return;
      }
      this.pwdAffirm = true;
      this.pwdVerifyTip = "密码确认成功";
    },
    emailCheckEvent(event) {
      let email = event.detail.value;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isOk = regex.test(email);
      if (!isOk) {
        this.emailCheckTip = "邮箱格式不正确";
        return;
      }
      let checkUrl = this.$store.state.apiBaseUrl + "/api/Account/emailcheck?email=" + encodeURIComponent(email);
      common_vendor.index.request({
        url: checkUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            this.emailCheckTip = res.data.data.msg;
            if (res.data.data.status) {
              this.emailVerify = true;
            }
          }
        }
      });
    },
    phoneCheckEvent(event) {
      let phone = event.detail.value;
      let checkUrl = this.$store.state.apiBaseUrl + "/api/Account/phonecheck?phoneNo=" + encodeURIComponent(
        phone
      );
      common_vendor.index.request({
        url: checkUrl,
        success: (res) => {
          this.phoneCheckTip = res.data.data.msg;
          if (res.data.data.status) {
            this.phoneVerify = true;
          }
        }
      });
    },
    register(e) {
      let registerView = {
        userName: e.detail.value.name,
        phoneNo: e.detail.value.phone,
        password: e.detail.value.affirm,
        email: e.detail.value.email
      };
      let url = this.$store.state.apiBaseUrl + "/api/Account/register";
      if (this.isChecked == true) {
        common_vendor.index.request({
          url,
          method: "POST",
          data: registerView,
          success: (res) => {
            if (res.statusCode === 200) {
              common_vendor.index.showModal({
                title: "",
                content: "注册成功",
                cancelText: "去登录",
                confirmText: "实名认证",
                success: function(res2) {
                  if (res2.confirm) {
                    common_vendor.index.navigateTo({
                      url: "/pages/settings/identityCheck/identityCheck"
                    });
                  } else if (res2.cancel) {
                    common_vendor.index.switchTab({
                      url: "/pages/userCenter/userCenter"
                    });
                  }
                }
              });
            } else {
              common_vendor.index.showModal({
                showCancel: true,
                content: res.data.message
              });
              this.logintips = res.data.message;
            }
          }
        });
      } else {
        common_vendor.index.showModal({
          title: "",
          content: "请先勾选同意《用户协议》",
          showCancel: false,
          confirmText: "返回"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.nameCheckEvent && $options.nameCheckEvent(...args)),
    b: common_vendor.t($data.nameCheckTip),
    c: common_vendor.o((...args) => $options.pwdCheckEvent && $options.pwdCheckEvent(...args)),
    d: common_vendor.t($data.pwdCheckTip),
    e: common_vendor.o((...args) => $options.pwdVerifyEvent && $options.pwdVerifyEvent(...args)),
    f: common_vendor.t($data.pwdVerifyTip),
    g: common_vendor.o((...args) => $options.emailCheckEvent && $options.emailCheckEvent(...args)),
    h: common_vendor.t($data.emailCheckTip),
    i: common_vendor.o((...args) => $options.phoneCheckEvent && $options.phoneCheckEvent(...args)),
    j: common_vendor.t($data.phoneCheckTip),
    k: common_vendor.t($data.logintips),
    l: common_vendor.o((...args) => $options.register && $options.register(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/register/accountInfo/accountInfo.vue"]]);
wx.createPage(MiniProgramPage);
