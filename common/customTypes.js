/**
 * 聊天对象入口
 */
export class ChatChannel{
	cid;
	unread;
	title;
	lasttime;
	message;
	mtype=1;//default 1
	constructor(cid,unread,title,lasttime,message,mtype=1){
		this.cid = cid;
		this.unread = unread;
		this.title = title;
		this.lasttime = lasttime;
		this.message = message;
		this.mtype = mtype;
	}
}

export class FixedLengthQueue {
    constructor(maxLength) {
        this.maxLength = maxLength;
        this.queue = [];
    }

    push(element) {
        if (this.queue.length >= this.maxLength) {
            this.queue.shift(); // 移除首元素
        }
        this.queue.push(element);
    }

    toArray() {
        return this.queue.slice(); // 返回存储结构的一个副本
    }
}