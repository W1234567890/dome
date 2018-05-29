<template>
	<div class="wrapper">
		<ul class="contentBox">
			<li v-for="(item,key) in itemType" :class="key == selectType? 'active' : ''" @click="addClass( $event,item,key)">
				<img class="typeImg" :src="item.img"></p>
				<p class="textItem">{{item.name}}</p>
			</li>
		</ul>
		<div class="footer_bg"></div>
		<div class="footer" @click="toNext">确定</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			showTitle:true,
			title:"类型",
			releaseType:null,
			selectType:0,
			itemType :[]
		}
	},
	mounted(){
		this.releaseType=this.$router.currentRoute.query.releaseType;
		this.init();
	},
	computed: {
      ...mapGetters([
          'userInfo',
          'getActivityTypeList'
      ]),
    },
	methods: {
		init(){
			let data = {"post":0,"activity":1,"enroll":2};
			if(this.isnull(this.getActivityTypeList)){
				this.activityTypeList({},(bool,res)=>{
					this.itemType = res[0];
				})
			}else{
				this.itemType = this.getActivityTypeList[0];
			}
			
		},
		addClass( e,v,key){
			this.selectType = key;
		},
		toNext(){
			let path;
			if(this.releaseType == "enroll"){
				path = '/activityEnlist';
			}else{
				path = '/activityPublish';
			}
			this.$router.push({
				path,
				query:{
					type:this.releaseType,
					id:this.itemType[this.selectType].id
				}
			});
			
		},
	}
}
</script>
<style lang="scss" scoped>
		.wrapper .btn{
		color: #EB743E;
	}
	.headeRight .btn{
		color: #EB743E;
	}
	.contentBox{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    flex-wrap: wrap;
	    text-align: center;
	    background: #fff;
	    border-top: solid 1px #F0F0F0;
	}
	.contentBox>li{
		width: 33.3%;
		padding: .4rem 0;
		border:1px solid transparent;
		border-right: solid 1px #F0F0F0;
		border-bottom: solid 1px #F0F0F0;
		font-size: .28rem;
		color: #333333;
	}
	.typeImg{
		height:1rem;
	}
	.contentBox>li .icon{
		font-size: .8rem;
		color: #A1A1A1;
	}
	.textItem{
		margin-top: .2rem;
	}
	.contentBox>li.active{
		border: solid 1px #E86018;
	}
	.footer{
		position: fixed;
		bottom: 0;
		height: .9rem;
		line-height: .9rem;
		text-align: center;
		font-size: .36rem;
		color: #fff;
		background: #E7580C;
		border-top: .02rem solid #e87e46;
		width: 100%;
	}
	.footer:active{
		background-color: #e87e46;
	}
	.footer_bg{
		height: .9rem;
	}
</style>


