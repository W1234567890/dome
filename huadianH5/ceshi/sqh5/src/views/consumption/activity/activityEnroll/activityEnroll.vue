<template>
	<div class="enrollContent">
		<div class="contain">
			<div class="enrollHd" v-if="getActivityGoodActGoods" v-for="(vo,key) in getActivityGoodActGoods">
				<div class="enrollImgWrap">
					<img class="enrollImg" :src="getlogoUrl(7.4,3.5,vo.goodImgs,true)" />
					<!--<div class="enrollImg" :style="{background:getlogoUrl(7.4,3.5,vo.goodImgs)}"></div>-->
				</div>
				<div class="enrollHdRight">
					<div class="title">
						<div class="auto-title-wrapper">
							<pre class="auto-title-block">{{vo.goodName}}</pre>
						</div>
					</div>
					<div class="rightInner">
						<div class="priceWrap">
							<span class="price" v-html="vo.sellPrice"></span>
						</div>
						<div class="noteInf">
							<span class="txt">已报名</span>
							<span class="enrolled">{{vo.buys}}</span>
							<span>/{{vo.limits}}</span>
						</div>
					</div>
				</div>
			</div>
			<ul class="enrollBd">
				 <li class="enrollItem" v-for="(vo,key) in enrollMes">
				 	<label :for="vo.itemName" class="labelItem">
				 		<span class="icon iconfont requiredFont" v-html="vo.required?icon.icon1:''"></span>
					    <span class="preTxt">{{vo.item}}</span>
				 	</label>
					<input class="iptItem" :placeholder="'请输入'+vo.placeholer" :id="vo.itemName" v-model="vo.substance"/>
				 </li>
			</ul>
		</div>
		<div class="tip">
			<p>带<span class="iconfont requiredFont" v-html="icon.icon1"></span>为必填项</p>
		</div>
		<div class="toJoin"  @click="subBtn">提交</div>
		<div class="noticeOrganizer">
			 <label>
			 	<input type="checkbox" class="mgc mgc-success mgc-lg" />
			 	<span>关注该组织活动者</span>
			 </label>
		</div>
	</div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data() {
		return {
			activityId: null,
			icon:{
				icon1:"&#xe620;",
			},
			enrollMes: [{   
				item:"姓名",
				itemName:"userName",
				substance:null,
				required:true,
				placeholer:"姓名"
			},{   
				item:"手机",
				itemName:"telPhone",
				substance:null,
				required:true,
				placeholer:"手机号"
			},{   
				item:"邮箱",
				itemName:"email",
				substance:null,
				required:false,
				placeholer:"邮箱"
			}]
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
	mounted(){
		this.activityGoodActGoods({
	    	publishId: this.$router.currentRoute.query.id,
	    },(res)=>{
	    	this.$store.dispatch("setActivityGoodActGoods",res.data)
	    	console.info(this.getActivityGoodActGoods)
	    })
	},
	methods: {
		 subBtn(){
		 	let setList=this.enrollMes;
		 	for(let i=0;i<setList.length;i++){
		 		if(setList[i].required){
		 	 		if(setList[i].substance==""||setList[i].substance==null){
		 	 			this.toastMsg(setList[i].itemName+"不能为空");
		 	 			return;
		 	 		}
		 	 	}
		 	}
		 	let res = /^1(3|4|5|7|8)\d{9}$/;
		 	if(!res.test(setList[1].substance)){
		 		this.toastMsg("手机号不正确");
		 	 	return;
		 	}
		 	this.activityEnrollSave({
		 		name: setList[0].substance,	//String	N		姓名（报名）
				phone: setList[1].substance,	//String	N		手机号（报名）
				publishId: this.$router.currentRoute.query.id,	//String	Y		主题id
		 	},res=>{
		 		console.info( res);
		 	})
		 	/*this.actPayActWxpay({
		 		reciverName: setList[0].substance,	//String	N		姓名（报名）
				reciverPhone: setList[1].substance,	//String	N		手机号（报名）
				publishId: this.$router.currentRoute.query.id,	//String	Y		主题id
				payPosition: 'actEnroll',
				totalpay: 0,
				goodList: [{
					goodsId:this.getActivityGoodActGoods,
					goodsNum:1,goodsPayPrice:0
				}],
				goodsNum: 1,
				realpay: 0,
				state: 1,
		 	},res=>{
		 		console.info( res)
		 	})*/
		 }
	},
	beforeMount() {
		this.activityId = this.$router.currentRoute.query.activityId;
	}
}
</script>
<style lang="scss" scoped>
@import "~src/assets/css/function.scss";
.enrollContent {
	width: 100%;
}

.enrollHd {
	width: 100%;
	padding: .1rem 2%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-bottom: .2rem;
	border-bottom: 1px solid #EAEAEA;
	background: #ffffff;
	.enrollImgWrap {
		width: 1.35rem;
		height: 1.35rem;
	}
	.enrollImg {
		width: 100%;
		height: 100%;
	}
	.enrollHdRight {
		width: 5rem;
		margin-left: .2rem;
	}
}
	
.rightInner{
   	display: flex;
   	justify-content: space-between;
   	margin-top:.1rem;
   }
 .noteInf {
	display: flex;
	justify-content: space-between;
	font-size: .28rem;
	.enrolled {
		color:#F87314;
	}
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
	.priceWrap {
		color: #999;
		.unit {
			font-size: .28rem;
		}
		.price {
			font-size: .32rem;
		}
	}
.enrollBd {
	margin-top:.2rem;
	background: #FFFFFF;
	padding:.15rem 2%;
}
.enrollItem{
	height:1rem;
	line-height: .8rem;
	border-bottom:1px solid #eaeaea;
	display: flex;
	justify-content:flex-start;
	align-items: center;
	color:#666;
}
.enrollItem:last-child{
	border:none;
}
.labelItem{
	margin-right:.2rem;
	.iconfont{
		display:inline-block;
		width:.25rem;
		font-size: .24rem;
	}
}
.iptItem{
	height:.6rem;
	line-height:.6rem;
	width:65%;
	border:none !important;
	outline: none;
	font-size:.3rem;
}
.requiredFont{
	color:#e7580c;
}
.tip{
  margin-top:.2rem;	
  padding:0 2%;
  color:#666;
}
.toJoin {
	display: block;
	width: 90%;
	margin-top:.2rem;
	margin-left:5%;
	height: .9rem;
	line-height: .9rem;
	text-align: center;
	font-size: $btnSize;
	color: #ffffff;
	background: $communityMainColor;
	border-radius: $btnBorderRadius;
	border: 1px solid $communityMainColor;
}
.noticeOrganizer{
	margin-top: .2rem;
	margin-left:5%;
	font-size: .3rem;
}
.noticeOrganizer .icon{
	font-size: .6rem;
	color: #CACCCF;
}

.mgc {
	position: relative;
	width: 16px;
	height: 16px;
	background-clip: border-box;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	margin: -.15px .6px 0 0;
	vertical-align: text-bottom;
	border-radius: 3px;
	-webkit-transition: background-color .25s;
	transition: background-color .25s;
	background-color: #fff;
	border: 1px solid #d7d7d7;
	margin-right: .1rem;
}

.mgc:checked:after {
	content: '';
	display: block;
	height: 4px;
	width: 7px;
	border: 0 solid #333;
	border-width: 0 0 2px 2px;
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
	position: absolute;
	top: 3px;
	left: 3px
}

.mgc:disabled {
	opacity: .65
}

.mgc:focus {
	outline: none;
	box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.075), 0 0 2px #38a7ff
}

.mgc:checked {
	background-color: #fff;
	border-color: #d7d7d7;
}

.mgc:checked:after {
	border-color: #414141
}
.mgc-success {
	background-color: #fff;
	border: 1px solid #d7d7d7;
}

.mgc-success:checked {
	background-color: #5cb85c;
	border-color: #5cb85c;
}

.mgc-success:checked:after {
	border-color: #fff
}
.mgc-lg {
	width: 19px;
	height: 19px;
}

.mgc-lg:checked:after {
	top: 3px;
	left: 3px;
	height: 5px;
	width: 10px
}
</style>