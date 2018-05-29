<template>
	<div class="wrapper">
		<div class="headerComponent">
				<div class="headerWrap">
				   	  <span class="icon iconfont routerBack" v-html="iconLeft" @click="routerBack"></span>
				   	  <p class="headerTitle" v-html="title"></p>
				</div>
		</div>
		<ul class="setGoodsInf">
			<li v-for="(item,key) in data" @click="key==3 ? clearCache() :''">
				<router-link :to="{path:item.routerUrl,query:{'name':9}}">
					<span class="curSelect">{{item.txt}}</span>
					<div>
						<span v-if="key==3">{{cacheData}}</span>
						<span  class="icon iconfont rightArrow" v-html="item.icon"></span>
					</div>
				</router-link>
			</li>
		</ul>
		<div class="footer" @click="exitBtn">退出</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			showTitle:false,
			title:"设置",
			iconLeft:"&#xe608;",
			goodsPromotion:[],
			goodsIndex:0,
			dragPerImg:null,
			imgSize:0,
			isAdd:false,
			sizeCount:1,
			curKey:true,
			data:[{
				txt:"个人资料",
				icon:"&#xe608;",
				routerUrl:"/setPersonalData"
			},{
				txt:"修改密码",
				icon:"&#xe608;",
				routerUrl:"/editorPassWord"
			},{
				txt:"运费模板",
				icon:"&#xe608;",
				routerUrl:"/yunFeiSetting"
			},{
				txt:"清除缓存",
				routerUrl:"",
				icon:"&#xe608;",
			}],
			cacheData:'0K'
		
		}
	},
	computed: {
	      ...mapGetters([
	          'getXToken',
	      ]),
	},
	methods: {
		exitBtn(){
			this.returnToback('logout',res=>{
				  locache.remove('userInfo');
				  locache.remove('XToken');
				  locache.remove('loginInfo');
				  console.info(res);
			});
		},
		clearCache(){
			this.confirm({ //confirm弹窗
				content : " ",//标题
				title : "是否清除缓存", //内容
				Array : ['确认', '取消'],
				callback : ( bool)=>{//回调函数
					if(bool){
						 let ua = navigator.userAgent.toLowerCase();
						if (/iphone|ipad|ipod/.test(ua)) {
							//调用ios的方法
							  let bridge = getJsBridge();
			    	          let cc=bridge.call("clearAppCache");
						}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
							//调用android的方法
							 let cc=js.clearAppCache();
						}else{
							return;  //pc端
						}
						this.cacheData="0k";
					}
				}
			});
		},
		gainCache(c){
			let ua = navigator.userAgent.toLowerCase();
			let cc=null;
			if (/iphone|ipad|ipod/.test(ua)) {
				try{
					let bridge = getJsBridge();//调用ios的方法
		        	 cc=bridge.call("getCache",data);
		        	c && c(JSON.stringify(cc));  //cc为返回的值
				}catch(e){
					c && c();  //cc为返回的值
				}
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				try{
					 cc=js.getCache();//调用android的方法
					c && c(cc);
				}catch(e){
					c && c();  //cc为返回的值
				}
			}else{
				c && c();
				return;  //pc端
			}
		},
		routerBack(){
        	this.backtoPage();
        }
	},
	beforeMount(){
		this.backNum=false;
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
	},
	mounted(){
		this.gainCache(res=>{
			this.cacheData=res.replace(/\'/g,"");
		});
	},
	watch: {
			
	},
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.wrapper{
		font-size:$fz28;
		color: $C333333;
		margin-top: 1rem;
	}
 .setGoodsInf>li>a{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
   ::-webkit-input-placeholder {
   	  font-size: $fz26; 
   	  color: #999;
	}
  
  .setGoodsInf>li>a{
  	padding: 0 .2rem;
  	height: 1rem;
  	justify-content: space-between;
  	background:#fff ;
  	margin-top:.2rem ;
  	color: $C333333;
  }
  .setGoodsInf>li .icon{
  	font-size: .3rem;
  }
  
.footer{
	width: 7.1rem;
	height: .9rem;
	line-height: .9rem;
	text-align: center;
	color: #fff;
	background: #E7580C;
	font-size: $fz36;
	border-radius:.1rem ;
	margin:  0.5rem auto 0 auto;
}
</style>

