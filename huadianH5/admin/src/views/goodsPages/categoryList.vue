<template>
	<div class="wrapper">
		<ul class="categoryList">
			<li v-for="item in dataList">
				<router-link :to="{path:'/selectCategory',query:{id:item.id,curItem:item.name}}">
					{{item.name}}
				</router-link>
			</li>
		</ul>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			dataList:'',
			category:null,
			showTitle:true,
			title:"选择类目",
		}
	},
	methods: {
		getData(){
			let data = {
					productSerialNumber:this.productSerialNumber,
				},
			url="goodsmanager/getCategory";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						this.dataList = res.data;
						console.log(res);
					}
				});
			});
		}
	},
	beforeMount(){
		this.getData();
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	}
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.categoryList{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    flex-wrap: wrap;
	    justify-content: space-between;
	    padding: 0.6rem .2rem 0.2rem .2rem;
	}
	.categoryList>li{
		width: 3.45rem;
		text-align: center;
		font-size: .3rem;
		background: #fff;
		height: 1rem;
		line-height: 1rem;
		margin-bottom: .2rem;
	}
	.categoryList>li>a{
		color: #333;
		width: 100%;
		height: 100%;
		display: block;
	}
</style>

