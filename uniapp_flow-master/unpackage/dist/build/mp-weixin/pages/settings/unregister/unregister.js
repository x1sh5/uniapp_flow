"use strict";const e=require("../../../common/vendor.js"),o={data:()=>({known:!1}),methods:{checkboxChange(e){console.log(e),e.detail.value[0]?this.known=!0:this.known=!1},unregister(o){let n=this.$store.state.apiBaseUrl+"/api/Account/unregister/";e.index.showModal({title:"请输入密码确认！",editable:!0,placeholderText:"密码...",success:o=>{console.log(o),o.confirm&&e.index.uploadFileWithCookie({url:n,filePath:"123",name:"123",formData:{password:o.content},success:o=>{console.log(o),200===o.statusCode?e.index.showModal({content:o.data,showCancel:!1,success:o=>{this.$store.commit("disconnect"),e.index.clearStorageSync(),e.index.reLaunch({url:"/pages/userCenter/userCenter"})}}):e.index.showModal({content:o.data})}})}})}}};const n=e._export_sfc(o,[["render",function(o,n,t,s,c,a){return{a:e.o(((...e)=>a.checkboxChange&&a.checkboxChange(...e))),b:!c.known,c:e.o(((...e)=>a.unregister&&a.unregister(...e)))}}]]);wx.createPage(n);
