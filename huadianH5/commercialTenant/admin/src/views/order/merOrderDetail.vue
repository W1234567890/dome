<template>
	<div>
		<div class="orderStepWrap">
			<div class="orderStepContain" v-if="stepData.stepd>0&&stepData.stepd<5">
				 <div class="setpList">
			      <div class="stepItem" v-for="(vo,key) in stepList">
			       	    <div class="stepName" :class="stepData.stepd>key?'nameActive':''">{{vo.name}}</div>
			       	    <div class="stepBottom">
			       	    	<div class="line" :class="stepData.stepd>key?'lineActive':''"></div>
			       	    	<div class="step" :class="stepData.stepd>key?'stepActive':''">{{key+1}}</div>
			       	    	<div class="line" :class="stepData.stepd>key+1?'lineActive':''"></div>
			       	    </div>
			       </div>
			    </div>
			</div>
			<div class="toBack" v-if="stepData.stepd>4">
				{{stepData.mes}}
			</div>
		</div>
		
		<div class="orderGoodsContent">
			<ul class="goodsList">
				<li class="goodsItemWrap" v-for="(item,key) in dataList.orderGoodsList">
					<div class="goodsItem">
						<div class="itemHd">
							<img class='goodsImg' :src="item.goodsPhotos" />
							<div class="right">
								<div class="goods-txt">
									<span class="goodsName">{{item.goodsName}}</span>
								</div>
								<div class="goods-price">
									<div>
										<span class="sellPrice">￥{{item.goodsPrice.toFixed(2)}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>
				<li style="background: #fff;">
					<div class="orderMes">
						<span>商品总额:</span>
						<span>￥{{dataList.orderAmount}}</span>
					</div>
					<div class="orderMes">
						<span>实付金额:</span>
						<span>￥{{dataList.totalPay}}</span>
					</div>
					<div class="orderMes">
						<span>实际到账:</span>
						<span>￥{{dataList.expreBenefit}}</span>
					</div>
				</li>
			</ul>
		</div>
		
		<div class="orderMesWrap">
			<div class="txtContain" v-if="data.stepData.stepd!=5">
				<p class="txtInner" v-for="(item,key) in orderMes">
					<span>{{item.txt}}:</span>
					<span>{{item.content}}</span>
				</p>
			</div>
			<div class="orderBottom" v-if="data.stepData.stepd!=5">
				<div class="bottomBtn" @click="concatBuyer(dataList.buyerId)"><span class="iconfont" v-html="icon.icon2"></span>联系买家</div>
				<div class="bottomBtn" @click="copyText(dataList.orderNo)">复制订单号</div>
			</div>
		</div>
   </div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
    export default {
        data() {
        	return{
        		stepList:[{
        			name:"未付款"
        		},{
        			name:"已付款"
        		},{
        			name:"已完成"
        		}],
        		stepData:{
        			stepd:1
        		},
        		showTitle: true,
				title: "订单详情",
				icon: {
					icon1: "&#xe64d;",
					icon2: "&#xe67c;",
					icon3: "&#xe608;"
				},
				show: false,
				orderId: null,
				refundInf:'',
				dataList:{},
				orderMes:[],
				data: {
					stepData: {
						stepd: 0, //1代表未付款，2代表待发货，3代表已发货，4代表已完成，5代表退货退款，6代表订单关闭
						closeTime: "",
						mes:""
					},
					buyerMes: {
						receiver: "",
						tel: "",
						receiveAddress: ""
					},
				},
            };
        },
        computed: {
			...mapGetters([
				'userInfo',
			]),
		},
        created(){
        	
        },
        beforeMount() {
        	if(this.$router.currentRoute.query.from=='App'){
			  this.showTitle=false;
		   }
        	this.$store.dispatch('showTitle', this.showTitle);
			this.$store.dispatch('title', this.title);
			this.orderId = this.$router.currentRoute.query.orderId;
			this.init();
		},
        mounted(){
        	
        },
        methods: {
        	init(){
				this.getSeverData(res=>{
					 let a=this.stepData.stepd;
					 this.orderMes=[
						   {txt:"订单编号",content:this.dataList.orderCode},
						   {txt:"下单时间",content:this.dataList.createTime}
						]
						if(a>1&&a<4){
							this.orderMes.push({txt:"发票类型",content:this.dataList.invoiceType||'不开发票'});
							this.orderMes.push({txt:"买家备注",content:this.dataList.userPostscript||'无'});
						}
				})
			},
			//获取订单详情数据
			getSeverData(c){
				let url = 'oneyuan/orderDetail',
					data = {oneyuanOrderId:this.orderId};
			    this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							console.info(res);
							this.dataList = res.data;
							//alert(this.dataList.deliveryCode)
							//下单时间转化
							this.dataList.expreBenefit=this.dataList.oneyuanWorth*this.dataList.discount/100;
							let timeStr = new Date(res.data.createDate*1000).toLocaleString().replace(/:\d{1,2}$/,' ');
							//this.dataList.createTime = timeStr.substring(0,timeStr.indexOf(" ")+1).replace(/\//g,'-');
							this.dataList.createTime = timeStr.replace(/\//g,'-');
							//买家付款时间
							this.data.stepData.closeTime = new Date(res.data.payTime*1000).toLocaleString().replace(/:\d{1,2}$/,' ').substring(5,10).replace(/\//g,'-');
							//根据订单状态转跟进流程图
							/*switch(this.dataList.orderStatus){
								case "DFK":
								  this.stepData.stepd = 1;
								  break;
								case "DFH":
								  this.stepData.stepd = 2;
								  break;
								case "DSH":
								  this.stepData.stepd = 3;
								  break;
								case "YWC":
								  this.stepData.stepd = 4;
								  break;
								case "DPJ":
								  this.stepData.stepd = 4;
								  break;
								case "TKZ":
								  this.stepData.stepd = 5;
								  break;
								case "YGB":
								  this.stepData.stepd = 6;
								  break;
							};*/
							switch(this.dataList.status){
							    	case 1:
							    	   this.dataList.statusTxt='待付款';
							    	   this.stepData.stepd = 1;
							    	   break;
							    	case 2:
							    	   this.dataList.statusTxt='已付款';
							    	   this.stepData.stepd = 2;
							    	   break;
							    	case 3:
							    	   this.dataList.statusTxt='已选商品';
							    	   this.stepData.stepd = 2;
							    	   break;
							    	case 4:
							    	  this.dataList.statusTxt='待发货';
							    	   this.stepData.stepd = 1;
							    	   break;
							    	case 5:
							    	   this.dataList.statusTxt='待收货';
							    	   this.stepData.stepd = 1;
							    	   break;
							    	case 6:
							    	   this.dataList.statusTxt='已完成';
							    	   this.stepData.stepd = 3;
							    	   break;
							    	default:
							    	  this.dataList.statusTxt='';
							    	 
							    }
							//收货地址Id
							/*this.recevieAddressId =  this.dataList.recevieAddressId;
							alert(this.recevieAddressId)*/
							//买家手机号，姓名，收货地址等信息用于编辑
							this.data.buyerMes.receiver = this.dataList.acceptName;
							this.data.buyerMes.tel = this.dataList.mobile;
							this.data.buyerMes.receiveAddress = this.dataList.receivingAddress;
							c&&c();
						}
					});
				});
			},
      }
    };
