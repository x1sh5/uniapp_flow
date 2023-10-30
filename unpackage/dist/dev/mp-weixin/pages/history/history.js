"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      hasHistorys: false,
      $historys: []
    };
  },
  methods: {
    getHistories(count, offset) {
      return new Promise((resolve, reject) => {
        let qurl = this.$store.state.apiBaseUrl + "/api/History?count=" + count + "&offset=" + offset;
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
    }
  },
  computed: {
    history() {
      return this.$historys;
    }
  },
  onReachBottom() {
  },
  onLoad() {
    this.getHistories(30, 0).then((res) => {
      this.$historys = res;
    }).catch((err) => {
      console.error(err);
    });
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
  return {
    a: common_vendor.f($data.$historys, (item, k0, i0) => {
      return {
        a: "f332b016-0-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false,
          mode: "waitfor"
        }),
        c: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/Beifen/20230512流沙小程序开发/新建文件夹 (7)/uniapp_flow/pages/history/history.vue"]]);
wx.createPage(MiniProgramPage);
