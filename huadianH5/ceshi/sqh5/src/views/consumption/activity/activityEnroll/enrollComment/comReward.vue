<template>
	<div>
		<div :class="type == 'enroll' ? 'bountyHd1' : 'bountyHd'">
			<div class="bounty-top-section">
				<div class="bounty-inf">
					<div :class="type == 'enroll' ? 'bounty_userImg1' : 'bounty_userImg'" :style=[style]></div>
					<div>
						<div class="text-ell" :class="type == 'enroll' ? 'nickName1' : 'nickName'">{{userName}}</div>
						<div class="financeWrap">
							 <div class="type == 'enroll' ? 'financeItem1' : 'financeItem'">
							 	<img v-if="type != 'enroll'" class="organizerGif" :src="giftIcon" alt="" />
							 	<span class="totalGiftNum" v-if="type == 'enroll'">已报名<label>5</label>/20人</span>
							 	<span class="totalGiftNum" v-if="type != 'enroll'">123</span>
							 </div>
						</div>
					</div>
				</div>
				<div class="goForReward"  @click="pirec('show')">{{type == 'enroll' ? '去报名' : '去打赏'}}</div>
			</div>
		</div>
		<div v-show="isShow">
			<div class="share_bg"></div>
			<div class="share-way">
				<div class="share-txt">打赏给：</div>
					<div class="swiper-container share-container" id="share-container">
				        <div class="swiper-wrapper">
				        	<div class="swiper-slide" v-for="(vo,keyPar) in data" v-if="vo">
				        		<ul class="share-list">
									<li class="shareItem" :class='k == index.k ? "share_active" : ""' v-if="v" v-for="(v,k) in vo" @click="index = {k,id:v.id}">
										<p><img class="giftImage" :src="v.imgUrl" alt="" /></p>
										<p class="giftTxt">{{v.name}}</p>
										<p class="giftPrice">{{v.worth}}元</p>
									</li>
								</ul>
				        	</div>
				        </div>
				        <!--<div class='swiper-pagination bountyGiftPage'></div>-->
			   		</div>
					<div class="iconfont cancle" @click="pirec('hide')"  v-html="icon.icon2"></div>
					<div class="gift-send">
						<div class="gift-icon-num">
							<img class="giftIcon" :src="giftIcon" />
							<span class="gift-num">{{reward.balance}}</span>
							<span class="icon iconfont" v-html="icon.icon1"></span>
						</div>
						<div class="add-gift">
							<span class="decrease">-</span>
							<input type="text" class="gifCount" v-model="temp_count" />
							<span class="add">+</span>
						</div>
						<div class="sendBtn" @click="submit">发送</div>
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
			icon:{
				icon1:"&#xe608;",
				icon2:"&#xe617"
			},
            giftIcon:""/*require("src/assets/img/giftIcon.png")*/,
            temp_count:1,
    	    gifts:[/*{
    	   	    gifId:'12345',
            	gift:require("src/assets/img/community/gif1.png"),
            	txt:"鲜花",
            	price:0.1
            },{
            	gifId:'12345',
            	gift:require("src/assets/img/community/gif2.png"),
            	txt:"5克拉钻戒",
            	price:1.5
            },{
            	gifId:'12345',
            	gift:require("src/assets/img/community/gif3.png"),
            	txt:"一生一世",
            	price:0.5
            },{
            	gifId:'12345',
            	gift:require("src/assets/img/community/gif4.png"),
            	txt:"牛皮沙发",
            	price:1.0
            },{
            	gifId:'12345',
            	gift:require("src/assets/img/community/gif5.png"),
            	txt:"海景别墅",
            	price:1.0
            },{
            	gifId:'12345',
            	gift:require("src/assets/img/community/gif3.png"),
            	txt:"一生一世",
            	price:0.5
            },{
            	gifId:'12345',
            	gift:require("src/assets/img/community/gif1.png"),
            	txt:"鲜花",
            	price:0.1
            },{
            	gifId:'12345',
            	gift:require("src/assets/img/community/gif4.png"),
            	txt:"牛皮沙发",
            	price:0.8,
            },{
    	  	    gifId:'12345',
            	gift:require("src/assets/img/community/gif5.png"),
            	txt:"海景别墅",
            	price:1.0
            },{
            	gifId:'12345',
            	gift:require("src/assets/img/community/gif3.png"),
            	txt:"一生一世",
            	price:0.5
            },{
            	gifId:'12345',
            	gift:require("src/assets/img/community/gif1.png"),
            	txt:"鲜花",
            	price:0.1
            },{
            	gifId:'12345',
            	gift:require("src/assets/img/community/gif4.png"),
            	txt:"牛皮沙发",
            	price:0.8,
            }*/],
            data: [],
            reward:{
            	selectIndex:'[0][0]',
            	balance:50,
            	gifCount:1,
            },
            index: 0,
            isShow: false,
            
            userImg:"",
            userName:"夏天的风",
            
            style: null,
            
            type: this.$router.currentRoute.query.type,
            id: this.$router.currentRoute.query.id || 0,
    	}
	},
	mounted(){
      	var shareSwiper = new Swiper('.share-container', {
        	slidesPerView: "auto",
      		observer:true,
      		observeParents:true,
      		/*pagination:'.swiper-pagination'*/
    	});
	    let k = 0;
	    this.activityRewardList({},res=>{
	    	res.data.forEach((o,i)=>{
		  		if(i%9 == 0 && i != 0){
		  			k++;
		  		}
		  		this.data[k] ? this.$set(this.data[k],i,o) : this.$set(this.data,k,[]);
		  	})
	    })
	  	
	  	this.style = {
	  		'background':'url(' + this.userImg +') no-repeat center center / cover #FFF'
	  	}
	},
	methods: {
		pirec( res){
			if(this.type=="enroll"){
				return;
			}
			switch ( res){
				case 'hide':
					this.isShow = false;
					break;
				case 'show':
					this.isShow = true;
					break;
				default:
					break;
			}
		},
		submit(){
			if(this.index != 0){
				console.info(this.index.id)
			}
			
		}
	},
}
</script>
<style lang="scss" scoped>

