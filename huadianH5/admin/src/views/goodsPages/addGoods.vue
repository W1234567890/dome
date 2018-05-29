<template>
	<div class="wrapper">
		<div class="headeRight" @click="isSubMitSuccee ? '' : finishSet()">
			<span>完成</span>
	   </div>
	   <!--上传的图片轮播图-->
		<div class="ratation-banner" v-show="!isHeaderShow"rr>
	    	<div class="ratation-container">
	          	 <div class="swiper-wrapper" :style="{height:bannerHight+'px'}">
	          		<div class="swiper-slide" v-for="(vo,key) in rotationBanner">
	          			<img :src="vo"/>
	          		</div>
	          	 </div>
	          	 <router-link :to="{path:'/goodsImgPreview',query:{id:0}}">
	          	 	 <img class="photoIcon" :src="t_photo" />
	          	 </router-link>
		      </div>
	    </div>
		<header class="header" v-if="isHeaderShow">
			<div class="addGoodsPic">
				 <img class="t_photo" :src="t_photo" />
			     <span>添加商品图片</span>
			</div>
			<div class="img-uploader"  ref="uploader">
			    <div class="img-uploader-preview-list"> </div>
			    <label :for="inputId" class="img-uploader-label"></label>
			    <input
			      style="display: none"
			      :id="inputId"
			      ref="input"
			      type="file"
			      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
			      multiple="multiple"
			      @change="handleFileChange"/>
			</div>
		</header>
		<!--商品名称-->
		<textarea class="goodsName" placeholder="请填写商品名称" v-model="goodsName" ></textarea>
		<!--运费，类目等选项操作-->
		<ul class="setGoodsInf">
			<li v-for="(item,key) in data" @click="(key==3||key==4) ? popItem(item,key) :((key<=2 ? conserveSate(): ''))">
				<router-link :to="{path:item.routerUrl}">
					<span>{{item.txt}}</span>
					<span v-if="key<5">
						<span class="curSelect">{{item.txt1}}</span>
						<span class="icon iconfont rightArrow" v-html="item.icon"></span>
					</span>
					<input class="deduction" id="deduction" v-if="key==8" type="text" :placeholder="item.txt1" v-model="deductionNum"/>
					<div class="mg-switch" @click="switchState(item,key)"  v-if='key>=5&&key<8 ? true : false' :class="item.isOn ? 'active' : ''"> 
						<div class="circle" :class="item.isOn ? 'active' : ''"></div>
					</div>
				</router-link>
			</li>
		</ul>
		
		<div class="popWin" v-if="isPopWinShow">
			<div class="contentBox">
				<!--运费类型选择-->
				<div class="" v-if='selectItemShow'>
					<ul class="settingList">
						<li class="title">运费</li>
						<li v-for="(item,key) in dataList" @click="selectFreightType(item.templateName,key,item.id)">
							<span id="" class="radioBox" :class="key==cIndex ? 'active' :''">
								<span class="icon iconfont">&#xe707;</span>
							</span>
							<div class="matter">{{item.templateName}}</div>
						</li>
					</ul>
				</div>
				<!--发票类型选择-->
				<ul class="settingList" v-if='!selectItemShow'>
					<li class="title">发票类型</li>
					<li v-for="(item,key) in billList" @click="selectBillType(item,key)">
						<span id="" class="radioBox" :class="item.state ? 'active' :''">
							<span class="icon iconfont">&#xe707;</span>
						</span>
						<div class="matter">{{item.matter}}</div>
					</li>
				</ul>
				
				<div class="operateBtn">
					<span @click="cancleOperate()">取消</span>
					<span @click="finishOperate()">确定</span>
				</div>
			</div>
		</div>
	</div>
