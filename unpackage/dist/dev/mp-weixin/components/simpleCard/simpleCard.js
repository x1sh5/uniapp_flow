"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "simpleCard",
  data() {
    return {
      deadline: "",
      resetDeadline: false,
      newDeadtime: void 0
    };
  },
  props: {
    /**
     * @type {object} simpleInfo
     * @type {number} simpleInfo.id 
     * @type {number} simpleInfo.agree 是否同意接取，2：未读，1：同意，0：不同意
     * @type {number} simpleInfo.taskId 任务id
     * @type {string} simpleInfo.userName 申请人姓名
     * @type {string} simpleInfo.title 要申请的任务的标题
     * @type {number} simpleInfo.userId 申请人ID
     * @type {string} simpleInfo.comment 留言
     * @type {string} simpleInfo.tag 任务类型
     */
    simpleInfo: Object,
    showbutton: true
  },
  methods: {
    //重设截止日期
    agree(e) {
      this.$refs.calendar.show();
    },
    disagree(e) {
      let url = this.$store.state.apiBaseUrl + "/api/TaskRequest/disagree/" + this.simpleInfo.id;
      common_vendor.index.requestWithCookie({
        url,
        method: "PUT",
        data: this.simpleInfo,
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.showModal({
              showCancel: false,
              content: res.data
            });
            this.simpleInfo.agree = 0;
          } else {
            common_vendor.index.showModal({
              showCancel: false,
              content: res.data.title
            });
          }
        },
        fail: (err) => {
          common_vendor.index.showModal({
            content: err
          });
        }
      });
    },
    contact(e) {
      common_vendor.index.navigateTo({
        url: "/pages/message/chat/chat?cid=" + this.simpleInfo.taskId + "&userName=" + this.simpleInfo.userName + "&userId=" + this.simpleInfo.userId
      });
    },
    archiveyes(ensure) {
      common_vendor.index.showModal({
        title: "进行‘确认’操作后, 任务将不再能修改。",
        editable: true,
        placeholderText: "输入‘确认’完成任务！",
        success: (res) => {
          if (res.confirm) {
            if (res.content == "确认") {
              common_vendor.index.request({
                url: this.$store.state.apiBaseUrl + "/api/Assignment/archive/" + this.simpleInfo.taskId,
                data: {
                  complete: ensure
                },
                method: "POST",
                success: (resl) => {
                  if (resl.statusCode !== 200) {
                    common_vendor.index.showToast({
                      title: "操作失败"
                    });
                  } else {
                    common_vendor.index.navigateTo({
                      url: "/pages/taskresult/completed/completed"
                    });
                  }
                }
              });
            } else {
              common_vendor.index.showToast({
                title: "内容无效。"
              });
            }
          }
        }
      });
    },
    archiveno(ensure) {
      common_vendor.index.showModal({
        title: "进行‘确认’操作后, 任务将不再能修改。",
        editable: true,
        placeholderText: "输入‘确认’完成操作！",
        success: (res) => {
          if (res.confirm) {
            if (res.content == "确认") {
              common_vendor.index.request({
                url: this.$store.state.apiBaseUrl + "/api/Assignment/archive/" + this.simpleInfo.taskId,
                data: {
                  complete: ensure
                },
                method: "POST",
                success: (resl) => {
                  if (resl.statusCode !== 200) {
                    common_vendor.index.showToast({
                      title: "操作失败。"
                    });
                  } else {
                    common_vendor.index.navigateTo({
                      url: "/pages/taskresult/failed/failed"
                    });
                  }
                }
              });
            } else {
              common_vendor.index.showToast({
                title: "内容无效。"
              });
            }
          }
        }
      });
    },
    complete(e) {
      this.archiveyes("yes");
    },
    failure(e) {
      this.archiveno("no");
    },
    //接取任务
    deadtimeChange(e) {
      if (e == "cancel") {
        this.resetDeadline = false;
        this.newDeadtime = this.oldDeadline;
      }
      if (e == "ensure") {
        this.resetDeadline = true;
        let url = this.$store.state.apiBaseUrl + "/api/Assignment/take/" + this.simpleInfo.id;
        common_vendor.index.requestWithCookie({
          url,
          data: {
            deadline: this.deadtime
          },
          success: (res) => {
            if (res.statusCode === 200) {
              if (res.data.data.success) {
                common_vendor.index.showModal({
                  content: res.data.message
                });
                this.simpleInfo.agree = 1;
              } else {
                common_vendor.index.showModal({
                  content: res.data.data.reason
                });
              }
            } else {
              common_vendor.index.showModal({
                content: "网络出错"
              });
            }
          },
          fail: (err) => {
            common_vendor.index.showModal({
              content: err
            });
          }
        });
      }
    }
  },
  computed: {
    title() {
      if (this.simpleInfo && this.simpleInfo.title) {
        return this.simpleInfo.title;
      }
      return "标题出错";
    },
    type() {
      if (this.simpleInfo && this.simpleInfo.tag) {
        return this.simpleInfo.tag;
      }
      return "类型";
    },
    //留言
    comment() {
      if (this.simpleInfo && this.simpleInfo.comment) {
        return this.simpleInfo.comment;
      }
      return "";
    },
    deadtime: {
      get() {
        if (!this.newDeadtime)
          return this.oldDeadline;
        return this.newDeadtime;
      },
      set(value) {
        this.newDeadtime = value;
      }
    }
  },
  beforeMount() {
    if (this.simpleInfo.agree === 1) {
      common_vendor.index.requestWithCookie({
        url: this.$store.state.apiBaseUrl + "/api/Assignment/deadline/" + this.simpleInfo.taskId,
        success: (res) => {
          if (res.statusCode === 200) {
            this.deadline = res.data;
            this.oldDeadline = res.data.OriDeadline.indexOf("T").substring(0, index);
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_countdown2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_countdown = () => "../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_countdown + _easycom_uni_datetime_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($options.title),
    b: common_vendor.t($options.comment),
    c: common_vendor.t($props.simpleInfo.userName),
    d: common_vendor.o((...args) => $options.contact && $options.contact(...args)),
    e: common_vendor.o((...args) => $options.agree && $options.agree(...args)),
    f: common_vendor.o((...args) => $options.disagree && $options.disagree(...args)),
    g: $props.simpleInfo.agree === 2,
    h: $props.simpleInfo.agree === 0
  }, $props.simpleInfo.agree === 0 ? {} : {}, {
    i: $props.simpleInfo.agree === 1
  }, $props.simpleInfo.agree === 1 ? {} : {}, {
    j: $data.deadline.isArchive
  }, $data.deadline.isArchive ? common_vendor.e({
    k: $data.deadline.finish
  }, $data.deadline.finish ? {} : {}) : common_vendor.e({
    l: $props.simpleInfo.agree === 1 && $data.deadline
  }, $props.simpleInfo.agree === 1 && $data.deadline ? {
    m: common_vendor.p({
      day: $data.deadline.days,
      hour: $data.deadline.hours,
      minute: $data.deadline.minutes,
      second: $data.deadline.seconds
    }),
    n: common_vendor.o((...args) => $options.complete && $options.complete(...args)),
    o: common_vendor.o((...args) => $options.failure && $options.failure(...args))
  } : {}), {
    p: common_vendor.sr("calendar", "4f0eb924-1"),
    q: common_vendor.o($options.deadtimeChange),
    r: common_vendor.o(($event) => $options.deadtime = $event),
    s: common_vendor.p({
      type: "datetime",
      modelValue: $options.deadtime
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/simpleCard/simpleCard.vue"]]);
wx.createComponent(Component);
