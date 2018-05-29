<template>
	<div class="wrap" @click="closePopWin">
		<div class="headerComponent">
			<div class="headerWrap">
			   	  <span class="icon iconfont routerBack" @click="routerBack" v-html="iconLeft"></span>
			   	  <div class="search" v-on:keyup.13="searchFn">
			   	  	  <div class="searchInner">
			   	  	  	  <input type="text"  ref="search" :placeholder="searchItem.placeholder" v-model="searchItem.value" id="seachBox" @click="onFocus"/>
						  <label class="iconfont icon searchFont">&#xe6a1;</label>
			   	  	  </div>
			   	  </div> 
			</div>
			<div class="headeRightFilter">
			    <span class="icon iconfont iconFilter" v-html='iconFilter' @click="isPopWin"></span>
		        <div class="joinuserfilter" v-if="isfilter">
				     <div v-for="(vo,key) in filterOpion" @click="fliterBtn(key)">{{vo.item}}</div>
			    </div>
		    </div>
		</div>
		<ul class="bd orderList slidesClassMain" ref="slidesClassMain">
			<div v-scrollt>
				 <li class="orderItemWrap" v-for="(item,key) in orderList">
					<div class="orderItem" >
						<router-link :to="{path:'/orderDetail',query:{orderId:item.id}}">
							  <div class="orderNum" >
									<span>订单号：{{item.orderNo}}</span>
									<span class="payState">{{orderStatus[item.orderStatus]}}</span>
								</div>	
								<div class="goodsUnit" v-for="(vo,idx) in item.orderGoodsList">
									<img class="goodsImg" :src="vo.goodsPhotos" />
									<div class="goodsInf">
										<div class="goodsDescript">{{vo.goodsName}}</div>
										<div class="goodsPrice">
											<div>
												<span>￥{{vo.goodsPrice.toFixed(2)}}</span>
											    <span class="marketPrice">￥{{vo.marketPrice.toFixed(2)}}</span>
											</div>
											<span class="goodsNum">×{{vo.goodsNums}}</span>
										</div>
									</div>
								</div>
								<div class="orderMes">
									 <div class="createTime">{{item.createTime}}</div>
									 <div class="orderMesRight">
									 	  <div>合计:<span>￥{{item.realAmount.toFixed(2)}}</span></div>
									 </div>
								</div>
						</router-link>
						<ul class="itemBottom">
							<li class="bottomItem">
								<div class="itemLK" @click="concatBuyer(item.buyerId)">
									<span class="icon iconfont" v-html="icon.icon1"></span>
								    <span>联系买家</span>
								</div>
							</li>
							<li class="bottomItem">
								<div class="copyOrderNo" @click="copyText(item.orderNo)">复制订单号</div>
							</li>
						</ul>
					</div>
				</li>
			</div>
			<div class="emptyWrap" v-if="!orderList.length">
			 	<div class="emptyInner">
			 		  <img class="emptyImg" :src="empty"/>
					  <br />
				   	   <span class="emptyTxt">暂无商品订单</span>
			 	</div>
			</div>
		</ul>
		<div class="mask" v-if="isfilter"></div>
	</div>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
	data() {
		return {
			showTitle:false,
			title:"订单列表",
			iconFilter:"&#xe6de;",
        	iconLeft:"&#xe608;",
        	isfilter:false,
        	zIndex:10,
			icon:{
				left:"&#xe608;",
				search:"&#xe6a1;",
				icon1:"&#xe62f;",
				icon2:"&#xe608;"
			},
			searchItem:{
				placeholder:"请输入订单号、手机号、姓名、商品等",
				value:''
			},
			filterOpion:[{
				status:"DFK",
				item:"待付款",
			},{
				status:"YFK",
				item:"已付款"
			},{
				status:"YWC",
			    item:"已完成"
			},{
				status:"NOPAY",
			    item:"已关闭"
			},{
				status:"",
			    item:"全部订单"
			}],
			filterIndex:'',
			empty:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500542602965orderEmpty.png',
			orderList:[],
            orderStatus:{
	           	DFK:"待付款",
	           	DFH:"待发货",
	           	DSH:"待收货",
	           	DPJ:"已完成",
	           	YWC:"已完成",
	           	TKZ:"退款中",
	           	YGB:"已关闭",
           	},
	         data:{
	         	/*所有没有缺省值的参数默认查询的条件都是全部*/
				pageNum:1,	                //当前页
			    pageSize:5,                 //每页查询的数据条数
			    orderStatus:'',		        //订单状态DFK("DFK", "待付款"), DFH("DFH", "代发货"), DSH("DSH", "待收货"), DPJ("DPJ", "待评价"), YWC("YWC", "已完成"), TKZ("NOPAY", "退款中"), YGB("NOPAY", "已关闭")
			    payStatus:'',		        //支付状态(HAVEPAY("HAVEPAY", "已支付"), NOPAY("NOPAY", "未支付")
			    discussStatus:''	        //评价状态DPJ("DPJ", "待评价"), BUYYER_YP("BUYYER_YP", "买家已评价"), SELLER_YP("SELLER_YP", "卖家已评价"), DOUBLE_YP("DOUBLE_YP", "双方已评价")
			},
			dataSearch:{
				pageNum:1,	                //当前页
			    pageSize:5,                 //每页查询的数据条数
			    queryStr:null ,              //查询的内容
			    orderStatus:''
			},
			interUrl:'sysorders/list',
			orderObj:'data',
			isMaxPage: false,
			maxPage:0,
			clearData:false,  //判断是否清空数据
		}
	},
	computed: {
      ...mapGetters([
          'userInfo',
      ]),
    },
	components: {

    },
	created(){
       
	},
	watch: {
		
	},
	beforeMount(){
		this.backNum=false;
		 this.$store.dispatch('showTitle',this.showTitle);
		 this.$store.dispatch('title',this.title);
	},
    mounted() {
    	 setTimeout(()=>{
			 	this.$refs.slidesClassMain.style.height = window.innerHeight -this.$refs.slidesClassMain.getBoundingClientRect().top+"px";
			 });
    	this.init(this.data,this.interUrl);
    },
	methods: {
		init(data,url,c){
			    this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							//console.info(res);
							if(this.clearData){
								this.orderList=[];
								this.clearData=false;
							}
							for(var i = 0 ;i<res.data.list.length;i++){
								let timeStr = new Date(res.data.list[i].createTime*1000).toLocaleString().replace(/:\d{1,2}$/,' ');
								//res.data.list[i].createTime = timeStr.substring(0,timeStr.indexOf(" ")+1).replace(/\//g,'-');
								res.data.list[i].createTime = timeStr.replace(/\//g,'-');
								//alert(res.data.list[i].createTime)
							}
							this.orderList=this.orderList.concat(res.data.list);
							this.maxPage=Math.ceil(res.data.count/this[this.orderObj].pageSize);
							c&&c();
						}
					});
				});
		},
		 ResetTop( res){
		    	this[this.orderObj].pageNum = 1;
		    	this.clearData=true;
		    	this.init(this.data,this.interUrl,res);
		    	this.isMaxPage = false;
		 	    res(false);
		    },
	    ResetBottom( res){
	    	if(this[this.orderObj].pageNum==this.maxPage){
	    		res(false);
	    		this.isMaxPage = true;
	    		return;
	    	}else{
	    		++this[this.orderObj].pageNum;
	    		this.init(this.data,this.interUrl,res);
	    		res();
	    	}
	    },
		isPopWin(e){
			this.isfilter=true;
			e.stopPropagation();
		},
		closePopWin(e){
			$("#seachBox").blur();
			this.isfilter=false;
  		},
  		onFocus(e){
  			$("#seachBox").focus();
  			e.stopPropagation();
  		},
  		routerBack(){
  			this.closePopWin();
  			document.activeElement.blur();
    		this.backtoPage();
    	},
    	fliterBtn(index){
    		this.interUrl='sysorders/list';
    		this.orderObj = 'data';
    		if(this.filterIndex==index){
    			return;
    		}else{
    			this.isMaxPage = false;
    			this.clearData=true;
    			this.filterIndex=index;
    			this.data.orderStatus=this.filterOpion[this.filterIndex].status;
    			this.init(this.data,this.interUrl);
    		}
    		this.isfilter=!this.isfilter;
    	},
    	searchFn(){
    		this.interUrl='sysorders/searchOrder';
    		this.orderObj = 'dataSearch';
    		this.isMaxPage = false;
    		this.dataSearch.queryStr=this.searchItem.value;
    		this.clearData=true;
    		this.init(this.dataSearch,this.interUrl);
    	}
	}
   
}
</script>

