"use strict";
const signalr_for_uniapp_AbortController = require("./AbortController.js");
const signalr_for_uniapp_Errors = require("./Errors.js");
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
class LongPollingTransport {
  // This is an internal type, not exported from 'index' so this is really just internal.
  get pollAborted() {
    return this._pollAbort.aborted;
  }
  constructor(httpClient, logger, options) {
    this._httpClient = httpClient;
    this._logger = logger;
    this._pollAbort = new signalr_for_uniapp_AbortController.AbortController();
    this._options = options;
    this._running = false;
    this.onreceive = null;
    this.onclose = null;
  }
  connect(url, transferFormat) {
    return __awaiter(this, void 0, void 0, function* () {
      signalr_for_uniapp_Utils.Arg.isRequired(url, "url");
      signalr_for_uniapp_Utils.Arg.isRequired(transferFormat, "transferFormat");
      signalr_for_uniapp_Utils.Arg.isIn(transferFormat, signalr_for_uniapp_ITransport.TransferFormat, "transferFormat");
      this._url = url;
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, "(LongPolling transport) Connecting.");
      if (transferFormat === signalr_for_uniapp_ITransport.TransferFormat.Binary && (typeof XMLHttpRequest !== "undefined" && typeof new XMLHttpRequest().responseType !== "string")) {
        throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
      }
      const [name, value] = signalr_for_uniapp_Utils.getUserAgentHeader();
      const headers = Object.assign({ [name]: value }, this._options.headers);
      const pollOptions = {
        abortSignal: this._pollAbort.signal,
        headers,
        timeout: 1e5,
        withCredentials: this._options.withCredentials
      };
      if (transferFormat === signalr_for_uniapp_ITransport.TransferFormat.Binary) {
        pollOptions.responseType = "arraybuffer";
      }
      const pollUrl = `${url}&_=${Date.now()}`;
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, `(LongPolling transport) polling: ${pollUrl}.`);
      const response = yield this._httpClient.get(pollUrl, pollOptions);
      if (response.statusCode !== 200) {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `(LongPolling transport) Unexpected response code: ${response.statusCode}.`);
        this._closeError = new signalr_for_uniapp_Errors.HttpError(response.statusText || "", response.statusCode);
        this._running = false;
      } else {
        this._running = true;
      }
      this._receiving = this._poll(this._url, pollOptions);
    });
  }
  _poll(url, pollOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        while (this._running) {
          try {
            const pollUrl = `${url}&_=${Date.now()}`;
            this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, `(LongPolling transport) polling: ${pollUrl}.`);
            const response = yield this._httpClient.get(pollUrl, pollOptions);
            if (response.statusCode === 204) {
              this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, "(LongPolling transport) Poll terminated by server.");
              this._running = false;
            } else if (response.statusCode !== 200) {
              this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `(LongPolling transport) Unexpected response code: ${response.statusCode}.`);
              this._closeError = new signalr_for_uniapp_Errors.HttpError(response.statusText || "", response.statusCode);
              this._running = false;
            } else {
              if (response.content) {
                this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, `(LongPolling transport) data received. ${signalr_for_uniapp_Utils.getDataDetail(response.content, this._options.logMessageContent)}.`);
                if (this.onreceive) {
                  this.onreceive(response.content);
                }
              } else {
                this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
              }
            }
          } catch (e) {
            if (!this._running) {
              this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, `(LongPolling transport) Poll errored after shutdown: ${e.message}`);
            } else {
              if (e instanceof signalr_for_uniapp_Errors.TimeoutError) {
                this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
              } else {
                this._closeError = e;
                this._running = false;
              }
            }
          }
        }
      } finally {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, "(LongPolling transport) Polling complete.");
        if (!this.pollAborted) {
          this._raiseOnClose();
        }
      }
    });
  }
  send(data) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this._running) {
        return Promise.reject(new Error("Cannot send until the transport is connected"));
      }
      return signalr_for_uniapp_Utils.sendMessage(this._logger, "LongPolling", this._httpClient, this._url, data, this._options);
    });
  }
  stop() {
    return __awaiter(this, void 0, void 0, function* () {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, "(LongPolling transport) Stopping polling.");
      this._running = false;
      this._pollAbort.abort();
      try {
        yield this._receiving;
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
        const headers = {};
        const [name, value] = signalr_for_uniapp_Utils.getUserAgentHeader();
        headers[name] = value;
        const deleteOptions = {
          headers: Object.assign(Object.assign({}, headers), this._options.headers),
          timeout: this._options.timeout,
          withCredentials: this._options.withCredentials
        };
        yield this._httpClient.delete(this._url, deleteOptions);
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, "(LongPolling transport) DELETE request sent.");
      } finally {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, "(LongPolling transport) Stop finished.");
        this._raiseOnClose();
      }
    });
  }
  _raiseOnClose() {
    if (this.onclose) {
      let logMessage = "(LongPolling transport) Firing onclose event.";
      if (this._closeError) {
        logMessage += " Error: " + this._closeError;
      }
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Trace, logMessage);
      this.onclose(this._closeError);
    }
  }
}
exports.LongPollingTransport = LongPollingTransport;
