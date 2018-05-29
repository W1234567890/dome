<template>
	<f7-page v-styles="'pageContent'" class="ol">
		<f7-navbar back-link=" " class="layout-white theme-black ol_Navbar" title="" sliding ></f7-navbar>
		<div class="ol_top" @click="routeToGoods" :style="{background:'url('+(GetRequest().orderlistBg ? GetRequest().orderlistBg : (GetRequest().isSellPrice == 'true' ? orderlistBg1 : orderlistBg))+')  no-repeat center center / cover #E2E1E1'}">
			<div class="ol_top_img">
				<img :src="findOne.titleImg"/>
			</div>
			<div class="ol_top_right">
				<p class="ol_top_right_top text-ell">{{findOne.name}}</p>
				<p class="ol_top_right_bottom text-ell">{{findOne.address}}</p>
			</div>
		</div>
		<yd-rollnotice autoplay="2000" height="45" class="ol_center" v-if="!isData(findOne.preferentialList)">
	        <yd-rollnotice-item v-for="(vo,key) in findOne.preferentialList" :key="key">
				<span>{{vo.name}}</span>
				<p class="text-ell">{{vo.value}}</p>
	        </yd-rollnotice-item>
	    </yd-rollnotice>
		<yd-scrolltab class="ol_tab" :style=[TabStyle]>
	        <yd-scrolltab-panel :label="vo.categoryName" icon="demo-icons-category1" v-for="(vo,key) in data"  :key="key">
	           <div class="ol_item">
	           		<div class="ol_list" v-for="(v,k) in vo.goodsList">
	           			<div class="ol_list_img" @click="toOrderDetails(v)">
	           				<img :src="v.showImg"/>
	           			</div>
	           			<div class="ol_list_main">
	           				<p class="ol_list_title" @click="toOrderDetails(v)">{{v.goodsName}}</p>
	           				<div class="ol_list_center">
	           					<div class="ol_list_left" @click="toOrderDetails(v)">
			           				<p class="ol_list_num">月售{{v.sellCount || '0'}}份</p>
			           				<p class="ol_list_bottom">
			           					<label class="ol_list_moeny">{{GetRequest().isSellPrice == 'true' ? (v.sellPrice || '0') : '1'}}</label>
			           					<span class="ol_list_pmoeny">￥{{GetRequest().isSellPrice == 'true' ? (v.marketPrice || '0') : v.sellPrice}}</span>
			           				</p>
		           				</div>
		           				<div class="ol_list_right BackgroundColor B_F1" @click="isPopsHide(true,false,{key,k})">
		           					<label class="iconfont">&#xe612;</label>
		           				</div>
	           				</div>
	           			</div>
	           		</div>
	           </div>
	        </yd-scrolltab-panel>
	    </yd-scrolltab>
		<div class="order_Chat_nav_bg" v-show="isPopsShow" @click="isPopsHide(false,null)"></div>
	    <f7-toolbar class="orderChat_toolbar">
	   		<div class="order_Chat_Pop" v-show="isPopsShow">
	    			<div class="order_Chat_Pop_top" v-if="data[dataKey]">
	    				<div class="order_Chat_Pop_top_img">
	    					<img v-if="data[dataKey].goodsList[goodsListKey]" :src="data[dataKey].goodsList[goodsListKey].showImg"/>
	    				</div>
	    				<div class="order_Chat_Pop_top_right">
	    					<div>￥{{data[dataKey].goodsList[goodsListKey].sellPrice}}-{{data[dataKey].goodsList[goodsListKey].sellPrice}}</div>
	    					<div>库存{{data[dataKey].goodsList[goodsListKey].storeNum}}件</div>
	    					<div>选择 规格 分类</div>
	    				</div>
	    			</div>
	    			<div class="order_Chat_Pops">
	    				<div class="order_Chat_Pop_center" v-slide="{num:2}">
		    				<!--<div class="order_Chat_Pop_center_list" v-show="PopCenter">
		    					<dl class="order_Chat_Pop_center_item" v-for="(vo,key) in specification">
			    					<dt>{{vo.name}}</dt>
			    					<dd>
			    						<span v-for="(v,k) in vo.data" 
			    							@click="vo.key = k" 
			    							:class="vo.key == k && 'order_Chat_Pop_active'">
			    							{{v.name}}
			    						</span>
			    					</dd>
			    				</dl>
		    				</div>-->
		    				<div class="order_Chat_Pop_center_num">
		    					<span class="order_Chat_Pop_center_title">购买数量</span>
		    					<div class="order_Chat_Pop_center_btn">
		    						<span @click="nums > 1 && nums--">-</span>
		    						<span><input type="text" 
			    							@click="keypads" 
			    							id="nums" 
			    							v-model="(!nums || nums <= 0) ? nums = 1 : nums" 
			    							@input="(!nums || nums <= 0) ? nums = 1 : nums = num(nums)"
			    							readonly/>
		    						</span>
		    						<span @click="nums++">+</span>
		    					</div>
		    				</div>
		    			</div>
	    			</div>
	    			<div class="order_Chat_Pop_bottom" @click="tolink">
	    				确定
	    			</div>
	    		</div>
	    	</f7-toolbar>
	</f7-page>
