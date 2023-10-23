"use strict";
const common_vendor = require("../../common/vendor.js");
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
      console.log(event);
      let name = event.detail.value;
      if (name.length < 1) {
        this.nameCheckTip = "姓名不能为空";
        return;
      }
      let checkUrl = this.$store.state.apiBaseUrl + "/api/Account/namecheck?username=" + encodeURIComponent(name);
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
      console.log(event);
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
      this.pwdCheckTip = "";
      this.pwd = password;
      this.pwdVerify = true;
    },
    pwdVerifyEvent(event) {
      console.log(event);
      let affirmPwd = event.detail.value;
      if (affirmPwd !== this.pwd) {
        this.pwdVerifyTip = "必须跟密码保持一致。";
        return;
      }
      this.pwdAffirm = true;
    },
    emailCheckEvent(event) {
      console.log(event);
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
      console.log(event);
      let phone = event.detail.value;
      let checkUrl = this.$store.state.apiBaseUrl + "/api/Account/phonecheck?phoneNo=" + encodeURIComponent(phone);
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
      console.log(e);
      let registerView = {
        userName: e.detail.value.name,
        phoneNo: e.detail.value.phone,
        password: e.detail.value.affirm,
        email: e.detail.value.email
      };
      let url = this.$store.state.apiBaseUrl + "/api/Account/register";
      common_vendor.index.request({
        url,
        method: "POST",
        data: registerView,
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.showModal({
              title: "",
              content: "注册成功",
              cancelText: "返回",
              confirmText: "去登录",
              success: function(res2) {
                if (res2.confirm) {
                  common_vendor.index.switchTab({
                    url: "/pages/userCenter/userCenter"
                  });
                } else if (res2.cancel) {
                  console.log("用户点击取消");
                }
              }
            });
          } else {
            this.logintips = res.data.message;
          }
        }
      });
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
