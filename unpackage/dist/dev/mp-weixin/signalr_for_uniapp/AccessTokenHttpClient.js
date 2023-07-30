"use strict";
const signalr_for_uniapp_HeaderNames = require("./HeaderNames.js");
const signalr_for_uniapp_HttpClient = require("./HttpClient.js");
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
class AccessTokenHttpClient extends signalr_for_uniapp_HttpClient.HttpClient {
  constructor(innerClient, accessTokenFactory) {
    super();
    this._innerClient = innerClient;
    this._accessTokenFactory = accessTokenFactory;
  }
  send(request) {
    return __awaiter(this, void 0, void 0, function* () {
      let allowRetry = true;
      if (this._accessTokenFactory && (!this._accessToken || request.url && request.url.indexOf("/negotiate?") > 0)) {
        allowRetry = false;
        this._accessToken = yield this._accessTokenFactory();
      }
      this._setAuthorizationHeader(request);
      const response = yield this._innerClient.send(request);
      if (allowRetry && response.statusCode === 401 && this._accessTokenFactory) {
        this._accessToken = yield this._accessTokenFactory();
        this._setAuthorizationHeader(request);
        return yield this._innerClient.send(request);
      }
      return response;
    });
  }
  _setAuthorizationHeader(request) {
    if (!request.headers) {
      request.headers = {};
    }
    if (this._accessToken) {
      request.headers[signalr_for_uniapp_HeaderNames.HeaderNames.Authorization] = `Bearer ${this._accessToken}`;
    } else if (this._accessTokenFactory) {
      if (request.headers[signalr_for_uniapp_HeaderNames.HeaderNames.Authorization]) {
        delete request.headers[signalr_for_uniapp_HeaderNames.HeaderNames.Authorization];
      }
    }
  }
  getCookieString(url) {
    return this._innerClient.getCookieString(url);
  }
}
exports.AccessTokenHttpClient = AccessTokenHttpClient;
