<template>
	<div id="eventDetailFt">
		<div v-if="!isBottomShow">
			 <div class="boxFtRight clearfix">
			 	 <div class="input" @click="ShowComment('评论')">
			 	 	<label class="iconfont">&#xe659;</label>我也有话要说
			 	 </div>
				 <div class="enroll_right">
			 	 	<div class="like" @click="ShowComment('点赞')" :class="(getActivityDetail && !!getActivityDetail.islike) && 'box_active'">
				 	 	<label class="iconfont" v-html="(getActivityDetail && !!getActivityDetail.islike) ? '&#xe783;' : '&#xe65a;'" :style="(getActivityDetail && !!getActivityDetail.islike) ?{color:mainColor,borderColor:mainColor}:''"></label>
				 	 	<p :style="(getActivityDetail && !!getActivityDetail.islike) ?{color:mainColor,borderColor:mainColor}:''">{{getActivityDetail && likeNumber(getActivityDetail.likes) || '点赞'}}</p>
				 	 </div>
				 	 <div class="like" @click="shareAcDetail">
					 	 	<label class="iconfont">&#xe684;</label>
					 	 	<p>分享</p>
					 </div>
			 	 </div>
			 </div>
		</div>
		<div class="bottom" v-else>
			 <div class="leftSection">
				<img :src='sassAppLogoUrl' class="wLogo" />
				<div class="noteTxt">
					<p>{{sassAppName}}</p>
					<p>已有{{30}}万人关注</p>
				</div>
			</div>
			<div class="downLoad" @click="downloadApp" :style="{'background':mainColor}">立即下载</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	props:{
		acShareCon:{
			type:Object,
			default:{}
		}
	},
	data() {
		return {
			isBottomShow:false
		}
	},
	computed: {
      ...mapGetters([
          'getActivityDetail',
      ]),
    },
    mounted() {
    	 this.isBottomShow=this.$router.currentRoute.query.shareFApp;
    },
	methods: {
		ShowComment( name){
			switch (name){
				case "评论":
					this.$store.dispatch("setToComment",{
				    	isShow: true,
				    	data: null,
				    	x: null,
				    })
					break;
				case "点赞":
					this.like();
					break;
				default:
					break;
			}
		},
		like(e){
			if(!locache.get('token')||locache.get('token')=="(null)"){
				this.judgeLogin(res=>{
					if(res==true){
						this.isTrueLogin();
					}
				})
			}else{
				 this.isTrueLogin();
			}
			
		},
		isTrueLogin(){
			this.activityAddlikes({
				id: this.getActivityDetail.id
			},res=>{
				if(res.meta.code == "10000"){
					if(!!this.getActivityDetail.islike){
						this.getActivityDetail.likes = this.getActivityDetail.likes - 1;
					}else{
						this.getActivityDetail.likes = 1 + this.getActivityDetail.likes;
					}
					this.getActivityDetail.islike = !this.getActivityDetail.islike;
				}
			})
		},
		shareAcDetail(){
			this.acShareCon.url=window.location.href+'&shareFApp=true';
			let data=this.acShareCon;
			let ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua)) {
		        try{getJsBridge().call("actDetailShare",data);}catch(e){}
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				try{js.actDetailShare(JSON.stringify(data));}catch(e){}
			}else{
				return;
			}
		},
		downloadApp(){
			window.location.href=this.downLoadAppUrl;
		}
	},
}
</script>

<style lang="scss" scoped>
.boxFtRight{
	border-top:1px solid #EAEAEA;
	background-color: #FFFFFF;
	width: 100%;
	position: fixed;
	bottom: 0;
	font-size:.28rem;
	color:#5C5C5C;
	.input{
		margin-left: 3%;
		margin-top: .22rem;
		margin-bottom: .16rem;
		float: left;
		width:62.8%;
		border-radius: .1rem;
		background-color: rgb(246,246,246);
		margin-bottom: .15rem;
		
		label{
			margin-right: .05rem;
		}
	}
	.iconfont{
		font-size:.28rem;
	}
	.like{
		float: left;
		margin-left: .2rem;
		width: .8rem;
		position: relative;
		text-align: center;
		label{
			font-size: .4rem;
			margin-right: .05rem;
			display: inline-block;
			margin-bottom: -.2rem;
			text-indent: .1rem;
			margin-top: .05rem;
		}
		p{
			text-align: center;
			margin-top: -0rem;
			padding: 0 .05rem;
			font-size: .24rem;
		}
	}
	.box_active{
		label{
			color: #ff8300 !important;
		}
		p{
			color: #ff8300 !important;
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
  	z-index:10;
  	border-top: .02rem solid #E8E8E8;
}
.active{
    color: #ff8300 !important;
}
.enroll_right{
	width: 34.2%;
	overflow: hidden;
	color: #666666;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	height: 1rem;
	.like{
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		label{
			font-size: .30rem;
			margin-bottom:.05rem;
		}
		p{
			font-size: .24rem;
		}
	}
	.enroll_right_active{
		color:#9d0d0d;
		margin-top: -.04rem;
		.iconfont{
			margin-bottom: .04rem!important;
		}
	}
	.like:nth-child(2){
		label{
			line-height: .36rem;
		}
	}
}
.bottom,.leftSection{
	background: #53606E;
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
.bottom{
	position: fixed;
	bottom: 0;
	width:100% ;
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
	background: #97bf24;
	border-radius: .1rem;
	padding: .1rem .2rem;
}
</style>