"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isPanelCollapsed: {
        1: true,
        2: true,
        2.2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true
      },
      isSubPanelCollapsed: {
        2.2: {
          1: true,
          2: true
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
          3: true
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
  }, !$data.isPanelCollapsed[1] ? {} : {}, {
    d: common_vendor.t($data.isPanelCollapsed[2] ? "v" : "收起"),
    e: common_vendor.o(($event) => $options.togglePanel(2)),
    f: !$data.isPanelCollapsed[2]
  }, !$data.isPanelCollapsed[2] ? common_vendor.e({
    g: common_vendor.t($data.isPanelCollapsed[2] ? "v" : "收起"),
    h: common_vendor.o(($event) => $options.toggleSubPanel(2, 1)),
    i: !$data.isSubPanelCollapsed[2][1]
  }, !$data.isSubPanelCollapsed[2][1] ? {} : {}, {
    j: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    k: common_vendor.o(($event) => $options.toggleSubPanel(2, 2)),
    l: !$data.isSubPanelCollapsed[2][2]
  }, !$data.isSubPanelCollapsed[2][2] ? common_vendor.e({
    m: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    n: common_vendor.o(($event) => $options.toggleSubPanel(2, 2.1)),
    o: !$data.isSubPanelCollapsed[2][2.1]
  }, !$data.isSubPanelCollapsed[2][2.1] ? {} : {}, {
    p: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    q: common_vendor.o(($event) => $options.toggleSubPanel(2, 2.2)),
    r: !$data.isSubPanelCollapsed[2][2.2]
  }, !$data.isSubPanelCollapsed[2][2.2] ? {} : {}) : {}, {
    s: common_vendor.t($data.isPanelCollapsed[2] ? "v" : "收起"),
    t: common_vendor.o(($event) => $options.toggleSubPanel(2, 3)),
    v: !$data.isSubPanelCollapsed[2][3]
  }, !$data.isSubPanelCollapsed[2][3] ? common_vendor.e({
    w: common_vendor.t($data.isPanelCollapsed[3.1] ? "v" : "收起"),
    x: common_vendor.o(($event) => $options.toggleSubPanel(2, 3.1)),
    y: !$data.isSubPanelCollapsed[2][3.1]
  }, !$data.isSubPanelCollapsed[2][3.1] ? {} : {}, {
    z: common_vendor.t($data.isPanelCollapsed[3.2] ? "v" : "收起"),
    A: common_vendor.o(($event) => $options.toggleSubPanel(2, 3.2)),
    B: !$data.isSubPanelCollapsed[2][3.2]
  }, !$data.isSubPanelCollapsed[2][3.2] ? {} : {}) : {}, {
    C: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    D: common_vendor.o(($event) => $options.toggleSubPanel(2, 4)),
    E: !$data.isSubPanelCollapsed[2][4]
  }, !$data.isSubPanelCollapsed[2][4] ? {} : {}, {
    F: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    G: common_vendor.o(($event) => $options.toggleSubPanel(2, 5)),
    H: !$data.isSubPanelCollapsed[2][5]
  }, !$data.isSubPanelCollapsed[2][5] ? common_vendor.e({
    I: common_vendor.t($data.isPanelCollapsed[5.1] ? "v" : "收起"),
    J: common_vendor.o(($event) => $options.toggleSubPanel(2, 5.1)),
    K: !$data.isSubPanelCollapsed[2][5.1]
  }, !$data.isSubPanelCollapsed[2][5.1] ? {} : {}, {
    L: common_vendor.t($data.isPanelCollapsed[5.2] ? "v" : "收起"),
    M: common_vendor.o(($event) => $options.toggleSubPanel(2, 5.2)),
    N: !$data.isSubPanelCollapsed[2][5.2]
  }, !$data.isSubPanelCollapsed[2][5.2] ? {} : {}, {
    O: common_vendor.t($data.isPanelCollapsed[5.3] ? "v" : "收起"),
    P: common_vendor.o(($event) => $options.toggleSubPanel(2, 5.3)),
    Q: !$data.isSubPanelCollapsed[2][5.3]
  }, !$data.isSubPanelCollapsed[2][5.3] ? {} : {}) : {}, {
    R: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    S: common_vendor.o(($event) => $options.toggleSubPanel(2, 6)),
    T: !$data.isSubPanelCollapsed[2][6]
  }, !$data.isSubPanelCollapsed[2][6] ? {} : {}) : {}, {
    U: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    V: common_vendor.o(($event) => $options.togglePanel(3)),
    W: !$data.isPanelCollapsed[3]
  }, !$data.isPanelCollapsed[3] ? common_vendor.e({
    X: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    Y: common_vendor.o(($event) => $options.toggleSubPanel(3, 1)),
    Z: !$data.isSubPanelCollapsed[3][1]
  }, !$data.isSubPanelCollapsed[3][1] ? {} : {}, {
    aa: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    ab: common_vendor.o(($event) => $options.toggleSubPanel(3, 2)),
    ac: !$data.isSubPanelCollapsed[3][2]
  }, !$data.isSubPanelCollapsed[3][2] ? {} : {}, {
    ad: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    ae: common_vendor.o(($event) => $options.toggleSubPanel(3, 3)),
    af: !$data.isSubPanelCollapsed[3][3]
  }, !$data.isSubPanelCollapsed[3][3] ? {} : {}) : {}, {
    ag: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    ah: common_vendor.o(($event) => $options.togglePanel(4)),
    ai: !$data.isPanelCollapsed[4]
  }, !$data.isPanelCollapsed[4] ? common_vendor.e({
    aj: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    ak: common_vendor.o(($event) => $options.toggleSubPanel(4, 1)),
    al: !$data.isSubPanelCollapsed[4][1]
  }, !$data.isSubPanelCollapsed[4][1] ? {} : {}, {
    am: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    an: common_vendor.o(($event) => $options.toggleSubPanel(4, 2)),
    ao: !$data.isSubPanelCollapsed[4][2]
  }, !$data.isSubPanelCollapsed[4][2] ? {} : {}, {
    ap: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    aq: common_vendor.o(($event) => $options.toggleSubPanel(4, 3)),
    ar: !$data.isSubPanelCollapsed[4][3]
  }, !$data.isSubPanelCollapsed[4][3] ? {} : {}, {
    as: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    at: common_vendor.o(($event) => $options.toggleSubPanel(4, 4)),
    av: !$data.isSubPanelCollapsed[4][4]
  }, !$data.isSubPanelCollapsed[4][4] ? {} : {}, {
    aw: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    ax: common_vendor.o(($event) => $options.toggleSubPanel(4, 5)),
    ay: !$data.isSubPanelCollapsed[4][5]
  }, !$data.isSubPanelCollapsed[4][5] ? {} : {}, {
    az: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    aA: common_vendor.o(($event) => $options.toggleSubPanel(4, 6)),
    aB: !$data.isSubPanelCollapsed[4][6]
  }, !$data.isSubPanelCollapsed[4][6] ? {} : {}, {
    aC: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    aD: common_vendor.o(($event) => $options.toggleSubPanel(4, 7)),
    aE: !$data.isSubPanelCollapsed[4][7]
  }, !$data.isSubPanelCollapsed[4][7] ? {} : {}) : {}, {
    aF: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    aG: common_vendor.o(($event) => $options.togglePanel(5)),
    aH: !$data.isPanelCollapsed[5]
  }, !$data.isPanelCollapsed[5] ? common_vendor.e({
    aI: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    aJ: common_vendor.o(($event) => $options.toggleSubPanel(5, 1)),
    aK: !$data.isSubPanelCollapsed[5][1]
  }, !$data.isSubPanelCollapsed[5][1] ? {} : {}, {
    aL: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    aM: common_vendor.o(($event) => $options.toggleSubPanel(5, 2)),
    aN: !$data.isSubPanelCollapsed[5][2]
  }, !$data.isSubPanelCollapsed[5][2] ? {} : {}, {
    aO: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    aP: common_vendor.o(($event) => $options.toggleSubPanel(5, 3)),
    aQ: !$data.isSubPanelCollapsed[5][3]
  }, !$data.isSubPanelCollapsed[5][3] ? {} : {}, {
    aR: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    aS: common_vendor.o(($event) => $options.toggleSubPanel(5, 4)),
    aT: !$data.isSubPanelCollapsed[5][4]
  }, !$data.isSubPanelCollapsed[5][4] ? {} : {}) : {}, {
    aU: common_vendor.o((...args) => $options.toabout && $options.toabout(...args)),
    aV: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    aW: common_vendor.o(($event) => $options.togglePanel(6)),
    aX: !$data.isPanelCollapsed[6]
  }, !$data.isPanelCollapsed[6] ? common_vendor.e({
    aY: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    aZ: common_vendor.o(($event) => $options.toggleSubPanel(6, 1)),
    ba: !$data.isSubPanelCollapsed[6][1]
  }, !$data.isSubPanelCollapsed[6][1] ? {} : {}, {
    bb: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    bc: common_vendor.o(($event) => $options.toggleSubPanel(6, 2)),
    bd: !$data.isSubPanelCollapsed[6][2]
  }, !$data.isSubPanelCollapsed[6][2] ? {} : {}, {
    be: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    bf: common_vendor.o(($event) => $options.toggleSubPanel(6, 3)),
    bg: !$data.isSubPanelCollapsed[6][3]
  }, !$data.isSubPanelCollapsed[6][3] ? {} : {}, {
    bh: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    bi: common_vendor.o(($event) => $options.toggleSubPanel(6, 4)),
    bj: !$data.isSubPanelCollapsed[6][4]
  }, !$data.isSubPanelCollapsed[6][4] ? {} : {}) : {}, {
    bk: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    bl: common_vendor.o(($event) => $options.togglePanel(7)),
    bm: !$data.isPanelCollapsed[7]
  }, !$data.isPanelCollapsed[7] ? common_vendor.e({
    bn: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    bo: common_vendor.o(($event) => $options.toggleSubPanel(7, 1)),
    bp: !$data.isSubPanelCollapsed[7][1]
  }, !$data.isSubPanelCollapsed[7][1] ? {} : {}, {
    bq: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    br: common_vendor.o(($event) => $options.toggleSubPanel(7, 2)),
    bs: !$data.isSubPanelCollapsed[7][2]
  }, !$data.isSubPanelCollapsed[7][2] ? {} : {}, {
    bt: common_vendor.t($data.isPanelCollapsed[1] ? "v" : "收起"),
    bv: common_vendor.o(($event) => $options.toggleSubPanel(7, 3)),
    bw: !$data.isSubPanelCollapsed[7][3]
  }, !$data.isSubPanelCollapsed[7][3] ? {} : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-57f294dd"], ["__file", "E:/uniapp_flow/pages/userCenter/instructions/instructions.vue"]]);
wx.createPage(MiniProgramPage);
