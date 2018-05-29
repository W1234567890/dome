<template>
	<div class="wrapper">
		<div class=" slidesClassMain" ref='slidesClassMain' style="height: 100%;">
			<div class="slides_main" ref="slides_main" v-slide:value="innerHeight">
				<ul class="contentBox">
					<li v-for="(item,key) in data" ref="release">
						<router-link  :to="{path:'/activityDetail',query:{id:item.id}}">
							<div class="itemTop" >
								<div class="itemDeclare">
									<!--<img :src="item.titleImg" v-if="item.titleImg" />-->
									<div class="titleImg" v-if="item.titleImg" :style="{background:getlogoUrl(7.5,4,item.titleImg)}"></div>
									<div class="txtDescript">
										<p class="highlighTtitle">
											<span class="activitiesType" v-html="istype(item.publishType)"></span>
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
			</div>
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			showTitle:true,
			title:"我的发布",
			hRBtn:{
			   rHTit:"完成",
			   rHUrl:"/aboutAccount/tradeRecord",
			   color:"#EB743E"
			},
			data : [],
			iconList:[{
				txt:"删除",
				icon:"&#xe692;"
			},{
				txt:"查看",
				icon:"&#xe785;"
			},{
				txt:"评论",
				icon:"&#xe62f;"
			},{
				txt:"分享",
				icon:"&#xe684;"
			}],
            
            innerHeight: null,
            isMaxPage: false,
		}
	},
	mounted(){
		this.init();
	},
	computed: {
      ...mapGetters([
          'userInfo',
          'getActivityMyList',
          'getActivityList'
      ]),
    },
	methods: {
		ResetTop(callback){
	        this.activityMyList1({},bool=>{
	        	this.init();
	        	callback(bool)
	        })
		},
		ResetBottom(callback){
			for(var i in this.getActivityMyList[0].list){
				this.data.splice(this.data.length,1,this.getActivityMyList[0].list[i]) 
			}
			
			callback(true)
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
				this.activityDelete1({
					id: e.item.id
				},res=>{
					if(res.meta.code == 10000){
						/*this.activityMyList1({},bool=>{
				        	this.init();
				        })*/
				       console.info(res)
					}
				})
				
			},()=>{
				
			},()=>{
				
			},()=>{
				
			}]
			func[e.key]()
			
		},
		init(){
			console.info(this.getActivityMyList)
			if(!this.getActivityMyList){
				this.activityMyList1({
					publishType: "post",
				},res=>{
					let data = [];
						data.push(res.data);
					this.$store.dispatch("setActivityMyList",data)
		        	this.init();
				})
				return;
			}
			this.data = [];
		    this.getActivityMyList.forEach((item,key)=>{
		    	item.list.forEach((i,k)=>{
		    		this.data.push(Object.assign(i, {
						'key' : key,
					   	'k' : k,
					}));
			    })
		    });
			this.data.sort(function(a,b){
			    return b.createDate - a.createDate;
			})
			if(this.dom){
				if((-this.dom.distanceY + window.innerHeight) > window.innerHeight){
					console.info(this.dom.distanceY , this.$refs.release[0].offsetHeight)
					this.fnTranslate( this.dom.distanceY + this.$refs.release[0].offsetHeight);
	           		this.dom.distanceY = this.dom.distanceY + this.$refs.release[0].offsetHeight;
				}
			}
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
	width: 25%;
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
</style>
