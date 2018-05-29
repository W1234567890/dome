<template>
	<div class="wrapper">
		<ul class="navItem">
			<li v-for="(item,key) in data" @click="curItemShow(item,key,item.txt)" :class="key == curIndex ? 'active' :''">{{item.txt}}</li>
		</ul>
		
		<div class='slidesClassMain' ref="slidesClassMain">
			<!--商品列表数据-->
			<div v-scrollt v-if='dataList.length'>
				<div class="goodsUnit" v-for="(item,key) in dataList">
					<router-link class="topSection" :to="{path:'goods',query:{goodsId:item.id}}">
						<div class="imagesBox">
							<img :src="item.showImg" class="goodsImage" /><!--v-html="item.state==0 ? '未开始':(item.state==1 ? '进行中' :'已结束')"-->
							<span class="saleState">{{item.goodsStatus}}</span>
						</div>
						<div class="goodsIntr">
							<div class="">
								<span v-if='item.goodsType' class="handpick">{{item.goodsType}}</span>
								<span class="goodsDeclare">{{item.goodsName}}</span>
							</div>
							<div class="soldNum">单人限购：{{item.robInt}}</div>
							<div class="goodsStore">
								<span>
									<span class="curPrice">{{item.price}}</span>
									<span class="oldPrice">￥{{item.marketPrice}}</span>
								</span>
								<span class="remainGoodsNum">库存剩余：{{item.storeNum}}</span>
							</div>
						</div>
					</router-link>
					
					<div class="bottomSection">
						<span class="">
							<span>{{item.robStartTime}}</span> 至 
							<span>{{item.robEndTime}}</span>
						</span>
						<span class="">
							<span class="icon iconfont"  @click='shareGoods' v-if="false">&#xe684;</span>
							<span class="cancle" @click="deleteGoods(item,key)">取消</span>
						</span>
					</div>
				</div>
			</div>
			<!--无数据时显示-->
			<div class="noGoodsIcon" v-if='!dataList.length'>
				<img :src='noGoodsIcon' class="images" />
				<div class="">暂无折扣商品</div>
			</div>
		</div>
		<!--底部-->
		<div class="footer">
			<router-link :to="{path:'/selectDiscountGoods',query:{id:3}}">
				<span>添加折扣商品</span>
			</router-link>
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			title:'限时抢购',
			showTitle:true,
			data:[{
				txt:"全部",
			},{
				txt:"未开始",
			},{
				txt:"进行中",
			}],
			dataList:[],
			dataStore:[{type:null,curpage:1,list:[],saleState:''},{type:1,curpage:1,list:[],saleState:'0'},{type:0,curpage:1,list:[],saleState:'1'}],
			curIndex:0,
			noGoodsIcon:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500542394426empty.png',
			isHasGoods:false,
			flag:null,
			saleState:null,
			callData:{
				productSerialNumber:this.productSerialNumber,
				pageNum:1,	                //当前页
			    pageSize:5,                 //每页查询的数据条数
			    flashSaleStatus:''            //限时抢购商品的状态。未开始：0；进行中1。
			},
			isMaxPage: false,
			maxPage:1,
		}
	},
	methods: {
		
		/*ResetTop( res){//下拉刷新
			this.dataStore[this.curIndex].curPage = 0;
			this.dataList = [];
	    	this.getData(res);
	    },*/
	   ResetBottom( res){//上拉加载
	    	if(this.dataStore[this.curIndex].curpage == this.maxPage){
	    		res(false);
	    		this.isMaxPage = true;
	    		return;
	    	}else{
	    		++this.dataStore[this.curIndex].curpage;
	    		this.callData.pageNum=this.dataStore[this.curIndex].curpage;
	    		this.getData();
	    		res();
	    	}
	    },
		deleteGoods(item,key){//删除商品
			this.confirm({ //confirm弹窗
				content : " ",//标题
				title : "是否取消此商品限时抢购", //内容
				Array : ['确认', '取消'],
				callback : ( bool)=>{//回调函数
					if(bool){
						this.cancleGoodsFlashSale(item.id);
						this.dataList.splice(key,1);
					}
				}
			});
			/*this.cancleGoodsFlashSale(item.id);
			this.dataList.splice(key,1);*/
		},
		curItemShow(item,key,txt){//切换商品销售状态
			this.curIndex = key;
			this.callData.pageNum=this.dataStore[this.curIndex].curpage;
			this.isMaxPage = false;
			if(this.dataStore[this.curIndex].list.length>0){
				this.dataList = this.dataStore[this.curIndex].list;
				
			}else{
				this.callData.flashSaleStatus=this.dataStore[this.curIndex].saleState;
				this.callData.pageNum=1;
				this.getData();
			};
		},
		shareGoods(){//分享商品
			/*let ua = navigator.userAgent.toLowerCase();
			let data={msg:"testSyn"};
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				  let bridge = getJsBridge();
    	          let cc=bridge.call("testSyn",data);
    	          alert(cc);  //cc为返回的值
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				 let cc=js.testSyn(JSON.stringify(data));
			}else{
				return;  //pc端
			}*/
		},
		getData(saleState){//获取对应销售状态商品数据
			let url="goodsmanager/flashGoodList",
			   data = this.callData;
			
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						console.log(res);
						let arr=res.data.list;
						for(var i=0;i<res.data.list.length;i++){
							if(this.curMilliseconds<res.data.list[i].robStartTime){
								arr[i].goodsStatus = "未开始";
							}else{
								arr[i].goodsStatus = "进行中";
							};
						};
						for(var i=0;i<arr.length;i++){
							arr[i].robStartTime =new Date(arr[i].robStartTime).toLocaleString().replace(/:\d{1,2}$/,' ').replace(/\//g,'-');
							arr[i].robEndTime =new Date(arr[i].robEndTime).toLocaleString().replace(/:\d{1,2}$/,' ').replace(/\//g,'-');
						};
						
						//数据存储
						this.maxPage=Math.ceil(res.data.count/this.callData.pageSize);
						this.dataStore[this.curIndex].list = this.dataStore[this.curIndex].list.concat(arr);
						this.dataList=this.dataStore[this.curIndex].list;
						//判断是否显示无商品时的状态
						//saleState&& saleState();
					}
				});
			});
		},
		cancleGoodsFlashSale(id){
			let data = {goodsIds:id},
			url="goodsmanager/cancelFlashGoods";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						if(res.meta.code=10000){
							if(this.curIndex ==0){
								this.dataStore[1].list=[];
								this.dataStore[2].list=[];
							}else{
								this.dataStore[0].list=[];
							};
							this.toastMsg("取消成功！");
						}
					}
				});
			});
		},
	},
	beforeMount(){
		this.curMilliseconds = (new Date()).getTime(); //得到毫秒数  
		this.getData();
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	},
	mounted() {
		 setTimeout(()=>{
		 	this.$refs.slidesClassMain.style.height = window.innerHeight - this.$refs.slidesClassMain.getBoundingClientRect().top+ "px";
		 })
	},
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.wrapper{
		color: #333;
		font-size: .24rem;
	}
	.navItem>li{
		height: 1rem;
		line-height:1rem ;
		padding: 0 .14rem;
	}
	.navItem li.active{
		border-bottom: solid 3px #E7580C;
		color: #E7580C;
	}
	.navItem,.topSection,.bottomSection,.goodsStore{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.navItem{
		width: 100%;
		background: #fff;
		font-size: .3rem;
		justify-content: space-around;
	}
	.noGoodsIcon{
		text-align: center;
		color: #999;
		font-size: .3rem;
		padding: 1.7rem 0 0 0;
	}
	.noGoodsIcon .images{
		height: 2rem;
		width: auto;
		margin-bottom:.2rem ;
	}
	.goodsUnit{
		margin-top: .2rem;
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
		margin-right: .2rem;
		width: 2rem;
		height: 2rem;
		position: relative;
	}
	.goodsIntr{
		width: 4.9rem;
	}
	.goodsStore{
		justify-content: space-between;
		color: #E7580C;
	}
	.imagesBox .saleState{
		position: absolute;
		height: .4rem;
		line-height: .4rem;
		width: 100%;
		text-align: center;
		color: #fff;
		background: rgba(0,0,0,0.5);
		bottom: 0;
		font-size: .22rem;
	}
	.topSection .goodsImage{
		width: 100%;
		height: 100%;
	}
	.bottomSection{
		height: 1rem;
		justify-content: space-between;
		border-top: solid 1px $lineColor;
	}
	.bottomSection .cancle{
		margin-left: .5rem;
		color: #999;
	}
	.bottomSection .icon{
		font-size: .3rem;
		color: #999;
	}
	.footer{
		position: fixed;
		width: 100%;
		height: .9rem;
		line-height: .9rem;
		text-align: center;
		color: #fff;
		background: #E7580C;
		font-size: $fz36;
		bottom: 0;
	}
	.footer>a{
		width: 100%;
		height: 100%;
		display: inline-block;
		color: #fff;
	}
</style>

