<template>
	<div class="comPreview">
		<enrolldetailheader v-if="getActivityEnlist"></enrolldetailheader>
				
		<div class="comPreviewHeader">
			<div class="activist-inf">
				<img :src="userInfos.headImg" class="avatar" />
				<div>
					<p>
						<span class="nickName">{{userInfos.nickName}}</span>
						<span class="activities-sponsor">主办方</span>
					</p>
					<p class="activistTime"><!--{{userInfos.time}}-->2017/07/10</p>
				</div>
			</div>
		</div>
		<div class="content_main" v-if="(getActivityArr && getActivityArr.temp_value) || (dataArr && dataArr.length)">
			<div class="temp_value" v-if="getActivityArr && getActivityArr.temp_value">{{getActivityArr.temp_value}}</div>
			<div class="boxContent" v-for="(vo,key) in dataArr">
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
				<div v-if="vo.type=='video'">
					 <videoComment :videoArr="{vo,key}"></videoComment>
				</div>
			</div>
			
		</div>
		<div v-for="(vo,key) in orderArr" class="orderArr_main" v-if="getActivityArr && getActivityArr.orderArr">
			<div class="goodsCt_main">
				<div class="goodsCt_top clearfix">
					<div class="goodsCt_top_img" :style=[vo.img.style]></div>
					<div class="goodsCt_top_title">
						<p class="text-ell word-break">{{vo.name}}</p>
						<p class="text-ell word-break">￥{{vo.price}}</p>
					</div>
				</div>
				<div class="goodsCt_bottom word-break" v-html="vo.container">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import comReleaseDetail from './comReleaseDetail.vue'
	import goodsContent from './goodsContent.vue'
	import videoComment from './videoComment.vue'
	import enrolldetailheader from 'src/views/consumption/activity/activityEnroll/enrollItem/enrollDetailHeader.vue'
	export default {
		data() {
			return {
				showTitle: true,
				title: "预览",
				readProtocol: false,
				icon: {
					icon1: "&#xe6cc;",
					icon2: "&#xe653;",
					icon3: "&#xe629;",
				},
				comunityBox:[],
				releaseTitle:null,
				detailBox:[],
				goodsPromotion:[],
			  
			    dataArr: [],
				orderArr: [],
				
				userInfos: [],
			}
		},
		components: {
			'com-release-detail': comReleaseDetail,
			'goods-content':goodsContent,
		    enrolldetailheader,
			videoComment
		},
		computed: {
	      ...mapGetters([
	      	  'getXToken',
	          'userInfo',
	          'getUserData',
	          'getActivityOrder',
	          'getActivityArr',
	          'getAddBoxArr',
	          'getActivityEnlist',
	      ]),
	    },
	    mounted() {
	    	if(this.getActivityArr){
	    		this.dataArr = this.getActivityArr.dataArr;
	    		this.orderArr = this.getActivityArr.orderArr;
	    	}
	    	this.userInfos = this.getXToken;
		},
	}
</script>

<style lang="scss" scoped>
@import "~src/assets/css/function.scss";
.comPreviewHeader{
	width:100%;
	padding:.3rem .2rem;
	font-size: .18rem;
	color: #999999;
	background:#FFFFFF;
	margin-bottom:.15rem;
	.activist-inf{
	    display:flex;
	    justify-content: flex-start;
	    .avatar{
			height: .7rem;
			width: .7rem;
			margin-right:.2rem;
		}
	}
	.nickName{
		font-size: .32rem;
		color: #333333;
		height: .35rem;
		line-height: .35rem;
		display: inline-block;
	}
	.activities-sponsor{
		color:#ff8300;
		width: .9rem;
		height: .31rem;
		font-size: .2rem;
		line-height: .31rem;
		display: inline-block;
		text-align: center;
		border-radius: .06rem;
		border: .02rem solid #ff8300;
		margin-left: .15rem;
		box-sizing: border-box;
	}
   
	.activistTime{
		margin-top:.13rem;
		font-size: .24rem;
		height: .26rem;
		line-height: .26rem;
		color: #999999;
	}
}
.content_main{
	background:#FFFFFF;
	padding: .4rem .2rem;
	.temp_value{
		font-weight: bold;
		font-size: .36rem;
		color: #333333;
		padding-bottom: .15rem;
		line-height: .36rem;
	}
	.boxContent{
		position: relative;
		background: #ffffff;
		.auto-textarea-wrapper{
	  	 	position: relative;
	  	 	padding-bottom: .2rem;
   	        border-radius: .06rem;
			.auto-textarea-block{
	   	        font-size: .3rem;
	   	        word-break:break-all; 
	   	        word-wrap:break-word;
	   	        left: 0;
	   	        top: 0;
	   	        color: #333333;
	   	        line-height: .45rem;
	   	    }
	   	}
	   	.dragPerBg{
	   		padding-bottom: .2rem;
	   	}
	}
	
}
.comPreview{
	background-color: #e6e6e6;
}
.orderArr_main{
	background-color: #FFFFFF;
	margin: .2rem;
	border-radius: .06rem;
	padding: .2rem;
	.goodsCt_main{
		.goodsCt_top{
			border-bottom: .02rem solid #e6e6e6;
			box-sizing: border-box;
			padding-bottom:.25rem ;
			.goodsCt_top_img{
				width: 1.3rem;
				height: 1.3rem;
				float: left;
				margin-right: .2rem;
			}
			.goodsCt_top_title{
				padding-top: .2rem;
			}
			.goodsCt_top_title p:first-child{
				font-size: .32rem;
				height: .32rem;
				line-height: .34rem;
				color: #333333;
			}
			.goodsCt_top_title p:last-child{
				color: #e7580c;
				font-size: .28rem;
				height: .32rem;
				line-height: .32rem;
				margin-top: .25rem;
			}
		}
		.goodsCt_bottom{
			padding: .3rem 0;
			font-size: .26rem;
			color: #999999;
		}
	}
}

</style>