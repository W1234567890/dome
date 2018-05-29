<template>
	<div class="wrapper" style="display:block;">
		<rotationBanner :rotationBanner="rotationBanner"></rotationBanner>
		<ul class="itemList">
			<li v-for="(item,key) in data" @click="">
				<router-link :to="{path:item.routerUrl}" :class="key!=2||key!=5 ? 'addBorder' :''">
					<img :src="item.images"  class="images"/>
					<p class="txt">{{item.txt}}</p>
				</router-link>
			</li>
		</ul>
		<div class="footer">
			<router-link :to="{path:'/setting'}">
				<span>设置</span>
			</router-link>
		</div>
		
		<div class="message">
			<router-link :to="{path:'/informMsg'}">
				<span>消息</span>
			</router-link>
		</div>
	</div>
</template> 


<script>

import { mapGetters,mapActions } from 'vuex'
import rotationBanner from 'src/components/zl-components/rotation-banner.vue'
export default {
	data(){
		return {
			showTitle:false,
			title:"首页",
			rotationBanner:[{
               image:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500520234298rotationImg.png'
            },{
            	image:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500520234298rotationImg.png'
            },{
            	image:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500520234298rotationImg.png'
            }],
			data : [{
				txt:"商品",
				images:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500538785909goods.png',
				routerUrl:'/saleShelves',
			},{
				txt:"订单",
				images:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500538815179order.png',
				routerUrl:'/orderList',
			},{
				txt:"收入",
				images:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500538839160income.png',
				routerUrl:'/incomeIndex',
			},{
				txt:"活动",
				images:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500538871131activities.png',
				routerUrl:'/activitiesIndex',
			},{
				txt:"直播",
				images:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500538895571live.png',
				routerUrl:'/personalCenter/statistics',
			},{
				txt:"统计",
				images:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500538923339count.png',
				routerUrl:'/statistics',
			}]
		}
	},
	beforeRouteEnter: function(to, from, next) {
		next(vm => {
			 if(vm.$router.currentRoute.query.name){
			 	let page=vm.$router.currentRoute.query.name;
			       next('/'+page);
			 }
		  })
	},
	beforeMount(){
		 this.$store.dispatch('showTitle',this.showTitle);
		 this.$store.dispatch('title',this.title);
	},
	computed: {
		
		
    },
	methods: {
		
	},
	components: {
		rotationBanner,
    },
}
</script>

<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.itemList{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    background: #fff;
	    flex-wrap: wrap;
	    justify-content: center;
	    background:#F5F5F5;
	}
	.itemList>li>a{
		width: 100%;
		height: 100%;
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
		text-align: center;
		justify-content: center;
		flex-direction: column;
		font-size: $fz30;
		color:$C333333;
	}
	.addBorder{
		border-right: solid 1px #E6E6E6;
	}
	.itemList>li{
		width: 33.3%;
		height: 2.6rem;
		margin-top: .2rem;
		background:#fff ;
	}
	.itemList .images{
		width: 1rem;
		height: 1rem;
		margin-bottom:.2rem ;
	}
	.footer,.message{
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
	.message{
		bottom: 1.4rem;
	}
	.footer>a,.message>a{
		width: 100%;
		height: 100%;
		display: inline-block;
		color: #fff;
	}
</style>