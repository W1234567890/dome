<template>
<div class="enrollDetail">
	<div class=" slidesClassMain" ref='slidesClassMain' style="height: 100%;">
		<div class="slides_main" ref="slides_main" v-slide>
			<div v-if="!isnull(getActivityDetail)">
				<enrolldetailheader v-if="getActivityDetail.publishType == 'enroll'"></enrolldetailheader>
				<div class="detailHeader clearfix">
					<div class="createrImg" :style="{background:getlogoUrl(7.4,3.5,getActivityDetail.createrImg)}"></div>
					<div class="createByName text-ell">{{getActivityDetail.createByName ||sassAppName}}</div>
					<div class="createDate">{{getLocalTime2(getActivityDetail.createDate / 1000)}}</div>
				</div>
				<div class="detailBox">
					<div class="detailBoxContent" >
						<div class="temp_value" v-if="getActivityDetail.title">{{getActivityDetail.title}}</div>
						<div class="content_main" v-if="content">
							 <div v-if="typeof(content)=='object'">
							  	    <div class="boxContent" v-for="(vo,key) in content">
										<div v-if="vo.type=='text'">
											<div class="auto-textarea-wrapper">
											    <p class="auto-textarea-block" v-html="vo.data.html"></p>
											</div>
										</div>
										<div v-if="vo.type=='img'">
											<div class="dragPerBg"><img :src="vo.data.f"/></div>
										</div>
										<div v-if="vo.type=='line'">
											<div class="dragPerBg"><img  class="line" :src="vo.data.line"/></div>
										</div>
										<div v-if="vo.type=='video'" class="videos">
											<videoComment :videoArr="{vo,key}"></videoComment>
											<!--<video  ref="video"
													cpreload="auto" lass="edui-upload-video  vjs-default-skin     video-js" 
											 		controls="controls"
											 		preload="auto"
											 		id="video"
											 		width="100%" height="100%" 
											 		:src="vo.data.src">
										        <source :src="vo.data.src" type="video/">
										    </video>-->
										</div>
									</div>
							  </div>
							  <div v-if="typeof(content)=='string'">
							  	<div v-html="content"></div>
							  </div>
							
						</div>
						<div class="detailBoxContent_back" v-else></div>
					</div>
			   	    <div class="detailBoxFt">
			   	    	 <!--<div class="boxFtLeft">
			   	    	 	 <span class="iconfont" v-html="icon.icon6" v-if="getActivityDetail.address"></span>
			   	    	 	 <span class="releaseAdress">{{getActivityDetail.address}}</span>
			   	    	 </div>-->
			   	    	<!--<div class="boxFtRight clearfix">
						 	<div class="report">
						 	 	 <span class="iconfont" v-html="icon.icon8"></span>
						 	 	  <span>评论</span>
						 	 </div>
						 	 <div class="like" @click="like">
						 	 	<span class="iconfont" v-html="icon.icon7"></span>
						 	 	<span class="likeNum" v-html="getActivityDetail.likes"></span>
						 	 </div>
						 	 <div class="report">
						 	 	 <span class="iconfont" v-html="icon.icon8"></span>
						 	 	  <span>举报</span>
						 	</div>
						 	 <div class="input">
						 	 	<label class="iconfont">&#xe659;</label>我也有话要说
						 	 </div>
						 	 <div class="like">
						 	 	<label class="iconfont">&#xe641;</label>点赞
						 	 </div>
						 </div>-->
			   	    </div>
			   </div>
			    <div class="bounty"  v-if="getActivityDetail.publishType == 'enroll'">
					<div class="bountyHd">
						<span class="icon iconfont signIcon" v-html="icon.icon4"></span>
						<span class="bountyTitle">已报名</span>
						<span class="count">({{getEnrollList && getEnrollList.list && getEnrollList.list.length ? getEnrollList.list.length : 0}})</span>
					
						<!--<span class="icon iconfont signIcon" v-html="icon.icon4"></span>
						<span class="bountyTitle">商金榜</span>
						<span class="count">(已有2人打赏)</span>-->
					</div>
					<div class="bountyBd" v-if="getEnrollList.list && getEnrollList.list.length > 0" @click="toBounty">
						<div class="bounty_item">
				        	<div class="bounty_list" v-for="(item,key) in getEnrollList.list" v-if="key < 6">
				        		<img :src="getlogoUrl(7.5,4,item.createrImg,true)" />
				        	</div>
				       </div>
		   			</div>
				</div>
				<!--{{getActivityRewardDetailList}}-->
				<div class="detailComment">
					 <edetailcomment></edetailcomment>
				</div>
			</div>
		</div>
	</div>
	 
	<enrollFt :acShareCon="acShareCon"></enrollFt>
	<tocomment></tocomment>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import enrolldetailheader from './enrollItem/enrollDetailHeader.vue'