</template>

<script>
const winHeight = window.innerHeight,winWidht = window.innerWidth;
import { mapState,mapGetters,mapActions } from 'vuex'
import {
	_vendor,
	_prefixStyle,
	getTime,
	addEvent,
	removeEvent,
	momentum,
	hasTouch,
	style,
	eventType,
	ease,
	GetObjPos,
	isData,
	hasClass,
	addClass,
	removeClass,
	GetSlideAngle,
	GetSlideDirection,
} from 'src/config/init'
export default{
	data() {
		return {
			dataKey: 0,
			goodsListKey: 0,
			data: {},
			findOne: {},
			isPopsShow: false,
			PopCenter: true,
			isGou: null,
			orderlistBg: require('src/assets/img/orderlistBg.png'),
			orderlistBg1: require('src/assets/img/bg.png'),
			specification: [{
				"name":"规格",
				"key": 0,
				"data": [
					{name: "公鸡"},
					{name: "母鸡"},
					{name: "土鸡"},
					{name: "野鸡"},
					{name: "肯德鸡"},
				]
			}],
			nums: 1,
			TabStyle: {
				
			}
		}
	},
    computed: {
     	...mapState({
     	})
    },
	watch:{
		isPopsShow(res){
		},
		nums(e){
			this.myKeypad.updateValue(e.toString());
		}
	},
	mounted(){
		this.footer = document.getElementsByClassName('navbar')[0].clientHeight;
		setTimeout(()=>{
			let pop = document.getElementsByClassName('order_Chat_Pops')[0];
			pop.style.height = window.innerHeight - window.innerHeight/2 + "px";
			this.Pop = document.getElementsByClassName('order_Chat_Pop')[0];
		})
		this.myKeypad = this.keypad(document.getElementById('nums'),res=>{
			res.value && (this.nums = res.value);
		});
		this.initTop();
	},
	created(){
		let baseColor = this.GetRequest().baseColor || 'ff7f00';
		if(baseColor){
			let StyleDom = document.createElement("style");
			StyleDom.type="text/css";  
			let str = [".BackgroundColor.B_F1{",
			        "background-color: #"+baseColor+"!important;",
			    "}",
			    ".Color.B_F1{",
			        "color: #"+baseColor+"!important;",
			    "}",
			    ".yd-scrolltab-active .yd-scrolltab-title{",
					"color: #"+baseColor+"!important;",
				"}",
			    ".BorderColor.B_F1{",
			        "border-color: #"+baseColor+"!important;",
			    "}"].join(" ");
			if(StyleDom.styleSheet){
				StyleDom.styleSheet.cssText = str;
			}else{  
				StyleDom.innerHTML = str;
			}
			document.getElementsByTagName("head")[0].appendChild(StyleDom);
		}
		
		this.init();
		this.initTop();
	},
	methods:{
		toOrderDetails(v){
			
			let goods = {
				data:{
					sellerId:this.GetRequest().sellerId,
					shangjiaId: this.GetRequest().id,
					id: v.id,
					goodsNo: v.goodsNo,
					productSerialNumber: v.productSerialNumber,
					storeNum: v.storeNum,
					sellPrice: v.sellPrice,
					goodsName: v.goodsName
				}
			};
			console.info(goods)
			try{
				if(window.theme == 'ios'){
			       	let cc = getJsBridge().call("toOrderDetails",goods);
				}else if(window.theme == 'material'){
					let cc = js.toOrderDetails(JSON.stringify(goods));
				}
			}catch(e){
			}
		},
		initTop(){
			let ol_top = document.getElementsByClassName('ol_top')[0];
			if(ol_top){
				ol_top = ol_top.clientHeight;
				if(this.isData(this.findOne.preferentialList)){
					this.TabStyle = {
						top: ol_top + 'px',
					}
				}else{
					this.TabStyle = {};
				}
			}else{
				this.TabStyle = {};
			}
		},
		tolink(){
			let f;
			if(!this.isGou){
				f = res=>{
					let data = this.data[this.dataKey].goodsList[this.goodsListKey];
					let routeData = {
						data: {
							orderNum:this.nums || 1,//商品数量
							order: data,
							findOne: this.findOne,
						}
					}
					try{
						if(window.theme == 'ios'){
							 getJsBridge().call("orderPay",routeData);//调用ios的方法
						}else{
							js.orderPay(JSON.stringify(routeData));//调用android的方法
						}
					}catch(e){}
					
				
					//this.$router.load({url: '/buy/?nums='+this.nums+'&id='+this.data.goods.id});
				}
			}else{
				/*f = res=>{
					this.addGoodsCar();
				}*/
			}
			this.isPopsHide(false,null);
			setTimeout(()=>{
				f && f();
			},320)
		},
		addGoodsCar(){
			let data = {
				goodsId: this.data.goods.id,//商品ID
				amount:this.nums//数量
			}
			this.$f7.showPreloader('请稍后...');
			this.ajax({
				url: "goods/addToGoodsCar",
				data,
				success: res=>{
					try{
						if(window.theme == 'ios'){
					       	let cc = getJsBridge().call("Gou",data);
						}else if(window.theme == 'material'){
							let cc = js.Gou(JSON.stringify(data));
						}else{
							this.errTips.call(this,err);
						}
					}catch(e){
						this.errTips.call(this,err);
					}
				},
				error: err=>{
			      this.errTips.call(this,err);
				}
			})
		},
		routeToGoods(){
			let data = this.data[this.dataKey].goodsList[this.goodsListKey];
			let goods = {
				data:{
					sellerId:this.GetRequest().sellerId,
					shangjiaId: this.GetRequest().id,
					id: data.id,
					goodsNo: data.goodsNo,
					productSerialNumber: data.productSerialNumber,
					showImg: data.showImg,
					storeNum: data.storeNum,
					sellPrice: data.sellPrice,
					goodsName: data.goodsName
				}
			};
			console.info(goods)
			try{
				if(window.theme == 'ios'){
			       	let cc = getJsBridge().call("toGoods",goods);
				}else if(window.theme == 'material'){
					let cc = js.toGoods(JSON.stringify(goods));
				}
			}catch(e){
			}
		},
		keypads(e){
			setTimeout(()=>{
				this.PopCenter = false;
				let picker = document.getElementsByClassName('close-picker')[0];
				let model = document.getElementsByClassName('with-picker-modal')[0];
				if(!!picker){
					this.pickers = f =>{
						this.PopCenter = true;
					}
					picker.addEventListener("click",this.pickers)
					model.addEventListener("click",this.pickers)
				}
			},100)
		},
		isPopsHide(bool,isGou,res){
			if(res){
				this.dataKey = res.key;
				this.goodsListKey = res.k;
			}
			let data = this.data[this.dataKey].goodsList[this.goodsListKey];
			let goods = {
				data:{
					sellerId:this.GetRequest().sellerId,
					shangjiaId: this.GetRequest().id,
					id: data.id,
					goodsNo: data.goodsNo,
					productSerialNumber: data.productSerialNumber,
					showImg: data.showImg,
					storeNum: data.storeNum,
					sellPrice: data.sellPrice,
					goodsName: data.goodsName
				}
			};
			try{
				if(window.theme == 'ios'){
			       	let cc = getJsBridge().call("Goods",goods);
				}else if(window.theme == 'material'){
					let cc = js.Goods(JSON.stringify(goods));
				}
			}catch(e){
			}
			console.info(goods)
			return;
			this.isGou = isGou;
			if(bool){
				this.isPopsShow = bool;
				this.PopShow(bool);
			}else{
				this.PopShow(bool,res=>{
					this.isPopsShow = bool;
				});
			}
		},
		PopShow(bool,c){
			setTimeout(()=>{
				this.Pop.style.bottom = (bool ? (-this.Pop.clientHeight - 20) : 0) +"px";
				this.Pop.style.opacity = 1;
				setTimeout(()=>{
					this.Pop.style[style.transitionTimingFunction] = ease.circular.style;
					this.Pop.style[style.transitionDuration] = 300 + "ms";
					this.Pop.style.bottom = (bool ? 0 : (-this.Pop.clientHeight - 20)) + "px";
					setTimeout(()=>{
						c && c();
					},320)
				},100)
			})
		},
		next(){
			
		},
		init(){
			if(!this.GetRequest().sellerId){
				return;
			}
			this.ajax({
				url: "goods/reslist",
				data: {
					sellerId:this.GetRequest().sellerId,
				},
				success: res=>{
					this.data = res;
				},
				error: (err) => {
					console.info(err)
				}
			})
			
			this.ajax({
				url: 'p2pres/findOne',
				data: {
					sellerId:this.GetRequest().sellerId,
					id: this.GetRequest().id,
				},
				success: res=>{
					this.findOne = res;
					this.initTop();
				},
				error: (err) => {
					console.info(err)
				}
			})
		}
	}
}
</script>

