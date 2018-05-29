<template>
	<div class="wrapper">
		<div class="boxWrap">
			<div class="boxHd">
				<span>退款信息</span>
			</div>
			<div class="txtContain">
				<p class="txtInner" v-for="(item,key) in drawBackMes">
					<span>{{item.txt}}:</span>
					<span>{{item.content}}</span>
				</p>
			</div>
		</div>
		<div class="logisticsMes">
			<p class="title">退款进度</p>
			<div class="setpList">
		       <div class="stepItem" v-for="(vo,key) in drawBackInf">
		       	    <div class="stepBottom">
		       	    	<div class="line" :style="{height:'50%'}"></div>
		       	    	<div class="step" :class="key==0?'stateActive':''"></div>
		       	    	<div class="line" :style="{height:'50%'}"></div>
		       	    </div>
		       	     <div class="stateWrap" :class="key==0?'stateWrapActive':''">
		       	     	 <div class="stateDescription">{{vo.content}}</div>
		       	     	 <div class="logisticsDate">{{vo.createTime}}</div>
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
			showTitle:true,
			title:"退款详情",
			drawBackInf:[],
			drawBackMes:[],
			orderId:''
		}
	},
	methods:{
		//获取物流信息
		getLogisticsInf(){
			let url="sysrefundment/details",
		    data={orderId:this.orderId};
		     this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						this.drawBackInf = res.data.refundMessage;
						this.drawBackMes=[
								{txt:"订单号",content:res.data.orderNo},
								{txt:"退款原因",content:res.data.reason},
								{txt:"退款金额",content:res.data.money}
							]
					}
				});
			});
		},
	},
	beforeMount(){
		if(this.$router.currentRoute.query.from=='App'){
			this.showTitle=false;
		}
	 	this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.orderId=this.$router.currentRoute.query.orderId;
		this.getLogisticsInf();
	},
}
</script>
<style lang="scss" scoped>
.boxWrap{
	margin-top: .15rem;
	margin-bottom:.15rem;
	background: #FFFFFF;
	padding: .1rem 0;
	font-size: .3rem;
}
.boxHd {
		padding: 0 2%;
		height: .8rem;
		line-height: .8rem;
		border-bottom: 1px solid #eaeaea;
		display: flex;
		justify-content: space-between;
		font-size: .3rem;
}
.txtContain {
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
.logisticsState{
	display: inline-block;
	margin-left:.2rem;
	color:#E7580C;
}
.logisticsMes{
	background: #FFFFFF;
	padding:.2rem 2%;
	font-size:.28rem;
	color:#999;
}
.title{
	height:.6rem;
	line-height:.6rem;
	font-size:.32rem;
	color:#333;
}
.setpList{
	width:100%;
	height:100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.stepItem{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;
}
.stepBottom{
}
.step{
	width:.25rem;
	height:.25rem;
	background:#CCCCCC;
	border-radius:50%;
	text-align: center;
	position: absolute;
	top:50%;
	left:.2rem;
	z-index: 10;
}
.line{
	position: absolute;
	width:.05rem;
	background: #CCCCCC;
}
.stepBottom .line:first-child{
	top:0;
	left:.3rem;
}
.stepBottom .line:last-child{
	bottom:0;
	left:.3rem;
}
.stepItem:first-child .line:first-child{
	visibility: hidden;
}
.stateWrap{
	width:86%;
	padding:.2rem 0;
	border-bottom:1px solid #ccc;
	margin-left:.8rem;
}
.stateWrap:last-child{
	border:none;
}
.logisticsDate{
	margin-top:.1rem;
}
.stateActive{
	background:#E7580C;
}
.stateWrapActive{
	color:#E7580C;
}
</style>
