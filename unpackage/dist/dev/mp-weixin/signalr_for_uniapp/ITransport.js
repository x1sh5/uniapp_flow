"use strict";
exports.HttpTransportType = void 0;
(function(HttpTransportType) {
  HttpTransportType[HttpTransportType["None"] = 0] = "None";
  HttpTransportType[HttpTransportType["SocketTasks"] = 1] = "SocketTasks";
  HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
  HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
})(exports.HttpTransportType || (exports.HttpTransportType = {}));
exports.TransferFormat = void 0;
(function(TransferFormat) {
  TransferFormat[TransferFormat["Text"] = 1] = "Text";
  TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
})(exports.TransferFormat || (exports.TransferFormat = {}));
