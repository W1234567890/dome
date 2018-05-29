<template>
	<div class="posterList">
		<div class=" slidesClassMain" ref='slidesClassMain'>
			<div class="slides_main" ref="slides_main" v-slide>
			    <div class="postListHeader">
					<div class="hdLeft">
						<!--<img class="classifyImg" :src="focus_list.typeInfo.img" />-->
						<div class="classifyImg"  v-if="!isnull(focus_list)" :style="{background:getlogoUrl(7.4,2.5,focus_list.typeInfo.img)}"></div>
					</div>
					<div class="hdRight">
						<div class="rightUpper">
							<div class="rightUpperLeft"  v-if="!isnull(focus_list)">
								<span class="classify">{{focus_list.typeInfo.name}}</span>
								<p class="text">
									<span>主题： {{focus_list.typeInfo.totalNum && focus_list.typeInfo.totalNum >= 10000 ? Math.round((focus_list.typeInfo.totalNum /10000) * 100) / 100 + "万" : focus_list.typeInfo.totalNum}}</span>
									<span>今日： {{focus_list.typeInfo.totalNum && focus_list.typeInfo.todayNum >= 10000 ? Math.round((focus_list.typeInfo.todayNum /10000) * 100) / 100 + "万" : focus_list.typeInfo.todayNum}}</span>
								</p>
							</div>
							
						</div>
						<div class="text" v-if="!isnull(focus_list)">{{focus_list.typeInfo.description}}</div>
				 	</div>
				 	<div class="funcPoint" @click="focus" :class="!!focus_list.isFocus?'focused':'unfocus'"  v-if="!isnull(focus_list)">{{!!focus_list.isFocus ? '已关注' : '关注'}}</div>
				</div>
			    <div class="postListStick" v-if="!isnull(getActivityList) && !isnull(getActivityList.list)">
					<ul class="stickList">
					   <li class="stickItem" @click="tolink(vo)" v-for="(vo,key) in getActivityList[0].list" v-if="key < num">
					   	   <span class="stickFont">置顶</span>
					   	   <p class="stickText">{{vo.title}}</p>
					   </li>
					</ul>
					<div class="toggleShow" @click="submit">
						<span>{{isShow ? '收起' :'更多'}}</span>
					    <label class="iconfont " :class="isShow ? 'fItemFlod' : 'fItemUnfold'">&#xe608;</label>
					</div>
				</div>
				
				
			    <div class="tab-container">
			         <div class="tabItem" 
			         	  v-for="(v,k) in tab"
			      			:class="index.k == k ? 'active' : ''"
			                @click="index = {type:v.type,k:k}">
				          	{{v.name}}
				     </div>
			    </div>
			     <recommended-daily :pint="index.type" :restData='restData'></recommended-daily>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import recommendedDaily from './activityComment/recommendedDaily.vue'
	export default {
		data() {
			return {
				tab:[{
					name:'全部',
					type: 0
				},{
					name:'热门',
					type: 2
				},{
					name:'精选',
					type: 1
				}],
				index: {
					k: 0,
					type: 0
				},
				list:[],
				isShow: false,
				num: 3,
				focused:true,
				focus_list: [],
				queryid: 1,
				restData: null,
			}
		},
		computed: {
	      ...mapGetters([
	          'userInfo',
	          'getActivityMyList',
	          'getActivityList'
	      ]),
	    },
		components: {
	        'recommended-daily':recommendedDaily
	   	},
		mounted() {
			this.queryid = this.$router.currentRoute.query.id || 1;
			this.getfocus();
			this.$refs.slidesClassMain.style.height = "100%";
		},
		methods: {
			submit(){
				this.isShow = !this.isShow;
				this.num = this.isShow ? 6 : 3;
			},
			tolink( v){
				this.$router.push({
					path: "/activityDetail",
					query: {
						id: v.id
					}
				})
			},
			focus(){
				this.activityTypeSetFocus({
					id: this.queryid
				},res=>{
					this.focus_list.isFocus = !this.focus_list.isFocus;
				})
			},
			getfocus(){
				this.activityTypeDetail({
					id: this.queryid
				},res=>{
					this.focus_list = res.data;
				})
			},
			ResetTop(c){
		        let is = !this.$router.currentRoute.query.id,
				id = this.$router.currentRoute.query.id,
				data = {
					publishTypeId: id,
					pageNum: 1,
					pageSize: 5,
					queryType: is ? 1 : (this.index.type || 1),
				};
				this.activityList(data,(bool,res)=>{
					!this.isnull(res) && (this.restData = res[0].pageNum);
					this.isMaxPage = false;
		        	c && c();
				})
			},
			ResetBottom(c){
				let list = this.getActivityList,type = 0;
				let is = !this.$router.currentRoute.query.id,
					id = this.$router.currentRoute.query.id;
				this.activityList({
					publishTypeId: id,
		        	pageNum: 1 + list[type].pageNum,
					pageSize: 5,
					queryType: is ? 1 : (this.index.type || 1),
		       },(bool,res)=>{
		       		if(res[type].totalNum <= res[type].pageNum || list[type].list.length < res[type].pageNum * 5){
						this.isMaxPage = true;
					}
		       		this.restData = res[type].pageNum;
		    		c && c();
	    		},{
	    			data: list,
	    			page: 1 + list[type].pageNum,
	    		});
			},
		},
	}
