"use strict";
const common_vendor = require("./vendor.js");
const common_weappCookie = require("./weapp-cookie.js");
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.signalR = {}));
})(globalThis, function(exports2) {
  class HttpError extends Error {
    /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
     *
     * @param {string} errorMessage A descriptive error message.
     * @param {number} statusCode The HTTP status code represented by this error.
     */
    constructor(errorMessage, statusCode) {
      const trueProto = new.target.prototype;
      super(`${errorMessage}: Status code '${statusCode}'`);
      this.statusCode = statusCode;
      this.__proto__ = trueProto;
    }
  }
  class TimeoutError extends Error {
    /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    constructor(errorMessage = "A timeout occurred.") {
      const trueProto = new.target.prototype;
      super(errorMessage);
      this.__proto__ = trueProto;
    }
  }
  class AbortError extends Error {
    /** Constructs a new instance of {@link AbortError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    constructor(errorMessage = "An abort occurred.") {
      const trueProto = new.target.prototype;
      super(errorMessage);
      this.__proto__ = trueProto;
    }
  }
  class UnsupportedTransportError extends Error {
    /** Constructs a new instance of {@link @microsoft/signalr.UnsupportedTransportError}.
     *
     * @param {string} message A descriptive error message.
     * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
     */
    constructor(message, transport) {
      const trueProto = new.target.prototype;
      super(message);
      this.transport = transport;
      this.errorType = "UnsupportedTransportError";
      this.__proto__ = trueProto;
    }
  }
  class DisabledTransportError extends Error {
    /** Constructs a new instance of {@link @microsoft/signalr.DisabledTransportError}.
     *
     * @param {string} message A descriptive error message.
     * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
     */
    constructor(message, transport) {
      const trueProto = new.target.prototype;
      super(message);
      this.transport = transport;
      this.errorType = "DisabledTransportError";
      this.__proto__ = trueProto;
    }
  }
  class FailedToStartTransportError extends Error {
    /** Constructs a new instance of {@link @microsoft/signalr.FailedToStartTransportError}.
     *
     * @param {string} message A descriptive error message.
     * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
     */
    constructor(message, transport) {
      const trueProto = new.target.prototype;
      super(message);
      this.transport = transport;
      this.errorType = "FailedToStartTransportError";
      this.__proto__ = trueProto;
    }
  }
  class FailedToNegotiateWithServerError extends Error {
    /** Constructs a new instance of {@link @microsoft/signalr.FailedToNegotiateWithServerError}.
     *
     * @param {string} message A descriptive error message.
     */
    constructor(message) {
      const trueProto = new.target.prototype;
      super(message);
      this.errorType = "FailedToNegotiateWithServerError";
      this.__proto__ = trueProto;
    }
  }
  class AggregateErrors extends Error {
    /** Constructs a new instance of {@link @microsoft/signalr.AggregateErrors}.
     *
     * @param {string} message A descriptive error message.
     * @param {Error[]} innerErrors The collection of errors this error is aggregating.
     */
    constructor(message, innerErrors) {
      const trueProto = new.target.prototype;
      super(message);
      this.innerErrors = innerErrors;
      this.__proto__ = trueProto;
    }
  }
  class HttpResponse {
    constructor(statusCode, statusText, content) {
      this.statusCode = statusCode;
      this.statusText = statusText;
      this.content = content;
    }
  }
  class HttpClient {
    get(url, options) {
      return this.send({
        ...options,
        method: "GET",
        url
      });
    }
    post(url, options) {
      return this.send({
        ...options,
        method: "POST",
        url
      });
    }
    delete(url, options) {
      return this.send({
        ...options,
        method: "DELETE",
        url
      });
    }
    /** Gets all cookies that apply to the specified URL.
     *
     * @param url The URL that the cookies are valid for.
     * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
     */
    // @ts-ignore
    getCookieString(url) {
      return "";
    }
  }
  exports2.LogLevel = void 0;
  (function(LogLevel) {
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    LogLevel[LogLevel["Information"] = 2] = "Information";
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    LogLevel[LogLevel["Error"] = 4] = "Error";
    LogLevel[LogLevel["Critical"] = 5] = "Critical";
    LogLevel[LogLevel["None"] = 6] = "None";
  })(exports2.LogLevel || (exports2.LogLevel = {}));
  class NullLogger {
    constructor() {
    }
    /** @inheritDoc */
    // eslint-disable-next-line
    log(_logLevel, _message) {
    }
  }
  NullLogger.instance = new NullLogger();
  const VERSION = "0.0.0-DEV_BUILD";
  class Arg {
    static isRequired(val, name) {
      if (val === null || val === void 0) {
        throw new Error(`The '${name}' argument is required.`);
      }
    }
    static isNotEmpty(val, name) {
      if (!val || val.match(/^\s*$/)) {
        throw new Error(`The '${name}' argument should not be empty.`);
      }
    }
    static isIn(val, values, name) {
      if (!(val in values)) {
        throw new Error(`Unknown ${name} value: ${val}.`);
      }
    }
  }
  class Platform {
    // react-native has a window but no document so we should check both
    static get isBrowser() {
      return !Platform.isNode && typeof window === "object" && typeof window.document === "object";
    }
    // WebWorkers don't have a window object so the isBrowser check would fail
    static get isWebWorker() {
      return !Platform.isNode && typeof self === "object" && "importScripts" in self;
    }
    // react-native has a window but no document
    static get isReactNative() {
      return !Platform.isNode && typeof window === "object" && typeof window.document === "undefined";
    }
    // Node apps shouldn't have a window object, but WebWorkers don't either
    // so we need to check for both WebWorker and window
    static get isNode() {
      return typeof process !== "undefined" && process.release && process.release.name === "node";
    }
  }
  function getDataDetail(data, includeContent) {
    let detail = "";
    if (isArrayBuffer(data)) {
      detail = `Binary data of length ${data.byteLength}`;
      if (includeContent) {
        detail += `. Content: '${formatArrayBuffer(data)}'`;
      }
    } else if (typeof data === "string") {
      detail = `String data of length ${data.length}`;
      if (includeContent) {
        detail += `. Content: '${data}'`;
      }
    }
    return detail;
  }
  function formatArrayBuffer(data) {
    const view = new Uint8Array(data);
    let str = "";
    view.forEach((num) => {
      const pad = num < 16 ? "0" : "";
      str += `0x${pad}${num.toString(16)} `;
    });
    return str.substr(0, str.length - 1);
  }
  function isArrayBuffer(val) {
    return val && typeof ArrayBuffer !== "undefined" && (val instanceof ArrayBuffer || // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
    val.constructor && val.constructor.name === "ArrayBuffer");
  }
  async function sendMessage(logger, transportName, httpClient, url, content, options) {
    const headers = {};
    const [name, value] = getUserAgentHeader();
    headers[name] = value;
    logger.log(exports2.LogLevel.Trace, `(${transportName} transport) sending data. ${getDataDetail(content, options.logMessageContent)}.`);
    const responseType = isArrayBuffer(content) ? "arraybuffer" : "text";
    const response = await httpClient.post(url, {
      content,
      headers: { ...headers, ...options.headers },
      responseType,
      timeout: options.timeout,
      withCredentials: options.withCredentials
    });
    logger.log(exports2.LogLevel.Trace, `(${transportName} transport) request complete. Response status: ${response.statusCode}.`);
  }
  function createLogger(logger) {
    if (logger === void 0) {
      return new ConsoleLogger(exports2.LogLevel.Information);
    }
    if (logger === null) {
      return NullLogger.instance;
    }
    if (logger.log !== void 0) {
      return logger;
    }
    return new ConsoleLogger(logger);
  }
  class SubjectSubscription {
    constructor(subject, observer) {
      this._subject = subject;
      this._observer = observer;
    }
    dispose() {
      const index = this._subject.observers.indexOf(this._observer);
      if (index > -1) {
        this._subject.observers.splice(index, 1);
      }
      if (this._subject.observers.length === 0 && this._subject.cancelCallback) {
        this._subject.cancelCallback().catch((_) => {
        });
      }
    }
  }
  class ConsoleLogger {
    constructor(minimumLogLevel) {
      this._minLevel = minimumLogLevel;
      this.out = console;
    }
    log(logLevel, message) {
      if (logLevel >= this._minLevel) {
        const msg = `[${(/* @__PURE__ */ new Date()).toISOString()}] ${exports2.LogLevel[logLevel]}: ${message}`;
        switch (logLevel) {
          case exports2.LogLevel.Critical:
          case exports2.LogLevel.Error:
            this.out.error(msg);
            break;
          case exports2.LogLevel.Warning:
            this.out.warn(msg);
            break;
          case exports2.LogLevel.Information:
            this.out.info(msg);
            break;
          default:
            this.out.log(msg);
            break;
        }
      }
    }
  }
  function getUserAgentHeader() {
    let userAgentHeaderName = "X-SignalR-User-Agent";
    if (Platform.isNode) {
      userAgentHeaderName = "User-Agent";
    }
    return [userAgentHeaderName, constructUserAgent(VERSION, getOsName(), getRuntime(), getRuntimeVersion())];
  }
  function constructUserAgent(version, os, runtime, runtimeVersion) {
    let userAgent = "Microsoft SignalR/";
    const majorAndMinor = version.split(".");
    userAgent += `${majorAndMinor[0]}.${majorAndMinor[1]}`;
    userAgent += ` (${version}; `;
    if (os && os !== "") {
      userAgent += `${os}; `;
    } else {
      userAgent += "Unknown OS; ";
    }
    userAgent += `${runtime}`;
    if (runtimeVersion) {
      userAgent += `; ${runtimeVersion}`;
    } else {
      userAgent += "; Unknown Runtime Version";
    }
    userAgent += ")";
    return userAgent;
  }
  function getOsName() {
    if (Platform.isNode) {
      switch (process.platform) {
        case "win32":
          return "Windows NT";
        case "darwin":
          return "macOS";
        case "linux":
          return "Linux";
        default:
          return process.platform;
      }
    } else {
      return "";
    }
  }
  function getRuntimeVersion() {
    if (Platform.isNode) {
      return process.versions.node;
    }
    return void 0;
  }
  function getRuntime() {
    if (Platform.isNode) {
      return "NodeJS";
    } else {
      return "Browser";
    }
  }
  function getErrorString(e) {
    if (e.stack) {
      return e.stack;
    } else if (e.message) {
      return e.message;
    }
    return `${e}`;
  }
  class UniHttpClient extends HttpClient {
    constructor(logger) {
      super();
      this._logger = logger;
    }
    /** @inheritDoc */
    send(request) {
      if (request.abortSignal && request.abortSignal.aborted) {
        return Promise.reject(new AbortError());
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
        if (isArrayBuffer(request.content)) {
          request.headers["Content-Type"] = "application/octet-stream";
        } else {
          request.headers["Content-Type"] = "text/plain;charset=UTF-8";
        }
      }
      let options = request;
      options.dataType = "text";
      return new Promise((resolve, reject) => {
        options.success = (response) => {
          console.log("success HttpResponse", response);
          let res = new HttpResponse(response.statusCode, response.errMsg, response.data);
          resolve(res);
        };
        options.fail = (response) => {
          console.log("fail HttpResponse", response);
          reject(new Error(response == null ? void 0 : response.errMsg));
        };
        common_vendor.index.requestWithCookie(options);
      });
    }
  }
  class XhrHttpClient extends HttpClient {
    constructor(logger) {
      super();
      this._logger = logger;
    }
    /** @inheritDoc */
    send(request) {
      if (request.abortSignal && request.abortSignal.aborted) {
        return Promise.reject(new AbortError());
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
        xhr.withCredentials = false;
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        if (request.content === "") {
          request.content = void 0;
        }
        if (request.content) {
          if (isArrayBuffer(request.content)) {
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
            reject(new AbortError());
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
            resolve(new HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
          } else {
            reject(new HttpError(xhr.response || xhr.responseText || xhr.statusText, xhr.status));
          }
        };
        xhr.onerror = () => {
          this._logger.log(exports2.LogLevel.Warning, `Error from HTTP request. ${xhr.status}: ${xhr.statusText}.`);
          reject(new HttpError(xhr.statusText, xhr.status));
        };
        xhr.ontimeout = () => {
          this._logger.log(exports2.LogLevel.Warning, `Timeout from HTTP request.`);
          reject(new TimeoutError());
        };
        xhr.send(request.content);
      });
    }
  }
  class DefaultHttpClient extends HttpClient {
    /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
    constructor(logger) {
      super();
      if (typeof common_vendor.wx$1 !== "undefined") {
        this._httpClient = new UniHttpClient(logger);
      } else if (typeof XMLHttpRequest !== "undefined") {
        this._httpClient = new XhrHttpClient(logger);
      } else {
        throw new Error("No usable HttpClient found.");
      }
    }
    /** @inheritDoc */
    send(request) {
      if (request.abortSignal && request.abortSignal.aborted) {
        return Promise.reject(new AbortError());
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
  class TextMessageFormat {
    static write(output) {
      return `${output}${TextMessageFormat.RecordSeparator}`;
    }
    static parse(input) {
      if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
        throw new Error("Message is incomplete.");
      }
      const messages = input.split(TextMessageFormat.RecordSeparator);
      messages.pop();
      return messages;
    }
  }
  TextMessageFormat.RecordSeparatorCode = 30;
  TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);
  class HandshakeProtocol {
    // Handshake request is always JSON
    writeHandshakeRequest(handshakeRequest) {
      return TextMessageFormat.write(JSON.stringify(handshakeRequest));
    }
    parseHandshakeResponse(data) {
      let messageData;
      let remainingData;
      if (isArrayBuffer(data)) {
        const binaryData = new Uint8Array(data);
        const separatorIndex = binaryData.indexOf(TextMessageFormat.RecordSeparatorCode);
        if (separatorIndex === -1) {
          throw new Error("Message is incomplete.");
        }
        const responseLength = separatorIndex + 1;
        messageData = String.fromCharCode.apply(null, Array.prototype.slice.call(binaryData.slice(0, responseLength)));
        remainingData = binaryData.byteLength > responseLength ? binaryData.slice(responseLength).buffer : null;
      } else {
        const textData = data;
        const separatorIndex = textData.indexOf(TextMessageFormat.RecordSeparator);
        if (separatorIndex === -1) {
          throw new Error("Message is incomplete.");
        }
        const responseLength = separatorIndex + 1;
        messageData = textData.substring(0, responseLength);
        remainingData = textData.length > responseLength ? textData.substring(responseLength) : null;
      }
      const messages = TextMessageFormat.parse(messageData);
      const response = JSON.parse(messages[0]);
      if (response.type) {
        throw new Error("Expected a handshake response from the server.");
      }
      const responseMessage = response;
      return [remainingData, responseMessage];
    }
  }
  exports2.MessageType = void 0;
  (function(MessageType) {
    MessageType[MessageType["Invocation"] = 1] = "Invocation";
    MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
    MessageType[MessageType["Completion"] = 3] = "Completion";
    MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
    MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
    MessageType[MessageType["Ping"] = 6] = "Ping";
    MessageType[MessageType["Close"] = 7] = "Close";
  })(exports2.MessageType || (exports2.MessageType = {}));
  class Subject {
    constructor() {
      this.observers = [];
    }
    next(item) {
      for (const observer of this.observers) {
        observer.next(item);
      }
    }
    error(err) {
      for (const observer of this.observers) {
        if (observer.error) {
          observer.error(err);
        }
      }
    }
    complete() {
      for (const observer of this.observers) {
        if (observer.complete) {
          observer.complete();
        }
      }
    }
    subscribe(observer) {
      this.observers.push(observer);
      return new SubjectSubscription(this, observer);
    }
  }
  const DEFAULT_TIMEOUT_IN_MS = 60 * 1e3;
  const DEFAULT_PING_INTERVAL_IN_MS = 45 * 1e3;
  exports2.HubConnectionState = void 0;
  (function(HubConnectionState) {
    HubConnectionState["Disconnected"] = "Disconnected";
    HubConnectionState["Connecting"] = "Connecting";
    HubConnectionState["Connected"] = "Connected";
    HubConnectionState["Disconnecting"] = "Disconnecting";
    HubConnectionState["Reconnecting"] = "Reconnecting";
  })(exports2.HubConnectionState || (exports2.HubConnectionState = {}));
  class HubConnection {
    /** @internal */
    // Using a public static factory method means we can have a private constructor and an _internal_
    // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
    // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
    // public parameter-less constructor.
    static create(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds) {
      return new HubConnection(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds);
    }
    constructor(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds) {
      this._nextKeepAlive = 0;
      this._freezeEventListener = () => {
        this._logger.log(exports2.LogLevel.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
      };
      Arg.isRequired(connection, "connection");
      Arg.isRequired(logger, "logger");
      Arg.isRequired(protocol, "protocol");
      this.serverTimeoutInMilliseconds = serverTimeoutInMilliseconds ?? DEFAULT_TIMEOUT_IN_MS;
      this.keepAliveIntervalInMilliseconds = keepAliveIntervalInMilliseconds ?? DEFAULT_PING_INTERVAL_IN_MS;
      this._logger = logger;
      this._protocol = protocol;
      this.connection = connection;
      this._reconnectPolicy = reconnectPolicy;
      this._handshakeProtocol = new HandshakeProtocol();
      this.connection.onreceive = (data) => this._processIncomingData(data);
      this.connection.onclose = (error) => this._connectionClosed(error);
      this._callbacks = {};
      this._methods = {};
      this._closedCallbacks = [];
      this._reconnectingCallbacks = [];
      this._reconnectedCallbacks = [];
      this._invocationId = 0;
      this._receivedHandshakeResponse = false;
      this._connectionState = exports2.HubConnectionState.Disconnected;
      this._connectionStarted = false;
      this._cachedPingMessage = this._protocol.writeMessage({ type: exports2.MessageType.Ping });
    }
    /** Indicates the state of the {@link HubConnection} to the server. */
    get state() {
      return this._connectionState;
    }
    /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
     *  in the disconnected state or if the negotiation step was skipped.
     */
    get connectionId() {
      return this.connection ? this.connection.connectionId || null : null;
    }
    /** Indicates the url of the {@link HubConnection} to the server. */
    get baseUrl() {
      return this.connection.baseUrl || "";
    }
    /**
     * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
     * Reconnecting states.
     * @param {string} url The url to connect to.
     */
    set baseUrl(url) {
      if (this._connectionState !== exports2.HubConnectionState.Disconnected && this._connectionState !== exports2.HubConnectionState.Reconnecting) {
        throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
      }
      if (!url) {
        throw new Error("The HubConnection url must be a valid url.");
      }
      this.connection.baseUrl = url;
    }
    /** Starts the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
     */
    start() {
      this._startPromise = this._startWithStateTransitions();
      return this._startPromise;
    }
    async _startWithStateTransitions() {
      if (this._connectionState !== exports2.HubConnectionState.Disconnected) {
        return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));
      }
      this._connectionState = exports2.HubConnectionState.Connecting;
      this._logger.log(exports2.LogLevel.Debug, "Starting HubConnection.");
      try {
        await this._startInternal();
        if (Platform.isBrowser) {
          window.document.addEventListener("freeze", this._freezeEventListener);
        }
        this._connectionState = exports2.HubConnectionState.Connected;
        this._connectionStarted = true;
        this._logger.log(exports2.LogLevel.Debug, "HubConnection connected successfully.");
      } catch (e) {
        this._connectionState = exports2.HubConnectionState.Disconnected;
        this._logger.log(exports2.LogLevel.Debug, `HubConnection failed to start successfully because of error '${e}'.`);
        return Promise.reject(e);
      }
    }
    async _startInternal() {
      this._stopDuringStartError = void 0;
      this._receivedHandshakeResponse = false;
      const handshakePromise = new Promise((resolve, reject) => {
        this._handshakeResolver = resolve;
        this._handshakeRejecter = reject;
      });
      await this.connection.start(this._protocol.transferFormat);
      try {
        const handshakeRequest = {
          protocol: this._protocol.name,
          version: this._protocol.version
        };
        this._logger.log(exports2.LogLevel.Debug, "Sending handshake request.");
        await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(handshakeRequest));
        this._logger.log(exports2.LogLevel.Information, `Using HubProtocol '${this._protocol.name}'.`);
        this._cleanupTimeout();
        this._resetTimeoutPeriod();
        this._resetKeepAliveInterval();
        await handshakePromise;
        if (this._stopDuringStartError) {
          throw this._stopDuringStartError;
        }
        if (!this.connection.features.inherentKeepAlive) {
          await this._sendMessage(this._cachedPingMessage);
        }
      } catch (e) {
        this._logger.log(exports2.LogLevel.Debug, `Hub handshake failed with error '${e}' during start(). Stopping HubConnection.`);
        this._cleanupTimeout();
        this._cleanupPingTimer();
        await this.connection.stop(e);
        throw e;
      }
    }
    /** Stops the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
     */
    async stop() {
      const startPromise = this._startPromise;
      this._stopPromise = this._stopInternal();
      await this._stopPromise;
      try {
        await startPromise;
      } catch (e) {
      }
    }
    _stopInternal(error) {
      if (this._connectionState === exports2.HubConnectionState.Disconnected) {
        this._logger.log(exports2.LogLevel.Debug, `Call to HubConnection.stop(${error}) ignored because it is already in the disconnected state.`);
        return Promise.resolve();
      }
      if (this._connectionState === exports2.HubConnectionState.Disconnecting) {
        this._logger.log(exports2.LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnecting state.`);
        return this._stopPromise;
      }
      const state = this._connectionState;
      this._connectionState = exports2.HubConnectionState.Disconnecting;
      this._logger.log(exports2.LogLevel.Debug, "Stopping HubConnection.");
      if (this._reconnectDelayHandle) {
        this._logger.log(exports2.LogLevel.Debug, "Connection stopped during reconnect delay. Done reconnecting.");
        clearTimeout(this._reconnectDelayHandle);
        this._reconnectDelayHandle = void 0;
        this._completeClose();
        return Promise.resolve();
      }
      if (state === exports2.HubConnectionState.Connected) {
        this._sendCloseMessage();
      }
      this._cleanupTimeout();
      this._cleanupPingTimer();
      this._stopDuringStartError = error || new AbortError("The connection was stopped before the hub handshake could complete.");
      return this.connection.stop(error);
    }
    async _sendCloseMessage() {
      try {
        await this._sendWithProtocol(this._createCloseMessage());
      } catch {
      }
    }
    /** Invokes a streaming hub method on the server using the specified name and arguments.
     *
     * @typeparam T The type of the items returned by the server.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
     */
    stream(methodName, ...args) {
      const [streams, streamIds] = this._replaceStreamingParams(args);
      const invocationDescriptor = this._createStreamInvocation(methodName, args, streamIds);
      let promiseQueue;
      const subject = new Subject();
      subject.cancelCallback = () => {
        const cancelInvocation = this._createCancelInvocation(invocationDescriptor.invocationId);
        delete this._callbacks[invocationDescriptor.invocationId];
        return promiseQueue.then(() => {
          return this._sendWithProtocol(cancelInvocation);
        });
      };
      this._callbacks[invocationDescriptor.invocationId] = (invocationEvent, error) => {
        if (error) {
          subject.error(error);
          return;
        } else if (invocationEvent) {
          if (invocationEvent.type === exports2.MessageType.Completion) {
            if (invocationEvent.error) {
              subject.error(new Error(invocationEvent.error));
            } else {
              subject.complete();
            }
          } else {
            subject.next(invocationEvent.item);
          }
        }
      };
      promiseQueue = this._sendWithProtocol(invocationDescriptor).catch((e) => {
        subject.error(e);
        delete this._callbacks[invocationDescriptor.invocationId];
      });
      this._launchStreams(streams, promiseQueue);
      return subject;
    }
    _sendMessage(message) {
      this._resetKeepAliveInterval();
      return this.connection.send(message);
    }
    /**
     * Sends a js object to the server.
     * @param message The js object to serialize and send.
     */
    _sendWithProtocol(message) {
      return this._sendMessage(this._protocol.writeMessage(message));
    }
    /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
     *
     * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
     * be processing the invocation.
     *
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
     */
    send(methodName, ...args) {
      const [streams, streamIds] = this._replaceStreamingParams(args);
      const sendPromise = this._sendWithProtocol(this._createInvocation(methodName, args, true, streamIds));
      this._launchStreams(streams, sendPromise);
      return sendPromise;
    }
    /** Invokes a hub method on the server using the specified name and arguments.
     *
     * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
     * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
     * resolving the Promise.
     *
     * @typeparam T The expected return type.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
     */
    invoke(methodName, ...args) {
      const [streams, streamIds] = this._replaceStreamingParams(args);
      const invocationDescriptor = this._createInvocation(methodName, args, false, streamIds);
      const p = new Promise((resolve, reject) => {
        this._callbacks[invocationDescriptor.invocationId] = (invocationEvent, error) => {
          if (error) {
            reject(error);
            return;
          } else if (invocationEvent) {
            if (invocationEvent.type === exports2.MessageType.Completion) {
              if (invocationEvent.error) {
                reject(new Error(invocationEvent.error));
              } else {
                resolve(invocationEvent.result);
              }
            } else {
              reject(new Error(`Unexpected message type: ${invocationEvent.type}`));
            }
          }
        };
        const promiseQueue = this._sendWithProtocol(invocationDescriptor).catch((e) => {
          reject(e);
          delete this._callbacks[invocationDescriptor.invocationId];
        });
        this._launchStreams(streams, promiseQueue);
      });
      this._timeoutHandle = setTimeout(() => {
        p.catch((e) => {
          if (this._connectionState === exports2.HubConnectionState.Disconnected || this._connectionState === exports2.HubConnectionState.Disconnecting) {
            this._reconnect(new Error(e || "server not connected"));
          }
        });
      }, 5e3);
      return p;
    }
    on(methodName, newMethod) {
      if (!methodName || !newMethod) {
        return;
      }
      methodName = methodName.toLowerCase();
      if (!this._methods[methodName]) {
        this._methods[methodName] = [];
      }
      if (this._methods[methodName].indexOf(newMethod) !== -1) {
        return;
      }
      this._methods[methodName].push(newMethod);
    }
    off(methodName, method) {
      if (!methodName) {
        return;
      }
      methodName = methodName.toLowerCase();
      const handlers = this._methods[methodName];
      if (!handlers) {
        return;
      }
      if (method) {
        const removeIdx = handlers.indexOf(method);
        if (removeIdx !== -1) {
          handlers.splice(removeIdx, 1);
          if (handlers.length === 0) {
            delete this._methods[methodName];
          }
        }
      } else {
        delete this._methods[methodName];
      }
    }
    /** Registers a handler that will be invoked when the connection is closed.
     *
     * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
     */
    onclose(callback) {
      if (callback) {
        this._closedCallbacks.push(callback);
      }
    }
    /** Registers a handler that will be invoked when the connection starts reconnecting.
     *
     * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
     */
    onreconnecting(callback) {
      if (callback) {
        this._reconnectingCallbacks.push(callback);
      }
    }
    /** Registers a handler that will be invoked when the connection successfully reconnects.
     *
     * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
     */
    onreconnected(callback) {
      if (callback) {
        this._reconnectedCallbacks.push(callback);
      }
    }
    _processIncomingData(data) {
      this._cleanupTimeout();
      if (!this._receivedHandshakeResponse) {
        data = this._processHandshakeResponse(data);
        this._receivedHandshakeResponse = true;
      }
      if (data) {
        const messages = this._protocol.parseMessages(data, this._logger);
        for (const message of messages) {
          switch (message.type) {
            case exports2.MessageType.Invocation:
              this._invokeClientMethod(message);
              break;
            case exports2.MessageType.StreamItem:
            case exports2.MessageType.Completion: {
              const callback = this._callbacks[message.invocationId];
              if (callback) {
                if (message.type === exports2.MessageType.Completion) {
                  delete this._callbacks[message.invocationId];
                }
                try {
                  callback(message);
                } catch (e) {
                  this._logger.log(exports2.LogLevel.Error, `Stream callback threw error: ${getErrorString(e)}`);
                }
              }
              break;
            }
            case exports2.MessageType.Ping:
              break;
            case exports2.MessageType.Close: {
              this._logger.log(exports2.LogLevel.Information, "Close message received from server.");
              const error = message.error ? new Error("Server returned an error on close: " + message.error) : void 0;
              if (message.allowReconnect === true) {
                this.connection.stop(error);
              } else {
                this._stopPromise = this._stopInternal(error);
              }
              break;
            }
            default:
              this._logger.log(exports2.LogLevel.Warning, `Invalid message type: ${message.type}.`);
              break;
          }
        }
      }
      this._resetTimeoutPeriod();
    }
    _processHandshakeResponse(data) {
      let responseMessage;
      let remainingData;
      try {
        [remainingData, responseMessage] = this._handshakeProtocol.parseHandshakeResponse(data);
      } catch (e) {
        const message = "Error parsing handshake response: " + e;
        this._logger.log(exports2.LogLevel.Error, message);
        const error = new Error(message);
        this._handshakeRejecter(error);
        throw error;
      }
      if (responseMessage.error) {
        const message = "Server returned handshake error: " + responseMessage.error;
        this._logger.log(exports2.LogLevel.Error, message);
        const error = new Error(message);
        this._handshakeRejecter(error);
        throw error;
      } else {
        this._logger.log(exports2.LogLevel.Debug, "Server handshake complete.");
      }
      this._handshakeResolver();
      return remainingData;
    }
    _resetKeepAliveInterval() {
      if (this.connection.features.inherentKeepAlive) {
        return;
      }
      this._nextKeepAlive = (/* @__PURE__ */ new Date()).getTime() + this.keepAliveIntervalInMilliseconds;
      this._cleanupPingTimer();
    }
    _resetTimeoutPeriod() {
      if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
        this._timeoutHandle = setTimeout(() => this.serverTimeout(), this.serverTimeoutInMilliseconds);
        if (this._pingServerHandle === void 0) {
          let nextPing = this._nextKeepAlive - (/* @__PURE__ */ new Date()).getTime();
          if (nextPing < 0) {
            nextPing = 0;
          }
          this._pingServerHandle = setTimeout(async () => {
            if (this._connectionState === exports2.HubConnectionState.Connected) {
              try {
                await this._sendMessage(this._cachedPingMessage);
              } catch {
                this._cleanupPingTimer();
              }
            }
          }, nextPing);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    serverTimeout() {
      this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
    }
    async _invokeClientMethod(invocationMessage) {
      const methodName = invocationMessage.target.toLowerCase();
      const methods = this._methods[methodName];
      if (!methods) {
        this._logger.log(exports2.LogLevel.Warning, `No client method with the name '${methodName}' found.`);
        if (invocationMessage.invocationId) {
          this._logger.log(exports2.LogLevel.Warning, `No result given for '${methodName}' method and invocation ID '${invocationMessage.invocationId}'.`);
          await this._sendWithProtocol(this._createCompletionMessage(invocationMessage.invocationId, "Client didn't provide a result.", null));
        }
        return;
      }
      const methodsCopy = methods.slice();
      const expectsResponse = invocationMessage.invocationId ? true : false;
      let res;
      let exception;
      let completionMessage;
      for (const m of methodsCopy) {
        try {
          const prevRes = res;
          res = await m.apply(this, invocationMessage.arguments);
          if (expectsResponse && res && prevRes) {
            this._logger.log(exports2.LogLevel.Error, `Multiple results provided for '${methodName}'. Sending error to server.`);
            completionMessage = this._createCompletionMessage(invocationMessage.invocationId, `Client provided multiple results.`, null);
          }
          exception = void 0;
        } catch (e) {
          exception = e;
          this._logger.log(exports2.LogLevel.Error, `A callback for the method '${methodName}' threw error '${e}'.`);
        }
      }
      if (completionMessage) {
        await this._sendWithProtocol(completionMessage);
      } else if (expectsResponse) {
        if (exception) {
          completionMessage = this._createCompletionMessage(invocationMessage.invocationId, `${exception}`, null);
        } else if (res !== void 0) {
          completionMessage = this._createCompletionMessage(invocationMessage.invocationId, null, res);
        } else {
          this._logger.log(exports2.LogLevel.Warning, `No result given for '${methodName}' method and invocation ID '${invocationMessage.invocationId}'.`);
          completionMessage = this._createCompletionMessage(invocationMessage.invocationId, "Client didn't provide a result.", null);
        }
        await this._sendWithProtocol(completionMessage);
      } else {
        if (res) {
          this._logger.log(exports2.LogLevel.Error, `Result given for '${methodName}' method but server is not expecting a result.`);
        }
      }
    }
    _connectionClosed(error) {
      this._logger.log(exports2.LogLevel.Debug, `HubConnection.connectionClosed(${error}) called while in state ${this._connectionState}.`);
      this._stopDuringStartError = this._stopDuringStartError || error || new AbortError("The underlying connection was closed before the hub handshake could complete.");
      if (this._handshakeResolver) {
        this._handshakeResolver();
      }
      this._cancelCallbacksWithError(error || new Error("Invocation canceled due to the underlying connection being closed."));
      this._cleanupTimeout();
      this._cleanupPingTimer();
      if (this._connectionState === exports2.HubConnectionState.Disconnecting) {
        this._completeClose(error);
      } else if (this._connectionState === exports2.HubConnectionState.Connected && this._reconnectPolicy) {
        this._reconnect(error);
      } else if (this._connectionState === exports2.HubConnectionState.Connected) {
        this._completeClose(error);
      }
    }
    _completeClose(error) {
      if (this._connectionStarted) {
        this._connectionState = exports2.HubConnectionState.Disconnected;
        this._connectionStarted = false;
        if (Platform.isBrowser) {
          window.document.removeEventListener("freeze", this._freezeEventListener);
        }
        try {
          this._closedCallbacks.forEach((c) => c.apply(this, [error]));
        } catch (e) {
          this._logger.log(exports2.LogLevel.Error, `An onclose callback called with error '${error}' threw error '${e}'.`);
        }
      }
    }
    async _reconnect(error) {
      const reconnectStartTime = Date.now();
      let previousReconnectAttempts = 0;
      let retryError = error !== void 0 ? error : new Error("Attempting to reconnect due to a unknown error.");
      let nextRetryDelay = this._getNextRetryDelay(previousReconnectAttempts++, 0, retryError);
      if (nextRetryDelay === null) {
        this._logger.log(exports2.LogLevel.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt.");
        this._completeClose(error);
        return;
      }
      this._connectionState = exports2.HubConnectionState.Reconnecting;
      if (error) {
        this._logger.log(exports2.LogLevel.Information, `Connection reconnecting because of error '${error}'.`);
      } else {
        this._logger.log(exports2.LogLevel.Information, "Connection reconnecting.");
      }
      if (this._reconnectingCallbacks.length !== 0) {
        try {
          this._reconnectingCallbacks.forEach((c) => c.apply(this, [error]));
        } catch (e) {
          this._logger.log(exports2.LogLevel.Error, `An onreconnecting callback called with error '${error}' threw error '${e}'.`);
        }
        if (this._connectionState !== exports2.HubConnectionState.Reconnecting) {
          this._logger.log(exports2.LogLevel.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
          return;
        }
      }
      while (nextRetryDelay !== null) {
        this._logger.log(exports2.LogLevel.Information, `Reconnect attempt number ${previousReconnectAttempts} will start in ${nextRetryDelay} ms.`);
        await new Promise((resolve) => {
          this._reconnectDelayHandle = setTimeout(resolve, nextRetryDelay);
        });
        this._reconnectDelayHandle = void 0;
        if (this._connectionState !== exports2.HubConnectionState.Reconnecting) {
          this._logger.log(exports2.LogLevel.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
          return;
        }
        try {
          await this._startInternal();
          this._connectionState = exports2.HubConnectionState.Connected;
          this._logger.log(exports2.LogLevel.Information, "HubConnection reconnected successfully.");
          if (this._reconnectedCallbacks.length !== 0) {
            try {
              this._reconnectedCallbacks.forEach((c) => c.apply(this, [this.connection.connectionId]));
            } catch (e) {
              this._logger.log(exports2.LogLevel.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${e}'.`);
            }
          }
          return;
        } catch (e) {
          this._logger.log(exports2.LogLevel.Information, `Reconnect attempt failed because of error '${e}'.`);
          if (this._connectionState !== exports2.HubConnectionState.Reconnecting) {
            this._logger.log(exports2.LogLevel.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`);
            if (this._connectionState === exports2.HubConnectionState.Disconnecting) {
              this._completeClose();
            }
            return;
          }
          retryError = e instanceof Error ? e : new Error(e.toString());
          nextRetryDelay = this._getNextRetryDelay(previousReconnectAttempts++, Date.now() - reconnectStartTime, retryError);
        }
      }
      this._logger.log(exports2.LogLevel.Information, `Reconnect retries have been exhausted after ${Date.now() - reconnectStartTime} ms and ${previousReconnectAttempts} failed attempts. Connection disconnecting.`);
      this._completeClose();
    }
    _getNextRetryDelay(previousRetryCount, elapsedMilliseconds, retryReason) {
      try {
        return this._reconnectPolicy.nextRetryDelayInMilliseconds({
          elapsedMilliseconds,
          previousRetryCount,
          retryReason
        });
      } catch (e) {
        this._logger.log(exports2.LogLevel.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${previousRetryCount}, ${elapsedMilliseconds}) threw error '${e}'.`);
        return null;
      }
    }
    _cancelCallbacksWithError(error) {
      const callbacks = this._callbacks;
      this._callbacks = {};
      Object.keys(callbacks).forEach((key) => {
        const callback = callbacks[key];
        try {
          callback(null, error);
        } catch (e) {
          this._logger.log(exports2.LogLevel.Error, `Stream 'error' callback called with '${error}' threw error: ${getErrorString(e)}`);
        }
      });
    }
    _cleanupPingTimer() {
      if (this._pingServerHandle) {
        clearTimeout(this._pingServerHandle);
        this._pingServerHandle = void 0;
      }
    }
    _cleanupTimeout() {
      if (this._timeoutHandle) {
        clearTimeout(this._timeoutHandle);
      }
    }
    _createInvocation(methodName, args, nonblocking, streamIds) {
      if (nonblocking) {
        if (streamIds.length !== 0) {
          return {
            arguments: args,
            streamIds,
            target: methodName,
            type: exports2.MessageType.Invocation
          };
        } else {
          return {
            arguments: args,
            target: methodName,
            type: exports2.MessageType.Invocation
          };
        }
      } else {
        const invocationId = this._invocationId;
        this._invocationId++;
        if (streamIds.length !== 0) {
          return {
            arguments: args,
            invocationId: invocationId.toString(),
            streamIds,
            target: methodName,
            type: exports2.MessageType.Invocation
          };
        } else {
          return {
            arguments: args,
            invocationId: invocationId.toString(),
            target: methodName,
            type: exports2.MessageType.Invocation
          };
        }
      }
    }
    _launchStreams(streams, promiseQueue) {
      if (streams.length === 0) {
        return;
      }
      if (!promiseQueue) {
        promiseQueue = Promise.resolve();
      }
      for (const streamId in streams) {
        streams[streamId].subscribe({
          complete: () => {
            promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createCompletionMessage(streamId)));
          },
          error: (err) => {
            let message;
            if (err instanceof Error) {
              message = err.message;
            } else if (err && err.toString) {
              message = err.toString();
            } else {
              message = "Unknown error";
            }
            promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createCompletionMessage(streamId, message)));
          },
          next: (item) => {
            promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createStreamItemMessage(streamId, item)));
          }
        });
      }
    }
    _replaceStreamingParams(args) {
      const streams = [];
      const streamIds = [];
      for (let i = 0; i < args.length; i++) {
        const argument = args[i];
        if (this._isObservable(argument)) {
          const streamId = this._invocationId;
          this._invocationId++;
          streams[streamId] = argument;
          streamIds.push(streamId.toString());
          args.splice(i, 1);
        }
      }
      return [streams, streamIds];
    }
    _isObservable(arg) {
      return arg && arg.subscribe && typeof arg.subscribe === "function";
    }
    _createStreamInvocation(methodName, args, streamIds) {
      const invocationId = this._invocationId;
      this._invocationId++;
      if (streamIds.length !== 0) {
        return {
          arguments: args,
          invocationId: invocationId.toString(),
          streamIds,
          target: methodName,
          type: exports2.MessageType.StreamInvocation
        };
      } else {
        return {
          arguments: args,
          invocationId: invocationId.toString(),
          target: methodName,
          type: exports2.MessageType.StreamInvocation
        };
      }
    }
    _createCancelInvocation(id) {
      return {
        invocationId: id,
        type: exports2.MessageType.CancelInvocation
      };
    }
    _createStreamItemMessage(id, item) {
      return {
        invocationId: id,
        item,
        type: exports2.MessageType.StreamItem
      };
    }
    _createCompletionMessage(id, error, result) {
      if (error) {
        return {
          error,
          invocationId: id,
          type: exports2.MessageType.Completion
        };
      }
      return {
        invocationId: id,
        result,
        type: exports2.MessageType.Completion
      };
    }
    _createCloseMessage() {
      return { type: exports2.MessageType.Close };
    }
  }
  const DEFAULT_RETRY_DELAYS_IN_MILLISECONDS = [0, 2e3, 1e4, 3e4, null];
  class DefaultReconnectPolicy {
    constructor(retryDelays) {
      this._retryDelays = retryDelays !== void 0 ? [...retryDelays, null] : DEFAULT_RETRY_DELAYS_IN_MILLISECONDS;
    }
    nextRetryDelayInMilliseconds(retryContext) {
      return this._retryDelays[retryContext.previousRetryCount];
    }
  }
  class HeaderNames {
  }
  HeaderNames.Authorization = "Authorization";
  HeaderNames.Cookie = "Cookie";
  class AccessTokenHttpClient extends HttpClient {
    constructor(innerClient, accessTokenFactory) {
      super();
      this._innerClient = innerClient;
      this._accessTokenFactory = accessTokenFactory;
    }
    async send(request) {
      let allowRetry = true;
      if (this._accessTokenFactory && (!this._accessToken || request.url && request.url.indexOf("/negotiate?") > 0)) {
        allowRetry = false;
        this._accessToken = await this._accessTokenFactory();
      }
      this._setAuthorizationHeader(request);
      const response = await this._innerClient.send(request);
      if (allowRetry && response.statusCode === 401 && this._accessTokenFactory) {
        this._accessToken = await this._accessTokenFactory();
        this._setAuthorizationHeader(request);
        return await this._innerClient.send(request);
      }
      return response;
    }
    _setAuthorizationHeader(request) {
      if (!request.headers) {
        request.headers = {};
      }
      if (this._accessToken) {
        request.headers[HeaderNames.Authorization] = `Bearer ${this._accessToken}`;
      } else if (this._accessTokenFactory) {
        if (request.headers[HeaderNames.Authorization]) {
          delete request.headers[HeaderNames.Authorization];
        }
      }
    }
    getCookieString(url) {
      return this._innerClient.getCookieString(url);
    }
  }
  exports2.HttpTransportType = void 0;
  (function(HttpTransportType) {
    HttpTransportType[HttpTransportType["None"] = 0] = "None";
    HttpTransportType[HttpTransportType["WebSockets"] = 1] = "WebSockets";
    HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
    HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
  })(exports2.HttpTransportType || (exports2.HttpTransportType = {}));
  exports2.TransferFormat = void 0;
  (function(TransferFormat) {
    TransferFormat[TransferFormat["Text"] = 1] = "Text";
    TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
  })(exports2.TransferFormat || (exports2.TransferFormat = {}));
  class AbortController {
    constructor() {
      this._isAborted = false;
      this.onabort = null;
    }
    abort() {
      if (!this._isAborted) {
        this._isAborted = true;
        if (this.onabort) {
          this.onabort();
        }
      }
    }
    get signal() {
      return this;
    }
    get aborted() {
      return this._isAborted;
    }
  }
  class LongPollingTransport {
    // This is an internal type, not exported from 'index' so this is really just internal.
    get pollAborted() {
      return this._pollAbort.aborted;
    }
    constructor(httpClient, logger, options) {
      this._httpClient = httpClient;
      this._logger = logger;
      this._pollAbort = new AbortController();
      this._options = options;
      this._running = false;
      this.onreceive = null;
      this.onclose = null;
    }
    async connect(url, transferFormat) {
      Arg.isRequired(url, "url");
      Arg.isRequired(transferFormat, "transferFormat");
      Arg.isIn(transferFormat, exports2.TransferFormat, "transferFormat");
      this._url = url;
      this._logger.log(exports2.LogLevel.Trace, "(LongPolling transport) Connecting.");
      if (transferFormat === exports2.TransferFormat.Binary && (typeof XMLHttpRequest !== "undefined" && typeof new XMLHttpRequest().responseType !== "string")) {
        throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
      }
      const [name, value] = getUserAgentHeader();
      const headers = { [name]: value, ...this._options.headers };
      const pollOptions = {
        abortSignal: this._pollAbort.signal,
        headers,
        timeout: 1e5,
        withCredentials: this._options.withCredentials
      };
      if (transferFormat === exports2.TransferFormat.Binary) {
        pollOptions.responseType = "arraybuffer";
      }
      const pollUrl = `${url}&_=${Date.now()}`;
      this._logger.log(exports2.LogLevel.Trace, `(LongPolling transport) polling: ${pollUrl}.`);
      const response = await this._httpClient.get(pollUrl, pollOptions);
      if (response.statusCode !== 200) {
        this._logger.log(exports2.LogLevel.Error, `(LongPolling transport) Unexpected response code: ${response.statusCode}.`);
        this._closeError = new HttpError(response.statusText || "", response.statusCode);
        this._running = false;
      } else {
        this._running = true;
      }
      this._receiving = this._poll(this._url, pollOptions);
    }
    async _poll(url, pollOptions) {
      try {
        while (this._running) {
          try {
            const pollUrl = `${url}&_=${Date.now()}`;
            this._logger.log(exports2.LogLevel.Trace, `(LongPolling transport) polling: ${pollUrl}.`);
            const response = await this._httpClient.get(pollUrl, pollOptions);
            if (response.statusCode === 204) {
              this._logger.log(exports2.LogLevel.Information, "(LongPolling transport) Poll terminated by server.");
              this._running = false;
            } else if (response.statusCode !== 200) {
              this._logger.log(exports2.LogLevel.Error, `(LongPolling transport) Unexpected response code: ${response.statusCode}.`);
              this._closeError = new HttpError(response.statusText || "", response.statusCode);
              this._running = false;
            } else {
              if (response.content) {
                this._logger.log(exports2.LogLevel.Trace, `(LongPolling transport) data received. ${getDataDetail(response.content, this._options.logMessageContent)}.`);
                if (this.onreceive) {
                  this.onreceive(response.content);
                }
              } else {
                this._logger.log(exports2.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
              }
            }
          } catch (e) {
            if (!this._running) {
              this._logger.log(exports2.LogLevel.Trace, `(LongPolling transport) Poll errored after shutdown: ${e.message}`);
            } else {
              if (e instanceof TimeoutError) {
                this._logger.log(exports2.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
              } else {
                this._closeError = e;
                this._running = false;
              }
            }
          }
        }
      } finally {
        this._logger.log(exports2.LogLevel.Trace, "(LongPolling transport) Polling complete.");
        if (!this.pollAborted) {
          this._raiseOnClose();
        }
      }
    }
    async send(data) {
      if (!this._running) {
        return Promise.reject(new Error("Cannot send until the transport is connected"));
      }
      return sendMessage(this._logger, "LongPolling", this._httpClient, this._url, data, this._options);
    }
    async stop() {
      this._logger.log(exports2.LogLevel.Trace, "(LongPolling transport) Stopping polling.");
      this._running = false;
      this._pollAbort.abort();
      try {
        await this._receiving;
        this._logger.log(exports2.LogLevel.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
        const headers = {};
        const [name, value] = getUserAgentHeader();
        headers[name] = value;
        const deleteOptions = {
          headers: { ...headers, ...this._options.headers },
          timeout: this._options.timeout,
          withCredentials: this._options.withCredentials
        };
        let error;
        try {
          await this._httpClient.delete(this._url, deleteOptions);
        } catch (err) {
          error = err;
        }
        if (error) {
          if (error instanceof HttpError) {
            if (error.statusCode === 404) {
              this._logger.log(exports2.LogLevel.Trace, "(LongPolling transport) A 404 response was returned from sending a DELETE request.");
            } else {
              this._logger.log(exports2.LogLevel.Trace, `(LongPolling transport) Error sending a DELETE request: ${error}`);
            }
          }
        } else {
          this._logger.log(exports2.LogLevel.Trace, "(LongPolling transport) DELETE request accepted.");
        }
      } finally {
        this._logger.log(exports2.LogLevel.Trace, "(LongPolling transport) Stop finished.");
        this._raiseOnClose();
      }
    }
    _raiseOnClose() {
      if (this.onclose) {
        let logMessage = "(LongPolling transport) Firing onclose event.";
        if (this._closeError) {
          logMessage += " Error: " + this._closeError;
        }
        this._logger.log(exports2.LogLevel.Trace, logMessage);
        this.onclose(this._closeError);
      }
    }
  }
  class ServerSentEventsTransport {
    constructor(httpClient, accessToken, logger, options) {
      this._httpClient = httpClient;
      this._accessToken = accessToken;
      this._logger = logger;
      this._options = options;
      this.onreceive = null;
      this.onclose = null;
    }
    async connect(url, transferFormat) {
      Arg.isRequired(url, "url");
      Arg.isRequired(transferFormat, "transferFormat");
      Arg.isIn(transferFormat, exports2.TransferFormat, "transferFormat");
      this._logger.log(exports2.LogLevel.Trace, "(SSE transport) Connecting.");
      let urlinfo = (url || "").split("/");
      let o = urlinfo[2].split(":")[0];
      let cookiequry = common_weappCookie.cookieManager.default.getRequestQueries(o, "/");
      url = url + "&" + cookiequry;
      this._url = url;
      if (this._accessToken) {
        url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`;
      }
      return new Promise((resolve, reject) => {
        let opened = false;
        if (transferFormat !== exports2.TransferFormat.Text) {
          reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
          return;
        }
        let eventSource;
        if (Platform.isBrowser || Platform.isWebWorker) {
          eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials });
        } else {
          const cookies = this._httpClient.getCookieString(url);
          const headers = {};
          headers.Cookie = cookies;
          const [name, value] = getUserAgentHeader();
          headers[name] = value;
          eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials, headers: { ...headers, ...this._options.headers } });
        }
        try {
          eventSource.onmessage = (e) => {
            if (this.onreceive) {
              try {
                this._logger.log(exports2.LogLevel.Trace, `(SSE transport) data received. ${getDataDetail(e.data, this._options.logMessageContent)}.`);
                this.onreceive(e.data);
              } catch (error) {
                this._close(error);
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
            this._logger.log(exports2.LogLevel.Information, `SSE connected to ${this._url}`);
            this._eventSource = eventSource;
            opened = true;
            resolve();
          };
        } catch (e) {
          reject(e);
          return;
        }
      });
    }
    async send(data) {
      if (!this._eventSource) {
        return Promise.reject(new Error("Cannot send until the transport is connected"));
      }
      return sendMessage(this._logger, "SSE", this._httpClient, this._url, data, this._options);
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
  class UniWebSocket {
    get readyState() {
      return this._socketTask.readyState;
    }
    constructor(url, protocols, socket) {
      this.CONNECTING = 0;
      this.OPEN = 1;
      this.CLOSING = 2;
      this.CLOSED = 3;
      this.onclose = null;
      this.onerror = null;
      this.onmessage = null;
      this.onopen = null;
      this._url = url;
      this._socketTask = socket;
    }
    url() {
      return this._url;
    }
    close(code, reason) {
      this._socketTask.close({ code, reason });
    }
    send(data) {
      this._socketTask.send({ data });
    }
  }
  class WebSocketTransport {
    constructor(httpClient, accessTokenFactory, logger, logMessageContent, webSocketConstructor, headers) {
      this._logger = logger;
      this._accessTokenFactory = accessTokenFactory;
      this._logMessageContent = logMessageContent;
      this._webSocketConstructor = webSocketConstructor;
      this._httpClient = httpClient;
      this.onreceive = null;
      this.onclose = null;
      this._headers = headers;
    }
    async connect(url, transferFormat) {
      Arg.isRequired(url, "url");
      Arg.isRequired(transferFormat, "transferFormat");
      Arg.isIn(transferFormat, exports2.TransferFormat, "transferFormat");
      this._logger.log(exports2.LogLevel.Trace, "(WebSockets transport) Connecting.");
      let token;
      if (this._accessTokenFactory) {
        token = await this._accessTokenFactory();
      }
      if (typeof common_vendor.wx$1 !== "undefined") {
        return new Promise((resolve, reject) => {
          let urlinfo = (url || "").split("/");
          let o = urlinfo[2].split(":")[0];
          let cookiequry = common_weappCookie.cookieManager.default.getRequestQueries(o, "/");
          url = url.replace(/^http/, "ws");
          url = url + "&" + cookiequry;
          let opened = false;
          let webSocket;
          let options = {
            header: { ...this._headers },
            method: "GET",
            complete: () => {
            }
          };
          options.url = url;
          console.log("SocketTask options:", options);
          webSocket = common_vendor.index.connectSocket(options);
          webSocket.onOpen((res) => {
            this._logger.log(exports2.LogLevel.Information, `SocketTask connected to ${url}.`);
            this._webSocket = new UniWebSocket(url, void 0, webSocket);
            opened = true;
            resolve();
          });
          webSocket.onError((res) => {
            let error = null;
            error = new Error(res.errMsg);
            this._logger.log(exports2.LogLevel.Information, `(SocketTask transport) ${error}.`);
          });
          webSocket.onMessage((message) => {
            this._logger.log(exports2.LogLevel.Trace, `(SocketTask transport) data received. ${getDataDetail(message.data, this._logMessageContent)}.`);
            if (this.onreceive) {
              try {
                this.onreceive(message.data);
              } catch (error) {
                this._close(error);
                return;
              }
            }
          });
          webSocket.onClose(() => {
            if (opened) {
              this._close({ reason: "close SocketTask." });
            } else {
              let error = null;
              error = "SocketTask failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking SocketTask. If you have multiple servers check that sticky sessions are enabled.";
              reject(new Error(error));
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          let urlinfo = (url || "").split("/");
          let o = urlinfo[2].split(":")[0];
          let cookiequry = common_weappCookie.cookieManager.default.getRequestQueries(o, "/");
          url = url.replace(/^http/, "ws");
          url = url + "&" + cookiequry;
          let webSocket;
          const cookies = this._httpClient.getCookieString(url);
          let opened = false;
          if (Platform.isNode || Platform.isReactNative) {
            const headers = {};
            const [name, value] = getUserAgentHeader();
            headers[name] = value;
            if (token) {
              headers[HeaderNames.Authorization] = `Bearer ${token}`;
            }
            if (cookies) {
              headers[HeaderNames.Cookie] = cookies;
            }
            webSocket = new this._webSocketConstructor(url, void 0, {
              headers: { ...headers, ...this._headers }
            });
          } else {
            if (token) {
              url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(token)}`;
            }
          }
          if (!webSocket) {
            webSocket = new this._webSocketConstructor(url);
          }
          if (transferFormat === exports2.TransferFormat.Binary) {
            webSocket.binaryType = "arraybuffer";
          }
          webSocket.onopen = (_event) => {
            this._logger.log(exports2.LogLevel.Information, `WebSocket connected to ${url}.`);
            this._webSocket = webSocket;
            opened = true;
            resolve();
          };
          webSocket.onerror = (event) => {
            let error = null;
            if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
              error = event.error;
            } else {
              error = "There was an error with the transport";
            }
            this._logger.log(exports2.LogLevel.Information, `(WebSockets transport) ${error}.`);
          };
          webSocket.onmessage = (message) => {
            this._logger.log(exports2.LogLevel.Trace, `(WebSockets transport) data received. ${getDataDetail(message.data, this._logMessageContent)}.`);
            if (this.onreceive) {
              try {
                this.onreceive(message.data);
              } catch (error) {
                this._close(error);
                return;
              }
            }
          };
          webSocket.onclose = (event) => {
            if (opened) {
              this._close(event);
            } else {
              let error = null;
              if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                error = event.error;
              } else {
                error = "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.";
              }
              reject(new Error(error));
            }
          };
        });
      }
    }
    send(data) {
      if (this._webSocket && this._webSocket.readyState === 1) {
        this._logger.log(exports2.LogLevel.Trace, `(WebSockets transport) sending data. ${getDataDetail(data, this._logMessageContent)}.`);
        this._webSocket.send(data);
        return Promise.resolve();
      }
      return Promise.reject("WebSocket is not in the OPEN state");
    }
    stop() {
      if (this._webSocket) {
        this._close(void 0);
      }
      return Promise.resolve();
    }
    _close(event) {
      if (this._webSocket) {
        this._webSocket.onclose = () => {
        };
        this._webSocket.onmessage = () => {
        };
        this._webSocket.onerror = () => {
        };
        this._webSocket.close();
        this._webSocket = void 0;
      }
      this._logger.log(exports2.LogLevel.Trace, "(WebSockets transport) socket closed.");
      if (this.onclose) {
        if (this._isCloseEvent(event) && (event.wasClean === false || event.code !== 1e3)) {
          this.onclose(new Error(`WebSocket closed with status code: ${event.code} (${event.reason || "no reason given"}).`));
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
  const MAX_REDIRECTS = 100;
  class HttpConnection {
    constructor(url, options = {}) {
      this._stopPromiseResolver = () => {
      };
      this.features = {};
      this._negotiateVersion = 1;
      Arg.isRequired(url, "url");
      this._logger = createLogger(options.logger);
      this.baseUrl = this._resolveUrl(url);
      options = options || {};
      options.UniWebSocket = UniWebSocket.prototype;
      options.logMessageContent = options.logMessageContent === void 0 ? false : options.logMessageContent;
      if (typeof options.withCredentials === "boolean" || options.withCredentials === void 0) {
        options.withCredentials = false;
      } else {
        throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
      }
      options.timeout = options.timeout === void 0 ? 100 * 1e3 : options.timeout;
      let eventSourceModule = null;
      if (!Platform.isNode && typeof WebSocket !== "undefined" && !options.WebSocket) {
        options.WebSocket = WebSocket;
      } else if (Platform.isNode && !options.WebSocket)
        ;
      if (!Platform.isNode && typeof EventSource !== "undefined" && !options.EventSource) {
        options.EventSource = EventSource;
      } else if (Platform.isNode && !options.EventSource) {
        {
          options.EventSource = eventSourceModule;
        }
      }
      this._httpClient = new AccessTokenHttpClient(options.httpClient || new DefaultHttpClient(this._logger), options.accessTokenFactory);
      this._connectionState = "Disconnected";
      this._connectionStarted = false;
      this._options = options;
      this.onreceive = null;
      this.onclose = null;
    }
    async start(transferFormat) {
      transferFormat = transferFormat || exports2.TransferFormat.Binary;
      Arg.isIn(transferFormat, exports2.TransferFormat, "transferFormat");
      this._logger.log(exports2.LogLevel.Debug, `Starting connection with transfer format '${exports2.TransferFormat[transferFormat]}'.`);
      if (this._connectionState !== "Disconnected") {
        return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
      }
      this._connectionState = "Connecting";
      this._startInternalPromise = this._startInternal(transferFormat);
      await this._startInternalPromise;
      if (this._connectionState === "Disconnecting") {
        const message = "Failed to start the HttpConnection before stop() was called.";
        this._logger.log(exports2.LogLevel.Error, message);
        await this._stopPromise;
        return Promise.reject(new AbortError(message));
      } else if (this._connectionState !== "Connected") {
        const message = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
        this._logger.log(exports2.LogLevel.Error, message);
        return Promise.reject(new AbortError(message));
      }
      this._connectionStarted = true;
    }
    send(data) {
      if (this._connectionState !== "Connected") {
        common_vendor.index.showToast({
          title: "�������"
        });
        return Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State."));
      }
      if (!this._sendQueue) {
        this._sendQueue = new TransportSendQueue(this.transport);
      }
      return this._sendQueue.send(data);
    }
    async stop(error) {
      if (this._connectionState === "Disconnected") {
        this._logger.log(exports2.LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnected state.`);
        return Promise.resolve();
      }
      if (this._connectionState === "Disconnecting") {
        this._logger.log(exports2.LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnecting state.`);
        return this._stopPromise;
      }
      this._connectionState = "Disconnecting";
      this._stopPromise = new Promise((resolve) => {
        this._stopPromiseResolver = resolve;
      });
      await this._stopInternal(error);
      await this._stopPromise;
    }
    async _stopInternal(error) {
      this._stopError = error;
      try {
        await this._startInternalPromise;
      } catch (e) {
      }
      if (this.transport) {
        try {
          await this.transport.stop();
        } catch (e) {
          this._logger.log(exports2.LogLevel.Error, `HttpConnection.transport.stop() threw error '${e}'.`);
          this._stopConnection();
        }
        this.transport = void 0;
      } else {
        this._logger.log(exports2.LogLevel.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
      }
    }
    async _startInternal(transferFormat) {
      let url = this.baseUrl;
      this._accessTokenFactory = this._options.accessTokenFactory;
      this._httpClient._accessTokenFactory = this._accessTokenFactory;
      try {
        if (this._options.skipNegotiation) {
          if (this._options.transport === exports2.HttpTransportType.WebSockets) {
            this.transport = this._constructTransport(exports2.HttpTransportType.WebSockets);
            await this._startTransport(url, transferFormat);
          } else {
            throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
          }
        } else {
          let negotiateResponse = null;
          let redirects = 0;
          do {
            negotiateResponse = await this._getNegotiationResponse(url);
            if (this._connectionState === "Disconnecting" || this._connectionState === "Disconnected") {
              throw new AbortError("The connection was stopped during negotiation.");
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
          await this._createTransport(url, this._options.transport, negotiateResponse, transferFormat);
        }
        if (this.transport instanceof LongPollingTransport) {
          this.features.inherentKeepAlive = true;
        }
        if (this._connectionState === "Connecting") {
          this._logger.log(exports2.LogLevel.Debug, "The HttpConnection connected successfully.");
          this._connectionState = "Connected";
        }
      } catch (e) {
        this._logger.log(exports2.LogLevel.Error, "Failed to start the connection: " + e);
        this._connectionState = "Disconnected";
        this.transport = void 0;
        this._stopPromiseResolver();
        return Promise.reject(e);
      }
    }
    async _getNegotiationResponse(url) {
      const headers = {};
      const [name, value] = getUserAgentHeader();
      headers[name] = value;
      const negotiateUrl = this._resolveNegotiateUrl(url);
      this._logger.log(exports2.LogLevel.Debug, `Sending negotiation request: ${negotiateUrl}.`);
      try {
        const response = await this._httpClient.post(negotiateUrl, {
          content: "",
          headers: { ...headers, ...this._options.headers },
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
        if (e instanceof HttpError) {
          if (e.statusCode === 404) {
            errorMessage = errorMessage + " Either this is not a SignalR endpoint or there is a proxy blocking the connection.";
          }
        }
        this._logger.log(exports2.LogLevel.Error, errorMessage);
        return Promise.reject(new FailedToNegotiateWithServerError(errorMessage));
      }
    }
    _createConnectUrl(url, connectionToken) {
      if (!connectionToken) {
        return url;
      }
      return url + (url.indexOf("?") === -1 ? "?" : "&") + `id=${connectionToken}`;
    }
    async _createTransport(url, requestedTransport, negotiateResponse, requestedTransferFormat) {
      let connectUrl = this._createConnectUrl(url, negotiateResponse.connectionToken);
      if (this._isITransport(requestedTransport)) {
        this._logger.log(exports2.LogLevel.Debug, "Connection was provided an instance of ITransport, using that directly.");
        this.transport = requestedTransport;
        await this._startTransport(connectUrl, requestedTransferFormat);
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
              negotiate = await this._getNegotiationResponse(url);
            } catch (ex) {
              return Promise.reject(ex);
            }
            connectUrl = this._createConnectUrl(url, negotiate.connectionToken);
          }
          try {
            await this._startTransport(connectUrl, requestedTransferFormat);
            this.connectionId = negotiate.connectionId;
            return;
          } catch (ex) {
            this._logger.log(exports2.LogLevel.Error, `Failed to start the transport '${endpoint.transport}': ${ex}`);
            negotiate = void 0;
            transportExceptions.push(new FailedToStartTransportError(`${endpoint.transport} failed: ${ex}`, exports2.HttpTransportType[endpoint.transport]));
            if (this._connectionState !== "Connecting") {
              const message = "Failed to select transport before stop() was called.";
              this._logger.log(exports2.LogLevel.Debug, message);
              return Promise.reject(new AbortError(message));
            }
          }
        }
      }
      if (transportExceptions.length > 0) {
        return Promise.reject(new AggregateErrors(`Unable to connect to the server with any of the available transports. ${transportExceptions.join(" ")}`, transportExceptions));
      }
      return Promise.reject(new Error("None of the transports supported by the client are supported by the server."));
    }
    _constructTransport(transport) {
      switch (transport) {
        case exports2.HttpTransportType.WebSockets:
          if (!this._options.WebSocket && !this._options.UniWebSocket) {
            throw new Error("'WebSocket' is not supported in your environment.");
          }
          return new WebSocketTransport(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.WebSocket, this._options.headers || {});
        case exports2.HttpTransportType.ServerSentEvents:
          if (!this._options.EventSource) {
            throw new Error("'EventSource' is not supported in your environment.");
          }
          return new ServerSentEventsTransport(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
        case exports2.HttpTransportType.LongPolling:
          return new LongPollingTransport(this._httpClient, this._logger, this._options);
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
      const transport = exports2.HttpTransportType[endpoint.transport];
      if (transport === null || transport === void 0) {
        this._logger.log(exports2.LogLevel.Debug, `Skipping transport '${endpoint.transport}' because it is not supported by this client.`);
        return new Error(`Skipping transport '${endpoint.transport}' because it is not supported by this client.`);
      } else {
        if (transportMatches(requestedTransport, transport)) {
          const transferFormats = endpoint.transferFormats.map((s) => exports2.TransferFormat[s]);
          if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
            if (transport === exports2.HttpTransportType.WebSockets && !this._options.WebSocket && !this._options.UniWebSocket || transport === exports2.HttpTransportType.ServerSentEvents && !this._options.EventSource) {
              this._logger.log(exports2.LogLevel.Debug, `Skipping transport '${exports2.HttpTransportType[transport]}' because it is not supported in your environment.'`);
              return new UnsupportedTransportError(`'${exports2.HttpTransportType[transport]}' is not supported in your environment.`, transport);
            } else {
              this._logger.log(exports2.LogLevel.Debug, `Selecting transport '${exports2.HttpTransportType[transport]}'.`);
              try {
                return this._constructTransport(transport);
              } catch (ex) {
                return ex;
              }
            }
          } else {
            this._logger.log(exports2.LogLevel.Debug, `Skipping transport '${exports2.HttpTransportType[transport]}' because it does not support the requested transfer format '${exports2.TransferFormat[requestedTransferFormat]}'.`);
            return new Error(`'${exports2.HttpTransportType[transport]}' does not support ${exports2.TransferFormat[requestedTransferFormat]}.`);
          }
        } else {
          this._logger.log(exports2.LogLevel.Debug, `Skipping transport '${exports2.HttpTransportType[transport]}' because it was disabled by the client.`);
          return new DisabledTransportError(`'${exports2.HttpTransportType[transport]}' is disabled by the client.`, transport);
        }
      }
    }
    _isITransport(transport) {
      return transport && typeof transport === "object" && "connect" in transport;
    }
    _stopConnection(error) {
      this._logger.log(exports2.LogLevel.Debug, `HttpConnection.stopConnection(${error}) called while in state ${this._connectionState}.`);
      this.transport = void 0;
      error = this._stopError || error;
      this._stopError = void 0;
      if (this._connectionState === "Disconnected") {
        this._logger.log(exports2.LogLevel.Debug, `Call to HttpConnection.stopConnection(${error}) was ignored because the connection is already in the disconnected state.`);
        return;
      }
      if (this._connectionState === "Connecting") {
        this._logger.log(exports2.LogLevel.Warning, `Call to HttpConnection.stopConnection(${error}) was ignored because the connection is still in the connecting state.`);
        throw new Error(`HttpConnection.stopConnection(${error}) was called while the connection is still in the connecting state.`);
      }
      if (this._connectionState === "Disconnecting") {
        this._stopPromiseResolver();
      }
      if (error) {
        this._logger.log(exports2.LogLevel.Error, `Connection disconnected with error '${error}'.`);
      } else {
        this._logger.log(exports2.LogLevel.Information, "Connection disconnected.");
      }
      if (this._sendQueue) {
        this._sendQueue.stop().catch((e) => {
          this._logger.log(exports2.LogLevel.Error, `TransportSendQueue.stop() threw error '${e}'.`);
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
          this._logger.log(exports2.LogLevel.Error, `HttpConnection.onclose(${error}) threw error '${e}'.`);
        }
      }
    }
    _resolveUrl(url) {
      if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
        return url;
      }
      if (!Platform.isBrowser) {
        throw new Error(`Cannot resolve '${url}'.`);
      }
      const aTag = window.document.createElement("a");
      aTag.href = url;
      this._logger.log(exports2.LogLevel.Information, `Normalizing '${url}' to '${aTag.href}'.`);
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
    async _sendLoop() {
      while (true) {
        await this._sendBufferedData.promise;
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
          await this._transport.send(data);
          transportResult.resolve();
        } catch (error) {
          transportResult.reject(error);
        }
      }
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
  const JSON_HUB_PROTOCOL_NAME = "json";
  class JsonHubProtocol {
    constructor() {
      this.name = JSON_HUB_PROTOCOL_NAME;
      this.version = 1;
      this.transferFormat = exports2.TransferFormat.Text;
    }
    /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
     *
     * @param {string} input A string containing the serialized representation.
     * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
     */
    parseMessages(input, logger) {
      if (typeof input !== "string") {
        throw new Error("Invalid input for JSON hub protocol. Expected a string.");
      }
      if (!input) {
        return [];
      }
      if (logger === null) {
        logger = NullLogger.instance;
      }
      const messages = TextMessageFormat.parse(input);
      const hubMessages = [];
      for (const message of messages) {
        const parsedMessage = JSON.parse(message);
        if (typeof parsedMessage.type !== "number") {
          throw new Error("Invalid payload.");
        }
        switch (parsedMessage.type) {
          case exports2.MessageType.Invocation:
            this._isInvocationMessage(parsedMessage);
            break;
          case exports2.MessageType.StreamItem:
            this._isStreamItemMessage(parsedMessage);
            break;
          case exports2.MessageType.Completion:
            this._isCompletionMessage(parsedMessage);
            break;
          case exports2.MessageType.Ping:
            break;
          case exports2.MessageType.Close:
            break;
          default:
            logger.log(exports2.LogLevel.Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
            continue;
        }
        hubMessages.push(parsedMessage);
      }
      return hubMessages;
    }
    /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
     *
     * @param {HubMessage} message The message to write.
     * @returns {string} A string containing the serialized representation of the message.
     */
    writeMessage(message) {
      return TextMessageFormat.write(JSON.stringify(message));
    }
    _isInvocationMessage(message) {
      this._assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
      if (message.invocationId !== void 0) {
        this._assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
      }
    }
    _isStreamItemMessage(message) {
      this._assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
      if (message.item === void 0) {
        throw new Error("Invalid payload for StreamItem message.");
      }
    }
    _isCompletionMessage(message) {
      if (message.result && message.error) {
        throw new Error("Invalid payload for Completion message.");
      }
      if (!message.result && message.error) {
        this._assertNotEmptyString(message.error, "Invalid payload for Completion message.");
      }
      this._assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
    }
    _assertNotEmptyString(value, errorMessage) {
      if (typeof value !== "string" || value === "") {
        throw new Error(errorMessage);
      }
    }
  }
  const LogLevelNameMapping = {
    trace: exports2.LogLevel.Trace,
    debug: exports2.LogLevel.Debug,
    info: exports2.LogLevel.Information,
    information: exports2.LogLevel.Information,
    warn: exports2.LogLevel.Warning,
    warning: exports2.LogLevel.Warning,
    error: exports2.LogLevel.Error,
    critical: exports2.LogLevel.Critical,
    none: exports2.LogLevel.None
  };
  function parseLogLevel(name) {
    const mapping = LogLevelNameMapping[name.toLowerCase()];
    if (typeof mapping !== "undefined") {
      return mapping;
    } else {
      throw new Error(`Unknown log level: ${name}`);
    }
  }
  class HubConnectionBuilder {
    configureLogging(logging) {
      Arg.isRequired(logging, "logging");
      if (isLogger(logging)) {
        this.logger = logging;
      } else if (typeof logging === "string") {
        const logLevel = parseLogLevel(logging);
        this.logger = new ConsoleLogger(logLevel);
      } else {
        this.logger = new ConsoleLogger(logging);
      }
      return this;
    }
    withUrl(url, transportTypeOrOptions) {
      Arg.isRequired(url, "url");
      Arg.isNotEmpty(url, "url");
      this.url = url;
      if (typeof transportTypeOrOptions === "object") {
        this.httpConnectionOptions = { ...this.httpConnectionOptions, ...transportTypeOrOptions };
      } else {
        this.httpConnectionOptions = {
          ...this.httpConnectionOptions,
          transport: transportTypeOrOptions
        };
      }
      return this;
    }
    /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
     *
     * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
     */
    withHubProtocol(protocol) {
      Arg.isRequired(protocol, "protocol");
      this.protocol = protocol;
      return this;
    }
    withAutomaticReconnect(retryDelaysOrReconnectPolicy) {
      if (this.reconnectPolicy) {
        throw new Error("A reconnectPolicy has already been set.");
      }
      if (!retryDelaysOrReconnectPolicy) {
        this.reconnectPolicy = new DefaultReconnectPolicy();
      } else if (Array.isArray(retryDelaysOrReconnectPolicy)) {
        this.reconnectPolicy = new DefaultReconnectPolicy(retryDelaysOrReconnectPolicy);
      } else {
        this.reconnectPolicy = retryDelaysOrReconnectPolicy;
      }
      return this;
    }
    /** Configures {@link @microsoft/signalr.HubConnection.serverTimeoutInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
     *
     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
     */
    withServerTimeout(milliseconds) {
      Arg.isRequired(milliseconds, "milliseconds");
      this._serverTimeoutInMilliseconds = milliseconds;
      return this;
    }
    /** Configures {@link @microsoft/signalr.HubConnection.keepAliveIntervalInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
     *
     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
     */
    withKeepAliveInterval(milliseconds) {
      Arg.isRequired(milliseconds, "milliseconds");
      this._keepAliveIntervalInMilliseconds = milliseconds;
      return this;
    }
    /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
     *
     * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
     */
    build() {
      const httpConnectionOptions = this.httpConnectionOptions || {};
      if (httpConnectionOptions.logger === void 0) {
        httpConnectionOptions.logger = this.logger;
      }
      if (!this.url) {
        throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
      }
      const connection = new HttpConnection(this.url, httpConnectionOptions);
      return HubConnection.create(connection, this.logger || NullLogger.instance, this.protocol || new JsonHubProtocol(), this.reconnectPolicy, this._serverTimeoutInMilliseconds, this._keepAliveIntervalInMilliseconds);
    }
  }
  function isLogger(logger) {
    return logger.log !== void 0;
  }
  exports2.AbortError = AbortError;
  exports2.DefaultHttpClient = DefaultHttpClient;
  exports2.HttpClient = HttpClient;
  exports2.HttpError = HttpError;
  exports2.HttpResponse = HttpResponse;
  exports2.HubConnection = HubConnection;
  exports2.HubConnectionBuilder = HubConnectionBuilder;
  exports2.JsonHubProtocol = JsonHubProtocol;
  exports2.NullLogger = NullLogger;
  exports2.Subject = Subject;
  exports2.TimeoutError = TimeoutError;
  exports2.VERSION = VERSION;
});
