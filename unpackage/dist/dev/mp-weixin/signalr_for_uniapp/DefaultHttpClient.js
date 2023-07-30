"use strict";
const common_vendor = require("../common/vendor.js");
const signalr_for_uniapp_Errors = require("./Errors.js");
const signalr_for_uniapp_FetchHttpClient = require("./FetchHttpClient.js");
const signalr_for_uniapp_HttpClient = require("./HttpClient.js");
const signalr_for_uniapp_Utils = require("./Utils.js");
const signalr_for_uniapp_XhrHttpClient = require("./XhrHttpClient.js");
const signalr_for_uniapp_UniHttpClient = require("./UniHttpClient.js");
class DefaultHttpClient extends signalr_for_uniapp_HttpClient.HttpClient {
  /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
  constructor(logger) {
    super();
    if (typeof common_vendor.wx$1 !== "undefined") {
      this._httpClient = new signalr_for_uniapp_UniHttpClient.UniHttpClient(logger);
    } else if (typeof fetch !== "undefined" || signalr_for_uniapp_Utils.Platform.isNode) {
      this._httpClient = new signalr_for_uniapp_FetchHttpClient.FetchHttpClient(logger);
    } else if (typeof XMLHttpRequest !== "undefined") {
      this._httpClient = new signalr_for_uniapp_XhrHttpClient.XhrHttpClient(logger);
    } else {
      throw new Error("No usable HttpClient found.");
    }
  }
  /** @inheritDoc */
  send(request) {
    if (request.abortSignal && request.abortSignal.aborted) {
      return Promise.reject(new signalr_for_uniapp_Errors.AbortError());
    }
    if (!request.method) {
      return Promise.reject(new Error("No method defined."));
    }
    if (!request.url) {
      return Promise.reject(new Error("No url defined."));
    }
    return this._httpClient.send(request);
  }
  getCookieString(url) {
    return this._httpClient.getCookieString(url);
  }
}
exports.DefaultHttpClient = DefaultHttpClient;
