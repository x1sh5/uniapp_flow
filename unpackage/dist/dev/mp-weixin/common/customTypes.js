"use strict";
class ChatChannel {
  //default 1
  constructor(cid, unread, title, lasttime, message, mtype = 1) {
    this.mtype = 1;
    this.cid = cid;
    this.unread = unread;
    this.title = title;
    this.lasttime = lasttime;
    this.message = message;
    this.mtype = mtype;
  }
}
var TaskStatus = ["waitfor", "undone", "done", "announcement", "fail"];
exports.ChatChannel = ChatChannel;
exports.TaskStatus = TaskStatus;
