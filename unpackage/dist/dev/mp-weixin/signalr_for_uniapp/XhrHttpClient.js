"use strict";
const signalr_for_uniapp_Errors = require("./Errors.js");
const signalr_for_uniapp_HttpClient = require("./HttpClient.js");
const signalr_for_uniapp_ILogger = require("./ILogger.js");
const signalr_for_uniapp_Utils = require("./Utils.js");
class XhrHttpClient extends signalr_for_uniapp_HttpClient.HttpClient {
  constructor(logger) {
    super();
    this._logger = logger;
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
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(request.method, request.url, true);
      xhr.withCredentials = request.withCredentials === void 0 ? true : request.withCredentials;
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      if (request.content === "") {
        request.content = void 0;
      }
      if (request.content) {
        if (signalr_for_uniapp_Utils.isArrayBuffer(request.content)) {
          xhr.setRequestHeader("Content-Type", "application/octet-stream");
        } else {
          xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        }
      }
      const headers = request.headers;
      if (headers) {
        Object.keys(headers).forEach((header) => {
          xhr.setRequestHeader(header, headers[header]);
        });
      }
      if (request.responseType) {
        xhr.responseType = request.responseType;
      }
      if (request.abortSignal) {
        request.abortSignal.onabort = () => {
          xhr.abort();
          reject(new signalr_for_uniapp_Errors.AbortError());
        };
      }
      if (request.timeout) {
        xhr.timeout = request.timeout;
      }
      xhr.onload = () => {
        if (request.abortSignal) {
          request.abortSignal.onabort = null;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(new signalr_for_uniapp_HttpClient.HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
        } else {
          reject(new signalr_for_uniapp_Errors.HttpError(xhr.response || xhr.responseText || xhr.statusText, xhr.status));
        }
      };
      xhr.onerror = () => {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Warning, `Error from HTTP request. ${xhr.status}: ${xhr.statusText}.`);
        reject(new signalr_for_uniapp_Errors.HttpError(xhr.statusText, xhr.status));
      };
      xhr.ontimeout = () => {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Warning, `Timeout from HTTP request.`);
        reject(new signalr_for_uniapp_Errors.TimeoutError());
      };
      xhr.send(request.content);
    });
  }
}
exports.XhrHttpClient = XhrHttpClient;
