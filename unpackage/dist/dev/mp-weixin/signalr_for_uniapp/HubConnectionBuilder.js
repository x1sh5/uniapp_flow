"use strict";
const signalr_for_uniapp_DefaultReconnectPolicy = require("./DefaultReconnectPolicy.js");
const signalr_for_uniapp_HttpConnection = require("./HttpConnection.js");
const signalr_for_uniapp_HubConnection = require("./HubConnection.js");
const signalr_for_uniapp_ILogger = require("./ILogger.js");
const signalr_for_uniapp_JsonHubProtocol = require("./JsonHubProtocol.js");
const signalr_for_uniapp_Loggers = require("./Loggers.js");
const signalr_for_uniapp_Utils = require("./Utils.js");
const LogLevelNameMapping = {
  trace: signalr_for_uniapp_ILogger.LogLevel.Trace,
  debug: signalr_for_uniapp_ILogger.LogLevel.Debug,
  info: signalr_for_uniapp_ILogger.LogLevel.Information,
  information: signalr_for_uniapp_ILogger.LogLevel.Information,
  warn: signalr_for_uniapp_ILogger.LogLevel.Warning,
  warning: signalr_for_uniapp_ILogger.LogLevel.Warning,
  error: signalr_for_uniapp_ILogger.LogLevel.Error,
  critical: signalr_for_uniapp_ILogger.LogLevel.Critical,
  none: signalr_for_uniapp_ILogger.LogLevel.None
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
    signalr_for_uniapp_Utils.Arg.isRequired(logging, "logging");
    if (isLogger(logging)) {
      this.logger = logging;
    } else if (typeof logging === "string") {
      const logLevel = parseLogLevel(logging);
      this.logger = new signalr_for_uniapp_Utils.ConsoleLogger(logLevel);
    } else {
      this.logger = new signalr_for_uniapp_Utils.ConsoleLogger(logging);
    }
    return this;
  }
  withUrl(url, transportTypeOrOptions) {
    signalr_for_uniapp_Utils.Arg.isRequired(url, "url");
    signalr_for_uniapp_Utils.Arg.isNotEmpty(url, "url");
    this.url = url;
    if (typeof transportTypeOrOptions === "object") {
      this.httpConnectionOptions = Object.assign(Object.assign({}, this.httpConnectionOptions), transportTypeOrOptions);
    } else {
      this.httpConnectionOptions = Object.assign(Object.assign({}, this.httpConnectionOptions), { transport: transportTypeOrOptions });
    }
    return this;
  }
  /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
   *
   * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
   */
  withHubProtocol(protocol) {
    signalr_for_uniapp_Utils.Arg.isRequired(protocol, "protocol");
    this.protocol = protocol;
    return this;
  }
  withAutomaticReconnect(retryDelaysOrReconnectPolicy) {
    if (this.reconnectPolicy) {
      throw new Error("A reconnectPolicy has already been set.");
    }
    if (!retryDelaysOrReconnectPolicy) {
      this.reconnectPolicy = new signalr_for_uniapp_DefaultReconnectPolicy.DefaultReconnectPolicy();
    } else if (Array.isArray(retryDelaysOrReconnectPolicy)) {
      this.reconnectPolicy = new signalr_for_uniapp_DefaultReconnectPolicy.DefaultReconnectPolicy(retryDelaysOrReconnectPolicy);
    } else {
      this.reconnectPolicy = retryDelaysOrReconnectPolicy;
    }
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
    const connection = new signalr_for_uniapp_HttpConnection.HttpConnection(this.url, httpConnectionOptions);
    return signalr_for_uniapp_HubConnection.HubConnection.create(connection, this.logger || signalr_for_uniapp_Loggers.NullLogger.instance, this.protocol || new signalr_for_uniapp_JsonHubProtocol.JsonHubProtocol(), this.reconnectPolicy);
  }
}
function isLogger(logger) {
  return logger.log !== void 0;
}
exports.HubConnectionBuilder = HubConnectionBuilder;
