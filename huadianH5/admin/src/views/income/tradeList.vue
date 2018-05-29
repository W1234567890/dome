<template>
	<div class="wrapper">
			<div class="navItemWrap">
				 <ul class="navItem">
					<li v-for="(item,key) in data" @click="curItemShow(key)" :class="key == curIndex ? 'active' :''">{{item.txt}}</li>
				</ul>
			</div>
			
		 <div class="contentBox slidesClassMain" ref="slidesClassMain">
			<div class="noGoodsIcon" v-if='!tradeList.length'>
				<img :src='noGoodsIcon' class="images" />
				<div class="">{{noteInfo[curIndex]}}</div>
			</div>
			<div v-scrollt>
				 <!--<div class="curMonth">本月</div>-->
				 <ul class="detailList" v-if="tradeList.length">
					<li v-for="item in tradeList">
						<img class="typeImg" :src="typeImg[item.btype]"/>
						<div class="sectionRight">
							<div class="operateDate">
								<span class="monyNum">{{item.btype=='1'?'+':'-'}}{{item.amount}}元</span>
								<span class="rightTxt">{{item.month}}</span>
							</div>
							<div class="operateDate">
								<span>{{dealType[item.dealType]}}{{item.billDesc?'—'+item.billDesc:''}}</span>
								<span class="rightTxt">{{item.hour}}</span>
							</div>
						</div>
					</li>
				 </ul>
			</div>
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			showTitle: true,
			title: "收支明细",
			isMaxPage: false,
			maxPage:0,
			data:[{txt:"全部",},{txt:"收入",},{txt:"支出"}],
			content:[{btype: null},{btype: 1},{btype: 0}],
			curIndex: 0,
			noGoodsIcon: 'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500541009532tixian.png',
			noteInfo: ['暂无记录','暂无收入记录','暂无支出记录'],
			InfoData:{
				btype: null,    //btype	string	N		0：支出；1收入；不传值获取全部
				pageNum: 1,  //pageNum	int	N	1	当前页数
				pageSize: 8  //pageSize	int	N	30	每页查询的数据条数
			},
			tradeList: [],
			dealType: {
				Shop : '购物',
				Recharge : '充值',
				Transfer : '转账',
				Withdraw : '提现',
				Credit : '积分',
				Coupon : '优惠券',
				drawback : '退款',
				share : '分享',
				Discount : '打折卡',
				fundManageEdit:'后台编辑资金',
				MemberCardRecharge:'会员卡充值',
				Profit:'订单入账'
			},
			clearData:false,  //判断是否清空数据
			typeImg:['http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500541067244pay.png','http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500541087596inCome.png']
		}
	},
	computed: {
	      ...mapGetters([
	          'userInfo',
	          'isSlidesTop',
	          'isSlidesBottom',
	      ]),
	    },
	mounted() {
		 setTimeout(()=>{
		 		this.$refs.slidesClassMain.style.height = window.innerHeight-this.$refs.slidesClassMain.getBoundingClientRect().top+ "px";
		 });
	},
	methods: {
		tradeDetailList(data){
			console.info(data);
			let	url = 'sysuserbill/records';
				this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							if(this.clearData){
								this.tradeList=[];
								this.clearData=false;
						   }
							//console.info(res);
							let arr=res.data.list;
							for(let i=0;i<arr.length;i++){
								let time=new Date(arr[i].createDate*1000).toLocaleString().replace(/:\d{1,2}$/,' ');
								let idx = time.indexOf(" ");
								arr[i].month = time.substring(time.indexOf("/")+1,time.indexOf(" "));
								arr[i].month=arr[i].month.replace(/\//g,"-")
								arr[i].hour = time.substring(idx,time.length);
								//alert(arr[i].month)
							}
							this.maxPage=Math.ceil(res.data.count/this.InfoData.pageSize);
							this.tradeList=this.tradeList.concat(arr);
						}
					});
				});
		},
		ResetTop( res){//下拉刷新
			this.maxPage=false;
			this.InfoData.pageNum=1;
			this.clearData=true;
			this.tradeDetailList(this.InfoData);
	    	res(false);
	    },
		ResetBottom( res){//上拉加载
	    	if(this.InfoData.pageNum <this.maxPage){
	    		++this.InfoData.pageNum;
	    		this.tradeDetailList(this.InfoData);
	    		res();
	    	}else{
	    		res(true);
	    		this.isMaxPage = true;
	    		return;
	    	}
	    },
	    curItemShow(key){//切换商品销售状态
	    	this.tradeList=[];
	    	this.curIndex = key;
			this.InfoData.pageNum=1;
			this.isMaxPage = false;
			this.clearData=true;
			this.InfoData.btype=this.content[this.curIndex].btype;
			this.tradeDetailList(this.InfoData);
		},
	},
	beforeMount(){
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.tradeDetailList(this.InfoData);
	},
	watch: {
			
	},
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.wrapper{
		color: #333;
		font-size: .24rem;
	}
	.contentBox{
		background: #FFF;
		margin-top:.15rem;
		
	}
	.tradeListContain{
		background: #FFF;
		min-height: calc(100vh);
	}
	.navItemWrap{
		position: relative;
		height:1rem;
		line-height:1rem;
		margin-bottom:.15rem;
		z-index: 10;
	}
	.navItem{
		position: fixed;
		top:.8rem;
		z-index:100;
	}
	.navItem>li{
		height: 1rem;
		line-height:1rem ;
		padding: 0 .14rem;
	}
	.navItem li.active{
		border-bottom: solid 3px #E7580C;
		color: #E7580C;
	}
	.navItem,.detailList>li,.detailList .operateDate{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.navItem{
		width: 100%;
		background: #fff;
		font-size: .3rem;
		justify-content: space-around;
	}
	.detailList>li{
		background: #fff;
		padding: 0 .2rem;
		height: 1.8rem;
		border-bottom: solid 1px $lineColor;
		color: #999;
		font-size: .24rem;
	}
	.sectionRight{
		width: 100%;
	}
	.detailList .operateDate{
		margin-bottom:.2rem ;
		justify-content: space-between;
		width: 100%;
	}
	.detailList .monyNum{
		color: #333;
		font-size: .32rem;
	}
	.detailList .typeImg{
		width:.8rem;
		margin-right:.2rem ;
	}
	.curMonth{
		font-size: .28rem;
		color: #333;
		padding: 0 .2rem;
		height: .8rem;
		line-height: .8rem;
	}
	.noGoodsIcon{
		text-align: center;
		color: #999;
		font-size: .3rem;
		padding: 1rem 0 2rem 0;
	}
	.noGoodsIcon .images{
		height: 2rem;
		width: auto;
		margin-bottom:.2rem ;
	}
	.rightTxt{
		text-align: right;
	}
</style>

