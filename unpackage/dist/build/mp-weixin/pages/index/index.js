"use strict";const t=require("../../common/vendor.js"),e={data:()=>({title:"Hello",curBranchid:"",taskTypeName:"全部",status:"more",contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}),onLoad(){console.log("page index onload")},mounted(){this.$store.dispatch("fetchTasks",{count:10,offset:0,branchid:""}).then((t=>{this.$store.commit("setTasks",{taskTypeName:"全部",data:t})})).catch((t=>{console.error("获取数据失败：",t)}))},computed:{tasks:{get(){return this.$store.getters.getTasks(this.taskTypeName)},set(t){this.$store.commit("setTasks",{taskTypeName:this.taskTypeName,data:t})}},branchTypes(){return[{id:"",name:"全部"},...this.$store.state.branchs]},total(){return this.$data.$total},maxIndex(){return this.tasks.length>0?this.tasks[this.tasks.length-1].id:0}},methods:{search(e){console.log("confirm:",e),e.value,t.index.navigateTo({url:"/pages/searchResult/searchResult"})},searchByTpe(e,s){this.curBranchid=e,this.taskTypeName=s;let a=this.$store.state.apiBaseUrl+"/api/Assignment/type/"+e;t.index.requestWithCookie({url:a,success:e=>{console.log(e),200===e.statusCode?this.tasks=e.data:t.index.showToast({title:"网络出错了！"})}})},inputEvent(t){console.log(t)},changeEvent(t){console.log(t)},modelChange(t){console.log(t)},backtotop(e){t.index.pageScrollTo({selector:"#app",scrollTop:0})}},onReachBottom(){let t=this.maxIndex;this.status="loading",this.$store.dispatch("fetchTasks",{count:10,offset:t,branchid:this.curBranchid}).then((t=>{this.$store.commit("updateTasks",{taskTypeName:this.taskTypeName,data:t}),this.status="more"})).catch((t=>{console.error("获取数据失败：",t)}))},async onPullDownRefresh(){await this.$store.dispatch("fetchBranchs"),await this.$store.dispatch("fetchTaskTypes"),this.$store.dispatch("fetchTasks",{count:10,offset:0,branchid:this.curBranchid}).then((t=>{this.$store.commit("setTasks",{taskTypeName:this.taskTypeName,data:t})})).catch((t=>{console.error("获取数据失败：",t)}))}};if(!Array){(t.resolveComponent("uni-search-bar")+t.resolveComponent("cardinfo")+t.resolveComponent("uni-load-more"))()}Math||((()=>"../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js")+(()=>"../../components/cardinfo/cardinfo.js")+(()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js"))();const s=t._export_sfc(e,[["render",function(e,s,a,o,n,r){return{a:t.o(r.search),b:t.p({radius:"5",placeholder:"搜索任务",clearButton:"auto",cancelButton:"none"}),c:t.f(r.branchTypes,((e,s,a)=>({a:t.t(e.name),b:e.id,c:t.o((t=>r.searchByTpe(e.id,e.name)),e.id)}))),d:t.f(r.tasks,((e,s,a)=>({a:"0c9de768-1-"+a,b:t.p({task:e,editable:!1,mode:"waitfor"}),c:e.id}))),e:t.p({iconType:"auto",contentText:n.contentText,status:n.status}),f:t.o(((...t)=>r.backtotop&&r.backtotop(...t)))}}]]);wx.createPage(s);