<style lang="scss">
@import "~src/assets/css/function.scss";
.ol_Navbar{
	background-color: transparent!important;
}
.ol_Navbar:after{
	background-color: transparent!important;
}
.ol_top{
	/*background: url(~src/assets/img/orderlistBg.png) no-repeat center;
	background-size: cover;*/
	height: 130px;
	display: flex;
	display: -webkit-flex;
	padding-left: 10px;
	padding-top: 44px;
	.ol_top_img{
		height: 70px;
		width: 70px;
		border-radius: 100%;
		overflow: hidden;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.ol_top_right{
		color: $B_B;
		padding-left: 12.5px;
		flex: 1;
		font-weight: 600;
		width: 50%;
		overflow: hidden;
		.ol_top_right_top{
			font-size: 18px;
			padding-top: 5px;
			position: relative;
		    padding-right: 15px;
		}
		.ol_top_right_top:after{
			content: "";
			background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTA1ODc3MTY3NzUxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ5NDEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjgiIGhlaWdodD0iMjgiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTM1Mi43NzQ1NzkgNTMzLjgxODkzNWMtNS42MjcxNjEgMC0xMS4yMjU2NjktMi4xNDE3OC0xNS41MTAyNTItNi40MjYzNjMtOC41NjkxNjYtOC41NjkxNjYtOC41NjkxNjYtMjIuNDUwMzE1IDAtMzEuMDE5NDgxTDY1NS43MTUxNjkgMTc3LjkzNTU1MmM4LjU2OTE2Ni04LjU2OTE2NiAyMi40NTAzMTUtOC41NjkxNjYgMzEuMDE5NDgxIDAgOC41NjkxNjYgOC41NjkxNjYgOC41NjkxNjYgMjIuNDUwMzE1IDAgMzEuMDE5NDgxTDM2OC4yODM4MDggNTI3LjM5MjU3MkMzNjMuOTk5MjI1IDUzMS42NzcxNTUgMzU4LjQwMDcxNiA1MzMuODE4OTM1IDM1Mi43NzQ1NzkgNTMzLjgxODkzNXoiIHAtaWQ9IjQ5NDIiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48cGF0aCBkPSJNNjcwLjA0OTY0MiA4NTEuMDk1MDIyYy01LjYyNzE2MSAwLTExLjIyNTY2OS0yLjE0MTc4LTE1LjUxMDI1Mi02LjQyNjM2M0wzMzcuMjY0MzI3IDUyNy4zOTI1NzJjLTguNTY5MTY2LTguNTY5MTY2LTguNTY5MTY2LTIyLjQ1MDMxNSAwLTMxLjAxOTQ4MXMyMi40NTAzMTUtOC41NjkxNjYgMzEuMDE5NDgxIDBsMzE3LjI3NTA2NCAzMTcuMjc1MDY0YzguNTY5MTY2IDguNTY5MTY2IDguNTY5MTY2IDIyLjQ1MDMxNSAwIDMxLjAxOTQ4MUM2ODEuMjc1MzExIDg0OC45NTIyMTggNjc1LjY3NjgwMyA4NTEuMDk1MDIyIDY3MC4wNDk2NDIgODUxLjA5NTAyMnoiIHAtaWQ9IjQ5NDMiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4=");
	    		background-size: cover !important;
		    height: 22px !important;
		    width: 10px !important;
		    color: #000!important;
		    display: block;
		    display: inline-block;
		    vertical-align: middle;
		    background-size: 100% auto;
		    background-position: center;
		    background-repeat: no-repeat;
		    font-style: normal;
		    transform: rotate(180deg);
		    -webkit-transform: rotate(180deg);
		    -ms-transform: rotate(180deg);
		    -o-transform: rotate(180deg);
		    -moz-transform: rotate(180deg);
		    position: absolute;
		    right: 10px;
	    }
		.ol_top_right_bottom{
			font-size: 13px;
			padding-top: 7.5px;
		    padding-right: 15px;
		}
	}
}
.ol_center{
	overflow: hidden;
	position: relative;
	.yd-rollnotice-item{
		height: 45px!important;
		background-color: #FFFFFF!important;
		position: relative!important;
		display: flex!important;
		display: -webkit-flex!important;
		align-items: center!important;
		padding: 0 12px!important;
		color: $B_H2!important;
		overflow: hidden!important;
		span{
			background-color: $B_F1;
			border-radius: 3px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: $B_B;
			padding: 2px 5px;
			font-size: 12px;
		}
		p{
			flex: 1;
			padding-left: 10px;
			font-size: 14px;
			white-space: nowrap;
		    word-break: keep-all;
		    overflow: hidden;
		    text-overflow: ellipsis;
		}
	}
}
.ol_center:after{
	content: "";
	background-color: $B_H4;
	position: absolute;
	bottom: 0;
	left: 0;
	height: 1px;
	width: 100%;
}
.ios{
	.ol_top{
		margin-top: -44px;
	}
	.ol_tab{
		top: 175px;
	}
}
.android{
	.ol_top{
		margin-top: -56px;
	}
	.ol_tab{
		top: 175px;
	}
}
.with-statusbar-overlay{
	.ol_top{
		height: 150px;
		margin-top: -64px;
	}
	.ol_tab{
		top: 150px;
	}
}

.ol{
	.yd-scrolltab-content{
		padding: 0!important;	
		transition-timing-function: 'cubic-bezier(0.1, 0.57, 0.1, 1)';
		transition-duration: '300ms';
	}
	.yd-scrolltab-content-title{
		padding: 8px 12px;
	}
	
	.yd-scrolltab-nav{
		width: 75px!important;
		.yd-scrolltab-item{
			height: auto!important;
			padding: 16px 0!important;
			.yd-scrolltab-title{
				font-size: 14px!important;
				/*color: #666!important;*/
				display: flex;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
				white-space: inherit!important;
				flex: 1;
				padding: 0 8px;
			}
			.yd-scrolltab-icon{
				margin-right: 0;
			}
		}
		.yd-scrolltab-active{
			background-color: $B_H6!important;
			.yd-scrolltab-title{
				/*color: $B_F1!important;*/
			}
		}
		.yd-scrolltab-active:before{
			border-right: 1px solid #dfdfdf!important;
		}
	}
	.yd-scrolltab-nav{
		background-color: #FFFFFF!important;
	}
}
	
.ol_item{
	.ol_list:after {
	    content: "";
	    position: absolute;
	    z-index: 0;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    border-bottom: 1px solid $B_H4;
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	}
	.ol_list{
		position: relative;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		padding: 15px;
		padding-left: 0;
		margin-left: 15px;
		.ol_list_img{
			width: 80px;
			height: 80px;
			border-radius: 8px;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.ol_list_main{
			padding-left: 12.5px;
			width: 50%;
			display: -webkit-flex;
			display: flex;
			flex-direction: column;
			flex: 1;
			.ol_list_title{
				overflow: hidden;
				font-size: 18px;
				font-weight: 600;
			    white-space: nowrap;
			    word-break: keep-all;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    color: $B_H1;
			}
			.ol_list_center{
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				flex: 1;
				align-items: center;
				.ol_list_left{
					.ol_list_num{
						padding-top: 7.5px;
						font-size: 13px;
						color: $B_H3;
					}
					.ol_list_bottom{
						padding-top: 4.5px;
						.ol_list_moeny{
							color: $B_F2;
							font-size: 15px;
						}
						.ol_list_pmoeny{
							color: $B_H3;
							font-size: 13px;
							position: relative;
							margin-left: 2px;
						}
						.ol_list_pmoeny:after{
							content: "";
							position: absolute;
							top: 0;
							bottom: 0;
							left: 0;
							width: 100%;
							height: 1px;
							background-color: $B_H3;
							margin: auto;
						}
					}
				}
				.ol_list_right{
					border-radius: 100%;
					height: 30px;
					width: 30px;
					background-color: $B_F1;
					display: flex;
					display: -webkit-flex;
					justify-content: center;
					align-items: center;
					label{
						color: $B_B;
						font-size: 24px;
					}
				}
			}
			
		}
	}
}



.orderChat_toolbar{
	position: absolute!important;
	z-index: 11111!important;
	bottom: 0!important;
	top: auto!important;
}


.order_Chat_nav_bg{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.3);
	z-index: 11;
}
 .order_Chat_Pop{
 	background-color: $B_B;
 	width: 100%;
 	position: absolute;
 	z-index: 111;
 	bottom: 0;
 	opacity: 0;
 	.order_Chat_Pop_top{
 		display: flex;
 		display: -webkit-flex;
 		.order_Chat_Pop_top_img{
 			margin-top: -20px;
 			border: 2px solid $B_B;
 			border-radius: 5px;
 			overflow: hidden;
 			margin-left: 8px;
 			margin-right: 8px;
 			height: 80px;
 			width: 80px;
 			img{
 				overflow: hidden;
 				border-radius: 5px;
 				width: 100%;
 				height: 100%;
 			}
 		}
 		.order_Chat_Pop_top_right{
 			padding-top: 10px;
 			div{
 				font-size: 12px;
 			}
 			div:nth-child(1){
 				color: $B_F1;
 				font-weight: 200;
 				padding-bottom: 2px;
 			}
 			div:nth-child(2){
 				
 			}
 			div:nth-child(3){
 				
 			}
 		}
 	}
 	.order_Chat_Pops{
 		overflow: hidden;
 		padding: 0 8px;
	 	.order_Chat_Pop_center{
	 		.order_Chat_Pop_center_item{
	 			dt{
	 				font-size: 15px;
	 				padding-bottom: 8px;
	 			}
	 			dd{
	 				padding-bottom: 8px;
	 				.order_Chat_Pop_active{
	 					background-color: $B_F1;
	 					color: $B_B;
	 				}
	 				span{
	 					font-size: 13.5px;
		 				background-color: $B_H6;
		 				justify-content: center;
		 				align-items: center;
		 				padding: 2px 8px;
		 				display: inline-flex;
		 				margin-right: 10px;
		 				border-radius: 8px;
	 				}
	 			}
	 		}
	 		.order_Chat_Pop_center_num{
	 			display: flex;
	 			display: -webkit-flex;
	 			justify-content: space-between;
	 			padding: 10px 0;
	 			border-top: 1px solid $B_H6;
	 			border-bottom: 1px solid $B_H6;
	 			.order_Chat_Pop_center_title{
	 				font-size: 15px;
	 			}
	 			.order_Chat_Pop_center_btn{
	 				background-color: $B_H6;
	 				border-radius: 2px;
	 				span{
	 					
	 				}
	 				span:nth-child(3),span:nth-child(1){
	 					display: inline-flex;
	 					justify-content: center;
	 					align-items: center;
	 					width: 24px;
	 					height: 24px;
	 					line-height: 24px;
	 					font-size: 18px;
	 					color: $B_H3;
	 				}
	 				span:nth-child(3){
	 					border-left: 1px solid $B_B;
	 				}
	 				span:nth-child(2){
	 					input{
	 						height: 24px;
	 						box-sizing: border-box;
	 						border-style: none;
	 						border: 0;
	 						background-color: $B_H6;
	 						width: 36px;
	 						text-align: center;
	 						font-size: 14px;
	 					}
	 				}
	 				span:nth-child(1){
	 					border-right: 1px solid $B_B;
	 				}
	 			}
	 		}
	 	}
 		
 	}
 	.order_Chat_Pop_bottom{
 		height: 44px;
 		display: flex;
 		display: -webkit-flex;
 		align-items: center;
 		justify-content: center;
 		background-color: $B_F1;
 		color: $B_B;
 		font-size: 16px;	
 	}
 }

 .orderChat_toolbar{
 	height: 0!important;
 	
	  .navbar-inner, .toolbar-inner{
	 	overflow: inherit!important;
	 	padding: 0!important;
	 }
 }
</style>