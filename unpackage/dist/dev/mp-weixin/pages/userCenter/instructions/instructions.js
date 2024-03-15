"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isPanelCollapsed: {
        1: true,
        2: true,
        2.2: true,
        3.1: true,
        3.2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true
      },
      isSubPanelCollapsed: {
        2.2: {
          1: true,
          2: true,
          3.1: true,
          3.2: true
        },
        2: {
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: true
          // 添加更多子面板...
        },
        3: {
          1: true,
          2: true,
          3: true,
          3.1: true,
          3.2: true
          // 添加更多子面板...
        },
        4: {
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: true,
          7: true
        },
        5: {
          1: true,
          2: true,
          3: true,
          4: true
        },
        6: {
          1: true,
          2: true,
          3: true,
          4: true
        },
        7: {
          1: true,
          2: true,
          3: true
        }
        // 添加更多主面板...
      }
    };
  },
  methods: {
    toabout(e) {
      common_vendor.index.navigateTo({
        url: "/pages/userCenter/about/about"
      });
    },
    topbout(e) {
      common_vendor.index.navigateTo({
        url: "/pages/userCenter/privacy/privacy"
      });
    },
    tocbout(e) {
      common_vendor.index.navigateTo({
        url: "/pages/userCenter/cost/cost"
      });
    },
    togglePanel(panelNumber) {
      this.isPanelCollapsed[panelNumber] = !this.isPanelCollapsed[panelNumber];
    },
    toggleSubPanel(panelNumber, subPanelNumber) {
      this.isSubPanelCollapsed[panelNumber][subPanelNumber] = !this.isSubPanelCollapsed[panelNumber][subPanelNumber];
    }
  }
  // onLoad() {
  // 	this.$store.commit("initHasLogin");
  // 	this.$store.commit("initUserInfo");
  // },
  // created() {
  // 	this.hasLogin = this.$store.getters.hasLogin();
  // }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    b: common_vendor.o(($event) => $options.togglePanel(1)),
    c: !$data.isPanelCollapsed[1]
  }, !$data.isPanelCollapsed[1] ? {
    d: common_vendor.o((...args) => $options.tocbout && $options.tocbout(...args))
  } : {}, {
    e: common_vendor.t($data.isPanelCollapsed[2] ? "v" : "收起"),
    f: common_vendor.o(($event) => $options.togglePanel(2)),
    g: !$data.isPanelCollapsed[2]
  }, !$data.isPanelCollapsed[2] ? common_vendor.e({
    h: common_vendor.t($data.isSubPanelCollapsed[2][1] ? "v" : "收起"),
    i: common_vendor.o(($event) => $options.toggleSubPanel(2, 1)),
    j: !$data.isSubPanelCollapsed[2][1]
  }, !$data.isSubPanelCollapsed[2][1] ? {} : {}, {
    k: common_vendor.t($data.isSubPanelCollapsed[2][2] ? "v" : "收起"),
    l: common_vendor.o(($event) => $options.toggleSubPanel(2, 2)),
    m: !$data.isSubPanelCollapsed[2][2]
  }, !$data.isSubPanelCollapsed[2][2] ? common_vendor.e({
    n: common_vendor.t($data.isSubPanelCollapsed[2][2.1] ? "v" : "收起"),
    o: common_vendor.o(($event) => $options.toggleSubPanel(2, 2.1)),
    p: !$data.isSubPanelCollapsed[2][2.1]
  }, !$data.isSubPanelCollapsed[2][2.1] ? {} : {}, {
    q: common_vendor.t($data.isSubPanelCollapsed[2][2.2] ? "v" : "收起"),
    r: common_vendor.o(($event) => $options.toggleSubPanel(2, 2.2)),
    s: !$data.isSubPanelCollapsed[2][2.2]
  }, !$data.isSubPanelCollapsed[2][2.2] ? {} : {}) : {}, {
    t: common_vendor.t($data.isSubPanelCollapsed[2][3] ? "v" : "收起"),
    v: common_vendor.o(($event) => $options.toggleSubPanel(2, 3)),
    w: !$data.isSubPanelCollapsed[2][3]
  }, !$data.isSubPanelCollapsed[2][3] ? {} : {}, {
    x: common_vendor.t($data.isSubPanelCollapsed[2][4] ? "v" : "收起"),
    y: common_vendor.o(($event) => $options.toggleSubPanel(2, 4)),
    z: !$data.isSubPanelCollapsed[2][4]
  }, !$data.isSubPanelCollapsed[2][4] ? {} : {}, {
    A: common_vendor.t($data.isSubPanelCollapsed[2][5] ? "v" : "收起"),
    B: common_vendor.o(($event) => $options.toggleSubPanel(2, 5)),
    C: !$data.isSubPanelCollapsed[2][5]
  }, !$data.isSubPanelCollapsed[2][5] ? common_vendor.e({
    D: common_vendor.t($data.isSubPanelCollapsed[2][5.1] ? "v" : "收起"),
    E: common_vendor.o(($event) => $options.toggleSubPanel(2, 5.1)),
    F: !$data.isSubPanelCollapsed[2][5.1]
  }, !$data.isSubPanelCollapsed[2][5.1] ? {} : {}, {
    G: common_vendor.t($data.isSubPanelCollapsed[2][5.2] ? "v" : "收起"),
    H: common_vendor.o(($event) => $options.toggleSubPanel(2, 5.2)),
    I: !$data.isSubPanelCollapsed[2][5.2]
  }, !$data.isSubPanelCollapsed[2][5.2] ? {} : {}, {
    J: common_vendor.t($data.isSubPanelCollapsed[2][5.3] ? "v" : "收起"),
    K: common_vendor.o(($event) => $options.toggleSubPanel(2, 5.3)),
    L: !$data.isSubPanelCollapsed[2][5.3]
  }, !$data.isSubPanelCollapsed[2][5.3] ? {} : {}) : {}, {
    M: common_vendor.t($data.isSubPanelCollapsed[2][6] ? "v" : "收起"),
    N: common_vendor.o(($event) => $options.toggleSubPanel(2, 6)),
    O: !$data.isSubPanelCollapsed[2][6]
  }, !$data.isSubPanelCollapsed[2][6] ? {} : {}) : {}, {
    P: common_vendor.t($data.isPanelCollapsed[3] ? "v" : "收起"),
    Q: common_vendor.o(($event) => $options.togglePanel(3)),
    R: !$data.isPanelCollapsed[3]
  }, !$data.isPanelCollapsed[3] ? common_vendor.e({
    S: common_vendor.t($data.isSubPanelCollapsed[3][1] ? "v" : "收起"),
    T: common_vendor.o(($event) => $options.toggleSubPanel(3, 1)),
    U: !$data.isSubPanelCollapsed[3][1]
  }, !$data.isSubPanelCollapsed[3][1] ? {} : {}, {
    V: common_vendor.t($data.isSubPanelCollapsed[3][2] ? "v" : "收起"),
    W: common_vendor.o(($event) => $options.toggleSubPanel(3, 2)),
    X: !$data.isSubPanelCollapsed[3][2]
  }, !$data.isSubPanelCollapsed[3][2] ? {} : {}, {
    Y: common_vendor.t($data.isSubPanelCollapsed[3][3] ? "v" : "收起"),
    Z: common_vendor.o(($event) => $options.toggleSubPanel(3, 3)),
    aa: !$data.isSubPanelCollapsed[3][3]
  }, !$data.isSubPanelCollapsed[3][3] ? {} : {}) : {}, {
    ab: common_vendor.t($data.isPanelCollapsed[4] ? "v" : "收起"),
    ac: common_vendor.o(($event) => $options.togglePanel(4)),
    ad: !$data.isPanelCollapsed[4]
  }, !$data.isPanelCollapsed[4] ? common_vendor.e({
    ae: common_vendor.t($data.isSubPanelCollapsed[4][1] ? "v" : "收起"),
    af: common_vendor.o(($event) => $options.toggleSubPanel(4, 1)),
    ag: !$data.isSubPanelCollapsed[4][1]
  }, !$data.isSubPanelCollapsed[4][1] ? {} : {}, {
    ah: common_vendor.t($data.isSubPanelCollapsed[4][2] ? "v" : "收起"),
    ai: common_vendor.o(($event) => $options.toggleSubPanel(4, 2)),
    aj: !$data.isSubPanelCollapsed[4][2]
  }, !$data.isSubPanelCollapsed[4][2] ? {} : {}, {
    ak: common_vendor.t($data.isSubPanelCollapsed[4][3] ? "v" : "收起"),
    al: common_vendor.o(($event) => $options.toggleSubPanel(4, 3)),
    am: !$data.isSubPanelCollapsed[4][3]
  }, !$data.isSubPanelCollapsed[4][3] ? {} : {}, {
    an: common_vendor.t($data.isSubPanelCollapsed[4][4] ? "v" : "收起"),
    ao: common_vendor.o(($event) => $options.toggleSubPanel(4, 4)),
    ap: !$data.isSubPanelCollapsed[4][4]
  }, !$data.isSubPanelCollapsed[4][4] ? {} : {}, {
    aq: common_vendor.t($data.isSubPanelCollapsed[4][5] ? "v" : "收起"),
    ar: common_vendor.o(($event) => $options.toggleSubPanel(4, 5)),
    as: !$data.isSubPanelCollapsed[4][5]
  }, !$data.isSubPanelCollapsed[4][5] ? {} : {}, {
    at: common_vendor.t($data.isSubPanelCollapsed[4][6] ? "v" : "收起"),
    av: common_vendor.o(($event) => $options.toggleSubPanel(4, 6)),
    aw: !$data.isSubPanelCollapsed[4][6]
  }, !$data.isSubPanelCollapsed[4][6] ? {} : {}, {
    ax: common_vendor.t($data.isSubPanelCollapsed[4][7] ? "v" : "收起"),
    ay: common_vendor.o(($event) => $options.toggleSubPanel(4, 7)),
    az: !$data.isSubPanelCollapsed[4][7]
  }, !$data.isSubPanelCollapsed[4][7] ? {} : {}) : {}, {
    aA: common_vendor.t($data.isPanelCollapsed[5] ? "v" : "收起"),
    aB: common_vendor.o(($event) => $options.togglePanel(5)),
    aC: !$data.isPanelCollapsed[5]
  }, !$data.isPanelCollapsed[5] ? common_vendor.e({
    aD: common_vendor.t($data.isSubPanelCollapsed[5][1] ? "v" : "收起"),
    aE: common_vendor.o(($event) => $options.toggleSubPanel(5, 1)),
    aF: !$data.isSubPanelCollapsed[5][1]
  }, !$data.isSubPanelCollapsed[5][1] ? {} : {}, {
    aG: common_vendor.t($data.isSubPanelCollapsed[5][2] ? "v" : "收起"),
    aH: common_vendor.o(($event) => $options.toggleSubPanel(5, 2)),
    aI: !$data.isSubPanelCollapsed[5][2]
  }, !$data.isSubPanelCollapsed[5][2] ? {} : {}, {
    aJ: common_vendor.t($data.isSubPanelCollapsed[5][3] ? "v" : "收起"),
    aK: common_vendor.o(($event) => $options.toggleSubPanel(5, 3)),
    aL: !$data.isSubPanelCollapsed[5][3]
  }, !$data.isSubPanelCollapsed[5][3] ? {} : {}, {
    aM: common_vendor.t($data.isSubPanelCollapsed[5][4] ? "v" : "收起"),
    aN: common_vendor.o(($event) => $options.toggleSubPanel(5, 4)),
    aO: !$data.isSubPanelCollapsed[5][4]
  }, !$data.isSubPanelCollapsed[5][4] ? {
    aP: common_vendor.o((...args) => $options.toabout && $options.toabout(...args))
  } : {}) : {}, {
    aQ: common_vendor.t($data.isPanelCollapsed[6] ? "v" : "收起"),
    aR: common_vendor.o(($event) => $options.togglePanel(6)),
    aS: !$data.isPanelCollapsed[6]
  }, !$data.isPanelCollapsed[6] ? common_vendor.e({
    aT: common_vendor.o((...args) => $options.toabout && $options.toabout(...args)),
    aU: common_vendor.o((...args) => $options.topbout && $options.topbout(...args)),
    aV: common_vendor.o((...args) => $options.tocbout && $options.tocbout(...args)),
    aW: common_vendor.t($data.isSubPanelCollapsed[6][1] ? "v" : "收起"),
    aX: common_vendor.o(($event) => $options.toggleSubPanel(6, 1)),
    aY: !$data.isSubPanelCollapsed[6][1]
  }, !$data.isSubPanelCollapsed[6][1] ? {} : {}, {
    aZ: common_vendor.t($data.isSubPanelCollapsed[6][2] ? "v" : "收起"),
    ba: common_vendor.o(($event) => $options.toggleSubPanel(6, 2)),
    bb: !$data.isSubPanelCollapsed[6][2]
  }, !$data.isSubPanelCollapsed[6][2] ? {} : {}, {
    bc: common_vendor.t($data.isSubPanelCollapsed[6][3] ? "v" : "收起"),
    bd: common_vendor.o(($event) => $options.toggleSubPanel(6, 3)),
    be: !$data.isSubPanelCollapsed[6][3]
  }, !$data.isSubPanelCollapsed[6][3] ? {} : {}, {
    bf: common_vendor.t($data.isSubPanelCollapsed[6][4] ? "v" : "收起"),
    bg: common_vendor.o(($event) => $options.toggleSubPanel(6, 4)),
    bh: !$data.isSubPanelCollapsed[6][4]
  }, !$data.isSubPanelCollapsed[6][4] ? {} : {}) : {}, {
    bi: common_vendor.t($data.isPanelCollapsed[7] ? "v" : "收起"),
    bj: common_vendor.o(($event) => $options.togglePanel(7)),
    bk: !$data.isPanelCollapsed[7]
  }, !$data.isPanelCollapsed[7] ? common_vendor.e({
    bl: common_vendor.t($data.isSubPanelCollapsed[7][1] ? "v" : "收起"),
    bm: common_vendor.o(($event) => $options.toggleSubPanel(7, 1)),
    bn: !$data.isSubPanelCollapsed[7][1]
  }, !$data.isSubPanelCollapsed[7][1] ? {} : {}, {
    bo: common_vendor.t($data.isSubPanelCollapsed[7][2] ? "v" : "收起"),
    bp: common_vendor.o(($event) => $options.toggleSubPanel(7, 2)),
    bq: !$data.isSubPanelCollapsed[7][2]
  }, !$data.isSubPanelCollapsed[7][2] ? {} : {}, {
    br: common_vendor.t($data.isSubPanelCollapsed[7][3] ? "v" : "收起"),
    bs: common_vendor.o(($event) => $options.toggleSubPanel(7, 3)),
    bt: !$data.isSubPanelCollapsed[7][3]
  }, !$data.isSubPanelCollapsed[7][3] ? {} : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/pages/userCenter/instructions/instructions.vue"]]);
wx.createPage(MiniProgramPage);
