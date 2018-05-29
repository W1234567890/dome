<template>
	   <div id="goodsDetail">
		  <div class="slidesClassMain" ref='slidesClassMain'>
			<div class="slides_main" ref="slides_main" v-scrollt>
				<div ref="goodsDetail" class="goodsDetailContent">		
				    <div class="banner" v-if="data.titleImg">
					   <!-- <swiper :options="swiperOption"  ref="mySwiper">-->
							<swiper-slide v-for="(item,key) in data.titleImg.split(',')" :key="key">
								<!--<img v-if="key<imgState" class="banner_list" :src="item"/>-->
								<img :src="item" style="height: 100%;width: 100%;"/>
								<!--<div style="height: 100%;width: 100%;" :style="{background:'url('+(item)+')  no-repeat center center / cover #E2E1E1'}"></div>-->
							</swiper-slide>							
							<!--<div class="swiper-pagination" slot="pagination"></div>-->
						<!--</swiper>-->
				    </div>
				    <img :src="box_banner" class="box_banners" />
				    <div class="goods-inf">
						<div class="merchantInf">
							<div class="">
								<span class="merChantName">{{data.name}}</span>								
							</div>
							<!--<span class="merChantLevel iconfont icon"   v-for="(item,key) in 5" v-html="'&#xe666;'" :class="key<data.starLevel ? 'curRank':''"></span>-->
							<div class="heatPraise">
								<span class="hots_img">
									<img :src="hot" class="hots" v-if="data.starLevel > 0"/>
									<img :src="hot" class="hots" v-if="data.starLevel > 1"/>
									<img :src="hot" class="hots" v-if="data.starLevel > 2"/>
									<img :src="hot" class="hots" v-if="data.starLevel > 3"/>
									<img :src="hot" class="hots" v-if="data.starLevel > 4"/>
								</span>								
								<span class="footCount"><span class="fontText">{{data.footpointCount || 0}}</span>人光临</span>
							</div>
							<!--<div class="merChantLocaltion">
								<span>
									<span class="distance" v-if="distance">{{distance}}</span>
									<span class="detailAddress">{{data.address}}</span>
								</span>
								<span class="icon iconfont toRight" v-html="'&#xe608;'"></span>
							</div>-->
							
							<div class="shopDetails" style="width:100%;color:#999">
								<!--<span class="distance">{{distance}}</span>-->
								<span class="detailAddress">{{data.address}}</span>
								<!--<span class="icon iconfont" v-html="'&#xe667;'"></span>-->
								<a class="preGps" @click="preGps">
									<img class="Gps" src="../../assets/img/gps.png" alt="" />
								</a>
								<a :href="'tel:'+data.tel" class="prePhone">
									<img class="iconFont" src="../../assets/img/phone.png" alt="" />
								</a>
								<!--<span class="matter">预定电话：</span>-->
								<!--<span>{{data.tel}}</span>-->
							</div>
							<!--<span class="icon iconfont toRight" v-html="'&#xe608;'"></span>-->
							
							<div class="openTime text-ell">
								<!--<span class="icon iconfont" v-html="'&#xe669;'"></span>-->
								<!--<img class="iconFont" src="../../assets/img/time.png" alt="" />-->
								<span class="matter">营业时间</span>
								<span class="time">{{data.businessStart}}-{{data.businessEnd}}</span>
							</div>
							
						</div>
						<!--<div class="merchantService">商户提供优惠服务</div>
						<ul class="preferentialItem" v-if="data.preferentialList">
							<li v-for="(vo,key) in data.preferentialList">
								<span class="limit-buy">{{vo.name}}</span>
								<div>
									<p v-html="getHtmls(vo.value)"></p>
								</div>
							</li>
						</ul>-->
				   </div>
					<div class="goods-detial-box" v-if="data.content">
						<div class="commodTitle">
				    		<img :src="intros" class="intro" />	
				    	</div>	
						<div class="boxContent" v-html="getHtmls(data.content)">
						</div>
					</div>
				</div>
			</div>
			
		</div>
		<div class="bottom" v-if="isBottomShow">
			<div class="leftSection">
				<img src='http://shaohuadian17.oss-cn-beijing.aliyuncs.com/normal/h5/static/shdLogo.png' class="wLogo" />
				<div class="noteTxt">
					<p>少花点</p>
					<p>有了少花点，每天省e点</p>
				</div>
			</div>
			<div class="downLoad" @click="downloadApp">立即下载</div>
		</div>
	    <!--<div class="settleAcount" @click="isMaskLayerShow = !isMaskLayerShow">结算</div>
	    <div class="maskLayer" v-if='isMaskLayerShow' @click="isMaskLayerShow = !isMaskLayerShow"></div>
	    	<div class="content" v-if='isMaskLayerShow' >
	    		<div class="payTitle">结算中心</div>
	    		<div class="payItem">
	    			<span>输入应购物金额：</span>
	    			<input class="inpArea" v-model="inpMonyCount" @input="inpMonyCount = inpMonyCount.replace(/\D/g,'')" />
	    			<span class="warmRemind">{{'+5'}}元</span>
	    		</div>
	    		<div class="noteInf">
	    			<span class="warmRemind">提示：</span>
	    			<span>
	    				请商户收银员告知顾客，输入本次消费额等值的购物额
	    			</span>
	    		</div>
	    		<div class="confirmPay">确认支付</div>
	    		<div class="closeIcon" @click="isMaskLayerShow = !isMaskLayerShow"></div>
	    	</div>-->
	</div>
