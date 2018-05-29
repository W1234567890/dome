<template>
	<div class="wrapper">
		<ul class="contentBox" v-for="(vo,key) in goods">
			<div class="del iconfont" @click="del(vo,key)" v-if="key != 0">删除</div>
			<li>
				<div class="tab">费用名称</div>
				<input type="text"  placeholder="请输入费用名称" @input="val(vo,key,'goodName')" v-model='vo.goodName' />
			</li>
			<li>
				<div class="tab">金额</div>
				<input type="text" @input="val(vo,key,'sellPrice')" v-model="vo.sellPrice" placeholder="免费请填0，有人报名后不可以修改"/>
			</li>
			<li>
				<div class="tab">名额限制</div>
				<input type="text" @input="val(vo,key,'limits')" placeholder="默认无限制" v-model='vo.limits'/>
			</li>
		</ul>
		<div class="addItem" @click="add">+添加费用项</div>
		<div class="submit" @click="submit">提交
		</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			goods:[{
				goodName:	null,
				sellPrice:	null,
				limits:		null,
				goodImgs:	"1",
				remark:		"1",
			}],
		}
	},
    computed: {
      ...mapGetters([
          'getXToken',
          'getActivityEnlist'
      ]),
    },
    mounted(){
    	if(this.getActivityEnlist){
    		let enlist = this.getActivityEnlist;
			for(var item in enlist){
				if(item == "goods"){
					this.goods = enlist[item].data;
					return;
				}
			}
    	}
    },
    methods:{
    	add(){
    	  let o={
    	  	goodName:	null,
			sellPrice:	null,
			limits:		null,
			goodImgs:	"1",
			remark:		"1",
    	  };
    	  this.goods.push(o);
    	  this.k( false)
    	},
    	val(v,k,name){
    		console.info()
    		if(name == "limits"){
    			v[name] = v[name].replace(/\D/g,'');
    		}else if(name == "sellPrice"){
    			if(typeof v[name] == 'string'){
					v[name] = v[name].match(/\d+(\.\d{0,2})?/) ? v[name].match(/\d+(\.\d{0,2})?/)[0] : '';
				}
    		}
    		this.k( false)
    	},
    	del(v,k){
    		this.goods.splice(k,1);
    		this.k( false)
    	},
    	submit(){
    		this.k( false)
    		for(var i in this.goods){
    			for(var b in this.goods[i]){
    				if(this.isnull(this.goods[i][b])){
    					this.toastMsg("您还有选项没有填");
    					return;
    				}
    			}
    		}
    		this.k( true)
    		let query = this.$router.currentRoute.query,
    			queryArr = {type:query.type,id:query.id};
    		this.$router.replace({path:'/activityEnlist',query:queryArr});
    		/*window.history.go(-1);*/
    	},
    	k( e){
			let enlist = this.getActivityEnlist || [];
	    		enlist["goods"] = {
	    			isOk: e,
	    			data: this.goods,
	    		};
	    	this.$store.dispatch('setActivityEnlist',enlist);
		},
    },
	
}
</script>
<style lang="scss" scoped>
	.wrapper .btn{
		color: #EB743E;
	}
	.headeRight .btn{
		color: #EB743E;
	}
	.tab{
		text-align: justify;
    	text-align-last: justify;
    	position: relative;
    	display: inline-block;
    	float: left;
    	width: 1.36rem;
    	font-size: .28rem;
    	line-height: .3rem;
    	margin-right: .2rem;
	}
	.tab:after{
		content: ":";
		position: absolute;
		font-size: .28rem;
    	line-height: .3rem;
		right: -.1rem;
	}
	.contentBox{
		margin-bottom: .2rem;
		padding: 0 .2rem;
		background-color: #FFFFFF;
		font-size: .3rem;
		position: relative;
	}
	.contentBox .del{
		position: absolute;
		top: .1rem;
		right: .1rem;
		font-size: .3rem;
		background-color: #000000;
		border-radius: .1rem;
		text-align: center;
		padding: .05rem .2rem;
		line-height: .4rem;
		color: #FFFFFF;
	}
	.contentBox>li{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    flex-wrap: wrap;
	    background: #fff;
	    height: 1rem;
	    border-bottom: solid 1px #EBEAEA;
	}
	.contentBox li:last-child{
		border: 0;
	}
	.contentBox input{
		border: none;
		outline: none;
		width: 74%;
		height: .8rem;
		font-size: .3rem;
	}
	.addItem{
		color: #51A7DD;
		font-size: 0.3rem;
		padding: .3rem 0 0 .2rem;
	}
	.contentBox>li .signCash{
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    justify-content: space-around;
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
</style>
