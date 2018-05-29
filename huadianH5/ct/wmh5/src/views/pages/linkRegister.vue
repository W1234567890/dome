<template>
	<div class="wrapper">
		<div class="slidesClassMain" ref='slidesClassMain'>
			<div v-scrollt>
				<header class="header">
					<img :src="bgImg" class="bannerImg" />
				</header>
				<div class="mainContent">
					<img :src="spendless" class="spendless" />
					<ul class="userForm">
						<li class="formItem" :class="isBottomShow ? 'noMargin' : ''">
							手机号：<input type=" tel" maxlength="11"  v-model="telPhone" id="telPhone" class="telPhone" @keyup="isTelCorrect"/>
						</li>
						<li class="z_code formItem">
							验证码：<input  v-model="captcha" type=" tel" minlength="6" maxlength="18" id="inpCode" class="inpCode" @keyup="checkCaptcha" />
							<span class="getSecurityCode" 
								id="getSecurityCode" 
								 @click="isTelPhone ? getMessageCode() : ''" 
								 :class="!timer ? (isTelPhone ? 'active' : '') : ''">
								 {{timer ? timer + 's 后获取' : '获取验证码'}}
							</span>
						</li>
						<li class="formItem">
							设置密码：<input type="passWord" maxlength="18"  v-model="passWord" id="passWord" class="telPhone" @keyup = "checkPassword" />
						</li>
					</ul>
					<div class="agreeProtocol">
						<span class="select" @click="isAgreeProtocol()" :class="isChecked ? 'checked' :''">
							<span class="icon iconfont" v-html="checkRight" v-if="isChecked"></span>
						</span>
						<span>我已阅读并同意</span>
						<router-link :to="{path:'/registeriProtocol'}" class="protocolDetail">《用户注册协议》</router-link>
					</div>
					<div class="sure_btn" @click="isActive ? confirm() : ''" :class="isActive ? 'active' : ''">{{btnTxt}}</div>
						<!--<div class="noteInf">注意：本活动为新用户专享，请输入正确手机号与验证码参与活动，就可以领取25个积分！</div>-->
					</div>
					<div class="footer">
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
			<div class="bottom" v-if="isBottomShow">
				<div class="leftSection">
					<img src='http://shaohuadian17.oss-cn-beijing.aliyuncs.com/normal/h5/static/shdLogo.png' class="wLogo" />
					<div class="noteTxt">
						<p>少花点</p>
						<p>已有{{30}}万人关注</p>
					</div>
				</div>
				<div class="downLoad" @click="downloadApp">立即下载</div>
			</div>
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			showTitle:false,
			title:"注册链接",
			index : 0,
			note:'该手机号已被注册！',
			telPhone : null,
			inpCode : null,
			passWord:null,
			captcha: null,
			isBottomShow: false,
			isTelPhone: false,
			isActive:false,
			btnTxt:'确认注册',
			isChecked:true,
			checkRight:'&#xe707;',
			bgImg:require("src/assets/img/registerBg.png"),
			spendless:require("src/assets/img/spendless.png"),
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
		}
	},
	beforeCreate(){
        clearInterval(window.TimerInterval);
		document.title="邀请好友";
    },
    computed: {
      ...mapGetters([
          'timer'
      ]),
    },
    beforeMount(){
		if(this.$router.currentRoute.query.sellerId){
			this.tempCode='register';
			this.parameterName="sellerId";
			this.parameter=this.$router.currentRoute.query.sellerId;
		}else{
			this.tempCode='register';
			this.parameterName="invitePhone";
			if(this.$router.currentRoute.query.phone){
				this.parameter=this.$router.currentRoute.query.phone;
			}else{
				this.parameter='';
			}
			
		}
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	},
	mounted(){
	   	this.$refs.slidesClassMain.style.height = window.innerHeight +"px";
	  },
	watch: {
		telPhone( e){
			this.telPhone=e.replace(/\D/g,'');
			/*var res = /^1(3|4|5|7|8)\d{9}$/;
			this.isTelPhone = res.test(this.telPhone);*/
			this.isBottomShow=false;
		},
		inpCode(e){
			this.inpCode=e.replace(/\D/g,'');
			this.isBottomShow=false;
		},
		passWord(e){
			//this.passWord=e.replace(/^[0-9a-zA-Z]+$/,'');
			this.isBottomShow=false;
		}
		
	},
	methods: {
		 isAgreeProtocol(){
		 	this.isChecked = !this.isChecked;
		 },
		 //手机号是否正确
		isTelCorrect(){
//			var res = /^1(3|4|5|7|8)\d{9}$/;
 			var res = /^1\d{10}$/;
			if(this.telPhone.length<11){
				this.isBottomShow=false;
				this.isTelPhone=false;
			}
			if(this.telPhone.length == 11){
	       		if(!res.test(this.telPhone)){
		       		this.toastMsg('手机号不正确');
		       		return;
		       	}else{
		       		let url="login/isexist",
						data = {
							phone:this.telPhone,
							productSerialNumber:"326407336442855424",
						};
						this.getByUrl({data,url}, res=>{
							this.ajax({
								url : res.url,
								data : res.data,
								success:( res)=>{
									console.info(res);
									if(res.meta.success){
										this.toastMsg('该手机号已被注册,请前往app登录');
										this.isBottomShow=true;
										return;
									}else{
										this.isTelPhone = true;
									}
								}
							});
						});
		       		
		       	};
			};
		},
		
		//密码是否正确
		checkPassword(){
			if(this.passWord.length>0){
				this.isBottomShow=false;
			}
			let reg=  /^[0-9a-zA-Z]+$/;
			if(!reg.test(this.passWord)){
				let len= this.passWord.length;
				this.passWord = this.passWord.substring(0,this.passWord.length-1);
				this.toastMsg('只能输入数字或字母及数字字母组合！');
			};
			if(this.passWord.length>=6&&this.passWord.length <= 18){
				if(this.captcha.length == 4 && this.telPhone.length==11){
					this.isActive =true;
				}
			}
		},
		//验证码是否正确
		checkCaptcha(){
			if(this.captcha.length>0){
				this.isBottomShow=false;
			}
			if(this.captcha.length == 4){
				if(this.captcha != this.mesCode){
					this.toastMsg('验证码不正确');
				}else{
					if(this.passWord.length == 6 && this.telPhone.length == 11){
						this.isActive =true;
					}
				}
			}
		},
		//注册
		getUserInf(){
			let url="login/register",
			data = {
				phone:this.telPhone,
				password:this.passWord,
				checkCode:this.captcha,
				productSerialNumber:"326407336442855424",
				regType:2,
				[this.parameterName]:this.parameter
			};
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						//console.log(res);
						if(res.meta.code == '10000'){
							this.isBottomShow=false;
							this.$router.push({path:'/linkSuccess'});
						}else if(res.meta.code == '10001'){
							this.toastMsg(res.meta.message);
						}else{
							this.toastMsg('注册失败，请联系客服!');
						}
					}
				});
			});
		},
		getMessageCode(){
			this.captcha = '';
		 	if(this.timer){
	      		return;
	      	}
		 	if(this.timer == null || this.timer == 0){
		 		this.TimerInterval(true,60,1111);
		 		let data = {
					phone:this.telPhone,
					tempCode:this.tempCode,
					productSerialNumber:'326407336442855424',
				},
				url="sms/send";
				this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							//console.info(res);
							if( res.meta.code == 10000){
								this.mesCode = res.data;
								this.toastMsg('发送成功');
							}
						}
					});
				});
		 	}
		},
		confirm(){
			this.getUserInf();
//			var res = /^1(3|4|5|7|8)\d{9}$/;
			var res = /^1\d{10}$/ 
       		if(this.captcha=="" || !this.captcha){
       			this.toastMsg('验证码不能为空');
       			return;
       		};
	  },
	  downloadApp(){
		window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.uniaip.android";
	  }
	}
}
</script>
<style lang="scss" scoped>
.ulItem .warmNote{
	font-size:.28rem ;
	color: #E7580C;
	margin-top: .4rem;
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
	.mainContent{
		padding: 0 .7rem;
		text-align: center;
	}
	.agreeProtocol .select,.agreeProtocol{
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
	.agreeProtocol{
		font-size: .24rem;
		color: #333;
		text-align: start;
		justify-content: flex-start;
	}
	.agreeProtocol .select{
		width: .34rem;
		height: .34rem;
		border-radius: 0.06rem;
		border: solid 1px #B3B3B3;
		margin-right: .12rem;
		justify-content: center;
	}
	.agreeProtocol .select.checked{
		border: solid 1px #E7580C;
	}
	.agreeProtocol .icon{
		font-size: .26rem;
		color: #E7580C;
	}
	.agreeProtocol .protocolDetail{
		color: #6692DB;
	}
	.mainContent .spendless{
		width: auto;
		height: .5rem;
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
	.ulItem>li .orderNum{
		display: inline-block;
		margin-right: .2rem;
		width:.36rem;
		height:.36rem;
		padding:0 .1rem;
		color: #fff;
		text-align: center;
		background: #E7580C;
		border-radius: 50%;
		line-height:.36rem;
		font-size:.2rem;
	}
	
	/*新增样式*/
	.userForm{
		margin-top: .4rem;
	}
	.userForm li{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    color: #e7580c;
	    border-bottom: solid 1px #e7580c;
	    padding: .15rem 0;
	    position: relative;
	    margin-bottom: .2rem;
	    /*border:1px solid red;*/
	}
	.userForm .noMargin{
		margin: 0;
	}
	.userForm .formItem:before{
		content:'';
		width:0;
		height:.2rem;
		border-left:1px solid #e7580c;
		position: absolute;
		left:0;
		bottom:0;
	}
	.userForm .formItem:after{
		content:'';
		width:0;
		height:.2rem;
		border-right:1px solid #e7580c;
		position: absolute;
		right:0;
		bottom:0;
	}
	.userForm .telPhone{
		width: 4rem;
	}
	.footerUItem li{
		margin-bottom:.1rem ;
	}
	input{
		outline: none;border: 0;
		font-size: .3rem;
		height: .6rem;
		width: 3rem;
		background: transparent;
		color: #e7580c;
	}
	.inpCode{
		width:1.8rem ;
	}
	.z_code{
		position: relative;
	}
	#getSecurityCode{
		border-radius: 0.1rem;
		padding: 0 .14rem;
		height: .6rem;
		line-height: .6rem;
		margin-left: .1rem;
		position: absolute;
		right:0 ;
		top:.15rem;
		border: solid 1px #b3b3b3;
		color: #b3b3b3;
		margin-right: .2rem;
	}
	#getSecurityCode.active{
		border: solid 1px #e7580c;
		color: #e7580c;
	}
	.sure_btn{
		background: #e7580c;
		color: #fff;
		font-size: .36rem;
		height: .9rem;
		line-height: .9rem;
		text-align: center;
		margin-top: .8rem;
		border-radius: .1rem;
		opacity: .6;
	}
	.sure_btn.active{
		opacity: 1;
	}
	.noteInf{
		color: #666;
		font-size: .2rem;
		margin-top: .2rem;
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
		position: absolute;
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
		background: #E7580C;
		border-radius: .1rem;
		padding: .1rem .2rem;
	}
</style>
