"use strict";
const signalr_for_uniapp_ILogger = require("./ILogger.js");
const signalr_for_uniapp_ITransport = require("./ITransport.js");
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
class ServerSentEventsTransport {
  constructor(httpClient, accessToken, logger, options) {
    this._httpClient = httpClient;
    this._accessToken = accessToken;
    this._logger = logger;
    this._options = options;
    this.onreceive = null;
    this.onclose = null;
  }
  connect(url, transferFormat) {
    return __awaiter(this, void 0, void 0, function* () {
      signalr_for_uniapp_Utils.Arg.isRequired(url, "url");
      signalr_for_uniapp_Utils.Arg.isRequired(transferFormat, "transferFormat");
      signalr_for_uniapp_Utils.Arg.isIn(transferFormat, signalr_for_uniapp_ITransport.TransferFormat, "transferFormat");
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, "(SSE transport) Connecting.");
      this._url = url;
      if (this._accessToken) {
        url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`;
      }
      return new Promise((resolve, reject) => {
        let opened = false;
        if (transferFormat !== signalr_for_uniapp_ITransport.TransferFormat.Text) {
          reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
          return;
        }
        let eventSource;
        if (signalr_for_uniapp_Utils.Platform.isBrowser || signalr_for_uniapp_Utils.Platform.isWebWorker) {
          eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials });
        } else {
          const cookies = this._httpClient.getCookieString(url);
          const headers = {};
          headers.Cookie = cookies;
          const [name, value] = signalr_for_uniapp_Utils.getUserAgentHeader();
          headers[name] = value;
          eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials, headers: Object.assign(Object.assign({}, headers), this._options.headers) });
        }
        try {
          eventSource.onmessage = (e) => {
            if (this.onreceive) {
              try {
                this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, `(SSE transport) data received. ${signalr_for_uniapp_Utils.getDataDetail(e.data, this._options.logMessageContent)}.`);
                this.onreceive(e.data);
              } catch (error) {
                if (error instanceof Error) {
                  this._close(error);
                } else {
                  this._close(new Error("An unknown error occurred."));
                }
                return;
              }
            }
          };
          eventSource.onerror = (e) => {
            if (opened) {
              this._close();
            } else {
              reject(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."));
            }
          };
          eventSource.onopen = () => {
            this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, `SSE connected to ${this._url}`);
            this._eventSource = eventSource;
            opened = true;
            resolve();
          };
        } catch (e) {
          reject(e);
          return;
        }
      });
    });
  }
  send(data) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this._eventSource) {
        return Promise.reject(new Error("Cannot send until the transport is connected"));
      }
      return signalr_for_uniapp_Utils.sendMessage(this._logger, "SSE", this._httpClient, this._url, data, this._options);
    });
  }
  stop() {
    this._close();
    return Promise.resolve();
  }
  _close(e) {
    if (this._eventSource) {
      this._eventSource.close();
      this._eventSource = void 0;
      if (this.onclose) {
        this.onclose(e);
      }
    }
  }
}
exports.ServerSentEventsTransport = ServerSentEventsTransport;
