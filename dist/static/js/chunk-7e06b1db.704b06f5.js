(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e06b1db"],{"168f":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{attrs:{flat:"",loading:t.$store.state.isLoading}},[i("v-card-title",[t._v(" "+t._s(t.vol.name)+" ")]),i("v-simple-table",{attrs:{dense:""}},[i("tbody",[i("tr",[i("td",[t._v("简介")]),i("td",[t._v(t._s(t.vol.description))])]),i("tr",[i("td",[t._v("日期")]),i("td",[t._v(t._s(t.vol.date))])]),i("tr",[i("td",[t._v("时间")]),i("td",[t._v(t._s(t.vol.time))])]),i("tr",[i("td",[t._v("校内时长")]),i("td",[t._v(t._s(t.timeToHint(t.vol.inside)))])]),i("tr",[i("td",[t._v("校外时长")]),i("td",[t._v(t._s(t.timeToHint(t.vol.outside)))])]),i("tr",[i("td",[t._v("大型时长")]),i("td",[t._v(t._s(t.timeToHint(t.vol.large)))])]),i("tr",[i("td",[t._v("人数")]),i("td",[t._v(t._s(t.vol.stuMax))])]),i("tr",[i("td",[t._v("已报名")]),i("td",[t._v(t._s(t.vol.stuNow))])]),i("tr",[i("td",[t._v("状态")]),i("td",[t._v(t._s(t.vol.status))])])])])],1)},s=[],a=(i("d3b7"),i("c13c")),o=i("bc3a"),r=i.n(o),l={name:"volinfo",props:["volid"],data:function(){return{vol:{type:void 0,message:void 0,name:"加载中...",date:void 0,time:void 0,stuMax:void 0,stuNow:void 0,description:void 0,status:void 0,inside:void 0,outside:void 0,large:void 0}}},created:function(){this.init()},methods:{timeToHint:function(t){var e=parseInt(t/60),i=t%60;return 0!=e?e+" 小时 "+i+" 分钟":i+"分钟"},init:function(){var t=this;0!=this.volid&&void 0!=this.volid&&(this.$store.commit("loading",!0),r.a.get("/volunteer/fetch/"+this.volid).then((function(e){console.log(e.data),"ERROR"==e.data.type?a["a"].toasts.error(e.data.message):"SUCCESS"==e.data.type?t.vol=e.data:a["a"].toasts.error("未知错误")})).catch((function(t){a["a"].toasts.error(t)})).finally((function(){t.$store.commit("loading",!1)})))},fetch:function(){this.vol={type:void 0,message:void 0,name:"加载中...",date:void 0,time:void 0,stuMax:void 0,stuNow:void 0,description:void 0,status:void 0,inside:void 0,outside:void 0,large:void 0},this.init()}},watch:{volid:function(){this.fetch()}}},c=l,d=i("2877"),u=i("6544"),h=i.n(u),v=i("b0af"),f=i("99d9"),m=i("1f4f"),p=Object(d["a"])(c,n,s,!1,null,null,null);e["a"]=p.exports;h()(p,{VCard:v["a"],VCardTitle:f["c"],VSimpleTable:m["a"]})},"169a":function(t,e,i){"use strict";i("368e");var n=i("480e"),s=i("4ad4"),a=i("b848"),o=i("75eb"),r=i("e707"),l=i("e4d3"),c=i("21be"),d=i("f2e7"),u=i("a293"),h=i("58df"),v=i("d9bd"),f=i("80d2");const m=Object(h["a"])(s["a"],a["a"],o["a"],r["a"],l["a"],c["a"],d["a"]);e["a"]=m.extend({name:"v-dialog",directives:{ClickOutside:u["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[("v-dialog "+this.contentClass).trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(e=this.previousActiveElement)||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&Object(v["e"])("full-width",this)},beforeMount(){this.$nextTick(()=>{this.isBooted=this.isActive,this.isActive&&this.show()})},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick(()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout(()=>this.animate=!1,150)})},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):r["a"].options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick(()=>{this.$nextTick(()=>{this.previousActiveElement=document.activeElement,this.$refs.content.focus(),this.bind()})})},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===f["x"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick(()=>t&&t.focus())}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some(t=>t.contains(e))){const t=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find(t=>!t.hasAttribute("disabled"));e&&e.focus()}},genContent(){return this.showLazyContent(()=>[this.$createElement(n["a"],{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"document",tabindex:this.isActive?0:void 0,...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])])},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:"none"===this.maxWidth?void 0:Object(f["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(f["g"])(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"368e":function(t,e,i){},"68f7":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("v-card",{attrs:{color:"primary",dark:""}},[i("v-card-title",[t._v(" 义工列表 "),i("v-spacer")],1)],1),t._l(t.volworks,(function(e){return i("v-card",{key:e.id},[i("v-card-title",[t._v(t._s(e.name))]),i("v-card-text",[t._v(" "+t._s(e.description)+" ")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"primary"},on:{click:function(i){return t.volDetail(e.id)}}},[i("v-icon",{attrs:{left:""}},[t._v("mdi-clipboard-text")]),t._v(" 详情 ")],1),i("v-btn",{attrs:{color:"primary"},on:{click:function(i){return t.participants(e.id)}}},[i("v-icon",{attrs:{left:""}},[t._v("mdi-clipboard-text")]),t._v(" 查看已报名 ")],1),t.granted()?i("v-btn",{attrs:{color:"primary"},on:{click:function(i){return t.volSignUp(e.id)}}},[i("v-icon",{attrs:{left:""}},[t._v("mdi-account-plus")]),t._v(" 报名 ")],1):t._e()],1)],1)})),i("v-dialog",{attrs:{"max-width":"80%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("volinfo",{attrs:{volid:t.volid}}),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("关闭")])],1)],1)],1),i("v-dialog",{attrs:{"max-width":"80%"},model:{value:t.dialog_participant,callback:function(e){t.dialog_participant=e},expression:"dialog_participant"}},[i("v-card",[i("v-card-title",[t._v("报名列表")]),i("v-card-text",[i("v-data-table",{attrs:{"fixed-header":"",headers:t.headers,items:t.participantsLst,search:t.search,loading:t.$store.state.isLoading,"loading-text":"加载中...","no-data-text":"没有数据哦","no-results-text":"没有结果"}})],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:function(e){t.dialog_participant=!1}}},[t._v("关闭")])],1)],1)],1),i("v-dialog",{attrs:{"max-width":"80%"},model:{value:t.dialog1,callback:function(e){t.dialog1=e},expression:"dialog1"}},[i("v-card",[i("v-simple-table",{staticStyle:{margin:"20px"}},[i("thead",[i("td",[t._v("学号")]),i("td",[t._v("删除")])]),i("tbody",[t._l(t.stulstSelected,(function(e,n){return i("tr",{key:n},[i("td",[t._v(t._s(t.mp[e]))]),i("td",[i("v-btn",{staticClass:"mx-2",attrs:{fab:"",dark:"","x-small":"",color:"primary"},on:{click:function(e){return t.delFromList(n)}}},[i("v-icon",{attrs:{dark:""}},[t._v(" mdi-minus ")])],1)],1)])})),i("tr",[i("td",[i("v-select",{attrs:{"prepend-icon":"mdi-switch",label:"选定学生",items:t.stulst,"item-text":"name","item-value":"id"},model:{value:t.stu_new,callback:function(e){t.stu_new=e},expression:"stu_new"}})],1),i("td",[i("v-btn",{staticClass:"mx-2",attrs:{fab:"",dark:"","x-small":"",color:"primary"},on:{click:t.addToList}},[i("v-icon",{attrs:{dark:""}},[t._v(" mdi-plus ")])],1)],1)])],2)]),i("p",[t._v("当前选中了"+t._s(t.stulstSelected.length)+"个学生哦，你可以点击加号添加一个学生")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:function(e){return t.signupVolunteer(t.volid)}}},[t._v("确定")]),i("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:function(e){t.dialog1=!1}}},[t._v("关闭")])],1)],1)],1)],2)},s=[],a=(i("a434"),i("b0c0"),i("d3b7"),i("96cf"),i("1da1")),o=i("c13c"),r=i("bade"),l=i("168f"),c=i("a841"),d=i("bc3a"),u=i.n(d),h={data:function(){return{search:"",headers:[{text:"学号",value:"stuId",align:"start",sortable:!0},{text:"姓名",value:"stuName"}],volworks:[],dialog:!1,dialog_participant:!1,dialog1:!1,submitThoughtDialog:!1,volid:void 0,onlyDisplayCurrentClass:!0,stulst:void 0,stulstSelected:[],stu_new:void 0,participantsLst:[],stu:void 0,thought:void 0,mp:{}}},components:{volinfo:l["a"]},mounted:function(){this.pageload()},methods:{pageload:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c["a"].checkToken(t);case 2:t.fetchVol((function(e){t.volworks=e,t.$store.commit("lastSeenVol",t.volworks)}));case 3:case"end":return e.stop()}}),e)})))()},granted:function(){return this.$store.state.info.permission<r["a"].teacher},volSignUp:function(t){var e=this;console.log("SignUp: "+t),this.dialog1=!0,this.stulst=void 0,this.stulstSelected=[],c["a"].fetchStudentList(this.$store.state.info.class,(function(i){for(var n in e.stulst=i||void 0,e.volid=t,e.stulst)e.mp[e.stulst[n].id]=e.stulst[n].name;console.log(e.mp)}))},signupVolunteer:function(t){var e=this;0!=this.stulstSelected.length?(u.a.post("/volunteer/signup/"+t,{stulst:this.stulstSelected}).then((function(t){if("SUCCESS"==t.data.type)for(var i in o["a"].toasts.success(t.data.message),e.form)e.form[i]=void 0;else o["a"].toasts.error(t.data.message)})).catch((function(t){o["a"].toasts.error(t)})).finally((function(){e.$store.commit("loading",!1)})),this.dialog1=!1):o["a"].toasts.error("报名列表为空")},participants:function(t){var e=this;this.dialog_participant=!0,this.volid=t,this.participantsLst=[],u.a.get("/volunteer/signerList/"+t,{}).then((function(t){console.log(t.data),"SUCCESS"==t.data.type?(o["a"].toasts.success(t.data.message),e.participantsLst=t.data.result):o["a"].toasts.error(t.data.message)})).catch((function(t){o["a"].toasts.error(t)})).finally((function(){e.$store.commit("loading",!1)}))},volDetail:function(t){console.log("Detail:"+t),this.volid=t,this.dialog=!0},fetchVol:function(t){this.granted()?this.fetchCurrentClassVol(t):this.fetchAllVol(t)},fetchCurrentClassVol:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return e.$store.commit("loading",!0),i.next=3,c["a"].fetchClassVolunter(e.$store.state.info.class,(function(e){e?t(e):o["a"].toasts.error("获取义工列表失败")}));case 3:e.$store.commit("loading",!1);case 4:case"end":return i.stop()}}),i)})))()},fetchAllVol:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return e.$store.commit("loading",!0),i.next=3,c["a"].fetchAllVolunter((function(e){e?t(e):o["a"].toasts.error("获取义工列表失败")}));case 3:e.$store.commit("loading",!1);case 4:case"end":return i.stop()}}),i)})))()},addToList:function(){var t=!1;for(var e in void 0==this.stu_new&&(t=!0),this.stulstSelected)if(this.stulstSelected[e]==this.stu_new){t=!0;break}t?o["a"].toasts.error("请不要重复报名"):this.stulstSelected.push(this.stu_new),this.stu_new=void 0},delFromList:function(t){this.stulstSelected.splice(t,1)}}},v=h,f=(i("7974"),i("2877")),m=i("6544"),p=i.n(m),g=i("8336"),b=i("b0af"),_=i("99d9"),w=i("a523"),x=i("8fea"),k=i("169a"),y=i("132d"),C=i("b974"),S=i("1f4f"),$=i("2fa4"),A=Object(f["a"])(v,n,s,!1,null,"745c6b04",null);e["default"]=A.exports;p()(A,{VBtn:g["a"],VCard:b["a"],VCardActions:_["a"],VCardText:_["b"],VCardTitle:_["c"],VContainer:w["a"],VDataTable:x["a"],VDialog:k["a"],VIcon:y["a"],VSelect:C["a"],VSimpleTable:S["a"],VSpacer:$["a"]})},7974:function(t,e,i){"use strict";i("eba7")},a434:function(t,e,i){"use strict";var n=i("23e7"),s=i("23cb"),a=i("a691"),o=i("50c4"),r=i("7b0b"),l=i("65f0"),c=i("8418"),d=i("1dde"),u=i("ae40"),h=d("splice"),v=u("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,m=Math.min,p=9007199254740991,g="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!h||!v},{splice:function(t,e){var i,n,d,u,h,v,b=r(this),_=o(b.length),w=s(t,_),x=arguments.length;if(0===x?i=n=0:1===x?(i=0,n=_-w):(i=x-2,n=m(f(a(e),0),_-w)),_+i-n>p)throw TypeError(g);for(d=l(b,n),u=0;u<n;u++)h=w+u,h in b&&c(d,u,b[h]);if(d.length=n,i<n){for(u=w;u<_-n;u++)h=u+n,v=u+i,h in b?b[v]=b[h]:delete b[v];for(u=_;u>_-n+i;u--)delete b[u-1]}else if(i>n)for(u=_-n;u>w;u--)h=u+n-1,v=u+i-1,h in b?b[v]=b[h]:delete b[v];for(u=0;u<i;u++)b[u+w]=arguments[u+2];return b.length=_-n+i,d}})},b0c0:function(t,e,i){var n=i("83ab"),s=i("9bf2").f,a=Function.prototype,o=a.toString,r=/^\s*function ([^ (]*)/,l="name";n&&!(l in a)&&s(a,l,{configurable:!0,get:function(){try{return o.call(this).match(r)[1]}catch(t){return""}}})},eba7:function(t,e,i){}}]);