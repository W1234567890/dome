<template>
	<div class="wrapper">
		<div class="headeRight">
			<span class="btn" @click="finishSet">完成</span>
	   </div>
		<div class="goodsUnit">
			<div class="topSection">
				<div class="imagesBox">
					<img :src="goodsInf.showImg" class="goodsImage" />
				</div>
				<div class="goodsIntr">
					<div class="">
						<span class="handpick" v-if="goodsInf.goodsType">{{goodsInf.goodsType}}</span>
						<span class="goodsDeclare">{{goodsInf.goodsName}}</span>
					</div>
					<div class="soldNum">销量：{{goodsInf.sellCount}}</div>
					<div class="goodsStore">
						<span>
							<span class="curPrice">￥{{goodsInf.price}}</span>
							<span class="oldPrice">￥{{goodsInf.marketPrice}}</span>
						</span>
						<span class="remainGoodsNum">库存剩余：{{goodsInf.storeNum}}</span>
					</div>
				</div>
			</div>
		</div>
		<ul class="itemSetList">
			<li>
				<span>型号设置：</span>
				<input placeholder="默认型号"  readonly="readonly"/>
			</li>
			<li class="hasMarginBottom">
				<span>活动库存：</span>
				<input placeholder="" v-model="postData.storeNum"/>
			</li>
			<li>
				<span>折扣：</span>
				<input placeholder="0折"  v-model="postData.flashSaleDiscount" />
			</li>
			<li class="hasMarginBottom">
				<span>折扣价：</span>
				<input :value="(postData.flashSaleDiscount*goodsInf.price)/10"  readonly="readonly"/>
			</li>
			<li @click="dtPickerStart" class="rightArrow">
				<span>开始时间：</span>
				<input placeholder=""  v-model="postData.robStartTime" readonly="true"/>
				<span class="icon iconfont">&#xe608;</span>
			</li>
			<li class="hasMarginBottom rightArrow"  @click="dtPickerEnd" >
				<span>结束时间：</span>
				<input placeholder=""  v-model="postData.robEndTime" readonly="true"/>
				<span class="icon iconfont">&#xe608;</span>
			</li>
			<li @click="popRankSelect">
				<span>限购等级：</span>
				<a class="curRank">
					<a>{{this.curRank}}</a>
					<a class="icon iconfont">&#xe608;</a>
				</a>
			</li>
			<li>
				<span>限购数量：</span>
				<input placeholder="每人最多可购买商品的数量" v-model="postData.robInt" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
			</li>
		</ul>
		<div class="mask" v-if="isMaskShow">
			<ul class="itemSelect">
				<li v-for="(item,key) in limitRank" @click="selectRank(key,item.levelName,item.id)">{{item.levelName}}</li>
			</ul>
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			goodsInf:[],
			limitRank:[],
			curRank:'请选择',
            postData:{
            	goodsIds:'',
            	storeNum:'',
            	flashSaleDiscount:'',
            	flashPriceDiscount:'',
            	robStartTime:'',
				robEndTime:'',
				robInt:'',
				isFlashSale:'YES',
				robMemberLevel:'',
            },
			title:'折扣设置',
			showTitle:true,
			isMaskShow:false,
		}
	},
	methods: {
		init(){
			let url='memberLevel/list',
			    data={};
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						this.limitRank=res.data;
						//console.info(res);
					}
				})
			})
		},
		dtPickerStart(){//选择开始时间
			let _this = this;
			var dtpicker = new mui.DtPicker({  
			    type: "datetime",//设置日历初始视图模式  
			}); 
			dtpicker.show(function(e) { 
			_this.postData.robStartTime = e.text;
			});
		},
		dtPickerEnd(){//选择结束时间
			let _this = this;
			var dtpicker = new mui.DtPicker({  
			    type: "datetime",//设置日历初始视图模式  
			}); 
			dtpicker.show(function(e) { 
			_this.postData.robEndTime= e.text;
			});
		},
		popRankSelect(){//弹出限购等级
			this.isMaskShow = true;
		},
		selectRank(key,txt,id){//选择限购等级
			this.curRank = txt;
			this.isMaskShow = false;
			this.postData.robMemberLevel = id;//会员等级id
		},
		sendData(){//提交数据方法
			let data = this.postData,
			url="goodsmanager/batchSetFlashGoods";
			data.goodsIds = this.goodsInf.id;
			data.robStartTime = data.robStartTime+':00';
			data.robEndTime = data.robEndTime+':00';
			console.log(data);
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					type:'post',
					success:( res)=>{
						if(res.meta.code='10000'){
							this.toastMsg("折扣商品设置成功！","fail");
							setTimeout(()=>{
								this.$router.go(-2);
							},1500)
						}else{
							this.toastMsg("折扣商品设置失败！","fail");
						}
					}
				});
			});
		},
		finishSet(){//提交数据
			if(this.postData.storeNum==""){
	       		this.toastMsg("活动库存不能为空","fail");
	       	}else{
	       		if(this.postData.flashSaleDiscount==''){
		       		this.toastMsg("请填写折扣","fail");
		       	}else{
		       		if(this.postData.robStartTime==''){
		       			this.toastMsg("请选择开始时间","fail");
		       		}else{
		       			if(this.postData.robEndTime == ''){
		       				this.toastMsg("请选择结束时间","fail");
		       			}else{
		       				if(this.curRank == '请选择'){
		       					this.toastMsg("请选择限购等级","fail");
		       				}else{
		       					if(this.postData.robInt == ''){
		       						this.toastMsg("请填写限购数量","fail");
		       					}else{
		       						this.sendData();
		       					}
		       				}
		       			}
		       		}
		       	}
	       	}
			//this.$router.push({path:'/flashSale'});
		}
	},
	beforeMount(){
		this.goodsInf = this.$router.currentRoute.query.curGoods;
		let str = this.goodsInf.price.substring(1, this.goodsInf.price.length);
		let idx = str.indexOf("~");
		if(idx!==-1){
			this.goodsInf.price = str.substring(0,idx);
		}else{
			this.goodsInf.price = this.goodsInf.price.substring(1, this.goodsInf.price.length);
		}
		console.log(this.goodsInf)
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.init();
	},
	watch: {
		limitGoodsNum(e){
			this.limitGoodsNum = e.replace(/\D/,'')
		}	
	},
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
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
	.wrapper{
		color: #333;
		font-size: .3rem;
	}
	
	.topSection,.goodsStore,.itemSetList>li{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.itemSetList .curRank{
		margin-right: .4rem;
		color: #666;
		font-size: .28rem;
	}
	.itemSetList li:last-child{
		margin-top: .2rem;
	}
	.goodsUnit{
		margin-bottom: .2rem;
		background: #fff;
		padding: .2rem .2rem 0 .2rem;
	}
	.topSection{
		padding-bottom:.2rem ;
	}
	.topSection .handpick{
		padding: 0 0.08rem;
		background: #E7580C;
		color: #fff;
		font-size: .24rem;
		border-radius: 0.06rem;
	}
	.topSection .goodsDeclare{
		font-size: .3rem;
		color: #333;
	}
	.topSection .soldNum{
		margin: .2rem 0;
		color: #999;
	}
	.topSection .curPrice{
		font-size: .3rem;
		color: #E7580C;
		margin-right: .1rem;
	}
	.topSection .oldPrice{
		font-size: .18rem;
		color: #999;
		text-decoration: line-through;
	}
	.remainGoodsNum{
		text-align: right;
	}
	.imagesBox{
		width: 2rem;
		height: 2rem;
		margin-right: .2rem;
		position: relative;
	}
	.goodsIntr{
		width: 4.9rem;
	}
	.goodsStore{
		justify-content: space-between;
		color: #E7580C;
	}
	.topSection .goodsImage{
		width: 100%;
		height: 100%;
	}
	.itemSetList{
		margin-top: .2rem;
	}
	.itemSetList>li{
		height: 1rem;
		background: #fff;
		padding: 0 .2rem;
		position: relative;
		justify-content: space-between;
	}
	.itemSetList>li span{
		width: 1.8rem;
	}
	.itemSetList input{
		height: .7rem;
		outline: none;
		width: 5.6rem;
		border: none;
		font-size: .3rem;
	}
	::-webkit-input-placeholder{
		font-size: .28rem;
	}
	.itemSetList .hasMarginBottom{
		margin-bottom:.2rem ;
		border-top: solid 1px $lineColor;
	}
	.itemSetList .icon{
		position: absolute;
		right: 0;
		top: 0.24rem;
		font-size: .4rem;
		color: #999;
		width:.6rem ;
	}
	
	.mask{
	  	width: 100%;
	  	height: 100%;
	  	background: rgba(0,0,0,.5);
	  	position: fixed;
	  	left: 0;
	  	top: 0;
	  	z-index: 99999;
	  }
	  .itemSelect{
	  	position: absolute;
	  	bottom: 0;
	  	width: 100%;
	  	padding: .3rem;
	  	background: #F7F7F7;
	  }
	  .itemSelect>li{
	  	height: 1rem;
	  	line-height: 1rem;
	  	text-align: center;
	  	background: #fff;
	  	margin-bottom: .3rem;
	  	font-size:$fz30;
	  	position: relative;
	  }
	  .itemSelect li:last-child{
	  	margin: 0;
 	 }
</style>