"use strict";const s=require("../../common/vendor.js"),t=require("../../common/Task.js"),e={data:()=>({hasPushlishs:!1,$publishs:[]}),computed:{publishs(){return this.$data.$publishs},maxid(){return 0===this.$data.$publishs.length?0:this.$data.$publishs[this.$data.$publishs.length-1].id}},methods:{mode:s=>s.status===t.TaskStatus.WaitForAccept?"waitfor":s.status===t.TaskStatus.Unfinished?"undone":"done",toDetails(t){s.index.navigateTo({url:"/pages/myTaskDetail/myTaskDetail?id="+t})},removeById(s){let t=this.publishs.findIndex((t=>t.id==s));-1!=t&&this.publishs.splice(t,1)}},onLoad(){this.hasPushlishs||(console.log("get user task"),s.index.requestWithCookie({url:this.$store.state.apiBaseUrl+"/api/Assignment/user?count=10&offset="+this.maxid,success:s=>{this.$data.$publishs=s.data,this.hasPushlishs=!0}}))},onReachBottom(){}};if(!Array){s.resolveComponent("cardinfo")()}Math;const i=s._export_sfc(e,[["render",function(t,e,i,a,o,h){return{a:s.f(h.publishs,((t,e,i)=>({a:s.o((s=>h.toDetails(t.id)),t.id),b:"64bd3aa6-0-"+i,c:s.p({task:t,editable:!1,mode:h.mode(t)}),d:t.id})))}}]]);wx.createPage(i);