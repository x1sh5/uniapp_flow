"use strict";
const signalr_for_uniapp_HandshakeProtocol = require("./HandshakeProtocol.js");
const signalr_for_uniapp_Errors = require("./Errors.js");
const signalr_for_uniapp_IHubProtocol = require("./IHubProtocol.js");
const signalr_for_uniapp_ILogger = require("./ILogger.js");
const signalr_for_uniapp_Subject = require("./Subject.js");
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
const DEFAULT_TIMEOUT_IN_MS = 30 * 1e3;
const DEFAULT_PING_INTERVAL_IN_MS = 15 * 1e3;
var HubConnectionState;
(function(HubConnectionState2) {
  HubConnectionState2["Disconnected"] = "Disconnected";
  HubConnectionState2["Connecting"] = "Connecting";
  HubConnectionState2["Connected"] = "Connected";
  HubConnectionState2["Disconnecting"] = "Disconnecting";
  HubConnectionState2["Reconnecting"] = "Reconnecting";
})(HubConnectionState || (HubConnectionState = {}));
class HubConnection {
  /** @internal */
  // Using a public static factory method means we can have a private constructor and an _internal_
  // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
  // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
  // public parameter-less constructor.
  static create(connection, logger, protocol, reconnectPolicy) {
    return new HubConnection(connection, logger, protocol, reconnectPolicy);
  }
  constructor(connection, logger, protocol, reconnectPolicy) {
    this._nextKeepAlive = 0;
    this._freezeEventListener = () => {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://docs.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
    };
    signalr_for_uniapp_Utils.Arg.isRequired(connection, "connection");
    signalr_for_uniapp_Utils.Arg.isRequired(logger, "logger");
    signalr_for_uniapp_Utils.Arg.isRequired(protocol, "protocol");
    this.serverTimeoutInMilliseconds = DEFAULT_TIMEOUT_IN_MS;
    this.keepAliveIntervalInMilliseconds = DEFAULT_PING_INTERVAL_IN_MS;
    this._logger = logger;
    this._protocol = protocol;
    this.connection = connection;
    this._reconnectPolicy = reconnectPolicy;
    this._handshakeProtocol = new signalr_for_uniapp_HandshakeProtocol.HandshakeProtocol();
    this.connection.onreceive = (data) => this._processIncomingData(data);
    this.connection.onclose = (error) => this._connectionClosed(error);
    this._callbacks = {};
    this._methods = {};
    this._closedCallbacks = [];
    this._reconnectingCallbacks = [];
    this._reconnectedCallbacks = [];
    this._invocationId = 0;
    this._receivedHandshakeResponse = false;
    this._connectionState = HubConnectionState.Disconnected;
    this._connectionStarted = false;
    this._cachedPingMessage = this._protocol.writeMessage({ type: signalr_for_uniapp_IHubProtocol.MessageType.Ping });
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
    if (this._connectionState !== HubConnectionState.Disconnected && this._connectionState !== HubConnectionState.Reconnecting) {
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
  _startWithStateTransitions() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this._connectionState !== HubConnectionState.Disconnected) {
        return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));
      }
      this._connectionState = HubConnectionState.Connecting;
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "Starting HubConnection.");
      try {
        yield this._startInternal();
        if (signalr_for_uniapp_Utils.Platform.isBrowser) {
          window.document.addEventListener("freeze", this._freezeEventListener);
        }
        this._connectionState = HubConnectionState.Connected;
        this._connectionStarted = true;
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "HubConnection connected successfully.");
      } catch (e) {
        this._connectionState = HubConnectionState.Disconnected;
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `HubConnection failed to start successfully because of error '${e}'.`);
        return Promise.reject(e);
      }
    });
  }
  _startInternal() {
    return __awaiter(this, void 0, void 0, function* () {
      this._stopDuringStartError = void 0;
      this._receivedHandshakeResponse = false;
      const handshakePromise = new Promise((resolve, reject) => {
        this._handshakeResolver = resolve;
        this._handshakeRejecter = reject;
      });
      yield this.connection.start(this._protocol.transferFormat);
      try {
        const handshakeRequest = {
          protocol: this._protocol.name,
          version: this._protocol.version
        };
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "Sending handshake request.");
        yield this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(handshakeRequest));
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, `Using HubProtocol '${this._protocol.name}'.`);
        this._cleanupTimeout();
        this._resetTimeoutPeriod();
        this._resetKeepAliveInterval();
        yield handshakePromise;
        if (this._stopDuringStartError) {
          throw this._stopDuringStartError;
        }
        if (!this.connection.features.inherentKeepAlive) {
          yield this._sendMessage(this._cachedPingMessage);
        }
      } catch (e) {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Hub handshake failed with error '${e}' during start(). Stopping HubConnection.`);
        this._cleanupTimeout();
        this._cleanupPingTimer();
        yield this.connection.stop(e);
        throw e;
      }
    });
  }
  /** Stops the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
   */
  stop() {
    return __awaiter(this, void 0, void 0, function* () {
      const startPromise = this._startPromise;
      this._stopPromise = this._stopInternal();
      yield this._stopPromise;
      try {
        yield startPromise;
      } catch (e) {
      }
    });
  }
  _stopInternal(error) {
    if (this._connectionState === HubConnectionState.Disconnected) {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Call to HubConnection.stop(${error}) ignored because it is already in the disconnected state.`);
      return Promise.resolve();
    }
    if (this._connectionState === HubConnectionState.Disconnecting) {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnecting state.`);
      return this._stopPromise;
    }
    this._connectionState = HubConnectionState.Disconnecting;
    this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "Stopping HubConnection.");
    if (this._reconnectDelayHandle) {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "Connection stopped during reconnect delay. Done reconnecting.");
      clearTimeout(this._reconnectDelayHandle);
      this._reconnectDelayHandle = void 0;
      this._completeClose();
      return Promise.resolve();
    }
    this._cleanupTimeout();
    this._cleanupPingTimer();
    this._stopDuringStartError = error || new signalr_for_uniapp_Errors.AbortError("The connection was stopped before the hub handshake could complete.");
    return this.connection.stop(error);
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
    const subject = new signalr_for_uniapp_Subject.Subject();
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
        if (invocationEvent.type === signalr_for_uniapp_IHubProtocol.MessageType.Completion) {
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
          if (invocationEvent.type === signalr_for_uniapp_IHubProtocol.MessageType.Completion) {
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
          case signalr_for_uniapp_IHubProtocol.MessageType.Invocation:
            this._invokeClientMethod(message);
            break;
          case signalr_for_uniapp_IHubProtocol.MessageType.StreamItem:
          case signalr_for_uniapp_IHubProtocol.MessageType.Completion: {
            const callback = this._callbacks[message.invocationId];
            if (callback) {
              if (message.type === signalr_for_uniapp_IHubProtocol.MessageType.Completion) {
                delete this._callbacks[message.invocationId];
              }
              try {
                callback(message);
              } catch (e) {
                this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `Stream callback threw error: ${signalr_for_uniapp_Utils.getErrorString(e)}`);
              }
            }
            break;
          }
          case signalr_for_uniapp_IHubProtocol.MessageType.Ping:
            break;
          case signalr_for_uniapp_IHubProtocol.MessageType.Close: {
            this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, "Close message received from server.");
            const error = message.error ? new Error("Server returned an error on close: " + message.error) : void 0;
            if (message.allowReconnect === true) {
              this.connection.stop(error);
            } else {
              this._stopPromise = this._stopInternal(error);
            }
            break;
          }
          default:
            this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Warning, `Invalid message type: ${message.type}.`);
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
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, message);
      const error = new Error(message);
      this._handshakeRejecter(error);
      throw error;
    }
    if (responseMessage.error) {
      const message = "Server returned handshake error: " + responseMessage.error;
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, message);
      const error = new Error(message);
      this._handshakeRejecter(error);
      throw error;
    } else {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "Server handshake complete.");
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
        this._pingServerHandle = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
          if (this._connectionState === HubConnectionState.Connected) {
            try {
              yield this._sendMessage(this._cachedPingMessage);
            } catch (_a) {
              this._cleanupPingTimer();
            }
          }
        }), nextPing);
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  serverTimeout() {
    this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
  }
  _invokeClientMethod(invocationMessage) {
    return __awaiter(this, void 0, void 0, function* () {
      const methodName = invocationMessage.target.toLowerCase();
      const methods = this._methods[methodName];
      if (!methods) {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Warning, `No client method with the name '${methodName}' found.`);
        if (invocationMessage.invocationId) {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Warning, `No result given for '${methodName}' method and invocation ID '${invocationMessage.invocationId}'.`);
          yield this._sendWithProtocol(this._createCompletionMessage(invocationMessage.invocationId, "Client didn't provide a result.", null));
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
          res = yield m.apply(this, invocationMessage.arguments);
          if (expectsResponse && res && prevRes) {
            this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `Multiple results provided for '${methodName}'. Sending error to server.`);
            completionMessage = this._createCompletionMessage(invocationMessage.invocationId, `Client provided multiple results.`, null);
          }
          exception = void 0;
        } catch (e) {
          exception = e;
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `A callback for the method '${methodName}' threw error '${e}'.`);
        }
      }
      if (completionMessage) {
        yield this._sendWithProtocol(completionMessage);
      } else if (expectsResponse) {
        if (exception) {
          completionMessage = this._createCompletionMessage(invocationMessage.invocationId, `${exception}`, null);
        } else if (res !== void 0) {
          completionMessage = this._createCompletionMessage(invocationMessage.invocationId, null, res);
        } else {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Warning, `No result given for '${methodName}' method and invocation ID '${invocationMessage.invocationId}'.`);
          completionMessage = this._createCompletionMessage(invocationMessage.invocationId, "Client didn't provide a result.", null);
        }
        yield this._sendWithProtocol(completionMessage);
      } else {
        if (res) {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `Result given for '${methodName}' method but server is not expecting a result.`);
        }
      }
    });
  }
  _connectionClosed(error) {
    this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `HubConnection.connectionClosed(${error}) called while in state ${this._connectionState}.`);
    this._stopDuringStartError = this._stopDuringStartError || error || new signalr_for_uniapp_Errors.AbortError("The underlying connection was closed before the hub handshake could complete.");
    if (this._handshakeResolver) {
      this._handshakeResolver();
    }
    this._cancelCallbacksWithError(error || new Error("Invocation canceled due to the underlying connection being closed."));
    this._cleanupTimeout();
    this._cleanupPingTimer();
    if (this._connectionState === HubConnectionState.Disconnecting) {
      this._completeClose(error);
    } else if (this._connectionState === HubConnectionState.Connected && this._reconnectPolicy) {
      this._reconnect(error);
    } else if (this._connectionState === HubConnectionState.Connected) {
      this._completeClose(error);
    }
  }
  _completeClose(error) {
    if (this._connectionStarted) {
      this._connectionState = HubConnectionState.Disconnected;
      this._connectionStarted = false;
      if (signalr_for_uniapp_Utils.Platform.isBrowser) {
        window.document.removeEventListener("freeze", this._freezeEventListener);
      }
      try {
        this._closedCallbacks.forEach((c) => c.apply(this, [error]));
      } catch (e) {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `An onclose callback called with error '${error}' threw error '${e}'.`);
      }
    }
  }
  _reconnect(error) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const reconnectStartTime = Date.now();
      let previousReconnectAttempts = 0;
      let retryError = error !== void 0 ? error : new Error("Attempting to reconnect due to a unknown error.");
      let nextRetryDelay = this._getNextRetryDelay(previousReconnectAttempts++, 0, retryError);
      if (nextRetryDelay === null) {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt.");
        this._completeClose(error);
        return;
      }
      this._connectionState = HubConnectionState.Reconnecting;
      if (error) {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, `Connection reconnecting because of error '${error}'.`);
      } else {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, "Connection reconnecting.");
      }
      if (this._reconnectingCallbacks.length !== 0) {
        try {
          this._reconnectingCallbacks.forEach((c) => c.apply(this, [error]));
        } catch (e) {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `An onreconnecting callback called with error '${error}' threw error '${e}'.`);
        }
        if (this._connectionState !== HubConnectionState.Reconnecting) {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
          return;
        }
      }
      while (nextRetryDelay !== null) {
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, `Reconnect attempt number ${previousReconnectAttempts} will start in ${nextRetryDelay} ms.`);
        yield new Promise((resolve) => {
          this._reconnectDelayHandle = setTimeout(resolve, nextRetryDelay);
        });
        this._reconnectDelayHandle = void 0;
        if (this._connectionState !== HubConnectionState.Reconnecting) {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
          return;
        }
        try {
          yield this._startInternal();
          this._connectionState = HubConnectionState.Connected;
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, "HubConnection reconnected successfully.");
          if (this._reconnectedCallbacks.length !== 0) {
            try {
              this._reconnectedCallbacks.forEach((c) => c.apply(this, [this.connection.connectionId]));
            } catch (e) {
              this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${e}'.`);
            }
          }
          return;
        } catch (e) {
          this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, `Reconnect attempt failed because of error '${e}'.`);
          if (this._connectionState !== HubConnectionState.Reconnecting) {
            this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`);
            if (this._connectionState === HubConnectionState.Disconnecting) {
              this._completeClose();
            }
            return;
          }
          retryError = e instanceof Error ? e : new Error((_a = e === null || e === void 0 ? void 0 : e.toString()) !== null && _a !== void 0 ? _a : "Unknown error occurred during retrying.");
          nextRetryDelay = this._getNextRetryDelay(previousReconnectAttempts++, Date.now() - reconnectStartTime, retryError);
        }
      }
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, `Reconnect retries have been exhausted after ${Date.now() - reconnectStartTime} ms and ${previousReconnectAttempts} failed attempts. Connection disconnecting.`);
      this._completeClose();
    });
  }
  _getNextRetryDelay(previousRetryCount, elapsedMilliseconds, retryReason) {
    try {
      return this._reconnectPolicy.nextRetryDelayInMilliseconds({
        elapsedMilliseconds,
        previousRetryCount,
        retryReason
      });
    } catch (e) {
      this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${previousRetryCount}, ${elapsedMilliseconds}) threw error '${e}'.`);
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
        this._logger.log(signalr_for_uniapp_ILogger.LogLevel.Error, `Stream 'error' callback called with '${error}' threw error: ${signalr_for_uniapp_Utils.getErrorString(e)}`);
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
          type: signalr_for_uniapp_IHubProtocol.MessageType.Invocation
        };
      } else {
        return {
          arguments: args,
          target: methodName,
          type: signalr_for_uniapp_IHubProtocol.MessageType.Invocation
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
          type: signalr_for_uniapp_IHubProtocol.MessageType.Invocation
        };
      } else {
        return {
          arguments: args,
          invocationId: invocationId.toString(),
          target: methodName,
          type: signalr_for_uniapp_IHubProtocol.MessageType.Invocation
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
        type: signalr_for_uniapp_IHubProtocol.MessageType.StreamInvocation
      };
    } else {
      return {
        arguments: args,
        invocationId: invocationId.toString(),
        target: methodName,
        type: signalr_for_uniapp_IHubProtocol.MessageType.StreamInvocation
      };
    }
  }
  _createCancelInvocation(id) {
    return {
      invocationId: id,
      type: signalr_for_uniapp_IHubProtocol.MessageType.CancelInvocation
    };
  }
  _createStreamItemMessage(id, item) {
    return {
      invocationId: id,
      item,
      type: signalr_for_uniapp_IHubProtocol.MessageType.StreamItem
    };
  }
  _createCompletionMessage(id, error, result) {
    if (error) {
      return {
        error,
        invocationId: id,
        type: signalr_for_uniapp_IHubProtocol.MessageType.Completion
      };
    }
    return {
      invocationId: id,
      result,
      type: signalr_for_uniapp_IHubProtocol.MessageType.Completion
    };
  }
}
exports.HubConnection = HubConnection;
