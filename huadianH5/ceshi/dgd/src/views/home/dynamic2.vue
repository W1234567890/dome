<template>
	<f7-page v-styles="'pageContent'" class="dynamics2">
		<f7-navbar back-link="返回" class="layout-white theme-black" v-styles="'navbar'" title="鸡场动态" sliding ></f7-navbar>
		<div class="dynamic_main">
			<div class="dynamic_tab_scroll" v-iscroll:value="{isX:true}">
				<a href="#tab1" class="active tab-link" @click="active(key)" :data-id="vo.id" v-for="(vo,key) in list" :class="key == 0 && 'active'">{{vo.name}}</a>
				<div class="dynamic_active"></div>
			</div>
		</div>
		<div class="dynamic_items">
			<div class="dynamic_items1 iswiper" v-iswiper:value="{watchX,iswiperPage,watchMove,watchScrollTo}">
				<div class="dynamic_items1_list" v-for="(vo,key) in list" :style="[vo.style]">
					<div v-slide:value="{ResetTop:ResetTop,ResetBottom:ResetBottom,num:key}">
						<div class="dynamic_order" v-if="!isData(response[key]) && !isData(response[key].list)">
							<f7-link :href="'/dynamicChat/?id='+v.id" v-for="(v,k) in response[key].list" :key="k">
								<ul v-if="!isData(response[key].list)" class="dynamic_list">
									<li>
										<p class="dynamic_list_title">{{v.title}}</p>
										<div class="dynamic_list_other">
											<p>{{v.reads}}人</p>
											<p>{{filerTime(v.createDate)}}</p>
										</div>
									</li>
									<li>
										<div :data-lazy="v.titleImg" class="p_top lazyImg"></div>
									</li>
								</ul>
							</f7-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</f7-page>
</template>

<script>
const winHeight = window.innerHeight,winWidht = window.innerWidth;
import { mapState,mapGetters,mapActions } from 'vuex'
import {
	_vendor,
	_prefixStyle,
	getTime,
	addEvent,
	removeEvent,
	momentum,
	hasTouch,
	style,
	eventType,
	ease,
	GetObjPos,
	isData,
	hasClass,
	addClass,
	removeClass,
	GetSlideAngle,
	GetSlideDirection,
} from 'src/config/init'
export default{
	data() {
		return {
			list: [
				{name:"全部",id:0,style:{
				}},
				{name:"新闻",id:1,style:{
				}},
				{name:"报道",id:2,style:{
				}},
				{name:"公告",id:3,style:{
				}},
			],
			k: 0,
			response: [],
		}
	},
    computed: {
     	...mapState({
     	})
    },
    watch: {
	},
	mounted(){
		let item = document.getElementsByClassName('dynamic_items')[0],
			content = document.getElementsByClassName('navbar')[0].offsetHeight,
			tab = document.getElementsByClassName('dynamic_main')[0].offsetHeight;
			item.style.height = window.innerHeight - (content + tab) + "px";
			this.footer = (content + tab);
			this.page = [];
			this.page[this.k] = 1;
			setTimeout(()=>{
				this.active(0);
			})
	},
	activated(){
		
	},
	created(){
		
	},
	methods:{
		active(k){
			let s = winWidht * k;
			this.k = k;
			if(this.isData(this.response[k])){
				this.response[k] = {};
			}
			this.resets("男装",k);
			window.iswiper.scrollTo(-s,0,300)
		},
		ResetTop(res){
			this.init(this.k,false,res);
		},
		ResetBottom(res){
			this.init(this.k,true,res);
		},
		resets(content,id){
			this.content = content;
			if(this.isData(this.response[id].list)){
				setTimeout(()=>{
					if(!this.scrollTopTips){
						this.scrollTopTips = document.getElementsByClassName('scrollTopTips')[0].offsetHeight
					}
					window._scroll_[id].scrollTo(0,5 + this.scrollTopTips,300,null,true);
				})
			}
		},
		init(num,bool,c){
			let page = this.page && this.page[num] || 1;
			this.ajax({
				url: "activity/list",
				data: {
					publishType:"post",	//String	Y		发布类型，固定传入：“post”(帖子类型)
					queryType:"",//1:置顶/推荐/精选 2 热门，不传默认最新
					publishTypeId:"",//帖子类型ID
					pageNum:page,//当前页
					pageSize	:10,//每页显示条数
				},
				success: res=>{
					this.setJson(res,num,bool,c);
				}
			})
		},
		setJson(response,num,bool,c){
			if(typeof c == "function"){
        			try{
        				if(bool){
        					this.page[num] = 1 + this.page[num];
        					let data = this.response[num].list.concat(response.list);
        					this.response[num].list = data;
        				}else{
        					this.page[num] = 1;
        					this.response.splice(num,1,response);
    					console.info(this.response,response)
        				}
        			}catch(e){};
        			c && c();
        		}else{
    				try{
    					let n = num || 0;
    					this.response.splice(n,1,response);
    					this.page = [];
    					this.page[n] = 1
    				}catch(e){}
        			c && c();
        		}
		},
		watchX(x){
			//console.info(x)
		},
		iswiperPage(page,str){
			page = Math.abs(page);
			if(this.k != page){
				this.k = page;
				this.active(page);
			}
		},
		watchMove(x,str){
			
		},
		watchScrollTo(str){
			
		}
	}
}
</script>

