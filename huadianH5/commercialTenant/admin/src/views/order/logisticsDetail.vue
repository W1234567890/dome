<template>
	<div class="wrapper">
		<div class="boxHd">
			<div class="goodsImgWrap">
				<img class='goodsImg' :src="logisticsInf.goodsPhoto" />
				<div class="quaNum">共{{logisticsInf.goodsNum}}件商品</div>
			</div>
			<div class="mesWrap">
				<!--<p class="mesTxt stateTxt">物流状态<span class="logisticsState">{{data.logistics.state}}</span></p>-->
				<p class="mesTxt">承运来源：<span>{{logisticsInf.deliveryCompanyName}}</span></p>
				<p class="mesTxt">运单编号：<span>{{logisticsInf.deliveryCode}}</span></p>
			</div>
		</div>
		<div class="logisticsMes">
			<p class="title">物流信息</p>
			<div class="setpList">
		       <div class="stepItem" v-for="(vo,key) in logisticsInf.logisticInfo">
		       	    <div class="stepBottom">
		       	    	<div class="line" :style="{height:'50%'}"></div>
		       	    	<div class="step" :class="key==0?'stateActive':''"></div>
		       	    	<div class="line" :style="{height:'50%'}"></div>
		       	    </div>
		       	     <div class="stateWrap" :class="key==0?'stateWrapActive':''">
		       	     	 <div class="stateDescription">{{vo.context}}</div>
		       	     	 <div class="logisticsDate">{{vo.time}}</div>
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
			title:"物流详情",
			logisticsInf:'',
		}
	},
	methods:{
		//获取物流信息
		getLogisticsInf(){
			let url="sysorders/checklogistics",
		    data={logisticsNo:this.logisticsNo};
		    console.log(data)
		     this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						console.log(res.data);
						this.logisticsInf = res.data;
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
		this.logisticsNo = this.$router.currentRoute.query.deliveryCode;
		this.getLogisticsInf();
	},
}
</script>
<style lang="scss" scoped>
.boxHd{
	display: flex;
	justify-content: center;
	align-items: center;
	padding:.2rem 2%;
	background: #FFFFFF;
	margin-bottom:.1rem;
}
.goodsImgWrap{
	width:2rem;
	margin-right:.2rem;
	height:2rem;
	position: relative;
}
.quaNum{
	position: absolute;
	width:100%;
	height:.4rem;
	line-height:.4rem;
	text-align: center;
	bottom:0;
	background:rgba(0,0,0,.5);
	color:#FFFFFF;
	font-size:.24rem;
}
.goodsImg{
	width:2rem;
	height:2rem;
}
.mesWrap{
	width:5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding:.1rem;
}
.mesTxt{
	color:#999;
	font-size:.3rem;
}
.stateTxt{
	color:#333;
	font-size:.32rem;
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