<style lang='scss' scoped>
@import "../../assets/css/h_config.scss";
.headerComponent{
    width: 100%;
    height:.8rem;
    line-height:.8rem;
    top:0;
	position: relative;
	z-index: 1000;
	background:#e6e6e6;
}
.headerWrap{
	width: 100%;
    height: 0.8rem;
    line-height:.8rem;
	position: fixed;
	background:#FFFFFF;
}
.routerBack{
	display: inline-block;
	position: absolute;
	font-size:.36rem;
	left:.1rem;
	z-index: 12;
	color:#666;
	transform: rotate(180deg);
}
.search{
	height: .8rem;
	width:100%;
	color: #999999;
	position: absolute;
	top: 0;
	left:0;	
}
.searchInner{
	width: 6rem;
	margin-left:.8rem;
	margin-top:.08rem;
	height: .65rem;
	line-height: .56rem;
	position: relative;
	border-radius:1rem;
	border:1px solid #eaeaea;
}
.search input{
	width: 5.8rem;
	height: .56rem;
	line-height: .56rem;
	font-size: .26rem;
	text-align: left;
	text-indent: .7rem;
	border-radius:1rem;
	border:none;
}
.search .searchFont{
	font-size: .3rem;
	height: .56rem;
	line-height: .56rem;
	position: absolute;
	top: .05rem;
	left: .2rem;
	z-index: 0;
	color:#999;
}
.headeRightFilter{
    height: 0.78rem;
    line-height:.78rem;
	position: fixed;
	top:0;
	right:0;
	z-index:100;
	background:#FFFFFF;
}
.iconFilter{
	display: inline-block;
	padding-right:.2rem;
	font-size:.36rem;
	color:#333;
}
.joinuserfilter{
	background: #ffffff;
	color: #333;
	position: absolute;
	overflow: hidden;
	right: 0;
	z-index: 11;
	top: .9rem;
}
.joinuserfilter div{
	width:calc(100vw);
	height:1rem;
	line-height: 1rem;
	text-align: center;	
	font-size: .3rem;
	border-top:1px solid #EAEAEA;
}
.headerContain{
    width: 100%;
    height:.9rem;
    line-height:.8rem;
    top:0;
	position: relative;
	z-index: 10;
	background:#FFFFFF;
}
.headerWrap{
	width: 100%;
    height: 0.9rem;
    line-height:.8rem;
	position: fixed;
	background:#FFFFFF;
	border-bottom:.01rem solid #dbdbdb;
	
}
.routerBack{
	display: inline-block;
	position: absolute;
	font-size:.36rem;
	top:0;
	left:.1rem;
	z-index: 12;
	color:#666;
	transform: rotate(180deg);
}
.headerTitle{
	font-size:.32rem;
	width:70%;
	margin:0 auto;
	display: flex;
	justify-content: space-around;
	text-align: center;
	.headerItem{
		border-bottom:.06rem solid transparent;
	}
	.active{
		color:#e7580c;
		border-bottom:.06rem solid #e7580c;
	}
}
.bd{
	width:100%;
}
.orderItemWrap{
	margin-top: .15rem;
	background:#FFFFFF;
	padding:.1rem 0;
}
.orderItemWrap:last-child{
	margin-bottom:1.5rem;
}
.orderItem{
	width:100%;
}
.itemHd{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:.2rem 1.5%;
	border-bottom:1px solid $listBorder;
	position: relative;
}
.orderImgWrap{
	width:2.2rem;
	height:2rem;
	position: relative;
}
.orderImg{
	width:2rem;
	height:2rem;
}
.information{
	width:5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size:.3rem;
	color:#333;
}
.orderTxt2{
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top:.2rem;
}
.stepd{
	margin-right:.5rem;
	color:#E7580C;
}
.itemBottom{
	display: flex;
	justify-content:flex-end;
	color:#333;
	height:1rem;
	line-height:1rem;
	font-size:.28rem;
}
.itemLK{
	color:#333;
	margin-right:.2rem;
	margin-top:.2rem;
	font-size: .28rem;
	background:#F5F5F5;
	width:1.8rem;
	height:.6rem;
	line-height:.6rem;
	border-radius:.1rem;
}
.copyOrderNo{
	margin-right:.2rem;
	background:#F5F5F5;
	width:1.8rem;
	height:.6rem;
	line-height:.6rem;
	text-align: center;
	margin-top:.2rem;
}
.emptyWrap{
	width:100%;
	height:calc(100vh);
	position: relative;
}
.emptyInner{
	width:3rem;
	position: absolute;
	top:20%;
	left:50%;
	margin-left:-1.5rem;
	text-align: center;
	
}
.emptyImg{
	width:2rem;
}
.emptyTxt{
	display: block;
	color:#999;
	font-size:.36rem;
	margin-top:.2rem;
}

