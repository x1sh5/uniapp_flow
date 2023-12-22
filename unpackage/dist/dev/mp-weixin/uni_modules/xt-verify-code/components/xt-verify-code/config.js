"use strict";
const propsMap = {
  modelValue: {
    type: String,
    default: () => ""
  },
  type: {
    type: String,
    default: () => "box"
  },
  inputType: {
    type: String,
    default: () => "number"
  },
  size: {
    type: Number,
    default: () => 6
  },
  isFocus: {
    type: Boolean,
    default: () => true
  },
  isPassword: {
    type: Boolean,
    default: () => false
  },
  cursorColor: {
    type: String,
    default: () => "#cccccc"
  },
  boxNormalColor: {
    type: String,
    default: () => "#cccccc"
  },
  boxActiveColor: {
    type: String,
    default: () => "#000000"
  },
  color: {
    type: String,
    default: () => "#333333"
  }
};
exports.propsMap = propsMap;