import edetailcomment from './enrollComment/eDetailComment.vue'
import enrollFt from './enrollComment/enrollDetailFt.vue'
import tocomment from './enrollComment/tocomment.vue'
import videoComment from '../activityItem/videoComment.vue'
export default {
	data() {
		return {
			icon: {
				icon1: "&#xe6cc;",
				icon2: "&#xe653;",
				icon3: "&#xe629;",
				icon4: '&#xe606;',
				icon5:"&#xe608;",
				icon6:"&#xe663;",
				icon7:"&#xe641;", //点赞
				icon8:"&#xe6b3;",  //举报
				icon9:"&#xe67c;", //评论
				icon10:"&#xe684;", //分享
				icon11:"&#xe6ea;",  //打赏
				icon12:"&#xe67c;",
			},
			content: null,
			
			isExists: false,
			iscontrols: false,
			acShareCon:{}
	  	}
	},
	components: {
		edetailcomment,
		enrolldetailheader,
		tocomment,
		enrollFt,
		videoComment,
	},
	computed: {
      ...mapGetters([
          'isSlidesTop',
          'isSlidesBottom',
          'getActivityDetail',
          'getEnrollList',
          'getToComment',
          'getActivityRewardDetailList',
          'getActivityGoodActGoods',
      ]),
    },
	mounted() {
	    /*if(this.getActivityDetail && this.getActivityDetail.id == this.$router.currentRoute.query.id){
	    	try{this.content = JSON.parse(this.getActivityDetail.content);}catch(e){}
	    	return;
	    }*/
	    this.activityCommentList({
	    	publishId: this.$router.currentRoute.query.id,
	    	pageNum: 1,
	    	pageSize: 10,
	    },(res)=>{
	    	//console.info(res)
	    	this.$store.dispatch("setActivityCommentList",res.data);
	    })

	    
	   	/*this.enrollList({
	    	publishId: this.$router.currentRoute.query.id,
	    	pageNum: 1,
	    	pageSize: 10,
	    },(res)=>{
	    	this.$store.dispatch("setEnrollList",res.data)
	    })*/
	   	
	   	
	    this.activityDetail({
	    	id: this.$router.currentRoute.query.id
	    },(res)=>{
	    	//console.log(res.data);】
	    	res.data.title=this.escape2Html(res.data.title);
	    	console.log(res.data.title);
	    	this.acShareCon={
	    		title:this.sassAppName,
	    		desc:res.data.title,
	    		titleImg:res.data.titleImg,
	    		
	    	}
	    	this.$store.dispatch("setActivityDetail",res.data);
	    	this.$nextTick(()=>{
	    		try{this.content = JSON.parse(this.getActivityDetail.content);}catch(e){
	    			this.content=this.escape2Html(this.getActivityDetail.content);
	    		}
	    	})
	    	this.getExists();
	    })
	    
	    /*this.activityRewardDetailList({
	    	publishId: this.$router.currentRoute.query.id,
	    	pageNum: 1,
	    	pageSize: 10,
	    },(res)=>{
	    	this.$store.dispatch("setActivityRewardDetailList",res.data)
	    })
	    
	    this.activityGoodActGoods({
	    	publishId: this.$router.currentRoute.query.id,
	    },(res)=>{
	    	this.$store.dispatch("setActivityGoodActGoods",res.data)
	    })*/
	},
	methods: {
		escape2Html(str) {
				 let arrEntities = {'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"','ldquo':'“','rdquo':'”'};
				  return str.replace(/&(lt|gt|nbsp|amp|quot|ldquo|rdquo);/ig,function(all,t){return arrEntities[t];});
		},
		load( e){
			console.info( e)
		},
		ShowComment( ){
			this.$set(this,'ShowComments',{
				isShow: true
			});
		},
		dealDate(str){
			let idx = str.indexOf('-');
			let str1 = str.substring(idx+1,str.length-2);
			let str2 = str1.replace(/-/,'月');
			let lstr = str2.replace(/ /,'日');
			if(lstr[0] == '0'){
				return lstr.replace(lstr[0],'')
			}else{
				return lstr;
			}
		},
		like( e){
			this.activityAddlikes({
				id: this.getActivityDetail.id
			},res=>{
				this.activityDetail({
			    	id: this.$router.currentRoute.query.id
			    },(res)=>{
			    	this.$store.dispatch("setActivityDetail",res.data)
			    })
			})
		},
		fans( e){
			if(this.isPost){
				return;
			}
			/*this.activityFansCancel({
				focusUserid:  this.getActivityDetail.createByUserID
			},res=>{
				console.info(res)
				this.getExists();
			})*/
			this.isPost = true;
			this.activityFavoriteAdd({
				publishId:  this.getActivityDetail.createByUserID
			},res=>{
				this.isPost = false;
				this.isExists = !this.isExists;
			})
		},
		getExists(){
			/*this.activityFansExists({
		   		focusUserid:this.getActivityDetail.createByUserID,
		   },res=>{
		   		this.isExists = !!res.data;
		   	})*/
		   	/*this.activityFavoriteExists({
				publishId: this.getActivityDetail.createByUserID,
			},res=>{
				this.isExists = !!res.data;
			})*/
		},
		tolink( userid){
			/*this.$router.push({
				path:'/myActivities',
				query:{
					id:userid
				}
			})*/
		},
		toBounty( ){
			this.$router.push({
				path:'/activityBountyList',
				query:{
					id: this.$router.currentRoute.query.id,
					type: this.getActivityDetail.publishType,
				}
			})
		}
	},
	watch: {
		
	}
}
</script>

