"use strict";const t=require("../../common/vendor.js"),i={name:"bill",data:()=>({}),props:{bill:Object},computed:{status(){if(this.bill&&this.bill.status){if(1===this.bill.status)return"完成";if(0===this.bill.status)return"未完成"}return"未完成"},mount(){return this.bill&&this.bill.mount?this.bill.mount/100:""},odate(){return this.bill&&this.bill.date?this.bill.date.replace("T"," "):""}},methods:{todetail(){t.index.navigateTo({url:"/pages/myTaskDetail/myTaskDetail?id="+this.bill.assignmentId})}}};const e=t._export_sfc(i,[["render",function(i,e,l,s,a,n){return{a:t.t(l.bill.description),b:t.t(n.odate),c:t.t(n.mount),d:t.t(n.status),e:t.o(((...t)=>n.todetail&&n.todetail(...t)))}}]]);wx.createComponent(e);
