<template>
	<div class="goodsContent">
		<div class="goodsPromotion" v-if="getActivityOrder" v-for="(vo,key) in getActivityOrder">
			<div class="goodsCt_main">
				<div class="goodsCt_top clearfix">
					<div class="goodsCt_top_img" :style=[vo.img.style]></div>
					<div class="goodsCt_top_title">
						<p class="text-ell word-break">{{vo.name}}</p>
						<p class="text-ell word-break">￥{{vo.price}}</p>
					</div>
				</div>
				<div class="goodsCt_bottom word-break" v-html="vo.container">
				</div>
			</div>
			   
		    <div class="acBtns" v-if="vo.type!='title'" :class="vo.type=='text'?'acTextFot':''"> 
	 	  	  <div  class="acBtnsItem" 
		 	  	  	@click="RestBox(v.rest,key)" 
		 	  	  	v-if="key > 0 || v.name != '上移'"
		 	  	  	v-for="(v,k) in btnArr">
	 	  	  	
	 	  	  	 <span class="iconfont" v-html="v.icon"></span>
	 	  	  	 <span>{{v.name}}</span>
	 	  	  	 
	 	  	  </div>
		    </div>
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
	 		btnArr: [
	    	 	{name: '删除',rest: 'deletes',icon: "&#xe692;"},
	    	 	{name: '上移',rest: 'resttop',icon: "&#xe6cc;"},
	    	 	{name: '插入',rest: 'add',icon: "&#xe6cc;"},
    	 	]
		}
	},
	computed: {
      ...mapGetters([
          'userInfo',
          'getUserData',
          'getActivityOrder',
          'getActivityArr',
          'getAddBoxArr'
      ]),
    },
	methods: {
		RestBox( o, k){
			let 
			_self = this,
			func = {
				deletes(o, k){
					_self.getActivityOrder.splice(k,1);
					_self.$store.dispatch('setActivityOrder',_self.getActivityOrder)
				},
				resttop(o, k){
					let data = _self.getActivityOrder[k - 1],
						data1 = _self.getActivityOrder[k];
					_self.getActivityOrder.splice(k, 1, data);
					_self.getActivityOrder.splice(k - 1, 1, data1);
					_self.$store.dispatch('setActivityOrder',_self.getActivityOrder)
				},
    	 		add(o, k){
					_self.$emit('goodsPromotion', {o,k});
				},
			}
			func[o]( o, k);
		},
	}
}
</script>
<style lang="scss" scoped>
.goodsPromotion{
	position: relative;
	.goodsCt_main{
		.goodsCt_top{
			border-bottom: .02rem solid #e6e6e6;
			box-sizing: border-box;
			padding-bottom:.25rem ;
			.goodsCt_top_img{
				width: 1.3rem;
				height: 1.3rem;
				float: left;
				margin-right: .2rem;
			}
			.goodsCt_top_title{
				padding-top: .2rem;
			}
			.goodsCt_top_title p:first-child{
				font-size: .32rem;
				height: .32rem;
				line-height: .34rem;
				color: #333333;
			}
			.goodsCt_top_title p:last-child{
				color: #e7580c;
				font-size: .28rem;
				height: .32rem;
				line-height: .32rem;
				margin-top: .25rem;
			}
		}
		.goodsCt_bottom{
			padding: .3rem 0;
			border-bottom: .02rem dashed #e6e6e6;
			margin-bottom: .3rem;
			font-size: .26rem;
			color: #999999;
		}
	}
	.acBtns{
	    position:absolute;
	    bottom:.2rem;
	    right:0;
	    z-index: 0;
	    line-height: .4rem;
	    background-color: rgb(237,237,237);
	    border: 1px solid rgb(223,223,223);
	    box-sizing: border-box;
	    .acBtnsItem{
	 	    display:inline-block;
		    color:#999;
		    font-size:.28rem;
		    position: relative;
		    padding:.1rem;
		    .iconfont{
			    font-size:.32rem;
		    }
	    }
	    .acBtnsItem:not(:last-child):after{
	    	content: "";
		    	height: 100%;
		    	width: 1px;
		    	background-color: rgb(223,223,223);
		    	right: 0;
		    	top: 0;
		    	margin: auto;
		    	position: absolute;
		}
	}
	.acTextFot{
	   	   position:absolute;
	       bottom:.2rem;
		   right:0;
	       line-height: .4rem;
	}
}
</style>
