"use strict";
const signalr_for_uniapp_Errors = require("./Errors.js");
const signalr_for_uniapp_HttpClient = require("./HttpClient.js");
const signalr_for_uniapp_ILogger = require("./ILogger.js");
const signalr_for_uniapp_Utils = require("./Utils.js");
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class FetchHttpClient extends signalr_for_uniapp_HttpClient.HttpClient {
  constructor(logger) {
    super();
    this._logger = logger;
    if (typeof fetch === "undefined") {
      const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
      this._jar = new (requireFunc("tough-cookie")).CookieJar();
      this._fetchType = requireFunc("node-fetch");
      this._fetchType = requireFunc("fetch-cookie")(this._fetchType, this._jar);
    } else {
      this._fetchType = fetch.bind(signalr_for_uniapp_Utils.getGlobalThis());
    }
    if (typeof AbortController === "undefined") {
      const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
      this._abortControllerType = requireFunc("abort-controller");
    } else {
      this._abortControllerType = AbortController;
    }
  }
  /** @inheritDoc */
  send(request) {
    return __awaiter(this, void 0, void 0, function* () {
      if (request.abortSignal && request.abortSignal.aborted) {
        throw new signalr_for_uniapp_Errors.AbortError();
      }
      if (!request.method) {
        throw new Error("No method defined.");
      }
      if (!request.url) {
        throw new Error("No url defined.");
      }
      const abortController = new this._abortControllerType();
      let error;
      if (request.abortSignal) {
        request.abortSignal.onabort = () => {
          abortController.abort();
          error = new signalr_for_uniapp_Errors.AbortError();
        };
      }
      let timeoutId = null;
      if (request.timeout) {
        const msTimeout = request.timeout;
        timeoutId = setTimeout(() => {
          abortController.abort();
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Warning, `Timeout from HTTP request.`);
          error = new signalr_for_uniapp_Errors.TimeoutError();
        }, msTimeout);
      }
      if (request.content === "") {
        request.content = void 0;
      }
      if (request.content) {
        request.headers = request.headers || {};
        if (signalr_for_uniapp_Utils.isArrayBuffer(request.content)) {
          request.headers["Content-Type"] = "application/octet-stream";
        } else {
          request.headers["Content-Type"] = "text/plain;charset=UTF-8";
        }
      }
      let response;
      try {
        response = yield this._fetchType(request.url, {
          body: request.content,
          cache: "no-cache",
          //credentials: request.withCredentials === true ? "include" : "same-origin",
          headers: Object.assign({ "X-Requested-With": "XMLHttpRequest" }, request.headers),
          method: request.method,
          mode: "cors",
          redirect: "follow",
          signal: abortController.signal
        });
      } catch (e) {
        if (error) {
          throw error;
        }
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Warning, `Error from HTTP request. ${e}.`);
        throw e;
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (request.abortSignal) {
          request.abortSignal.onabort = null;
        }
      }
      if (!response.ok) {
        const errorMessage = yield deserializeContent(response, "text");
        throw new signalr_for_uniapp_Errors.HttpError(errorMessage || response.statusText, response.status);
      }
      const content = deserializeContent(response, request.responseType);
      const payload = yield content;
      return new signalr_for_uniapp_HttpClient.HttpResponse(response.status, response.statusText, payload);
    });
  }
  getCookieString(url) {
    let cookies = "";
    if (signalr_for_uniapp_Utils.Platform.isNode && this._jar) {
      this._jar.getCookies(url, (e, c) => cookies = c.join("; "));
    }
    return cookies;
  }
}
function deserializeContent(response, responseType) {
  let content;
  switch (responseType) {
    case "arraybuffer":
      content = response.arrayBuffer();
      break;
    case "text":
      content = response.text();
      break;
    case "blob":
    case "document":
    case "json":
      throw new Error(`${responseType} is not supported.`);
    default:
      content = response.text();
      break;
  }
  return content;
}
exports.FetchHttpClient = FetchHttpClient;
