<template>
	<div>
		<div class="headeRight">
		    <span class="btn" @click="submitFinish">完成</span>
	   </div>
	   <div id='buyerForm' class="input-group">
	   	  <div class="input-row">
					<label>快递单号:</label>
					<input type="text" class="inputTag" onkeyup="this.value=this.value.replace(/\D/g,'')" v-model="deliveryCode"/>
				</div>
				<div class="input-row" @click="showCompany=true">
					<label>承运公司:</label>
					<input type="text" class="inputTag" v-model="acceptCompany.label" readonly="readonly"/>
					<span class="iconfont" :class="showCompany?'down':''" v-html="icon.icon1"></span>
				</div>
		 </div>
		 <div class="companyWrap" v-if="showCompany">
		 	 <div class="companyBox">
		 	 	 <div class="boxHd">
					<span class="hdTxt">选择承运公司</span>
					<span class="icon iconfont closeBtn" @click="showCompany=false" v-html="icon.icon2"></span>
				 </div>
				 <ul class="boxBd boxList">
					<li class="boxItem" v-for="(item,key) in companyList" @click='checkIndex=key'>
						<label>
							<input type="radio" name="company" class="mgc mgc-circle" :checked="key==checkIndex" />
							<span>{{item.label}}</span>
						</label>
					</li>
				</ul>
				<div class="boxFt"  @click ="selectLogisticsCompany">
					<span>确定</span>
				</div>
		 	 </div>
		 </div>
	</div>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
	data() {
		return {
			showTitle:true,
			title:"物流信息",
			orderNo:null,
			deliveryCode:'',
			icon:{
				icon1:"&#xe608;",
				icon2:"&#xe617;"
			},
			acceptCompany:{},
			showCompany:false,
			checkIndex:0,
			companyList:[]
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
		if(this.$router.currentRoute.query.from=='App'){
			this.showTitle=false;
		}
		 this.$store.dispatch('showTitle',this.showTitle);
		 this.$store.dispatch('title',this.title);
		 this.orderId=this.$router.currentRoute.query.orderId;
		 //this.recevieAddressId = this.$router.currentRoute.query.order.recevieAddressId;
	},
    mounted() {
         this.init();
    },
	methods: {
		postDataToSever(){
			let url = 'sysorders/shipment',
				data = {
					orderId:this.orderId,
					deliveryCode:this.deliveryCode,
					deliveryCompanyCode:this.deliveryCompanyCode,
					deliveryCompanyName:this.deliveryCompanyName,
				};
				console.log(data)
			    this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							console.log(res)
						}
					});
				});
		},
		init(){
			let url="sysorders/logisticsCompanyInfo",
			    data={};
			     this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							this.companyList=res.data;
							//console.log(this.companyList)
						}
					});
				});
		},
        submitFinish(){
        	this.postDataToSever();
        	//提交
        	this.$router.go(-1);
        },
		selectLogisticsCompany(){
			this.acceptCompany=this.companyList[this.checkIndex];
			this.deliveryCompanyCode = this.acceptCompany.value;
			this.deliveryCompanyName = this.acceptCompany.label;
			this.showCompany=false;
		}
	}
   
}
</script>
<style lang='scss' scoped>
.headeRight{
    height: 0.78rem;
    line-height:.78rem;
	position: fixed;
	top:0;
	right:0;
	z-index:250;
	background:#FFFFFF;
	.btn{
		display: inline-block;
		padding-right:.2rem;
		font-size:.28rem;
		color:#333;
	}	
}
.input-group {
	background-color: #FFFFFF;
	margin-top:.15rem;
}
	
.input-row {
	height: 1rem;
	line-height: 1rem;
	border-bottom:1px solid #eaeaea;
}
.input-row:last-child{
	border:none;
}
.input-group label {
	display: inline-block;
	width: 18%;
	height: .8rem;
	color: #333;
	font-size:.30rem;
	margin-left: .2rem;
}
	
.input-row .inputTag{
	width: 60%;
	height: .8rem;
	border: none;
	color:#666;
	font-size:.28rem;
}
.input-row .iconfont{
	float: right;
	margin-right:.3rem;
}
.input-row  .down{
	transform: rotate(90deg);
}
.companyWrap{
  	width: 100%;
  	height: 100%;
  	background: rgba(0,0,0,.5);
  	position: fixed;
  	left: 0;
  	top: 0;
}
.companyBox{
	width: 6.4rem;
  	height: 9rem;
  	border-radius: .2rem;
  	background: #fff;
  	position: absolute;
  	left: 50%;
  	top: 50%;
  	margin-left: -3.2rem;
  	margin-top: -4.5rem;
  	overflow: hidden;
}
.boxHd{
	display: flex;
	border: solid 1px #eaeaea;
	height: 1rem;
	line-height: 1rem;
  	padding: 0 .2rem;
  	justify-content: space-between;
}
.closeBtn{
	font-size:.5rem;
	color:#666;
}
.boxList{
	height: 7.1rem;
	overflow: scroll;
}
.boxItem{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: .88rem;
  	font-size:.28rem;
  	padding: 0 .2rem;
  	background: #F5F5F5;
  	border-bottom: solid 1px #eaeaea;
}
.mgc {
	position: relative;
	width: 18px;
	height: 18px;
	background-clip: border-box;
	appearance: none;
	margin: -.15px .6px 0 0;
	vertical-align: text-bottom;
	border-radius: 3px;
	transition: background-color .25s;
	background-color: #fff;
	border: 1px solid #d7d7d7;
}

.mgc:checked:after {
	content: '';
	display: block;
	height: 4px;
	width: 7px;
	border: 0 solid #FFF;
	border-width: 0 0 2px 2px;
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
	position: absolute;
	top: 4px;
	left: 4px
}

.mgc:disabled {
	opacity: .65
}

.mgc:focus {
	outline: none;
	box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.075), 0 0 2px #38a7ff
}

.mgc:checked {
	background-color:#e7580c;
	border-color: #FFF;
}
.mgc-circle {
	border-radius: 50%
}
.boxFt{
	position: absolute;
  	bottom: 0;
  	height: .9rem;
  	line-height:.9rem;
  	width: 100%;
  	font-size:.36rem;
  	display: flex;
  	justify-content: center;
  	background:#FFFFFF;
}
</style>
