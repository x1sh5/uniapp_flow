"use strict";
const signalr_for_uniapp_HeaderNames = require("./HeaderNames.js");
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
class SocketTaskTransport {
  constructor(httpClient, accessTokenFactory, logger, logMessageContent, socketTaskConstructor, headers) {
    this._logger = logger;
    this._accessTokenFactory = accessTokenFactory;
    this._logMessageContent = logMessageContent;
    this._socketTaskConstructor = socketTaskConstructor;
    this._httpClient = httpClient;
    this.onreceive = null;
    this.onclose = null;
    this._headers = headers;
    this._headers["Host"];
  }
  connect(url, transferFormat) {
    return __awaiter(this, void 0, void 0, function* () {
      signalr_for_uniapp_Utils.Arg.isRequired(url, "url");
      signalr_for_uniapp_Utils.Arg.isRequired(transferFormat, "transferFormat");
      signalr_for_uniapp_Utils.Arg.isIn(transferFormat, signalr_for_uniapp_ITransport.TransferFormat, "transferFormat");
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, "(SocketTasks transport) Connecting.");
      let token;
      if (this._accessTokenFactory) {
        token = yield this._accessTokenFactory();
      }
      return new Promise((resolve, reject) => {
        url = url.replace(/^http/, "ws");
        let socketTask;
        const cookies = this._httpClient.getCookieString(url);
        let opened = false;
        if (signalr_for_uniapp_Utils.Platform.isNode || signalr_for_uniapp_Utils.Platform.isReactNative) {
          const headers = {};
          const [name, value] = signalr_for_uniapp_Utils.getUserAgentHeader();
          headers[name] = value;
          if (token) {
            headers[signalr_for_uniapp_HeaderNames.HeaderNames.Authorization] = `Bearer ${token}`;
          }
          if (cookies) {
            headers[signalr_for_uniapp_HeaderNames.HeaderNames.Cookie] = cookies;
          }
          socketTask = this._socketTaskConstructor.connectSocket({ url, header: headers });
        } else {
          if (token) {
            url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(token)}`;
          }
        }
        socketTask.onOpen((result) => {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, `SocketTask connected to ${url}.`);
          this._socketTask = socketTask;
          opened = true;
          resolve(result.header);
        });
        socketTask.onError((result) => {
          let error = null;
          error = result.errMsg;
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, `(SocketTasks transport) ${error}.`);
        });
        socketTask.onMessage((message) => {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, `(SocketTasks transport) data received. ${signalr_for_uniapp_Utils.getDataDetail(message.data, this._logMessageContent)}.`);
          if (this.onreceive) {
            try {
              const data = message.data || "";
              this.onreceive(data);
            } catch (error) {
              this._close(error);
              return;
            }
          }
        });
        socketTask.onClose(() => {
          let result = new CloseEvent("SocketTask closed", { code: 1006, reason: "SocketTask disconnected" });
          if (opened) {
            this._close(result);
          } else {
            let error = null;
            if (typeof ErrorEvent !== "undefined" && result instanceof ErrorEvent) {
              error = result.error;
            } else {
              error = "SocketTask failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking SocketTasks. If you have multiple servers check that sticky sessions are enabled.";
            }
            reject(new Error(error));
          }
        });
      });
    });
  }
  send(data) {
    if (this._socketTask && this._socketTask.readyState === this._socketTaskConstructor.OPEN) {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, `(SocketTasks transport) sending data. ${signalr_for_uniapp_Utils.getDataDetail(data, this._logMessageContent)}.`);
      this._socketTask.send(data);
      return Promise.resolve();
    }
    return Promise.reject("SocketTask is not in the OPEN state");
  }
  stop() {
    if (this._socketTask) {
      this._close(void 0);
    }
    return Promise.resolve();
  }
  _close(event) {
    if (this._socketTask) {
      this._socketTask.onClose = () => {
      };
      this._socketTask.onMessage = () => {
      };
      this._socketTask.onError = () => {
      };
      this._socketTask.close({});
      this._socketTask = void 0;
    }
    this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, "(SocketTasks transport) socket closed.");
    if (this.onclose) {
      if (this._isCloseEvent(event) && (event.wasClean === false || event.code !== 1e3)) {
        this.onclose(new Error(`SocketTask closed with status code: ${event.code} (${event.reason || "no reason given"}).`));
      } else if (event instanceof Error) {
        this.onclose(event);
      } else {
        this.onclose();
      }
    }
  }
  _isCloseEvent(event) {
    return event && typeof event.wasClean === "boolean" && typeof event.code === "number";
  }
}
exports.SocketTaskTransport = SocketTaskTransport;
