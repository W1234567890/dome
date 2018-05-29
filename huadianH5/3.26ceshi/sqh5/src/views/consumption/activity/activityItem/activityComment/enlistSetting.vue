<template>
	<div class="wrapper">
		<ul class="contentBox">
			<li class="noteItem">设置报名方式</li>
			<li>
				<span>咨询电话：</span>
				<input placeholder="手机号/座机号" id="telePhone" v-model='temp_value'>
			</li>
			<li class="noteItem">设置用户名必填项</li>
			<li class="commonItem" v-for="(vo,key) in temp_items" @click="must(vo,key)">
				<span v-html="vo.item"></span>
				<div class="mustWrap">
					<span class="iconfont" :class="vo.must?'selected':'unselected'" v-html="vo.must?icon6:icon7"></span>
				</div>
			</li>
		</ul>
		<div class="submit" @click="submit">保存</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			icon6: "&#xe653;",  //选择
			icon7:"&#xe629;",  //未选择
			temp_value:null,
			temp_items:[{
				item:"姓名",
				must:false,
				name:"needUsername"
			},{
				item:"手机",
				must:false,
				name:"needTel"
			}],
			isInit: true
		}
	},
	computed: {
      ...mapGetters([
          'getXToken',
          'getActivityEnlist'
      ]),
    },
    watch: {
    	temp_value( e){
    		this.temp_value = e.replace(/\D/g,'');
    		this.k(false);
    	},
    },
    mounted(){
    	if(this.getActivityEnlist){
    		let enlist = this.getActivityEnlist;
			for(var item in enlist){
				if(item == "enlist"){
					this.temp_items = enlist[item].data.item;
					this.temp_value = enlist[item].data.val;
					this.$nextTick(()=>{
						this.isInit = false;
					})
					
					return;
				}
			}
    	}
    	this.isInit = false;
    },
    methods:{
    	submit(){
    		this.k(false);
    		var RegExp = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    		if(this.isnull(this.temp_value)){
				this.toastMsg("请设置咨询电话");
				return;
			}else if(RegExp.test(this.temp_value) == false){
				this.toastMsg("电话号码不正确");
				return;
			}
			this.k(true);
			let query = this.$router.currentRoute.query,
    			queryArr = {type:query.type,id:query.id};
    		this.$router.replace({path:'/activityEnlist',query:queryArr});
			/*window.history.go(-1);*/
		},
		must(v,k){
			v.must = !v.must;
			this.k(false);
		},
		k( e){
			if(this.isInit){
				return;
			}
			e = {
				data: {
					val: this.temp_value,
					item: this.temp_items,
					isOk: e,
				},
				name: "enlist",
			}
			let enlist = this.getActivityEnlist || [];
	    		enlist[e.name] = e;
	    	this.$store.dispatch('setActivityEnlist',enlist);
		}
    },
}
</script>
<style lang="scss" scoped>
	.contentBox>li{
		height: 1rem;
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    padding: 0 .2rem;
	    color:#333333 ;
	    font-size: .3rem;
	    background: #fff;
	}
	.contentBox .commonItem{
		justify-content: space-between;
	}
	.commonItem .user-tel{
		color:#B3B3B3 ;
		font-size: .3rem;
	}
	.contentBox>li{
		border-top: solid 1px #EBEAEA;
	}
	.contentBox>li:first-child{
		border:none;
	}
	.contentBox .noteItem{
		background: #E6E6E6;
		color: #999999;
	}
	.contentBox input{
		border: none;
		outline: none;
		height: .8rem;
		width: 70%;
	}
	.commonItem  .unselected{
	 	color:#666;
	 	font-size:.4rem ;
	 }
   .commonItem  .selected{
	 	font-size:.4rem ;
  		color: #E7580C;
  }
  .submit{
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
	.mustWrap{
		position: relative;
		overflow: hidden;
	}
	.contentBox .toggleChose{
		position: absolute;
		width:100%;
		height:100%;
		top:0;
		left:0;
		z-index:200;
	}
	.addItem{
		color: #51A7DD;
		font-size: 0.3rem;
		padding: .3rem 0 0 .2rem;
	}
	.mask {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		left: 0;
		top: 0;
		display: block;
	}
</style>
