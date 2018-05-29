<template>
	<div class="wrapper">
		<div class="contentBox">
			<ul class="ulItem">
				<li>
					<router-link :to="{path:'/tiXianWay'}" :class="!hasBankCard ? 'noCard' : ''">
						<div class="itemText" v-if="hasBankCard">
							<img :src="bankInf.bankLogo" class="bankIcon" />
							<!--<span class="icon iconfont aliIcon" v-html="item.icon" :style="{color:item.iconColor}"></span>-->
							<div class="aliPay">
								<p>{{bankInf.bankName}}</p>
								<p>尾号 {{bankInf.bankCard}}</p>
							</div>
						</div>
						<span>
							<span class="noteMessage" v-if="!hasBankCard">请选择银行卡</span>
							<span class="icon iconfont rightArrow">&#xe608;</span>
						</span>
					</router-link>
				</li>
			</ul>
			<ul class="itemList">
				<li>提现金额</li>
				<li class="inpAmount">
					<span>￥</span>
					<input type="text"  v-model="rechartValue" :placeholder="remainData.noteInputArea"/>
				</li>
				<li>当前可用余额{{remainData.remainMony}}元，<span class="outPutAll" @click="outPutAllMony()">全部提现</span></li>
			</ul>
			<div class="footer">
				<div class="note">手续费{{remainData.cashFee}}元/笔</div>
				<p @click="isEnoughMony ? submit() : ''" :class="isEnoughMony ? '' : 'disabled'">确认提现</p>
			</div>
		</div>	
		<div class="CPwdMain" ref="isCardPassword" v-show="isShow">
			<span class="icon iconfont closePopWin" @click="closePopWin">&#xe617;</span>
			<p class="CPwdTit">确认提现信息</p>
			<div class="CPwdMain1">
				<div class="CPwdItem clearfix">
					<span class="CPwdLeft">{{bankInf.bankName}}</span>
					<span class="CPwdRight">尾号（{{bankInf.bankCard}}）</span>
				</div>
				<div class="CPwdItem clearfix">
					<span class="CPwdLeft">提现金额</span>
					<span class="CPwdRight">{{rechartValue}}元</span>
				</div>
				<p class="CPwdTit1">请输入支付密码</p>
				<div class="CPwdInput clearfix" @click="_password">
					<input type="password" class="passWord" name="" id="" v-for="(vo,i) in pwd" :value="vo" hasvalue="false" maxlength="1" readonly/>
					<div class="CPwdDlist" v-for="(key,vo) in pwd.length?6-pwd.length:6"></div>
					<!--<div class="CPwdDlist" v-for="(key,vo) in 6" v-if="!vo&&pwd.length<6"></div>-->
				</div>
				<p class="CPwdDEdit">
					<span>手续费：{{remainData.cashFee}}元</span>
					<router-link :to="{path:'/resetPayPassword',query:{id:0}}">忘记支付密码</router-link>
				</p>
				<!--<div class="CPwdDBtn" @click="widthDraw">确认</div>-->
			</div>
		</div>
		<keyBoard-Component :callback="callback" v-on:showKeyBoard="showKeyBoard"></keyBoard-Component>
		
		<div class="setPayPassWordPop" v-if="isSetPassWordShow">
			<span class="icon iconfont closePopWin" @click="closePopWin">&#xe617;</span>
			<div class="title">请设置支付密码</div>
			<input type="password" id="passWord" placeholder="请设置6位支付密码" maxlength="6" v-model="newPassword"/>
			<input type="password" id='rePassWord' placeholder="请确认密码" maxlength="6" v-model="prePassword"/>
			<div class="submitBtn" @click="setPassWord">确认</div>
		</div>
		
		<div class="mask"  id="mask" v-if="isMaskShow"></div>
		
	</div>
</template> 


<script>
import { mapGetters,mapActions } from 'vuex'
import keyBoardComponent from 'src/components/zl-components/keyBoardComponent.vue'

