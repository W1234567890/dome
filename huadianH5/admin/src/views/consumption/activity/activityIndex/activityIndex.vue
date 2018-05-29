<template>
	<div id="communityIndex">
		<div class=" slidesClassMain" ref='slidesClassMain' style="height:100%;">
			<div class="slides_main" ref="slides_main" v-scrollt>
				<div ref="communityIndex" class="communityContent">
				    <div class="banner">
					    <swiper :options="swiperOption"  ref="mySwiper">
							<swiper-slide v-for="(item,key) in banner" :key="key">
								<div class="banner_list" @click="linkto(item)" :style=[item.style]></div>
								<!--<img :src="getlogoUrl(7.5,3.5,item.imgUrl,true)"/>-->
							</swiper-slide>
							<div class="swiper-pagination" slot="pagination"></div>
						</swiper>
				    </div>
				    
			        <div class="title">
					    <div class="titleWrap">
					      	<span class="txt">热/门/话/题</span>
					    </div>
					    <ul class="tab_list">
						   <li v-for="(item,key) in focus_list" v-if="key < 6">
						   	 <router-link :to="{path:'/activityIndexList',query:{id:item.id}}" :style=[item.style]>
							   	  <p class="tab_list_name text-ell">#{{item.name}}</p>
						   	  </router-link>
						   </li>
						</ul>
				   	</div>
				   
				    <div class="title">
					    <div class="titleWrap">
					      	<span class="txt">今/日/推/荐</span>
					    </div>
					</div>
			        <div v-if="getActivityList">
			        	<recommended-daily :restData='restData'></recommended-daily>
			        </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import recommendedDaily from './activityComment/recommendedDaily.vue'
import { mapGetters,mapActions } from 'vuex'

export default {
	data() {
		return {
			message:"communityIndex",
		    swiperOption: {
	            //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
	            notNextTick: true,  
	            pagination: '.swiper-pagination',  
	            slidesPerView: 'auto',  
	            centeredSlides: true,  
	            paginationClickable: true,  
       			autoplay: 2000,
	            spaceBetween: 30,  
	            /*autoplay: 1000,*/
	            paginationBulletRender: function (swiper, index, className) {
				    return '<span class="swiper-pagination-bullet swiper-pagination-bullet1"></span>';
				},
                onSlideChangeEnd: swiper => {  
                    //这个位置放swiper的回调方法  
                    this.page = swiper.realIndex+1;  
                    this.index = swiper.realIndex;  
                }
          	},
		    banner:[],
            list:[],
            focus_list: [],
            isMaxPage: false,
            
            scrollTop: true,
            
            restData: null,
		}
	},
	computed: {
      ...mapGetters([
          'userInfo',
          'getActivityMyList',
          'getActivityList',
          'getActivityTypeList',
          'getActivityHomeIndex',
      ]),
    },
	components: {
        'recommended-daily':recommendedDaily
   	},
	watch: {
	},
    mounted() {
    	/*let refs = this.$refs,
    		height = window.innerHeight;
    		refs.slidesClassMain.style.height = height + 'px';*/
    	
    	var ratationSwiper = new Swiper('.ratation-container', {
         	autoplay: 1000,
         	autoplayDisableOnInteraction : false,
          	loop: true,
          	pagination:'.swiper-pagination'
       });
        !this.getActivityHomeIndex && this.homeIndex();
      	this.getBanner();
    	this.getTypeList();
    },
	methods: {
		homeIndex( c){
			this.activityHomeIndex({},res=>{
				this.activityList({
		        	queryType: 1,
		        	pageNum: 1,
					pageSize: 5,
		        },bool=>{
		        	this.getBanner();
		    		this.getTypeList();
		    		this.restData = 0;
		    		this.isMaxPage = false;
		    		c && c();
	    		});
	        })
		},
		ResetTop(c){
	        this.homeIndex( c);
		},
		ResetBottom(c){
			let list = this.getActivityList,type = 0;
			this.activityList({
	        	queryType: 1,
	        	pageNum: 1 + list[type].pageNum,
				pageSize: 5,
	       	},(bool,res)=>{
	       		if(res[type].totalNum <= res[type].pageNum || list[type].list.length < res[type].pageNum * 5){
					this.isMaxPage = true;
				}
	       		this.restData = res[type].pageNum;
	    		c && c();
    		},{
    			data: list,
    			page: 1 + list[type].pageNum,
    		});
		},
		getTypeList(){
			if(!this.getActivityHomeIndex){
				return;
			}
			let focusList = this.getActivityHomeIndex.focusList || [];
			this.focus_list = [];
			for(var i = 0;i<focusList.length;i++){
				focusList[i]['style'] = {
					background:this.getlogoUrl(7.5,3.5,focusList[i].img,false,true)
				}
				this.focus_list.push(focusList[i]);
			}
			
		},
		getBanner(){
			if(!this.getActivityHomeIndex){
				return;
			}
			this.banner = [];
			let banner = this.getActivityHomeIndex.scrollbanners || [];
			for(var i = 0;i<banner.length;i++){
				this.banner.push(banner[i]);
				this.banner[i].style = {
					background: this.getlogoUrl(7.5,3.5,banner[i].imgUrl)
				}
			}
		},
		changeCollect(index){
			this.dailyRcomdList[index].collected=!this.dailyRcomdList[index].collected;
		},
		linkto( res){
			window.location.href  = res.linkUrl;
		}
	}
   
}
</script>

<style lang="scss" scoped>
@import "~src/assets/css/function.scss";
.banner{
	background-color:#FFF;
	height: 3.5rem;
	overflow: hidden;
	width: 100%;
	background: getlogoUrl(3.5rem,6.4rem);
	.banner_list{
		width: 100%;
		height: 3.5rem;
		img{
			width: 100%;
			height: 100%;
			display: block;
		}
	}
}

.title{
	background:#FFFFFF;
	.titleWrap{
		width:100%;
		height:1rem;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		span{
			letter-spacing: .1rem;
			display: inline-block;
			margin: auto;
			background-color: #FFFFFF;
			z-index: 5;
			padding: 0 .2rem;
			color:#333;
		}
	}
	.titleWrap:after{
		content: "";
		position: absolute;
		height: .02rem;
		background-color: $listLine;
		width: 60%;
	}
}



.tab_list{
	padding: 0 .2rem;
	min-height: 1.6rem;
	li{
		width: 2.25rem;
		text-align: center;
		position: relative;
		font-size:$contentSize1;
		float: left;
		height:1.5rem;    
		margin-bottom: .16rem;
		border-radius:.1rem;
		overflow: hidden;
		a{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: block;
			.tab_list_img{
				width:100%;
				border-radius:.1rem;
				height: 100%;
			}
			.tab_list_name{
				color:#FFFFFF;
				position: absolute;
				width: 100%;
				height: .4rem;
				bottom: .05rem;
				text-align: left;
				text-indent: .05rem;
			}
		}
		
	}
	li:not(:nth-child(3n)){
		margin-right: .16rem;
	}
}
</style>