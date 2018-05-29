<template>
	<div class="wrap">
		<div>
			<div class="headerContain">
				<div class="headerWrap">
					 <span class="icon iconfont routerBack" @click="routerBack" v-html="icon.left"></span>
				   	  <div class="headerTitle">
				   	  	 <div class="headerItem" :class="{active:goodsSaleShow}" @click="getSaleList">出售中</div>
				   	  	 <div class="headerItem" :class="{active:!goodsSaleShow}" @click="getShelves">已下架</div>
				   	  </div>
				</div>
			</div>
			<div class="hdWrap">
			     <ul class="hd">
			         <li class="hdItem" v-for="(vo,key) in hdList" @click="orderSort(key)">
			           <div class="itemName" v-html="vo.name" :class="key==selectIndex?'showed':''"></div>
			           <div class="sortWrap">
			           	  <span class="triangle toUp" :class="sortOrder(key,'up')"></span>
			           	  <span class="triangle toDown" :class="sortOrder(key,'down')"></span>
			           </div>
			         </li>
			     </ul>
			</div>
			<div class='slidesClassMain' ref="slidesClassMain">
				<div  v-scrollt>
		        <div class="goodsSale" v-if="goodsSaleShow">
		             <div class="goodsBox" v-if="saleBox.productsList.length">
						     <ul class="bd goodsList">
								<li class="goodsItemWrap" v-for="(item,key) in saleBox.productsList">
									<div class="goodsItem" >
										<label class="selectLabel" v-show="saleBox.batchShow"><input type="checkbox" class="mgc mgc-circle"  v-model="saleBox.checkModel" :value="item.id"/></label>
										<div class="itemHd">
											<div class="goodsImgWrap">
												<img class='goodsImg' :src="item.showImg" />
											</div>
											<div class="right" :class="saleBox.batchShow?'rightFlex':''">
												<div class="goods-txt">
													<span class="sign" v-if="item.goodsType">{{item.goodsType}}</span>
													<span class="goodsName">{{item.goodsName}}</span>
												</div>
												<div class="boughtNum">{{item.sellCount||0}}人已购买</div>
												<div class="goods-price">
													<div>
														<span class="sellPrice">{{item.price}}</span>
													    <span v-if="item.marketPrice" class="marketPrice">￥{{item.marketPrice}}</span>
													</div>
													<div>库存剩余：{{item.storeNum}}</div>
												</div>
											</div>
										</div>
									</div>
									<ul class="itemBottom">
											<li class="bottomItem">
												<router-link class="itemLK" :to="{path:'/goods',query:{goodsId:item.id}}">
													<span class="icon iconfont" v-html="icon.icon1"></span>
												    <span>预览</span>
												</router-link>
											</li>
											<li class="line">|</li>
											<li class="bottomItem" @click="upDownFnu(key,'down')">
											   <span class="icon iconfont" v-html="icon.icon2"></span>
												<span>下架</span>
											</li>
											<!--<li class="line">|</li>
											<li class="bottomItem">
											   <span class="icon iconfont" v-html="icon.icon3"></span>
												<span>分享</span>
											</li>-->
										</ul>
									</li>
								</ul>
						</div>
				</div>
				<div class="shelves" v-if="!goodsSaleShow">
				  <div class="goodsBox" v-if="shelvesBox.productsList.length">
						     <ul class="bd goodsList">
								<li class="goodsItemWrap" v-for="(item,key) in shelvesBox.productsList">
									<div class="goodsItem" >
										<label class="selectLabel" v-if="shelvesBox.batchShow"><input type="checkbox" class="mgc mgc-circle"  v-model="shelvesBox.checkModel" :value="item.id"/></label>
										<div class="itemHd">
											<div class="goodsImgWrap">
												<img class='goodsImg' :src="item.showImg" />
												<div class="goodsImgMark">
												</div>
											</div>
											<div class="right" :class="shelvesBox.batchShow?'rightFlex':''">
												<div class="goods-txt">
													<span class="sign" v-if="item.goodsType">{{item.goodsType}}</span>
													<span class="goodsName">{{item.goodsName}}</span>
												</div>
												<div class="boughtNum">{{item.sellCount||0}}人已购买</div>
												<div class="goods-price">
													<div>
														<span class="sellPrice">{{item.price}}</span>
													    <span v-if="item.marketPrice" class="marketPrice">￥{{item.marketPrice}}</span>
													</div>
													<div>库存剩余：{{item.storeNum}}</div>
												</div>
											</div>
										</div>
									</div>
									<ul class="itemBottom">
											<li class="bottomItem">
												<router-link class="itemLK" :to="{path:'/goods',query:{goodsId:item.id}}">
													<span class="icon iconfont" v-html="icon.icon1"></span>
												    <span>预览</span>
												</router-link>
											</li>
											<li class="line">|</li>
											<li class="bottomItem" @click="upDownFnu(key,'up')">
											   <span class="icon iconfont" v-html="icon.icon3"></span>
												<span>上架</span>
											</li>
											<li class="line">|</li>
											<li class="bottomItem" @click="upDownFnu(key,'delete')">
											   <span class="icon iconfont" v-html="icon.delete"></span>
												<span>删除</span>
											</li>
									</ul>
								</li>
							</ul>
					</div>
				</div>
			</div>
			</div>
		</div>
		<!--商品为空-->
		 <div class="emptyWrap" v-if="goodsSaleShow&&!saleBox.productsList.length">
		   	  <div class="goodsEmpty">
		   	   	   <img class="emptyImg" :src="empty" alt="" />
		   	   	   <br />
		   	   	   <span class="emptyTxt">暂无商品上架</span>
		   	   </div>
		   	   <div class="addGoods" v-if="addGoodsTrue">
		   	   	 <router-link class="addBtn" :to="{path:'/addGoods'}">添加商品</router-link>
		   	   </div>
	    </div>
	     <div class="emptyWrap" v-if="!goodsSaleShow&&!shelvesBox.productsList.length">
		   	   <div class="goodsEmpty">
		   	   	   <img class="emptyImg" :src="empty" alt="" />
		   	   	   <br />
		   	   	    <span class="emptyTxt">暂无下架商品</span>
		   	   </div>
		</div>
	    <!--endok-->
		<div class="ft" v-if="!saleBox.batchShow&&goodsSaleShow&&saleBox.productsList.length"">
			 <router-link class="ftItem" :to="{path:'/addGoods'}" v-if="addGoodsTrue">添加商品</router-link>
			 <div class="ftLine" v-if="addGoodsTrue">|</div>
			 <div class="ftItem" @click="batch(arrObj)">批量管理</div>
		</div>
		<div class="batchWrap" v-if="saleBox.batchShow&&goodsSaleShow&&saleBox.productsList.length">
			<div class="batchItem batchLeft">
				<label><input type="checkbox" class="mgc mgc-circle" id="selectAll"  v-model='saleBox.checkedAll' @change="changeState"/>
					全选&nbsp;<span>已选{{saleBox.checkModel.length}}件商品</span>
				</label>
				
			</div>
			<div class="batchItem batchShelves" @click="upDownFnu(saleBox.checkModel,'down')">下架</div>
		</div>
		<div class="ft" v-if="!shelvesBox.batchShow&&!goodsSaleShow&&shelvesBox.productsList.length" @click="batch(arrObj)">
						 <div class="ftItem">批量管理</div>
		</div>
		<div class="batchWrap" v-if="shelvesBox.batchShow&&!goodsSaleShow&&shelvesBox.productsList.length">
			<div class="batchItem batchLeft">
				<label><input type="checkbox" class="mgc mgc-circle" v-model='shelvesBox.checkedAll' @change="changeState"/>全选</label>
				<span>已选{{shelvesBox.checkModel.length}}件商品</span>
			</div>
			<div class="batchItem batchShelves" @click="upDownFnu(shelvesBox.checkModel,'up')">上架</div>
			<div class="batchItem batchShelves" @click="upDownFnu(shelvesBox.checkModel,'delete')">删除</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
	data() {
		return {
			showTitle:false,
			title:"出售",
			icon:{
			    icon1:"&#xe785;",
			    icon2:"&#xe769;",
			    icon3:"&#xe69c;",
			    delete:"&#xe692;",
				left:"&#xe608;",
				search:"&#xe6a1;",
			},
			empty:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500542394426empty.png',
			goodsSaleShow:true,
			arrObj:'saleBox',
			confirmTip:{up:'确定要上架吗？',down:'确定要下架吗？',delete:'确定要删除吗？'},
			saleBox:{},
			shelvesBox:{},
			batchSaleShow:false,
			batchShelvesShow:false,
			data:{
				productSerialNumber:this.productSerialNumber,  //产品序列号
			    pageNum:1,
			    pageSize:5,
                isUp:'up',                                 //为null时显示所有 上下架 ，up or down
                orderby:'6'	                               //时间正序 ：0 ,时间倒序 ：6//销量正序 ： 1 ，销量倒序 ：7 //价格正序：2，价格倒序：3 ; 库存正序： 4 ，库存倒序 5
			},
			hdList:[{name:'添加时间'},{name:'销量'},{name:'库存'}],
			selectIndex:0,                                //0代表时间，1代表销量，2代表库存
    		sort:'down',                                     //up代表从高到底显示，down代表从低到高显示
    		sortOrder:function(index,str){
					if(index==this.selectIndex){
						if(this.sort==str){
							if(str=='up'){
								return 'upSorted';
							}else{
								return 'downSorted';
							}
						}else{
							if(str=='up'){
								return 'upUnSorted';
							}else{
								return 'downUnSorted';
							}
						}
					}
					return;
			},
			dataList:[],
			isMaxPage: false,
			maxPage:0,
			clearData:false,  //判断是否清空数据
			addGoodsTrue:false
		}
	},
	computed: {
      ...mapGetters([
          'userInfo',
          'getXToken'
      ]),
    },
	beforeMount(){
		this.backNum=false;
		 this.$store.dispatch('showTitle',this.showTitle);
		 this.$store.dispatch('title',this.title);
		 this.saleBox={
    		productsList:[],
    		batchShow:false,     //批量管理
			checkedAll:false,
			checkModel:[],  //批量管理数组
         },
         this.shelvesBox={
         	productsList:[],
    		batchShow:false,     //批量管理
		   checkedAll:false,
		   checkModel:[],  //批量管理数组
         } 
	},
    mounted() {
	    setTimeout(()=>{
		 	this.$refs.slidesClassMain.style.height = window.innerHeight-this.$refs.slidesClassMain.getBoundingClientRect().top- ((.6* window.innerHeight/750) * 100)+ "px";
		 });
		 this.init();
		 this.userExRole=this.getXToken.userExRole;
		 if(this.userExRole=='supplier'||this.userExRole=='oneyuan'){
				 this.addGoodsTrue=true;
		 }
    },
	methods: {
		init(c){
			let url="goodsmanager/list",
			    data=this.data;
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						//console.info(res);
						if(this.clearData){
							this[this.arrObj].productsList=[];
							this.clearData=false;
						}
						if(res.data.list){
							this[this.arrObj].productsList=this[this.arrObj].productsList.concat(res.data.list);
						}
						this.maxPage=Math.ceil(res.data.count/this.data.pageSize);
					}
				});
			});
		},
		routerBack(){
        	this.backtoPage();
        },
        getSaleList(){
        	//出售页
        	if(this.goodsSaleShow){
        		return;
        	}
        	this.goodsSaleShow=true;
        	this.arrObj='saleBox';
	        this.data.isUp='up';
        	this.sort='down';
        	this.selectIndex=0;
        	let a=this.sort+this.selectIndex;
		    this.sortSwitch(a);
        },
		getShelves(){
			//下架页
			if(!this.goodsSaleShow){
	        		return;
	        	}
	        	this.goodsSaleShow=false;
	        	this.arrObj='shelvesBox';
	        	this.data.isUp='down';
	        	this.sort='down';
	        	this.selectIndex=0;
	        	let a=this.sort+this.selectIndex;
			    this.sortSwitch(a);
		},
		ResetTop( res){//下拉刷新
			this.data.pageNum=1;
	    	this.isMaxPage = false;
	    	this.clearData=true;
	    	this.init(this.data);
	    	res(false);
	    },
	    ResetBottom(res){
	    	if(this.data.pageNum==this.maxPage){
	    		res(false);
	    		this.isMaxPage = true;
	    		return;
	    	}else{
	    		++this.data.pageNum;
	    		this.init(this.data);
	    		res();
	    	}
		},
		batch(str){
		  	 this[str].batchShow=true;  //批量管理
		  },
		orderSort(index){
				if(this.selectIndex==index){
				    if(this.sort=='up'){
						//升序排序
						 this.sort='down'
					}else{
						//降序排序
						this.sort='up'
					}
				}else{
				   this.selectIndex=index;
				}
			let a=this.sort+this.selectIndex;
			this.sortSwitch(a);
		},
		sortSwitch(n){
			this.isMaxPage = false;
			this.data.pageNum=1;
			this.clearData=true;
			this[this.arrObj].checkModel=[];
			switch (n)
				{
				case 'up0':
				  this.data.orderby='0'    //时间正序 ：0 
				  break;
				case 'up1':
				  this.data.orderby='1'    //销量正序 ： 1
				  break;
				case 'up2':
				  this.data.orderby='4'   //库存正序： 4
				  break;
				case 'down2':
				  this.data.orderby='5'  //库存倒序 5
				  break;
				case 'down0':
				  this.data.orderby='6'  //时间倒序 ：6
				  break;
				case 'down1':
				  this.data.orderby='7'  //销量正序 ： 7
				  break;
		   }
				this.init();
		},
		changeState(item) {
				    this[this.arrObj].checkModel=[];
				    if(this[this.arrObj].checkedAll){
				    	this[this.arrObj].productsList.forEach((val,index)=>{
				    		this[this.arrObj].checkModel.push(val.id);
				    	})
				    }
		},
		upDownFnu(a,tip){
			//上下架
			this.confirm({
				title:this.confirmTip[tip],
				Array:['确认', '取消'],
				callback:(bool)=>{
					if(bool){ 
						//调用接口
						let url,data;
						if(tip=='delete'){
							url="goodsmanager/batchDelete",
						    data={
						    	batchList:[]
						    };
						}else{
							url="goodsmanager/batchUpAndDown",
						    data={
						    	batchList:[],
						    	isUp:tip
						    };
						}
						if(typeof(a)=='number'){
							    data.batchList.push({id:this[this.arrObj].productsList[a].id});
						}else{
							for(let k in a){
								 data.batchList.push({id:a[k]});
							}
						}
						this.getByUrl({data,url}, res=>{
								this.ajax({
									url : res.url,
									data : res.data,
									success:( res)=>{
										if(res.meta.success){
											if(typeof(a)=='number'){
										 	     //单个上下架
							                     this[this.arrObj].productsList.splice(a,1);
											 }else{
											 	 //批量上下架
													 for(let i=0;i<a.length;i++){
														for(let j=0;j<this[this.arrObj].productsList.length;j++){
															if(a[i]==this[this.arrObj].productsList[j].id){
																this[this.arrObj].productsList.splice(j,1);
															    break;
															}
														}
													}
											 }
										}
									}
								});
							});
						//boolOk
					  }
					}
				});
		},
	},
	watch: {//深度 watcher
		  'saleBox.checkModel': {
		    handler: function (val, oldVal) { 
		      if (this.saleBox.checkModel.length === this.saleBox.productsList.length&&this.saleBox.productsList.length) {
		        this.saleBox.checkedAll=true;
		      }else{
		        this.saleBox.checkedAll=false;
		      }
		    },
		    deep: true
		  },
		  'shelvesBox.checkModel': {
		    handler: function (val, oldVal) { 
		      if (this.shelvesBox.checkModel.length === this.shelvesBox.productsList.length&&this.shelvesBox.productsList.length) {
		        this.shelvesBox.checkedAll=true;
		      }else{
		        this.shelvesBox.checkedAll=false;
		      }
		    },
		    deep: true
		  }
	}
}
</script>

