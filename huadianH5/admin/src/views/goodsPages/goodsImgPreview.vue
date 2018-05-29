<template>
	<div class="wrapper">
		 <div class="headeRight">
		 	<div class="headeRight" @click="finishSet">
				<span>完成</span>
		   </div>
	   </div>
		<div class="ratation-banner">
	    	<div class="ratation-container">
		          	 <div class="swiper-wrapper">
		          		<div class="swiper-slide" v-for="(vo,key) in rotationBanner" :style="{height:curWinWidth+'px'}">
		          			<img :src="vo"/>
		          		</div>
		          	 </div>
		      </div>
	    </div>
		
		<div class="icon iconfont deleteBtn" @click="removeImg" v-if="isDeleteBtnShow"><span>×</span></div>
		<div class="smallImgPreview">
			<div class="noteMsg">提示：最多上传5张图片</div>
			<ul class="itemList">
				<li v-for="(item,key) in rotationBanner" @click="curGoodsImg(item,key)">
					<img :src="item" class="screenShot" />
				</li>
				<li class="addImgBtn" v-if="isAddImg">
					<span class="icon iconfont">&#xe6cc;</span>
					<div class="img-uploader"  ref="uploader">
					    <div class="img-uploader-preview-list"> </div>
					    <label :for="inputId" class="img-uploader-label"></label>
					    <input
					      style="display: none"
					      :id="inputId"
					      ref="input"
					      type="file"
					      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
					      multiple="multiple"
					      @change="handleFileChange"/>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template> 


<script>
/*import resizeImage from '@/assets/js/resize'*/
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			inputId: '',
	        imageDataList: [],
	        fileNameList: [],
			rotationBanner:[],
			curIdx:0,
			curWinWidth:null,
			bannerTime:1000,
			isAddImg:true,
			flag:0,
			isDeleteBtnShow:true,
			showTitle:true,
			title:"商品图片",
			dragPerImgs:[],
			ratationSwiper: null
		}
	},
	props: {
      // 文件更改回调
      onChange: {
        type: Function
      },
    },
	methods: {
		initSwiper(){
			console.info(this.ratationSwiper[0])
           this.ratationSwiper.slideTo(this.flag, 1000, false);
           
		},
		curGoodsImg(item,key){
			this.flag = key;
			this.initSwiper();
		},
		removeImg(){
			this.rotationBanner.splice(this.flag,1);
			if(this.rotationBanner.length<=0){
				this.isDeleteBtnShow = false;
				$(".pagination").hide();
			};
			this.dragPerImgs.splice(this.flag,1);
			this.$store.dispatch('imgCache', this.dragPerImgs);
			console.info(this.rotationBanner.length);
			if(this.rotationBanner.length<5){
			 	this.isAddImg = true;
			};
		},
		//图片处理
		handleFileChange(e){
	        let input = this.$refs.input;
	        let files = input.files;
	    	let imgNum = 5-this.rotationBanner.length;
	    	if(files.length==imgNum){
	    		this.isAddImg = false;
	    	}
	    	if(files.length>imgNum){
	    		this.toastMsg("上传图片数不能超过5张");//底部提示弹窗
	    	}else{
	    		let _this = this;
		        if (!files || !window.FileReader) return
		        for (let i = 0; i < files.length; i++) {
		          let file = files[i]
		          let reader = new FileReader();
		          this.dragPerImgs.push(e.currentTarget.files[i]);
		          reader.onload = function (e) {
		             _this.rotationBanner.push(e.target.result);
		              _this.initSwiper();
		          }
		          reader.readAsDataURL(file);
		        };
		        this.$store.dispatch('imgCache', this.dragPerImgs);
	    	}
	    },
		finishSet(){
			console.log(this.$store.state.goodsImgStore.imgCache)
			this.$router.go(-1);
		}
	},
    mounted(){
	   	$(".ratation-container").append("<div class='swiper-pagination pagination'></div>");
		let _this = this;
		this.ratationSwiper = new Swiper('.ratation-container', {
	       	 /* autoplay: this.bannerTime,
	          autoplayDisableOnInteraction : false,
              loop: true,*/
              //slidesPerView: 'auto',
              observer:true,
              observeParents:true,
              pagination:'.swiper-pagination',
              paginationClickable: true,
              onSlideChangeStart: function(swiper){
			      	let idx = swiper.activeIndex;
			      	_this.flag = idx;
			      	console.info(swiper)
              },
          });
          this.initSwiper();
	},
	beforeMount(){
		this.dragPerImgs = this.$store.state.goodsImgStore.imgCache;
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	 	this.curWinWidth = window.screen.width;
	 	this.rotationBanner = this.$store.state.goodsImgStore.goodsImg;
    	if(this.rotationBanner.length>=5){
    		this.isAddImg = false;
    	};
    	this.inputId = this.id || Math.round(Math.random() * 100000);
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
		right:0.2rem;
		z-index:250;
		background:#FFFFFF;
		.btn{
			display: inline-block;
			padding-right:.2rem;
			font-size:.28rem;
			color:#333;
		}	
	}
	.wrapper{
		background: #fff;
	}
	.pagination .swiper-pagination-bullet-active{
		background: red!important;
	}
	.smallImgPreview{
		padding: .3rem .2rem;
	}
	.smallImgPreview .noteMsg{
		font-size: $fz28;
		color: #999;
		margin-bottom: .3rem;
	}
	.itemList,.addImgBtn{
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
	    justify-content: flex-start;
	    position: relative;
	}
	.itemList>li{
		margin-right:.1rem ;
		width: 1.34rem;
		height: 1.34rem;
	}
	.itemList>li:last-child{
		margin: 0;
	}
	.addImgBtn{
		border: solid 1px #CACACA;
		justify-content: center;
	}
	.addImgBtn .icon{
		font-size: .6rem;
		color: #CACACA;
	}
	.deleteBtn{
		color:#fff;
		width: .6rem;
		height: .6rem;
		line-height:.6rem;
		vertical-align: middle;
		position: absolute;
		top: 1rem;
		right: .2rem;
		z-index: 99999;
		background: #9A9A9A;
		border-radius: 50%;
		font-size: .5rem;
		text-align: center;
	}
	.itemList .screenShot{
		width: 100%;
		height: 100%;
	}
	/* .swiper-container-horizontal>.swiper-pagination-bullets{
	 	border: solid 1px red;
	 }*/
	.ratation-banner {
		width:100%;
		background: #FFFFFF;
		overflow: hidden;
		img{
			width:100%;
			height:100%;
			}
		.ratation-container{
			position: relative;
		}
		.swiper-pagination-bullet-active{
			background: #FFFFFF;
		}
	}
	.img-uploader {
	    position: absolute;
	    top: 0;
	    left: 0;
	    display: inline-block;
	 	width: 100%;
	    height: 100%;
	    opacity: 0;
	  }
	.img-uploader-preview-list{
		width: 100%;
	    height: 100%;
	}
	.img-uploader-placeholder {
    margin: 0;
    position: absolute;
    font-size: 15px;
    width: 100%;
    color: #aaa;
    text-align: center;
    top: 50%;
    transform: translate(0%, -50%);
  }
  .img-uploader-label {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    cursor: pointer;
    margin-bottom: 0;
  }
</style>





