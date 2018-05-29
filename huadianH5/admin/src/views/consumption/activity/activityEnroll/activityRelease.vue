<template>
	<div class="wrapper">
		<div class=" slidesClassMain" ref='slidesClassMain' style="height: 100%;" v-if="data.length">
			<div class="slides_main" ref="slides_main" v-scrollt:value="innerHeight">
				<ul class="contentBox">
					<li v-for="(item,key) in data" ref="release">
						<router-link  :to="{path:'/activityDetail',query:{id:item.id}}">
							<div class="itemTop" >
								<div class="itemDeclare">
									<!--<img :src="item.titleImg" v-if="item.titleImg" />-->
									<div class="titleImg" v-if="item.titleImg" :style="{background:getlogoUrl(7.5,4,item.titleImg)}"></div>
									<div class="txtDescript">
										<p class="highlighTtitle">
											<!--<span class="activitiesType" v-html="istype(item.publishType)"></span>-->
											<span>{{item.title}}</span>
										</p>
										<p class="date">{{getLocalTime(item.createDate / 1000)}}</p>
										<p>
											<span class="thumbNum">点赞{{item.likes}}</span>
											<span>阅读{{item.reads}}</span>
										</p>
									</div>
								</div>
								<span class="icon iconfont rightArrow" v-html="item.rightArrow"></span>
							</div>
						</router-link>
						<ul class="itemBottom">
							<li v-for="(x,k) in iconList"  @click="submit($event,{item:item,key:k,x:x})">
								<span class="icon iconfont" v-html="x.icon"></span>
								<span>{{x.txt}}</span>
							</li>
						</ul>
					</li>
				</ul>
				<div class="reles_dg"></div>
			</div>
		</div>
		<div class="emptyWrap" v-if="!data.length">
			<div class="postEmpty">
		   	   	   <img class="emptyImg" src="http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51501147982283emptyWrite.png"/>
		   	   	   <br />
		   	   	    <span class="emptyTxt">暂无发布的文章</span>
		   	 </div>
		</div>
		<router-link :to="{path:'/activityType',query:{releaseType:'post'}}" class="reles_btn">
			发布文章
		</router-link>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			showTitle:true,
			title:"文章",
			data : [],
			iconList:[{
				txt:"删除",
				icon:"&#xe692;"
			},{
				txt:"查看",
				icon:"&#xe785;"
			}/*,{
				txt:"评论",
				icon:"&#xe62f;"
			},*//*{
				txt:"分享",
				icon:"&#xe684;"
			}*/],
            
            innerHeight: null,
            isMaxPage: false,
			maxPage:1,
            callData:{
				pageNum: 1,  //pageNum	int	N	1	当前页数
				pageSize: 5,  //pageSize	int	N	30	每页查询的数据条数
				publishType:'post'
			},
		}
	},
	beforeMount(){
		 this.$store.dispatch('showTitle',this.showTitle);
		 this.$store.dispatch('title',this.title);
		 this.init();
	},
	mounted(){
		
	},
	computed: {
      ...mapGetters([
          'userInfo',
          'getActivityMyList',
          'getActivityList'
      ]),
    },
	methods: {
		ResetBottom(res){
			if(this.callData.pageNum == this.maxPage){
	    		res(false);
	    		this.isMaxPage = true;
	    		return;
	    	}else{
	    		++this.callData.pageNum;
	    		this.init();
	    		res();
	    	}
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
		submit( c,e){
			let func = [()=>{
				let url='/activity/delete',
				    data={id:e.item.id};
				  this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							//console.info(res);
							if(res.meta.code=10000){
								this.data.splice(e.key,1);
								this.toastMsg("删除成功");
							}
						}
					});
				});
				
			},()=>{
				this.$router.push({path:'/activityDetail',query:{id:e.item.id}});
				
			},()=>{
				this.$router.push({path:'/activityEnrollList',query:{id:e.item.id}});
			},()=>{
				
			}]
			func[e.key]()
			
		},
		init(){
			let	url = 'activity/myList',
			    data=this.callData;
				 this.getByUrl({data,url}, res=>{
					this.ajax({
						url : res.url,
						data : res.data,
						success:( res)=>{
							this.maxPage=Math.ceil(res.data.totalNum/this.callData.pageSize);
							this.data=this.data.concat(res.data.list);
						}
					});
				});
		},
	}
}
</script>
<style lang="scss" scoped>
.contentBox .itemTop,.itemDeclare,.itemBottom{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
    padding: .3rem 0;
    color: #999999;
    font-size: .28rem;
}
.contentBox .itemTop{
	padding:0 .2rem ;
}
.itemBottom{
	border-top: solid 1px #EAEAEA;
}
.itemBottom .icon{
	font-size: .4rem;
}
.itemBottom>li{
	width: 50%;
	text-align: center;
	border-right: solid 1px #EBEAEA;
}
.contentBox{
	background: #E6E6E6;
}
.contentBox>li{
	margin-bottom:.2rem ;
	background:#fff ;
}
.itemTop img{
	width: 1.5rem;
	height: 1.5rem;
}
.txtDescript{
	margin-left:.2rem ;
	font-size: .24rem;
}
.txtDescript .thumbNum{
	margin-right: .3rem;
}
.itemTop .rightArrow{
	font-size: .3rem;
}
.txtDescript .highlighTtitle{
	font-size: .3rem;
	color: #333333;
}
.highlighTtitle .activitiesType{
	padding: 0.03rem .1rem;
	border-radius: 0.06rem;
	color: #fff;
	background: #E7580C;
	font-size: .18rem;
}
.itemDeclare .date{
	margin: .2rem 0;
}
.titleImg{
	height: 1.5rem;
	width: 1.5rem;
}
.reles_dg{
	height: .9rem;
}
.reles_btn{
	position: fixed;
	bottom: 0;
	left: 0;
	height: .9rem;
	line-height: .9rem;
	text-align: center;
	font-size: .28rem;
	color: #FFF;
	background-color: #E7580C;
	border-top: .02rem solid #e87e46;
	width: 100%;
}
.reles_btn:active{
	background-color: #e87e46;
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