<style lang='scss' scoped>
@import "../../assets/css/h_config.scss";
.headerContain{
    width: 100%;
    height:.9rem;
    line-height:.8rem;
    top:0;
	position: relative;
	z-index: 10;
	background:#FFFFFF;
}
.headerWrap{
	width: 100%;
    height: 0.9rem;
    line-height:.8rem;
	position: fixed;
	background:#FFFFFF;
	border-bottom:.01rem solid #dbdbdb;
	
}
.routerBack{
	display: inline-block;
	position: absolute;
	font-size:.36rem;
	top:0;
	left:.1rem;
	z-index: 12;
	color:#666;
	transform: rotate(180deg);
}
.headerTitle{
	font-size:.32rem;
	width:70%;
	margin:0 auto;
	display: flex;
	justify-content: space-around;
	text-align: center;
	.headerItem{
		border-bottom:.06rem solid transparent;
	}
	.active{
		color:#e7580c;
		border-bottom:.06rem solid #e7580c;
	}
}
.emptyWrap{
	width:100%;
	height:calc(100vh);
	position: fixed;
	top:1rem;
	left:0;
}
.goodsEmpty{
    width:3rem;
	position: absolute;
	top:20%;
	left:50%;
	margin-left:-1.5rem;
	text-align: center;
	
}
.emptyImg{
	width:2rem;
}
.emptyTxt{
	display: block;
	color:#999;
	font-size:.36rem;
	margin-top:.2rem;
}
.addGoods{
		 position: fixed;
		 bottom:0;
		 width:100%;
		 height:1.2rem;
		text-align: center;
		.addBtn{
		display: inline-block;
		 width:7rem;
		 height:.9rem;
		 line-height:.9rem;
		 font-size:$btnSize;
		 background-color:#e7580c;
		 color: $btnActiveColor;
		 border-radius:$btnBorderRadius;
	  }
}
.goodsBox{
	
}
.hdWrap{
    height:.8rem;
    line-height:.8rem;
    top:0;
	position: relative;
	z-index: 10;
}
.hd{
	width:100%;
	display: flex;
	justify-content:space-around;
	background: #fbfbfb;
}
.hdItem{
	display: flex;
	align-items: center;
	color:#333;
	font-size:.26rem;
	.itemName{
		margin-right:.1rem;
	}
	.showed{
	   color:#e7580c;
	}
}
.sortWrap{
   display: flex;
   flex-direction: column;
   align-items: center;
}
.triangle{
	display: inline-block;
	width:0;
	height:0;
	border:.1rem solid transparent;
}
.toUp{
	border-bottom:.1rem solid #e5e5e5;
}
.toDown{
	margin-top:.05rem;
	border-top:.1rem solid #e5e5e5;
}
.upSorted{
	border-bottom:.1rem solid #e7580c;
}
.downSorted{
	border-top:.1rem solid #e7580c;
}
.upUnSorted{
	border-bottom:.1rem solid #fed0d0;
}
.downUnSorted{
	border-top:.1rem solid #fed0d0;
}
.bd{
	width:100%;
}
.goodsItemWrap{
	margin-top: .15rem;
	background:#FFFFFF;
}
.goodsItemWrap:last-child{
	margin-bottom:1.5rem;
}
.goodsItem{
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom:1px solid #eaeaea;
}
.itemHd{
	display: flex;
	padding:.2rem 1.5%;
	position: relative;
}
.goodsImgWrap{
	width:2rem;
	margin-right:.2rem;
	height:2rem;
	position: relative;
}
.goodsImg{
	width:2rem;
	height:2rem;
}
.right{
	width:5rem;
}
.rightFlex{
	width:4rem;
}
.goodsImgMark{
	width:2rem;
	height:2rem;
	position: absolute;
	top:0;
	left:0;
	background:url('http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500542481950goodsDown.png') center center no-repeat rgba(0,0,0,.5);
	background-size:auto 1.2rem;
}
.goods-title{
	display: flex;
	align-items: center;
	justify-content: space-between;
		padding-top:.2rem;
}
.sign{
	background: #FF6515;
	padding: .05rem .1rem;
	color: #fff;
	font-size: .22rem;
	border-radius: 0.06rem;
}
.goodsName{
	font-size: .28rem;
}
.boughtNum{
	margin-top:.15rem;
	color:#666;
	font-size:.24rem;
}
.goods-price{
	margin-top:.2rem;
	color: #FF6515;
	display: flex;
	font-size: .30rem;
	justify-content: space-between;
}
.marketPrice{
	font-size: .22rem;
	color: #999999;
	margin-left: .2rem;
	text-decoration: line-through;
}
.sellPrice{
	font-size: .30rem;
}
.itemBottom{
	display: flex;
	justify-content:space-around;
	color:#666;
	padding:.1rem 0;
	height:.6rem;
	font-size:.28rem;
}
.itemBottom .iconfont{
	font-size:.28rem;
}
.line{
	color:#e5e5e5;
}
.itemLK{
	color:#666;
}
.ft{
	position: fixed;
	bottom:0;
	left:0;
	width:100%;
	height:1rem;
	background:#e7580c;
	display: flex;
	justify-content: space-between;
	font-size:.3rem;
}
.ftItem{
	width:100%;
	line-height:1rem;
	text-align: center;
	color:#FFFFFF;
}
.ftLine{
	width:4%;
	line-height:1rem;
	color:#FFFFFF;
	text-align: center;
}
.batchWrap{
	position: fixed;
	bottom:0;
	left:0;
	width:100%;
	height:1rem;
	background:#FFFFFF;
	display: flex;
	justify-content: space-between;
	font-size:.3rem;
}
.batchItem{
	line-height:1rem;
	color:#333;
}
.batchLeft{
	width:50%;
	margin-left:2%;
}
.batchShelves{
	width:23%;
	background:#e7580c;
	color:#ffffff;
	text-align: center;
}
.selectLabel{
	padding:.2rem;
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
</style>