.orderItem .orderNum,.goodsUnit,.goodsInf .goodsPrice,.purchaseDate{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.orderItem .orderNum{
	width: 100%;
	justify-content: space-between;
	height: 1rem;
	color: #333;
	padding: 0 0.2rem;
	font-size: .32rem;
}
.orderItem .orderNum .icon{
	font-size: .3rem;
	color: #333;
}
.goodsUnit{
	width: 100%;
	padding: 0.2rem;
	border: solid 1px $listBorder;
	font-size: .28rem;
}
.goodsUnit .goodsImg{
	width: 2rem;
	height: 2rem;
}
.goodsInf{
	margin-left: .2rem;
	width: 4.9rem;
}
.goodsInf .goodsDescript{
	font-size: .32rem;
}
.goodsInf .goodsPrice{
	font-size: .36rem;
	width: 100%;
	justify-content: space-between;
	margin: .2rem 0;
}
.goodsInf .marketPrice{
	font-size: .28rem;
	text-decoration: line-through;
	color:#999;
}
.goodsNum{
	font-size:.3rem ;
}
.purchaseDate{
	width: 100%;
	justify-content: space-between;
	color: #666;
}
.payState{
	color: #E7580C;
	font-size: .2rem;
}
.mask{
	width:100%;
	height:100%;
	position: fixed;
	top:0;
	left:0;
	background: rgba(0,0,0,.5);
	z-index: 20;
}
.orderMes{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:.2rem;
	border-bottom:1px solid #eaeaea;
    font-size:.26rem;
}
.orderMesRight{
	color:#F83A43;
	line-height:.36rem;
}
.orderItem a{
	color:#333;
}
</style>