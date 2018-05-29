<template>
	<div class="relaseActivity" :class="!getActivityOrder && 'bgbai'">
		<div>
			<div class="wrap">
				<div class="contentBox">
					<div class="titleBox">
						<div class="auto_title">
						      <input type="text" 
						      		 maxlength="30"
						      		 placeholder="填写发布的标题(不超过30个字符)" 
						      		 v-model="temp_value"
						      		 :readonly="getActivityEnlist ? true : false"/>
						</div>
						<!--<div class="auto_title" v-if="queryArr.type != 'post'">
						      <input type="text"  
						      		 placeholder="请选择活动开始时间" 
						      		@click="!getActivityEnlist?pickers('time_start'):null"
						      		 v-model="time_start?time_start.texts:time_start" 
						      		 readonly/>
						</div>
						
						<div class="auto_title" v-if="queryArr.type != 'post'">
						     <input type="text"  
						      		 placeholder="请选择活动结束时间" 
						      		@click="!getActivityEnlist ? pickers('time_end') : null"
						      		 v-model="time_end?time_end.texts:time_end" 
						      		 readonly/>
						</div>-->
					</div>
					
					 <div class="addBox">
						<com-release-detail @RestDataArr='RestDataArr'></com-release-detail>
					</div>
					<div class="boxContent">
						<div class="add">
							<div class="addItem" @click="bottomShow = !bottomShow">
								<span class="icon iconfont" v-html="icon.icon1"></span>
								<span class="addTitle">添加活动详情</span>
							</div>
						</div>
					</div>
					
					<div class="goodsBox" :class="getActivityOrder && getActivityOrder.length && 'activityOrder'" v-if="queryArr.type == 'activity'">
						<div class="addGoods">
						      <goods-content @goodsPromotion="goodsPromotion"></goods-content>
						</div>
						<div class="boxContent" :class="getActivityOrder && getActivityOrder.length && 'addContent'">
							<div class="add">
								<router-link :to="{path:'/activityOrder',query: queryArr}">
									<div class="addItem">
										<span class="icon iconfont" v-html="icon.icon1"></span>
										<span class="addTitle">添加活动商品</span>
									</div>
								</router-link>
							</div>
						</div>
					</div>
					<div class="footerItemDg"></div>
					<div class="footerItem">
						<p class="protocol">
							<span @click="ischecked=!ischecked">
								 <span  class="iconfont" 
								 		:class="ischecked?'selected':'unselected'" 
								 		v-html="ischecked?icon.icon2:icon.icon3">
								 		同意
								 </span>
							</span>
							<span class="xieyi"  @click="ischecked=!ischecked">《少花点商城服务协议》</span>
						</p>
						<p class="activityBtns">
							<router-link class="btn" :to="{path:'/activityPreview'}">预览</router-link>
							<span class="subBtn" @click="submit">
								<span class="subBtnTitle">立即发布</span>
							</span>
						</p>
					</div>
				</div>
			</div>
			
			
			<div class="itemWays" v-show="bottomShow">
				<div class="choseAddItem">
					<div class="swiper-container" id="swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(vo,key) in DataArr" @click="addData(vo.rest)">
								<input v-if="vo.name=='图片'" 
									class="addImageFile" 
									type="file" 
									accept="image/*" 
									multiple 
									@change="readAsDataURL" />
								<span class="icon iconfont" v-html="vo.icon"></span>
								<p>{{vo.name}}</p>
							</div>
						</div>
					</div>
				</div>
				<p class="cancle" @click="bottomShow = !bottomShow">
					<span class="btnCancle">取消</span>
				</p>
			</div>
			<div class="lineWrap" v-if="lineListShow">
				 <ul class="lineList">
				 	<li class="lineItem" v-for="(vo,key) in lineData" @click="addData('line',vo)">
			  	  	 	<img :src="vo.line" id="vo.lineId"/>
			  	  	 </li>
				 </ul>
				 <p class="cancle">
					<span class="btnCancle" @click="lineListShow = !lineListShow">取消</span>
				</p>
			</div>
		</div>
		<div class="mask" v-show="bottomShow" @click="bottomShow = !bottomShow"></div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import comReleaseDetail from './comReleaseDetail.vue'
	import goodsContent from './goodsContent.vue'
	export default {
		data() {
			return {
				icon: {icon1: "&#xe6cc;",icon2: "&#xe653;",icon3: "&#xe629;"},//图标
				lineData:[
					{line:require('src/assets/img/xuxian.png'),lineId:111111},
	            ],//分割线集合
	            DataArr : [
		            {name:'文字',icon: "&#xe63f;",rest: 'text',},
		            {name:'图片',icon: "&#xe6a4;",rest: 'img',},
		            {name:'视频',icon: "&#xe643;",rest: 'video',},
		            {name:'分割线',icon: "&#xe671;",rest: 'line',}
	            ],//按钮
	            tips: [
					{name: "temp_value",content: "标题不能为空"},
					{name: "time_start",content: "开始时间不能为空"},
					{name: "time_end",content: "结束时间不能为空"},
					{name: "dataArr",content: "请添加详情内容"},
					{name: "ischecked",content: "请同意少花点商城服务协议"}
				],
				ischecked: false,//是否同意协议
				
				queryArr: {},//路由数据
				
				temp_value: null,//标题
				
				time_start: null,//结束时间
				time_end: null,//开始时间
				
				bottomShow: false,//是否显示底部
				lineListShow:false,//是否显示分隔线
				add: {
					isAdd:false,//是否插入
				},
				
				dataArr: [],//活动详情
				orderArr: [],//商品详情
				
				address: null,
				
				titleImg: null,
			}
		},
		components: {
			'com-release-detail': comReleaseDetail,
			'goods-content':goodsContent
		},
		computed: {
	      ...mapGetters([
	          'userInfo',
	          'getXToken',
	          'getUserData',
	          'getXToken',
	          'getActivityOrder',
	          'getActivityArr',
	          'getAddBoxArr',
	          'getActivityEnlist',
	      ]),
	    },
		watch: {
			address(e){
				this.setArr();
			}
		},
		created(){
			this.queryArr = {
				type : this.$router.currentRoute.query.type,
				id : this.$router.currentRoute.query.id,
			}
			if(this.queryArr.type == 'post'){
				this.time_start = {
				 	texts:	this.getLocalTime1(new Date() / 1000),
					datas:  new Date()
				}
				this.time_end = {
				 	texts:	this.getLocalTime1(new Date() / 1000),
					datas:  new Date()
				}
			}
		},
		mounted() {
			let enlist = this.getActivityEnlist,arr = this.getActivityArr;
			if(enlist){
				this.address = enlist["address"].val;
				this.temp_value = enlist["title"].val;
				this.time_start = {
					texts:enlist["startTime"].val,
					dates:enlist["startTime"].time,
				}
				this.time_end = {
					texts:enlist["endTime"].val,
					dates:enlist["endTime"].time,
				}
				this.titleImg = arr && arr["titleImg"] ? arr["titleImg"] : null;
				this.ischecked = arr &&  arr["ischecked"] ? arr["ischecked"] : null;
				this.setArr();
				this.uploads();
			}else{
				if(!this.address){
					this.Geolocation();
				}
			}
			this.getArr();
		},
		methods: {
			setArr(){
				this.$store.dispatch('setActivityArr',{
					temp_value	: 	this.temp_value,		//标题
					time_start	: 	this.time_start,		//开始时间
					time_end	: 	this.time_end,			//结束时间
					queryArr	:   this.queryArr,			//type和id
					orderArr  	: 	this.getActivityOrder,	//商品.
					dataArr     :   this.getAddBoxArr,
					ischecked	:   this.ischecked, 		//是否选中
					address		:   this.address,			//地址
					titleImg	: 	this.titleImg,
				})
			},
			getArr(){
				let arr1 = this.getActivityArr,
					arr2 = this.queryArr;
					if(!this.isnull(arr2)){
						if(!this.isnull(arr1)){
							let tp = arr1.queryArr.type != arr2.type,
							i = arr1.queryArr.id != arr2.id;
							if(tp || i){
								this.$store.dispatch('setActivityArr',[]);
								this.$store.dispatch('setActivityOrder',[]);
								this.$store.dispatch('setAddBoxArr',[]);
							}
						}
					}
				for(var item in this.getActivityArr){
					this.$set(this,item,this.getActivityArr[item]);
				}
			},
			RestDataArr( o){
				this.add = {
					isAdd: true,
					k: o.k
				}
				this.bottomShow = !0;
				
			},
			goodsPromotion( o){
				let data = this.queryArr;
					data.add = {
						isAdd: true,
						k: o.k
					};
				this.$router.push({path:'/activityOrder',query: data})
			},
			addData( e, res){
				let 
				_self = this,
				func = {
					line( e){
						_self.lineListShow = true;
						if( res){
							_self.addBox( e, res);
						}
					},
					text( e){
						_self.addBox( e,{
							value: ''
						});
					},
					img( e){
						if(res){
							_self.addBox( e, res);
						}
					},
					video( e){
						_self.prompt({
							content: "视频地址",
							placeholder: "请输入视频地址",
							callback: (bool, o)=>{
								if(bool){
									_self.addBox( e, {
										src: o
									});
								}
							}
						})
					},
				}
				func[e]( e);
			},
			addBox( type,data){
				if(!this.add.isAdd){
					this.getAddBoxArr.push({
						type,
						data
					});
				}else{
					this.getAddBoxArr.splice(Number(this.add.k) + 1,0,{
						type,
						data
					});
				}
				this.$store.dispatch('setAddBoxArr',this.getAddBoxArr)
				this.bottomShow = false;
				this.lineListShow = false;
				this.isAdd = false;
			},
			readAsDataURL( e){
				try{
					var f = new FileReader(),files = e.currentTarget.files[0];
						f.readAsDataURL(e.currentTarget.files[0]);
					f.onload = (f) => {
						let imgArr = {
							f : f.target.result,
							files,
						}
						this.addData('img',imgArr)
					};
				}catch( e){
					
				}
			},
			isnull( t){
				if(t == "" || t == null || t == undefined || (typeof t == 'object' && t.length <= 0))
					return true;
				
				return false;
			},
			isTips( b){
				let arr = this.getActivityArr;
				if(!arr){
					return;
				}
				let t,a,
				
				tips = this.tips,
				activity = (arr.queryArr.type == 'activity');
				if(activity){
					tips.push({name: "orderArr",content: "请添加活动商品"})
				}
				for(var item in tips){
					t=arr[tips[item].name];
					a=tips[item].content;
					if(this.isnull(t)){
						this.toastMsg(a);
						return;
					}
				}
				b && b();
			},
			forEachs( arr, c){
				if(this.isnull(arr)){
					c && c();
					return;
				}
				for(var i in arr){
					c && c( i,arr[i]);
				}
			},
			setfiles(url,c){
				return new Promise((resolve, reject)=>{
					if(typeof url == "object"){
						this.oss(url,storeAs=>{
							/*http://pengchuang.oss-cn-shenzhen.aliyuncs.com/*/
							let u = "http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/" + storeAs;
							c && c(u);
							resolve && resolve(u);
						})
					}else{
						c && c();
						/*reject && reject()*/
					}
				});
			},
			restFiles(img,c,b){
				if(img.length <= 0){
					c && c(false);
					return;
				}
				let u,data,arr,
				getArr=this.getActivityArr,
				activity = (getArr.queryArr.type == 'activity');
				if(!b){
					arr = getArr.dataArr;
				}else{
					if(activity){
						arr = getArr.orderArr;
					}else{
						c && c(false);
						return;
					}
				}
				this.forEachs(img,(i,o)=>{
					u = !b ? o.data.files : o.img.files;
					this.setfiles(u,res=>{
						if( res){
							!b ? arr[o.key].data.files = res : arr[o.key].img.files = res;
							arr.splice(o.key,1,arr[o.key]);
						}
						if(img.length - 1 == i){
							c && c(true);
							return;
						}
					})
				})
			},
			submit(){
				this.isTips(()=>{
					let arr = this.getActivityArr.dataArr,
						orderArr = this.getActivityArr.orderArr,
						enlist = this.getActivityEnlist,
						imgArr = [],
						imgArr1 = [];
						this.$store.dispatch('setLoadingState', true);
						this.forEachs(arr,(i,o)=>{
							if(o){
								if(o.type == "img"){
									o.key = i;
									imgArr.push(o);
								}
							}
						})
						this.forEachs(orderArr,(i,o)=>{
							if(o){
								if(o.img){
									o.key = i;
									imgArr1.push(o);
								}
							}
							
						})
						this.$nextTick(()=>{
							this.restFiles(imgArr,(bool)=>{
								this.restFiles(imgArr1,(bool)=>{
									if(enlist && this.isnull(this.titleImg)){
										this.setfiles( enlist["img"].files,res=>{
											if(res){
												this.titleImg = res;
												this.setArr();
											}
											this.uploads(imgArr,true);
										})
									}else{
										this.uploads(imgArr,true);
									}
								},true)
							})
						})
						
						
						return;
					
				})

			},
			uploads(img,isPost){
				let url = "activity/publish",
					arr = this.getActivityArr,
					orderArr = this.getActivityArr.orderArr,
					queryArr = this.getActivityArr.queryArr,
					enlist = this.getActivityEnlist,
					imgArr = !this.isnull(img) ? img[0].data.files : null,
					data = {
						publishType: queryArr.type,//	String	Y		发布类型 ，post（帖子） activity( 活动)，enroll (报名)，live(视频)
						title: arr.temp_value,//	String	Y		主题标题（报名/帖子/活动/视频）
						content: this.contentArr(),//	String	Y		主题内容（报名/帖子/活动/视频）
						titleImg: imgArr,//	String	N		封面图片地址
						publishTypeId:queryArr.id,//	String	Y		主题分类ID
						/*address: this.address,//	String	N		地址（发布活动及报名时需要填写）
						goods: this.goodsArr(),//	String	N		商品列表，详细参考下方备注中的请求参数示例
						tel:this.getXToken.phone,//	String	N		咨询电话（报名）
						limitPersons:0,*///	int	N	0	活动限制人数（0表示不限制）
						summary:this.contentText().substring(0,100),//摘要，用于前端列表页面展示
						/*startTime: Number(arr.time_start.dates),//	date	N		活动开始时间，时间戳：如：1496904590000
						endTime: Number(arr.time_end.dates),//	date	N		活动结束时间，时间戳：如：1496904590000
						contentUrl: this.videoUrl(),*///	String	N		视频地址
					};
					if(enlist){
						data["goods"] = enlist["goods"].data;
						data.needUsername= enlist["enlist"].data.item[0].must ? 1 : 0;
						data.needTe = enlist["enlist"].data.item[1].must ? 1 : 0;
						data.tel = enlist["enlist"].data.val;
						data.titleImg = this.titleImg;
						this.$store.dispatch("setActivityDetail",data)
					}
					console.info(data)
				if(isPost){
					this.getByUrl({data,url}, res=>{
						this.ajax({
							url : res.url,
							data : res.data,
							success:( res)=>{
								console.info(res)
								if(res.meta.code == "10000"){
									
									this.activityMyList1({},bool=>{
										this.$store.dispatch('setLoadingState', false);
										this.$store.dispatch('setActivityArr',[]);
										this.$store.dispatch('setActivityOrder',[]);
										this.$store.dispatch('setAddBoxArr',[]);
										this.temp_value = null;
										this.time_start = null;
										this.time_end = null;
										this.titleImg = null;
										this.ischecked	= false;
										this.address = null;
										this.toast("上传成功","success");
										setTimeout(()=>{
											this.$router.go(-2);
											//this.$router.replace({path:"/activityRelease"})
										},1000)
										
									})
									
								}
							}
						});
					});
				}
			},
			contentArr(){
				
				let content = "<div class='ap_list'>",type,boxArr=this.getActivityArr.dataArr;
				/*for(let i in boxArr){
					type = boxArr[i].type;
					if(type == "text"){
						content += "<p class='ap_text'>" +boxArr[i].data.html + "</p>"
					}else if(type == "img"){
						content += "<div class='ap_img'><img src='" +boxArr[i].data.files + "' /></div>"
					}else if(type == "line"){
						content += "<div class='ap_line'><img src='" +boxArr[i].data.files + "' /></div>"
					}else if(type == "video"){
						content += "<div class='ap_video'>" +boxArr[i].data.files + "</div>"
					}
				}
				content += "</div>";
				return content;*/
				for(let i in boxArr){
					type = boxArr[i].type;
					if(type == "text"){
						
					}else if(type == "img"){
						boxArr[i].data.f = boxArr[i].data.files;
					}else if(type == "line"){
						
					}else if(type == "video"){
						
					}
				}
				return JSON.stringify(boxArr);
				
			},
			contentText(){
				let content = "",type,boxArr=this.getActivityArr.dataArr;
				for(let i in boxArr){
					type = boxArr[i].type;
					if(type == "text"){
						content += boxArr[i].data.html;
						if(!boxArr[Number(i) + 1] || boxArr[Number(i) + 1].type != "text"){
							return content;
						}
					}
				}
				return content;
			},
			goodsArr(){
				let goods = [],orderArr = this.getActivityArr.orderArr;
				for(var item in orderArr){
					goods.push({
						goodImgs: orderArr[item].img.files,
						goodName: orderArr[item].name,
						sellPrice: orderArr[item].price,
						limits: Number(orderArr[item].num),
						remark:	orderArr[item].container,
					})
				}
				goods = (goods && goods.length) ? goods : null;
				return goods;
			},
			videoUrl(){
				let type,boxArr=this.getActivityArr.dataArr;
				for(let i in boxArr){
					type = boxArr[i].type;
					if(type == "video"){
						return boxArr[i].data.src;
					}
				}
				return null;
			},
		},
		
		
		updated(){
			this.setArr();
		},
	}
