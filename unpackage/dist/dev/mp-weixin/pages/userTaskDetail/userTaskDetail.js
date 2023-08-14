"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      items: ["历史发布", "浏览记录", "草稿箱"],
      current: 0,
      hasPushlishs: false,
      $publishs: [],
      hasHistorys: false,
      $historys: []
      //$complete:false,//数组，false表示为初始化
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  },
  computed: {
    publishs() {
      if (!this.hasPushlishs) {
        console.log("get user task");
        common_vendor.index.requestWithCookie({
          url: this.$store.state.apiBaseUrl + "/api/Assignment/user",
          success: (res) => {
            this.$data.$publishs = res.data["$values"];
            this.hasPushlishs = true;
          }
        });
      }
      return this.$data.$publishs;
    },
    history() {
      return "a";
    }
  },
  onLoad(options) {
    console.log("get user task");
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_cardinfo2 = common_vendor.resolveComponent("cardinfo");
  (_easycom_uni_segmented_control2 + _easycom_cardinfo2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_cardinfo = () => "../../components/cardinfo/cardinfo.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_cardinfo)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      current: $data.current,
      values: $data.items,
      ["style-type"]: "text",
      ["active-color"]: "#4cd964"
    }),
    c: $data.current === 0
  }, $data.current === 0 ? {
    d: common_vendor.f($options.publishs, (item, k0, i0) => {
      return {
        a: "564b4720-1-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false
        }),
        c: item.id
      };
    })
  } : {}, {
    e: $data.current === 1
  }, $data.current === 1 ? {
    f: common_vendor.f($data.$historys, (item, k0, i0) => {
      return {
        a: "564b4720-2-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false
        }),
        c: item.id
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/userTaskDetail/userTaskDetail.vue"]]);
wx.createPage(MiniProgramPage);
