<template>
	<div class="commentListWrap">
		<div class="commentBoxHd" ref="commentBoxHd" v-if='getActivityCommentList.list.length'>
			<span class="icon iconfont commentIcon">&#xe67c;</span>
			<span class="boxHdTitle">全部评论</span>
		</div>
		<div class=" slidesClassMain" ref='slidesClassMain' v-if='getActivityCommentList.list.length'>
			<div class="slides_main" ref="slides_main" v-slide>
				<edetailcomment :isDomShow="isDomShow"></edetailcomment>
			</div>
		</div>
		<div class="emptyWrap" v-if="!getActivityCommentList.list.length">
			<div class="postEmpty">
		   	   	   <img class="emptyImg" src="http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51501147982283emptyWrite.png"/>
		   	   	   <br />
		   	   	    <span class="emptyTxt">暂无评论</span>
		   	 </div>
		</div>
		<tocomment></tocomment>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import edetailcomment from './enrollComment/eDetailComment.vue'
import tocomment from './enrollComment/tocomment.vue'
export default {
	data() {
		return {
			title:'评论',
			showTitle:true,
			isDomShow: true,
			isMaxPage: false,
		}
	},
	components: {
		edetailcomment,
		tocomment,
	},
	beforeMount(){
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	},
	mounted(){
		console.info(this.getActivityCommentList);
		let refs = this.$refs,
    		height = window.innerHeight - this.$refs.slidesClassMain.offsetTop;
    		refs.slidesClassMain.style.height = height + 'px';
    		
	}, 
	computed: {
      ...mapGetters([
          'isSlidesTop',
          'isSlidesBottom',
          'getActivityCommentList'
      ]),
    },
	methods: {
		ResetTop(callback){
			 this.activityCommentList({
		    	publishId: this.$router.currentRoute.query.id,
		    	pageNum: 1,
		    	pageSize: 10,
		   },(res)=>{
		    	this.$store.dispatch("setActivityCommentList",res.data);
		    	this.isMaxPages()
		    	callback();
		    })
	       
		},
		ResetBottom(callback){
			this.isMaxPage = !this.isMaxPages( callback)
			this.isMaxPages( callback) && this.activityCommentList({
		    	publishId: this.$router.currentRoute.query.id,
		    	pageNum: Number(this.getActivityCommentList.pageNum) + 1,
		    	pageSize: 10,
		    },(res)=>{
		    	for(var item in res.data.list){
		    		this.getActivityCommentList.list.push(res.data.list[item]);
		    	}
		    	
		    	this.getActivityCommentList.pageNum = res.data.pageNum;
		    	this.getActivityCommentList.totalNum = res.data.totalNum;
		    	this.$store.dispatch("setActivityCommentList",this.getActivityCommentList);
		    	callback( callback);
		    })
		},
		isMaxPages( res){
			if(this.getActivityCommentList.list.length >= this.getActivityCommentList.totalNum){
				this.isMaxPage = true;
				res && res();
				return false;
			}else{
				this.isMaxPage = false;
				return true;
			}
		}
	},
}
</script>

<style lang="scss" scoped>
@import "~src/assets/css/function.scss";
.commentBox{
	background:#FFFFFF;
	width:100%;
	margin-bottom:1.2rem;
}
.commentBoxHd{
	font-size: .32rem;
	background-color: #FFFFFF;
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
.commentFt{
	width:100%;
	background:#FFFFFF;
	position: fixed;
	bottom:0;
}
.replyWrap{
	width:80%;
	min-height:.5rem;
	margin:.1rem 2%;
	position: relative;
	border:1px solid #EAEAEA;
	border-radius:.05rem;
}
.replyPre{
	width:100%;
	font-size:.28rem;
	line-height:.36rem;
	visibility: hidden;
    display:block;
    white-space:pre-wrap;
    word-wrap:break-word !important;
    margin-top:.05rem;
}
.replyTextArea{
	width:100%;
	font-size:.28rem;
	line-height:.36rem;
	position: absolute;
	top:0;
	bottom:0;
	outline:0 none;
    border:none !important;
    margin-top:.05rem;
}
.send{
	position: absolute;
	bottom:.1rem;
	right:.2rem;
	width:1rem;
	height:.5rem;
	line-height:.5rem;
	text-align: center;
	border:1px solid #eaeaea;
	border-radius:.05rem;
	color:#666;
}
.sendActive{
	background:#F06767;
	color:#FFFFFF;
	border:none;
}
.emptyWrap{
	width:100%;
	height:calc(100vh);
	position: fixed;
	top:1rem;
	left:0;
}
.postEmpty{
	width:3rem;
	position: absolute;
	top:20%;
	left:50%;
	margin-left:-1.5rem;
	text-align: center;
}
.emptyImg{
	width:2rem;
}
.emptyTxt{
	display: block;
	color:#999;
	font-size:.36rem;
	margin-top:.2rem;
}
</style>