</script>

<style lang="scss" scoped>
@import "~src/assets/css/function.scss";
.tab-container{
	width:100%;
	background: #FFFFFF;
	display: flex;
	justify-content:space-around;
	.tabItem{
		width:1.5rem;
		height: .9rem;
    	line-height: .9rem;
		text-align: center;
	}
	.active{
	   	border-bottom:2px solid #f87314;
	   	color:#f87314;
  	} 
}
.postListStick{
	width:100%;
	padding:.15rem 0;
	color: #999999;
	display: none;
	background:#FFFFFF;
	margin-bottom:.15rem;
	.stickItem{
		display: flex;
		align-items: center;
		height:1rem;
		border-bottom:1px solid #eaeaea;
		padding:0 2%;
		.stickFont{
			background:#f87314;
			color:#FFFFFF;
			width:12%;
			text-align: center;
			line-height:.56rem;
			border-radius:.1rem;
		}
		.stickText{
			width:85%;
			line-height:.56rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-left:3%;
			font-size:.28rem;
			color:#333;
		}
	}
	
	.toggleShow{
		width:100%;
		margin-top:.2rem;
		line-height:.56rem;
		text-align: center;
		.fItemUnfold,.fItemFlod{
			display: inline-block;
		}
		.fItemUnfold{
			transform: rotate(90deg);
		}
		.fItemFlod{
			transform: rotate(-90deg);
		}
	}
	
}


.postListHeader{
	width:100%;
	padding:.2rem .2rem;
	font-size: .18rem;
	color: #999999;
	background:#FFFFFF;
	margin-bottom:.15rem;
	 display:flex;
    align-items:flex-start;
    .hdLeft{
		margin-right:.15rem;
		overflow: hidden;
		border-radius: .06rem;
		width: 1.5rem;
		background: url("http://guoteng.oss-cn-shenzhen.aliyuncs.com/default/default.png?x-oss-process=image/resize,m_fill,h_600,w_300") no-repeat center center / cover #FFFFFF;
		height: 1.5rem;
		.classifyImg{
			width: 100%;
			height: 100%;
		}
	}
	.hdRight{
		width:70%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.rightUpper{
			display: flex;
			align-items:center;
			justify-content: space-between;
			.classify{
				font-size: .32rem;
				color: #333333;
				font-weight: 700;
			}
			.text{
				color:#999999;
				margin-top:.1rem;
			}
			.focused{
				color:#ff8300;
				border: solid 1px #ff8300;
			}
		}
	}
	.funcPoint{
		border: solid 1px #A1A1A1;
		color: #999999;
		border-radius: .4rem;
		position: absolute;
		right: .2rem;
		top: .2rem;
		padding: .05rem .3rem;
	}
}




</style>