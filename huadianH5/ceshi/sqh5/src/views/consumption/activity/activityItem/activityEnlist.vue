<template>
	<div class="wrapper">
		<header class="header">
			<div class="dragPerBg" v-if="dragPerImg" :style=[dragPerImg.style]></div>
			<div class="upImg">
				<p class="takePictrue">
					<span class="icon iconfont">&#xe640;</span>
					<input class="addImageFile" type="file" accept="image/*" multiple @change="changeEnlistImages" />
				</p>
			</div>
		</header>
		<div class="main">
			<ul class="fill-item-list">
				<li v-for="(item,key) in list">
					<router-link :to="{path:item.routeUrl,query:queryArr}">
						<span class="icon iconfont" v-html="item.icon"></span>
						<input type="text" v-if="!item.routeUrl" v-model="item.val" @input="k(item)" @click="picker(item,key)" :readonly="item.readonly" :placeholder="item.placeholder"/>
						<div :class="!item.isOk ? 'chui' : 'chei'" v-else>{{item.placeholder}}</div>
						<span class="icon iconfont rightArrow" v-html="item.rightArrow"></span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="btn_dg"></div>
		<div class="next-btn" @click="next">下一步</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			list:[{
				placeholder:"填写报名主题",
				icon:"&#xe68f;",
				maxLen:30,
				val:null,
				name: "title",
			},{
				placeholder:"请选择报名开始时间",
				icon:"&#xe654;",
				readonly: true,
				val:null,
				time: null,
				name: "startTime",
			},{
				placeholder:"请选择报名结束时间",
				icon:"&#xe642;",
				readonly: true,
				val:null,
				time: null,
				name: "endTime",
			},{
				placeholder:"请填写报名详细地址",
				icon:"&#xe63c;",
				val:null,
				name: "address",
			},{
				placeholder:"报名设置",
				icon:"&#xe644;",
				rightArrow:"&#xe608;",
				routeUrl:"/enlistSetting",
				isOk: false,
				name: "enlist",
			},{
				placeholder:"费用设置",
				icon:"&#xe645;",
				rightArrow:"&#xe608;",
				routeUrl:"/costSetting",
				isOk: false,
				name: "goods",
			}],
			dragPerImg: null,
			startTime: null,
			endTime: null,
			address: null,
			queryArr: null,
		}
	},
	mounted(){
		let enlist = this.getActivityEnlist,list = this.list,name;
		let query = this.$router.currentRoute.query;
		this.queryArr = {type:query.type,id:query.id};
		for(var item in list){
			name = list[item].name;
			if(enlist && !this.isnull(enlist[name])){
				if(name != "enlist" && name != "goods"){
					list.splice(item,1,enlist[name]);
				}else{
					list[item].isOk = enlist[name].data.isOk || enlist[name].isOk;
				}
			}
		}
		this.dragPerImg = enlist && enlist["img"] ? enlist["img"] : null;
		this.$nextTick(()=>{
			if(!this.address && !this.list[3].val){
				this.list[3].placeholder = "请填写报名详细地址";
				this.list[3].readonly = true;
				this.Geolocation();
			}
		})
		
	},
	watch: {
		startTime( e){
			this.list[1].val = e.texts;
			this.list[1].time = e.dates;
			this.k( this.list[1]);
		},
		endTime( e){
			this.list[2].val = e.texts;
			this.list[2].time = e.dates;
			this.k( this.list[2]);
		},
		address( e){
			this.list[3].val = e;
			this.list[3].placeholder = "正在获取当前位置";
			this.list[3].readonly = false;
			this.k( this.list[3]);
		},
	},
	computed: {
      ...mapGetters([
          'getXToken',
          'getActivityEnlist'
      ]),
    },
	methods: {
		changeEnlistImages(e,type) {
			let f = new FileReader();
			f.readAsDataURL(e.currentTarget.files[0]);
			var files = e.currentTarget.files[0];
			f.onload = (f) => {
				this.dragPerImg = {
				 	src : f.target.result,
				 	files: files,
				 	style: {"background":"url("+ f.target.result +") no-repeat center center / cover #FFF"},
				 	name: "img"
				}
				this.k(this.dragPerImg);
			}
			
	    },
	    msg(c){
	    	let res = this.list;
	    	if(!this.dragPerImg){
	    		this.toastMsg("请选择图片");
	    		return;
	    	}
	    	if(this.isnull(res))
	    		return;
	    		
	    	for(var i = 0;i< res.length;i++){
    			if(res[i].name != "enlist" && res[i].name != "goods"){
		    		if(this.isnull(res[i].val)){
		    			this.toastMsg(res[i].placeholder);
		    			return;
		    		}
	    		}else{
	    			if(!res[i].isOk){
	    				this.toastMsg("请完善"+res[i].placeholder);
	    			}
	    		}
	    	}
	    	c && c();
	    },
	    next(){
    		this.msg(res=>{
    			let q = this.$router.currentRoute.query;
    			this.$router.push({path:"/activityPublish",query:this.queryArr})
    		})
    		
	    },
	    picker(i,k){
	    	if(!this.isnull(i.readonly) && i.name != "address"){
	    		this.pickers(i.name)
	    	}
	    },
	    k( e){
	    	let enlist = this.getActivityEnlist || [];
	    		enlist[e.name] = e;
	    	this.$store.dispatch('setActivityEnlist',enlist);
	    }
	}
}
</script>
<style lang="scss" scoped>
.header{
	width:100%;
	min-height: 2rem;
    display:flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
    height: 5.9rem;
    /*background: url(~src/assets/img/community/enrollImg.png) no-repeat center center / cover #FFF;*/
}
.dragPerBg{
	text-align: center;
	width: 100%;
	height: 100%;
}
.header .upImg{
	width: 100%;
	height: 100%;
	position: absolute;
	bottom:0;
	right:0;
}
.takePictrue{
	position: absolute;
	bottom: 0.4rem;
	right: .2rem;
	padding:0rem .2rem 0.1rem .2rem ;
	background: rgba(0,0,0,.8);
	border-radius: .1rem;
	overflow: hidden;
}
.addImageFile{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	border: solid 1px red;
	opacity: 0;
}
.takePictrue .icon{
	font-size: 0.7rem;
	color: #fff;
}
.fill-item-list>li>a{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    height: 1.2rem;
    padding: 0 .2rem;
    background: #fff;
    color: #333333;
    font-size: .3rem;
}
.fill-item-list>li{
	 border-bottom: solid 1px #EBEAEA;
}
.fill-item-list li :last-child{
	border: 0;
}
.fill-item-list li:nth-child(4){
	margin-bottom: .2rem;
	border: 0;
}
.fill-item-list input{
	border: none;
	outline: none;
	height: .8rem;
	width:6.5rem ;
	margin-left: .2rem;
	font-size: .32rem;
}
.fill-item-list .icon{
	font-size: .34rem;
	color: #CCCCCC;
}
.btn_dg{
	height: 1.2rem;
}
.next-btn{
	height: 1rem;
	line-height: 1rem;
	text-align: center;
	background: #E7580C;
	color: #fff;
	font-size:.36rem ;
	position: fixed;
	bottom: 0;
	width: 100% ;
}
.chui,.chei{
	color: rgb(169,169,169);
    height: .8rem;
    line-height: .8rem;
    width: 6.5rem;
    margin-left: .2rem;
    font-size: .32rem;
}
.chei{
	color: #000000!important;
}
</style>
