<template>
	<div class="wrapper">
		<div class="headeRight">
		    <div class="btn" @click="finishBtn">完成</div>
	    </div>
		<ul class="setGoodsInf">
			<li>
				<div class="item avatarWrap" @click="show=true">
					<span class="matter">头像：</span>
					<input v-if="!photo" class="inpArea" :placeholder="'请上传头像'" readonly="readonly"/>
					<img v-if="photo" :src="photo" class="avatar"/>
				    <span class="icon iconfont rightArrow" v-html="icon"></span>
				</div>
			</li>
			<li>
				<div class="item">
					<span class="matter">昵称：</span>
					<input class="inpArea" placeholder="请输入直播时显示的昵称" v-model="nickName"/>
					<!--<span class="icon iconfont rightArrow" v-html="icon"></span>-->
				</div>
			</li>
			<li>
				<div class="item">
					<span class="matter">个性签名：</span>
					<input class="inpArea" placeholder="请输入直播时显示的个性签名" v-model="sign"/>
					<!--<span class="icon iconfont rightArrow" v-html="icon"></span>-->
				</div>
			</li>
			<li class="userName">
				<div class="item">
					<span class="matter">姓名：</span>
					<input class="inpArea" placeholder="请输入姓名" v-model="userName" readonly="readonly"/>
				</div>
			</li>
			<li>
				<div class="item">
					<span class="matter">职位：</span>
					<input class="inpArea" placeholder="" v-model="jobName" readonly="readonly"/>
				</div>
			</li>
		</ul>
		<transition name="fade">
				<div class="btnsWrap" v-show="show">
					<div class="btnItem" v-for="(vo,key) in arrBtns">
						<div @click="key==arrBtns.length-1?show=false:''">{{vo.txt}}</div>
						<input v-if="key==0" class="addImageFile" type="file" accept="image/*" multiple="multiple" @change="addImages"/>
					    <input v-if="key==1" class="addImageFile" type="file" name="file"  accept="image/*" capture="camera" @change="addImages">
					</div>
				</div>
		</transition>
		<div class="mask" v-if="show"></div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			showTitle:true,
			title:"个人资料",
			goodsPromotion:[],
			goodsIndex:0,
			dragPerImgs:null,
			show:false,
			icon:'&#xe608;',
			personalData:'',
			arrBtns:[{
				txt:"从相册中选择",
				func:this.addImages,
				accept:"image/*"
			},{
				txt:"拍照",
				func:this.addImages,
				accept:"camera"
			},{
				txt:"取消",
				func:this.cancleBtn
			}],
		}
	},
	methods: {
		postData(){//获取数据方法
			let data = {
				nickName:this.nickName,
				sign:this.sign,
				photo:this.photo,
			},
			url="syslogin/modifysysuser";
			//console.log(this.photo);
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						if(res.meta.code == '10000'){
							this.toastMsg("设置成功");
							this.userRefresh();
							this.returnToback('refresh',res=>{
								 this.go(-1);
							});
						};
					}
				});
			});
		},
		userRefresh(){//用户刷新
			let data = {},
			url="syslogin/refresh";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						if(res.meta.code == '10000'){
							this.$store.dispatch("setXToken",res.data);
						};
					}
				});
			});
		},
		addImages(e) {
			var f = new FileReader();
			    this.dragPerImgs= e.currentTarget.files[0];
				f.readAsDataURL(e.currentTarget.files[0]);
			f.onload = (f) => {
				this.photo = f.target.result;
				this.show=false;
			};
	    },
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
		finishBtn(){
			let u=this.dragPerImgs;
			if(u){
				this.setfiles(u,r =>{
					if(r){
						this.photo = r;
						this.postData();
					}
				});
			}else{
				this.postData();
			}
		}
	},
	beforeMount(){
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.nickName = this.getXToken.nickName;
		this.sign = this.getXToken.sign;
		this.photo = this.getXToken.photo;
		this.userName = this.getXToken.name;
		this.jobName = this.getXToken.jobName;
		//console.log(this.getXToken)
	},
	watch: {
			
	},
	computed: {
	      ...mapGetters([
	          'getXToken',
	      ]),
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
		right:0;
		z-index:250;
		background:#FFFFFF;
		.btn{
			display: inline-block;
			padding-right:.2rem;
			font-size:.28rem;
			color:#333;
		}	
	}
	.wrapper{
		font-size:$fz30;
		color: $C333333;
	}
	
 .setGoodsInf .item{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 .2rem;
  	height: 1rem;
  	justify-content: space-between;
  	background:#fff ;
  	color: $C333333;
  	border-bottom:  solid 1px $lineColor;
  	position: relative;
  }
  .setGoodsInf .avatarWrap{
  	height:1.2rem;
  	position: relative;
  }
  .setGoodsInf .matter{
  	width: 1.8rem;
  	color:#666;
  }
  .setGoodsInf .userName{
  	margin-top: .2rem;
  }
  .avatar{
  	width: 0.7rem;
	height: 0.7rem;
	border-radius:50%;
	position: absolute;
	top:50%;
	right:.8rem;
	margin-top:-.35rem;
  }
  .setGoodsInf>li .icon{
  	font-size: .3rem;
  }
  .inpArea{
  	height: .6rem;
  	width: 5.6rem;
  	border: 0;
  	color:#333;
  }
  .rightArrow{
  	position: absolute;
  	right: .2rem;
  	top: .3rem;
  }
  .avatarWrap .rightArrow{
  	top: .46rem;
  }
 .btnsWrap {
	width: 100%;
	background:#F7F7F7;
	position: fixed;
	bottom: 0;
	padding: .3rem 3% 0;
	z-index: 100;
}
.btnItem {
	display: block;
	margin-bottom: .3rem;
	background: #FFFFFF;
	color: #333;
	text-align: center;
	width:100%;
	height: 1rem;
	line-height: 1rem;
	border-radius: .1rem;
	position: relative;
} 
.addImageFile{
	position: absolute;
	width:100%;
	height:100%;
	top:0;
	left:0;
	line-height: 1rem;
	text-align: center;
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
.mask{
	width:100%;
	height:100%;
	position: fixed;
	top:0;
	left:0;
	background: rgba(0,0,0,.5);
	z-index: 20;
}

.auto-textarea-input{
	box-sizing: border-box;
	display: block;
	border: 0;
	outline: none;
	height: .6rem;
	min-height: .6rem;
	font-size: .3rem;
	font-family: "\5FAE\8F6F\96C5\9ED1";
	-webkit-font-smoothing: antialiased;
} 
</style>

