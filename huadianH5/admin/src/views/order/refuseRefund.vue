<template>
	<div>
		<div class="headeRight">
		    <span class="btn" @click="submitFinish">完成</span>
	   </div>
	  <div  class="remarkWrap">
	      <textarea  autofocus="true" @keyup="change" spellcheck="false"  placeholder="请填写拒绝退款原因" v-model="temp_value"  class="remark">
	      </textarea>
	 </div>
	   
   </div>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
	data() {
		return {
			showTitle:true,
			title:"拒绝退款原因",
			orderNo:null,
			temp_value:null
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
		 this.orderId=this.$router.currentRoute.query.mes.orderId;
	},
    mounted() {
  
    },
	methods: {
		//拒绝退货退款
		refuseRefundment(){
			let url="sysrefundment/refuseRefundment",
		    data={
		    	orderId:this.orderId,
		    	content:this.temp_value,
		    };
		    //console.log(data)
		    this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						console.log(res.meta);
						console.log(44);
					}
				});
			});
		},
		change(){
    		 
         },
        submitFinish(){
        	this.refuseRefundment();
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
	z-index: 10000;
	background:#FFFFFF;
	.btn{
		display: inline-block;
		padding-right:.2rem;
		font-size:.28rem;
		color:#333;
	}	
}
.remarkWrap{
   	   	 position: relative;
   	   	 width:96%;
   	   	 margin-left:2%;
   	   	 padding:0 2%;
   	   	 line-height: .4rem;
   	   	 font-size: .28rem;
   	   	 padding:.15rem;
   	   	 background: #FFFFFF;
   	   	 margin-top:.15rem;
   	  }
 .remark{
    width:100%;
    height:3rem;
    line-height: .4rem;
   	font-size: .28rem;
    overflow-y: hidden;
    color:#333;
    outline:0 none;
    border:none !important;
    background:none;
    text-indent: .1rem;
  } 
</style>
