<template>
	<div class="wrapper">
		<!--运费类型选择-->
		<ul class="settingList">
			<li v-for="(item,key) in dataList">
				<div class="matter">
					<ul class="itemList">
						<li class="title">{{item.templateName}}</li>
						<li v-for="x in item.content">
							<span>{{x.address}}</span>:
							{{x.firstThing}}件内{{x.firstPrice}}元
							每增加{{x.continueThing}}件，增加运费{{x.continuePrice}}
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			title:'运费模板',
			showTitle:true,
			cIndex:0,
			dataList:[],
		}
	},
	methods: {
		getData(){
			let  data = {},
			url="logisticsTemplate/list";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						for(let i=0;i<res.data.list.length;i++){
							this.dataList.push({
								templateName:res.data.list[i].templateName,
								id:res.data.list[i].id,
								content:[]
								});
								for(let y=0;y<res.data.list[i].shippingMethodList.length;y++){
									this.dataList[i].content.push({
										address:res.data.list[i].shippingMethodList[y].address,	//地址
										firstThing: res.data.list[i].shippingMethodList[y].firstThing,	//首件数量
				                        firstPrice: res.data.list[i].shippingMethodList[y].firstPrice,	//首件价格
				                        continueThing: res.data.list[i].shippingMethodList[y].continueThing,//续件数量
				                        continuePrice: res.data.list[i].shippingMethodList[y].continuePrice,//续件价格
				                    });
							};
						};
					}
				});
			});
		}
	},
	 beforeMount(){
	 	this.getData();
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	},
	watch: {
			
	},
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.settingList{
		margin-top:.15rem;
	}
	.settingList>li,.radioBox{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	}
	.settingList>li{
	 	align-items: center;
	    background: #fff;
	    padding: .34rem 0.2rem;
	    margin-bottom: .2rem;
	    font-size: .24rem;
	    color: #666;
	}
	.itemList{
		width: 6.5rem;
		margin-left: .1rem;
	}
	.itemList>li{
		margin-bottom:.16rem;
	}
	.itemList li:last-child{
		margin: 0;
	}
	.matter .title{
		font-size: .3rem;
	    color: #333;
	}
	.radioBox{
		width: .4rem;
		height: .4rem;
		border-radius: 50%;
		border: solid 1px #AFAFAF;
		margin-right: .1rem;
		justify-content: center;
	}
	.radioBox.active{
		background: #E7580C;
		border: 0;
	}
	.radioBox .icon{
		color: #fff;
		font-size: .2rem;
	}
	.submitBtn{
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 0.9rem;
		line-height: .9rem;
		color: #fff;
		font-size: .32rem;
		text-align: center;
		background: #E7580C;
	}
</style>