</template>

<script>
	import {GetPositionInfo} from '@/mixins/api/tool.js' //注意路径
	import {OpenNavigation} from '@/mixins/api/tool.js' //注意路径
	let userLng,userLat,shopName,shopLat,shopLng;
	export default {
	data() {
		return {
			inpMonyCount:'',
			isMaskLayerShow:false,
			goodsId: null,            //商品id
		    swiperOption: {
	          notNextTick: false,
	          initialSlide: 1,
	          loop: true,
	          pagination: '.swiper-pagination',
	          autoplay: 1000,
	          autoplayDisableOnInteraction : false,
            },          
			scrollTop:true,
            query: null,
            distance:'',        
	        data: {},
	        isBottomShow:false,
	        intros: require("src/assets/img/shop.png"),
	        hot: require("src/assets/img/hot.png"),
	        box_banner: require("src/assets/img/box_banner.png")
		}
	},
    mounted() {
        this.query = this.$router.currentRoute.query;
        this.distance = this.query.distance;
        this.shopLat = this.query.TLlat;
        this.shopLng = this.query.TLlng; 
       	shopLat = this.shopLat;
       	shopLng = this.shopLng;
   	    this.init();   	   
   	    setTimeout(()=>{
           this.$refs.slidesClassMain.style.height = window.innerHeight +"px";
        },10)
   	    if(this.query.isAppShare){
   	    	this.isBottomShow=true;
   	    };
    },
	methods: {
		getHtmls(res){
			let c;
			if(res){
				c = res;
			    c = this.escape2Html(c);			      
//			    c = c.replace(/img src=/g,"img class='lazyImg' data-lazy=");
			    c = c.replace(/preload="none"/g,"preload='metadata'");
			    c = c.replace(/controls=""/g,"controls='' x5-video-player-type='h5' webkit-playsinline poster='http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500453310139videoBgBack4.png'");
				return c;
			};
			return "";
		},
		escape2Html(str) {
			let arrEntities = {'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};	
			return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t]});
		},
        init(){          	
        	let longitudes,latitudes;
        	let ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				latitudes = shopLat;
        		longitudes = shopLng;
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				let latLong = GetPositionInfo();
				if(latLong != undefined && latLong != null){
					latitudes = latLong.latitude;
        			longitudes = latLong.longitude;	
				}else{
					latitudes = 0;
        			longitudes = 0;
				}
			}else{
				return;  //pc端	
			}
        
        	if(!this.query.goodsId){
        		return;
        	}       	
			let url = "p2pres/findOne",
			    data = {id:this.query.goodsId,lat:latitudes,lng:longitudes};
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						if(res.data){
							this.data = res.data;	
							//console.log(res.data);
							document.title=res.data.name;							
							userLat = res.data.lat;	
							userLng = res.data.lng;
							shopName = document.title;
							let remark;
							if(!res.data.remark){
								remark='1、用这个APP买快餐按规则享受1元/盒。'+
			                           '2、吃喝玩乐按规则享受1元/次。点击免费下载并了解规则，更多权益等着您！';
							}else{
								remark='1、用这个APP买快餐按规则享受1元/盒。'+
			                           '2、吃喝玩乐按规则享受1元/次。点击免费下载并了解规则，更多权益等着您！';
							}							
			                let o={
		                	   name:shopName,
		                	   desc:remark,
		                	   img:res.data.titleImg.split(',')[0]
		                	}
			                this.merDShareContent(o);
			                this.setWebTittle(shopName);   
						}
					}
				});
			});				
		},
		preGps(){		
	 		this.OpenNavigation(userLat, userLng, shopName);
	    },
		downloadApp(){
		   window.location.href="http://apph5.pengjipay.com/download/index.html";
	    }
	}
}
</script>
<style lang='scss' scoped>
/*新增样式*/
/*.settleAcount{
	height: .9rem;
	width: 7.1rem;
	background: #f5f5f5;
	font-size: .32rem;
	color: #fff;
	left: 50%;
	margin-left: -3.55rem;
	position: fixed;
	bottom: .2rem;
	text-align: center;
	line-height: .9rem;
	border-radius: .1rem;
}*/
/*.maskLayer{
	position: fixed;
	top:0;
	left:0;
	width:calc(100vw);
	height:calc(100vh);
	z-index:1000;
	background: rgba(0,0,0,.5);
}*/
.content{
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -2.8rem;
	margin-top: -2.1rem;
	width: 5.6rem;
	height: 4.2rem;
	background: #fff;
	border-radius: .2rem;
	z-index: 10011;
}
.confirmPay{
	width: 100%;
	height: .9rem;
	line-height: .9rem;
	text-align: center;
	position: absolute;
	bottom: 0;
	font-size: .3rem;
	color:#fff ;
	background:#E7580C ;
	border-bottom-left-radius: .2rem;
	border-bottom-right-radius: .2rem;
}
.payTitle{
	font-size:.32rem ;
	color: #333;
	line-height: 1.1rem;
	text-align: center;
}
.payItem{
	border-top: solid 1px #e0e0e0;
	width: 5rem;
	margin: 0 auto;
	padding: .3rem 0;
	font-size: .28rem;
}
.inpArea{
	text-indent: .1rem;
	width: 1.6rem;
	height: .5rem;
}
.noteInf{
	width: 5rem;
	margin: 0 auto;
	font-size: .20rem;
	color: #A5A5A5;
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;	
}
.warmRemind{
	color: #E7580C;
}
.noteInf .warmRemind{
	width: 1.6rem;
}
.closeIcon{
	position: absolute;
	top: .3rem;
	right: .2rem;
	width: auto;
	height: .5rem;
	width: .5rem;
	border-radius: 100%;
	overflow: hidden;
	background: url('~src/assets/img/closeIcon.png') no-repeat center #d2d2d2;
	background-size: cover;
}
.merChantName{
    font-size: .4rem;
    color: #111;
    font-weight: 300;
}
.merChantLevel{
	font-size: .32rem;
	color: #B0B0B0;
}
.heatPraise{
    width: 100%;
    margin-top: .15rem;
    height: .5rem;
    line-height: .5rem;  
    color: #676767;
    font-weight: 200; 
    .hots_img{   	
    	.hots{
			width: 18px;
			height: 18px;
		}	
    }
	.footCount{
		font-size: .325rem;
	    float: right;
	    color: #676767;
	    font-weight: 200;
	    .fontText{
			font-size: .325rem;
			color: #676767;
		    font-weight: 200;
		}
	}
}

