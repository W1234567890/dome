<template>
<div id="linkSuccess"> 
	 <div class="orderBoxHd"> 
	 	<p class="layoutCenter"><span class="iconfont successStatus" v-html="icon"></span></p>
	 	<p class="layoutCenter"><span class="successTxt">注册成功</span></p>
	 </div>
	 <div class="orderBoxBd">
	 	<div class="orderMes">
	 		<p>注册成功后，您将享有1元消费等的福利！</p>	 	 
	 	</div>
	 	<div class="subBtnWrap">
	 		<div  class="subBtn" @click="downloadApp">下载App</div>
		</div>
	 </div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				showTitle:true,
			    title:"状态提示",
				icon: "&#xe653;",
				integralNum:10
			}
		},
	   beforeMount(){
     	  this.$store.dispatch('showTitle',this.showTitle),
		  this.$store.dispatch('title',this.title)
	   },
	   mounted(){
	 
	   },
		methods: {
			downloadApp(){
				window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.uniaip.android";
			}
			
		}
	}
</script>

<style lang="scss" scoped>
#linkSuccess{
	width:calc(100wh);
	height: calc(100vh);
	background: #FFFFFF;
	overflow: hidden;
}
.orderBoxHd{
	padding-top:.5rem;
	.layoutCenter{
	   display: flex;
	   justify-content: center;
	}
	.successStatus{
	color:#3880BE;
	font-size:2rem;
    }
    .successTxt{
      color:#3880BE;
      font-size:.4rem;
    }
    .payMoney{
    	margin-top:.2rem;
    	color:#333;
    	font-size:.32rem;
    }
}
.orderBoxBd{
	 background:#FFFFFF;
	 padding:.2rem 0;
	.orderMes{
		padding-bottom:.1rem;
		p{
		 padding:.1rem 0 .1rem .4rem;
		 font-size:.28rem;
		 line-height:.45rem;
		color:#999;
	     text-align: center;
		.mesTxt{
			margin-left:.1rem;
		}
	  }
	}
	.subBtnWrap{
		 width:100%;
		text-align: center;
		.subBtn{
		margin-top:.3rem;
		 display: inline-block;
		 width:7rem;
		 height:.9rem;
		 line-height:.9rem;
		 font-size:.36rem;
		 background-color: #e7580c;
		 color: #FFFFFF;
		 border-radius:.1rem;
	  }
	}
}
</style>