"use strict";
const signalr_for_uniapp_AccessTokenHttpClient = require("./AccessTokenHttpClient.js");
const signalr_for_uniapp_DefaultHttpClient = require("./DefaultHttpClient.js");
const signalr_for_uniapp_Errors = require("./Errors.js");
const signalr_for_uniapp_ILogger = require("./ILogger.js");
const signalr_for_uniapp_ITransport = require("./ITransport.js");
const signalr_for_uniapp_LongPollingTransport = require("./LongPollingTransport.js");
const signalr_for_uniapp_ServerSentEventsTransport = require("./ServerSentEventsTransport.js");
const signalr_for_uniapp_Utils = require("./Utils.js");
const signalr_for_uniapp_WebSocketTransport = require("./WebSocketTransport.js");
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
const MAX_REDIRECTS = 100;
class HttpConnection {
  constructor(url, options = {}) {
    this._stopPromiseResolver = () => {
    };
    this.features = {};
    this._negotiateVersion = 1;
    signalr_for_uniapp_Utils.Arg.isRequired(url, "url");
    this._logger = signalr_for_uniapp_Utils.createLogger(options.logger);
    this.baseUrl = this._resolveUrl(url);
    options = options || {};
    options.logMessageContent = options.logMessageContent === void 0 ? false : options.logMessageContent;
    if (typeof options.withCredentials === "boolean" || options.withCredentials === void 0) {
      options.withCredentials = options.withCredentials === void 0 ? true : options.withCredentials;
    } else {
      throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
    }
    options.timeout = options.timeout === void 0 ? 100 * 1e3 : options.timeout;
    let socketTaskModule = null;
    let eventSourceModule = null;
    if (signalr_for_uniapp_Utils.Platform.isNode && typeof require !== "undefined") {
      const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
      socketTaskModule = requireFunc("ws");
      eventSourceModule = requireFunc("eventsource");
    }
    if (!signalr_for_uniapp_Utils.Platform.isNode && typeof SocketTaskConstructor !== "undefined" && !options.SocketTask) {
      options.SocketTask = SocketTaskConstructor;
    } else if (signalr_for_uniapp_Utils.Platform.isNode && !options.SocketTask) {
      if (socketTaskModule) {
        options.SocketTask = socketTaskModule;
      }
    }
    if (!signalr_for_uniapp_Utils.Platform.isNode && typeof EventSource !== "undefined" && !options.EventSource) {
      options.EventSource = EventSource;
    } else if (signalr_for_uniapp_Utils.Platform.isNode && !options.EventSource) {
      if (typeof eventSourceModule !== "undefined") {
        options.EventSource = eventSourceModule;
      }
    }
    this._httpClient = new signalr_for_uniapp_AccessTokenHttpClient.AccessTokenHttpClient(options.httpClient || new signalr_for_uniapp_DefaultHttpClient.DefaultHttpClient(this._logger), options.accessTokenFactory);
    this._connectionState = "Disconnected";
    this._connectionStarted = false;
    this._options = options;
    this.onreceive = null;
    this.onclose = null;
  }
  start(transferFormat) {
    return __awaiter(this, void 0, void 0, function* () {
      transferFormat = transferFormat || signalr_for_uniapp_ITransport.TransferFormat.Binary;
      signalr_for_uniapp_Utils.Arg.isIn(transferFormat, signalr_for_uniapp_ITransport.TransferFormat, "transferFormat");
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Starting connection with transfer format '${signalr_for_uniapp_ITransport.TransferFormat[transferFormat]}'.`);
      if (this._connectionState !== "Disconnected") {
        return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
      }
      this._connectionState = "Connecting";
      this._startInternalPromise = this._startInternal(transferFormat);
      yield this._startInternalPromise;
      if (this._connectionState === "Disconnecting") {
        const message = "Failed to start the HttpConnection before stop() was called.";
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, message);
        yield this._stopPromise;
        return Promise.reject(new signalr_for_uniapp_Errors.AbortError(message));
      } else if (this._connectionState !== "Connected") {
        const message = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, message);
        return Promise.reject(new signalr_for_uniapp_Errors.AbortError(message));
      }
      this._connectionStarted = true;
    });
  }
  send(data) {
    if (this._connectionState !== "Connected") {
      return Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State."));
    }
    if (!this._sendQueue) {
      this._sendQueue = new TransportSendQueue(this.transport);
    }
    return this._sendQueue.send(data);
  }
  stop(error) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this._connectionState === "Disconnected") {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnected state.`);
        return Promise.resolve();
      }
      if (this._connectionState === "Disconnecting") {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnecting state.`);
        return this._stopPromise;
      }
      this._connectionState = "Disconnecting";
      this._stopPromise = new Promise((resolve) => {
        this._stopPromiseResolver = resolve;
      });
      yield this._stopInternal(error);
      yield this._stopPromise;
    });
  }
  _stopInternal(error) {
    return __awaiter(this, void 0, void 0, function* () {
      this._stopError = error;
      try {
        yield this._startInternalPromise;
      } catch (e) {
      }
      if (this.transport) {
        try {
          yield this.transport.stop();
        } catch (e) {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `HttpConnection.transport.stop() threw error '${e}'.`);
          this._stopConnection();
        }
        this.transport = void 0;
      } else {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
      }
    });
  }
  _startInternal(transferFormat) {
    return __awaiter(this, void 0, void 0, function* () {
      let url = this.baseUrl;
      this._accessTokenFactory = this._options.accessTokenFactory;
      this._httpClient._accessTokenFactory = this._accessTokenFactory;
      try {
        if (this._options.skipNegotiation) {
          if (this._options.transport === signalr_for_uniapp_ITransport.HttpTransportType.SocketTasks) {
            this.transport = this._constructTransport(signalr_for_uniapp_ITransport.HttpTransportType.SocketTasks);
            yield this._startTransport(url, transferFormat);
          } else {
            throw new Error("Negotiation can only be skipped when using the SocketTask transport directly.");
          }
        } else {
          let negotiateResponse = null;
          let redirects = 0;
          do {
            negotiateResponse = yield this._getNegotiationResponse(url);
            if (this._connectionState === "Disconnecting" || this._connectionState === "Disconnected") {
              throw new signalr_for_uniapp_Errors.AbortError("The connection was stopped during negotiation.");
            }
            if (negotiateResponse.error) {
              throw new Error(negotiateResponse.error);
            }
            if (negotiateResponse.ProtocolVersion) {
              throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
            }
            if (negotiateResponse.url) {
              url = negotiateResponse.url;
            }
            if (negotiateResponse.accessToken) {
              const accessToken = negotiateResponse.accessToken;
              this._accessTokenFactory = () => accessToken;
              this._httpClient._accessToken = accessToken;
              this._httpClient._accessTokenFactory = void 0;
            }
            redirects++;
          } while (negotiateResponse.url && redirects < MAX_REDIRECTS);
          if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
            throw new Error("Negotiate redirection limit exceeded.");
          }
          yield this._createTransport(url, this._options.transport, negotiateResponse, transferFormat);
        }
        if (this.transport instanceof signalr_for_uniapp_LongPollingTransport.LongPollingTransport) {
          this.features.inherentKeepAlive = true;
        }
        if (this._connectionState === "Connecting") {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "The HttpConnection connected successfully.");
          this._connectionState = "Connected";
        }
      } catch (e) {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, "Failed to start the connection: " + e);
        this._connectionState = "Disconnected";
        this.transport = void 0;
        this._stopPromiseResolver();
        return Promise.reject(e);
      }
    });
  }
  _getNegotiationResponse(url) {
    return __awaiter(this, void 0, void 0, function* () {
      const headers = {};
      const [name, value] = signalr_for_uniapp_Utils.getUserAgentHeader();
      headers[name] = value;
      const negotiateUrl = this._resolveNegotiateUrl(url);
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Sending negotiation request: ${negotiateUrl}.`);
      try {
        const response = yield this._httpClient.post(negotiateUrl, {
          content: "",
          headers: Object.assign(Object.assign({}, headers), this._options.headers),
          timeout: this._options.timeout,
          withCredentials: this._options.withCredentials
        });
        if (response.statusCode !== 200) {
          return Promise.reject(new Error(`Unexpected status code returned from negotiate '${response.statusCode}'`));
        }
        const negotiateResponse = JSON.parse(response.content);
        if (!negotiateResponse.negotiateVersion || negotiateResponse.negotiateVersion < 1) {
          negotiateResponse.connectionToken = negotiateResponse.connectionId;
        }
        return negotiateResponse;
      } catch (e) {
        let errorMessage = "Failed to complete negotiation with the server: " + e;
        if (e instanceof signalr_for_uniapp_Errors.HttpError) {
          if (e.statusCode === 404) {
            errorMessage = errorMessage + " Either this is not a SignalR endpoint or there is a proxy blocking the connection.";
          }
        }
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, errorMessage);
        return Promise.reject(new signalr_for_uniapp_Errors.FailedToNegotiateWithServerError(errorMessage));
      }
    });
  }
  _createConnectUrl(url, connectionToken) {
    if (!connectionToken) {
      return url;
    }
    return url + (url.indexOf("?") === -1 ? "?" : "&") + `id=${connectionToken}`;
  }
  _createTransport(url, requestedTransport, negotiateResponse, requestedTransferFormat) {
    return __awaiter(this, void 0, void 0, function* () {
      let connectUrl = this._createConnectUrl(url, negotiateResponse.connectionToken);
      if (this._isITransport(requestedTransport)) {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "Connection was provided an instance of ITransport, using that directly.");
        this.transport = requestedTransport;
        yield this._startTransport(connectUrl, requestedTransferFormat);
        this.connectionId = negotiateResponse.connectionId;
        return;
      }
      const transportExceptions = [];
      const transports = negotiateResponse.availableTransports || [];
      let negotiate = negotiateResponse;
      for (const endpoint of transports) {
        const transportOrError = this._resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat);
        if (transportOrError instanceof Error) {
          transportExceptions.push(`${endpoint.transport} failed:`);
          transportExceptions.push(transportOrError);
        } else if (this._isITransport(transportOrError)) {
          this.transport = transportOrError;
          if (!negotiate) {
            try {
              negotiate = yield this._getNegotiationResponse(url);
            } catch (ex) {
              return Promise.reject(ex);
            }
            connectUrl = this._createConnectUrl(url, negotiate.connectionToken);
          }
          try {
            yield this._startTransport(connectUrl, requestedTransferFormat);
            this.connectionId = negotiate.connectionId;
            return;
          } catch (ex) {
            this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `Failed to start the transport '${endpoint.transport}': ${ex}`);
            negotiate = void 0;
            transportExceptions.push(new signalr_for_uniapp_Errors.FailedToStartTransportError(`${endpoint.transport} failed: ${ex}`, signalr_for_uniapp_ITransport.HttpTransportType[endpoint.transport]));
            if (this._connectionState !== "Connecting") {
              const message = "Failed to select transport before stop() was called.";
              this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, message);
              return Promise.reject(new signalr_for_uniapp_Errors.AbortError(message));
            }
          }
        }
      }
      if (transportExceptions.length > 0) {
        return Promise.reject(new signalr_for_uniapp_Errors.AggregateErrors(`Unable to connect to the server with any of the available transports. ${transportExceptions.join(" ")}`, transportExceptions));
      }
      return Promise.reject(new Error("None of the transports supported by the client are supported by the server."));
    });
  }
  _constructTransport(transport) {
    switch (transport) {
      case signalr_for_uniapp_ITransport.HttpTransportType.SocketTasks:
        if (!this._options.SocketTask) {
          throw new Error("'SocketTask' is not supported in your environment.");
        }
        return new signalr_for_uniapp_WebSocketTransport.SocketTaskTransport(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.SocketTask, this._options.headers || {});
      case signalr_for_uniapp_ITransport.HttpTransportType.ServerSentEvents:
        if (!this._options.EventSource) {
          throw new Error("'EventSource' is not supported in your environment.");
        }
        return new signalr_for_uniapp_ServerSentEventsTransport.ServerSentEventsTransport(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
      case signalr_for_uniapp_ITransport.HttpTransportType.LongPolling:
        return new signalr_for_uniapp_LongPollingTransport.LongPollingTransport(this._httpClient, this._logger, this._options);
      default:
        throw new Error(`Unknown transport: ${transport}.`);
    }
  }
  _startTransport(url, transferFormat) {
    this.transport.onreceive = this.onreceive;
    this.transport.onclose = (e) => this._stopConnection(e);
    return this.transport.connect(url, transferFormat);
  }
  _resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat) {
    const transport = signalr_for_uniapp_ITransport.HttpTransportType[endpoint.transport];
    if (transport === null || transport === void 0) {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Skipping transport '${endpoint.transport}' because it is not supported by this client.`);
      return new Error(`Skipping transport '${endpoint.transport}' because it is not supported by this client.`);
    } else {
      if (transportMatches(requestedTransport, transport)) {
        const transferFormats = endpoint.transferFormats.map((s) => signalr_for_uniapp_ITransport.TransferFormat[s]);
        if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
          if (transport === signalr_for_uniapp_ITransport.HttpTransportType.SocketTasks && !this._options.SocketTask || transport === signalr_for_uniapp_ITransport.HttpTransportType.ServerSentEvents && !this._options.EventSource) {
            this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Skipping transport '${signalr_for_uniapp_ITransport.HttpTransportType[transport]}' because it is not supported in your environment.'`);
            return new signalr_for_uniapp_Errors.UnsupportedTransportError(`'${signalr_for_uniapp_ITransport.HttpTransportType[transport]}' is not supported in your environment.`, transport);
          } else {
            this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Selecting transport '${signalr_for_uniapp_ITransport.HttpTransportType[transport]}'.`);
            try {
              return this._constructTransport(transport);
            } catch (ex) {
              return new Error(ex.toString());
            }
          }
        } else {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Skipping transport '${signalr_for_uniapp_ITransport.HttpTransportType[transport]}' because it does not support the requested transfer format '${signalr_for_uniapp_ITransport.TransferFormat[requestedTransferFormat]}'.`);
          return new Error(`'${signalr_for_uniapp_ITransport.HttpTransportType[transport]}' does not support ${signalr_for_uniapp_ITransport.TransferFormat[requestedTransferFormat]}.`);
        }
      } else {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Skipping transport '${signalr_for_uniapp_ITransport.HttpTransportType[transport]}' because it was disabled by the client.`);
        return new signalr_for_uniapp_Errors.DisabledTransportError(`'${signalr_for_uniapp_ITransport.HttpTransportType[transport]}' is disabled by the client.`, transport);
      }
    }
  }
  _isITransport(transport) {
    return transport && typeof transport === "object" && "connect" in transport;
  }
  _stopConnection(error) {
    this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `HttpConnection.stopConnection(${error}) called while in state ${this._connectionState}.`);
    this.transport = void 0;
    error = this._stopError || error;
    this._stopError = void 0;
    if (this._connectionState === "Disconnected") {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Call to HttpConnection.stopConnection(${error}) was ignored because the connection is already in the disconnected state.`);
      return;
    }
    if (this._connectionState === "Connecting") {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Warning, `Call to HttpConnection.stopConnection(${error}) was ignored because the connection is still in the connecting state.`);
      throw new Error(`HttpConnection.stopConnection(${error}) was called while the connection is still in the connecting state.`);
    }
    if (this._connectionState === "Disconnecting") {
      this._stopPromiseResolver();
    }
    if (error) {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `Connection disconnected with error '${error}'.`);
    } else {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, "Connection disconnected.");
    }
    if (this._sendQueue) {
      this._sendQueue.stop().catch((e) => {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `TransportSendQueue.stop() threw error '${e}'.`);
      });
      this._sendQueue = void 0;
    }
    this.connectionId = void 0;
    this._connectionState = "Disconnected";
    if (this._connectionStarted) {
      this._connectionStarted = false;
      try {
        if (this.onclose) {
          this.onclose(error);
        }
      } catch (e) {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `HttpConnection.onclose(${error}) threw error '${e}'.`);
      }
    }
  }
  _resolveUrl(url) {
    if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
      return url;
    }
    if (!signalr_for_uniapp_Utils.Platform.isBrowser) {
      throw new Error(`Cannot resolve '${url}'.`);
    }
    const aTag = window.document.createElement("a");
    aTag.href = url;
    this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, `Normalizing '${url}' to '${aTag.href}'.`);
    return aTag.href;
  }
  _resolveNegotiateUrl(url) {
    const index = url.indexOf("?");
    let negotiateUrl = url.substring(0, index === -1 ? url.length : index);
    if (negotiateUrl[negotiateUrl.length - 1] !== "/") {
      negotiateUrl += "/";
    }
    negotiateUrl += "negotiate";
    negotiateUrl += index === -1 ? "" : url.substring(index);
    if (negotiateUrl.indexOf("negotiateVersion") === -1) {
      negotiateUrl += index === -1 ? "?" : "&";
      negotiateUrl += "negotiateVersion=" + this._negotiateVersion;
    }
    return negotiateUrl;
  }
}
function transportMatches(requestedTransport, actualTransport) {
  return !requestedTransport || (actualTransport & requestedTransport) !== 0;
}
class TransportSendQueue {
  constructor(_transport) {
    this._transport = _transport;
    this._buffer = [];
    this._executing = true;
    this._sendBufferedData = new PromiseSource();
    this._transportResult = new PromiseSource();
    this._sendLoopPromise = this._sendLoop();
  }
  send(data) {
    this._bufferData(data);
    if (!this._transportResult) {
      this._transportResult = new PromiseSource();
    }
    return this._transportResult.promise;
  }
  stop() {
    this._executing = false;
    this._sendBufferedData.resolve();
    return this._sendLoopPromise;
  }
  _bufferData(data) {
    if (this._buffer.length && typeof this._buffer[0] !== typeof data) {
      throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof data}`);
    }
    this._buffer.push(data);
    this._sendBufferedData.resolve();
  }
  _sendLoop() {
    return __awaiter(this, void 0, void 0, function* () {
      while (true) {
        yield this._sendBufferedData.promise;
        if (!this._executing) {
          if (this._transportResult) {
            this._transportResult.reject("Connection stopped.");
          }
          break;
        }
        this._sendBufferedData = new PromiseSource();
        const transportResult = this._transportResult;
        this._transportResult = void 0;
        const data = typeof this._buffer[0] === "string" ? this._buffer.join("") : TransportSendQueue._concatBuffers(this._buffer);
        this._buffer.length = 0;
        try {
          yield this._transport.send(data);
          transportResult.resolve();
        } catch (error) {
          transportResult.reject(error);
        }
      }
    });
  }
  static _concatBuffers(arrayBuffers) {
    const totalLength = arrayBuffers.map((b) => b.byteLength).reduce((a, b) => a + b);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const item of arrayBuffers) {
      result.set(new Uint8Array(item), offset);
      offset += item.byteLength;
    }
    return result.buffer;
  }
}
class PromiseSource {
  constructor() {
    this.promise = new Promise((resolve, reject) => [this._resolver, this._rejecter] = [resolve, reject]);
  }
  resolve() {
    this._resolver();
  }
  reject(reason) {
    this._rejecter(reason);
  }
}
exports.HttpConnection = HttpConnection;
