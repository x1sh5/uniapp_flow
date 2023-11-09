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
    },
    // 1 incomplete 2 completed
    getByStatus(status) {
      return new Promise((resolve, reject) => {
        let qurl = this.$store.state.apiBaseUrl + "/api/AssignmentUser/status/" + status;
        common_vendor.index.requestWithCookie({
          url: qurl,
          success: (res) => {
            if (res.statusCode === 200) {
              if (res.data) {
                resolve(res.data);
              }
            } else {
              reject();
            }
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    removeItem(id) {
      let index = this.$data.$incompletes.findIndex((item) => item.id == id);
      if (index !== -1) {
        this.$data.$incompletes.splice(index, 1);
      }
    }
  },
  computed: {
    incompletes() {
      return this.$data.$incompletes;
    },
    completes() {
      return this.$data.$completes;
    }
  },
  onLoad(op) {
    this.current = parseInt(op.current);
    this.getByStatus(1).then((res) => this.$data.$incompletes = res).catch((err) => console.log(err));
    setTimeout(() => {
      this.getByStatus(2).then((res) => this.$data.$completes = res).catch((err) => console.log(err));
    }, 2e3);
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
        a: "1621b7a5-1-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false,
          mode: "undone"
        }),
        c: item.id
      };
    })
  } : {}, {
    e: $data.current === 1
  }, $data.current === 1 ? {
    f: common_vendor.f($data.$completes, (item, k0, i0) => {
      return {
        a: "1621b7a5-2-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false,
          mode: "done"
        }),
        c: item.id
      };
    })
  } : {}, {
    g: _ctx.res === void 0
  }, _ctx.res === void 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/holdTask/holdTask.vue"]]);
wx.createPage(MiniProgramPage);