</template> 
<script>
/*import resizeImage from '@/assets/js/resize'*/
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			title:"添加商品",
			inputId: '',
	        // 文件名
	        bannerHight:null,
			showTitle:true,
			title:"添加商品套餐",
			goodsIndex:0,
			t_photo:"http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500546809204addCamcer.png",
			isAdd:false,
			sizeCount:1,
			curKey:true,
			isHeaderShow:true,
			isPopWinShow:false,
			isSubMitSuccee:false,
			selectItemShow:false,
			freightType:'请选择',
			bannerTime:1000,
			curIndex:null,
			dragPerImgs:[],
			imgList:[],
			goodsImgList:'',
			cIndex:null,
			conditionStore:{
				id:'',
		      	goodsName:'',
		      	categoryId:'',
		      	categoryName:'',
		      	logisticsTemplateName:'',
		      	logisticsTemplateId:'',
		      	isjp:'NO',
		      	iszx:'NO',
		      	istj:'NO',
		      	invoiceType:'',
		      	guige:"请选择",
		      	leimu:'',
		      	yunfei:'请选择',
		      	fpName:'请选择',
		      	nisjp:false,
		      	niszx:false,
		      	nistj:false,
			},
			len:0,
			cacheObj:[],
			goodsName:null,
			billStr:'',
			dataList:[],
			goodsInf:{
		      	imgArrays:'',
		      	productsList:[],
			},
			rotationBanner:[
            ],
            billList:[{
            	matter:"纸质发票",
            	state:false,
            },{
            	matter:"电子发票",
            	state:false,
            },{
            	matter:"增值税发票",
            	state:false,
            }],
			data:[{
				txt:"商品规格",
				icon:"&#xe608;",
				routerUrl:"/addSpecification",
				txt1:"请设置商品规格",
			},{
				txt:"商品详情",
				icon:"&#xe608;",
				routerUrl:"/addGoodsDetail",
				txt1:"请添加商品详情",
			},{
				txt:"类目",
				icon:"&#xe608;",
				routerUrl:"/categoryList",
				txt1:"请选择",
			},{
				txt:"运费",
				icon:"&#xe608;",
				txt1:"请选择",
			},{
				txt:"发票类型",
				icon:"&#xe608;",
				txt1:"请选择发票类型",
			},{
				txt:"推荐",
				isOn:false,
			},{
				txt:"精品",
				isOn:false,
			},{
				txt:"最新",
				isOn:false,
			},{
				txt:"抵扣券",
				icon:"&#xe608;",
				txt1:"请填写抵扣金额",
			}],
			deductionNum:0
		}
	},
	props: {
      // 文件更改回调
      onChange: {
        type: Function
      },
    },
	methods: {
		//是否推荐,精品，最新，发票 开关
		switchState(item,key){
			this.curIndex = key;
			item.isOn = !item.isOn;
			//是否推荐
			if(key==5){
				if(item.isOn){
					this.conditionStore.istj = "YES";
					this.conditionStore.nistj = true;
				}else{
					this.conditionStore.istj = "NO";
					this.conditionStore.nistj = false;
				};
			};
			//是否精品
			if(key==6){
				if(item.isOn){
					this.conditionStore.isjp = "YES";
					this.conditionStore.nisjp = true;
				}else{
					this.conditionStore.isjp = "NO";
					this.conditionStore.nisjp = false;
				};
			};
			//是否最新
			if(key==7){
				if(item.isOn){
					this.conditionStore.iszx = "YES";
					this.conditionStore.niszx = true;
				}else{
					this.conditionStore.iszx = "NO";
					this.conditionStore.niszx = false;
				};
			};
			this.$store.dispatch('storeSate',this.conditionStore);
		},
		//弹出运费 或者发票选择窗口
		popItem(item,key){
			this.flag = key;
			if(key == 3){
				this.selectItemShow = true;
				this.isPopWinShow = true;
				return ;
			};
			if(key==4){
				this.selectItemShow = false;
				this.isPopWinShow = true;
				return ;
			}
		},
		//关闭运费 或者发票选择窗口
		cancleOperate(){
		 	this.isPopWinShow = false;
		},
		//运费选择
		selectFreightType(item,key,id){
			this.cIndex = key;
			this.conditionStore.logisticsTemplateId = id;
			this.conditionStore.logisticsTemplateName = item;
			this.freightType = item;
			this.$store.dispatch('storeSate',this.conditionStore);
		},
		//发票选择
		selectBillType(item,key){
			this.billList[key].state = !this.billList[key].state;
		},
		//确定 选择的运费 或者发票选项
		finishOperate(){
			this.conditionStore.invoiceType = '';
			this.billStr = '';
			for(var i=0;i<this.billList.length;i++){
				if(this.billList[i].state){
					if(this.billList[i].matter == '电子发票'){
						this.conditionStore.invoiceType += "DZFP," ;
					};
					if(this.billList[i].matter == '纸质发票'){
						this.conditionStore.invoiceType += "PT," ;
					};
					if(this.billList[i].matter == '增值税发票'){
						this.conditionStore.invoiceType += "VAT" ;
					};
					this.billStr +=this.billList[i].matter+',';
				};
			};
			this.$store.dispatch('storeSate',this.conditionStore);
			//所选发票字段
			if(this.flag==4){
				if(this.billStr == ''){
					this.data[this.flag].txt1 = "请选择";
				}else{
					this.data[this.flag].txt1 = this.billStr.substring(0,this.billStr.length-1);
				}
				this.conditionStore.fpName = this.data[this.flag].txt1;
				this.$store.dispatch('storeSate',this.conditionStore);
				this.isPopWinShow = false;
				return ;
			};
			//所选运费字段
			if(this.flag==3){
				this.data[this.flag].txt1 = this.freightType;
				this.conditionStore.yunfei = this.data[this.flag].txt1;
				this.$store.dispatch('storeSate',this.conditionStore);
				this.isPopWinShow = false;
				return ;
			};
		},
		//图片处理相关函数
		handleFileChange(e){
	        let input = this.$refs.input;
	        let files = input.files;
	        this.isHeaderShow = false;
	        let _this = this;
	    	if(files.length>5){
	    		this.isHeaderShow = true;
	    		this.toastMsg("上传图片数不能超过5张");//底部弹窗
	    		return ;
	    	}else{
	    		let _this = this;
		        if (!files || !window.FileReader) return;
		        for (let i = 0; i < files.length; i++) {
			          let file = files[i];
			          let reader = new FileReader();
			          this.dragPerImgs.push(e.currentTarget.files[i]);
			          reader.onload = function (e) {
			          	_this.rotationBanner.push(e.target.result);
			            	_this.$store.dispatch('goodsImg',_this.rotationBanner);
			            /*resizeImage(e.target.result, 150, 150, function (result) {
			             	//_this.dragPerImgs.push(e.target.result);
			            	_this.rotationBanner.push(e.target.result);
			            	_this.$store.dispatch('goodsImg',_this.rotationBanner);
			            })*/
			          }
			          reader.readAsDataURL(file);
			        }
		    	};
		    	this.$store.dispatch('imgCache', this.dragPerImgs);
	    	this.initialSwiper();
	    },
	    //初始化swiper
	    initialSwiper(){
	    	$(".ratation-container").append("<div class='swiper-pagination'></div>");
 	    	var ratationSwiper = new Swiper('.ratation-container', {
		        autoplay: this.bannerTime,
		        autoplayDisableOnInteraction : false,
		        loop: true,
		        pagination:'.swiper-pagination',
		        observer:true,
				observeParents:true,
	       });
		    // 防止多个组件之间干扰
		    this.inputId = this.id || Math.round(Math.random() * 100000);
		},
		//获取后台运费选项列表
		getData(){
			let  data = {},
			url="logisticsTemplate/list";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						//console.log(res);
						for(let i=0;i<res.data.list.length;i++){
							this.dataList.push({
								templateName:res.data.list[i].templateName,
								id:res.data.list[i].id,
							})
						};
					}
				});
			});
		},
		//提交数据到后台方法
		goodsSave(){
			 if(this.goodsInf.imgArrays ==''){
					this.toastMsg("发布中，敬请期待！");
			 };
			this.$nextTick(()=>{
				let imgArr=this.$store.state.goodsImgStore.imgCache;
				this.upLoadImg(imgArr,(bool)=>{
					if(bool){
						//console.info(this.goodsInf.imgArrays)
						this.$store.dispatch('setLoadingState', false);
						this.goodsInf.goodsName = this.goodsName;//商品名称
						//this.goodsInf.imgArrays = this.goodsInf.imgArrays.substring(0,this.goodsInf.imgArrays.length-1);
							let  data = this.goodsInf,
							url="goodsmanager/update";
							//console.log(data);
							this.getByUrl({data,url}, res=>{
								this.ajax({
									url : res.url,
									data : res.data,
									success:( res)=>{
										//console.log(res);
										if(res.meta.code == '10000'){
											this.$store.dispatch('setLoadingState', false);
											this.conditionStore = {};
											this.goodsInf = {};
											this.$store.dispatch('classify',{});
											this.$store.dispatch('imgCache',[]);
											this.$store.dispatch('storeSate',{guige:'请选择',leimu:'请选择',yunfei:'请选择',fpName:'请选择'});
											this.$store.dispatch('goodsImg',[]);
											this.$store.dispatch('goodsStandard',[]);
											this.$store.dispatch('setActivityDetail',[]);
											this.$store.dispatch('setActivityArr',[]);
											this.$store.dispatch('setActivityOrder',[]);
											this.$store.dispatch('setAddBoxArr',[]);
											this.toastMsg("发布成功！");
											setTimeout(()=>{
												this.$router.go(-1);
											},1500);
										}else{
											this.isSubMitSuccee = false;
											this.toastMsg("发布失败！");
										};
									}
								});
						 });
					}
			   })
			});
		},
		upLoadImg(img,c){
			let u,imglength=0;
			//获取oss图片路径
			this.forEachs(img,(i,o)=>{
					u = o;
					this.setfiles(u,res=>{
						++imglength;
						this.goodsInf.imgArrays+=res+",";
						if(img.length == imglength){
							   this.goodsInf.imgArrays=this.goodsInf.imgArrays.substring(0,this.goodsInf.imgArrays.length-1);
								c && c(true);
							    return;
						 }
					})
				})
		},
		forEachs( arr, c){
				for(var i in arr){
					c && c( i,arr[i]);
				}
			},
		
		//商品图片
		setfiles(u,c){
			if(typeof u == "object"){
				this.oss(u,storeAs=>{
					let u = "http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/" + storeAs;
					c && c(u);
				})
			}else{
				c && c();
			}
		},
		//选项状态保存
		conserveSate(){
			this.conditionStore= this.$store.state.goodsImgStore.storeSate;
			this.conditionStore.goodsName  = this.goodsName;
			if(this.haveSet=="已选择"){
		    	 this.conditionStore.guige = this.haveSet;
		    };
		    this.$store.dispatch('storeSate',this.conditionStore);
		},
		//完成设置并且提交数据
		finishSet(){
			//this.$router.back();
			if(this.rotationBanner.length<1){
				this.toastMsg("请上传商品图片");
				return ;
			};
			if(this.goodsName == '' || this.goodsName == undefined){
				this.toastMsg("请填写商品名称");
				return ;
			};
			
			if(this.data[0].txt1 == '请设置商品规格'){
				this.toastMsg("请设置商品规格");
				return ;
			};
			if(this.data[1].txt1 == '请添加商品详情'){
				this.toastMsg("请添加商品详情");
				return ;
			};
			if(this.data[2].txt1 == '请选择'){
				this.toastMsg("请选择类目");
				return ;
			};
			if(this.data[3].txt1 == '请选择'){
				this.toastMsg("请选择运费");
				return ;
			};
			/*if(this.data[4].txt1 == '请选择'){
				this.toastMsg("请选择发票类型");
				return ;
			};*/
			//是否开发票
			if(this.data[4].txt1=="请选择"){
				 this.goodsInf.isInvoice = "NO";
			}else{
				this.goodsInf.isInvoice = "YES";
			};
			//获取存储的返后台数据
			let arrList = this.$store.state.goodsImgStore.storeSate;
			this.goodsInf.content = this.getActivityDetail.content;
		    this.goodsInf.goodsName = arrList.goodsName;
		    this.goodsInf.categoryId = arrList.categoryId;
		    this.goodsInf.categoryName = arrList.categoryName;
		    this.goodsInf.logisticsTemplateName = arrList.logisticsTemplateName;
		    this.goodsInf.logisticsTemplateId = arrList.logisticsTemplateId;
		    this.goodsInf.isjp = arrList.isjp;
		    this.goodsInf.iszx = arrList.iszx;
		    this.goodsInf.istj = arrList.istj;
		    this.goodsInf.invoiceType = arrList.invoiceType;
		    if(this.userExRole!='oneyuan'){
		    	this.goodsInf.discountWorth=this.deductionNum;
		    }
		    this.isSubMitSuccee = !this.isSubMitSuccee;
		    this.$store.dispatch('setLoadingState', true);
			this.goodsSave();//调用提交数据方法
		}
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
          'getActivityDetail',
          'goodsStandard'
      ]),
    },
	beforeMount(){
		let store= this.$store.state.goodsImgStore.storeSate;
		this.userExRole=this.getXToken.userExRole;
		 if(this.userExRole=='oneyuan'){
				 this.data.pop();
	    }
		if(store){
			this.data[0].txt1 = store.guige;
			this.data[2].txt1 = store.leimu;
			this.data[3].txt1 = store.yunfei;
			this.data[4].txt1 = store.fpName;
			this.data[5].isOn = store.nistj;
			this.data[6].isOn = store.nisjp;
			this.data[7].isOn = store.niszx;
			this.deductionNum = store.deductionNum;
			this.goodsName = store.goodsName;
		}
		this.bannerHight =window.screen.width;
		this.getData();
		this.initialSwiper();
	 	this.$store.dispatch('showTitle',this.showTitle);
	    this.$store.dispatch('title',this.title);
		//从缓存中取商品图片
		if(this.$store.state.goodsImgStore.goodsImg.length>0){
	    	this.isRoationBannerShow = true;
	    	this.isHeaderShow = false;
			this.rotationBanner = this.$store.state.goodsImgStore.goodsImg;
			//console.log(this.rotationBanner)
		}else{
			this.isHeaderShow = true;
		};
		//从缓存中取oss图片路径
		if(this.$store.state.goodsImgStore.imgCache.length>0){
			this.imgList = this.$store.state.goodsImgStore.imgCache;
		}
		//从缓存中取商品规格
		let goodsStandardList= this.$store.state.goodsImgStore.goodsStandard;
		let len= goodsStandardList.length;
		if(len>0){
			for(var i=0;i<goodsStandardList.length;i++){
				this.cacheObj = {};
				this.goodsInf.productsList.push({
					id: "",
					marketPrice: goodsStandardList[i][goodsStandardList[i].length-5].content,
					sellPrice:goodsStandardList[i][goodsStandardList[i].length-4].content,
					costPrice: goodsStandardList[i][goodsStandardList[i].length-3].content,
					storeNum: goodsStandardList[i][goodsStandardList[i].length-2].content,
					weight: goodsStandardList[i][goodsStandardList[i].length-1].content,
					goodsId: "",
					specList:[]
				});
				for(var y=goodsStandardList[i].length-6;y>=0;y--){
					this.cacheObj = {
						id: goodsStandardList[i][y].id,
	                    specName: goodsStandardList[i][y].matter,
	                    specValue: goodsStandardList[i][y].content,
					};
					this.goodsInf.productsList[i].specList.push(this.cacheObj);
				};
			};
		};
		
	    //是否设置了商品规格
	    if(this.goodsStandard.length){
	    	this.conditionStore = this.$store.state.goodsImgStore.storeSate;
	    	this.conditionStore.guige = "已设置";
	    	this.data[0].txt1 = '已设置';
	    	this.$store.dispatch('storeSate',this.conditionStore);
	    };
	    //是否设置了商品详情
	    if(this.getActivityDetail&&this.getActivityDetail.content){
	    	this.data[1].txt1 = "已添加";
	    };
		//是否选择了分类
		let classify = this.$store.state.goodsImgStore.classify;
		if(classify.categoryId){
		    	this.conditionStore = this.$store.state.goodsImgStore.storeSate;
		    	this.category = this.$router.currentRoute.query.category;//分类名称和分类id
		   		this.conditionStore.categoryId = classify.categoryId;
		 		this.conditionStore.categoryName = classify.name;
		 		this.conditionStore.leimu = classify.name;
		 		this.data[2].txt1 =classify.name;
		 		this.$store.dispatch('storeSate',this.conditionStore);
		}else{
		    this.data[2].txt1 ='请选择' ;
		};
	},
    mounted () {
      this.initialSwiper();
    },
    　watch:{
　　　　　　　deductionNum(e){
	         this.deductionNum=e.replace(/\D/g,'');
            this.conditionStore.deductionNum=this.deductionNum;
            this.$store.dispatch('storeSate',this.conditionStore);
　　　　　　}
      }
}
</script>
<style lang="scss" scoped>
	@import "src/assets/css/z_config.scss";
	.headeRight{
	    height: 0.78rem;
	    line-height:.78rem;
		position: fixed;
		top:0;
		right:0.2rem;
		z-index:9999;
		background:#FFFFFF;
		.btn{
			display: inline-block;
			padding-right:.2rem;
			font-size:.28rem;
			color:#333;
		}	
	}
	.wrapper{
		font-size:$fz28;
		color: $C333333;
	}
	.header{
		width:100%;
	    justify-content: center;
	    position: relative;
	    overflow: hidden;
	    padding: .8rem 0 1.4rem;
	    color: #666;
	}
	.addGoodsPic{
		flex-direction: column;
	}
	.addGoodsPic .t_photo{
		width:2rem ;
		height: 2rem;
		margin-bottom:.2rem ;
	}
	.smallAddPic{
		position: absolute;
		bottom:.1rem;
		right:.1rem;
		width:1rem ;
		height:1rem;
	}
	.smallAddPic .t_photo{
		width:100%;
		height:100%;
	}
	.addImageFile{
   	 position:absolute;
   	 width:100%;
   	 height:100%;
     top:0;
      left:0;
      opacity:0;
   }
  .goodsName{
  	height: .9rem;
  	width: 7.1rem;
  	background: #fff;
  	padding: .3rem 0.2rem 0 .2rem;
  	border: 0;
  	outline: none;
  	margin-bottom:0.12rem ;
  }
  .goodsName::-webkit-input-placeholder{
  	font-size: $fz28;
  }
  .setGoodsInf>li>a,
  .operateBtn,.header,.addGoodsPic{
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
   	  font-size: $fz28; 
   	  color: #999;
	}
  .setGoodsInf>li>a{
  	padding: 0 .2rem;
  	height: 1rem;
  	justify-content: space-between;
  	background:#fff ;
  	margin-bottom:.2rem ;
  	color: $C333333;
  }
   .setGoodsInf .curSelect{
  	color: #ABABAB;
  }
  .setGoodsInf>li .icon{
  	font-size: .3rem;
  }
  .mask,.popWin{
  	width: 100%;
  	height: 100%;
  	background: rgba(0,0,0,.5);
  	position: fixed;
  	left: 0;
  	top: 0;
  	z-index: 99999;
  }
  .contentBox{
  	position: absolute;
  	bottom: 0;
  	width: 100%;
  	background: #F7F7F7;
  	padding-bottom: 1.2rem;
  }
  .settingList .title{
  	font-size: $fz30;
  	color:$mainBtnColor;
  	justify-content: center;
  	margin: 0;
  	border-bottom: solid 1px $lineColor;
  	
  }
  .operateBtn>span{
  	flex-grow: 1;
  }
  	.operateBtn span:first-child{
  		border-right: solid 2px #fff;
  	}
  .settingList>li,.checkDefault,.radioBox{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    justify-content: space-between;
	}
	.settingList>li{
		padding: 0 .2rem;
	    background: #fff;
	    margin-bottom: .2rem;
	    height: 0.88rem;
	    justify-content: flex-start;
	}
	.noteInf{
		color: $phd;
		font-size: $fz24;
		margin-top: 0.06rem;
	}
	.editorIcon{
		font-size: .4rem;
		color: #999999;
	}
	.operateBtn{
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		color: #fff;
		background: #E7580C;
		font-size: .36rem;
	}
	.img-uploader {
	    position: absolute;
	    top: 0;
	    left: 0;
	    display: inline-block;
	 	width: 100%;
	    height: 100%;
	    opacity: 0;
	}
  .img-uploader-placeholder {
    margin: 0;
    position: absolute;
    font-size: 15px;
    width: 100%;
    color: #aaa;
    text-align: center;
    top: 50%;
    transform: translate(0%, -50%);
  }
  .img-uploader-label {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    cursor: pointer;
    margin-bottom: 0;
  }
  .ratation-banner {
  	overflow: hidden;
	img{
		width:100%;
		height:100%;
	}
	.ratation-container{
		position: relative;
	}
	.swiper-pagination{
		.swiper-pagination-bullet{
			background: #fff;
			opacity: 1;
		}
		.swiper-pagination-bullet-active{
			background: #E7580C;
		}
	}
}
.swiper-wrapper .swiper-slide{
	width: 100%;
	height: 100%;
}
.ratation-container .photoIcon{
	position: absolute;
	right: .2rem;
	bottom: .2rem;
	height: .8rem;
	width: auto;
	z-index: 15;
}
.radioBox{
	width: .4rem;
	height: .4rem;
	border-radius: 50%;
	border: solid 1px #AFAFAF;
	margin-right: .1rem;
	justify-content: center;
}
.radioBox.active{
	background: #E7580C;
	border: 0;
}
.radioBox .icon{
	color: #fff;
	font-size: .2rem;
}
.mg-switch{
	width: 1.2rem;
	height: .6rem;
	border-radius: 1rem;
	background: #CACACA;
	position: relative;
	border: solid 1px #CACACA;
}
.mg-switch.active{
	background: #E7580C ;
}
.mg-switch .circle{
	position: absolute;
	top: 0;
	left: 0;
	width: 0.57rem;
	height: .57rem;
	background: #fff;
	border-radius: 50%;
	-webkit-transition: -webkit-transform .3s;
	transition: -webkit-transform .3s;
	transition: transform .3s;
	transition: transform .3s, -webkit-transform .3s
}
.mg-switch .circle.active{
	-webkit-transform: translateX(0.57rem);
	transform: translateX(0.57rem);
}
.deduction{
	height:.8rem;
	text-align: right;
	outline: none;
	border:none
}
</style>

