"use strict";const t=require("../../common/vendor.js"),e={data:()=>({current:0,items:["全部","已完成","未完成"],all:[],status:"more",contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}),computed:{incompletes(){return this.all.filter((t=>0===t.status))},completes(){return this.all.filter((t=>1===t.status))},maxid(){if(this.all.length<=0)return 0;const t=this.all[0];for(let e of this.all)t.id<e.id&&(t=e);return t.id}},mounted(){let e=this.$store.state.apiBaseUrl+"/api/Bill";t.index.request({url:e,success:t=>{200===t.statusCode&&(this.all=t.data)}})},methods:{onClickItem(t){this.current!==t.currentIndex&&(this.current=t.currentIndex)}},onLoad(){this.$store.state.$hasLogin||t.index.navigateTo({url:"/pages/login/login?refer=order"})},onReachBottom(){this.maxIndex,this.status="loading";let e=this.$store.state.apiBaseUrl+"/api/Bill?count=10&offset="+this.maxid;t.index.request({url:e,success:t=>{200===t.statusCode&&(this.all=t.data,this.status="more")}})}};if(!Array){(t.resolveComponent("uni-segmented-control")+t.resolveComponent("bill"))()}Math||((()=>"../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js")+(()=>"../../components/bill/bill.js"))();const n=t._export_sfc(e,[["render",function(e,n,s,r,o,l){return t.e({a:t.o(l.onClickItem),b:t.p({current:o.current,values:o.items,"style-type":"text","active-color":"#4cd964"}),c:0===o.current},0===o.current?{d:t.f(o.all,((e,n,s)=>({a:"37bb4044-1-"+s,b:t.p({bill:e}),c:e.id})))}:{},{e:1===o.current},1===o.current?{f:t.f(l.completes,((e,n,s)=>({a:"37bb4044-2-"+s,b:t.p({bill:e}),c:e.id})))}:{},{g:2===o.current},2===o.current?{h:t.f(l.incompletes,((e,n,s)=>({a:"37bb4044-3-"+s,b:t.p({bill:e}),c:e.id})))}:{})}]]);wx.createPage(n);
