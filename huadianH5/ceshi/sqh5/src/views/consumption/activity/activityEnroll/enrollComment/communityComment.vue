<template>
	<div class="commentBoxBd">
		 <ul class="cm_main" v-if="getActivityCommentList && getActivityCommentList.list">
			<li  class="cm_item clearfix" v-for="(item,keyPar) in getActivityCommentList.list" v-if="!isDomShows ? keyPar < 5 : getActivityCommentList.list">
				<div class="p_main clearfix">
					<div class="p_top" :style="{background:getlogoUrl(7.4,3.5,item.createrImg)}"></div>
					<div class="p_center">
						<p class="p_center_name text-ell">{{item.createByName ||'微米商号'}}</p>
						<p class="p_center_time text-ell">{{getTime(item.createDate / 1000)}}</p>
					</div>
				</div>
				<div class="description">
					<p class="descriptionText word-break" @click="Reply(item)">{{item.content}}</p>
					<ul class="replyList" v-if="item.replyList">
						<li v-for="(x,keyRep) in item.replyList" class="word-break clearfix">
							<div class="recipient" v-if="x.createByName">
								<span  @click="Reply1({commentId:x.commentId,createByUserID:x.createByUserID,createByName:x.createByName},item)">{{x.createByName}}</span>回复<span @click="Reply1({commentId:x.commentId,createByUserID:x.commentUserid,createByName:x.commentUserNickname},item)">{{x.commentUserNickname}}</span><label>:</label>
							</div>
							<p class="replyerTxt word-break">{{x.replyContent}}</p>
						</li>
					</ul>
				</div>
				<div class="p_bottom clearfix" :class="!!item.islike && 'p_active'" @click="like(item)">
					<label class="iconfont" v-html="!!item.islike ? '&#xe783;' : '&#xe65a;'"></label>
					<p>{{item && likeNumber(item.likes) || '点赞'}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			icon:{
				icon1:'&#xe606;',
				icon2:"&#xe641;",
			},
		}
	},
	props:{
		isDomShows:{
			type:Object/Array,
			default:{}/[]
		}
	},
    computed: {
      ...mapGetters([
          'getActivityCommentList',
          'getloginRefresh',
      ]),
    },
	mounted() {
		
	},
	methods: {
		Reply( e){
			this.refsInit( res=>{
				if(e.createByUserID == this.getloginRefresh.userId){
					this.toastMsg("不能回复自己");
					return;
				}
				this.$store.dispatch("setToComment",{
			    	isShow: true,
			    	data: e,
			    	x: null,
			   	})
			})
		},
		refsInit( c){
			!this.getloginRefresh && this.loginRefresh({},res=>{
				c && c();
			}) || (c && c());
			
		},
		Reply1( x,e){
			this.refsInit( res=>{
				if(this.getloginRefresh.userId == x.createByUserID){
					this.toastMsg("不能回复自己");
					return;
				}
				this.$store.dispatch("setToComment",{
			    	isShow: true,
			    	data: e,
			    	x: x
			   	})
			});
		},
		like( e){
			this.ctivityCommentAddlikes({
				id: e.id
			},res=>{
				this.activityCommentList({
			    	publishId: this.$router.currentRoute.query.id,
			    	pageNum: 1,
			    	pageSize: 10,
			   	},(res)=>{
			    	this.$store.dispatch("setActivityCommentList",res.data)
			   	})
			})
		},
		getTime(nS) {
			if(nS != 0 && nS) {
				let date = new Date(nS * 1000),
					Y = date.getFullYear() + '-',
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
					D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
					h = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ':',
					m = (date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + ':',
					s = (date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds()) + '',
					ss = date.getMilliseconds(),
					data = Y + M + D + h + m + s;
				return data;
			} else {
				return " ";
			}
		},
	},
}
</script>
<style lang="scss" scoped>

.cm_main{
	.cm_item{
		position: relative;
		border-bottom: .04rem solid rgb(234,234,233);
		padding: .2rem;
		padding-top: .3rem;
		.p_main{
			.p_top{
				width: .7rem;
				height: .7rem;
				float: left;
				margin-right: .2rem;
			}
			.p_center{
				.p_center_name{
					font-size: .3rem;
					width: 4rem;
					display: block;
					overflow: hidden;
					line-height: .36rem;
					font-weight: 300;
				}
				.p_center_time{
					font-size: .24rem;
					color: rgb(158,157,156);
					width: 4rem;
					display: block;
					overflow: hidden;
				}
			}
		}
		.p_bottom{
			position: absolute;
			top: .28rem;
			right: .2rem;
			float: right;
			border: 1px solid;
			border-radius: .3rem;
			border-color: rgb(220,220,221);
			padding-right: .2rem;
			padding-left: .55rem;
			line-height: .4rem;
			color: rgb(148,148,145);
			height: .4rem;
    		line-height: .3rem;
			.iconfont{
				font-size: .28rem;
				position: absolute;
				left: .2rem;
				top: .05rem;
				height: .4rem;
    			display: inline-block;
			}
			p{
				display: inline-block;
   				font-size: .22rem;
			}
		}
		.p_active{
			border-color: #ff8300 !important;
			.iconfont{
				color: #ff8300 !important;
				height: .2rem;
				line-height: .2rem;
			}
			p{
				color: #ff8300 !important;
			}
		}
		.description{
			padding-top: .1rem;
			display: block;
			padding-left: .9rem;
			color: rgb(53,53,53);
			font-size: .3rem;
			font-weight: 300;
			.descriptionText{
				margin-bottom: .1rem;
				font-size: .24rem;
			}
			.replyList{
				margin-bottom: .1rem;
				.word-break{
					margin-top: .025rem;
					.recipient{
						float: left;
						margin-top: .05rem;
						font-size: .28rem;
						span{
							color: rgb(3,137,211);
							font-size: .24rem;
						}
						span:nth-child(1){
							margin-right: .05rem;
						}
						span:nth-child(2){
							margin-left: .025rem;
						}
						label{
							margin-left: .02rem;
							margin-right: .1rem;
							font-weight: bold;
							font-size: .24rem;
						}
					}
					.replyerTxt {
						float: left;
						font-size: .24rem;
						margin-top: .1rem;
					}
				}
			}
		}
	}
}

</style>
