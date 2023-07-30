"use strict";
exports.LogLevel = void 0;
(function(LogLevel) {
  LogLevel[LogLevel["Trace"] = 0] = "Trace";
  LogLevel[LogLevel["Debug"] = 1] = "Debug";
  LogLevel[LogLevel["Information"] = 2] = "Information";
  LogLevel[LogLevel["Warning"] = 3] = "Warning";
  LogLevel[LogLevel["Error"] = 4] = "Error";
  LogLevel[LogLevel["Critical"] = 5] = "Critical";
  LogLevel[LogLevel["None"] = 6] = "None";
})(exports.LogLevel || (exports.LogLevel = {}));
