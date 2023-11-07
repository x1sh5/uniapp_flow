///发布任务时的任务模型

export class Task {
    constructor(branchid, deadline, /*finishtime, publishtime, */title, tag, id, description, fixedReward, percentReward,
	 rewardtype, status, main, canTake) {
        this.fixedReward = '';
		this.percentReward = '';
        this.rewardtype = RewardType.Fiexd;
        this.status = TaskStatus.WaitForAccept;
        this.verify = false;
        this.branchid = branchid;
        this.description = '';
        //this.finishtime = finishtime;
        this.deadline = deadline;
        //this.publishtime = publishtime;
        this.title = title;
        this.tag = tag;
        if (id) {
            this.id = id;
        }
        else {
            this.id = Task.couter++;
        }
		if(description){
			this.description = description;
		}
        if (fixedreward) {
            this.fixedReward = fixedReward;
        }
		if (percentReward) {
		    this.percentReward = percentReward;
		}
        if (rewardtype) {
            this.rewardtype = rewardtype;
        }
        if (status) {
            this.status = status;
        }
		if (main) {
		    this.main = main;
		}
		if (canTake) {
		    this.canTake = canTake;
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
	TaskStatus[TaskStatus["Announcement"] = 3] = "Announcement";
	TaskStatus[TaskStatus["Failed"] = 4] = "Failed";
})(TaskStatus || (TaskStatus = {}));
//# sourceMappingURL=Task.js.map