.share-container{
	width:100%;
	position: relative;
	padding-bottom:.3rem;
}
.share-list{
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	padding: 0;
	margin-top:.4rem;
	background:#fff;
}
.shareItem{
	width:24%;
	padding:.1rem 0;
	margin-bottom:.2rem;
	border: solid 2px #FFFFFF;
	box-sizing: border-box;
}
.share_active{
	border: .04rem solid rgb(223,99,28);
	box-sizing: border-box;
}
.giftImage{
	width:.6rem;
	height:.6rem;
}
.giftTxt{
	font-size:.3rem;
}
.giftPrice{
	font-size:.2rem ;
	color: #999999;
}
.share-list .active{
	border: solid 2px #E7580C;
}
.share-way .cancle{
	font-size: .5rem;
	margin-top: .5rem;
	position: absolute;
	right: .2rem;
	top: -0.4rem;
}
.share-way{
	position: fixed;
	bottom: 0;
	width: 100%;
	background: #fff;
	padding: .3rem 2%;
	text-align: center;
	font-size: .28rem;
	color: #333333;
	z-index: 6666;
}

.share_bg{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.4);
}
.gift-num{
	color: #E7580C;
	margin: 0 .1rem 0 0.1rem;
}
.giftIcon{
	width: .4rem;
	height: .4rem;
}
.add-gift{
	display: flex;
	justify-content: center;
	align-content: center;
	border: solid 1px #C7C7C7;
	border-radius: .5rem;
}
.add-gift span{
	width: .9rem;
	height: .6rem;
	line-height:.6rem;
}
.add-gift .decrease{
	color: #999999;
	border-right:1px solid #c7c7c7;
}
.add-gift .add{
	color: #999999;
	border-left:1px solid #c7c7c7;
}
.add-gift .gifCount{
	width: .9rem;
	height: .6rem;
	line-height:.6rem;
	font-size: .28rem;
	border:none;
	outline:none;
	text-align: center;
}
.rightArrow{
	font-size: .3rem;
	color: #999999;
}
.sendBtn{
	padding: .1rem .2rem;
	background: #E7580C;
	color: #fff;
	border-radius: .1rem;
} 
.gift-send,.gift-icon-num{
	    display:flex;
	    align-items: center;
	    justify-content: space-between;
}


.bountyHd{
	background:#EDF0F5;
	height: 1.4rem;
	padding: .2rem .2rem .3rem .2rem;
}
.bountyHd,.bountyHd1{
	overflow: hidden;
	position: absolute;
	top: 0;
	width: 100%;
}
.bountyHd1{
	padding: .3rem .2rem;
	background-color: #FFFFFF;
}
.bounty-top-section,.bounty-inf,.financeWrap{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.organizer-photo,.user-photo{
	width: .7rem;
	height: .7rem;
	margin:-.1rem .3rem 0 0;
}
.organizerGif{
	height:.30rem;
	margin-top:.1rem;
}
.financeWrap{
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
}
.financeItem{
	margin-right:.1rem;
	img{
		float: left;
		margin-right: .1rem;
	}
}
.totalGiftNum{
  font-size:.28rem;	
  color: rgb(127,127,127);
}
.totalGiftNum label{
	color: rgb(236,124,70);
}
.financeItem1{
	margin-top: .2rem;
}
.goForReward{
	width:1.5rem;
	height:.6rem;
	line-height:.6rem;
	background: #F4702A;
	color: #fff;
	border-radius: 1rem;
	font-size:.24rem ;
	text-align: center;
}

.bounty_userImg{
	height: .9rem;
	width: .9rem;
	margin-right: .2rem;
}
.bounty_userImg1{
	height: 1.3rem;
	width: 1.3rem;
	margin-right: .2rem;
}
.nickName,.nickName1{
	font-size: .32rem;
	color: #333333;
	width: 4rem;
}
.nickName1{
	font-weight: 600;
}
</style>
