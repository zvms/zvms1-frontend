(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-177b8714"],{"168f":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{attrs:{flat:"",loading:t.$store.state.isLoading}},[i("v-card-title",[t._v(" "+t._s(t.vol.name)+" ")]),i("v-simple-table",{attrs:{dense:""}},[i("tbody",[i("tr",[i("td",[t._v("简介")]),i("td",[t._v(t._s(t.vol.description))])]),i("tr",[i("td",[t._v("日期")]),i("td",[t._v(t._s(t.vol.date))])]),i("tr",[i("td",[t._v("时间")]),i("td",[t._v(t._s(t.vol.time))])]),i("tr",[i("td",[t._v("校内时长")]),i("td",[t._v(t._s(t.vol.inside))])]),i("tr",[i("td",[t._v("校外时长")]),i("td",[t._v(t._s(t.vol.outside))])]),i("tr",[i("td",[t._v("大型时长")]),i("td",[t._v(t._s(t.vol.large))])]),i("tr",[i("td",[t._v("人数")]),i("td",[t._v(t._s(t.vol.stuMax))])]),i("tr",[i("td",[t._v("已报名")]),i("td",[t._v(t._s(t.vol.stuNow))])]),i("tr",[i("td",[t._v("状态")]),i("td",[t._v(t._s(t.vol.status))])])])])],1)},o=[],a=(i("d3b7"),i("c13c")),n=i("bc3a"),d=i.n(n),r={name:"volinfo",props:["volid"],data:function(){return{vol:{type:void 0,message:void 0,name:"加载中...",date:void 0,time:void 0,stuMax:void 0,stuNow:void 0,description:void 0,status:void 0,inside:void 0,outside:void 0,large:void 0}}},created:function(){this.init()},methods:{init:function(){var t=this;0!=this.volid&&void 0!=this.volid&&(this.$store.commit("loading",!0),d.a.get("/volunteer/fetch/"+this.volid).then((function(e){console.log(e.data),"ERROR"==e.data.type?a["a"].toasts.error(e.data.message):"SUCCESS"==e.data.type?t.vol=e.data:a["a"].toasts.error("未知错误")})).catch((function(t){a["a"].toasts.error(t)})).finally((function(){t.$store.commit("loading",!1)})))},fetch:function(){this.vol={type:void 0,message:void 0,name:"加载中...",date:void 0,time:void 0,stuMax:void 0,stuNow:void 0,description:void 0,status:void 0,inside:void 0,outside:void 0,large:void 0},this.init()}},watch:{volid:function(){this.fetch()}}},l=r,c=i("2877"),v=i("6544"),h=i.n(v),u=i("b0af"),g=i("99d9"),m=i("1f4f"),f=Object(c["a"])(l,s,o,!1,null,null,null);e["a"]=f.exports;h()(f,{VCard:u["a"],VCardTitle:g["c"],VSimpleTable:m["a"]})},"169a":function(t,e,i){"use strict";i("368e");var s=i("480e"),o=i("4ad4"),a=i("b848"),n=i("75eb"),d=i("e707"),r=i("e4d3"),l=i("21be"),c=i("f2e7"),v=i("a293"),h=i("58df"),u=i("d9bd"),g=i("80d2");const m=Object(h["a"])(o["a"],a["a"],n["a"],d["a"],r["a"],l["a"],c["a"]);e["a"]=m.extend({name:"v-dialog",directives:{ClickOutside:v["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[("v-dialog "+this.contentClass).trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(e=this.previousActiveElement)||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&Object(u["e"])("full-width",this)},beforeMount(){this.$nextTick(()=>{this.isBooted=this.isActive,this.isActive&&this.show()})},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick(()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout(()=>this.animate=!1,150)})},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):d["a"].options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick(()=>{this.$nextTick(()=>{this.previousActiveElement=document.activeElement,this.$refs.content.focus(),this.bind()})})},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===g["x"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick(()=>t&&t.focus())}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some(t=>t.contains(e))){const t=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find(t=>!t.hasAttribute("disabled"));e&&e.focus()}},genContent(){return this.showLazyContent(()=>[this.$createElement(s["a"],{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"document",tabindex:this.isActive?0:void 0,...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])])},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:"none"===this.maxWidth?void 0:Object(g["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(g["g"])(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"368e":function(t,e,i){},aa72:function(t,e,i){},ced2:function(t,e,i){"use strict";i("aa72")},dcad:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("v-card",[i("v-card-title",[t._v(" 未审核感想列表 "),i("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"搜索","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),i("v-card-text",[i("v-data-table",{attrs:{"fixed-header":"",headers:t.headers,items:t.thoughts,search:t.search,loading:t.$store.state.isLoading,"loading-text":"加载中...","no-data-text":"没有数据哦","no-results-text":"没有结果"},on:{"click:row":t.rowClick}})],1)],1),i("v-dialog",{attrs:{"max-width":"80%"},model:{value:t.dialog1,callback:function(e){t.dialog1=e},expression:"dialog1"}},[i("v-card",[i("v-card-title",[t._v("详细信息")]),i("v-simple-table",{staticStyle:{margin:"20px"}},[i("tbody",[i("tr",[i("td",[t._v("义工编号")]),i("td",[t._v(t._s(t.volid))])]),i("tr",[i("td",[t._v("义工日期")]),i("td",[t._v(t._s(t.volDate))])]),i("tr",[i("td",[t._v("义工时间")]),i("td",[t._v(t._s(t.volTime))])]),i("tr",[i("td",[t._v("义工详细信息")]),i("td",[t._v(t._s(t.volDesc))])]),i("tr",[i("td",[t._v("校内时长")]),i("td",[t._v(t._s(t.volTI))])]),i("tr",[i("td",[t._v("校外时长")]),i("td",[t._v(t._s(t.volTO))])]),i("tr",[i("td",[t._v("大型时长")]),i("td",[t._v(t._s(t.volTL))])]),i("tr",[i("td",[t._v("学号")]),i("td",[t._v(t._s(t.stuid))])]),i("tr",[i("td",[t._v("感想")]),i("td",[t._v(t._s(t.thought))])]),i("tr",[i("td",[t._v("发放的校内时长")]),i("td",[i("v-text-field",{attrs:{label:"不填为默认值","prepend-icon":"mdi-view-list"},model:{value:t.inside,callback:function(e){t.inside=e},expression:"inside"}})],1)]),i("tr",[i("td",[t._v("发放的校外时长")]),i("td",[i("v-text-field",{attrs:{label:"不填为默认值","prepend-icon":"mdi-view-list"},model:{value:t.outside,callback:function(e){t.outside=e},expression:"outside"}})],1)]),i("tr",[i("td",[t._v("发放的大型时长")]),i("td",[i("v-text-field",{attrs:{label:"不填为默认值","prepend-icon":"mdi-view-list"},model:{value:t.large,callback:function(e){t.large=e},expression:"large"}})],1)])])]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"primary",disabled:t.$store.state.isLoading},on:{click:function(e){return t.audit(1)}}},[t._v("通过 ")]),i("v-btn",{attrs:{color:"red",disabled:t.$store.state.isLoading},on:{click:function(e){return t.audit(2)}}},[t._v("拒绝 ")]),i("v-btn",{attrs:{color:"yellow",disabled:t.$store.state.isLoading},on:{click:function(e){return t.audit(3)}}},[t._v("打回 ")]),i("v-btn",{attrs:{color:"primary",disabled:t.$store.state.isLoading},on:{click:function(e){t.dialog1=!1}}},[t._v("取消 ")])],1)],1)],1)],1)},o=[],a=(i("a4d3"),i("e01a"),i("d3b7"),i("96cf"),i("1da1")),n=i("c13c"),d=i("bade"),r=(i("168f"),i("a841"),i("bc3a")),l=i.n(r),c={data:function(){return{search:"",headers:[{text:"义工编号",value:"volId",align:"start",sortable:!0},{text:"学号",value:"stuId"}],thoughts:void 0,dialog1:!1,stuid:void 0,volid:void 0,thought:void 0,volTime:void 0,volDate:void 0,volDesc:void 0,volTI:void 0,volTO:void 0,volTL:void 0,inside:void 0,outside:void 0,large:void 0}},mounted:function(){this.pageload()},methods:{pageload:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.commit("loading",!0),e.next=3,l.a.get("/volunteer/unaudited",{}).then((function(e){console.log(e.data),"SUCCESS"==e.data.type?(n["a"].toasts.success(e.data.message),t.thoughts=e.data.result):n["a"].toasts.error(e.data.message)})).catch((function(t){n["a"].toasts.error(t)})).finally((function(){t.$store.commit("loading",!1)}));case 3:t.$store.commit("loading",!1);case 4:case"end":return e.stop()}}),e)})))()},granted:function(){return this.$store.state.info.permission<d["a"].teacher},rowClick:function(t){var e=this;this.dialog1=!0,this.volid=t.volId,this.stuid=t.stuId,this.thought=t.thought,this.$store.commit("loading",!0),l.a.get("/volunteer/fetch/"+this.volid,{}).then((function(t){console.log(t.data),"SUCCESS"==t.data.type?(n["a"].toasts.success(t.data.message),e.volDate=t.data.date,e.volTime=t.data.time,e.volDesc=t.data.description,e.volTI=t.data.inside,e.volTO=t.data.outside,e.volTL=t.data.large):n["a"].toasts.error(t.data.message)})).catch((function(t){n["a"].toasts.error(t)})).finally((function(){e.$store.commit("loading",!1)})),this.$store.commit("loading",!1)},audit:function(t){var e=this,i=n["a"].confirm();i&&(this.dialog1=!1,1==t?(void 0!=this.inside&&""!=this.inside||(this.inside=this.volTI),void 0!=this.outside&&""!=this.outside||(this.outside=this.volTO),void 0!=this.large&&""!=this.large||(this.large=this.volTL)):(this.inside="0",this.outside="0",this.large="0"),console.log(t,this.inside,this.outside,this.large),this.$store.commit("loading",!0),l.a.post("/volunteer/audit/"+this.volid,{thought:[{stuId:this.stuid,status:t,inside:this.inside,outside:this.outside,large:this.large}]}).then((function(t){console.log(t.data),"SUCCESS"==t.data.type?(n["a"].toasts.success(t.data.message),e.volDate=t.data.date,e.volTime=t.data.time,e.volDesc=t.data.description,e.volTI=t.data.inside,e.volTO=t.data.outside,e.volTL=t.data.large):n["a"].toasts.error(t.data.message)})).catch((function(t){n["a"].toasts.error(t)})).finally((function(){e.$store.commit("loading",!1)})),this.$store.commit("loading",!1),window.location.href=window.location.href)}}},v=c,h=(i("ced2"),i("2877")),u=i("6544"),g=i.n(u),m=i("8336"),f=i("b0af"),p=i("99d9"),_=i("a523"),b=i("8fea"),w=i("169a"),y=i("1f4f"),x=i("2fa4"),$=i("8654"),C=Object(h["a"])(v,s,o,!1,null,"09ab7c37",null);e["default"]=C.exports;g()(C,{VBtn:m["a"],VCard:f["a"],VCardActions:p["a"],VCardText:p["b"],VCardTitle:p["c"],VContainer:_["a"],VDataTable:b["a"],VDialog:w["a"],VSimpleTable:y["a"],VSpacer:x["a"],VTextField:$["a"]})},e01a:function(t,e,i){"use strict";var s=i("23e7"),o=i("83ab"),a=i("da84"),n=i("5135"),d=i("861d"),r=i("9bf2").f,l=i("e893"),c=a.Symbol;if(o&&"function"==typeof c&&(!("description"in c.prototype)||void 0!==c().description)){var v={},h=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof h?new c(t):void 0===t?c():c(t);return""===t&&(v[e]=!0),e};l(h,c);var u=h.prototype=c.prototype;u.constructor=h;var g=u.toString,m="Symbol(test)"==String(c("test")),f=/^Symbol\((.*)\)[^)]+$/;r(u,"description",{configurable:!0,get:function(){var t=d(this)?this.valueOf():this,e=g.call(t);if(n(v,t))return"";var i=m?e.slice(7,-1):e.replace(f,"$1");return""===i?void 0:i}}),s({global:!0,forced:!0},{Symbol:h})}}}]);