webpackJsonp([5],{286:function(t,e,a){function i(t){a(378)}var s=a(26)(a(315),a(408),i,"data-v-b87a526c",null);t.exports=s.exports},308:function(t,e,a){t.exports=a.p+"static/img/head_v1@2x.c66dfa4.png"},309:function(t,e,a){t.exports=a.p+"static/img/head_v2@2x.9c122d6.png"},310:function(t,e,a){t.exports=a.p+"static/img/head_v3@2x.2f48e02.png"},311:function(t,e,a){t.exports=a.p+"static/img/head_v4@2x.eef07fb.png"},315:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a(43);e.default={data:function(){var t=this;return{showTitle:!1,title:"评价",icon:{icon1:"&#xe639;",icon2:"&#xe94c;",icon3:"&#xe67c;",icon4:"&#xe656;"},data:{goodsId:null,pageNum:1,pageSize:20},commentList:[],evaluateList:[],count:0,headerImgs:{head_v1:a(308),head_v2:a(309),head_v3:a(310),head_v4:a(311)},showImgs:[],showSwiperOption:{notNextTick:!1,initialSlide:1,loop:!1,pagination:".swiper-pagination",autoplayDisableOnInteraction:!1,paginationBulletRender:function(t,e,a){return'<span class="swiper-pagination-bullet swiper-pagination-bullet-goods"></span>'},onSlideChangeStart:function(e){t.page=e.realIndex+1,t.index=e.realIndex}},isMaxPage:!1,maxPage:0}},beforeMount:function(){this.$store.dispatch("showTitle",this.showTitle),this.$store.dispatch("title",this.title),this.data.goodsId=this.$router.currentRoute.query.goodsId},beforeCreate:function(){},mounted:function(){var t=this;this.getBackstageData(),setTimeout(function(){t.$refs.slidesClassMain.style.height=window.innerHeight-t.$refs.slidesClassMain.getBoundingClientRect().top-.8*window.innerHeight/640*100+"px"},10)},methods:{showFun:function(t,e){this.showSwiperOption.initialSlide=e,this.showImgs=t},ResetBottom:function(t){if(this.data.pageNum==this.maxPage)return t(!1),void(this.isMaxPage=!0);++this.data.pageNum,this.getBackstageData(t),t()},getBackstageData:function(t){var e=this,a=this.data;this.getByUrl({data:a,url:"appraise/getAppraiseList"},function(a){e.ajax({url:a.url,data:a.data,success:function(a){console.info(a);var i=a.data.appraiseList;e.count=a.data.count,e.commentList=[];for(var s=0;s<i.length;s++)e.headerImgs.hasOwnProperty(i[s].buyerId.headimg)&&(i[s].buyerId.headimg=e.headerImgs[i[s].buyerId.headimg]),e.commentList.push({txt:i[s].appraiseInfoList[0].appraiseText,nickName:i[s].buyerId.nickname||i[s].buyerId.loginName,cTime:i[s].appraiseInfoList[0].createTime,headimg:i[s].buyerId.headimg,imgArray:i[s].appraiseInfoList[0].imgArray.split(",")});e.evaluateList=e.evaluateList.concat(e.commentList),e.maxPage=Math.ceil(a.data.count/a.data.pageSize),t&&t()}})})}}}},353:function(t,e,a){e=t.exports=a(284)(!1),e.push([t.i,".view[data-v-b87a526c]{background:#fff}.commentBox[data-v-b87a526c]{background:#fff;width:100%}.commentBoxHdWrap[data-v-b87a526c]{width:100%;height:.8rem}.commentBoxHd[data-v-b87a526c]{position:fixed;top:0;left:0;width:100%;background:#fff;font-size:.32rem;border-bottom:1px solid #eaeaea;padding:.2rem 2%;z-index:100}.commentBoxHd .commentIcon[data-v-b87a526c]{font-size:.32rem;color:#3e9de7}.commentBoxHd .boxHdTitle[data-v-b87a526c]{color:#333;font-size:.32rem}.commentBoxBd[data-v-b87a526c],.commentList[data-v-b87a526c]{width:100%}.commentItem[data-v-b87a526c]{padding:.3rem 2% .2rem;border-bottom:1px solid #ececec}.comment-inf[data-v-b87a526c],.comment-top-section[data-v-b87a526c],.isUseFul[data-v-b87a526c]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.t_photo[data-v-b87a526c]{width:.7rem;height:.7rem;margin-right:.3rem;border-radius:50%}.comment-inf[data-v-b87a526c]{font-size:.24rem;color:#999}.comment-inf .nickName[data-v-b87a526c]{font-size:.3rem;color:#333;width:3.4rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.description[data-v-b87a526c]{font-size:.26rem;color:#333;margin-left:1rem;margin-bottom:.1rem;margin-top:.2rem}.comment-thumbNum[data-v-b87a526c]{border:1px solid #cecece;border-radius:1rem;font-size:.2rem;margin-left:.2rem;width:1.2rem;height:.4rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.commLike[data-v-b87a526c]{color:#666}.commLike.active[data-v-b87a526c]{color:#e65407}.descriptionText[data-v-b87a526c]{font-family:Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;display:block;white-space:pre-wrap;overflow:hidden;margin:0;box-shadow:border-box;line-height:.36rem;font-size:.28rem;color:#333}.imgArrayList[data-v-b87a526c]{width:90%;margin:.2rem auto}.imgArrayItem[data-v-b87a526c]{width:19%;height:19vw;margin-right:1%;border:.02rem solid #eaeaea}.imgArrayItem[data-v-b87a526c]:last-child{margin-right:0}.mask[data-v-b87a526c]{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:1000;background:rgba(0,0,0,.7)}.showImgWrap[data-v-b87a526c]{position:fixed;top:15%;left:0;width:100vw;z-index:2000}.banner_showImg[data-v-b87a526c]{width:100vw;max-height:80vh}",""])},378:function(t,e,a){var i=a(353);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(285)("243c9086",i,!0)},408:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"slidesClassMain",staticClass:"commentListWrap slidesClassMain"},[a("div",{directives:[{name:"scrollt",rawName:"v-scrollt"}]},[t.showImgs.length?a("div",{staticClass:"mask",on:{click:function(e){t.showImgs=[]}}}):t._e(),t._v(" "),t.showImgs.length?a("div",{staticClass:"showImgWrap"},[a("swiper",{ref:"mySwiper",attrs:{options:t.showSwiperOption}},t._l(t.showImgs,function(t,e){return a("swiper-slide",{key:e},[a("img",{staticClass:"banner_showImg",attrs:{src:t}})])}))],1):t._e(),t._v(" "),a("div",{staticClass:"commentBox"},[a("div",{staticClass:"commentBoxHdWrap"},[a("div",{staticClass:"commentBoxHd"},[a("span",{staticClass:"icon iconfont commentIcon",domProps:{innerHTML:t._s(t.icon.icon3)}}),t._v(" "),a("span",{staticClass:"boxHdTitle"},[t._v("全部评价")])])]),t._v(" "),a("div",[a("div",[a("div",{staticClass:"commentBoxBd"},[a("ul",{staticClass:"commentList"},t._l(t.evaluateList,function(e,i){return a("li",{staticClass:"commentItem",attrs:{id:e.id}},[a("div",{staticClass:"comment-top-section"},[a("div",{staticClass:"comment-inf"},[a("img",{staticClass:"t_photo",attrs:{src:e.headimg||"http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/2b8b49af-2d47-4055-92f7-a676d0ed7e01_mobile.png"}}),t._v(" "),a("div",[a("div",{staticClass:"nickName"},[a("span",[t._v(t._s(e.nickName))])]),t._v(" "),a("div",{staticClass:"comment-date"},[t._v(t._s(e.cTime))])])])]),t._v(" "),e.imgArray.length?a("div",{staticClass:"imgArrayList"},t._l(e.imgArray,function(i,s){return i?a("img",{staticClass:"imgArrayItem",attrs:{src:i,alt:""},on:{click:function(a){t.showFun(e.imgArray,s)}}}):t._e()})):t._e(),t._v(" "),a("div",{staticClass:"description"},[a("pre",{staticClass:"descriptionText"},[t._v(t._s(e.txt))])])])}))])])])])])])},staticRenderFns:[]}}});