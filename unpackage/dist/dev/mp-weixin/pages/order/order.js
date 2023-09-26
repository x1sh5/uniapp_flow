"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      current: 0,
      items: ["全部", "已完成", "未完成"],
      all: []
    };
  },
  computed: {
    incompletes() {
      return this.all.filter((item) => item.status === 0);
    },
    completes() {
      return this.all.filter((item) => item.status === 1);
    }
  },
  mounted() {
    let qurl = this.$store.state.apiBaseUrl + "/api/Bill";
    common_vendor.index.request({
      url: qurl,
      success: (res) => {
        if (res.statusCode === 200) {
          this.all = res.data;
        }
      }
    });
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  },
  onLoad() {
    if (!this.$store.state.$hasLogin) {
      common_vendor.index.navigateTo({
        url: "/pages/login/login?refer=order"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_bill2 = common_vendor.resolveComponent("bill");
  (_easycom_uni_segmented_control2 + _easycom_bill2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_bill = () => "../../components/bill/bill.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_bill)();
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
    d: common_vendor.f($data.all, (item, k0, i0) => {
      return {
        a: "e8e209a4-1-" + i0,
        b: common_vendor.p({
          bill: item
        }),
        c: item.id
      };
    })
  } : {}, {
    e: $data.current === 1
  }, $data.current === 1 ? {
    f: common_vendor.f($options.completes, (item, k0, i0) => {
      return {
        a: "e8e209a4-2-" + i0,
        b: common_vendor.p({
          bill: item
        }),
        c: item.id
      };
    })
  } : {}, {
    g: $data.current === 2
  }, $data.current === 2 ? {
    h: common_vendor.f($options.incompletes, (item, k0, i0) => {
      return {
        a: "e8e209a4-3-" + i0,
        b: common_vendor.p({
          bill: item
        }),
        c: item.id
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
