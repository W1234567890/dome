<template>
	<div>
		<order-step :stepData='data.stepData'></order-step>
		<div class="logisticsContent" v-if="data.stepData.stepd==5">
			<div class="boxHd">
				<span>退款信息</span>
				<router-link  :to="{path:'/drawBackDetail',query:{orderId:orderId,from:from}}" class="iconfont toEdit" v-html="icon.icon3"></router-link>
			</div>
			<div class="txtContain">
				<p class="txtInner" v-for="(item,key) in orderMes">
					<span>{{item.txt}}:</span>
					<span>{{item.content}}</span>
				</p>
			</div>
		</div>
	
		<div class="logisticsContent" v-if="data.stepData.stepd>2&&data.stepData.stepd<=5&&dataList.deliveryCode">
			<div class="boxHd">
				<span>物流信息</span>
			</div>
			<div class="txtContain">
				<p class="txtInner">
					<span>快递单号:</span>
					<span>{{dataList.deliveryCode}}</span>
				</p>
				<p class="txtInner">
					<span>承运公司:</span>
					<span>{{dataList.deliveryCompanyName}}</span>
				</p>
			</div>
			<div class="expressDelivery">
				<div>
					<img class="logisticsProgress" src="../../assets/img/logisticsProgress.png" alt="" />
					<span v-html="newLogistic"></span>
				</div>
				<router-link :to="{path:'/logisticsDetail',query:{deliveryCode:dataList.deliveryCode,from:from}}" class="iconfont toRight" v-html="icon.icon3"></router-link>
			</div>
		</div>
		
		<div class="mesWrap">
			<div class="boxHd">
				<span>买家信息</span>
				<router-link v-if="data.stepData.stepd<3" :to="{path:'/editBuyerMes',query:{orderId:orderId,buyerMes:data.buyerMes,from:from}}" class="iconfont toEdit" v-html="icon.icon1"></router-link>
			</div>
			<div class="boxBd">
				<div class="txtWrap">
					<div>
						<span>{{data.stepData.stepd==5?'退货人':'收货人'}}：</span>
						<span>{{dataList.acceptName}}</span>
					</div>
					<div>
						<span>电话：</span>
						<span>{{dataList.mobile}}</span>
					</div>
				</div>
				<div class="txtWrap">
					<div>
						<span>收货地址：</span>
						<span>{{dataList.province+dataList.city+dataList.area+dataList.receivingAddress}}</span>
					</div>
				</div>
				<div class="btnWrap">
					<div class="btnItem" @click="concatBuyer(dataList.buyerId)">
						<span class="iconfont" v-html="icon.icon2"></span>
						<span>联系买家</span>
					</div>
					<!--<div class="btnItem" v-if="data.stepData.stepd==1">
						<span>提醒买家付款</span>
					</div>-->
				</div>
			</div>
			<div class="boxFt">
				<span>备注</span>
				<div class="orderRemark">
					<router-link :to="{path:toRemarkPath,query:{mes:{orderId:orderId,remark:dataList.sysNote},from:from}}">
						<span class="sysNote">{{dataList.sysNote}}</span>
						<span class="iconfont toRight" v-html="icon.icon3" v-if="data.stepData.stepd>=4 ? false : true"></span>
					</router-link>
				</div>
			</div>
		</div>
		
		<div class="orderGoodsContent">
			<div class="returnSign" v-if="data.stepData.stepd==5">
				应退总额:<span>￥{{refundInf.money}}</span>
			</div>
			<ul class="goodsList">
				<li class="goodsItemWrap" v-for="(item,key) in dataList.orderGoodsList">
					<div class="goodsItem">
						<div class="itemHd">
							<img class='goodsImg' :src="item.goodsPhotos" />
							<div class="right">
								<div class="goods-txt">
									<span class="goodsName">{{item.goodsName}}</span>
								</div>
								<div>
									 <div class="goodsDiscount" v-if="item.discountWorth">
											<span>代金券:{{item.discountWorth}}</span>
									</div>
									<div class="goods-price">
										<div>
											<span class="sellPrice">￥{{item.goodsPrice.toFixed(2)}}</span>
											<span v-if="item.marketPrice" class="marketPrice">￥{{item.marketPrice.toFixed(2)}}</span>
										</div>
										<div>×{{item.goodsNums}}</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</li>
				<li>
					<!--<div class="totalWrap">
						<span class="goodsQuantity">共{{totalQuantity}}件商品</span>
						<span>合计:￥{{dataList.realAmount}}(含运费￥{{dataList.realFreight}})</span>
					</div>-->
					<div class="orderMes">
						<span>商品总额:</span>
						<span>￥{{dataList.payableAmount.toFixed(2)}}</span>
					</div>
					<div class="orderMes">
						<span>运费:</span>
						<span>￥{{dataList.realFreight.toFixed(2)}}</span>
					</div>
					<!--<div class="orderMes">
						<span>代金券:</span>
						<span></span>
					</div>-->
					<div class="orderMes">
						<span>实付金额:</span>
						<span>￥{{dataList.realAmount.toFixed(2)}}</span>
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
				<div class="bottomBtn" @click="copyText(dataList.orderNo)">复制订单号</div>
				<div class="bottomBtn" v-if="data.stepData.stepd==2" @click="show=!show">去发货</div>
			</div>
			<div class="orderBottom" v-if="data.stepData.stepd==5">
				<router-link :to="{path:'/refuseRefund',query:{mes:{orderId:orderId},from:from}}" class="bottomBtn">不退款</router-link>
				<div class="bottomBtn" @click="agreeReFund">退款</div>
			</div>
			<transition name="fade">
				<div class="logisticsWrap" v-show="show">
					<router-link class="logisticsItem" :to="{path:'/logisticsMes',query:{orderId:orderId,from:from}}">需要物流</router-link>
					<div class="logisticsItem" @click="noNeedLogistics">不需要物流</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import orderStep from 'src/components/order/orderStep.vue'
	export default {
		data() {
			return {
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
				newLogistic:'',
				orderMes:[],
				logisticsMes:[],
				totalQuantity:0,
				toRemarkPath:"/orderRemark",
				from:'h5'
			}
		},
		computed: {
			...mapGetters([
				'userInfo',
			]),
		},
		components: {
			'order-step': orderStep,
		},
		created() {
           
		},
		watch: {

		},
		beforeMount() {
			this.orderId = this.$router.currentRoute.query.orderId;
			this.init();
			if(this.$router.currentRoute.query.from=='App'){
				this.from=this.$router.currentRoute.query.from;
				this.showTitle=false;
			}
			//this.getSeverData();//获取服务器数据
			this.$store.dispatch('showTitle', this.showTitle);
			this.$store.dispatch('title', this.title);
			//获取退款详情信息
		},
		mounted() {
			
		},
		methods: {
			init(){
				this.getSeverData(res=>{
					 let a=this.data.stepData.stepd;
					 this.orderMes=[
						   {txt:"订单编号",content:this.dataList.orderNo},
						   {txt:"下单时间",content:this.dataList.createTime}
						]
						if(a>1&&a<5){
							this.orderMes.push({txt:"发票类型",content:this.dataList.invoiceType||'不开发票'});
							this.orderMes.push({txt:"下单备注",content:this.dataList.userPostscript||'无'});
						}
						if(a==5){
							this.refundDetail();
						}
						if(a==6){
							this.data.stepData.mes = "订单已关闭";
							this.toRemarkPath = '';
						}
						if(a==4){
							this.toRemarkPath = '';
						}
				})
			},
			//计算商品总数
			totalGoods() {
				let total = 0;
				if(this.dataList.orderGoodsList.length){
					this.dataList.orderGoodsList.forEach((val, index) => {
					   total += val.goodsNums;
				    });
				}
				return total;
			},
			//不需要物流时通知后台
			noNeedLogistics() {
				let url = 'sysorders/shipment',
					data = {
						orderId:this.orderId,
					};
				    this.getByUrl({data,url}, res=>{
						this.ajax({
							url : res.url,
							data : res.data,
							success:( res)=>{
								location.reload();
								//console.log(res)
							}
						});
					});
				this.show = false;
			},
			//获取物流详情
			getLogisticsInf(){
				let url="sysorders/checklogistics",
			    data={logisticsNo:this.dataList.deliveryCode};
			     this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							//console.log(res)
							this.newLogistic = res.data.logisticInfo[0].context;
							//console.log(this.newLogistic);
						}
					});
				});
			},
			//获取退款详情
			refundDetail(){
				let url="sysrefundment/details",
			    data={orderId:this.orderId};
			     this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							this.refundInf = res.data;
							this.orderMes=[];
							this.orderMes=[
							   {txt:"订单编号",content:this.refundInf.orderNo},
							   {txt:"退货编号",content:this.refundInf.refundNo},
						       {txt:"退货原因",content:this.refundInf.reason},
						       {txt:"应退总额",content:this.refundInf.money}
							];
							//console.log(res.data);
						}
					});
				});
			},
			//同意退款
			agreeReFund(){
				let url="sysrefundment/agreeRefundment",
			    data={
			    	orderId:this.orderId,
			    };
			     this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							//console.log(res);
							if(res.meta.code == '10000'){
								this.data.stepData.mes = "退款成功";
								this.toastMsg("已成功退款给买家");
								setTimeout(()=>{
									location.reload();
						       },2000);
							}
						}
					});
				});
			},
			//获取订单详情数据
			getSeverData(c){
				let url = 'sysorders/detail',
					data = {id:this.orderId};
			    this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							//console.info(res);
							this.dataList = res.data;
							//alert(this.dataList.deliveryCode)
							//下单时间转化
							let timeStr = new Date(res.data.createTime*1000).toLocaleString().replace(/:\d{1,2}$/,' ');
							//this.dataList.createTime = timeStr.substring(0,timeStr.indexOf(" ")+1).replace(/\//g,'-');
							this.dataList.createTime = timeStr.replace(/\//g,'-');
							//买家付款时间
							this.data.stepData.closeTime = new Date(res.data.payTime*1000).toLocaleString().replace(/:\d{1,2}$/,' ').substring(5,10).replace(/\//g,'-');
							//根据订单状态转跟进流程图
							switch(this.dataList.orderStatus){
								case "DFK":
								  this.data.stepData.stepd = 1;
								  break;
								case "DFH":
								  this.data.stepData.stepd = 2;
								  break;
								case "DSH":
								  this.data.stepData.stepd = 3;
								  break;
								case "YWC":
								  this.data.stepData.stepd = 4;
								  break;
								case "DPJ":
								  this.data.stepData.stepd = 4;
								  break;
								case "TKZ":
								  this.data.stepData.stepd = 5;
								  break;
								case "YGB":
								  this.data.stepData.stepd = 6;
								  break;
								/*default:
								  n 与 case 1 和 case 2 不同时执行的代码*/
							};
							if(this.dataList.sysNote == ''){
								this.dataList.sysNote = "今天发货"
							};
							 //this.data.stepData.stepd = 4;
							if(this.data.stepData.stepd == 5){
									this.refundDetail();
							};
							//待收货时获取物流最新情况
							if(this.data.stepData.stepd>2&&this.data.stepData.stepd<=5){
								if(this.dataList.deliveryCode){
									this.getLogisticsInf();
								}
							};
							//收货地址Id
							/*this.recevieAddressId =  this.dataList.recevieAddressId;
							alert(this.recevieAddressId)*/
							//买家手机号，姓名，收货地址等信息用于编辑
							this.data.buyerMes.receiver = this.dataList.acceptName;
							this.data.buyerMes.tel = this.dataList.mobile;
							this.data.buyerMes.receiveAddress = this.dataList.receivingAddress;
							//console.log(this.data.buyerMes);
							this.totalQuantity=this.totalGoods();
							c&&c();
						}
					});
				});
			},

		}

	}
