"use strict";const t=require("../../../../common/vendor.js");const o={name:"UniFab",emits:["fabClick","trigger"],props:{pattern:{type:Object,default:()=>({})},horizontal:{type:String,default:"left"},vertical:{type:String,default:"bottom"},direction:{type:String,default:"horizontal"},content:{type:Array,default:()=>[]},showProp:{type:String,default:()=>"name"},show:{type:Boolean,default:!1},popMenu:{type:Boolean,default:!0}},data:()=>({fabShow:!1,isShow:!1,isAndroidNvue:!1,styles:{color:"#3c3e49",selectedColor:"#007AFF",backgroundColor:"#fff",buttonColor:"#007AFF",iconColor:"#fff",icon:"plusempty"}}),computed:{contentWidth(t){return 55*(this.content.length+1)+15+"px"},contentWidthMin:()=>"55px",boxWidth(){return this.getPosition(3,"horizontal")},boxHeight(){return this.getPosition(3,"vertical")},leftBottom(){return this.getPosition(0,"left","bottom")},rightBottom(){return this.getPosition(0,"right","bottom")},leftTop(){return this.getPosition(0,"left","top")},rightTop(){return this.getPosition(0,"right","top")},flexDirectionStart(){return this.getPosition(1,"vertical","top")},flexDirectionEnd(){return this.getPosition(1,"vertical","bottom")},horizontalLeft(){return this.getPosition(2,"horizontal","left")},horizontalRight(){return this.getPosition(2,"horizontal","right")},nvueBottom:()=>(t.index.getSystemInfoSync().windowBottom,30)},watch:{pattern:{handler(t,o){this.styles=Object.assign({},this.styles,t)},deep:!0}},created(){this.isShow=this.show,0===this.top&&(this.fabShow=!0),this.styles=Object.assign({},this.styles,this.pattern)},methods:{_onClick(){this.$emit("fabClick"),this.popMenu&&(this.isShow=!this.isShow)},open(){this.isShow=!0},close(){this.isShow=!1},_onItemClick(t,o){this.isShow&&this.$emit("trigger",{index:t,item:o})},getPosition(t,o,i){return 0===t?this.horizontal===o&&this.vertical===i:1===t?this.direction===o&&this.vertical===i:2===t?this.direction===o&&this.horizontal===i:this.isShow&&this.direction===o?this.contentWidth:this.contentWidthMin}}};if(!Array){t.resolveComponent("uni-icons")()}Math;const i=t._export_sfc(o,[["render",function(o,i,e,n,r,s){return t.e({a:e.popMenu&&(s.leftBottom||s.rightBottom||s.leftTop||s.rightTop)&&e.content.length>0},e.popMenu&&(s.leftBottom||s.rightBottom||s.leftTop||s.rightTop)&&e.content.length>0?t.e({b:s.flexDirectionStart||s.horizontalLeft},(s.flexDirectionStart||s.horizontalLeft,{}),{c:t.f(e.content,((o,i,n)=>({a:o.active?o.selectedIconPath:o.iconPath,b:t.t(o[e.showProp]),c:o.active?r.styles.selectedColor:r.styles.color,d:i,e:t.o((t=>s._onItemClick(i,o)),i)}))),d:r.isShow?1:"",e:s.flexDirectionEnd||s.horizontalRight},(s.flexDirectionEnd||s.horizontalRight,{}),{f:"left"===e.horizontal?1:"",g:"right"===e.horizontal?1:"",h:"vertical"===e.direction?1:"",i:s.flexDirectionStart?1:"",j:s.flexDirectionEnd?1:"",k:r.isAndroidNvue?"":1,l:s.boxWidth,m:s.boxHeight,n:r.styles.backgroundColor,o:s.leftBottom?1:"",p:s.rightBottom?1:"",q:s.leftTop?1:"",r:s.rightTop?1:"",s:t.s(s.nvueBottom)}):{},{t:r.isShow&&e.content.length>0?1:"",v:t.p({type:r.styles.icon,color:r.styles.iconColor,size:"32"}),w:s.leftBottom?1:"",x:s.rightBottom?1:"",y:s.leftTop?1:"",z:s.rightTop?1:"",A:r.isAndroidNvue?"":1,B:r.styles.buttonColor,C:s.nvueBottom,D:t.o(((...t)=>s._onClick&&s._onClick(...t)))})}]]);wx.createComponent(i);
