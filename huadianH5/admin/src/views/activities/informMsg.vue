<template>
	<div class="wrapper" @click='closePopWin' :class="isCheckBoxShow ? 'canclePadding' : ''">
		<div class="headeRight" @click="operateItem" :class="isIconShow ? 'addBg' : ''">
		    <span class="btn"  v-if="isIconShow"></span>
			<span v-if="!isIconShow" @click="cancleSelect">取消</span>
		</div>
		<div class="popWin" v-if="isPopWinShow">
   			<p class="selectAll" @click="selectAll">全选</p>
   			<p class="readAll" @click="readAll">一键已读</p>
   			<img :src="upArrow"  class="upArrow"/>
		</div>
		<div class="msgUnit" v-for="(item,key) in dataList">
			<div class="msgDate">{{item.msgdate}}</div>
			<div class="content">
				<span id="" class="radioBox" v-if="isCheckBoxShow" @click="selectOne(item,key)" :class="item.isChecked ? 'active' :''">
					<span class="icon iconfont" v-if="item.isChecked">&#xe707;</span>
				</span>
				<div class="activitiesContent">
					<div class="title">{{item.title}}</div>
					<span class="txt">{{item.txt}}</span>
					<img :src="item.img" class="images" />
					<router-link :to="{path:item.routerUrl,query:{id:0}}" class="seeDetail">
						<span>查看详情</span>
						<span class="icon iconfont">&#xe608;</span>
					</router-link>
				</div>
				<div class="line"></div>
			</div>
		</div>
		<div class="footer" @click="deleteSelect" v-if="isCheckBoxShow">删除</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			title:'通知消息',
			showTitle:true,
			isCheckBoxShow:false,
			isPopWinShow:false,
			isCheckAll:false,
			isIconShow:true,
			dataList:[{
				title:"春暖花开出游季",
				img:require('src/assets/img/z_img/acImg.png'),
				routerUrl:'/activitiesDetail',
				msgdate:"2017-05-25 06:06",
				isChecked:false,
			},{
				title:"春暖花开出游季",
				routerUrl:'/activitiesDetail',
				msgdate:"2017-05-25 06:06",
				txt:"春暖花开出游季春暖花开出游季春暖花开出游季春暖花开出游季春暖花开出游季春暖花开出游季春暖花开出游季春暖花开出游季春暖花开出游季春暖花开出游季",
				isChecked:false,
			},{
				title:"春暖花开出游季",
				img:require('src/assets/img/z_img/acImg.png'),
				routerUrl:'/activitiesDetail',
				msgdate:"2017-05-25 06:06",
				isChecked:false,
			}],
			upArrow:require('src/assets/img/z_img/upArrow.png'),
		}
	},
	methods: {
		operateItem(e){
			e.stopPropagation();
			this.isPopWinShow = true;
			this.isCheckBoxShow = true;
		},
		selectOne(item,key){
			item.isChecked = !item.isChecked;
		},
		deleteSelect(){
			for(var i=this.dataList.length-1;i>=0;i--){
			/*console.log(this.dataList[i].isChecked);*/
				if(this.dataList[i].isChecked){
				console.log(i)
					this.dataList.splice(i,1);
				}
				
			}
		},
		selectAll(e){
			e.stopPropagation();
			this.isIconShow = false;
			for(var i=0;i<this.dataList.length;i++){
				this.dataList[i].isChecked = true;
			}
			this.isPopWinShow = false;
		},
		cancleSelect(e){
			e.stopPropagation();
			this.isIconShow = true;
			this.isPopWinShow = false;
			for(var i=0;i<this.dataList.length;i++){
				this.dataList[i].isChecked = false;
			}
		},
		closePopWin(e){
			this.isPopWinShow = false;
		}
		
	},
	beforeMount(){
	    this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	}
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.wrapper{
		padding: 0 .2rem 1.2rem 0.2rem;
	}
	.wrapper.canclePadding{
		padding-right:0 ;
	}
	 .popWin{
		position: fixed;
		background: #808080;
		color: #fff;
		text-align: center;
		font-size: .24rem;
		padding: 0.1rem .2rem;
		z-index: 99999;
		border-radius:0.06rem;
		right: 0.2rem;
		top: 1rem;
	}
	.upArrow{
		position: absolute;
		right: 0.1rem;
		top: -.2rem;
		height: 0.2rem;
		width: auto;
	}
	.popWin>p{
		height: .6rem;
		line-height: .6rem;
	}
	.headeRight{
	    height: 0.78rem;
	    line-height:.78rem;
		position: fixed;
		top:0;
		right:0.4rem;
		z-index:15;
		.btn{
			display: inline-block;
			padding-right:.2rem;
			font-size:.28rem;
			color:#333;
		}	
	}
	.headeRight.addBg{
		background:url('~src/assets/img/z_img/more.png') no-repeat center center ;
		background-size: auto .4rem;
		-webkit-background-size: auto .4rem;
	}
	.msgUnit .msgDate{
		font-size: .26rem;
		color: #999;
		text-align: center;
		height: .8rem;
		line-height: .8rem;
	}
	.msgUnit .content,.seeDetail,.radioBox{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.msgUnit .line{
		position: absolute;
		border-top: solid 1px $lineColor;;
		width: 100%;
		height: 1px;
		left: 0rem;
		bottom: .86rem;
	}
	.content{
		 position: relative;
	}
	.content .txt{
		font-size:.26rem ;
		color: #666;
		text-indent: .2rem;
		display: block;
		margin-top:.2rem ;
	}
	.activitiesContent{
		width: 100%;
		background: #fff;
		padding: .4rem 0.2rem 0 .2rem;
	}
	.content .title{
		font-size: .3rem;
		font-weight: bold;
		color: #333;
	}
	.seeDetail{
		width: 100%;
		height: .86rem;
		font-size: .28rem;
		color: #666;
		justify-content: space-between;
	}
	.content .images{
		margin-bottom: .2rem;
	}
	.footer{
		width: 7.1rem;
		background:#E7580C ;
		color: #fff;
		font-size: .36rem;
		text-align: center;
		margin: 0 auto;
		height: .9rem;
		line-height: .9rem;
		border-radius: .1rem;
		margin-top: .6rem;
		bottom: 0;
		position: fixed;
		z-index: 9999;
	}
	.radioBox{
		width: .4rem;
		height: .4rem;
		border-radius: 50%;
		border: solid 1px #AFAFAF;
		justify-content: center;
		margin-right: .2rem;
		overflow: hidden;
	}
	.radioBox.active{
		background: #E7580C;
		border: 0;
	}
	.radioBox .icon{
		color: #fff;
		font-size: .3rem;
	}
</style>

