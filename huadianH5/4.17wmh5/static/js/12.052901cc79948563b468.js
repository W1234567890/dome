webpackJsonp([12],{300:function(e,t,o){function r(e){o(364)}var a=o(26)(o(329),o(397),r,"data-v-0efb3af4",null);e.exports=a.exports},329:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{showTitle:!0,title:"状态提示",icon:"&#xe653;",integralNum:10}},beforeMount:function(){this.$store.dispatch("showTitle",this.showTitle),this.$store.dispatch("title",this.title)},mounted:function(){},methods:{downloadApp:function(){window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.uniaip.android"}}}},339:function(e,t,o){t=e.exports=o(284)(!1),t.push([e.i,"#linkSuccess[data-v-0efb3af4]{width:100wh;height:100vh;background:#fff;overflow:hidden}.orderBoxHd[data-v-0efb3af4]{padding-top:.5rem}.orderBoxHd .layoutCenter[data-v-0efb3af4]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.orderBoxHd .successStatus[data-v-0efb3af4]{color:#3880be;font-size:2rem}.orderBoxHd .successTxt[data-v-0efb3af4]{color:#3880be;font-size:.4rem}.orderBoxHd .payMoney[data-v-0efb3af4]{margin-top:.2rem;color:#333;font-size:.32rem}.orderBoxBd[data-v-0efb3af4]{background:#fff;padding:.2rem 0}.orderBoxBd .orderMes[data-v-0efb3af4]{padding-bottom:.1rem}.orderBoxBd .orderMes p[data-v-0efb3af4]{padding:.1rem 0 .1rem .4rem;font-size:.28rem;line-height:.45rem;color:#999;text-align:center}.orderBoxBd .orderMes p .mesTxt[data-v-0efb3af4]{margin-left:.1rem}.orderBoxBd .subBtnWrap[data-v-0efb3af4]{width:100%;text-align:center}.orderBoxBd .subBtnWrap .subBtn[data-v-0efb3af4]{margin-top:.3rem;display:inline-block;width:7rem;height:.9rem;line-height:.9rem;font-size:.36rem;background-color:#e7580c;color:#fff;border-radius:.1rem}",""])},364:function(e,t,o){var r=o(339);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);o(285)("4ebf2c2a",r,!0)},397:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"linkSuccess"}},[o("div",{staticClass:"orderBoxHd"},[o("p",{staticClass:"layoutCenter"},[o("span",{staticClass:"iconfont successStatus",domProps:{innerHTML:e._s(e.icon)}})]),e._v(" "),e._m(0)]),e._v(" "),o("div",{staticClass:"orderBoxBd"},[e._m(1),e._v(" "),o("div",{staticClass:"subBtnWrap"},[o("div",{staticClass:"subBtn",on:{click:e.downloadApp}},[e._v("下载App")])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",{staticClass:"layoutCenter"},[o("span",{staticClass:"successTxt"},[e._v("注册成功")])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"orderMes"},[o("p",[e._v("注册成功后，您将享有1元消费等的福利！")])])}]}}});