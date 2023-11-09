"use strict";
const common_vendor = require("../../common/vendor.js");
const common_storageKeys = require("../../common/storageKeys.js");
const _sfc_main = {
  data() {
    return {
      status: "more",
      contentText: { contentdown: "", contentrefresh: "正在加载...", contentnomore: "没有更多数据了" },
      searchWord: "",
      hots: [],
      tasks: [],
      recents: [],
      show: true
    };
  },
  onLoad() {
    console.log("page index onload");
  },
  mounted() {
    common_vendor.index.requestWithCookie({
      url: this.$store.state.apiBaseUrl + "/api/Information/popular",
      success: (res) => {
        if (res.statusCode === 200) {
          this.hots = res.data;
        }
      }
    });
  },
  computed: {
    maxid() {
      if (this.tasks.length === 0) {
        return 0;
      }
      return this.tasks[this.tasks.length - 1].id;
    }
  },
  methods: {
    search(e) {
      this.searchWord = e.value;
      common_vendor.index.requestWithCookie({
        url: this.$store.state.apiBaseUrl + "/api/Assignment/search/" + encodeURIComponent(this.searchWord) + "?count=10&offset=" + this.maxid,
        success: (res) => {
          if (res.statusCode === 200) {
            this.tasks = res.data;
            this.show = false;
          } else {
            common_vendor.index.showToast({
              title: "网络出错！"
            });
          }
        }
      });
      const i = this.recents.findIndex((item) => item === e.value);
      if (i !== -1) {
        this.recents.splice(i, 1);
        this.recents.unshift(e.value);
      } else {
        if (this.recents.length >= 10) {
          this.recents.pop();
        }
        this.recents.unshift(e.value);
      }
      common_vendor.index.setStorage({
        key: common_storageKeys.StorageKeys.searchs,
        data: this.recents
      });
    },
    searchx(w) {
      let e = {};
      e.value = w;
      this.search(e);
    },
    clear(e) {
      this.tasks = [];
      this.show = true;
    },
    del(e) {
      const i = this.recents.findIndex((item) => item === e);
      if (i !== -1) {
        this.recents.splice(i, 1);
      }
      common_vendor.index.setStorage({
        key: common_storageKeys.StorageKeys.searchs,
        data: this.recents
      });
    }
  },
  onReachBottom() {
    this.status = "loading";
    common_vendor.index.requestWithCookie({
      url: this.$store.state.apiBaseUrl + "/api/Assignment/search/" + encodeURIComponent(this.searchWord) + "?count=10&offset=" + this.maxid,
      success: (res) => {
        if (res.statusCode === 200) {
          this.tasks = res.data;
          this.status = "more";
        } else {
          common_vendor.index.showToast({
            title: "网络出错！"
          });
        }
      }
    });
  },
  onLoad(e) {
    this.recents = common_vendor.index.getStorageSync(common_storageKeys.StorageKeys.searchs) || this.recents;
    common_vendor.index.request({
      url: this.$store.state.apiBaseUrl + "/api/Information/popular",
      success: (res) => {
        if (res.statusCode === 200) {
          this.hots = res.data;
        }
      }
    });
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_cardinfo2 = common_vendor.resolveComponent("cardinfo");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_search_bar2 + _easycom_cardinfo2 + _easycom_uni_load_more2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_cardinfo = () => "../../components/cardinfo/cardinfo.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_cardinfo + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.clear),
    b: common_vendor.o($options.search),
    c: common_vendor.o(($event) => $data.searchWord = $event),
    d: common_vendor.p({
      radius: "5",
      placeholder: "搜索任务",
      focus: true,
      clearButton: "auto",
      cancelButton: "none",
      modelValue: $data.searchWord
    }),
    e: $data.show
  }, $data.show ? {
    f: common_vendor.f($data.recents, (r, k0, i0) => {
      return {
        a: common_vendor.t(r),
        b: common_vendor.o(($event) => $options.searchx(r), r),
        c: common_vendor.o(($event) => $options.del(r), r),
        d: r
      };
    }),
    g: common_vendor.f($data.hots, (h, k0, i0) => {
      return {
        a: common_vendor.t(h),
        b: common_vendor.o(($event) => $options.searchx(h), h),
        c: h
      };
    })
  } : {}, {
    h: common_vendor.f($data.tasks, (item, k0, i0) => {
      return {
        a: "1d671476-1-" + i0,
        b: common_vendor.p({
          task: item,
          editable: false,
          mode: "waitfor"
        }),
        c: item.id
      };
    }),
    i: common_vendor.p({
      iconType: "auto",
      contentText: $data.contentText,
      status: $data.status
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_flow/pages/searchResult/searchResult.vue"]]);
wx.createPage(MiniProgramPage);