<style lang="scss" scoped>
@import "~src/assets/css/function.scss";
	.detailHeader{
		width:100%;
		color: #999999;
		background:#FFFFFF;
		margin-bottom:.1rem;
		padding: .3rem .2rem;
	    font-size: $contentSize2;
	    .createrImg{
	    	height: .7rem;
			width: .7rem;
			float: left;
			margin-right: .2rem;
			border-radius: 100%;
			overflow: hidden;
	    }
	    .createByName{
	    	float: left;
	    	height: .7rem;
	    	line-height: .7rem;
	    	color: rgb(51,51,51);
	    	font-size: .34rem;
	    	font-weight: bold;
	    	width: 3.6rem;
	    }
	    .createDate{
	    	float: right;
	    	height: .7rem;
	    	line-height: .7rem;
	    	margin-right: .05rem;
	    	font-size: .28rem;
	    }
	}
	.nickName{
		font-size: .32rem;
		color: #333333;
	}
	.activities-sponsor{
		border:1px solid #ff8300;
		border-radius: .05rem;
		color:#ff8300;
		margin-left:.1rem;
		top: -.02rem;
		position: relative;
		padding: .01rem .05rem;
	}
   .avatar{
		height: .7rem;
		width: .7rem;
		margin-right: .3rem;
		position: relative;
		top: .075rem;
	}
	.activistTime{
		margin-top:.1rem;
		float: right;
	}
	.wrapper {
		width: 100%;
	}
	.has-been-focus{
		float:right;
		border: solid 1px #A1A1A1;
		color: #999999;
		padding: 0.06rem .2rem;
		border-radius: 1rem;
	}

	.auto-title{
   	 width:100%;
   	 padding-bottom:.3rem;
   	 background:#ffffff;
   }
   .auto-title-wrapper{
   	   	 position: relative;
   	   	 width:96%;
   	   	 padding:0;
   	   	 line-height: .4rem;
   	   	 font-size: .32rem;
   	   }
   	.auto-title-block{
   	display: block;
   	white-space: pre-wrap;
   	visibility: hidden;
   	overflow: hidden;
   	margin:0;
   	padding:0;
   	box-shadow: border-box;
   	font-weight: 700;
   }