</script>

<style lang="scss" scoped>
@import "~src/assets/css/function.scss";

.wrap {
	width: 100%;
	height: 100%;
}
.relaseActivity{
	height: 100%;
	
}
.bgbai{
	background-color: #FFFFFF;
}
.titleBox{
	width:100%;
	background:#FFFFFF;
}
.boxContent{
	width:100%;
    padding:.2rem;
	background: #FFFFFF;
}
.pd2{
	padding: .2rem;
}
.BoxContent{
	background:#FFFFFF;
}
.goodsBox{
	width:100%;
	background:#FFFFFF;
	/*min-height: calc(70vh);*/
}
.GoodsBox{
	background: #e6e6e6;
	min-height:0;
}
.goodsContain{
	background: #FFFFFF;
	padding:.2rem 0;
	border-radius:.1rem;
}
.add {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-content: center;
}
.addBox{
	overflow: hidden;
	padding: .2rem;
	padding-top: 0;
	background-color: #FFFFFF;
}
.addItem {
	margin: 0 auto;
	display: block;
	width: 100%;
	height: .9rem;
	line-height: .9rem;
	text-align: center;
	font-size: $btnSize;
	color: $communityMainColor;
	background: #FFFFFF;
	border-radius: $btnBorderRadius;
	border: 1px solid $communityMainColor;
}
.footerItemDg{
	height:1.7rem;
	width: 100%;
}
.footerItem {
	border-top: 1px solid #C7C7CC;
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color:#e6e6e6;
	.protocol {
		height: .8rem;
		line-height: .8rem;
		font-size: .26rem;
		color: #333;
		.iconfont {
			padding-left: .2rem;
			color: #333;
			font-size: .32rem;
		}
		.selected {
			color: red;
		}
		.xieyi {
			color: $communityMainColor
		}
	}
	.activityBtns{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.subBtn,.btn{
		display: block;
		width:50%;
		height: .9rem;
		line-height: .9rem;
		margin-bottom: 0;
		text-align: center;
		font-size: $btnSize;
		color: #FFFFFF;
		background: $communityMainColor;
		border: none;
	}
	.btn{
		color:#333;
		background: #FFFFFF;
	}
}

.itemWays {
	position: fixed;
	width: 100%;
	bottom: 0;
	z-index: 66;
	background: #E6E6E6;
	display: block;
	font-size: .26rem;
}

.choseAddItem {
	text-align: center;
	padding: .4rem 0;
	color: #333333;
	background: #fff;
}

.choseAddItem .icon {
	font-size: .6rem;
	border:solid 1px #EBEBEB;
	border-radius: .3rem;
	display: block;
	height: 1rem;
	width: 1rem;
	padding: 0rem .2rem;
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: .1rem;
}
.choseAddItem .addLine{
	border:solid 1px red;
}
.cancle {
	display: block;
	width: 100%;
	height: 1rem;
	line-height: 1rem;
	color: #333333;
	text-align: center;
}

.btnCancle {
	padding: 0 .3rem;
}

.mask {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, .5);
	left: 0;
	top: 0;
	display: block;
}