</script>

<style scoped>
.orderStepWrap{
	width:100%;
	height:2rem;
	background: url('http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500542977078orderStepBg.png') center center no-repeat rgba(0, 0, 0, 0.5);
    background-size: 100% 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.orderStepContain{
	width:100%;
	height:2rem;
	display: flex;
    flex-direction: column;
    align-items: center;
}
.toBack{
	width:100%;
	height:2rem;
	padding:0 2%;
	color:#FFFFFF;
	display: flex;
    justify-content: flex-start;
    align-items: center;
}
.setpList{
	width:100%;
	height:100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.stepItem{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
.stepName{
	color:#FFFFFF;
	font-size:.2rem;
	margin-bottom:.1rem;
	text-align: center;
}
.stepBottom{
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
}
.step{
	width:.5rem;
	height:.5rem;
	border:.05rem solid #FFFFFF;
	border-radius:50%;
	text-align: center;
	color:#FFFFFF;
}
.line{
	width:.6rem;
	height:.03rem;
	background: #FFFFFF;
}
.stepItem:first-child .line:first-child{
	visibility: hidden;
}
.stepItem:last-child .line:last-child{
	visibility: hidden;
}
.nameActive{
	color:#E7580C;
}
.stepActive{
   color:#E7580C;
   border:.05rem solid #E7580C;
}
.lineActive{
   background:#E7580C;
}
.stepTip{
	color:#FFFFFF;
	text-align: center;
	font-size:.24rem;
	margin-bottom:.2rem;
}
.mesWrap {
	margin-top: .15rem;
	background: #FFFFFF;
	padding: .1rem 0;
	font-size: .3rem;
}
.orderGoodsContent{
}
.boxHd,
.boxFt {
	padding: 0 2%;
	height: .8rem;
	line-height: .8rem;
	border-bottom: 1px solid #eaeaea;
	display: flex;
	justify-content: space-between;
	font-size: .3rem;
}

.boxFt {
	font-size: .28rem;
}
.boxFt .orderRemark a{
	color: #333;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.orderRemark .sysNote{
	width: 6rem;
	display: inline-block;
	text-align: right;
	overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
}
.toEdit,
.toRight {
	font-size: .36rem;
	color: #666;
}

.boxBd {
	padding: .1rem 2%;
	border-bottom: 1px solid #eaeaea;
}

.txtWrap {
	display: flex;
	justify-content: space-between;
	margin-top: .2rem;
}

.btnWrap {
	display: flex;
	justify-content: space-around;
	margin: .5rem 0 .2rem;
}

.btnItem {
	background: #E7580C;
	color: #FFFFFF;
	font-size: .28rem;
	height: .6rem;
	line-height: .6rem;
	padding: 0 .3rem;
	border-radius: .1rem;
}

.btnItem .iconfont {
	font-size: .3rem;
}

.boxFt {
	border: none;
}
.returnSign{
	padding: 0 2%;
	height: .8rem;
	line-height: .8rem;
	border-bottom: 1px solid #eaeaea;
	background: #FFFFFF;
	font-size: .3rem;
	color:#E7580C;
}
.returnSign span{
	margin-left:.15rem;
}
.goodsItemWrap {
	margin-top: .15rem;
	background: #FFFFFF;
	padding: .1rem 2%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.goodsItemWrap:first-child{
	margin-top:0;
}
.goodsItemWrap:last-child {
	margin-bottom: 1.5rem;
}

.itemHd {
	width: calc(97vw);
	display: flex;
	justify-content: flex-start;
	padding: .2rem 1.5%;
	border-bottom: 1px solid $listBorder;
}

.goodsImg {
	width: 2rem;
	height: 2rem;
	margin-right: .2rem;
}

.goods-title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: .2rem;
}

.right {
	width: 5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.goodsName {
	font-size: .28rem;
}

.goods-price {
	color: #F43841;
	display: flex;
	font-size: .30rem;
	justify-content: space-between;
}

.txtContain,
.orderBottom {
	background: #FFFFFF;
	width: 100%;
	padding: .1rem 2%;
}

.txtInner {
	color: #333;
	font-size: .28rem;
	height: .6rem;
	line-height: .6rem;
}
.txtInner span:nth-child(1){
	margin-right:.05rem;
}
.orderBottom {
	display: flex;
	justify-content: flex-end;
}

.bottomBtn {
	text-align: center;
	width: 30%;
	height: .6rem;
    line-height: .6rem;
	background: #e6e6e6;
	color: #333;
	font-size: .3rem;
	border-radius: .1rem;
	margin-right: .2rem;
}

.orderMes{
	color:#7B7B7B;
	padding:0.1rem .2rem;
	display: flex;
	justify-content: space-between;
}
</style>