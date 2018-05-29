<template>
	<div class="wrapper">
		<div class='slidesClassMain' ref="slidesClassMain">
			<div class="noGoodsIcon" v-if='!dataList.length'>
				<img :src='noGoodsIcon' class="images" />
				<div class="">暂无商品</div>
			</div>
			<div v-scrollt v-if='dataList.length'>
				<div class="goodsUnit" v-for="(item,key) in dataList">
					<router-link class="topSection" :to="{path:'setDiscount',query:{curGoods:dataList[key]}}">
						<div class="imagesBox">
							<img :src="item.showImg" class="goodsImage" />
						</div>
						<div class="">
							<div class="goodsIntr">
								<span v-if="item.goodsType" class="handpick">{{item.goodsType}}</span>
								<span class="goodsDeclare">{{item.goodsName}}</span>
							</div>
							<div class="soldNum">销量：{{item.sellCount}}</div>
							<div class="goodsStore">
								<span>
									<span class="curPrice">{{item.price}}</span>
									<span class="oldPrice">￥{{item.marketPrice}}</span>
								</span>
								<span class="remainGoodsNum">库存剩余：{{item.storeNum}}</span>
							</div>
						</div>
					</router-link>
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
			dataList:[],
			title:'选择折扣商品',
			showTitle:true,
			noGoodsIcon:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500542394426empty.png',
			isMaxPage: false,
			maxPage:1,
			data:{
				productSerialNumber:this.productSerialNumber,
				pageNum:1,
				pageSize:5,
				isUp:'up',
				isFlashSale:'No'
		   }
		}
	},
	methods: {
		/*ResetTop( res){//下拉刷新
			this.dataList=[];
			this.isMaxPage = false;
	    	this.pageNum = 1;
	    	this.getData();
	    	res();
	    },*/
	    ResetBottom( res){//上拉加载
	    	if(this.data.pageNum == this.maxPage){
	    		res(false);
	    		this.isMaxPage = true;
	    		return;
	    	}else{
	    		++this.data.pageNum;
	    		this.getData();
	    		res();
	    	}
	    },
		getData(c){
			let  url="goodsmanager/list" ,
			     data = this.data;
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						//console.log(res);
						let arr=res.data.list;
						for(var i=0;i<arr.length;i++){
							if(arr[i].isjp=='YES'){
								arr[i].goodsType = "精品";
							}else if(arr[i].iszx=='YES'){
								arr[i].goodsType = "最新";
							}else if(arr[i].istj=='YES'){
								arr[i].goodsType = "推荐";
							}else{
								arr[i].goodsType ='';
							}
						}
						this.maxPage=Math.ceil(res.data.count/this.data.pageSize);
						this.dataList=this.dataList.concat(arr);
						//console.info(this.dataList);
						c && c();
					}
				});
			});
		}
	},
	computed: {
	      ...mapGetters([
	          'getCryptojsAESKey'
	      ]),
	},
	beforeMount(){
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	},
	mounted() {
		 setTimeout(()=>{
		 	this.$refs.slidesClassMain.style.height = window.innerHeight - this.$refs.slidesClassMain.getBoundingClientRect().top + "px";
		 });
		 this.getData();
	}
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.wrapper{
		color: #333;
		font-size: .24rem;
	}
	
	.topSection,.goodsStore{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
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
</style>

