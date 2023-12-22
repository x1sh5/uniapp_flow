"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_xtVerifyCode_components_xtVerifyCode_config = require("./config.js");
const uni_modules_xtVerifyCode_components_xtVerifyCode_util = require("./util.js");
const _sfc_main = {
  __name: "xt-verify-code",
  props: uni_modules_xtVerifyCode_components_xtVerifyCode_config.propsMap,
  emits: ["update:modelValue", "confirm"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const currentInstance = common_vendor.getCurrentInstance();
    const getElement = uni_modules_xtVerifyCode_components_xtVerifyCode_util.getElementRect(currentInstance);
    const cursorVisible = common_vendor.ref(false);
    const cursorHeight = common_vendor.ref(35);
    const code = common_vendor.ref("");
    const codeCursorLeft = common_vendor.ref([]);
    const itemSize = common_vendor.ref(6);
    const isPatch = common_vendor.ref(false);
    function validatorSize() {
      if (props.size > 0) {
        itemSize.value = Math.floor(props.size);
      } else {
        throw "methods of 'size' is integer";
      }
    }
    function init() {
      getCodeCursorLeft();
      setCursorHeight();
    }
    function setCursorHeight() {
      getElement(".xt__box", "single", (boxElm) => {
        cursorHeight.value = boxElm.height * 0.6;
      });
    }
    function getCodeCursorLeft() {
      getElement("#xt__input-ground", "single", (parentElm) => {
        const parentLeft = parentElm.left;
        getElement(".xt__box", "array", (elms) => {
          codeCursorLeft.value = [];
          elms.forEach((elm) => {
            codeCursorLeft.value.push(elm.left - parentLeft + elm.width / 2);
          });
        });
      });
    }
    function onInput(e) {
      let { value, keyCode } = e.detail;
      cursorVisible.value = value.length < itemSize.value;
      code.value = value;
      emits("update:modelValue", value);
      inputSuccess(value);
    }
    function inputSuccess(value) {
      if (value.length === itemSize.value && !isPatch.value) {
        isPatch.value = true;
        emits("confirm", value);
      } else {
        isPatch.value = false;
      }
    }
    function inputFocus() {
      cursorVisible.value = code.value.length < itemSize.value;
    }
    function inputBlur() {
      cursorVisible.value = false;
    }
    function codeFormat(val, isPassword) {
      return val ? isPassword ? "*" : val : "";
    }
    common_vendor.onMounted(() => {
      cursorVisible.value = props.isFocus;
      validatorSize();
      init();
    });
    common_vendor.watch(
      () => props.modelValue,
      (val) => {
        if (val !== code.value) {
          code.value = val;
        }
      }
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: code.value,
        b: props.isFocus,
        c: props.inputType,
        d: itemSize.value,
        e: common_vendor.o(onInput),
        f: common_vendor.o(inputFocus),
        g: common_vendor.o(inputBlur),
        h: cursorVisible.value && props.type !== "middle"
      }, cursorVisible.value && props.type !== "middle" ? {
        i: codeCursorLeft.value[code.value.length] + "px",
        j: cursorHeight.value + "px",
        k: props.cursorColor
      } : {}, {
        l: common_vendor.f(itemSize.value, (item, index, i0) => {
          return common_vendor.e({
            a: props.type === "middle" && !code.value[index]
          }, props.type === "middle" && !code.value[index] ? {
            b: props.boxActiveColor
          } : {}, {
            c: common_vendor.t(codeFormat(code.value[index], props.isPassword)),
            d: index,
            e: code.value.length === index && cursorVisible.value ? props.boxActiveColor : props.boxNormalColor
          });
        }),
        m: props.color,
        n: common_vendor.n(`xt__box-${props.type + ""}`),
        o: common_vendor.n(`xt__box::after`)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6c993761"], ["__file", "C:/Users/x/Documents/HBuilderProjects/flow/uni_modules/xt-verify-code/components/xt-verify-code/xt-verify-code.vue"]]);
wx.createComponent(Component);
