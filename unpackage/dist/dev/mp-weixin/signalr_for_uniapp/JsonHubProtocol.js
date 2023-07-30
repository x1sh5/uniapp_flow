"use strict";
const signalr_for_uniapp_IHubProtocol = require("./IHubProtocol.js");
const signalr_for_uniapp_ILogger = require("./ILogger.js");
const signalr_for_uniapp_ITransport = require("./ITransport.js");
const signalr_for_uniapp_Loggers = require("./Loggers.js");
const signalr_for_uniapp_TextMessageFormat = require("./TextMessageFormat.js");
const JSON_HUB_PROTOCOL_NAME = "json";
class JsonHubProtocol {
  constructor() {
    this.name = JSON_HUB_PROTOCOL_NAME;
    this.version = 1;
    this.transferFormat = signalr_for_uniapp_ITransport.TransferFormat.Text;
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
      logger = signalr_for_uniapp_Loggers.NullLogger.instance;
    }
    const messages = signalr_for_uniapp_TextMessageFormat.TextMessageFormat.parse(input);
    const hubMessages = [];
    for (const message of messages) {
      const parsedMessage = JSON.parse(message);
      if (typeof parsedMessage.type !== "number") {
        throw new Error("Invalid payload.");
      }
      switch (parsedMessage.type) {
        case signalr_for_uniapp_IHubProtocol.MessageType.Invocation:
          this._isInvocationMessage(parsedMessage);
          break;
        case signalr_for_uniapp_IHubProtocol.MessageType.StreamItem:
          this._isStreamItemMessage(parsedMessage);
          break;
        case signalr_for_uniapp_IHubProtocol.MessageType.Completion:
          this._isCompletionMessage(parsedMessage);
          break;
        case signalr_for_uniapp_IHubProtocol.MessageType.Ping:
          break;
        case signalr_for_uniapp_IHubProtocol.MessageType.Close:
          break;
        default:
          logger.log(signalr_for_uniapp_ILogger.LogLevel.Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
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
    return signalr_for_uniapp_TextMessageFormat.TextMessageFormat.write(JSON.stringify(message));
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
exports.JsonHubProtocol = JsonHubProtocol;
