<template>
	 <div class="goodsContent">
		<div class="goodsPromotion" v-if="getActivityGoodActGoods" v-for="(vo,key) in getActivityGoodActGoods">
			<div class="goodsDetail">
				 <div class="goodsHd">
				 	<div class="goodsImgWrap">
				 		 <img class="goodsImg" :src="vo.goodImgs"/>
				 	</div>
				 	 <div class="goodsHdRight">
				 	 	 <div class="title">
							  <div class="goodName">
							     <pre  class="auto-title-block">{{vo.goodName}}</pre>
							  </div>
				 	 	 </div>
				 	 	 <div class="rightInner">
				 	 	 	 <div class="priceWrap">
					 	 	 	<span class="unit">￥</span>
					 	 	 	<span class="price" v-html="vo.sellPrice"></span>
					 	 	 </div>
					 	 	 <div class="supportPerson">已有{{vo.buys}}/{{vo.limits}}人支持</div>
				 	 	 </div>
				 	 </div>
				 </div>
				 <div class="goodsBd">
				 	    <div class="goods-description">
							<div class="auto-textarea-wrapper word-break" v-html="vo.remark"></div>
					   </div>
				 </div>
			</div>
			<div class="goodsJoin" @click="submit(vo)">我要参与</div>
       </div>
     </div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			activityId:null,
			data:{
				
			}
		}
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
    	if(!this.getActivityGoodActGoods){
    		this.activityGoodActGoods({
		    	publishId: this.$router.currentRoute.query.id,
		    },(res)=>{
		    	this.$store.dispatch("setActivityGoodActGoods",res.data)
		    })
    	}
	},
	methods: {
		submit( e){
			this.$router.replace({path:"/activityDetail",query:{id:this.$router.currentRoute.query.id}})
			/*this.actPayActAlipay({
				payPosition,					//支付对象类型：actAttend(参与活动)；actEnroll（报名）
				addressid,					//收货人地址ID,支付对象为actAttend(参与活动)，必传
				publishId,					//报名活动id，payPosition为“actEnroll”时必填
				reciverName,					//报名时填写的姓名，payPosition为“actEnroll”时，假如发布报名时有设置，则必填
				reciverPhone,				//报名时填写的手机号，payPosition为“actEnroll”时，假如发布报名时有设置，则必填
				totalpay,					//订单总额
				goodList,					//订单产品集合，goodList:[{"goodsId":"322382360379129856","goodsNum":1",goodsPayPrice":50}]
				goodsNum,					//订单产品数量
				realpay,						//交易金额
				state,						//是否勾选余额支付，1是，0否
			},res=>{
				console.info(res)
			})
			console.info( e.id)*/
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~src/assets/css/function.scss";
.goodsContent{
	padding: 0 .2rem;
	padding-top: .2rem;
 }
  .goodsPromotion{
  	width:100%;
 	border-bottom:1px dotted #EAEAEA;
 	background:#FFFFFF;
 	border-radius: 2px;
 	position: relative;
 	border:1px solid #eaeaea;
 	padding: .2rem;
 	margin-bottom: .2rem;
 	border-radius: .08rem;
  }
  .goodsHd{
  		display: flex;
  		 flex-direction:row;
  		justify-content: flex-start;
  		align-items: center;
  		padding-bottom:.2rem;
  		border-bottom:1px solid #EAEAEA;
  		.goodsImgWrap{
  		width:1.35rem;
  		height:1.35rem;
	  	}
	  	.goodsImg{
	  		width:100%;
	  		height:100%;
	  	}
	  	.goodsHdRight{
	  		width:5rem;
	  		margin-left:.2rem;
	  	}
  	}
  	.goodsBd{
  		padding-top:.3rem;
  	}
.goodName{
	
}
.auto-title-wrapper {
	margin-top: .3rem;
	position: relative;
	width: 100%;
	padding: 0;
}
.auto-title-block {
	font-family:"Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif ;
	display: block;
	white-space: pre-wrap;
	overflow: hidden;
	margin: 0;
	padding: 0;
	box-shadow: border-box;
	font-weight: 700;
	line-height: .4rem;
    font-size: .34rem;
    overflow-y: hidden;
}
.auto-textarea-wrapper{
   	 padding: .3rem 0;
	font-size: .26rem;
	color: #999999;
}
   .auto-textarea-block{
   	display: block;
   	white-space: pre-wrap;
   	visibility: hidden;
   	overflow: hidden;
   	margin:0;
   	padding:0;
   	box-shadow: border-box;
   	font-weight: 700;
   	color:#666;
   }
    .auto-textarea-input{
   	  	font-family:Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif ;
   	    position: absolute;
   	    width:100%;
   	    margin:0;
   	    height: 100%;
   	    top:0;
   	    left:0;
   	   padding:0;
   	   overflow-y: hidden;
   	   color:#666;
   	   outline:0 none;
        border:none !important;
   	  } 
   .priceWrap{
   	color:#FF8300;
   	.unit{
   		font-size:.28rem;
   	}
   	.price{
   		font-size:.32rem;
   	}
   }
   .acTextFot{
   	position:absolute;
     bottom:-.2rem;
	 right:0;
   }
   .auto-title{
   	width:100%;
   }
   .goodsJoin{
		display: block;
		width: 100%;
		height: .9rem;
		line-height: .9rem;
		margin-top:.3rem;
		text-align: center;
		font-size: $btnSize;
		color: $communityMainColor;
		background: #FFFFFF;
		border-radius: $btnBorderRadius;
		border: 1px solid $communityMainColor;
   }
   .rightInner{
   	display: flex;
   	justify-content: space-between;
   	margin-top:.1rem;
   }
   .supportPerson{
   	color:#6F6F6F;
   	font-size:.32rem;
   }
</style>
