<template>
	<div id="eventDetailFt">
		<!--<div class="boxFtRight clearfix">
		 	 <div class="input" @click="ShowComment('评论')">
		 	 	<label class="iconfont">&#xe659;</label>我也有话要说
		 	 </div>
		 	 <div class="like" @click="ShowComment('点赞')">
		 	 	<label class="iconfont" v-html="getActivityDetail && !!getActivityDetail.islikes ? '&#xe783;' : '&#xe65a;'"></label>
		 	 	<p>{{getActivityDetail && likeNumber(getActivityDetail.likes) || '点赞'}}</p>
		 	 </div>
		 </div>-->
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
			
		}
	},
	computed: {
      ...mapGetters([
          'getActivityDetail',
      ]),
    },
	methods: {
		ShowComment( name){
			switch (name){
				case "评论":
					/*this.$store.dispatch("setToComment",{
				    	isShow: true,
				    	data: null,
				    	x: null,
				    })*/
					break;
				case "点赞":
					this.like();
					break;
				default:
					break;
			}
		},
		like( e){
			this.activityAddlikes({
				id: this.getActivityDetail.id
			},res=>{
				this.activityDetail({
			    	id: this.$router.currentRoute.query.id
			    },(res)=>{
			    	this.$store.dispatch("setActivityDetail",res.data)
			    })
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.boxFtRight{
	border-top:1px solid #EAEAEA;
	background-color: #FFFFFF;
	width: 100%;
	position: fixed;
	bottom: 0;
	font-size:.28rem;
	color:#5C5C5C;
	.input{
		padding: .1rem;
		border: 1px solid rgb(246,246,246);
		box-sizing: border-box;
		border-radius: .08rem;
		float: left;
		width: 6rem;
		margin-left: .2rem;
		margin-top: .15rem;
		background-color: rgb(246,246,246);
		margin-bottom: .15rem;
		
		label{
			margin-right: .05rem;
		}
	}
	.iconfont{
		font-size:.28rem;
	}
	.like{
		float: left;
		margin-left: .2rem;
		width: .8rem;
		position: relative;
		text-align: center;
		label{
			font-size: .4rem;
			margin-right: .05rem;
			display: inline-block;
			margin-bottom: -.2rem;
			text-indent: .1rem;
			margin-top: .05rem;
		}
		p{
			text-align: center;
			margin-top: -0rem;
			padding: 0 .05rem;
			font-size: .24rem;
		}
	}
}
.eventDetailFt{
  	position: fixed;
  	bottom:0;
  	background-color: #FFFFFF;
  	width:100%;
  	height:1rem;
  	overflow: hidden;
  	display: flex;
  	justify-content:center;
  	align-items:center;
  	align-content: center;
  	color:#333;
  	z-index:10;
  	border-top: .02rem solid #E8E8E8;
}

</style>