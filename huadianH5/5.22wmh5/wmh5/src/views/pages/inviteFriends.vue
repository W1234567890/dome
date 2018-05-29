<template>
	<div class="wrapper">
		<div class="slidesClassMain" ref='slidesClassMain'>
			<div v-scrollt>
				<header class="header">
					<img :src="bgImg" class="bannerImg" />
				</header>
				
				<div class="inviteFriends">
					<div class="squareBg">
						<span class="caption"></span>
						<img :src="qrCode" class="qrCode" />
					</div>
					<div class="inviteNote">
						<span>每成功连接一位好友，</span>
						<span>可获得好友每次消费的1%现金奖励！</span>
					</div>
					<div>
						<div class="inviteBtn" @click="shareToFriend">邀请好友</div>
					</div>
				</div>
				
				<div class="footer">
					<div class="title">会员1元消费权益</div>
					<ul class="ulItem">
						<li class="warmNote">下载APP成为会员，尊享下列权益：</li>
						<li class="" v-for="(item,key) in data">
							<span class="orderNum">{{key+1}}</span>
							<span>{{item.txt}}</span>
						</li>
					</ul>
					<ul class="ulItem footerUItem">
						<li class="warmNote">注意:</li>
						<li v-for="vo in tip">{{vo.txt}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template> 
<script>
export default {
	data(){
		return {
			showTitle:false,
			title:"邀请好友",
			qrCode:'',
			jiFenNum:50,
			inviteCode:123456,
			bgImg:require("src/assets/img/ifBg.png"),
			data:[{
				txt:'到定点“畅享商户”消费时，只要在平台“特权商品”区购买不小于当次消费额的商品，当次在商户的消费仅需1元；',
			},{
				txt:'在“畅享电器”区消费时，只要在平台“特权商品”区购买不小于当次消费额的商品，当次购买的电器仅需1元；',
			},{
				txt:'在“畅享蛋糕”区消费时，只要在平台“特权商品”区购买不小于当次消费额的商品，当次购买的蛋糕仅需1元；',
			},{
				txt:'在“畅享家具”区消费时，只要在平台“特权商品”区购买不小于当次消费额的商品，当次购买的家具仅需1元。',
			}],
			tip:[{
				txt:'在“特权商品”区购买的商品金额大于当次消费额时，不设找零，当次尊享仅需1元。'
			},{
				txt:'在“特权商品”区购买的商品金额小于当次消费额时，补足差价，当次尊享还是1元。'
			}],
			remark:'1、用这个APP买3至5盒快餐，加1元5斤水果拎走。'+
			       '2、用这个APP吃喝玩乐消费按规则享受1元/次。点击免费下载，更多权益等着您！',
			HImg:'https://shaohuadian17.oss-cn-beijing.aliyuncs.com/Android_ce_shi/128-128.png'
		}
	},
	beforeCreate(){
            document.title="好事共享";
            this.setWebTittle('好事共享');
     },
	methods: {
		 shareToFriend(){
		 	//this.share({url:"http://192.168.1.211:8080/spendless/dist/#/linkRegister"});
		 	this.share({url:"http://apph5.pengjipay.com/#/linkRegister",imge: this.HImg,description: this.remark});
		 }
	},
	beforeMount(){
		if(this.$router.currentRoute.query.qrCode){
			this.qrCode=this.$router.currentRoute.query.qrCode;
		}
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	},
	mounted(){
	   	this.$refs.slidesClassMain.style.height = window.innerHeight +"px";
	}
}
</script>
<style lang="scss" scoped>
.ulItem .warmNote{
	font-size:.28rem ;
	color: #555555;
}
 .wrapper .slidesClassMain{
 	background: #FFFFFF;
 }
	.header{
		margin-bottom: .6rem;
	}
	.header .bannerImg{
		width: 100%;
		height: auto;
	}
	.squareBg{
		width: 4.7rem;
		height: 3.8rem;
		background: url('~src/assets/img/squareBg.png') no-repeat center center;
		background: cover;
		-webkit-background-size: cover;
		position: relative;
		justify-content: center;
	}
	.squareBg .caption{
		position: absolute;
		color: #fff;
		font-size: .28rem;
		top: 0.06rem;
		left: 1.5rem;
	}
	.squareBg .qrCode{
	    width: 3rem;
		height: 3rem;
		margin:0.55rem  0 .15rem 0;
	}
	.squareBg .inviteCode{
		color: #666666;
		font-size: .24rem;
	}
	.inviteFriends,.squareBg{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    flex-direction: column;
	}
	.inviteFriends .inviteNote{
		margin: .7rem 0 .3rem 0;
		font-size: .26rem;
		color: #666666;
	}
	.inviteFriends .jiFenNum{
		color: #FF4C50;
	}
	.inviteFriends .inviteBtn{
		width: 6.4rem;
		height: .9rem;
		line-height: .9rem;
		color: #fff;
		font-size: .36rem;
		border-radius: 1rem;
		background: #FF4C50;
		text-align: center;
	}
	.footer .title{
		text-align: center;
		font-size: .32rem;
		color: #F75E4E;
		width: 5.4rem;
		margin: .7rem auto .5rem auto;
		background: url('~src/assets/img/redLine.png') no-repeat center center;
		background-size:contain ;
		-webkit-background-size: contain;
	}
	.footer{
		padding-bottom:1rem;
	}
	.ulItem>li{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    color:#666666 ;
	    font-size: .24rem;
	    margin-bottom:.3rem ;
	    padding: 0 .55rem;
	}
	.ulItem>li span:nth-child(2){
		display: inline-block;
		width:80%;
	}
	.ulItem>li .orderNum{
		display: inline-block;
		margin-right: .2rem;
		width:.36rem;
		height:.36rem;
		color: #fff;
		text-align: center;
		background: #E7580C;
		border-radius: 50%;
		line-height:.36rem;
		font-size:.2rem;
		padding:0 .1rem;
	}
	.footerUItem li{
		margin-bottom:.1rem ;
	}
</style>
