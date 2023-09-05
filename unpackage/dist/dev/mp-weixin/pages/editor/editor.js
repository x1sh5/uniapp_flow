"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../common/storageKeys.js");
const _sfc_main = {
  data() {
    return {
      id: "",
      readOnly: false,
      formats: {},
      files: []
    };
  },
  onLoad(options) {
    this.id = options.id;
    common_vendor.index.loadFontFace({
      family: "Pacifico",
      source: 'url("./static/Pacifico.ttf")'
    });
  },
  mounted() {
    console.log(this.editorCtx);
    if (this.editorCtx) {
      this.editorCtx.setContents(this.$store.state.$currentContent);
    }
  },
  methods: {
    backEvent() {
      common_vendor.index.navigateBack();
    },
    submitEvent() {
      this.editorCtx.getContents({
        success: (res) => {
          console.log(res);
          let images = res.delta.ops.filter((item) => item.attributes && item.attributes.alt === "图像");
          const lastFiles = this.files.filter((itemB) => {
            return images.some((itemA) => itemA.attributes["data-local"] === itemB.path);
          });
          const pages = getCurrentPages();
          if (pages.length >= 2) {
            const newTask = pages[pages.length - 2];
            newTask.updateTask(this.id, { ctx: res, files: lastFiles });
          }
        }
      });
      common_vendor.index.navigateBack();
    },
    readOnlyChange() {
      this.readOnly = !this.readOnly;
    },
    onEditorReady() {
      common_vendor.index.createSelectorQuery().select("#editor").context((res) => {
        this.editorCtx = res.context;
      }).exec();
    },
    undo() {
      this.editorCtx.undo();
    },
    redo() {
      this.editorCtx.redo();
    },
    format(e) {
      let {
        name,
        value
      } = e.target.dataset;
      if (!name)
        return;
      this.editorCtx.format(name, value);
    },
    onStatusChange(e) {
      const formats = e.detail;
      this.formats = formats;
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function() {
          console.log("insert divider success");
        }
      });
    },
    clear() {
      common_vendor.index.showModal({
        title: "清空编辑器",
        content: "确定清空编辑器全部内容？",
        success: (res) => {
          if (res.confirm) {
            this.editorCtx.clear({
              success: function(res2) {
                console.log("clear success");
              }
            });
          }
        }
      });
    },
    removeFormat() {
      this.editorCtx.removeFormat();
    },
    insertDate() {
      const date = /* @__PURE__ */ new Date();
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      this.editorCtx.insertText({
        text: formatDate
      });
    },
    insertImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: (res) => {
          console.log(res);
          let file = res.tempFiles[0];
          this.files.push(file);
          if (file.size > 2097152) {
            common_vendor.index.showModal({
              content: "文件大于2Mb"
            });
          } else {
            this.editorCtx.insertImage({
              src: res.tempFilePaths[0],
              alt: "图像",
              success: function() {
                console.log("insert image success");
              }
            });
          }
        }
      });
    },
    setTaskContent() {
      const pages = getCurrentPages();
      if (pages.length >= 2) {
        const newTask = pages[pages.length - 2];
        newTask.tasks[this.id].description = "new value";
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.backEvent),
    b: common_vendor.o($options.submitEvent),
    c: common_vendor.p({
      ["left-icon"]: "left",
      leftText: "返回",
      rightText: "确认",
      title: "内容编辑",
      backgroundColor: "#f8f8f8"
    }),
    d: common_vendor.n($data.formats.bold ? "ql-active" : ""),
    e: common_vendor.n($data.formats.italic ? "ql-active" : ""),
    f: common_vendor.n($data.formats.underline ? "ql-active" : ""),
    g: common_vendor.n($data.formats.strike ? "ql-active" : ""),
    h: common_vendor.n($data.formats.align === "left" ? "ql-active" : ""),
    i: common_vendor.n($data.formats.align === "center" ? "ql-active" : ""),
    j: common_vendor.n($data.formats.align === "right" ? "ql-active" : ""),
    k: common_vendor.n($data.formats.align === "justify" ? "ql-active" : ""),
    l: common_vendor.n($data.formats.lineHeight ? "ql-active" : ""),
    m: common_vendor.n($data.formats.letterSpacing ? "ql-active" : ""),
    n: common_vendor.n($data.formats.marginTop ? "ql-active" : ""),
    o: common_vendor.n($data.formats.marginBottom ? "ql-active" : ""),
    p: common_vendor.o((...args) => $options.removeFormat && $options.removeFormat(...args)),
    q: common_vendor.n($data.formats.fontFamily ? "ql-active" : ""),
    r: common_vendor.n($data.formats.fontSize === "24px" ? "ql-active" : ""),
    s: common_vendor.n($data.formats.color === "#0000ff" ? "ql-active" : ""),
    t: common_vendor.n($data.formats.backgroundColor === "#00ff00" ? "ql-active" : ""),
    v: common_vendor.o((...args) => $options.insertDate && $options.insertDate(...args)),
    w: common_vendor.n($data.formats.list === "ordered" ? "ql-active" : ""),
    x: common_vendor.n($data.formats.list === "bullet" ? "ql-active" : ""),
    y: common_vendor.o((...args) => $options.undo && $options.undo(...args)),
    z: common_vendor.o((...args) => $options.redo && $options.redo(...args)),
    A: common_vendor.o((...args) => $options.insertDivider && $options.insertDivider(...args)),
    B: common_vendor.o((...args) => $options.insertImage && $options.insertImage(...args)),
    C: common_vendor.n($data.formats.header === 1 ? "ql-active" : ""),
    D: common_vendor.n($data.formats.script === "sub" ? "ql-active" : ""),
    E: common_vendor.n($data.formats.script === "super" ? "ql-active" : ""),
    F: common_vendor.o((...args) => $options.clear && $options.clear(...args)),
    G: common_vendor.n($data.formats.direction === "rtl" ? "ql-active" : ""),
    H: common_vendor.o((...args) => $options.format && $options.format(...args)),
    I: common_vendor.o((...args) => $options.onStatusChange && $options.onStatusChange(...args)),
    J: $data.readOnly,
    K: common_vendor.o((...args) => $options.onEditorReady && $options.onEditorReady(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/流沙任务系统uniapp/uniapp_flow/pages/editor/editor.vue"]]);
wx.createPage(MiniProgramPage);