export default {
	data(){
		return {
			bankInf:{
				
			},
			remainData:'',
			reChartMony:500,
			cashMin:'',
			cashMax:'',
			rechartValue:'',
			noteInputArea:'',
			pwd:[],
			isEnoughMony:'',
			isShow:false,
			isSetPassWordShow: false,
			isMaskShow:false,
			hasBankCard:false,
			newPassword:'',
			prePassword:'',
			title:'提现',
			showTitle:true,
			callback:{},
		}
	},  
	components:{
		keyBoardComponent
	},
    // keypoint：执行方法  
    // “将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。”  
    mounted() {  
    	this.callback = {
			ref:this.$refs,
			callback:( callback)=>{
				/*this.isShow = false;
				document.getElementById("mask").style.display="none";
				var  inpList = document.getElemenstByClassName("passWord");
				alert(inpList.length)
				for(var i=0; i<inpList.length;i++){
					inpList[0].value='';
				}*/
				let url='syscash/sureCash',
				   data={
				   	  id:this.bankInf.bankCardId,       //String	Y		提现银行卡ID
					  cashPwd:this.pwd.join(""),	    //String	Y	提现密码
					  cashMoney:this.rechartValue	    //String	Y	  提现金额
				   };
					this.getByUrl({data,url}, res=>{
							this.ajax({
								url : res.url,
								data : res.data,
								success:( res)=>{
									//console.info(res);
									if(res.meta.code == '10000'){
										this.isShow = false;
										this.isMaskShow = false;
										this.remainData.remainMony=this.remainData.balance-this.rechartValue;
										this.toastMsg("已提交提现审核，敬请期待！");
										setTimeout(()=>{
											this.$router.push({path:'/incomeIndex',query:{tiXian:true}});
										},1500)
									}else{
										if(res.meta.message=='cashPwd error'){
											this.toastMsg("提现密码不正确");
										}else{
											this.toastMsg("系统错误！");
										}
										
									}
								}
							});
					});
			}
		};
    },
	watch: {
		/*限制输入的提现金额*/
		rechartValue( e){
			this.rechartValue=e.replace(/\D/g,'');
			if(this.rechartValue>this.cashMax){
				//this.toastMsg("输入金额不能大于"+this.cashMax,"fail");
				this.rechartValue = this.rechartValue.substring(0,4);
			};
		},
		newPassword(e){
			this.newPassword=e.replace(/\D/g,'');
		},
		prePassword(e){
			this.prePassword=e.replace(/\D/g,'');
		}
	},
	methods: {
		getBackStageData(){
			let data = {},
			url="syscash/toCash";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						//console.info(res);
						this.bankInf = res.data;
						if(this.bankInf.bankCard){
							this.hasBankCard = true;
						}
						this.bankInf.bankCard = res.data.bankCard.substring(res.data.bankCard.length-4,res.data.bankCard.length);
						this.remainData = res.data;
						this.remainData.remainMony = this.remainData.balance;
						this.remainData.noteInputArea ='请输入'+res.data.cashMin+'-'+res.data.cashMax;
						this.cashMin = res.data.cashMin;
						this.cashMax = res.data.cashMax;
						//获取从银行卡列表选择的支付银行卡
						if(this.$router.currentRoute.query.curbankCard){
							this.bankInf = this.$router.currentRoute.query.curbankCard;
							this.hasBankCard = true;
							//console.info(this.bankInf);
						};
						if(this.remainData.balance < this.cashMin){
							this.isEnoughMony = false;
						}else{
							this.isEnoughMony = true;
						}
					}
				});
			});
		},
		_password(e){
			this.ref.keybordMain.className += ' keyboardActive';
			this.$refs.isCardPassword.className += ' isCardPasswordActive';
		},
		//确认提现
		submit(){
			if(!this.hasBankCard){
				this.toastMsg("请选择银行卡","fail");
				return ;
			};
			if(this.rechartValue == ''){
				this.toastMsg("输入提现金额","fail");
				return ;
			};
			if(this.rechartValue < this.cashMin || this.rechartValue > this.cashMax){
				this.toastMsg("输入提现金额范围是"+this.cashMin+'-'+this.cashMax,"fail");
				return ;
			};
			this.isShow = true;
			this.isMaskShow = true;
		},
		showKeyBoard( ref){
			this.pwd = ref.pwd;
			this.ref = ref.ref;
		},
		//设置提现密码
		setPassWord(){
			if(this.newPassword == ""){
				this.toastMsg("请设置支付密码","fail");
				return ;
			};
			if(this.prePassword == ""){
				this.toastMsg("请填写确认密码","fail");
				return ;
			};
			if(this.prePassword != this.newPassword){
				this.toastMsg("两次密码输入不一致","fail");
				return ;
			};
			let data = {cashPwd:this.newPassword,type:1},
			url="syscash/setCashPwd";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						if(res.meta.code == "10000"){
							setTimeout(()=>{
								this.toastMsg("提现初始密码设置成功！","fail");
							},1000);
							this.isMaskShow = false;
							this.isSetPassWordShow = false;
						}
						//console.log(res)
					},
				});
			});
			this.isMaskShow = false;
			this.newPassword = '';
			this.prePassword = '';
		},
		//判断提现时是否设置过密码，以及是否符合提现标准
		outPutAllMony(){
			if(!this.hasBankCard){
				this.toastMsg("请选择银行卡","fail");
				return ;
			};
			//this.remainData.isCashPwd = 0;//0:代表未设置过提现密码,1:代表已经设置过提现密码
			if(this.remainData.isCashPwd == 1){
				if(this.remainData.balance < this.cashMin){
					this.toastMsg("可用余额小于最低提现金额,不能提现");
				}else{
					this.rechartValue = this.remainData.balance;
					this.remainData.remainMony = 0;
				};
				return ;
			};
			if(this.remainData.isCashPwd == 0){
				setTimeout(()=>{
					this.isSetPassWordShow = true;
					this.isMaskShow = true;
				},1000)
				this.toastMsg("请您设置提现初始密码！");
				return ;
			}
		},
		closePopWin(){
			this.isSetPassWordShow = false;
			this.isShow = false;
			this.isMaskShow = false;
		},
		widthDraw(){
			/*if(this.pwd.length<5){
				this.toastMsg("密码输入不完整","fail");
			}else{
				let url='syscash/sureCash',
				   data={
				   	  id:this.bankInf.bankCardId,              //String	Y		提现银行卡ID
					  cashPwd:'',	                   //String	Y	提现密码
					  cashMoney:this.rechartValue	    //String	Y	  提现金额
				   };
				  for(let i in this.pwd){
						data.cashPwd+=this.pwd[i];
				   }
				this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							console.info(res);
						}
					});
				});
			}*/
		}
	},
	beforeMount(){
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.getBackStageData();
	},
}
</script>
<style lang="scss" scoped>
	.contentBox{
		padding: .2rem .2rem;
	}
	.ulItem>li,.itemList .inpAmount,.ulItem>li>a,.itemText,.CPwdDEdit{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.itemText .bankIcon{
		height: .6rem;
		width: .6rem;
	}
	.CPwdDEdit{
		justify-content: space-between;
		color: #666666;
	}
	.ulItem>li a{
		justify-content: space-between;
		width: 100%;
	}
	.ulItem>li .noCard{
		justify-content: flex-end;
	}
	.noteMessage{
		color: #999;
		font-size: .28rem;
	}
	.ulItem>li{
		padding: .2rem .2rem;
	    background:#fff ;
	    position: relative;
	}
	.ulItem li .rightArrow{
		font-size: .4rem;
		color: #B5B7B6;
	}
	.ulItem .aliIcon{
		font-size: .9rem;
	}
	.itemList .outPutAll{
		color: #FC2E33;
	}
	.aliPay{
		margin-left:.2rem ;
	}
	.aliPay p:nth-child(1){
		font-size:.32rem;
		color: #333333;
	}
	.aliPay p:nth-child(2){
		font-size:.28rem;
		color: #9A9A9A;
	}
	.footer p{
		background: #E7580C;
		color: #fff;
		height: .9rem;
		line-height: .9rem;
		border-radius: .1rem;
		text-align: center;
		font-size: .36rem;
	}
	.footer .note{
		height: .9rem;
		line-height: .9rem;
		color: #9A9A9A;
		font-size: .26rem;
	}
	.footer .disabled{
		opacity: 0.6;
	}
	.itemList{
		background: #fff;
		margin-top: .2rem;
		color: #9A9A9A;
		font-size: .28rem;
	}
	.itemList input{
		border: none;
		outline: none;
		margin-left:.1rem ;
		font-size: .48rem;
	}
	.itemList li{
		 padding: .2rem .2rem;
	}
	.mask{
		width: 100%;
		height: 100%;
		background:rgba(0,0,0,.5);
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
	}
	input::-webkit-input-placeholder,.inpAmount span{
		font-size: .3rem;
		color: #999999;
		padding-top:.1rem ;
   	}
   	.setPayPassWordPop input{
   		border: 0;
   		outline: none;
   		border-bottom: solid 1px #EBEAEA;
   		height: .8rem;
   		line-height: .8rem;
   	}
   	.setPayPassWordPop .title{
   		font-size: .32rem;
   		height:.8rem ;
   		line-height: .8rem;
   	}
   	.setPayPassWordPop{
   		position:absolute ;
   		left: 50%;
   		top: 50%;
   		background: #fff;
   		width:4.8rem;
   		height: 3.6rem;
   		margin-left: -2.4rem;
   		margin-top: -1.8rem;
   		text-align: center;
   		color: #333333;
   		padding: 0 .35rem;
   		border-radius: .1rem;
   		z-index: 3;
   	}
   	.submitBtn{
   		background:#E7580C;
   		color: #fff;
   		height: .6rem;
   		line-height: .6rem;
   		font-size: .28rem;
   		border-radius: .04rem;
   		position: absolute;
   		left: 0;
   		width:4.1rem;
   		margin:0 auto ;
   		bottom: .2rem;
   		left: 50%;
   		margin-left:-2.05rem ;
   	}
	.CPwdMain{
	width:5.81rem;
	height:4rem;
	background-color: #FFF;
	border-radius: 5px;
	padding: .32rem .5rem .2rem .5rem;
	position:absolute;
	top: 15%;
	left: 0;
	right: 0;
	/*bottom: 0;*/
	margin: auto;
	z-index: 123;
}
.closePopWin{
	position: absolute;
	right: .2rem;
	top: 0.1rem;
	font-size: .5rem;
}
.CPwdMain1{
	padding: 0 .11rem;
}
.CPwdTit {
	height: .32rem;
	line-height: .32rem;
	text-align: center;
	font-size: .32rem;
	
	margin-bottom: .2rem;
	display: block;
	position: relative;
}
.CPwdTit:after{
	content: "";
	display: block;
	position: absolute;
	bottom: -.2rem;
	width: 100%;
	border-bottom: 1px solid #666666;
}
.CPwdItem {
	padding-top: .2rem;
	font-size: .26rem;
	
}
.CPwdLeft {
	color: #666666;
	height: .26rem;
	display: block;
	float: left;
	line-height: .26rem;
}
.CPwdRight{
	float: right;
	color: #333333;
	height: .26rem;
	display: block;
	line-height: .26rem;
}
.CPwdTit1{
	font-size: .28rem;
	height: .28rem;
	line-height: .28rem;
	margin-top: .4rem;
	margin-bottom: .2rem;
}
.CPwdInput{
	border-top:1px solid #E8E8E8 ;
	border-bottom: 1px solid #E8E8E8;
	border-right: 1px solid #E8E8E8;
	
}
.CPwdInput input{
	display: block;
	border:0;
	border-left: 1px solid #E8E8E8;
	text-align: center;
	width: .735rem;
	height: .6rem;
	float: left;
}
.CPwdDlist{
	border:0;
	border-left: 1px solid #E8E8E8;
	text-align: center;
	width: .76rem;
	height: .6rem;
	float: left;
}
.CPwdDEdit{
	/*text-align: right;*/
	margin-top: .11rem;
	height: .24rem;
	line-height: .24rem;
	font-size: .24rem;
}
.CPwdDEdit a{
	color:#0081CF ;
}
.CPwdDBtn{
	height: .65rem;
	background-color: #E7580C;
	line-height: .65rem;
	color: #FFF;
	border-radius: 5px;
	width: 100%;
	text-align: center;
	margin-top: .29rem;
}

.isCardPasswordActive{
	-webkit-transform: translateY(-20%);
	transform: translateY(-20%);
}
.isCardPassword{
	width:5.81rem;
	height:4.8rem;
	background-color: #FFF;
	border-radius: 5px;
	padding: .32rem .5rem .2rem .5rem;
	position: absolute;
	top: 15%;
	left: 0;
	right: 0;
	/*bottom: 0;*/
	margin: auto;
	z-index: 123;
	 -webkit-transform: translate(0);
	transform: translate(0);
	-webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
   
}
</style>
