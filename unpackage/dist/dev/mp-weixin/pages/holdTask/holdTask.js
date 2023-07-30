"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      items: ["待完成", "完成项目"],
      current: 0,
      $incompletes: false,
      //数组，false表示为初始化
      $completes: false
      //数组，false表示为初始化
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
      if (!this.$publish) {
        common_vendor.index.requestWithCookie({
          url: this.$store.state.apiBaseUrl + "/api/Assignment/user",
          success(res) {
            this.$nextTick(
              function(e) {
                this.$publish = res.data["$values"];
              }
            );
          }
        });
      }
      return this.$publish;
    }
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
    d: common_vendor.f($data.$incompletes, (item, k0, i0) => {
      return {
        a: "de2ac734-1-" + i0,
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
    f: common_vendor.f($data.$completes, (item, k0, i0) => {
      return {
        a: "de2ac734-2-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false
        }),
        c: item.id
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/holdTask/holdTask.vue"]]);
wx.createPage(MiniProgramPage);
