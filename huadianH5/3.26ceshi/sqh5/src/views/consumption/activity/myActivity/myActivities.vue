<template>
	<div class="wrapper">
		<div class=" slidesClassMain" ref='slidesClassMain'>
			<div class="slides_main" ref="slides_main" v-slide:value="innerHeight">
				<header class="header" v-if="userInfos">
					<div class="">
						<div class="avatar" :style="{background:getlogoUrl(7.4,3.5,userInfos.headImg)}"></div>
						<div class="nick-name">{{userInfos.nickName}}</div>
						<div class="avatar-degree">
							<span>关注{{userInfos.focusNum}}</span>
							<span class="divide-line"></span>
							<span>粉丝{{userInfos.coverFocusNum}}</span>
						</div>
						<div class="header-txt"><!--{{userInfos.txt}}-->这个人很懒，什么都没有留下</div>
					</div>
				</header>
				<nav class="navBar">
					<a v-for="(item,key) in navData"  @click="addClass($event,item,key)" :class="key==index ? 'active': ''">{{item.txt}}</a>
				</nav>
				
				<div class="contenBox" v-for="(item,key) in data" v-show="index == 0" @click="tolink( item)">
					<div class="publisher-list">
						<div class="activist-inf">
							<img class="avatar" :src="getlogoUrl(7.4,3.5,item.createrImg,true)"/>
							<div>
								<div class="nickNameBox">
									<span class="nickName text-ell">{{item.createByName || '加载中...'}}</span>
									<span class="activitiesFlag" v-html="istype(item.publishType)"></span>
								</div>
								<div>{{getLocalTime(item.createDate / 1000)}}发布</div>
							</div>
						</div>
					</div>
					
					<div class="recommendBd">
						<!--<div class="recommendBdInner">
							<img class="singUpImage" :src="item.img" alt="" />
							<div class="recommend-title-wrapper">
								<pre class="recommend-title-block">{{item.title}}</pre>
							</div>
							<div class="recommend-text-preWrapper">
								<pre class="recommend-text-preBlock">{{item.activityText}}</pre>
							</div>
						</div>-->
						<div class="recommendBdInner" v-if="item.titleImg">
							<div class="recommend-title-wrapper">
								<pre class="recommend-title-block ">{{item.title}}</pre>
							</div>
							<!--<img class="singUpImage"  :src="item.titleImg"/> -->
							<div class="singUpImage" :style="{background:getlogoUrl(7.4,3.5,item.titleImg)}"></div>
						</div>
						<div class="recommendBdInner" v-else>
							<div class="recommend-title-wrapper">
								<pre class="recommend-title-block recommend-title-type">{{item.title}}</pre>
							</div>
							<div class="recommend-text-preWrapper" v-if="item.summary">
								<p class="recommend-text-preBlock word-break">{{item.summary.length > 100 ? item.summary + '...' : item.summary}}</p>
							</div>
						</div>
					</div>
					<div class="hotDegrees">
						<div class="notice-degree">
							<span class="icon iconfont eyeCon">&#xe630;</span>
							<span>{{item.reads}}</span>
						</div>
						<div>
							<span class="notice-degree">
								<span class="icon iconfont">&#xe632;</span>
								<span>{{item.likes}}</span>
							</span>
							<span class="notice-degree notice-num">
								<span class="icon iconfont">&#xe62f;</span>
								<span class="">{{item.comments}}</span>
							</span>
						</div>
					</div>
				</div>
				
				<div class="personalInf" v-show="index == 1">
					<ul class="itemList" v-if="isUser">
						<li v-for="(item,key) in personalInf" @click="selectItem(item,key)" >
							<router-link :to="{path:item.url,query:{'id':item.id}}">
								<div class="itemOpt">
									<span class="content">{{item.content}}</span>
									<span class="rightArrow">
										<span>
											{{item.isSetting}}
										</span>
										<span class="icon iconfont" v-html="item.rightArrow"></span>
									</span>
									<span class="matter">{{item.matter}}</span>
								</div>
							</router-link>
						</li>
						<div class="itemList_dg"></div>
					</ul>
					
					<ul class="othersInf itemList" v-else>
						<li class="itemOpt" v-for="item in othersInf">
							<span class="content">{{item.content}}</span>
							<span class="matter">{{item.matter}}</span>
						</li>
					</ul>
				</div>
				
				
				<div class="footer_dg" v-if="!isMyInfo"></div>
			</div>
		</div>
		<div class="footer" v-if="!isMyInfo">
			<span class="fItem">
				<span class="icon iconfont">&#xe65c;</span>
				<span>添加好友</span>
			</span>
			<span class="fItem">
				<span class="icon iconfont">&#xe600;</span>
				<span>关注TA</span>
			</span>
			<span class="fItem">
				<span class="icon iconfont">&#xe766;</span>
				<span>聊天</span>
			</span>
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			data: [],
			navData:[{
				txt:"我的发布"
			},{
				txt:"个人资料"
			}],
			index: 0,
			isShow: true,
			userInfos: null,
			personalInf: [],
			othersInf: [],
			isUser:false,
            
            innerHeight: null,
            isMaxPage: false,
            isMyInfo: false,
		}	
	},
	mounted(){
		let refs = this.$refs,
    		height = Number(window.innerHeight) - (Number(this.$refs.slidesClassMain.getBoundingClientRect().top));
    		refs.slidesClassMain.style.height = height + 'px';
    		this.activityFansPersonalInfo({
	        	createByUserID: this.$router.currentRoute.query.id,
	      	},res=>{
	        	this.userInfos = res.data;
	        })
    		this.isMyInfo = this.$router.currentRoute.query.id==this.getXToken.userId;
			this.getActivities();
	},
	computed: {
      ...mapGetters([
      	  'userInfo',
          'getXToken',
          'getUserData',
          'getActivityMyList',
          'getActivityList',
      ]),
    },
    watch: {
    	userInfos( e){
    		let data = this.userInfos;
    		if(this.isnull(data)){
    			return;
    		}
    		this.isUser = e.userId == this.getXToken.userId;
    		this.othersInf = [{
				content:"昵称",
				matter: data.nickName,
			},{
				content:"姓名",
				matter: data.name,
			},{
				content:"手机号",
				matter: data.phone,
			},{
				content:"个性签名",
				matter: "这个人很懒，什么都没有留下",
			}];
			let t = this.getXToken;
			this.personalInf = [{
				content:"昵称",
				rightArrow:"&#xe608;",
				url:"/personalCenter/personnalSignature",
				isSetting: data.nickName,
				id:"nickName"
			},{
				content:"个性签名",
				rightArrow:"&#xe608;",
				url:"/personalCenter/personnalSignature",
				isSetting: t.bankCard,
				id:"signature"
			},{
				content:"姓名",
				matter: data.name,
			},{
				content:"手机号",
				matter: t.phone
			},{
				content:"身份证号",
				matter: t.cardNum
			},{
				content:"绑定银行卡",
				matter: t.bankCard
			},{
				content:"所在地区",
				matter: t.address
			}];
    	}
	},
	methods: {
		addClass(e,v,key){
			this.index = key;
			//this.isShow = !this.isShow;
		},
		ResetTop(callback){
			this.getActivities();
	       this.activityFansPersonalInfo({
	        	createByUserID: this.$router.currentRoute.query.id,
	        },res=>{
	        	this.userInfos = res.data;
	        	callback();
	        })
	        
		},
		getActivities(){
			if(this.isMyInfo){
	        	 this.activityMyList({
					createByUserID: this.$router.currentRoute.query.id,
					pageNum: 1,
					pageSize: 10,
		        },bool=>{
		        	this.init();
		        })
	        }else{
	        	this.activityList({
					createByUserID: this.$router.currentRoute.query.id,
					pageNum: 1,
					pageSize: 10,
		        },bool=>{
		        	this.init();
		        })
	        }
		},
		tolink( v){
			this.$router.push({
				path: "/activityDetail",
				query: {
					id: v.id
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
		init( c){
			this.data = [];
			let data =  this.isMyInfo ? this.getActivityMyList : this.getActivityList;
		    data.forEach((item,key)=>{
		    	item.list.forEach((i,k)=>{
		    		if(!this.isMyInfo){
		    			if(i.status == 1){
		    				this.data.push(Object.assign(i, {
								'key' : key,
							   	'k' : k,
							}));
		    			}
		    		}else{
		    			this.data.push(Object.assign(i, {
							'key' : key,
						   	'k' : k,
						}));
		    		}
			    })
		    });
			this.data.sort(function(a,b){
			    return b.createDate - a.createDate;
			})
			c && c();
		},
		addClass(e,v,key){
			this.index = key;
			this.isShow = !this.isShow;
		},
		selectItem(item,key){
			
		}
	},
}
</script>
<style lang="scss" scoped>
	.wrapper{
		color: #333333;
		font-size: .28rem;
	}

	.header .avatar{
		height: 1.3rem;
		width: 1.3rem;
		margin: auto!important;
		border-radius: 100%;
	}
	.header-txt{
		font-size: .24rem;
	}
	.navBar{
		font-size: .3rem;
		color: #6D6D6D;
		background: #fff;
		padding: 0 .4rem;
		overflow: hidden;
	}
	.navBar>a{
		width: 3.35rem;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		float: left;
	}
	.navBar a.active{
		color:#E7580C ;
		border-bottom:solid 2px #E7580C ;
	}
	.divide-line{
		display: inline-block;
		background: #fff;
		width: 0.04rem;
		height: 0.28rem;
		margin: 0 .3rem;
	}
	.publisher-list{
		padding: .3rem .2rem 0 .2rem;
		font-size: .24rem;
		color: #999999;
		margin-top: .2rem;
	}
	.publisher-list,.publisher-list .activist-inf,
	.hotDegrees,.header,.avatar-degree,.notice-degree,.footer,.footer .fItem{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    background: #fff;
	    justify-content: space-between;
	}
	.header{
		font-size: .3rem;
		color: #fff;
		text-align: center;
		height: 5.4rem;
		background:url('~src/assets/img/community/avatarbg.png') no-repeat center center;
		flex-direction:column ;
		justify-content: center;
		padding: 0 .6rem;
	}
	.avatar-degree{
		margin: .3rem 0 .2rem 0;
		justify-content: center;
		background:transparent;
	}
	.publisher-list .nickName{
		font-size: .36rem;
		color: #333333;
		margin-right:.2rem;
	}
	.publisher-list .avatar{
		height: .7rem;
		width: .7rem;
		margin-right: .3rem;
		display: block;
		float: left;
	}
	.contenBox{
		padding: 0 .2rem;
		background: #fff;
		margin-bottom:.2rem ;
	}
	.activities-txt{
		font-size: .32rem;
		margin-bottom: .3rem;
	}
	.activitiesFlag{
		font-size:.18rem;
		color:#e7580c;
		border:solid 1px #e7580c;
		border-radius:0.06rem;
		padding:0rem .1rem;
	}
	.hotDegrees{
		height: 1rem;
		font-size: .24rem;
		color: #999999;
		.notice-degree{
			display: inline-block;
			border:solid 1px #A1A1A1;
			border-radius: 1rem;
			padding: 0.0rem .2rem;
		}
	}
	.hotDegrees div:nth-child(2){
		font-size:.2rem;
	}
	.notice-num{
		margin-left: .2rem;
	}
	.notice-degree .icon{
		font-size:.34rem ;
	}
	.footer_dg{
		width: 100%;
		height: 1rem;
	}
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 1rem;
		text-align: center;
		color: #fff;
		background: #fff;
		color: #333333;
		font-size: .28rem;
		justify-content: space-around;
		z-index: 11;
	}
	.footer .fItem .icon{
		font-size: .46rem;
		margin-top: 0.06rem;
		margin-right: .16rem;
	}
	/*个人资料*/
	
	.personalInf{
		padding: 0 .2rem;
	}
	.itemList_dg{
		height: .2rem;
	}
	.personalInf.active{
		background: #fff;
	}
	.toIdentification{
		font-size: .24rem;
		color: #FD850A;
	}
	.itemRight p:nth-child(1){
		font-size: .32rem;
		color: #333333;
	}
	.itemRight p:nth-child(2){
		font-size: .24rem;
		color: #999999;
		margin: 0.1rem 0 0.14rem 0;
	}
	.toRight{
		color: #B5B7B6;
		font-size: .4rem;
		position: absolute;
		right: .2rem;
	}
	.itemLeft .avatar{
		width: 1.4rem;
		height: 1.4rem;
		margin-right: .3rem;
	}
	.itemList{
		background:#E6E6E6 ;
		padding-top: .2rem;
	}
	.itemList .iconfont{
		font-size: .5rem;
	}
	.itemList li{
	    background: #fff;
	    padding: 0 0.2rem;
	}
	.itemList .content{
		margin-left: .0rem;
	}
	.itemList li:nth-child(3) div{
		margin-bottom: .2rem;
		border: 0;
	}
	.itemList li:last-child div{
		margin-top: .2rem;
		border: 0;
	}
	.itemList .itemOpt{
		width: 100%;
		border-bottom: solid 1px #E6E6E6;
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    color: #333333;
	    font-size: .3rem;
	    position: relative;
	    height: 1rem;
	}
	.itemOpt .matter{
		position: absolute;
		right: 0;
		top: .26rem;
		color: #999999;
	}
	.itemList .rightArrow{
		position: absolute;
		right: 0;
		color: #B5B7B6;
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    top: .26rem;		
	}
	.personalInf .othersInf{
		background: #fff;
		margin-top: .2rem;
		padding: 0 .2rem;
	}
	.rightArrow .icon{
		font-size: .3rem;
		display: inline-block;
	}
	.personalInf .othersInf .content{
		margin: 0;
	}
	.othersInf>li{
		padding: 0;
	}
	.singUpImage{
		display: block;
		max-width: 100%;
		margin:.15rem 0;
	}
	.recommend-title-wrapper {
		position: relative;
		width: 96%;
		padding: 0;
		line-height: .4rem;
		font-size: .32rem;
	}
	
	.recommend-title-block {
		font-family: "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
		display: block;
		white-space: pre-wrap;
		overflow: hidden;
		margin: 0;
		padding: 0 2%;
		box-shadow: border-box;
		font-weight: 700;
		color: #333;
		margin: .2rem 0;
	}
	.recommend-text-preWrapper {
		position: relative;
		width: 96%;
		padding: 0;
		line-height: .36rem;
		font-size: .24rem;
	}
	
	.recommend-text-preBlock {
		font-family: "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
		display: block;
		white-space: pre-wrap;
		overflow: hidden;
		margin: 0;
		padding: 0 2%;
		box-shadow: border-box;
		line-height: .36rem;
		font-size: .24rem;
		color: #666;
	}
	.recommendBdInner{
		.singUpImage{
			height: 3.4rem;
		}
	}
</style>