.curRank{
	color: #FF4C50;
	margin-right: .1rem;
}
.merChantLocaltion,.preferentialItem>li{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
}
.preferentialItem>li{
	background: #fff;
	justify-content: flex-start;
	padding: .2rem .2rem;
}
.merChantLocaltion{
	font-size: .24rem;
	/*color: #7FA0D8;*/
	color:#B0B0B0;
	margin-top: .1rem;
	padding-bottom:.2rem;
	border-bottom: solid 0.02rem #E0E0E0;
}
.merChantLocaltion .distance{
	color: #B0B0B0;
	padding-right: .1rem;
	border-right: solid 0.04rem #B0B0B0;
}
.iconFont{
	width:.45rem;
	vertical-align: middle;
}
.openTime{
	height: 1rem;
	line-height: 1rem;
	color: #B0B0B0;
	font-size: .28rem;
	border-top: 0.05em solid #e8e8e8;
}
.merchantInf .toRight{
	font-size: .3rem!important;
	color: #B0B0B0!important;
	font-weight: bold;
}
.merChantLocaltion .toRight{
	color: #7FA0D8!important;
}
.openTime .icon,.prePhone .icon{
	font-size: .34rem;
	color: #E7580C;
	font-weight: bold;
	margin-right: .1rem;
}
.openTime .matter{
	color: #000;
    font-size: .325rem;
}
.openTime .time{
	font-size: .325rem;
}
.prePhone .matter{
	color: #8E8E8E;
}
.preGps{
	float: right;
    width: .45rem;
    vertical-align: middle;
    position: relative;
    left: .05rem;
    top: .25rem;
}
.prePhone{ 
	float: right;
    position: relative;
    top: .15rem;
    border-left: 1px solid #e8e8e8;
    padding-left: .2rem;
}
.shopDetails{
	margin-top: .15rem;
	border-top: 1px solid #e8e8e8;
	margin-bottom: .2rem;
	height: 1.25rem;
	line-height: .5rem;
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
}
.detailAddress{
	font-size: .3rem;
    width: 75%;
    overflow: hidden;
    margin-top: 0.3rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -moz-box;
    -moz-line-clamp: 3;
    -moz-box-orient: vertical;
}
.merchantInf{
	padding: .2rem .4rem 0 .4rem;
	background: #fff;
}
.merchantService{
	height: .8rem;
	line-height: .8rem;
	padding: 0 .2rem;
	background: #fff;
	font-size: .3rem;
	color: #333;
}
.slidesClassMain{
	font-size:.2rem ;
	color: #f5f5f5;
	height: 100%;
}
.banner{
	overflow: hidden;
	width: 100%;
	background:#FFFFFF;
	/*.banner_list{
		width: calc(100vw) !important;
		height:calc(100vw) !important;
	}*/
}
.box_banners{
	z-index: 1000;
    position: absolute;
    top: 0;
    width: 100vw!important;
    height: 50vw!important;
    opacity: 0.5;
}
.goods-detial-box{
	background: #fff;
	margin-top: .2rem;
	padding-bottom:1rem;
	text-align: center;
	.commodTitle{		
		width: 100%;	   
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
.preferentialItem{
	padding-bottom: .2rem;
	background: #fff;
}
.limit-buy{
	border: solid 1px #FF6515;
	border-radius: 0.06rem;
	color: #fff;
	padding:0 0.04rem;
	margin-right:.2rem;
	background: #FF6515;
}
.banner_showImg{
	width:calc(100vw);
	max-height: calc(80vh);
} 
.bottom{
	background: rgba(0,0,0,.5);
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
}
.leftSection{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
    font-size:.3rem;
}
	.bottom{
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 0.2rem 0.4rem;
		color: #fff;
	    font-size: .3rem;
	}
	.leftSection .wLogo{
		width: .8rem;
		height: .8rem;
		margin-right: .2rem;
	}
	.downLoad{
		background: #E7580C;
		border-radius: .1rem;
		padding: .15rem .25rem;
		font-size:.2rem;
	}
</style>
<style>
.goodsDetailContent .swiper-slide{
	height:calc(50vw) !important;
	font-family: Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;
}
.goodsDetailContent .swiper-pagination-bullet-goods{
	background: #fff;
    opacity: 1;
}
.goodsDetailContent .swiper-pagination-bullet-active{
	background:#E7580C;
}
.goods-detial-box .boxContent{
	position: relative;
	background: #ffffff;		
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
	padding-bottom:.3rem;	
}
.goods-detial-box .boxContent p,.goods-detial-box .boxContent pre{
    font-size: .28rem;
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
