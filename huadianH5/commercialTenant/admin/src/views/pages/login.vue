<template>
	<div class="wrapper">
		<div class="contentBox">
			<div class="headSetion">
				<img :src="gt_logo" class="gt_logo" />
				<span class="getPassWord">登录页面</span>
			</div>
			<ul class="userForm">
				<li>
					<p class="icon iconfont telIcon">&#xe618;</p>
					<input type="text" placeholder="请输入用户名" v-model="temp_value" id="telPhone" class="telPhone"/>
				</li>
				<li>
					<p class="icon iconfont">&#xe623;</p>
					<input  type="password" 
							placeholder="请输入密码"
							v-model="passWord" 
							class="passWord" 
							id="passWord"  
							v-if="state"
							maxlength="18"
							oncontextmenu="window.event.returnValue=false" 
							oncopy="return false;" 
							oncut="return false;" 
							onpaste="return false" 
							onselectstart="return false" />
					<input  type="text" 
							placeholder="请输入密码" 
							v-model="passWord" 
							class="passWord" 
							id="passWord"  
							v-if="!state"
							maxlength="18"
							oncontextmenu="window.event.returnValue=false" 
							oncopy="return false;" 
							oncut="return false;" 
							onpaste="return false" 
							onselectstart="return false" />
					<p class="icon iconfont eyeIcon"  @click="openEye(state)" v-html="state==true ? '&#xe610':'&#xe60e;'" :class="state==false ? 'eyeOpen' :''" ></p>
				</li>
			</ul>
			
			<div class="sure_btn" @click="confirm">
				<router-link :to="{path:routeUrl,query:{'name':'1'}}">确定</router-link>
			</div>
			<div class="footItem">
				<router-link :to="{path:'/personalCenter/register_1',query:{'name':'1'}}">立即注册</router-link>
				<router-link :to="{path:'/personalCenter/retrievePassword',query:{'name':'1'}}">忘记密码？</router-link>
			</div>
		</div>
	</div>
</template> 

<style lang="scss" scoped>

	.contentBox{
		padding: 0 0.5rem;
	}
	.headSetion{
		flex-direction: column;
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    color: #ff4c50;
	    font-size: .3rem;
	    padding: 1.2rem 0 1.3rem 0;
	}
	.gt_logo{
		width: 1.7rem;
		height: 1.7rem;
	}
	.getPassWord{
		display:inline-block ;
		margin-top: .3rem;
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
	    border-bottom: solid 1px #b3b3b3;
	    padding: .15rem 0;
	    margin-bottom:.2rem ;
	    position: relative;
	}
	.userForm .eyeIcon{
		margin: 0;
		position: absolute;
		right: 0;
	}
	.userForm .telPhone{
		width: 4rem;
	}
	.userForm .iconfont{
		margin: 0 .3rem 0 .2rem;
		color: #8D8D8D;
		font-size: .6rem;
	}
	.userForm .eyeOpen{
		font-size: .5rem;
	}
	input{
		outline: none;border: 0;
		font-size: .3rem;
		height: .6rem;
		width: 3rem;
		background: transparent;
	}
	
	.sure_btn{
		background: #FF4C50;
		color: #fff;
		font-size: .36rem;
		height: .9rem;
		line-height: .9rem;
		text-align: center;
		margin-top: .8rem;
		border-radius: .1rem;
	}
	.userForm .telIcon{
		font-size: .5rem;
		margin: 0 .4rem 0 .2rem;
	}
	.sure_btn a{
		color: #fff;
	}
	.footItem{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    justify-content: space-between;
	    padding: 0.3rem 0 2.44rem 0;
	}
	.footItem a{
		font-size: .28rem;
	    color: #666666;
	}
</style>
<script>
import { mapGetters,mapActions } from 'vuex'
import config from 'src/config/im.js'

export default {
	data(){
		return {
			showTitle:false,
			title:"登录",
			index : 0,
			gt_logo:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500453310139videoBgBack4.png',
			temp_value :'',
			
			logo: config.logo,
			routeUrl:null,
			state:true,
			inpVal:null,
			passWord:null,
			
		}
	},
	computed: {
      ...mapGetters([
          'timer'
      ]),
    },
	beforeMount(){
		let timer = this.TimerInterval(false); 
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		
	},
	watch: {
		
	},
	mounted(){
		  
	},
	methods: {
		openEye(state){
			var val = $("#passWord").val();
			this.state = !state;
			this.inpVal = val;
		},
		confirm(){
			let that = this;
	       	if(this.temp_value==""){
	       		this.toastMsg("用户名不能为空");
	       	}else{
       		    if(this.passWord==""){
	       			this.toastMsg("密码不能为空");
	       		}else{
	       			let  url='syslogin/login',
	       			     data={
	       			     	  loginName: this.temp_value,
								password: this.passWord,
								productSerialNumber:this.productSerialNumber,
	       			     };
	       			 this.getByUrl({data,url}, res=>{
							this.ajax({
								url : res.url,
								data : res.data,
								success:( res)=>{
									console.info(res);
									if(!res || !res.meta){
									      return;
									   }
									if(res.meta.code == '10000'){
										that.$store.dispatch("setXToken",res.data);
										//console.log(res.data);
						       			//that.$router.push({path:"/merChantIndex"});
								    }
								}
							  })
							})
		       		}
	       }
	    }
	},
}
</script>