</script>

<style scoped>
	.logisticsContent {
		margin-top: .15rem;
		background: #FFFFFF;
		padding: .1rem 0;
		font-size: .3rem;
	}
	
	.expressDelivery,
	.expressDelivery div {
		height: 1.24rem;
		padding: 0 2%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #eaeaea;
		font-size: .24rem;
	}
	
	.logisticsProgress {
		height: 1rem;
		margin-right: .1rem;
	}
	
	.mesWrap {
		margin-top: .15rem;
		background: #FFFFFF;
		padding: .1rem 0;
		font-size: .3rem;
	}
	.orderGoodsContent{
		margin-top: .15rem;
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
		color: #FF6515;
		display: flex;
		font-size: .30rem;
		justify-content: space-between;
	}
	
	.marketPrice {
		font-size: .22rem;
		color: #999999;
		margin-left: .2rem;
		text-decoration: line-through;
	}
	
	.sellPrice {
		font-size: .30rem;
	}
	
	.totalWrap {
		border-top: 1px solid #eaeaea;
		background: #FFFFFF;
		text-align: center;
		height: .8rem;
		line-height: .8rem;
		color: #999;
		font-size: .28rem;
	}
	
	.goodsQuantity {
		margin-right: .1rem;
	}
	
	.txtContain,
	.orderBottom {
		margin-top: .1rem;
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
		margin-right:.2rem;
	}
	
	.logisticsWrap {
		width: 100%;
		background: #e6e6e6;
		position: fixed;
		bottom: 0;
		padding: .3rem 3% 0;
	}
	
	.logisticsItem {
		display: block;
		margin-bottom: .3rem;
		background: #FFFFFF;
		color: #333;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
		border-radius: .1rem;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s ease;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
	.orderMes{
		display: flex;
		padding:.1rem .2rem;
		background: #fff;
		justify-content: space-between;
		font-size:.28rem;
		color:#7B7B7B;
	}
	.goodsDiscount{
		font-size:.26rem;
		margin-bottom:.1rem;
	}
</style>