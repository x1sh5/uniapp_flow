"use strict";const e=require("../../common/vendor.js"),a={data:()=>({selected:void 0,$branchTypes:[],ctype:[{text:"单卡",value:0},{text:"多卡",value:1}],defaultT:0,mode:""}),computed:{branchTypes(){return this.$store.state.branchs}},methods:{editTask(a){console.log(a),e.index.navigateTo({url:"/pages/newTask/newTask?branchid="+a})},createTask(a){console.log("createTask",a),e.index.navigateTo({url:"/pages/newTask/newTask?branchid="+this.selected.id+"&createType="+this.defaultT+"&mode="+this.mode})},typeChange(e){console.log("typechange",e),1===e.detail.value&&(this.mode="mutiple",this.$refs.dataSelect.statusDisable(!0)),0===e.detail.value&&(this.mode="single",this.$refs.dataSelect.statusDisable(!1))},receiveDataFromChild(e){console.log("data",e),this.selected=e,console.log("this.selected",this.selected)}},async created(){console.log("addtask create")},onLoad(){console.log("onload")},onShow(){console.log("onshow")}};if(!Array){(e.resolveComponent("uni-data-checkbox")+e.resolveComponent("uni-data-select"))()}Math||((()=>"../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js")+(()=>"../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js"))();const t=e._export_sfc(a,[["render",function(a,t,o,s,c,n){return{a:e.o(n.typeChange),b:e.o((e=>c.defaultT=e)),c:e.p({mode:"button",localdata:c.ctype,modelValue:c.defaultT}),d:e.sr("dataSelect","2ce241b4-1"),e:e.o(n.receiveDataFromChild),f:e.p({localdata:n.branchTypes,showProp:"name"}),g:e.o(((...e)=>n.createTask&&n.createTask(...e))),h:!Boolean(c.selected)}}]]);wx.createPage(t);
