"use strict";
const common_vendor = require("../../common/vendor.js");
const common_Task = require("../../common/Task.js");
const _sfc_main = {
  data() {
    return {
      user: {},
      $publishs: [],
      $hispubs: [],
      $hisacpt: [],
      curIndex: 0
    };
  },
  computed: {
    publishs() {
      return this.$data.$publishs;
    },
    hispubs() {
      if (this.$data.$hispubs.length === 0) {
        common_vendor.index.request({
          url: ""
        });
      }
    },
    hisacpt() {
      if (this.$data.$hisacpt.length === 0) {
        common_vendor.index.request({
          url: ""
        });
      }
    },
    maxid() {
      if (this.$data.$publishs.length === 0) {
        return 0;
      }
      return this.$data.$publishs[this.$data.$publishs.length - 1].id;
    }
  },
  mounted() {
    if (!this.hasPushlishs) {
      console.log("get user task");
      common_vendor.index.requestWithCookie({
        url: this.$store.state.apiBaseUrl + "/api/Assignment/byuser?count=10&offset=" + this.maxid + "&id=" + this.user.id,
        success: (res) => {
          this.$data.$publishs = res.data;
        }
      });
    }
  },
  methods: {
    mode(item) {
      if (item.status === common_Task.TaskStatus.WaitForAccept)
        return "waitfor";
      if (item.status === common_Task.TaskStatus.Unfinished)
        return "undone";
      return "done";
    },
    toDetails(e) {
      common_vendor.index.navigateTo({
        url: "/pages/myTaskDetail/myTaskDetail?id=" + e
      });
    },
    removeById(id) {
      let index = this.publishs.findIndex((item) => item.id == id);
      if (index != -1) {
        this.publishs.splice(index, 1);
      }
    },
    HisPublish(e) {
      this.curIndex = 0;
    },
    HisAccipt(e) {
      this.curIndex = 1;
    }
  },
  onLoad(op) {
    let id = op.id;
    if (id) {
      common_vendor.index.requestWithCookie({
        url: this.$store.state.apiBaseUrl + "/api/AuthUser/" + id,
        success: (res) => {
          this.user = res.data;
        }
      });
    }
  },
  onReachBottom() {
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
    a: _ctx.imgsrc,
    b: common_vendor.t(_ctx.userName),
    c: $data.curIndex === 0 ? "underline" : "",
    d: $data.curIndex === 0 ? "#4d1ae4" : "",
    e: common_vendor.o((...args) => $options.HisPublish && $options.HisPublish(...args)),
    f: $data.curIndex === 1 ? "underline" : "",
    g: $data.curIndex === 1 ? "#4d1ae4" : "",
    h: common_vendor.o((...args) => $options.HisAccipt && $options.HisAccipt(...args)),
    i: $data.curIndex == 0
  }, $data.curIndex == 0 ? {
    j: common_vendor.f($options.publishs, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.toDetails(item.id), item.id),
        b: "b0c4a376-0-" + i0,
        c: common_vendor.p({
          task: item,
          editable: false,
          mode: $options.mode(item)
        }),
        d: item.id
      };
    })
  } : {
    k: common_vendor.f($options.publishs, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.toDetails(item.id), item.id),
        b: "b0c4a376-1-" + i0,
        c: common_vendor.p({
          task: item,
          editable: false,
          mode: $options.mode(item)
        }),
        d: item.id
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/userhomepage/userhomepage.vue"]]);
wx.createPage(MiniProgramPage);
