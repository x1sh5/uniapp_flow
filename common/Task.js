///发布任务时的任务模型

export class Task {
    constructor(branchid, presumedtime, /*finishtime, publishtime, */title, typeId, id, description, reward, rewardtype, status) {
        this.reward = '';
        this.rewardtype = RewardType.Fiexd;
        this.status = TaskStatus.WaitForAccept;
        this.verify = false;
        this.branchid = branchid;
        this.description = '';
        //this.finishtime = finishtime;
        this.presumedtime = presumedtime;
        //this.publishtime = publishtime;
        this.title = title;
        this.typeId = typeId;
        if (id) {
            this.id = id;
        }
        else {
            this.id = Task.couter++;
        }
		if(description){
			this.description = description;
		}
        if (reward) {
            this.reward = reward;
        }
        if (rewardtype) {
            this.rewardtype = rewardtype;
        }
        if (status) {
            this.status = status;
        }
    }
}
Task.couter = 1;
export var RewardType;
(function (RewardType) {
    RewardType[RewardType["Fiexd"] = 1] = "Fiexd";
    RewardType[RewardType["Percent"] = 2] = "Percent";
})(RewardType || (RewardType = {}));
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["WaitForAccept"] = 0] = "WaitForAccept";
    TaskStatus[TaskStatus["Unfinished"] = 1] = "Unfinished";
    TaskStatus[TaskStatus["Finished"] = 2] = "Finished";
})(TaskStatus || (TaskStatus = {}));
//# sourceMappingURL=Task.js.map