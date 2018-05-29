<template>
	<div class="wrapper">
		<div class="headeRight">
			<router-link :to="{path:'/addBankCard'}">
				 <span class="btn icon iconfont" >&#xe6cc;</span>
			</router-link>
	   </div>
		<ul class="payWayList">
			<li v-for="(item,key) in dataList" @click="selectBank(key)">
				<div class="bankCardInf">
					<img :src="item.bankLogo" class="bankIcon"/>
					<div>
						<p>{{item.bankName}}</p>
						<p class="bkNum">尾号：{{item.bankCard}}</p>
					</div>
				</div>
				<span id="" class="radioBox" :class="key==cIndex ? 'active' :''">
					<span class="icon iconfont">&#xe707;</span>
				</span>
			</li>
		</ul>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			dataList:[],
			cIndex:0,
			showTitle:true,
			title:'提现方式',
			bankIcon:'',
		}
	},
	methods: {
		setDefualtBankCard(bankId){
			let data = {id:bankId},
			url="syscash/setCard";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						if(res.meta.code=10000){
							this.$router.go(-1);
						}
					}
				});
			});
		},
		selectBank(key){
			this.cIndex = key;
			this.setDefualtBankCard(this.dataList[this.cIndex].bankCardId);
		},
		getBackStageData(){
			let data = {},
			url="syscash/listCard";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						for(var i=0;i<res.data.length;i++){
							this.dataList.push({
								bankName:res.data[i].bankName,
								bankCard:res.data[i].bankCard.substring(res.data[i].bankCard.length-4,res.data[i].bankCard.length),
								bankCardId:res.data[i].id,
								bankLogo:res.data[i].bankLogo,
							});
							if(res.data[i].isDefault){
								this.cIndex=i;
							}
						};
						if(this.dataList.length == 0){
							this.toastMsg("您还未添加过银行卡，请点击右上角加号添加银行卡！")
						}
					}
				});
			});
		}
	},
	beforeMount(){
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.getBackStageData();
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
	.headeRight .icon{
		font-size: .5rem;
		color: #8C8C8C;
	}
	.wrapper{
		padding-bottom: 1rem;
		font-size: .32rem;
	}
	.header{
		height: 3.8rem;
		background: url('http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500541794450staBg.png') no-repeat center center;
		background-size: cover;
		-webkit-background-size: cover;
		position: relative;
	}
	.payWayList>li,.bankCardInf,.radioBox{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    justify-content: space-between;
	}
	.bankCardInf .bankIcon{
		height: .7rem;
		width: auto;
	}
	.payWayList>li{
		height: 1.4rem;
	    padding: 0 .2rem;
	    background: #fff;
	    margin-top: .2rem;
	}
	.payWayList>li .bkNum{
		font-size: .28rem;
		color: #999;
		margin-top: 0.06rem;
	}
	.bankIcon{
		font-size: .8rem;
		margin-right: .2rem;
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
		font-size: .3rem;
	}
	.footer{
		width: 7.1rem;
		background:#E7580C ;
		color: #fff;
		font-size: .36rem;
		text-align: center;
		margin: 0 auto;
		height: .9rem;
		line-height: .9rem;
		border-radius: .1rem;
		margin-top: .5rem;
	}
</style>

