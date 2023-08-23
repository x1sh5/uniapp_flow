
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