<template>
	<div class="wrapper">
		<!--<img class="wrapImgBg" src="../../assets/img/vipBg.png" alt="" />-->
		<div class="contentContain">
			<div class="content" v-for="(item,itemKey) in data">
				<div class="txtArea">
					<div class="imgBox">
						<!--<span class="matter">{{productType[item.productType].matter}}</span>-->
					<!--	<img :src="productType[item.productType].superMarket" class="superMarket"/>-->
						<img :src="item.img" class="superMarket"/>
					</div>
					<div class="noteInf">
						<p class="title" :style="{color:item.color}">{{item.name}}</p>
						<p class="txtListInner" v-for="(x,key) in item.desc.split('，')">
							<span v-if="item.desc.split('，').length>1">{{key+1}}.</span><span v-html="x"></span>
						</p>
					</div>
				</div>
				<div class="bottom">
					<div class="toApply" :style="{background:'#DE333E'}" @click="toApply(item.id)">去申请</div>
				</div>
			</div>
		</div>
	</div>
</template> 
<script>
export default {
	data(){
		return {
			callData:{
				productSerialNumber:'326407336442855424',
				pageNum:1,
				pageSize:5
			},
			productType:{
				market:{
					matter:'到定点超市',
					superMarket:require("src/assets/img/shopCart.png")
				},
				store:{
					matter:'到定点商户',
					superMarket:require("src/assets/img/store.png")
				},
				CS:{
					matter:'到定点超市',
					superMarket:require("src/assets/img/shopCart.png")
				},
				MD:{
					matter:'到定点商户',
					superMarket:require("src/assets/img/store.png")
				}
			},
			data:[]
		}
	},
	beforeCreate(){
			document.title="vip特权";
			this.setWebTittle('vip特权');
    },
    mounted(){
    	this.init();
    },
	methods: {
		init(){
			let url="packaged/list",
			data=this.callData;
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						//console.info(res);
						this.data=res.data.list;
					}
				});
			});
		},
		toApply(id){
			let ua = navigator.userAgent.toLowerCase();
			let data={id:id};
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				  let bridge = getJsBridge();
    	          let cc=bridge.call("applyMemberWithParameters",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				 let cc=js.applyMemberWithParameters(JSON.stringify(data));
			}else{
				return;//pc端
			};
		}
	}
}
</script>
<style lang="scss" scoped>
	.wrapper{
		position: relative;
	}
	.wrapper .wrapImgBg{
		width:100%;
		/*height:18rem;*/
	}
	.superMarket{
		width: 90%;
		max-height:2rem;
	}
	.contentContain{
		position: absolute;
		padding-top:104%;
		width:100%;
		text-align: center;
		background:url("../../assets/img/vipBgImg.png?x-oss-process=image/resize,w_375")  no-repeat;
		background-size: contain;
		background-color: #FFFFB8;
	}
	.txtArea{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    justify-content: center;
	    
	}
	.txtArea .imgBox{
		width: 30%;
		text-align: center;
	}
	.imgBox .matter{
		color: #7E72F0;
		margin-bottom: .2rem;
		display: block;
	}
	.noteInf{
		width: 70%;
	}
	.txtListInner .appoint{
		color: #DE333E!important;
	}
	.txtArea .diamond{
		width: auto;
		height: 1rem;
		margin-right: .9rem;
	}
	.noteInf p{
		margin-bottom:.1rem ;
	}
	.noteInf p{
		height: auto;
		margin-left:.35rem ;
	}
	.content{
		width: 6.6rem;
		border: solid 2px #D62D03;
		border-radius:0.2rem ;
		margin: 0 auto .4rem auto;
		color: #333333;
		font-size: .3rem;
		position: relative;
		padding-top: .4rem;
		padding-bottom: 1.5rem;
		background:#fff ;
	}
	.content .bottom{
		border-top: dashed 1px #CA7524;
		width: 6rem;
		left: 50%;
		margin-left: -3rem;
		position: absolute;
		height: 1.3rem;
		bottom: 0;
	}
	.noteInf .title{
		color: #DE333E;
		font-size: .4rem;
		text-align: start;
	}
	.toApply{
		width: 3rem;
		height: .6rem;
		text-align: center;
		color: #fff;
		margin: 0 auto;
		border-radius: .1rem;
		line-height: .6rem;
		margin-top: .3rem;
	}
	.noteInf .txtListInner{
		text-align: left;
	}
</style>
