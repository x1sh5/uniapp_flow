"use strict";
const common_vendor = require("../../../../common/vendor.js");
const getElementRect = (that) => (elm, type = "single", callback) => {
  common_vendor.index.createSelectorQuery().in(that)[type === "array" ? "selectAll" : "select"](elm).boundingClientRect().exec((data) => {
    callback(data[0]);
  });
};
exports.getElementRect = getElementRect;
