"use strict";
exports.RewardType = void 0;
(function(RewardType) {
  RewardType[RewardType["Fiexd"] = 1] = "Fiexd";
  RewardType[RewardType["Percent"] = 2] = "Percent";
})(exports.RewardType || (exports.RewardType = {}));
exports.TaskStatus = void 0;
(function(TaskStatus) {
  TaskStatus[TaskStatus["WaitForAccept"] = 0] = "WaitForAccept";
  TaskStatus[TaskStatus["Unfinished"] = 1] = "Unfinished";
  TaskStatus[TaskStatus["Finished"] = 2] = "Finished";
})(exports.TaskStatus || (exports.TaskStatus = {}));
