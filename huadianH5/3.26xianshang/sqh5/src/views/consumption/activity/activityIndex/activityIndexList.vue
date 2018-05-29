<template>
	<div class="posterList">
		<div class=" slidesClassMain" ref='slidesClassMain'>
			<div class="slides_main" ref="slides_main" v-slide>
			    <div class="postListHeader">
					<div class="hdLeft">
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
				 	<div class="funcPoint" @click="focus" :class="!!focus_list.isFocus?'focused':'unfocus'" :style="!!focus_list.isFocus?{color:mainColor,borderColor:mainColor}:''"  v-if="!isnull(focus_list)">{{!!focus_list.isFocus ? '已关注' : '关注'}}</div>
				</div>
			    <div class="postListStick" v-if="!isData(ActivityList) && !isData(ActivityList[0].list)">
					<ul class="stickList">
					   <li class="stickItem" @click="tolink(vo)" v-for="(vo,key) in ActivityList[0].list" v-if="key < num">
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
			      			:style="index.k == k ?{color:mainColor,borderColor:mainColor}:''"
			                @click="index = {type:v.type,k:k}">
				          	{{v.name}}
				     </div>
			    </div>
			     <recommended-daily :pint="index.type" :restData='restData'></recommended-daily>
			</div>
		</div>
	</div>
</template>
<!--<script>
	import { mapGetters, mapActions,mapState } from 'vuex'
	import recommendedDaily from './activityComment/recommendedDaily.vue'
	export default {
		data() {
			return {
				tab:[{
					name:'全部',
					type: null
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
				isMaxPage:false,
			}
		},
		computed: {
		    ...mapState({
				ActivityList:state=>state.user.ActivityList,
				ActivityHomeIndex: state => state.user.ActivityHomeIndex,
				focuslist: state=>state.user.focuslist,
			})
	    },
		components: {
	        'recommended-daily':recommendedDaily
	   	},
		mounted() {
			this.tabar();
			this.$refs.slidesClassMain.style.height = "100%";
		},
		methods: {
			tabar(bool,c){
				let id = this.$router.currentRoute.query.id;
				if(!this.isData(id) || bool){
					this.flist(id,str=>{
						this.activityTypeDetail({
							id: id,
						},res=>{
							this.focus_list = res.data;
							this.$store.dispatch("setfocuslist",{
								data: res.data,
								id,
							});
							if(bool){
								window.activityList(c);
							}else{
		    					this.isMax();
							}
						})
					})
					
				}else{
					this.flist(id);
				}
			},
			flist(id,c){
				if(!this.isData(this.focuslist) && (this.focuslist.id == id)){
					this.focus_list = this.focuslist.data;
				}else{
					c && c();
				}
			},
			ResetTop(c){
				this.isMaxPage = false;
				this.tabar(true,b=>{
					this.isMax(c,str=>{
						str && str();
					});
				});
			},
			ResetBottom(c){
				this.isMax(c,str=>{
					window.activityList(str,true);
				});
			},
			isMax(c,b){
				this.isMaxPage = this.ActivityList[0].pageNum * 5 >= this.ActivityList[0].totalNum;
				if(!this.isMaxPage){
					c && c();
				}else{
					b && b(c);
				}
			},
			focus(){
				let id = this.$router.currentRoute.query.id;
				if(!this.isData(id)){
					this.activityTypeSetFocus({
						id,
					},res=>{
						this.focus_list.isFocus = !this.focus_list.isFocus;
					})
				}
			},
			submit(){
				this.isShow = !this.isShow;
				this.num = this.isShow ? 6 : 3;
			},
			tolink( v){
				this.$router.push({
					path: "/activityDetail",
					query: {
						id: v.id,
						pdSNum:this.pdSNum
					}
				})
			}
		},
	}
</script>
-->
<script>
	import { mapGetters, mapActions,mapState } from 'vuex'
	import recommendedDaily from './activityComment/recommendedDaily.vue'
	export default {
		data() {
			return {
				tab:[{
					name:'全部',
					type: null
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
				isMaxPage:false,
			}
		},
		computed: {
		    ...mapState({
				ActivityList:state=>state.user.ActivityList,
				ActivityHomeIndex: state => state.user.ActivityHomeIndex,
				focuslist: state=>state.user.focuslist,
			})
	    },
		components: {
	        'recommended-daily':recommendedDaily
	   	},
		mounted() {
			this.tabar();
			this.$refs.slidesClassMain.style.height = '100%';
		},
		methods: {
			tabar(bool,c){
				let id = this.$router.currentRoute.query.id;
				if(!this.isData(id) || bool){
					this.flist(id,str=>{
						this.activityTypeDetail({
							id: id,
						},res=>{
							this.focus_list = res.data;
							this.$store.dispatch("setfocuslist",{
								data: res.data,
								id,
							});
							if(bool){
								window.activityList(c);
							}else{
		    					this.isMax();
							}
						})
					})
					
				}else{
					this.flist(id);
				}
			},
			flist(id,c){
				try{
					if(!this.isData(this.focuslist) && (this.focuslist.id == id)){
						this.focus_list = this.focuslist.data;
						c && c();
					}else{
						c && c();
					}
							
				}catch(e){
					c && c();
				}
			},
			ResetTop(c){
				this.isMaxPage = false;
				this.tabar(true,b=>{
					this.isMax(c,str=>{
						str && str();
					});
				});
			},
			ResetBottom(c){
				this.isMax(c,str=>{
					window.activityList(str,true);
				});
			},
			isMax(c,b){
				try{
					this.isMaxPage = this.ActivityList[0].pageNum * 5 >= this.ActivityList[0].totalNum;
					if(!this.isMaxPage){
						c && c();
					}else{
						b && b(c);
					}
						
				}catch(e){
					//TODO handle the exception
				}
			},
			focus(){
				let id = this.$router.currentRoute.query.id;
				if(!this.isData(id)){
					this.activityTypeSetFocus({
						id,
					},res=>{
						this.focus_list.isFocus = !this.focus_list.isFocus;
					})
				}
			},
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
			}
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
		font-size: .28rem;
	}
	.focused{
		color:#ff8300;
		border: solid 1px #ff8300;
	}
}




</style>