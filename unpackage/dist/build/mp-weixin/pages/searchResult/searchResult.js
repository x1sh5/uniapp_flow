"use strict";const e=require("../../common/vendor.js"),s=require("../../common/storageKeys.js"),t={data:()=>({status:"more",contentText:{contentdown:"",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},searchWord:"",hots:[],tasks:[],recents:[],show:!0}),onLoad(){console.log("page index onload")},mounted(){e.index.requestWithCookie({url:this.$store.state.apiBaseUrl+"/api/Information/popular",success:e=>{200===e.statusCode&&(this.hots=e.data)}})},computed:{maxid(){return 0===this.tasks.length?0:this.tasks[this.tasks.length-1].id}},methods:{search(t){this.searchWord=t.value,e.index.requestWithCookie({url:this.$store.state.apiBaseUrl+"/api/Assignment/search/"+encodeURI(this.searchWord)+"?count=10&offset="+this.maxid,success:s=>{200===s.statusCode?(this.tasks=s.data,this.show=!1):e.index.showToast({title:"网络出错！"})}});const o=this.recents.findIndex((e=>e===t.value));-1!==o?(this.recents.splice(o,1),this.recents.unshift(t.value)):(this.recents.length>=10&&this.recents.pop(),this.recents.unshift(t.value)),e.index.setStorage({key:s.StorageKeys.searchs,data:this.recents})},searchx(e){let s={};s.value=e,this.search(s)},clear(e){this.tasks=[],this.show=!0},del(t){const o=this.recents.findIndex((e=>e===t));-1!==o&&this.recents.splice(o,1),e.index.setStorage({key:s.StorageKeys.searchs,data:this.recents})}},onReachBottom(){this.status="loading",e.index.requestWithCookie({url:this.$store.state.apiBaseUrl+"/api/Assignment/search/"+encodeURI(this.searchWord)+"?count=10&offset="+this.maxid,success:s=>{200===s.statusCode?(this.tasks=s.data,this.status="more"):e.index.showToast({title:"网络出错！"})}})},onLoad(t){this.recents=e.index.getStorageSync(s.StorageKeys.searchs)||this.recents,e.index.request({url:this.$store.state.apiBaseUrl+"/api/Information/popular",success:e=>{200===e.statusCode&&(this.hots=e.data)}})}};if(!Array){(e.resolveComponent("uni-search-bar")+e.resolveComponent("cardinfo")+e.resolveComponent("uni-load-more"))()}Math||((()=>"../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js")+(()=>"../../components/cardinfo/cardinfo.js")+(()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js"))();const o=e._export_sfc(t,[["render",function(s,t,o,a,n,r){return e.e({a:e.o(r.clear),b:e.o(r.search),c:e.o((e=>n.searchWord=e)),d:e.p({radius:"5",placeholder:"搜索任务",focus:!0,clearButton:"auto",cancelButton:"none",modelValue:n.searchWord}),e:n.show},n.show?{f:e.f(n.recents,((s,t,o)=>({a:e.t(s),b:e.o((e=>r.searchx(s)),s),c:e.o((e=>r.del(s)),s),d:s}))),g:e.f(n.hots,((s,t,o)=>({a:e.t(s),b:e.o((e=>r.searchx(s)),s),c:s})))}:{},{h:e.f(n.tasks,((s,t,o)=>({a:"42edecf4-1-"+o,b:e.p({task:s,editable:!1,mode:"waitfor"}),c:s.id}))),i:e.p({iconType:"auto",contentText:n.contentText,status:n.status})})}]]);wx.createPage(o);
