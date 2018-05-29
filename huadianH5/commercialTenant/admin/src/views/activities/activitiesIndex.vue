<template>
	<div class="wrapper">
		<div class="headerComponent">
			<div class="headerWrap">
			   	  <span class="icon iconfont routerBack" v-html="iconLeft" @click="routerBack"></span>
			   	  <p class="headerTitle" v-html="title"></p>
			</div>
		</div>
		<img class="acbgImg" :src="bgImg" />
		<div class="navItem">
				<router-link v-for="item in data":key="item.txt" :to="{path:item.routerUrl,query:{releaseType:item.query}}">
				<img class="images" :src="item.images"/>
				<div>{{item.txt}}</div>
			</router-link>
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			iconLeft:"&#xe608;",
			data:[{
				images:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/adminSeller/static/page.png',
				txt:"文章",
				routerUrl:'/activityRelease',
				query: "post"
			}],
			title:'活动',
			showTitle:false,
			imgWidth:0,
			bgImg:null,
			userRole:["admin","supplier","buyer","area","town","wmshop","market","store","oneyuan"]
		}
	},
	created(){
		
	},
	computed: {
      ...mapGetters([
          'getXToken'
      ]),
    },
	methods: {
		routerBack(){
        	this.backtoPage();
        }
	},
	beforeMount(){
		this.imgWidth=$(window).width();
		this.bgImg="http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500550066481acBg.png?x-oss-process=image/resize,m_fixed,w_"+this.imgWidth;
		this.backNum=false;
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	},
	mounted(){
		this.userExRole=this.getXToken.userExRole;
		if(this.userExRole=='supplier'){
			 this.data.push({
				images:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/adminSeller/static/falsh.png',
				txt:"限时抢购",
				routerUrl:'/flashSale',
				query: ""
			});
		}
		if(this.userExRole=="store"||this.userExRole=="market"){
			this.data.push({
				images:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/adminSeller/static/tuiguang.png',
				txt:"邀请好友",
				routerUrl:'/tuiguang',
				query: ""
			});
		}
	},
	watch: {
			
	},
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.wrapper{
		width: 100%;
		height: 100%;
		-webkit-background-size:cover ;
		background-size:cover ;
		text-align: center;
		/*margin-top: .8rem;*/
	}
	.wrapper .acbgImg{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0;
		left:0;
	}
	.navItem{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    justify-content: space-around;
	    position: absolute;
	    width: 100%;
	    top: 6.3rem;
	    font-size: .36rem;
	}
	.navItem a{
		 color: #999;
	}
	.navItem .images{
		height:1.5rem ;
		width: auto;
		margin-bottom: .26rem;
	}
</style>



