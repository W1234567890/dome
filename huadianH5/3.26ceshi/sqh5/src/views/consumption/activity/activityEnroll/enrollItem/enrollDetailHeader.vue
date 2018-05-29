<template>
	<div class="enrollDetailHeader">
		 <div class="top">
		   <div class="titleImg" :style="{background:getlogoUrl(7.5,4,getActivityDetail.titleImg)}"></div>
			 
			 <div  class="titleWrap">
				  <pre  class="detail_title">{{getActivityDetail.title}}</pre>
			 </div>
			 <div class="noteInf">
			 	<div class="noteInfLeft">
			 		<span class="txt">已报名</span>
			 		<span class="signed">{{getActivityDetail.limitPersons||0}}</span>
			 		<span>/{{getActivityDetail.limitPersons}}</span>
			 	</div>
			 	<div>
			 		<!--<span>{{signInfo.cost}}</span>-->
			 	</div>
			 </div>
		 </div>
		 <ul class="mesage">
		 	 	<li class="mesItem">
		 	 		<div>
		 	 			<span class="iconfont" v-html="icon.icon1"></span>
		 	 		    <span>{{getActivityDetail.startTime > 0 ? getLocalTime1(getActivityDetail.startTime / 1000) : "0000/00/00 00:00"}} 至 {{getActivityDetail.endTime > 0 ? getLocalTime1(getActivityDetail.endTime / 1000)  : "0000/00/00 00:00"}}</span>
		 	 		</div>
		 	 	</li>
		 	 	<li class="mesItem">
		 	 		<div>
		 	 			<span class="iconfont" v-html="icon.icon2"></span>
		 	 		    <span class="text-ell">{{getActivityDetail.address}}</span>
		 	 		</div>
		 	 		<div>
		 	 			<span class="linear">|</span>
		 	 			<span class="iconfont" v-html="icon.icon1"></span>
		 	 		</div>
		 	 	</li>
		 	 	<li class="mesItem telItem">
		 	 		<div>
		 	 			<span class="iconfont" v-html="icon.icon3"></span>
		 	 		    <span>{{getActivityDetail.tel}}</span>
		 	 		</div>
		 	 		<div>
		 	 			<span class="linear">|</span>
		 	 			<span class="iconfont" v-html="icon.icon3"></span>
		 	 		</div>
		 	 	</li>
		 </ul>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
			icon:{
				icon1:"&#xe663;",
				icon2:"&#xe663;",
				icon3:"&#xe606;",
			}
		}
	},
	computed: {
      ...mapGetters([
          'isSlidesTop',
          'isSlidesBottom',
          'getActivityDetail',
      ]),
    },
}
</script>


<style lang="scss" scoped>
@import "~src/assets/css/function.scss";
.enrollDetailHeader{
	margin-bottom:.2rem;
}
.top{
	background: #FFFFFF;
	padding-bottom:.3rem;
	margin-bottom:.2rem;
}
.titleWrap,.noteInf{
	 width:96%;
	 margin-top:.1rem;
	 margin-left:.2rem;
}
.detail_title{
	font-family:"Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
	display: block;
   	white-space: pre-wrap;
   	overflow: hidden;
   	margin:0;
   	padding:0;
   	box-shadow: border-box;
   	font-weight: 700;
   	line-height: .4rem;
   	font-size: .32rem;
}
.noteInf{
	margin-top:.1rem;
	display: flex;
	justify-content: space-between;
	.noteInfLeft{
		font-size:.28rem;
		.signed{
			color:#F87314;
		}
	}
}
.mesage{
	background: #FFFFFF;
	padding:.1rem 0;
}
.mesItem{
	height:1rem;
	padding:0 2%;
	border-bottom:1px solid #eaeaea;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color:#666666;
	.linear{
		margin-right:.1rem;
	}
	.text-ell{
		max-width: 6rem;
		display: inline-block;
	}
}
.telItem{
	border:none;
}
.titleImg{
	height: 4rem;
	width: 100%;
}
</style>