<template>
	<div class="wrapper">
		<div class="contentBox">
			<form method="get" action="">
				<ul class="ulItem">
					<li>
						<span>手机号：</span>
						<input type="text" class="telPhone" readonly="readonly" v-model="telPhone"/>
					</li>
					<li class="">
						<span>验证码：</span>
						<input type="tel"  class="testCode" placeholder="输入验证码"   v-model="testCode" maxlength="4"/>
						<div  class="getSecurityCode" id="getSecurityCode"  @click ="getMessageCode()" :class="timer == 0 || timer == null? '' : 'disabled'">{{timer ? timer + 's 后获取' : '获取验证码'}}</div>
					</li>
					<li>
						<span>新密码：</span>
						<input type="password" class="" placeholder="输入6位数密码"   v-model="newPassWord" maxlength="6"/>
					</li>
					<li>
						<span>确认密码：</span>
						<input type="password" class="" placeholder="请再次输入密码"  v-model="rePassWord" maxlength="6"/>
					</li>
				</ul>
			</form>
			<div class="footer" @click="finishSet">确认</div>
		</div>
	</div>
</template> 

<script>
import { mapGetters,mapActions } from 'vuex'
import api from 'src/mixins/api'
export default {
	data(){
		return {
			telPhone:'',
			testCode:'',
			newPassWord:'',
			rePassWord:'',
			title:'重置支付密码',
			showTitle:true,
		}
	},
	mixins: [ api],
	computed: {
      ...mapGetters([
          'timer',
          'getXToken',
      ]),
    },
    watch:{
    	testCode(e){
    		this.testCode = e.replace(/\D/,'');
    	},
    	newPassWord(e){
    		this.newPassWord = e.replace(/\D/,'');
    	},
    	rePassWord(e){
    		this.rePassWord = e.replace(/\D/,'');
    	},
    },
   beforeMount(){
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.telPhone = this.getXToken.phone;
		this.telPhone = this.telPhone.substring(0,3)+"****"+this.telPhone.substring(7,11);
	},
	methods: {
		postData(){
			let data = {
				cashPwd:this.newPassWord,
				captcha:this.testCode,
				type:2,
			},
			url="syscash/setCashPwd";
			//console.log(data)
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						//console.log(res)
						if( res.meta.code == 10000){
							this.toastMsg('密码重置成功');
							this.$router.go(-1);
						};
						//console.log(res.data)
					}
				});
			});
		},
		//获取短信验证码
		getMessageCode(timer){
			//let tel = this.$router.currentRoute.query.userphone;
		 	if(this.timer){
	      		return;
	      	}
		 	if(this.timer == null || this.timer == 0){
		 		this.TimerInterval(true,60);
		 		let data = {
					phone:this.getXToken.phone,
					tempCode:'set_cash_pwd',
					productSerialNumber:this.productSerialNumber,
				},
				url="syssms/send";
				this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							//console.log(res);
							if( res.meta.code == 10000){
								this.mesCode = res.data;
								this.toastMsg('发送成功');
							}
						}
					});
				});
		 	}
		},
		finishSet(){
	       	if(this.testCode==""){
	       		this.toastMsg("验证码不能为空","fail");
	       		return ;
	       	};
	       	if(this.testCode!=this.mesCode){
	       		this.toastMsg("验证码不正确","fail");
	       		return ;
	       	};
	       	if(this.newPassWord==''){
       			this.toastMsg("请填写新密码","fail");
       			return ;
       		};
       		if(this.rePassWord == ''){
   				this.toastMsg("请再次输入密码","fail");
   				return ;
   			};
   			if(this.newPassWord != this.rePassWord){
				this.toastMsg("两次密码输入不一致","fail");
				return ;
			};
			this.postData();
	    }
	}
}
</script>

<style lang="scss" scoped>
	.contentBox{
		margin-top: .2rem;
	}
	.ulItem>li{
		height:1rem ;
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
		font-size: .3rem;
		color: #333;
		padding: 0 .2rem;
		background: #fff;
		margin-top: .2rem;
		position: relative;
	}
	.ulItem .telPhone{
		color: #999;
	}
	.ulItem>li>span{
		width:1.6rem ;
	}
	.ulItem>li>input{
		height: .6rem;
		width: 5.5rem;
		font-size: .3rem;
		border: 0;
		outline: none;
	}
	::-webkit-input-placeholder{
		font-size: .28rem;
		color: #999;
	}
	#getSecurityCode{
		height: .5rem;
		line-height: .5rem;
		border: solid 1px #DD1E1E;
		color: #DD1E1E;
		font-size: .24rem;
		padding: 0 .2rem;
		border-radius: 0.1rem;
		position: absolute;
		right: 0.2rem;
		top:.2rem;
	}
	#getSecurityCode.disabled{
		border: solid 1px #999;
		color: #999;
	}
	.footer{
		width: 7.1rem;
		background:#E7580C ;
		color: #fff;
		font-size: .36rem;
		text-align: center;
		margin: 0 auto;
		height: .9rem;
		line-height: .9rem;
		border-radius: .1rem;
		margin-top: .6rem;
	}
	
</style>