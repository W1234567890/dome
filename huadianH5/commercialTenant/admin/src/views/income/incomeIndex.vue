<template>
	<div class="wrapper">
		<div class="headerComponent">
			<div class="headerWrap">
			   	  <span class="icon iconfont routerBack" v-html="iconLeft" @click="routerBack"></span>
			   	  <p class="headerTitle" v-html="title"></p>
			</div>
		</div>
		<div class="headeRight">
		    <router-link class="btn" :to="{path:'/tradeList'}">收支明细</router-link>
	    </div>
	    <div class="slidesClassMain" ref="slidesClassMain">
	    	<div v-scrollt>
		    	 <header class="header">
					<img :src="remainCash" class="remainCash">
					<div>可提现</div>
					<div class="extractNum">
						<span class="monySign">￥</span>
						<span>{{data.balanceStatus?'资金已冻结':data.balance||0}}</span>
					</div>
				</header>
				<div class="toExtract" :class="{disable:data.balanceStatus}" @click="withdrawCash">提现</div>
			</div>
	    </div>
		
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			remainCash:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500540670340remainCash.png',
			dataList:{
			},
			showTitle:false,
			title:"收入",
			iconLeft:"&#xe608;",
			state:0,
			data:{}
		}
	},
	beforeMount(){
		this.backNum=false;
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.init();
	},
	mounted(){
		setTimeout(()=>{
		 	this.$refs.slidesClassMain.style.height = window.innerHeight - this.$refs.slidesClassMain.getBoundingClientRect().top+ "px";
		 })
	},
 	computed: {
	      ...mapGetters([
	          'userInfo',
	          'getTradeList'
	      ]),
	    },
	watch: {
			
	},
	methods: {
		ResetTop( res){//下拉刷新
			this.data={};
	    	this.init();
	    	res(false);
	    },
		init(){
			let url = "sysuserbill/balance",
			    data = {};
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						//console.info(res);
						this.data=res.data;
					}
				});
			});
		},
		withdrawCash(){
			/*if(this.state == 0){//0表示已经添加过银行卡
				this.routerUrl = '/tixian';
			}else{//表示从未添加过银行卡
				this.routerUrl = '/addBankCard';
			}*/
			this.routerUrl = '/tiXian';
			if(this.data.balanceStatus){
				return;
			}else{
				this.$router.push({path:this.routerUrl});
			}
		},
		routerBack(){
        	this.backtoPage();
        },
		
	},
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
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
	.wrapper{
		font-size: .3rem;
		background: #FFF;
		margin-top: 0.8rem;
	}
	.header{
		padding: .6rem 0 .9rem 0;
		text-align: center;
	}
	.header .remainCash{
		width: auto;
		height: 1.4rem;
		margin-bottom: 0.1rem;
	}
	.extractNum{
		font-size: .6rem;
		margin-top: .2rem;
		color: #E65407;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.extractNum .monySign{
		font-size: .4rem;
	}
	.contentBox{
		margin: .2rem 0;
		color: #333;
		background: #fff;
	}
	.toExtract{
		width: 7.1rem;
		margin: 0 auto;
		text-align: center;
		font-size: .32rem;
		height: .9rem;
		line-height: .9rem;
		color: #fff;
		background: #E7580C;
		border-radius: .1rem;
		text-align: center;
		display: block;
	}
	.toExtract .icon{
		font-size: .4rem;
	}
	.disable{
		background::#ff8c8c;
		color:#f5f5f5;
	}
</style>

