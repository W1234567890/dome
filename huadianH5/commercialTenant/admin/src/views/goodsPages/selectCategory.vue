<template>
	<div class="wrapper">
		<div class="headeRight" @click="finishSelect">
			<span class="btn">
				<span>完成</span>
			</span>
	   </div>
		<div class="title">
			<span>{{fItem}}</span> >
			<span v-text="sItem"></span> >
			<span v-text="tItem" class="currentCategory"></span>
		</div>
		<div class="contentBox">
			<ul class="categoryList">
				<li v-for="(item,key) in arrData" @click="curCategory(item,key,item.id)" v-model="curIndex" :class="key == index ? 'active' : ''">{{item.name}}</li>
			</ul>
			<ul class="subCategoryList">
				<li v-for="(vo,keyChild) in subList" @click="curSelect(vo,keyChild)" :class="keyChild == subIndex ? 'active' : ''">{{vo.name}}</li>
			</ul>
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			subList:[],
			curIndex:0,
			index:0,
			subIndex:0,
			type:null,
			fItem:'',
			sItem:'百货商品',
			tItem:'请选择',
			showTitle:true,
			title:"选择类目",
			arrData:[],
			dbId:''//分类id
		}
	},
	methods: {
		curCategory(item,key,id){//获取当前三级目录方法
			this.curIndex = key;
			this.index = key;
			this.sItem = item.name; 
			if(this.arrData[this.curIndex].list.length){
				this.subList = this.arrData[this.curIndex].list;
				//alert(this.subList.length)
			}else{
				this.getThirdCategory(id);
			};
		},
		curSelect(item,index){
			this.subIndex = index;
			this.tItem = item.name;
			this.dbId = item.dbId;
		},
		getSubCategory(c){//获取二级目录
			let data = {
					productSerialNumber:this.productSerialNumber,
					parentCode:this.id,
				},
			url="goodsmanager/getCategory";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						this.arrData=res.data;
						for(let i=0;i<this.arrData.length;i++){
							this.arrData[i].list=[];
						};
						this.sItem = this.arrData[0].name;
						this.getThirdCategory(this.arrData[0].id);
						c && c();
					}
				});
			});
		},
		getThirdCategory(id){////获取三级目录方法
			let data = {
					productSerialNumber:"326407336442855424",
					parentCode:id,
				},
			url="goodsmanager/getCategory";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						console.log(res.data)
						this.arrData[this.curIndex].list=res.data;
						this.subList = this.arrData[this.curIndex].list;
						//alert(this.subList.length)
					}
				});
			});
		},
		finishSelect(){
			if(this.dbId==''){
				this.toastMsg("请选择类目");
			}else{
				this.$store.dispatch("classify",{name:this.tItem,categoryId:this.dbId});
				this.$router.go(-2);
			}
		}
	},
	beforeMount(){
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.fItem = this.$router.currentRoute.query.curItem;//一级分类品牌
		this.id = this.$router.currentRoute.query.id;//一级id用于获取二级分类品牌
	},
	mounted(){
		this.getSubCategory();
		this.pageHeight =  $(".subCategoryList").height();
		$(".categoryList").height(this.pageHeight+'px');
		//this.getThirdCategory(this.arrData[0].data.id);//初始化二,三级分类品牌
	},
	watch: {
			
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
		background:#F5F5F5 ;
	}
	.contentBox{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    justify-content: space-between;
	}
	.wrapper .title{
		padding: .3rem .4rem;
		color: #333;
		font-size: .28rem;
	}
	.currentCategory{
		color: #E7580C;
	}
	.categoryList,.subCategoryList{
		float: left;
	}
	.categoryList>li{
		width: 2.4rem;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
		border-left: 0.08rem solid  transparent;
		font-size: $fz30;
	}
	.categoryList li.active{
		border-left: 0.08rem solid  #E7580C;
		background:#fff ;
		height: 1.01rem;
		border-top: solid 0.01rem $lineColor;
		border-bottom: solid 0.01rem $lineColor;
	}
	.subCategoryList li{
		width: 5.1rem;
		background: #FFF;
		height: 1rem;
		padding-left: .6rem;
		line-height: 1rem;
		border-top: solid 0.01rem $lineColor;
	}
	.subCategoryList li.active{
		color: #E7580C;
	}
	
</style>

