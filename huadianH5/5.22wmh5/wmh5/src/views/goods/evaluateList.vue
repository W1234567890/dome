<template>
	<div class="commentListWrap slidesClassMain" ref='slidesClassMain'>
		<div v-scrollt>
			<div class="mask" v-if="showImgs.length" @click="showImgs=[]"></div>
		    <div class="showImgWrap" v-if="showImgs.length">
		       <swiper :options="showSwiperOption"  ref="mySwiper">
					<swiper-slide v-for="(item,key) in showImgs" :key="key">
						<img  class="banner_showImg" :src="item"/>
					</swiper-slide>
				</swiper>
		    </div>
			 <div class="commentBox">
			 	    <div class="commentBoxHdWrap">
			 	    	<div class="commentBoxHd">
			 	    		<router-link :to="{path:'/newgoods',query:{goodsId:this.goodsId}}">								
								<img :src="returnDetail" class="returnImg"  @click="rtDetail"/>
							</router-link>			 	    		
							<!--<span class="icon iconfont commentIcon" v-html="icon.icon3"></span>-->
							<span class="boxHdTitle">全部评价</span>
					    </div>
					    <img :src="shadow" class="shadows" />
			 	    </div>
					
					<!--评论列表-->  
					<div>
						<div>
							<div class="commentBoxBd">
							 <ul class="commentList">
								<li v-for="(item,key) in evaluateList" class="commentItem" :id="item.id">
									<div class="comment-top-section">
										<div class="comment-inf">
											<img class="t_photo" :src="item.headimg||'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/2b8b49af-2d47-4055-92f7-a676d0ed7e01_mobile.png'" />
											<div>
												<div class="nickName">
													<span>{{item.nickName}}</span>
												</div>												
											</div>
										</div>
										<span class="mers">		
											<span v-if="goodsStarList[key].goods > 0">
												<img :src="evaluate" class="evaluates"/>
												<img :src="evs" class="evaluates" v-if="goodsStarList[key].goods == 1"/>
												<img :src="evs" class="evaluates" v-if="goodsStarList[key].goods == 1"/>
												<img :src="evs" class="evaluates" v-if="goodsStarList[key].goods == 1"/>
												<img :src="evs" class="evaluates" v-if="goodsStarList[key].goods == 1"/>	
											</span>	
											<span v-if="goodsStarList[key].goods > 1">
												<img :src="evaluate" class="evaluates"/>
												<img :src="evs" class="evaluates" v-if="goodsStarList[key].goods == 2"/>
												<img :src="evs" class="evaluates" v-if="goodsStarList[key].goods == 2"/>
												<img :src="evs" class="evaluates" v-if="goodsStarList[key].goods == 2"/>
											</span>
											<span v-if="goodsStarList[key].goods > 2">
												<img :src="evaluate" class="evaluates"/>
												<img :src="evs" class="evaluates" v-if="goodsStarList[key].goods == 3"/>
												<img :src="evs" class="evaluates" v-if="goodsStarList[key].goods == 3"/>										
											</span>
											<span v-if="goodsStarList[key].goods > 3">
												<img :src="evaluate" class="evaluates"/>
												<img :src="evs" class="evaluates" v-if="goodsStarList[key].goods == 4"/>	
											</span>
											<span v-if="goodsStarList[key].goods > 4">
												<img :src="evaluate" class="evaluates"/>			
											</span>																		
									    </span>
									</div>
									<div class="description">
										<pre class="descriptionText">{{item.txt}}</pre>
									</div>
									<div class="imgArrayList" v-if="item.imgArray.length">
										<img v-for="(vo,keyChild) in item.imgArray" v-if="vo" :src="vo" alt="" class="imgArrayItem" @click="showFun(item.imgArray,keyChild)"/>
									</div>									
									<div class="comment-date">{{item.cTime}}</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
		    </div>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import {returnDetails} from '@/mixins/t_api/index.js'
	export default {
		data() {
			return {
				showTitle: false,
				returnDetail:  require("src/assets/img/return_img.png"),
				title: "评价",
				icon:{
					icon1:'&#xe639;',
					icon2:"&#xe94c;",
					icon3:"&#xe67c;",
					icon4:"&#xe656;"
				},
				data:{
					goodsId:null,
		            pageNum:1,		
					pageSize:20
				},
	            commentList:[],
	            evaluateList:[],
	            goodsStarList: [],
	            count:0,
	            headerImgs:{
		            head_v1:require("src/assets/img/avatr/head_v1@2x.png"),
		            head_v2:require("src/assets/img/avatr/head_v2@2x.png"),
		            head_v3:require("src/assets/img/avatr/head_v3@2x.png"),
		            head_v4:require("src/assets/img/avatr/head_v4@2x.png"),
			    },
			    evaluate: require("src/assets/img/evaluate.png"),
                evs: require("src/assets/img/evaluates.png"),
                shadow: require("src/assets/img/shadow.png"),            
			    showImgs:[],
			    showSwiperOption: {
			            //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
			        notNextTick: false,
			        initialSlide: 1,
			        loop: false,
			        pagination: '.swiper-pagination',
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
		        isMaxPage: false,
			    maxPage:0,
		    }
		},
		beforeMount() {
			this.$store.dispatch('showTitle', this.showTitle);
			this.$store.dispatch('title',this.title);
			this.data.goodsId=this.$router.currentRoute.query.goodsId;
			let a=this.$router.currentRoute.query.goodsId
		    this.goodsId=a.replace(/\^\^/g,""); //获取商品id
		},
		beforeCreate(){	
		},
		mounted() {
			this.getBackstageData();
			setTimeout(()=>{
			 	this.$refs.slidesClassMain.style.height = window.innerHeight - this.$refs.slidesClassMain.getBoundingClientRect().top - ((.8 * window.innerHeight/640) * 100) + "px";
			},10);			
		},
		methods: {
			showFun(arr,key){
				this.showSwiperOption.initialSlide=key;
				this.showImgs=arr;
			},
		    ResetBottom(res){
		    	if(this.data.pageNum==this.maxPage){
		    		res(false);
		    		this.isMaxPage = true;
		    		return;
		    	}else{
		    		++this.data.pageNum;
		    		this.getBackstageData(res);
		    		res();
		    	}
		    },
			getBackstageData(c){
				let url="appraise/getAppraiseList",
				    data=this.data;
				this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							console.info(res);
							let arr=res.data.appraiseList;
							this.count=res.data.count;
							this.commentList = [];
							this.goodsStarList = [];
							for(var i=0; i<arr.length;i++){	
								//alert(typeof(arr[i].appraiseInfoList[0].goodsStarLevel));
								if(this.headerImgs.hasOwnProperty(arr[i].buyerId.headimg)){
									arr[i].buyerId.headimg=this.headerImgs[arr[i].buyerId.headimg];										
								}
								this.goodsStarList.push({								
									goods:arr[i].appraiseInfoList[0].goodsStarLevel
								});
								//arr[0].appraiseInfoList[0].imgArray="http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/38bf2a6d-4c61-45ec-9dec-f05baf67a961_mobile.jpg,http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/6ead3e47-3618-4d8b-8a73-32666a07a9d5_mobile.jpg,http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/a76139c3-cac0-47bd-9a68-83b9da653855_mobile.jpg,http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/88c7833f-9488-4b13-8861-cc34b2d187e7_mobile.jpg,http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/78eece59-1058-4e16-8593-434e659ff147_mobile.jpg"
								this.commentList.push({
									txt:arr[i].appraiseInfoList[0].appraiseText,
									nickName:arr[i].buyerId.nickname||arr[i].buyerId.loginName,//nickname
									cTime:arr[i].appraiseInfoList[0].createTime,
									headimg:arr[i].buyerId.headimg,
									imgArray:arr[i].appraiseInfoList[0].imgArray.split(',')
								});
							};											
							this.goodsStarList = this.goodsStarList;								
							this.evaluateList=this.evaluateList.concat(this.commentList);
							this.maxPage=Math.ceil(res.data.count/res.data.pageSize);
							c && c();
						}
					});
				});
			},
			rtDetail(){
				this.returnDetails();
			}
		},
	}
