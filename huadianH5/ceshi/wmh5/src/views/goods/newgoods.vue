<template>
	   <div id="goodsDetail">
		  <div class="slidesClassMain" ref='slidesClassMain'>
			<div class="slides_main" ref="slides_main" v-scrollt>
				<div ref="goodsDetail" class="goodsDetailContent">						
				    <div class="banner">				    	
					    <swiper :options="swiperOption"  ref="mySwiper">
							<swiper-slide v-for="(item,key) in banner" :key="key">
								<img v-if="key<imgState" class="banner_list swiper-lazy" :src="item"/>
							</swiper-slide>
							<div class="swiper-pagination" slot="pagination"></div>
						</swiper>
				    </div>				
				    <div class="goods-inf">
				    	<div class="goods-price rushToBuy" v-if="goods.isFlashSale">
							<div class="soldInf">
								<p>
									<span class="current-price" v-if="goods.sellPrice">{{specificationsShow?goods.sellPrice:goods.price}}</span>
								</p>
								<div class="soldCount" v-if="specificationsShow">
									<span class="old-price" v-if="goods.marketPrice"">{{goods.marketPrice}}</span>
									<p>
										<span>已抢：</span>
										<span>{{goods.sellCount||0}}件</span>
									</p>
								</div>
							</div>
							<div class="sale-num">
								<span>
									<span>{{getLeftTime(goodsTimer)}}</span>
								</span>
								<div class="progressBar">
									<span class="percent" :class="{activitiesFinish:isEnd}">{{percentage}}</span>
									<div class="occupyCompared" :style="{width:percentage}" :class="{activitiesFinish:isEnd}"></div>
								</div>
							</div>
						</div>
						<div class="goods-title">
							<div class="goods-txt">
								<!--<span class="handpick" v-if="goods.goodsType">{{goods.goodsType}}</span>-->
								<span class="goods-decription" v-html="goods.goodsName"></span>
							</div>							
						</div>
							
						<div class="goods-price" v-if="!goods.isFlashSale">
							<div>
								<span class="current-price" v-if="goods.sellPrice">{{specificationsShow?goods.sellPrice:goods.price}}</span>
								<span class="old-price" v-if="specificationsShow&&goods.marketPrice">{{goods.marketPrice}}</span>
							</div>							
						</div>
				
						<div class="sold-service">
							<div class="sale-num" v-if="!goods.isFlashSale">								
								{{goods.sellCount||0}}人已购买
							</div>
							<div class="inventory-num" v-if="!goods.isFlashSale">
								库存{{goods.storeNum||0}}件
							</div>
							<!--<div class="inventory-de" v-if="!goods.isFlashSale">
								{{goods.fhAddress}}
						    </div>-->
						</div>																		
				    </div>
				    
				    <div class="service">
						<ul>
							<li style="display: none;">
								<span class="sales-freight">运费</span>
								<span class="sales-return">									
									<span>{{isMail?'本商品单件包邮(新疆部分地区除外)':'需要运费'}}</span>
								</span>
								<span class="service-more">
									<img :src="more_img" class="sales_more" />
								</span>
							</li>
							<li @click='sv'>
								<span class="service-return">服务</span>
								<span class="service-name">
									<img :src="label" class="label_img" />
									<span>正品保障</span>
								</span>									
								<span class="service-name">
									<img :src="label" class="label_img" />
									<span>坏单包退</span>
								</span>
								<span class="service-mores">
									<img :src="more_img" class="sales_mores" />
								</span>
							</li>
						</ul>																					
					</div>
					
					<div class="comment-inf" v-if="!goods.commentCount">
						<div class="comment-num">
							<span>评价</span>
							<span>({{goods.commentCount}})</span>														
							<span class="com-text" v-if="goods.commentCount?0:1">暂无评论</span>							
						</div>							
					</div>
										
				    <div class="comment-inf" v-if="goods.commentCount">
						<div class="comment-num">
							<span>评价</span>
							<span>({{goods.commentCount}})</span>														
						</div>
						<ul class="comment-list">
							<li>
								<div class="nick-name">
									<img :src="goods.appraise.headimg" class="avatar" />
									<span class="userNam">{{goods.appraise.nickName}}</span>							
									<span class="mers">									
										<!--<span v-if="goods.goodsStarLevel > 0">
											<img :src="evaluate" class="evaluates" v-if="goods.goodsStarLevel > 0"/>
											<img :src="evaluate" class="evaluates" v-if="goods.goodsStarLevel > 1"/>
											<img :src="evaluate" class="evaluates" v-if="goods.goodsStarLevel > 2"/>
											<img :src="evaluate" class="evaluates" v-if="goods.goodsStarLevel > 3"/>
											<img :src="evaluate" class="evaluates" v-if="goods.goodsStarLevel > 4"/>
										</span>-->
									    <span v-if="goods.goodsStarLevel > 0">
											<img :src="evaluate" class="evaluates"/>
											<img :src="evs" class="evaluates" v-if="goods.goodsStarLevel == 1"/>
											<img :src="evs" class="evaluates" v-if="goods.goodsStarLevel == 1"/>
											<img :src="evs" class="evaluates" v-if="goods.goodsStarLevel == 1"/>
											<img :src="evs" class="evaluates" v-if="goods.goodsStarLevel == 1"/>	
										</span>	
										<span v-if="goods.goodsStarLevel > 1">
											<img :src="evaluate" class="evaluates"/>
											<img :src="evs" class="evaluates" v-if="goods.goodsStarLevel == 2"/>
											<img :src="evs" class="evaluates" v-if="goods.goodsStarLevel == 2"/>
											<img :src="evs" class="evaluates" v-if="goods.goodsStarLevel == 2"/>
										</span>
										<span v-if="goods.goodsStarLevel > 2">
											<img :src="evaluate" class="evaluates"/>
											<img :src="evs" class="evaluates" v-if="goods.goodsStarLevel == 3"/>
											<img :src="evs" class="evaluates" v-if="goods.goodsStarLevel == 3"/>										
										</span>
										<span v-if="goods.goodsStarLevel > 3">
											<img :src="evaluate" class="evaluates"/>
											<img :src="evs" class="evaluates" v-if="goods.goodsStarLevel == 4"/>	
										</span>
										<span v-if="goods.goodsStarLevel > 4">
											<img :src="evaluate" class="evaluates"/>			
										</span>	
									</span>
								</div>
								<div class="comment-txt">										
									<p>{{goods.appraise.txt}}</p>
									<div class="imgArrayList" v-if="goods.appraise.imgArray.length">
									    <img v-for="(vo,keyChild) in goods.appraise.imgArray" v-if="vo" :src="vo" alt="" class="imgArrayItem" @click="showFun(goods.appraise.imgArray,keyChild)"/>
								    </div>
								</div>
								<div class="comment-date">{{goods.appraise.createTime}}</div>								
							</li>							
						</ul>
						<router-link :to="{path:'/evaluateList',query:{goodsId:this.goodsId}}" v-if="goods.commentCount>1">
							<div class="see-more" @click="showMores">
								<span>查看全部评价</span>
							</div>
						</router-link>																							               
			        </div>	
			        <div class="goods-detial-box" v-if="showDetail">
						<div class="commodTitle">
				    		<img :src="intros" class="intro" />	
				    	</div>	
						<div class="boxContent" v-html="goods.content">
						</div>
					</div>
		        </div>	
		    </div>	
		</div>
				
		<div class="mask" v-if="showImgs.length" @click="showImgs=[]"></div>
	    <div class="showImgWrap" v-if="showImgs.length">
	    	<swiper :options="showSwiperOption"  ref="mySwiper">
				<swiper-slide v-for="(item,key) in showImgs" :key="key">
					<img  class="banner_showImg" :src="item"/>
				</swiper-slide>
			</swiper>
	    </div>
	</div>
