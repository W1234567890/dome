<template>
	<div>
		 <div class="commentBox" v-if="getActivityCommentList && getActivityCommentList.list && getActivityCommentList.list.length > 0" :style=[margin]>
			<div class="commentBoxHd" v-show="!isDomShow">
				<span class="icon iconfont commentIcon" v-html="icon.icon12"></span>
				<span class="boxHdTitle">{{!isDomShow ? '最新评论' : '全部评论'}}</span>
			</div>
			<div class="commentBoxBd">
				<community-comment :isDomShows='isDomShow'></community-comment>
			</div>
			 <div class="commentBoxFt" v-if="getActivityCommentList && !isDomShow">
				<router-link class="see-more-btn" :to="{path:'/activityEnrollList',query:{id:$router.currentRoute.query.id}}">
					<span>查看全部评论</span>
					<span>({{getActivityCommentList.totalNum}})</span>
				</router-link>
			</div>
		</div>
		<!--<div class="commentBox_dg" v-if="!isDomShow"></div>-->
	</div>
	
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import communityComment from './communityComment.vue'
export default {
	data() {
		return {
			icon: {
				icon12:"&#xe67c;"
			},
			margin: {
				"margin-top":"0"
			}
	  }
	},
	props:{
		isDomShow:{
			type:Object/Array,
			default:{}/[]
		}
	},
	mounted(){
		if(!this.isDomShow){
			this.margin = {
				"margin-top":".2rem"
			}
		}
	},
	components: {
		'community-comment':communityComment,
	},
	computed: {
      ...mapGetters([
          'getActivityCommentList'
      ]),
    },
}
</script>

<style lang="scss" scoped>
@import "~src/assets/css/function.scss";
.commentBox{
	background:#FFFFFF;
	width:100%;
}
.commentBoxHd{
	font-size: .32rem;
	border-bottom:1px solid #EAEAEA;
	padding:.2rem 2%;
	.commentIcon{
		font-size:.32rem;
		color:#3E9DE7;
	}
	.boxHdTitle{
		color:#333;
		font-size: .32rem;		
	}
}
.commentBoxFt{
	text-align: center;
	padding:.2rem 0;
}
.commentBoxFt a{
	color: #000000;
}
.commentBox_dg{
	height: 1.3rem;
}
</style>