</script>

<style lang="scss" scoped>
.view{
	background:#FFFFFF;
}
.commentBox{
	background:#FFFFFF;
	width:100%;
}
.commentBoxHdWrap{
	width:100%;
	height: 1rem;
}
.commentBoxHd{
	position: fixed;
	top: .4rem;
	left:0;
	height: 1rem;
	width:100%;
	background:#FFFFFF;
	font-size: .32rem;
	/*border-bottom:1px solid #EAEAEA;*/
	padding:.2rem 2%;
	z-index:100;
	text-align: center;
	.commentIcon{
		font-size:.32rem;
		color:#3E9DE7;
	}
	.boxHdTitle{
		color:#333;
		font-size: .42rem;	
	    margin-left: 0.4rem;	
	}
	.returnImg{       
		width: 6%;
   		position: absolute;
    	left: 0.3rem;
	}
}
.commentBoxBd{
    width: 100%;
    position: relative;
    top: .5rem;
}
.commentList{
	width:100%;
}
.commentItem{
	padding: .3rem 0 .2rem 0;
    margin-left: .4rem;
    margin-right: .4rem;
    border-bottom: .5px solid #ebebeb;
}
.comment-top-section,.comment-inf,.isUseFul{
   display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
   /* justify-content: center;*/
}
.comment-top-section{
	width: 100%;
}
.t_photo{
    width: .56rem;
    height: .56rem;
    border-radius: 50%;
}
.comment-inf{
	font-size: .24rem;
	color: #999999;
}
.comment-inf .nickName{
	font-size: .3rem;
    color: #333;
    width: 3.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 0.1rem;
}
.description{
    color: #333;
    margin-bottom: .1rem;
    margin-top: .2rem;
}
.comment-thumbNum{
	border: solid 1px #CECECE;
	border-radius: 1rem;
	font-size: .2rem;
	margin-left:.2rem ;
	width: 1.2rem;
    height: .4rem;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
}
.commLike{
	color:#666;
}
.commLike.active{
	color:#E65407;
}
.descriptionText{
    font-family: Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;
    /* display: block; */
    /* white-space: pre-wrap; */
    /* overflow: hidden; */
    /* margin: 0; */
    box-shadow: border-box;
    line-height: .36rem;
    font-size: .3368rem;
    color: #333;
    font-weight: 500;
}
.imgArrayList{
	width: 100%;
	margin: .2rem .2rem .2rem 0rem;
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.imgArrayItem{
	width: 23%;
	height: calc(22.4vw);
	margin-right: 1%;
	margin-top: 0.1rem;
	/*border: .02rem solid #eaeaea;*/
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
    width: 25%;
    /* text-align: right; */
    position: absolute;
    right: 0;
}
.mers>span>img{
	height: .243rem;
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
.comment-date{
	font-family: Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;
    display: block;
    white-space: pre-wrap;
    box-shadow: border-box;
    line-height: .36rem;
    font-size: .30rem;
    color: #9d9d9d; 
}
.shadows{
    position: relative;
    top: 1.3rem;
}
</style>