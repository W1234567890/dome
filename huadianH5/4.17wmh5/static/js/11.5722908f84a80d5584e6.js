webpackJsonp([11],{303:function(t,s,i){function e(t){i(371)}var n=i(26)(i(332),i(402),e,"data-v-51ccab03",null);t.exports=n.exports},332:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={data:function(){return{showTitle:!1,title:"vip特权",condition:{name:"入会条件：",txt:"交纳**现金"},data:[{name:"特权：",list:["1.获取**元购物卡","2.获取价值299元超值商品组合","3.获取499元左右电器1台"]}]}},beforeMount:function(){this.$store.dispatch("showTitle",this.showTitle),this.$store.dispatch("title",this.title)},beforeCreate:function(){document.title="申请说明",this.setWebTittle("申请说明")},mounted:function(){this.$refs.slidesClassMain.style.height=window.innerHeight+"px"}}},346:function(t,s,i){s=t.exports=i(284)(!1),s.push([t.i,"",""])},371:function(t,s,i){var e=i(346);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i(285)("1b64a075",e,!0)},402:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"wrap"},[i("div",{ref:"slidesClassMain",staticClass:"Introducebox slidesClassMain"},[i("div",{directives:[{name:"scrollt",rawName:"v-scrollt"}],staticClass:"boxBd"},[i("p",{staticClass:"conditionWrap"},[i("span",{staticClass:"conditionName"},[t._v(t._s(t.condition.name))]),t._v(" "),i("span",[t._v(t._s(t.condition.txt))])]),t._v(" "),t._l(t.data,function(s,e){return i("div",{staticClass:"listContain"},[i("h3",{staticClass:"listName"},[t._v(t._s(s.name))]),t._v(" "),i("ul",t._l(s.list,function(s,e){return i("li",[i("p",[t._v(t._s(s))])])}))])})],2)])])},staticRenderFns:[]}}});