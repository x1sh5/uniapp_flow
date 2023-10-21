"use strict";const e=require("../../common/vendor.js"),o=require("../../common/storageKeys.js"),t={data:()=>({imgsrc:"",login:!1}),computed:{hasLogin:{get(){return this.$store.state.$hasLogin},set(e){this.login=e,this.$store.state.$hasLogin=e}},userName(){return this.$store.state.$userName}},methods:{toReference(o){e.index.navigateTo({url:"/pages/reference/reference"})},myPublishs(o){e.index.navigateTo({url:"/pages/myPublishs/myPublishs"})},history(o){console.log(o),e.index.navigateTo({url:"/pages/history/history"})},holds(o){let t="/pages/holdTask/holdTask?current="+o;e.index.navigateTo({url:t})},taskReq(o){console.log(o),e.index.navigateTo({url:"/pages/taskReq/taskReq"})},myApply(o){console.log(o),e.index.navigateTo({url:"/pages/myApply/myApply"})},toOrder(o){e.index.navigateTo({url:"/pages/order/order"})},toAbout(o){e.index.navigateTo({url:"/pages/userCenter/about/about"})},signin(o){e.index.navigateTo({url:"/pages/login/login?refer=usercenter"})},signup(o){e.index.navigateTo({url:"/pages/register/register"})},signout(t){console.log("signout");const s=this.$store.state.apiBaseUrl+"/api/Account/logout";e.index.requestWithCookie({url:s,method:"POST",success:()=>{this.$store.commit("loginOut"),this.hasLogin=this.$store.getters.hasLogin(),this.$nextTick()}}),e.index.removeStorage({key:o.StorageKeys.cookies}),e.index.removeStorage({key:o.StorageKeys.taskContent}),e.index.removeStorage({key:o.StorageKeys.userName})},toSetting(o){e.index.navigateTo({url:"/pages/settings/settings"})}},onLoad(){this.$store.commit("initHasLogin"),this.$store.commit("initUserInfo")},created(){this.hasLogin=this.$store.getters.hasLogin()}};const s=e._export_sfc(t,[["render",function(o,t,s,i,r,n){return{a:r.imgsrc,b:e.t(n.userName),c:e.o(((...e)=>n.myPublishs&&n.myPublishs(...e))),d:e.o(((...e)=>n.history&&n.history(...e))),e:e.o(((...e)=>n.taskReq&&n.taskReq(...e))),f:e.o(((...e)=>n.holds&&n.holds(...e))),g:e.o((e=>n.holds(0))),h:e.o((e=>n.holds(1))),i:e.o(((...e)=>n.myApply&&n.myApply(...e))),j:e.o(((...e)=>n.toReference&&n.toReference(...e))),k:e.o(((...e)=>n.toOrder&&n.toOrder(...e))),l:e.o(((...e)=>n.toAbout&&n.toAbout(...e))),m:e.o(((...e)=>n.toSetting&&n.toSetting(...e))),n:e.o(((...e)=>n.signout&&n.signout(...e))),o:n.hasLogin,p:e.o(((...e)=>n.signin&&n.signin(...e))),q:e.o(((...e)=>n.signup&&n.signup(...e))),r:!n.hasLogin}}]]);wx.createPage(s);
