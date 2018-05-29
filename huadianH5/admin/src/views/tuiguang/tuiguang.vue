<template>
	<div class="wrapper">
		<div class="headerComponent">
				<div class="headerWrap">
				   	  <span class="icon iconfont routerBack" v-html="iconLeft" @click="routerBack"></span>
				   	  <p class="headerTitle" v-html="title"></p>
				</div>
		</div>
		<div class="headeRight">
		    <router-link class="btn" :to="{path:'/record'}">链接用户</router-link>
	    </div>
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
						<span>每连接成功一位好友，奖励</span>
						<span class="jiFenNum">{{jiFenNum}}</span>元代金券 ！
					</div>
					<div>
						<!--<div class="inviteBtn" @click="shareToFriend">邀请好友</div>-->
						<div class="inviteBtn" @click="downloadCode">下载二维码</div>
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
				</div>
			</div>
		</div>
	</div>
</template> 
<script>
	import { mapGetters} from 'vuex'
export default {
	data(){
		return {
			showTitle:false,
			title:"邀请好友",
			iconLeft:"&#xe608;",
			qrCode:'',
			jiFenNum:10,
			inviteCode:123456,
			bgImg:require("src/assets/img/ifBg.png"),
			data:[{
				txt:'到定点“壹元商户”消费时，只要在平台购买消费额等值的特权商品，当次在商户消费款仅需1元/次。',
			},{
				txt:'在“壹元电器”专区购机时，只要在平台购机额等值的特权商品，当次购机款仅需1元/台。',
			},{
				txt:'在“壹元蛋糕”专区消费时，只要在平台购买蛋糕额等值的特权商品，当次蛋糕款仅需1元/个。',
			},{
				txt:'在“壹元家具”专区购物时，只要在平台购买家具款等值的特权商品，当次家具款仅需支付1元/件。',
			}],
		}
	},
	computed: {
      ...mapGetters([
          'getXToken'
      ]),
    },
	beforeCreate(){
            this.$store.dispatch('showTitle', this.showTitle);
			this.$store.dispatch('title', this.title);
     },
	methods: {
		 shareToFriend(){
		 	this.share({url:"http://apph5.pengjipay.com/#/linkRegister?sellerId="+this.sellerId});
		 },
		 routerBack(){
        	this.backtoPage();
	   },
	   downloadCode(){
	   	   console.log(this.qrCode);
	   	   let data={url:this.qrCode};
		   	   let ua = navigator.userAgent.toLowerCase();
				if (/iphone|ipad|ipod/.test(ua)) {
					//调用ios的方法
					  let bridge = getJsBridge();
	    	          let cc=bridge.call("downloadCode",data);
				}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
					//调用android的方法
					 let cc=js.downloadCode(JSON.stringify(data));
				}else{
					return;  //pc端
				}
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
	   	 this.qrCode=this.getXToken.qrCodeUrl;
	   	 this.sellerId=this.getXToken.sysUserId;
	   }
}
</script>
<style lang="scss" scoped>
.headeRight{
	    height: 0.78rem;
	    line-height:.78rem;
		position: fixed;
		top:0;
		right:0;
		z-index:15;
		background:#FFFFFF;
		.btn{
			display: inline-block;
			padding-right:.2rem;
			font-size:.28rem;
			color:#333;
		}	
	}
.ulItem .warmNote{
	font-size:.28rem ;
	color: #555555;
}
 .wrapper .slidesClassMain{
 	padding-top: .8rem;
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
	}
</style>
