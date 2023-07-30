"use strict";
exports.MessageType = void 0;
(function(MessageType) {
  MessageType[MessageType["Invocation"] = 1] = "Invocation";
  MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
  MessageType[MessageType["Completion"] = 3] = "Completion";
  MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
  MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
  MessageType[MessageType["Ping"] = 6] = "Ping";
  MessageType[MessageType["Close"] = 7] = "Close";
})(exports.MessageType || (exports.MessageType = {}));
