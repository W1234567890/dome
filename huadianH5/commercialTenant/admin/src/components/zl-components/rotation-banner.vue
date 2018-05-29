<template>
    <div class="ratation-banner">
    	<div class="ratation-container">
	          	 <div class="swiper-wrapper">
	          		<div class="swiper-slide" v-for="(vo,key) in rotationBanner">
	          			<img :src="vo.image" :style="{height:carouselHeight}"/>
	          		</div>
	          	 </div>
	      </div>
    </div>
</template>

<script type="text/babel">
import { mapActions } from 'vuex'
    export default {
    	props: {
            rotationBanner:{
                type: Array,
                default: []
            },
            carouselHeight:{
               type: String,
               default:'3.6rem'	
            }
       },
        data() {
        	 return{
        	 	bannerTime:1000
            };
        },
        mounted(){
        	if(this.rotationBanner.length>1){
        		$(".ratation-container").append("<div class='swiper-pagination'></div>");
	     	     var ratationSwiper = new Swiper('.ratation-container', {
		         autoplay: this.bannerTime,
		         autoplayDisableOnInteraction : false,
	              loop: true,
	              pagination:'.swiper-pagination'
	           });
        	}else{
        		$(".swiper-slide").addClass("noSwiping");
	     	     var ratationSwiper = new Swiper('.ratation-container', {
	               noSwiping : true,
	            })
        	}
        },
        methods: {
      }
    };
</script>

<style lang="scss" scoped>
@import "../../assets/css/h_config.scss";
.ratation-banner {
	width:100%;
	overflow: hidden;
	background: #FFFFFF;
	img{
		width:100%;
		height:3.6rem;
		}
	.ratation-container{
		position: relative;
	}
	.swiper-pagination{
		.swiper-pagination-bullet-active{
			background: #FFFFFF;
		}
	}
	.swiper-slide{
		height:3.6rem;
	}
}


</style>
