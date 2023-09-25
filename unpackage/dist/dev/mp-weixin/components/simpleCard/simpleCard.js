"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "simpleCard",
  data() {
    return {};
  },
  props: {
    simpleInfo: Object,
    showbutton: true
  },
  methods: {
    agree(e) {
      console.log("接取任务");
      let url = this.$store.state.apiBaseUrl + "/api/Assignment/take/" + this.simpleInfo.id;
      common_vendor.index.requestWithCookie({
        url,
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
          console.log("failed");
          common_vendor.index.showModal({
            content: err
          });
        }
      });
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
          console.log("failed");
          common_vendor.index.showModal({
            content: err
          });
        }
      });
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
      if (this.simpleInfo && this.simpleInfo.typeId) {
        return this.$store.getters.getTaskType(this.simpleInfo.typeId).name;
      }
      return "类型";
    },
    comment() {
      if (this.simpleInfo && this.simpleInfo.comment) {
        return this.simpleInfo.comment;
      }
      return "";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($options.title),
    b: common_vendor.t($options.type),
    c: common_vendor.t($options.comment),
    d: common_vendor.o((...args) => $options.agree && $options.agree(...args)),
    e: common_vendor.o((...args) => $options.disagree && $options.disagree(...args)),
    f: $props.showbutton && $props.simpleInfo.agree === 2,
    g: $props.simpleInfo.agree === 0
  }, $props.simpleInfo.agree === 0 ? {} : {}, {
    h: $props.simpleInfo.agree === 1
  }, $props.simpleInfo.agree === 1 ? {} : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/components/simpleCard/simpleCard.vue"]]);
wx.createComponent(Component);
