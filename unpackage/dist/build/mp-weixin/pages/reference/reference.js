"use strict";const e=require("../../common/vendor.js"),t={data:()=>({}),computed:{datas(){return this.$store.getters["Refer/refers"]}},methods:{detail(t){e.index.navigateTo({url:"detail/detail?id="+t})},newRefer(t){e.index.navigateTo({url:"new/new"})}},onLoad(){let t=this.$store.state.apiBaseUrl+"/api/Reference/count",r=this.$store.state.apiBaseUrl+"/api/Reference/gets";e.index.request({url:t,success:t=>{e.index.requestWithCookie({url:r,method:"GET",success:e=>{this.$store.commit("Refer/updateRefers",e.data)}})}})}};const r=e._export_sfc(t,[["render",function(t,r,s,a,i,n){return{a:e.f(n.datas,((t,r,s)=>({a:e.t(t.title),b:t.id,c:e.o((e=>n.detail(t.id)),t.id)}))),b:e.o(((...e)=>n.newRefer&&n.newRefer(...e)))}}]]);wx.createPage(r);