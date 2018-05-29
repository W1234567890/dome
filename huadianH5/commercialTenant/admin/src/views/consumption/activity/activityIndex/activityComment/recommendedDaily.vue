<template>
	<div id="recommeDaily">
		<ul class="recommendList">
			<li class="recommendItem" v-for="(vo,key) in data" v-if="vo.status == 1" >
				<div class="recommendHd">
					<div class="activist-inf">
						<!--<router-link :to="{path:'/myActivities',query:{id:vo.createByUserID}}">-->
							<!--<img :src="getlogoUrl(.29,.29,vo.createrImg,true)" class="avatar"/>-->
							<div class="avatar" :style="{background:getlogoUrl(7.4,2.5,vo.createrImg)}"></div>
						<!--</router-link>-->
						<div>
							<p>
								<span class="nickName text-ell">{{vo.createByName && vo.createByName.substring(0,11) || "微米商号"}}</span>
								<!--<span class="releaseType">{{istype(vo.publishType)}}</span>-->
							</p>
							<p class="activistTime">{{getLocalTime(vo.createDate / 1000)}}</p>
						</div>
					</div>
					
				</div>
				<div class="collectWrap" :class="!!vo.isFavorite?'collected':''" @click="toggleCollect(key,vo)">
					<label class="iconfont" v-html="!!vo.isFavorite ? '&#xe65d;' : '&#xe65b;'"></label>
					<span class="favorite">{{!!vo.isFavorite ? '已收藏' : '收藏'}}</span>
				</div>
				<div class="re_list" @click="tolink(vo)">
					<p class="re_list_title" v-html="vo.title"> </p>
					<div class="re_list_img" v-if="vo.titleImg" :style="{background:getlogoUrl(7.4,2.5,vo.titleImg)}"></div>
					<!--<img :data-lazy="vo.titleImg" class="lazyImg" v-if="vo.titleImg"/>-->
					<p class="re_list_content" v-html="vo.summary" v-else></p>
				</div>
				
				<div class="recommendFt">
					 <div class="ftLeft">
					 	<span class="iconfont" v-html="icon.icon2"></span>
					 	 <span >{{vo.reads && vo.reads >= 10000 ? Math.round((vo.reads /10000) * 100) / 100 + "万" : vo.reads}}</span>
					 </div>
					 <div class="ftRight">
					 	<div class="ftItem" v-if="vo.address">
					 		<span class="iconfont" v-html="icon.icon3"></span>
					 		<span>{{vo.address.substring(0,6)}}</span>
					 	</div>
					 	<div class="ftItem">
					 		<span class="iconfont">&#xe65a;</span>
					 		<span>{{vo.likes && vo.likes >= 10000 ? Math.round((vo.likes /10000) * 100) / 100 + "万" : vo.likes}}</span>
					 	</div>
					 	<div class="ftItem">
					 		<span class="iconfont" v-html="icon.icon5"></span>
					 		<span>{{vo.comments&& vo.comments >= 10000 ? Math.round((vo.comments /10000) * 100) / 100 + "万" : vo.comments}}</span>
					 	</div>
					 </div>
				</div>
			</li>
		</ul>

	</div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data() {
		return {
			icon:{
			  icon1:"&#xe665;",	
			  icon2:"&#xe60e;",	
			  icon3:"&#xe663;",	
			  icon4:"&#xe641;",	
			  icon5:"&#xe67c;",	
			},
			data: [],
			
			FavoriteExists: [],
		};
	},
	props:{
		pint:{
			type: Number,
			default: null
		},
		restData:{
			type: Number,
			default: null
		}
	},
	computed: {
      ...mapGetters([
      	  'getXToken',
          'getActivityMyList',
          'getActivityList',
          'getActivityHomeIndex',
      ]),
    },
	mounted() {
		this.getlist();
	},
	watch: {
		pint(){
			this.getlist();
		},
		restData( e){
			this.init();
		}
	},
	methods: {
		getlist( c){
			let is = !this.$router.currentRoute.query.id,
				id = this.$router.currentRoute.query.id,
				data = {
					publishTypeId: id,
					pageNum: 1,
					pageSize: 5,
					queryType: is ? 1 : (this.pint || 1),
				};
				this.activityList(data,(bool,res)=>{
		        	this.init();
		        	c && c();
				})
		},
		toggleCollect(index,v){
			this.activityFavoriteAdd({
				publishId: v.id
			},res=>{
				console.info(res)
				for(var i = 0;i<this.data.length;i++){
					if(this.data[i].id == v.id){
						this.data[i].isFavorite = Number(!this.data[i].isFavorite);
					}
				}
			})
		},
		istype( type){
			let data = [{
				content:"帖子",
				name:"post"
			},{
				content:"活动",
				name:"activity"
			},{
				content:"报名",
				name:"enroll"
			},{
				content:"直播",
				name:"live"
			}],content;
			data.forEach((i,o)=>{
				if(type == i.name){
					content = i.content;
				}
			});
			return content;
		},
		init(){
			this.data = [];
			this.getActivityList.forEach((item,key)=>{
				if(!this.isnull(item.list)){
					item.list.forEach((i,k)=>{
			    		this.data.push(Object.assign(i, {
							'key' : key,
						   	'k' : k,
						}));
				    })
				}
		  	});
		},
		tolink( v){
			this.$router.push({
				path: "/activityDetail",
				query: {
					id: v.id
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
@import "~src/assets/css/function.scss";
.recommendItem:not(:nth-child(1)){
	.recommendHd{
		padding-top: .2rem
	}
}
.recommendItem {
	width: 100%;
	position:relative;
	margin-bottom: .2rem;
	background: #FFFFFF;
	.recommendHd {
		width: 100%;
		padding: .1rem .2rem .1rem;
		font-size: .24rem;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.activist-inf {
			display: flex;
			justify-content: flex-start;
			.nickName {
				font-size: .32rem;
				color: #333333;
			}
			.releaseType {
				border: 1px solid #ff8300;
				border-radius:.05rem;
				color: #ff8300;
				font-size: .24rem;
				position: relative;
				top: -.02rem;
				padding: 0 .08rem;
				margin-left: .05rem;
			}
			.activistTime {
				
			}
			.avatar {
				height: .7rem;
				width: .7rem;
				margin-right: .3rem;
				position: relative;
				top: .05rem;
			}
		}
	}
	.active{
		color: #ff8300;
	}
	.collected{
		border: solid 1px #ff8300!important;
		color: #ff8300!important;
	}
	.collectWrap {
		border: solid 1px #A1A1A1;
		color: #999999;
		border-radius: 1rem;
		position: absolute;
		right: .2rem;
		top: .2rem;
		padding-left: .425rem;
		padding-right: .2rem;
		height: .5rem;
		line-height: .45rem;
		
		.favorite{
			display: inline-block;
			font-size: .28rem;
		}
		.iconfont{
			position: absolute;
			left: .1rem;
			top: .03rem;
			height: .3rem;
    		display: inline-block;
    		font-size: .28rem;
		}
	}
	.recommendFt{
		display: flex;
		padding: .2rem .2rem;
		font-size: .24rem;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.ftItem{
			border: 1px solid #eaeaea;
			border-radius:.5rem;
			margin-left: .1rem;
			padding: .02rem .2rem;
			font-size: .24rem;
		}
		.ftRight{
			display: flex;
			justify-content: flex-end;
		}
	}
	.re_list{
		padding: 0 .2rem;
		.re_list_title{
			font-family: "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
			display: block;
			white-space: pre-wrap;
			overflow: hidden;
			box-shadow: border-box;
			font-weight: 700;
			color: #333;
			margin: 0 0 .2rem 0;
		}
		.re_list_img{
			height: 3.4rem;
			width: 100%;
		}
		img{
			height: 3.4rem;
			width: 100%;
		}
		.re_list_content{
			line-height: .36rem;
			font-size: .24rem;
		}
	}
}
</style>