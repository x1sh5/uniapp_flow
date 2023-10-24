"use strict";const e=require("../../common/vendor.js"),t={data:()=>({logintips:"",nameCheckTip:"",nameVerify:!1,pwdCheckTip:"",pwdVerify:!1,pwdVerifyTip:"",pwdAffirm:!1,pwd:"",emailCheckTip:"",emailVerify:!1,phoneCheckTip:"",phoneVerify:!1}),methods:{nameCheckEvent(t){console.log(t);let i=t.detail.value;if(i.length<1)return void(this.nameCheckTip="姓名不能为空");let s=this.$store.state.apiBaseUrl+"/api/Account/namecheck?username="+encodeURI(i);e.index.request({url:s,success:e=>{200===e.statusCode&&(this.nameCheckTip=e.data.data.msg,e.data.data.status&&(this.nameVerify=!0))}})},pwdCheckEvent(e){console.log(e);let t=e.detail.value;t.length<8?this.pwdCheckTip="长度必须大于7位":/[A-Z]/.test(t)?/\d/.test(t)?/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(t)?(this.pwdCheckTip="",this.pwd=t,this.pwdVerify=!0):this.pwdCheckTip="密码中必须要有特殊字母":this.pwdCheckTip="密码中必须要有数字":this.pwdCheckTip="密码中必须要有大写字母"},pwdVerifyEvent(e){console.log(e),e.detail.value===this.pwd?this.pwdAffirm=!0:this.pwdVerifyTip="必须跟密码保持一致。"},emailCheckEvent(t){console.log(t);let i=t.detail.value;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i))return void(this.emailCheckTip="邮箱格式不正确");let s=this.$store.state.apiBaseUrl+"/api/Account/emailcheck?email="+encodeURI(i);e.index.request({url:s,success:e=>{200===e.statusCode&&(this.emailCheckTip=e.data.data.msg,e.data.data.status&&(this.emailVerify=!0))}})},phoneCheckEvent(t){console.log(t);let i=t.detail.value,s=this.$store.state.apiBaseUrl+"/api/Account/phonecheck?phoneNo="+encodeURI(i);e.index.request({url:s,success:e=>{this.phoneCheckTip=e.data.data.msg,e.data.data.status&&(this.phoneVerify=!0)}})},register(t){console.log(t);let i={userName:t.detail.value.name,phoneNo:t.detail.value.phone,password:t.detail.value.affirm,email:t.detail.value.email},s=this.$store.state.apiBaseUrl+"/api/Account/register";e.index.request({url:s,method:"POST",data:i,success:t=>{200===t.statusCode?e.index.showModal({title:"",content:"注册成功",cancelText:"返回",confirmText:"去登录",success:function(t){t.confirm?e.index.switchTab({url:"/pages/userCenter/userCenter"}):t.cancel&&console.log("用户点击取消")}}):this.logintips=t.data.message}})}}};const i=e._export_sfc(t,[["render",function(t,i,s,a,n,c){return{a:e.o(((...e)=>c.nameCheckEvent&&c.nameCheckEvent(...e))),b:e.t(n.nameCheckTip),c:e.o(((...e)=>c.pwdCheckEvent&&c.pwdCheckEvent(...e))),d:e.t(n.pwdCheckTip),e:e.o(((...e)=>c.pwdVerifyEvent&&c.pwdVerifyEvent(...e))),f:e.t(n.pwdVerifyTip),g:e.o(((...e)=>c.emailCheckEvent&&c.emailCheckEvent(...e))),h:e.t(n.emailCheckTip),i:e.o(((...e)=>c.phoneCheckEvent&&c.phoneCheckEvent(...e))),j:e.t(n.phoneCheckTip),k:e.t(n.logintips),l:e.o(((...e)=>c.register&&c.register(...e)))}}]]);wx.createPage(i);