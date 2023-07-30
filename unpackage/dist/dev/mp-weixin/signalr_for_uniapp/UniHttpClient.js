"use strict";
const common_vendor = require("../common/vendor.js");
const signalr_for_uniapp_Errors = require("./Errors.js");
const signalr_for_uniapp_HttpClient = require("./HttpClient.js");
const signalr_for_uniapp_Utils = require("./Utils.js");
class UniHttpClient extends signalr_for_uniapp_HttpClient.HttpClient {
  constructor(logger) {
    super();
    this._logger = logger;
  }
  /** @inheritDoc */
  send(request) {
    request.withCredentials = false;
    if (request.abortSignal && request.abortSignal.aborted) {
      return Promise.reject(new signalr_for_uniapp_Errors.AbortError());
    }
    if (!request.method) {
      return Promise.reject(new Error("No method defined."));
    }
    if (!request.url) {
      return Promise.reject(new Error("No url defined."));
    }
    request.headers["X-Requested-With"] = "XMLHttpRequest";
    if (request.content === "") {
      request.content = void 0;
    }
    if (request.content) {
      if (signalr_for_uniapp_Utils.isArrayBuffer(request.content)) {
        request.headers["Content-Type"] = "application/octet-stream";
      } else {
        request.headers["Content-Type"] = "text/plain;charset=UTF-8";
      }
    }
    common_vendor.index.requestWithCookie(request);
    let options = request;
    return new Promise((resolve, reject) => {
      options.success = (response) => {
        let res = new signalr_for_uniapp_HttpClient.HttpResponse(response.statusCode, response.data, response.headers);
        resolve(res);
      };
      options.fail = (response) => {
        reject(new Error(response === null || response === void 0 ? void 0 : response.errMsg));
      };
      common_vendor.index.requestWithCookie(request);
    });
  }
}
exports.UniHttpClient = UniHttpClient;
