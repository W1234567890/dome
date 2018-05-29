<template>
	<div class="wrapper">
		<header class="header">
			<div class="headerComponent">
				<div class="headerWrap">
				   	  <span class="icon iconfont routerBack" v-html="iconLeft" @click="routerBack"></span>
				   	  <p class="headerTitle" v-html="title"></p>
				</div>
			</div>
		</header>
		<div class="slidesClassMain" ref="slidesClassMain">
			<div v-scrollt>
				 <div class="topMes">
						<div class="navItem">
							<div>
								<p class="count">{{data.allBrowsNum||0}}</p>
								<p class="">总浏览数</p>
							</div>
							<div>
								<p  class="count">{{data.allCollectionNum||0}}</p>
								<p class="">收藏</p>
							</div>
							<div>
								<p  class="count">{{data.allMember||0}}</p>
								<p class="">总用户数</p>
							</div>
						</div>
					</div>
				  <div class="staticBox">
						<div class="title">商品</div>
						<div class="numStatistic">
							<div class="addLine">
								<p>在售商品总数（件）</p>
								<p class="statisticNum">{{data.soldNum||0}}</p>
							</div>
							<div class="">
								<p>本月下单总数（件）</p>
								<p class="statisticNum">{{data.monthOrderNum||0}}</p>
							</div>
						</div>
					</div>
					
					<div class="staticBox">
						<div class="title">订单</div>
						<div class="numStatistic">
							<div class="addLine">
								<p>昨日支付订单（笔）</p>
								<p class="statisticNum">{{data.yesterdayPayNum||0}}</p>
							</div>
							<div class="">
								<p>昨日退款订单（笔）</p>
								<p class="statisticNum">{{data.yesterdayRefundNum||0}}</p>
							</div>
						</div>
					</div>
					<div class="staticBox">
						<div class="title">金额</div>
						<div class="numStatistic">
							<div class="addLine">
								<p>昨日支付总额（元）</p>
								<p class="statisticNum">{{data.yesterdayPayMoney||0}}</p>
							</div>
							<div class="">
								<p>昨日退款总额（元）</p>
								<p class="statisticNum">{{data.yesterdayRefundMoney||0}}</p>
							</div>
						</div>
					</div>
					<div class="staticBox">
						<div class="title">访客</div>
						<div class="numStatistic">
							<div class="addLine">
								<p>昨日浏览（次）</p>
								<p class="statisticNum">{{data.yesterdayBrowsNum}}</p>
							</div>
							<div class="">
								<p>今日浏览（次）</p>
								<p class="statisticNum">{{data.todayBrowsNum}}</p>
							</div>
						</div>
					</div>
			</div>
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			title:'统计',
			showTitle:false,
			data:{},
			iconLeft:"&#xe608;",
		}
	},
	methods: {
		init(){
			let url='statistical/forseller',
			    data={};
			 this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						console.log(res);							   
//						    res.data.allMember = res.data.allMember * 100 +  Math.ceil(Math.random(1000));		
							res.data.allMember = "808576";
							this.data=res.data;
					}
				})
			})
		},
		routerBack(){
        	this.backtoPage();
       },
      ResetTop( res){//下拉刷新
      	    this.data={};
			this.init();
	    	res(false);
	    },
	},
	beforeMount(){
		this.backNum=false;
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.init();
	},
   mounted(){
		setTimeout(()=>{
		 		this.$refs.slidesClassMain.style.height = window.innerHeight-this.$refs.slidesClassMain.getBoundingClientRect().top+ "px";
		 });
	},
	watch: {
			
	},
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.wrapper{
		padding-bottom: 1rem;
		margin-top: .8rem;
	}
	.header{
		
	}
	.topMes{
		width:100%;
		height: 3.8rem;
		background: url('http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/adminSeller/static/staticsBg.png') no-repeat center center;
		background-size: cover;
		-webkit-background-size: cover;
		position: relative;
	}
	.navItem{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    justify-content: space-around;
	    text-align: center;
	    position: absolute;
	    
	}
	.navItem{
		 font-size: $fz30;
		 bottom: .4rem;
		 width: 100%;
		  color: #fff;
	}
	.navItem .count{
		font-size: .5rem;
	}
	.staticBox{
		margin-top: .2rem;
		font-size: $fz28;
		color: $C333333;
		background: #fff;
	}
	.staticBox .title{
		border-left: 4px solid #E7580C;
		height: .8rem;
		line-height: .8rem;
		padding-left: .12rem;
		background: #fff;
		font-size: $fz30;
		border-bottom: solid 1px $lineColor;
	}
	.numStatistic{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    justify-content: space-around;
	    text-align: center;
	}
	.numStatistic>div{
		padding: .4rem 0 .4rem 0;
		width:50% ;
	}
	.numStatistic .addLine{
		border-right: solid 1px $lineColor;
	}
	.statisticNum{
		font-size: .5rem;
		margin-top: .3rem;
	}
</style>