.swiper-wrapper .swiper-slide {
	width: 1.85rem;
	position: relative;
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    flex-direction: column;
}
.addImageFile{
	position: absolute;
	width:100%;
	height:100%;
	opacity: 0;
}
.lineWrap{
	position: fixed;
	width: 100%;
	bottom: 0;
	z-index: 100;
	background: #E6E6E6;
	display: block;
	font-size: .26rem;
}
.lineList{
	background: #FFFFFF;
}
.lineItem{
	display: inline-block;
	width:24%;
	height:1rem;
}
.lineItem img{
	width:100%;
	height:100%;
}

.activityOrder{
	width: auto;
	margin: .2rem;	
	padding: .25rem;
	.addItem{
		width: 100%;
	}
	.addContent{
		padding: .2rem 0;
	}
}
.auto_title{
   		padding: .2rem;
   		input{
   			box-sizing: border-box;
   			width: 100%;
   			padding: .2rem;
   			border:1px solid #EAEAEA;
   			font-size: .28rem;
   			border-radius: .06rem;
   		}
   }
.auto_title:not(:first-child){
	padding: 0 .2rem;
	padding-bottom: .2rem;
}



.content_main{
	background:#FFFFFF;
	padding: .4rem .2rem;
	.temp_value{
		font-weight: bold;
		font-size: .36rem;
		color: #333333;
		padding-bottom: .15rem;
		line-height: .36rem;
	}
	.boxContent{
		position: relative;
		background: #ffffff;
		.auto-textarea-wrapper{
	  	 	position: relative;
	  	 	padding-bottom: .2rem;
   	        border-radius: .06rem;
			.auto-textarea-block{
	   	        font-size: .3rem;
	   	        word-break:break-all; 
	   	        word-wrap:break-word;
	   	        left: 0;
	   	        top: 0;
	   	        color: #333333;
	   	        line-height: .45rem;
	   	    }
	   	}
	   	.dragPerBg{
	   		padding-bottom: .2rem;
	   	}
	}
	
}
</style>

