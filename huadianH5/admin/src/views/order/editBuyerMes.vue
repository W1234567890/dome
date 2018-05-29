<template>
	<div>
		<div class="headeRight">
		    <span class="btn" @click="submitFinish">完成</span>
	   </div>
	   <div id='buyerForm' class="input-group">
	   	  <div class="input-row">
					<label>收货人:</label>
					<input id='recPerson' type="text" class="inputTag" v-model="buyerMes.receiver" placeholder="请填写收货人姓名"/>
				</div>
				<div class="input-row">
					<label>联系电话:</label>
					<input id='telePhone' maxlength="11" type="tel" class="inputTag" v-model="buyerMes.tel" placeholder="请填写收货人手机号" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
				</div>
				<div class="input-row detailAddress">
					<label>收货地址:</label>
					<div class="addressWrap">
						<textarea id='city' type="text" class="address auto-title-input" v-model="buyerMes.receiveAddress" placeholder="请填写收货人详细地址">
						</textarea>
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
			title:"买家信息",
			orderNo:null,
			buyerMes:{}
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
		 this.buyerMes=this.$router.currentRoute.query.buyerMes;
	},
    mounted() {
  		
    },
	methods: {
		postDataToSever(){
			let url = 'sysorders/alterReceiveInfo',
					data = {
						orderId:this.orderId,
						acceptName:this.buyerMes.receiver,
						mobile:this.buyerMes.tel,
						receivingAddress:this.buyerMes.receiveAddress,
					};
			    this.getByUrl({data,url}, res=>{
			    	console.log(data)
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							console.log(res)
						}
					});
				});
		},
        submitFinish(){
        	this.postDataToSever();
        	//提交
        	this.$router.go(-1);
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
.detailAddress{
	min-height:2rem;
	display: flex;
	align-items: flex-start;
}
.detailAddress label{
	width: 18%;
}
.addressWrap{
	margin-top:.4rem;
	display: inline-block;
	width:78%;
	height:1.5rem;
	position: relative;
}
.auto-title-block{
   	display: block;
   	white-space: pre-wrap;
   	visibility: hidden;
   	overflow: hidden;
   	margin:0;
   	padding:0;
   	box-shadow: border-box;
   	font-weight: 700;
   	line-height: .36rem;
     font-size: .28rem;
   }
 .auto-title-input{
    position: absolute;
    width:100%;
    margin:0;
    height: 100%;
    top:0;
    left:0;
   color:#333;
   outline:0 none;
    border:none !important;
    line-height: .28rem;
    font-size: .28rem;
  } 
</style>
