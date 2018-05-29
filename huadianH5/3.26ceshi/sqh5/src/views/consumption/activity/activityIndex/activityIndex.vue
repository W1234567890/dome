<template>
	<div id="communityIndex">
		<div class=" slidesClassMain" ref='slidesClassMain' style="height:100%;">
			<div class="slides_main" ref="slides_main" v-slide>
				<div ref="communityIndex" class="communityContent">
				    <div class="banner">
					    <swiper :options="swiperOption"  ref="mySwiper">
							<swiper-slide v-for="(item,key) in banner" :key="key">
								<div class="banner_list" @click="linkto(item)" :style=[item.style]></div>
							</swiper-slide>
							<div class="swiper-pagination" slot="pagination" ref="swiperPagination"></div>
						</swiper>
				    </div>
				    
			        <div class="title">
					    <div class="titleWrap">
					      	<span class="txt">热/门/话/题</span>
					    </div>
					    <ul class="tab_list">
						   <li v-for="(item,key) in focus_list" v-if="key < 6">
						   	 <router-link :to="{path:'/activityIndexList',query:{id:item.id,pdSNum:pdSNum}}" :style=[item.style]>
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
			        <div>
			        	<recommended-daily :restData='restData'></recommended-daily>
			        </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import recommendedDaily from './activityComment/recommendedDaily.vue'
import { mapGetters,mapActions,mapState } from 'vuex'

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
	            bulletActiveClass:"swiper-pagination-bullet-active swiper-pagination-"+this.pdSNum,
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
      	...mapState({
			ActivityList:state=>state.user.ActivityList,
			ActivityHomeIndex: state => state.user.ActivityHomeIndex,
		})
    },
	components: {
        'recommended-daily':recommendedDaily
   	},
	watch: {
		
	},
    mounted() {
    	this.home();
    },
	methods: {
		home(b,c){
			if(this.isData(this.ActivityHomeIndex) || b){
		    	this.activityHomeIndex({},(bool,str)=>{
					if(bool){
						this.$store.dispatch("setActivityHomeIndex",str);
						this.homeinit(str);
						if(b){
							window.activityList(c);
						}else{
	    					this.isMax();
						}
					}
		       })
	    	}else{
	    		this.homeinit(this.ActivityHomeIndex);
	    		this.isMax();
	    	}
		},
		homeinit(str){
			this.banner = str.scrollbanners || [];
			this.focus_list = str.focusList || [];
			for(var i = 0;i<this.banner.length;i++){
				this.banner[i].style = {
					background: this.getlogoUrl(7.5,3.5,this.banner[i].imgUrl)
				}
			}
			for(var i = 0;i<this.focus_list.length;i++){
				this.focus_list[i]['style'] = {
					background:this.getlogoUrl(7.5,3.5,this.focus_list[i].img,false,true)
				}
			}
		},
		ResetTop(c){
			this.isMaxPage = false;
			this.home(true,b=>{
				if(b){
					this.isMax(c,str=>{
						str && str();
					});
				}
			});
		},
		ResetBottom(c){
			this.isMax(c,str=>{
				window.activityList(str,true);
			});
		},
		isMax(c,b){
			this.isMaxPage = this.ActivityList[0].pageNum * 5 >= this.ActivityList[0].totalNum;
			if(!this.isMaxPage){
				c && c();
			}else{
				b && b(c);
			}
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
	/*padding: 0 .2rem;
	min-height: 1.6rem;*/
	display: flex;
	flex-wrap: wrap;
	display: -webkit-flex;
	padding: 0 .2rem;
	li{
		height: 1.5rem;
		/*width: 2.25rem;*/
		width:calc(31.5%);
		display: inline-flex;
		justify-content: center;
		align-content: center;
		position: relative;
		margin-bottom: .15rem;
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
<style>
.swiper-pagination-355745120454311936{
	background:#9DC815 !important;
}
</style>
