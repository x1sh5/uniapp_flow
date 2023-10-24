"use strict";const e=require("../../common/vendor.js"),s=require("../../common/customTypes.js"),t={data:()=>({text1:"",userName:"",userId:NaN,calcHeight:NaN}),computed:{messages(){return this.$store.getters.getMessages(this.userId)},canSend(){return null===this.text1||""===this.text1||void 0===this.text1}},methods:{async send(e){if(console.log(this.text1),!this.$store.getters["Msgs/getCcById"](this.userId)){let e=new s.ChatChannel(this.userId,0,this.userName,(new Date).toLocaleString(),"");await this.$store.dispatch("Msgs/addChatAsync",e)}this.$store.dispatch("sendMsg",{user:this.userId,message:this.text1}),this.text1=""},back(s){e.index.navigateBack()},receiveOld(){console.log("scroll up");let s=this.messages[0].cid,t=this.$store.state.apiBaseUrl+"/api/messages/receives?receiverId="+this.userId+"&lastid="+s+"&count=10";e.index.requestWithCookie({url:t,success:s=>{if(200===s.statusCode)for(let e of s.data)this.$store.dispatch("receiveMsg",{user:e.from,message:e});s.statusCode>=400&&e.index.showToast({title:"网络异常，请稍后再试!"})}})},scrollDown(){console.log("scroll down")}},onLoad(s){this.userName=s.userName,this.userId=parseInt(s.userId);let t=e.index.getWindowInfo();if(this.calcHeight=96*t.windowHeight/100-66-74,!this.$store.getters["Msgs/getHasFirstLoad"](this.userId)){let s=this.$store.state.apiBaseUrl+"/api/messages/receives?receiverId="+this.userId+"&count=10";e.index.requestWithCookie({url:s,success:s=>{if(200===s.statusCode)for(let e of s.data)this.$store.dispatch("receiveMsg",{user:e.from,message:e});s.statusCode>=400&&e.index.showToast({title:"网络异常，请稍后再试!"})}}),this.$store.dispatch("Msgs/updateHasFirstLoad",this.userId)}},onUnload(){this.$store.commit("Msgs/clearUnread",this.userId)}};if(!Array){(e.resolveComponent("uni-nav-bar")+e.resolveComponent("yd-chatitem"))()}Math||((()=>"../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js")+(()=>"../../components/yd-chatitem/yd-chatitem.js"))();const i=e._export_sfc(t,[["render",function(s,t,i,o,a,r){return{a:e.o(r.back),b:e.p({"left-icon":"left",title:a.userName}),c:e.f(r.messages,((s,t,i)=>({a:s.id,b:"1c5d7166-1-"+i,c:e.p({message:s.content,isLeft:s.isLeft,bgColor:"#f7f7f7"})}))),d:e.s(`height:${a.calcHeight}px`),e:e.o(((...e)=>r.receiveOld&&r.receiveOld(...e))),f:e.o(((...e)=>r.scrollDown&&r.scrollDown(...e))),g:a.text1,h:e.o((e=>a.text1=e.detail.value)),i:r.canSend,j:e.o(((...e)=>r.send&&r.send(...e)))}}]]);wx.createPage(i);