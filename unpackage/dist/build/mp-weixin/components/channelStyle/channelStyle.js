"use strict";const e=require("../../common/vendor.js"),t={name:"channelStyle",props:{cc:{type:Object}},data:()=>({}),methods:{jump(){let t=this.cc.cid,c=this.cc.title;e.index.navigateTo({url:"/pages/chat/chat?userId="+t+"&userName="+c})},showDelete(e){},delete(e){this.$emit("delete-Cc",e)}}};const c=e._export_sfc(t,[["render",function(t,c,s,o,n,a){return{a:e.t(s.cc.title),b:e.t(s.cc.message),c:e.t(s.cc.lasttime),d:e.t(s.cc.unread),e:e.o(((...e)=>a.jump&&a.jump(...e))),f:e.o(((...e)=>a.showDelete&&a.showDelete(...e)))}}]]);wx.createComponent(c);