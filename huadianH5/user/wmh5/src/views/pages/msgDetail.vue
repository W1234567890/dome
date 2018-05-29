<template>
	   <div id="msgDetail">
		  <div class="slidesClassMain" ref='slidesClassMain'>
			<div class="slides_main" ref="slides_main" v-scrollt>
				<div class="msg-inf">
			   		 <img :src="msg.titleImg"/>
			   		 <div>
			   		 	<p class="mainTitle" v-if="msg.title">{{msg.title}}</p>
			   		 	<p class="subTitle" v-if="msg.subTitle">{{msg.subTitle}}</p>
			   		 	<p class="msgDate" v-if="">{{msg.createDate}}</p>
			   		 </div>
			   	</div>
				<div ref="msgDetail" class="msgDetailContent">
				    <div class="msg-detial-box">
						<!--<div class="intro">消息详情</div>-->
						<div class="boxContent" v-html="msg.content">
						</div>
					</div>
				</div>
			</div>
			
		</div>
	  </div>
</template>

<script>
	export default {
	data() {
		return {
			showTitle: false,
			title: "消息详情",
			icon: "&#xe684;",
			msgId: null,            //商品id
			specificationsShow: true,//是否选择规格
          	bannerHight: 0,  //banner图的高度
          	msg: {},
			scrollTop:true,
		}
	},
	beforeMount(){
		 this.$store.dispatch('showTitle',this.showTitle);
		 this.$store.dispatch('title',this.title);
		 let a=this.$router.currentRoute.query.msgId;
		 this.msgId=a.replace(/\^\^/g,""); //获取商品id
		 let wHeight = window.screen.height;
		 let _this = this;
   		 this.init();
	},
	destroy () {
	   clearInterval(this.Interval);
	},	
    mounted() {
       this.bannerHight =window.screen.width;
       this.$refs.slidesClassMain.style.height = window.innerHeight +"px";
    },
	methods: {
       init(){
			let url = "msg/msgdetail",
			    data = {msgId:this.msgId};
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						let o=res.data,c;
						if(o.content){
							c = o.content;
						    c = this.escape2Html(c);
						    c = c.replace(/img src=/g,"img class='lazyImg' data-lazy=");
						    c = c.replace(/preload="none"/g,"preload='metadata'");
						    c = c.replace(/controls=""/g,"controls='' x5-video-player-type='h5' webkit-playsinline poster='http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500453310139videoBgBack4.png'");
						};
						this.msg=res.data;
						this.msg.content=c;
					}
				});
			});
		},
		escape2Html(str) {
				 let arrEntities = {'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
				  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
		},
	}
}
</script>
<style lang='scss' scoped>
.slidesClassMain{
	font-size:.2rem ;
	color: #333333;
}
.msg-inf{
	background:#FFFFFF;
	display: flex;
	padding:.2rem;
	img{
		width:2rem;
		height:2rem;
	}
	div{
		margin-left:.15rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.mainTitle{
			font-size:.40rem;
			margin-top:.1rem;
		}
		.subTitle{
			font-size:.34rem;
		}
	}
}
.msg-detial-box{
	background: #fff;
	padding-bottom:1rem;
	margin-top:.2rem;
	.intro{
		margin-left:2%;
		height: .78rem;
		line-height: .78rem;
		font-size: .3rem;
	}
}
</style>
<style>
.msg-detial-box .boxContent{
		position: relative;
		background: #ffffff;
		font-size: .3rem;
		text-indent: .6rem;
		
	}
	.msg-detial-box .boxContent pre{
		width:96%;
		margin-left:2%;
	}
.msg-detial-box .boxContent img{
	display: block;
}
.msg-detial-box .boxContent video{
	width:100%;
}
.msg-detial-box .temp_value{
	font-weight: bold;
	font-size: .36rem;
	color: #333333;
	padding-bottom: .15rem;
	line-height: .36rem;
}
.msg-detial-box .boxContent{
		position: relative;
		background: #ffffff;
		
	}
.msg-detial-box .boxContent p{
    font-size: .3rem;
    word-break:break-all; 
    word-wrap:break-word;
   width:96%;
  margin-left:2%;
    color: #333333;
    display: inline;
}
source{
	background:red;
	width:4rem;
	height:4rem;
}
</style>