<style lang="scss">
@import "~src/assets/css/function.scss";
.dynamics2{
	.page-content{
		padding-bottom: 0!important;
	}
	.dynamic_main{
		display: -webkit-flex;
		display: flex;
		height: 44px;
		overflow: hidden;
		position: relative;
		width: 100%;
		div{
			position: absolute;
			display: -webkit-flex;
			display: flex;
			display: -moz-box;
			display: -webkit-box; 
			flex-wrap: nowrap;
			height: 100%;
			width: 100%;
			/*display: -webkit-flex;
			display: flex;
			display: -moz-box;
			display: -webkit-box;
			width: 100%;
			flex-wrap: nowrap;
			height: 100%;
			overflow-x: scroll;
			overflow-y: hidden;
			position: relative;*/
			a{
				font-size: 14.6px;
				display: flex;
				display: -webkit-flex;
				width: 25%;
				justify-content: center;
				align-items: center;
				color: $B_H1;
			}
			.dynamic_active{
				width: 15%;
				height: 3px;
				background-color: $B_L1;
				position: absolute;
				left: 5%;
				bottom: 0;
			}
		}
		/*滚动条样式*/
        div::-webkit-scrollbar {/*滚动条整体样式*/
            width: 0px!important;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 0px!important;
        }
        div::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 0px!important;
            -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0)!important;
            background: rgba(0,0,0,0)!important;
        }
        div::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0)!important;
            border-radius: 0!important;
            background: rgba(0,0,0,0)!important;
        }
	}
	.dynamic_main:after{
		content: "";
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 1px;
		background-color: $B_H5;
		left: 0;
	}
	.dynamic_items{
		overflow: hidden;
		position: relative;
		width: 100%;
		
		.dynamic_items1{
			position: absolute;
			display: -webkit-flex;
			display: flex;
			display: -moz-box;
			display: -webkit-box; 
			flex-wrap: nowrap;
			height: 100%;
			width: 100%;
			/*overflow-x: scroll;
			overflow-y: hidden;*/
			.dynamic_items1_list{
				height: 100%;
				width: 100%;
				position: relative;
				.dynamic_order{
					padding: 0 7px;
					background-color: $B_B;
					.dynamic_list{
						background-color: $B_B;
						border-bottom: .02rem solid $B_H5;
						display: flex;
						display: -webkit-flex;
					    position: relative;
						padding: 7px 0 8px;
						color: $B_H1;
						li{
							.p_top{
								width: 100%;
								height: 100%;
							}
							img{
								width: 100%;
								height: 100%;
							}
							.dynamic_list_title{
								flex: 1;
								overflow: hidden;
								color: $B_H1;
								font-size: 15px;
							}
							.dynamic_list_other{
								display: flex;
								display: -webkit-flex;
								margin-top: .2rem;
								font-size: 15px;
								p{
									flex: 1;
									color: $B_H3;
								}
								p:nth-child(2){
									text-align: right;
								}
							}
						}
						li:nth-child(1){
							flex: 1;
							padding-right: 10%;
							display: flex;
							display: inline-flex;
							flex-direction: column;
						}
						li:nth-child(2){
							width: 2rem;
			   				padding: 1rem 0;
			   				height: 0;
			   				overflow: hidden;
			   				position: relative;
							div,img{
								width: 100%;
								height: 100%;
							    margin-top: -50%;
							    border: none;
							    position: absolute;
							}
						}
					}
				}
			}
		}
	}
	
}
</style>