</template>

<script>
import {getCities} from '@/mixins/api/tool.js' //注意路径
import {serveExplains} from '@/mixins/t_api/index.js'
import {showMore} from '@/mixins/t_api/index.js'
import {goodsToShare} from '@/mixins/t_api/index.js'

export default {	
	data() {
		return {
			showTitle: false,
			title: "商品详情",
			icon: "&#xe684;",
			goodsId: null,            //商品id
			specificationsShow: true,//是否选择规格
		    swiperOption: {
	          //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
	          notNextTick: false,
	          initialSlide: 1,
	          loop: true,
	          pagination: '.swiper-pagination',
	          paginationType : 'fraction',
	          autoplay: 3000,
	          autoplayDisableOnInteraction : false,
	            paginationBulletRender: function (swiper, index, className) {
				    return '<span class="swiper-pagination-bullet swiper-pagination-bullet-goods"></span>';
				},
				onSlideChangeStart:swiper=>{
					this.page = swiper.realIndex+1;  
                    this.index = swiper.realIndex;
					if(this.page>this.imgState){
                    	this.imgState=this.page;
                    }
                },
          	},
          	bannerHight: 0,  //banner图的高度
          	goods: {},
		    banner: [],
		    percentage: 0,  //进度百分比
		    isStart: false, //判断限购是否开始
			isEnd: false, //判断是否限购时间结束
			timeLength: 0,    //限购时间长度
			scrollTop:true,
			showDetail:false,
			imgState:1,
			goodsTimer:0,     
            stop : false,   //默认是停止的，但界面加载之后会变成false
            Interval:null,  //setInterval的对象
            isMail:false,     //是否要包邮
            headerImgs:{
            head_v1:require("src/assets/img/avatr/head_v1@2x.png"),
            head_v2:require("src/assets/img/avatr/head_v2@2x.png"),
            head_v3:require("src/assets/img/avatr/head_v3@2x.png"),
            head_v4:require("src/assets/img/avatr/head_v4@2x.png"),
           },
            showImgs:[],
            label: require("src/assets/img/labels.png"),
            intros: require("src/assets/img/commoditys.png"),
            more_img: require("src/assets/img/jiantouhui.png"),   
            evaluate: require("src/assets/img/evaluate.png"),
            evs: require("src/assets/img/evaluates.png"),
            showSwiperOption: {
		            //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
		        notNextTick: false,
		        initialSlide: 1,
		        loop: false,
		        pagination: '.swiper-pagination',
		        paginationType : 'fraction',
		        //autoplay: 1000,
		        autoplayDisableOnInteraction : false,
		            paginationBulletRender: function (swiper, index, className) {
					    return '<span class="swiper-pagination-bullet swiper-pagination-bullet-goods"></span>';
					},	
				onSlideChangeStart:swiper=>{
					 //这个位置放swiper的回调方法  
                    this.page = swiper.realIndex+1;  
                    this.index = swiper.realIndex;  
                },
	        },
	        videoBg:"http://shaohuadian17.oss-cn-beijing.aliyuncs.com/normal/h5/static/SHDSPBg.png"
		}
	},
	beforeMount(){
		 this.$store.dispatch('showTitle',this.showTitle);
		 this.$store.dispatch('title',this.title);
		 let a=this.$router.currentRoute.query.goodsId
		 this.goodsId=a.replace(/\^\^/g,""); //获取商品id
		 let wHeight = window.screen.height;
		 let _this = this;
   		 this.init();
	},
	destroy () {
	   clearInterval(this.Interval);
	},	
    mounted() { 
//  	this.checkDivScroolTop();
        this.bannerHight =window.screen.width;     
        setTimeout(()=>{
           this.$refs.slidesClassMain.style.height = window.innerHeight +"px";
        },10),
        setTimeout(()=>{
       	  this.showDetail=true;
          this.$refs.slidesClassMain.style.height = window.innerHeight +"px";
        },500)
    },
	methods: {
//		checkDivScroolTop(){
//	        this.$refs.slidesClassMain.addEventListener('scroll', function() {
//	            console.log(1);
//	            console.log(window.scrollY)
//	        });
//		},
		showFun(arr,key){
			this.showSwiperOption.initialSlide=key;
			this.showImgs=arr;
		},
		update () {
                if(this.goodsTimer <= 0) 
                {
                    this.stop = false;
                }
                else{
                   this.goodsTimer--;
                }
            },
		startTimer () {
             //如果是false就开始倒计时，如果是true就停止倒计时
            if(this.stop == false) 
            {
                this.Interval = setInterval(this.update,1000);    
            }
            else
            {
                clearInterval(this.Interval);
            }
            this.stop = !this.stop;
       },
        init(){  
        	let frm = getCities();            
			let url = "goods/goodsDetail",
			    data = {id:this.goodsId,from:frm};
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						console.info( res);
						let o=res.data.goods,v=res.data.goodspj,s=res.data.sellerGoods,d=res.data.fhAddress;
						let arr,c='',appraise={};
						let mp;
						this.isMail=res.data.isMail=='YES'?true:false;
						if(v.count==0){
							mp = "";
						}else{
							mp = v.appraise.appraiseInfoList[0].goodsStarLevel;
						}
						if((s.storeNum+s.sellCount)>0){
							this.percentage=(s.sellCount/(s.storeNum+s.sellCount)).toFixed(2)*100+'%';
						}
						if(o.imgArrays.length>0){
							this.banner = o.imgArrays.split(',');
						} 
						if(o.content){
							c = res.data.goods.content;
						    c = this.escape2Html(c);
//						    c = c.replace(/img src=/g,"img class='lazyImg' data-lazy=");
						    c = c.replace(/preload="none"/g,"preload='metadata'");
						    c = c.replace(/<video/g,'<video x5-video-player-type="h5" webkit-playsinline poster='+this.videoBg);
						};
						//v.appraise.appraiseInfoList[0].imgArray="http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/6ead3e47-3618-4d8b-8a73-32666a07a9d5_mobile.jpg,http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/a76139c3-cac0-47bd-9a68-83b9da653855_mobile.jpg,http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/88c7833f-9488-4b13-8861-cc34b2d187e7_mobile.jpg,http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/78eece59-1058-4e16-8593-434e659ff147_mobile.jpg"
						if(v.count>0){
							appraise={
								txt:v.appraise.appraiseInfoList[0].appraiseText,         //评论内容
								createTime:v.appraise.appraiseInfoList[0].createTime,    //评论时间
								nickName:v.appraise.buyerId.nickname||res.data.goodspj.appraise.buyerId.loginName,
								headimg:v.appraise.buyerId.headimg,         //头像
								imgArray:v.appraise.appraiseInfoList[0].imgArray.split(',')
                            }
//							 ,
//							 appraiseTwo={
//							 	txt:v.appraise.appraiseInfoList[1].appraiseText,         //评论内容
//								createTime:v.appraise.appraiseInfoList[1].createTime,    //评论时间
//								nickName:v.appraise.buyerId.nickname||res.data.goodspj.appraise.buyerId.loginName, 
//								headimg:v.appraise.buyerId.headimg,         //头像
//								imgArray:v.appraise.appraiseInfoList[1].imgArray.split(',')
//							 },
//							 appraiseTwo={
//							 	txt:v.appraise.appraiseInfoList[2].appraiseText,         //评论内容
//								createTime:v.appraise.appraiseInfoList[2].createTime,    //评论时间
//								nickName:v.appraise.buyerId.nickname||res.data.goodspj.appraise.buyerId.loginName, 
//								headimg:v.appraise.buyerId.headimg,         //头像
//								imgArray:v.appraise.appraiseInfoList[2].imgArray.split(',')
//							 },
						}
						if(this.headerImgs.hasOwnProperty(appraise.headimg)){
							appraise.headimg=this.headerImgs[appraise.headimg];
						}
					    let flag=o.isFlashSale=="YES";
						this.goods={
							content: c,                                         //商品详情
	                        isFlashSale: flag, 						            //是否是抢购商品
							goodsName: o.goodsName,                             //商品名称
							price: o.price,                                     //商品价格范围
							goodsType:o.goodsType,                              //商品是否为精品、最新、推荐
							sellPrice: '￥'+o.productsList[0].sellPrice.toFixed(2),             //卖价
							marketPrice: '￥'+o.productsList[0].marketPrice.toFixed(2),         //市场价
							sellCount:s.sellCount,                  //卖出数量
							storeNum:s.storeNum,                    //库存
							fhAddress: d,                  //地址
							robInt: o.robInt,                                   //限时抢购个数
							robStartTime:o.robStartTime,                            //抢购开始时间
							robEndTime: o.robEndTime,                                 //抢购结束时间
							robMemberLevel: o.robMemberLevel,                   //优惠对象 （会员级别）ROB_Member_Level
							memberLevelName: o.memberLevelName,                       //
							timeLength : o.robEndTime-o.robStartTime,                     //抢购时间段
							appraise: appraise ,                                   
							commentCount:v.count,  //评论数量
							goodsStarLevel: mp,//好评度
							shoppingSendPoint: res.data.send_point,               //商场送积分
							memberProfit : res.data.memberProfit,                  //单个商品奖励 
							curTime:res.data.curTime ,                             //当前时间
							goodsMold:o.goodsMold                                 //'商品类型，1普通商品，2 抵扣商品 ， 3 一元商品;
						}
						if(this.goods.goodsMold==3){
							this.goods.sellPrice='￥1.00';
							this.goods.marketPrice='￥'+Number(o.price.split('￥')[1]).toFixed(2);
						}
						this.showInterval();	
						let remark= o.goodsName + '仅需1元';	
						let tx={
	                	   name: "少花点",
	                	   desc: remark,
	                	   img: o.imgArrays.split(',')[0]
	                	}
						this.goodsToShare(tx);
					}
				});
			});
		},
		escape2Html(str) {
			let arrEntities = {'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
			return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
		},
		showInterval(){
			let nowTime = this.goods.curTime;
			if(nowTime<this.goods.robStartTime){
				this.goodsTimer=this.goods.robStartTime-nowTime;
				this.startTimer();
		    }else if(nowTime > this.goods.robEndTime){
				return;
			}else{
				this.timeLength = this.goods.robEndTime-nowTime;
				this.goodsTimer=this.timeLength;
				this.startTimer();
			}
		},
		getLeftTime(time){
		    let nowTime =this.goods.curTime;
		    if(nowTime<this.goods.robStartTime){
		   	  this.isStart = false;
		   	  return '距活动开始：'+this.dateFormat(time);
		    }else if(nowTime>this.goods.robEndTime){
		   	    this.isStart = true;
				this.isEnd = true;
				return '活动已结束'
		    }else{
		   	   this.isStart = true;
	         	return '距结束还剩：'+this.dateFormat(time);
		    };
        }, 
        dateFormat(second){ 
	        var dd,hh,mm,ss; 
		    second =second;
		    second = typeof second === 'string' ? parseInt(second) : second; 
		    if(!second || second < 0){ 
		        return; 
		    } 
		    //天 
		    dd = second / (24 * 3600) | 0; 
		    second = Math.round(second) - dd * 24 * 3600; 
		    //小时 
		    hh = second / 3600 | 0; 
		    second = Math.round(second) - hh * 3600; 
		    //分 
		    mm = second / 60 | 0; 
		    //秒 
		    ss = Math.round(second) - mm * 60; 
		    if(Math.round(dd) < 10){ 
		         dd = dd > 0 ? '0' + dd : ''; 
		    } 
		    if(Math.round(hh) < 10){ 
		         hh = '0' + hh; 
		    } 
		    if(Math.round(mm) < 10){ 
		        mm = '0' + mm; 
		    } 
		    if(Math.round(ss) < 10){ 
		        ss = '0' + ss; 
		    } 
		    if(dd==0){
		      	dd="00";
		    }
		    return (dd+':'+hh+':'+mm+':'+ ss);  
	 	},
	 	sv(){	 		
			this.serveExplains();
		},
		showMores(){		
			this.showMore();
		}
	}
}
</script>
<style lang='scss' scoped>
.slidesClassMain{
	font-size:.2rem ;
	color: #333333;
}
.banner{
	overflow: hidden;
	width: 100%;
	background:#FFFFFF;
	.banner_list{
		width: calc(100vw) !important;
		height:calc(100vw) !important;
	}
}
.goods-detial-box{
	background: #fff;
	margin-top: .2rem;
	padding-bottom:1rem;
	text-align: center;
	.commodTitle{		
		width: 100%;
	    /*border-bottom: 1px solid #ebeaea;*/
	    height: 1.05rem;
	    line-height: .78rem;	
	}
	.intro{
		height: 38%;	   
	    font-size: .3rem;	   
	    margin-top: 0.35rem;	
	}
}
.mainBox{
	font-size:.2rem ;
	color: #333333;
}
.goods-title,.goods-price,.nick-name,.promote-sales{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
    padding:0 .2rem ;
    background:#fff ;
}
.goods-title .handpick{
	background: #FF6515;
	padding: .05rem .1rem;
	color: #fff;
	font-size: .22rem;
	border-radius: 0.06rem;
}
.goods-title{
	font-weight: 700;
	height: 1.5rem;
	width: 100%;
}
.goods-txt{
	width: 100%;
}
.goods-inf{
	background: #fff;
    height: 3rem;
    padding: 0 0 0 0.1rem;
}
.progressBar{
	width:100%;
	height:.26rem;
	border-radius:1rem;
	background:#FFE56D;
	text-align:center;
	line-hight:.26rem;
	margin-top:.1rem;
	position:relative;
	overflow: hidden;
}
.progressBar .occupyCompared{
	width:1rem;
	height:.26rem;
	background:#FFC000;
	position:absolute;
}
.progressBar .activitiesFinish{
	border-radius:1rem;
}
.progressBar .percent{
	width:100%;
	height:.26rem;
	line-height:.26rem;
	position:absolute;
	left:0;
	top:0;
	color:#FF6515;
	text-align:center;
	border-radius:1rem;
}
.goods-title  .goods-decription{
	/*margin-top: 0.32rem;*/
	font-size: .35rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.share-btn{
	width: .8rem;
	text-align: center;
}
.icon{
	font-size:.4rem ;
}
.goods-price{	
	margin-top: .05rem;
	color: #fd233c;
	font-size: .36rem;
}
.goods-price .old-price{
	font-size: .3rem;
	color: #999;
/*	margin-left: .2rem;*/
	text-decoration: line-through;
}
.goods-price .current-price{
	font-size: .5rem;
}
.sold-service .sale-num{
	width: 30%;
	float: left;
	margin-left: 0.285rem;
}
.sold-service .inventory-num{
	width: 28%;
	text-align: right;
	margin-left: 3%;
}
.sold-service .inventory-de{
	width: 20%;
    text-align: right;
    margin-left: 8%;
}
/*.sold-service .icon{
	font-size: .3rem;
	color:#FF6515 ;
}*/
.sold-service span{
	margin-left: 0.1rem;
}
.sold-service{
	display: flex;
	justify-content: flex-start;
	height: 0.66rem;
    font-size: .285rem;
	color: #999999;
	padding-top: 0.25rem;
}
.sold-service>p,.goods-jifen,.soldInf,.soldCount{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.sold-service>p{
	color: #999999;
	display: flex;
	margin-right:.05rem;
}
.soldInf>p{
	font-size:.4rem;
	display: flex;
	justify-content: center;
	align-items: center;
}
.soldCount{
	flex-direction:column;
	justify-content:center;
	align-items:flex-start ;
	margin-left:.2rem;
	font-size:.24rem;
}
.goods-jifen{
	padding: .2rem;
	border-top: solid 1px #E6E6E6;
}
.goods-jifen span:nth-child(1){
	border: solid 1px #FF6515;
	border-radius: 0.06rem;
	color: #FF6515;
	width:.7rem;
	text-align: center;
	height:.35rem;
	line-height:.35rem;
	vertical-align: middle;
	margin-right:.2rem;
}
.merChantLevel{
	color: #ffcc35;
}
.service{
	background: #fff;
    height: 1rem;
    margin-top: 0.25rem;
}
.service ul{
	height: 100%;
}
.service ul>li{
	height: 1rem;
	line-height: 1rem;
}
.service ul>li:first-of-type{
	border-bottom: 0.025rem solid #e5e5e5;
}
.service .sales-freight,.service-return{
	font-size: .3rem;
    color: #999;
    margin-left: .3rem;
}
.service .sales-return{
	margin-left: 0.3rem;
}
.service .service-name{
	margin-left: 0.2rem;
}
.service .sales-return,.service-name{
	font-size: .3rem;
    color: #333;
}
.service-more,.service-mores{
	float: right;
	width: 10%;   
}
.service-mores{
    margin-right: -0.7rem;
}
.sales_more,.sales_mores{    
    width: 42%;
    margin-top: .35rem;
}
.sales_mores{       
    margin-left: .1rem;
}
.goods-jifen p{
	padding:.05rem 0;
}
.goods-jifen .jifen-num{
	color: #FF6515;
}
.sales-return .icon{
	margin: 0.08rem 0.06rem 0 0;
	font-size:.4rem;
	vertical-align: middle;
}
.service-name .label_img{
	width: 4%;
    position: relative;
    top: .05rem;
    left: .1rem;
    margin-right: .1rem;
}
.nick-name{
	justify-content: flex-start;
	padding: 0;
	margin-top: .2rem;
	font-size: .28rem;
}
.nick-name .avatar{
	width: .7rem;
    height: .7rem;
    margin-right: .15rem;
    border-radius: 50%;
}
.userNam{
	margin-right: 2.65rem;
}
.promote-sales{
	display: flex;
	justify-content: flex-start;
	align-items:center;
	font-size: .2rem;
	color: #333333;
	padding: .26rem 0.2rem;
	border-top: solid 1px #E6E6E6;
}
.limit-buy{
	border: solid 1px #FF6515;
	border-radius: 0.06rem;
	color: #FF6515;
	padding:0 0.04rem;
	margin-right:.1rem;
}
.promote-txt p:first-child{
	margin-bottom: .2rem;
}
.promote-txt p{
	display: flex;
	justify-content: center;
	align-items: center;
}
.promote-txt p span:nth-child(2){
	display: inline-block;
	width:5.5rem;
}
.comment-inf{
	background: #fff;
	margin-top: .2rem;
	padding: .3rem .3rem;
	font-size: .2rem;
}
.comment-txt{
	margin: .1rem 0 .2rem 0;
	font-family: Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;
    box-shadow: border-box;
    line-height: .36rem;
    font-size: .35rem;
    color: #333;
    font-weight: 500;
}
.comment-date{
	font-size: .285rem;
	color: #999999;
}
.comment-num{
	font-size: .3rem;
	color: #999;
}
.com-text{
	float: right;
	color: #000;
	margin-right: 0.275rem;
}
.see-more{
    margin-top: 0.25rem;
    width: 100%;
}
.see-more span{
	border: 1px solid #b5b7b8;
    border-radius: 5px;
    color: #666;
    display: inline-block;
    width: 99%;
    text-align: center;
    height: 0.77rem;
    font-size: .3rem;
    line-height: 0.77rem;
}
.comment-list{	
	margin-top: 0.25rem;
	border-bottom: solid 1px #EBEAEA;
}
.comment-list>li:first-of-type{
	border-top: solid 1px #EBEAEA;
}
.comment-list>li{
	padding-bottom: .358rem;
}
.goods-detial{
	background: #fff;
	margin-top: .2rem;
	padding: 0 .2rem 1rem .2rem;
}
.goods-detial .title{
	height: .78rem;
	line-height: .78rem;
	font-size: .3rem;
}
.goods-detial .goodsImg{
	width: 100%;
	height: auto;
}
.backToTop{
	position: fixed;
	right: .4rem;
	bottom: 1.6rem;
	z-index:100;
}
.backToTop img{
	width:1rem;
}
.rushToBuy{
	background:#FF6515;
	color:#fff;
	font-size:.2rem;
}
.rushToBuy .old-price{
	color:#FFD3BC;
	margin:0;
	text-align: left;
}
.rushToBuy .sale-num{
	color:#fff;
}
.rushToBuy .current-price{
	font-size:.45rem;
}
.rangeWrap{
	width:2rem;
}
.imgArrayList{
	width:100%;
    margin-top: 0.2rem;
}
.imgArrayItem{
	width:24%;
	height:calc(23vw);
	margin-right: 1%;
	border:.02rem solid #eaeaea;
}
.imgArrayItem:last-child{
	margin-right:0;
}
.mask{
	position: fixed;
	top:0;
	left:0;
	width:calc(100vw);
	height:calc(100vh);
	z-index:1000;
	background: rgba(0,0,0,.7);
}
.mers{
    position: absolute;
    right: .3rem;
}
.mers>span>img{
    height: 0.243rem;
}
.showImgWrap{
	position: fixed;
	top:15%;
	left:0;
	width:calc(100vw);
	z-index:2000;
}
.banner_showImg{
	width:calc(100vw);
	max-height: calc(80vh);
} 
</style>
<style>
.goodsDetailContent .swiper-slide{
	height:calc(100vw) !important;
}
.goodsDetailContent .swiper-pagination-bullet-goods{
	background: #fff;
    opacity: 1;
}
.swiper-pagination-fraction{
	background: url('~src/assets/img/pj.png') no-repeat scroll transparent;
    background-size: 100% 100%;	
	color: #fff;
	width: .85rem;
    height: .45rem;
	line-height: .45rem;
	position: absolute;
    left: 85%;
    font-size: 0.3rem;  	
}
.goodsDetailContent .swiper-pagination-bullet-active{
	background:#E7580C;
}
.goods-detial-box .boxContent{
	position: relative;
	background: #ffffff;
	margin-top: 0.2rem;	
}
.goods-detial-box .boxContent img{
	display: block;
}
.goods-detial-box .boxContent video{
	width:100%;
}
.goods-detial-box .temp_value{
	font-weight: bold;
	font-size: .36rem;
	color: #333333;
	padding-bottom: .15rem;
	line-height: .36rem;
}
.goods-detial-box .boxContent{
	position: relative;
	background: #ffffff;
}
.goods-detial-box .boxContent p{
    font-size: .3rem;
    word-break:break-all; 
    word-wrap:break-word;
    left: 0;
    top: 0;
    color: #333333;
    display: inline;
}
source{
	background:red;
	width:4rem;
	height:4rem;
}
</style>
