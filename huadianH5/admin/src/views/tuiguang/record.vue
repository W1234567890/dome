<template>
	<div>
		<div class="headerComponent">
				<div class="headerWrap">
				   	  <span class="icon iconfont routerBack" v-html="iconLeft" @click="routerBack"></span>
				   	  <p class="headerTitle" v-html="title"></p>
				</div>
		</div>
		<div class="recordTotal" v-if="recordData.length">链接总数:{{count||0}}</div>
		<div class="page-content slidesClassMain" ref="slidesClassMain" v-if="recordData.length">
			<div v-scrollt>
				<div style="background-color: #FFFFFF;">
					<div class="recordItem" v-for="(item,key) in recordData">
						<div>
							<img class="recordImg" :src="item.headimg"/>
						</div>
						<div style="display: flex;display: -webkit-flex;justify-content: center;flex-direction: column;flex: 1;padding-left: 18px;">
							<div style="padding-bottom: 2px;color: #333333;font-size: 16px;vertical-align: bottom;">{{item.nickname}}</div>
							<div style="color: #999999;font-size: 12px;vertical-align: bottom;">注册日期:{{item.createTime}}</div>
						</div>
						<div style="display: flex;display: -webkit-flex;justify-content: center;align-items: center;"><img src="" style="height: 14px;"/></div>
					</div>
				</div>
			</div>
		</div>
		<div class="emptyWrap" v-if="!recordData.length">
			 	<div class="emptyInner">
			 		  <img class="emptyImg" :src="empty"/>
					  <br />
				   	   <span class="emptyTxt">暂无链接用户</span>
			 	</div>
		</div>
	</div>
</template>

<script>
const winHeight = window.innerHeight;
const winWidth = window.innerWidth;
export default {
	data(){
		return{
			iconLeft:"&#xe608;",
			recird:'',
			showTitle:true,
			title:"连接用户",
			recordData:[],
			count:'',
			pageNum:1,
			maxPage:1,
			pageSize:10,
			isMaxPage:false,
			headerImgs:{
	            head_v1:require("src/assets/img/avatr/head_v1@2x.png"),
	            head_v2:require("src/assets/img/avatr/head_v2@2x.png"),
	            head_v3:require("src/assets/img/avatr/head_v3@2x.png"),
	            head_v4:require("src/assets/img/avatr/head_v4@2x.png"),
           },
           empty:'http://shaohuadian17.oss-cn-beijing.aliyuncs.com/h5/adminSeller/static/emptyLinker.png'
		}
	},
	beforeCreate(){
            this.$store.dispatch('showTitle', this.showTitle);
			this.$store.dispatch('title', this.title);
     },
	mounted(){
		this. getRecord();
	},
	activated(){
	},
	methods: {
		 routerBack(){
	        	this.backtoPage();
	    },
	    ResetTop( res){
		    	this.pageNum = 1;
		    	this.recordData=[];
		    	this.getRecord();
		    	this.isMaxPage=false;
		    	res(false);
		    },
	    ResetBottom( res){//上拉加载
	    	if(this.pageNum <this.maxPage){
	    		++this.pageNum;
	    		this.getRecord();
	    		res();
	    	}else{
	    		res(true);
	    		this.isMaxPage = true;
	    		return;
	    	}
	    },
	    getRecord(){
	    	let url='member/list',data={pageNum:this.pageNum,pageSize:this.pageSize};
	    	this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						this.count=res.data.count;
						this.maxPage=Math.ceil(this.count/this.pageSize);
					     for(let i=0;i<res.data.list.length;i++){
					     	let timeStr = new Date(res.data.list[i].createDate*1000).toLocaleString().replace(/:\d{1,2}$/,' ');
							res.data.list[i].createTime = timeStr.substring(0,timeStr.indexOf(" ")+1).replace(/\//g,'-');
							if(this.headerImgs.hasOwnProperty(res.data.list[i].headimg)){
								res.data.list[i].headimg=this.headerImgs[res.data.list[i].headimg];
							}
					     }
					     	 this.recordData=this.recordData.concat(res.data.list);
					}
				  })
			})
	    }
		
	},
}
</script>

<style lang="scss" scoped>
.page-content{
	margin-top:1.6rem;
}
.recordTotal{
	width:100%;
	height:.8rem;
	line-height:.8rem;
	padding-left:.4rem;
	font-size:.3rem;
	color:#3C3C3C;
	background:#DDDDDD;
	position: fixed;
	top:.8rem;
	z-index:1000;
}
.recordItem{
	border-bottom: 10px solid #E8E8E8;
	display: flex;display: 
	-webkit-flex;
	padding: 15px 15px;	
}
.recordImg{
	height: 55px;
	width: 55px;
	border-radius: 50%;
}
.emptyWrap{
	width:100%;
	height:calc(100vh);
	position: relative;
}
.emptyInner{
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