<template>
	<div class="releaseWrapper">
		<div class="releaseHd">
			 <div class="title">我要发布</div>
			 <div class="text">用一场活动,寻找志趣相投的人!</div>
		</div>
		<div class="releaseBd">
			 <div  v-for="(vo,key) in releaseList">
			 	<div @click="toNext(vo.publishType)">
			 		 <img class="imageItem" :src="vo.image"/>
					 	<br />
					 <span class="releaseItem">发{{vo.item}}</span>
			 	</div>
			 </div>
		</div>
		<!--<div class="releaseFt">
			 <span class="iconfont close">×</span>
		</div>-->
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			icon:"&#xe6b3;",
			releaseList:[{
				item:"帖子",
				publishType:"post",
				image:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500551680321releaseItem_01.png'
			},{
				item:"活动",
				publishType:"activity",
				image:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500551705829releaseItem_03.png'
			},{
				item:"报名",
				publishType:"enroll",
				image:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500551723957releaseItem_05.png'
			}]
		}
	},
	methods: {
		toNext(type){
			this.$router.push({path:'/activityType',query:{releaseType:type}});
		}
	},
	watch: {
			
	},
}
</script>
<style lang="scss" scoped>
.releaseWrapper{
	width:100%;
	height:100%;
	background:url('http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500550066481acBg.png') no-repeat center;
	background-size:cover;
	padding:1.6rem 0 .5rem;
}
.releaseHd{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.title{
	font-size:.36rem;
	color:#333;
}
.text{
	font-size:.28rem;
	margin-top:.5rem;
}
.releaseBd{
	margin-top:5rem;
	display: flex;
	align-content: center;
	justify-content: space-around;
	text-align: center;
}
.imageItem{
	width:1.35rem;
}
.releaseFt{
	margin-top:1rem;
	text-align: center;
}
.releaseItem{
	color:#666;
	margin-top:.2rem;
}
.close{
	font-size:.4rem;
}
</style>
