"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      $enable: false,
      task: {
        "id": false,
        "username": false,
        "branchid": 1,
        "description": "任务描述",
        "finishtime": "0001-01-01T00:00:00",
        "deadline": "",
        "publishtime": "0001-01-01T00:00:00",
        "fixedReward": "",
        "percentReward": "",
        "rewardtype": 1,
        "status": 1,
        "title": "",
        "tag": "",
        "verify": 0
      },
      mode: {
        type: String,
        default() {
          return "done";
        }
      },
      status: ["waitfor", "undone", "done", "announcement"]
    };
  },
  created() {
    this.task = this.$store.state.currentTask;
  },
  computed: {
    enable() {
      return this.$data.$enable;
    },
    html: {
      get() {
        return this.task.description;
      }
    },
    balance() {
      return this.task.fixedReward / 100;
    }
  },
  onLoad(op) {
    console.log("options:", op);
    this.id = op.id;
    this.refer = op.refer;
    let task = this.$store.getters.getTaskById(this.id);
    if (task !== void 0) {
      this.task = task;
    } else {
      let qurl = this.$store.state.apiBaseUrl + "/api/Assignment/" + this.id;
      common_vendor.index.requestWithCookie({
        url: qurl,
        success: (res) => {
          if (res.statusCode == 200) {
            this.task = res.data;
          }
        }
      });
    }
    this.mode = this.status[this.task.status];
  },
  methods: {
    del(e) {
      let qurl = this.$store.state.apiBaseUrl + "/api/Assignment/delete/" + this.task.id;
      common_vendor.index.requestWithCookie({
        url: qurl,
        method: "DELETE",
        success: (res) => {
          if (res.statusCode === 204) {
            common_vendor.index.showToast({
              title: "删除成功。"
            });
            const pages = getCurrentPages();
            let prep = pages[pages.length - 2];
            prep.removeById(this.task.id);
            common_vendor.index.navigateBack();
          }
          if (res.statusCode === 404) {
            common_vendor.index.showModal({
              content: "无效的任务。"
            });
          }
          if (res.statusCode === 409) {
            common_vendor.index.showModal({
              content: "任务已被他人接取,请等待任务完成或被放弃。"
            });
          }
        }
      });
    },
    pay(e) {
      let qurl = this.$store.state.apiBaseUrl + "/api/Bill/pubPayV3";
      let notify = this.$store.state.apiBaseUrl + "/api/wechatpay/v3/notify/transactions";
      if (!(this.task && this.task.id)) {
        return;
      }
      common_vendor.wx$1.login({
        success: (res) => {
          if (res.code) {
            common_vendor.index.requestWithCookie({
              url: qurl,
              method: "POST",
              data: {
                OutTradeNo: "1",
                Description: "任务" + this.task.id + "的固定预支付费用",
                Total: this.balance * 100,
                JsCode: res.code,
                NotifyUrl: notify,
                Attach: "taskid=" + this.task.id
              },
              success: (result) => {
                if (result.statusCode === 200) {
                  let praypay = result.data;
                  console.log(praypay);
                  common_vendor.index.requestPayment({
                    timeStamp: praypay.timeStamp,
                    nonceStr: praypay.nonceStr,
                    package: praypay.package,
                    signType: "RSA",
                    paySign: praypay.paySign,
                    success: (res2) => {
                      this.task.payed = 1;
                      this.$store.commit("updateLocalTaskById", this.task);
                      common_vendor.index.showModal({
                        title: "支付成功",
                        showCancel: false,
                        success: (res3) => {
                          if (res3.confirm) {
                            if (this.refer === "newtask") {
                              common_vendor.index.reLaunch({
                                url: "/pages/addtask/addtask"
                              });
                            }
                          }
                        }
                      });
                    },
                    fail: (err) => {
                    }
                  });
                }
              },
              fail: (err) => {
              }
            });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_cardinfo2 = common_vendor.resolveComponent("cardinfo");
  _easycom_cardinfo2();
}
const _easycom_cardinfo = () => "../../components/cardinfo/cardinfo.js";
if (!Math) {
  _easycom_cardinfo();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      task: $data.task,
      editable: false
    }),
    b: $options.html,
    c: $data.mode == "waitfor"
  }, $data.mode == "waitfor" ? {
    d: common_vendor.o((...args) => $options.del && $options.del(...args))
  } : {}, {
    e: $data.mode == "undone"
  }, $data.mode == "undone" ? {} : {}, {
    f: $data.task.canTake == 0 && $data.task.main == 1 && $data.task.payed == 0
  }, $data.task.canTake == 0 && $data.task.main == 1 && $data.task.payed == 0 ? {
    g: common_vendor.t($options.balance),
    h: $options.balance * 100 > 0,
    i: common_vendor.o((...args) => $options.pay && $options.pay(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/myTaskDetail/myTaskDetail.vue"]]);
wx.createPage(MiniProgramPage);
