<template>
	<div class="bountyWrap">
		<div class="bountyBox">
			 <div :class="type == 'enroll' ? 'bounty_dg1' : 'bounty_dg'"></div>
			 <div class="bountyBd">
			 	 <ul class="bountyList">
					<li v-for="item in bountyList" class="bountyItem">
						<div class="bounty-top-section">
							<div class="bounty-inf">
								<div v-if="item.avatar" class="user-photo" :style="{background:'url(' + item.avatar +') no-repeat center center / cover #FFF'}"></div>
								<div>
									<div class="nickName">{{item.title}}</div>
									<div class="reward-date">{{item.time}}</div>
								</div>
							</div>
							<div class="bounty-thumbNum" v-if="type != 'enroll'">
								<span>{{item.thumbNum}}</span>个
								<img class="thumbGift" :src="item.gift"/>
							</div>
						</div>
					</li>
				</ul>
			 </div>
		</div>
		
		<com-reward></com-reward>
		<div class="mask" v-show="shareShow"></div>
	</div>
		
</template> 
<script>
import  comReward from './enrollComment/comReward.vue'
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			activityId:'',
			icon:{
				icon1:"&#xe608;",
				icon2:"&#xe617"
			},
			financeItemShow:false,
			showIndex:1,
            bountyList:[],
            data:{
            },
			shareShow:false,
			
			
            type: this.$router.currentRoute.query.type,
            id: this.$router.currentRoute.query.id || 0,
		}
	},
	computed: {
      ...mapGetters([
          'isSlidesTop',
          'isSlidesBottom',
          'getActivityDetail',
          'getEnrollList',
          'getToComment',
          'getActivityRewardDetailList',
          'getActivityGoodActGoods',
      ]),
    },
	components: {
		 'com-reward':comReward
	},
	methods: {
	    
	},
	mounted(){
		
	},
}
</script>
<style lang="scss" scoped>
.bountyHd{
	background:#EDF0F5;
	padding:.3rem 2%;
}
.bounty_dg{
	background-color: transparent;
    height: 1.3rem;
}
.bounty_dg1{
	height: 1.95rem;
	margin-bottom: .2rem;
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
	border-radius: 100%;
	overflow: hidden;
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
	width:.8rem;
	margin-right:.1rem;
}
.totalGiftNum{
  font-size:.28rem;	
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
.bountyItem{
	background:#FFFFFF;
	padding: .2rem;
	padding-top: .3rem;
	border-bottom:1px solid #eaeaea;
	box-sizing: border-box;
}
.bounty-thumbNum{
	color:#FF7275;
	display: flex;
	align-content: center;
	justify-content: center;
}
.thumbGift{
/*	width:.35rem;*/
	height:.4rem;
	margin-left:.05rem;
}

.nickName{
	font-size: .32rem;
	color: #333333;
}
.reward-date{
	color:rgb(175,175,175);
	font-size:.28rem;
	margin-top: .05rem;
}
.gift-send,.gift-icon-num{
	    display:flex;
	    align-items: center;
	    justify-content: space-between;
}
.gifter{
	background:#E6E6E6;
}
 .giftNum{
	margin-top: .1rem;
}
.giftNum span:nth-child(2){
	margin-left:.2rem ;
}

.mask{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5);
	position: absolute;
	left: 0;
	top: 0;
}
</style>
