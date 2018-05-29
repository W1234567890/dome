<template>
	<div> 
		 <div class="flowBanner">
		    <swiper :options="swiperOption"  ref="mySwiper">
				<swiper-slide v-for="(item,key) in flowBanner" :key="key">
					<img v-if="key<imgState" class="banner_list swiper-lazy" :src="item.img"/>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
	    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showTitle:false,
			    title:"壹元尊享流程",
			    imgState:1,
			    swiperOption: {
		            //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
		          notNextTick: false,
		          initialSlide: 0,
		          loop: false,
		          pagination: '.swiper-pagination',
		          autoplayDisableOnInteraction : false,
		            paginationBulletRender: function (swiper, index, className) {
					    return '<span class="swiper-pagination-bullet swiper-pagination-bullet-flows"></span>';
					},
					onSlideChangeStart:swiper=>{
						this.page = swiper.realIndex+1;  
	                    this.index = swiper.realIndex;
						if(this.page>this.imgState){
	                    	this.imgState=this.page;
	                    }
	                },
	          	},
	          	flowBanner:[{
	          		img:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/normal/static/yyzx/1.jpg'
	          	},{
	          		img:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/normal/static/yyzx/2.jpg'
	          	},{
	          		img:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/normal/static/yyzx/3.jpg'
	          	},{
	          		img:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/normal/static/yyzx/4.jpg'
	          	},{
	          		img:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/normal/static/yyzx/5.jpg'
	          	},{
	          		img:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/normal/static/yyzx/6.jpg'
	          	},{
	          		img:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/normal/static/yyzx/7.jpg'
	          	},{
	          		img:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/normal/static/yyzx/8.jpg'
	          	}]
			}
		},
	   beforeMount(){
     	  this.$store.dispatch('showTitle',this.showTitle),
		  this.$store.dispatch('title',this.title)
	   },
	    beforeCreate(){
            document.title="壹元尊享流程";
			this.setWebTittle('壹元尊享流程');
        },
	    mounted(){
	   }
	}
</script>

<style lang="scss" scoped>
.flowBanner{
	width:calc(100vw);
	height:calc(100vh);
	.banner_list{
		width:calc(100vw);
	    height:calc(100vh);
	}
	
}

</style>
<style type="text/css">
.flowBanner .swiper-container .swiper-pagination-bullet-flows{
	width:.2rem;
	height:.2rem;
	background: #999;
	opacity: .5;
	border:none;
}
.flowBanner .swiper-container .swiper-pagination-bullet-active{
	background:#E7580C;
	opacity: 1;
}
</style>