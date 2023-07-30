"use strict";
const signalr_for_uniapp_TextMessageFormat = require("./TextMessageFormat.js");
const signalr_for_uniapp_Utils = require("./Utils.js");
class HandshakeProtocol {
  // Handshake request is always JSON
  writeHandshakeRequest(handshakeRequest) {
    return signalr_for_uniapp_TextMessageFormat.TextMessageFormat.write(JSON.stringify(handshakeRequest));
  }
  parseHandshakeResponse(data) {
    let messageData;
    let remainingData;
    if (signalr_for_uniapp_Utils.isArrayBuffer(data)) {
      const binaryData = new Uint8Array(data);
      const separatorIndex = binaryData.indexOf(signalr_for_uniapp_TextMessageFormat.TextMessageFormat.RecordSeparatorCode);
      if (separatorIndex === -1) {
        throw new Error("Message is incomplete.");
      }
      const responseLength = separatorIndex + 1;
      messageData = String.fromCharCode.apply(null, Array.prototype.slice.call(binaryData.slice(0, responseLength)));
      remainingData = binaryData.byteLength > responseLength ? binaryData.slice(responseLength).buffer : null;
    } else {
      const textData = data;
      const separatorIndex = textData.indexOf(signalr_for_uniapp_TextMessageFormat.TextMessageFormat.RecordSeparator);
      if (separatorIndex === -1) {
        throw new Error("Message is incomplete.");
      }
      const responseLength = separatorIndex + 1;
      messageData = textData.substring(0, responseLength);
      remainingData = textData.length > responseLength ? textData.substring(responseLength) : null;
    }
    const messages = signalr_for_uniapp_TextMessageFormat.TextMessageFormat.parse(messageData);
    const response = JSON.parse(messages[0]);
    if (response.type) {
      throw new Error("Expected a handshake response from the server.");
    }
    const responseMessage = response;
    return [remainingData, responseMessage];
  }
}
exports.HandshakeProtocol = HandshakeProtocol;