.auto-title-input{
   	font-family:"Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
    position: absolute;
    width:100%;
    margin:0;
    height: 100%;
    top:0;
    left:0;
   	padding:.2rem  2% 0;
   	overflow-y: hidden;
   	color:#333;
   	outline:0 none;
    border:none !important;
    font-weight: 700;
}
.detailBox{
	widows: 100%;
	background: #FFFFFF;
}
/*.detailBoxFt{
	padding:.2rem;
	display: flex;
	justify-content:space-between;
	border-top:1px solid #EAEAEA;
	color:#666;
	font-size:.28rem;
	.iconfont{
		font-size:.28rem;
	}
}*/
.boxFtRight{
	border-top:1px solid #EAEAEA;
	background-color: #FFFFFF;
	width: 100%;
	position: fixed;
	bottom: 0;
	font-size:.28rem;
	.input{
		padding: .1rem;
		border: 1px solid #E8E8E8;
		float: left;
		width: 5.7rem;
		margin-left: .2rem;
		margin-top: .1rem;
		margin-bottom: .1rem;
	}
	.iconfont{
		font-size:.28rem;
	}
	.like{
		padding: .1rem;
		margin-top: .15rem;
		margin-left: .2rem;
		float: left;
		label{
			margin-right: .05rem;
		}
	}
}

.bounty{
	margin-top: .3rem;
	padding:.2rem 2%;
	background: #fff;
}
.bountyHd{
	font-size: .32rem;
	padding:.2rem 0;
	.signIcon{
		font-size:.32rem;
	}
	.bountyTitle{
		color:#333;
		font-size: .32rem;
		
	}
	.count{
		color:#666;
		font-size:.30rem;
	}
}
.bountyBd{
	width:100%;
	height:1rem;
	overflow: hidden;
	position: relative;
	.bounty_item{
		display: flex;
		display:-webkit-box;
		display:-webkit-flex;
		display:-ms-flexbox;
		padding: .1rem 0;
		position: relative;
		height: 100%;
		.bounty_list{
			border-radius: 100%;
			overflow: hidden;
			height: .8rem;
			width: .8rem;
			margin: 0 .15rem;
			img{
				display: block;
				height: 100%;
				width: 100%;
			}
		}
}
.bounty_item:after{
	content:"\e608";
		font-family: iconfont!important;
	    font-style: normal;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
		color: #000000;
		position: absolute;
		right: 0rem;
		z-index: 11;
		top: 0;
		bottom: 0;
		margin: auto;
		font-size: .3rem;
		height: .32rem;
		line-height: .32rem;
		color: rgb(153,153,153);
		font-weight: 600;
	}
}

.toBountyList{
	position:absolute;
	right:.3rem;
	top:.28rem;
}
.bounty-container{
	position: absolute;
	left:0;
	top:0;
	font-size: .36rem;
	width:88%;
	.swiper-slide{
	  border-radius: 100%;
	  overflow: hidden;
	  width: auto!important;
	  img{
	  	 width: .8rem;
		height: .8rem;
		margin:0 .2rem;
		border-radius: 100%;
	  }
   }
}

.eventDetailFt{
  	position: fixed;
  	bottom:0;
  	background-color: #FFFFFF;
  	width:100%;
  	height:1rem;
  	overflow: hidden;
  	display: flex;
  	justify-content:center;
  	align-items:center;
  	align-content: center;
  	color:#333;
  	z-index:1000;
}
.edFtItem{
  	text-align: center;
  	width:20%;
}
.toBountyLk{
  	color:#333;
}
.toJoinBtn{
  	width:40%;
  	background-color: #E7580C;
  	height:1rem;
  	line-height:1rem;
  	text-align: center;
  	color:#FFFFFF;
}
  
  
 
.detailBoxContent{
	background:#FFFFFF;
	padding: .4rem .2rem;
}
.detailBoxContent .temp_value{
	font-weight: bold;
	font-size: .36rem;
	color: #333333;
	padding-bottom: .15rem;
	line-height: .36rem;
}
.detailBoxContent .boxContent{
		position: relative;
		background: #ffffff;
		
	}
.detailBoxContent .boxContent p{
    font-size: .3rem;
    word-break:break-all; 
    word-wrap:break-word;
    left: 0;
    top: 0;
    color: #333333;
    line-height: .45rem;
    padding-bottom: .2rem;
}
.detailBoxContent_back{
	height: 3.6rem;
	width: 100%;
	background: getlogoUrl(3.5rem,6.4rem);
}
  
 .videos{
 	overflow: hidden;
 	width: 100%;
 	height: 100%;
 	video{
 		
 	}
 }

  
</style>