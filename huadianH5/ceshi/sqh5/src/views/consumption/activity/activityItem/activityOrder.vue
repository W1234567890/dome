<template>
	<div class="wrapper">
		<header class="header">
			<div class="dragPerBg" v-if="dragPerImg" :style=[dragPerImg.style]></div>
			<div :class="!dragPerImg ? 'addGoodsPic' : 'smallAddPic'">
				<img class="t_photo" :src="t_photo" />
			    <span v-if="!dragPerImg">添加商品图片</span>
			    <input class="addImageFile" type="file"  accept="image/*" multiple  @change="fileDetails" />
			</div>
		</header>
		<div class="temp_name_wraapper">
		      <input 
		      type="text" 
		      v-model="temp_name" 
		      placeholder="请填写商品名称"/>
		</div>
		<div class="goods-price">
			<span>商品价格</span>
			<input  
			type="text" 
			v-model="temp_price" 
			maxlength="15" 
			placeholder="请填写商品价格"/>
		</div>
		<div class="goods-price">
			<span>商品数量</span>
			<input  
			type="text" 
			v-model="temp_num" 
			maxlength="15" 
			placeholder="请填写商品数量"/>
		</div>
		<div class="goods_description">
			<p ref="temp_description"></p>
			<textarea  
			v-textarea:value="temp_description"
			spellcheck="false"  
			:placeholder="'请对商品进行描述'" 
			v-model="temp_description">
			</textarea>
		</div>
		<div class="footer_dg"></div>
		<div class="footer" @click="submitFinsh">完成</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			t_photo:require("src/assets/img/community/addCamcer.png"),
			dragPerImg:null,
			temp_name:null,
			temp_price:null,
			temp_description:null,
			temp_num:null,
			queryArr: {},
		}
	},
	watch: {
		temp_price( e){
			if(typeof e == 'string'){
				this.temp_price = e.match(/\d+(\.\d{0,2})?/) ? e.match(/\d+(\.\d{0,2})?/)[0] : '';
				if(e <= 0){
					this.temp_price = null;
				}
			}
		},
	},
	created(){
		this.queryArr = {
			type : this.$router.currentRoute.query.type,
			id : this.$router.currentRoute.query.id,
		}
	},
	computed: {
      ...mapGetters([
          'userInfo',
          'getUserData',
          'getActivityOrder'
      ]),
    },
	methods: {
		fileDetails(e) {
			let f = new FileReader();
			f.readAsDataURL(e.currentTarget.files[0]);
			var files = e.currentTarget.files[0];
			f.onload = f => {
				 this.dragPerImg = {
				 	src : f.target.result,
				 	files: files,
				 	style: {"background":"url("+ f.target.result +") no-repeat center center / cover #FFF"},
				 }
			}
		},
		isnull( t){
			if(t == "" || t == null || t == undefined || (typeof t == 'object' && t.length <= 0))
				return true;
			
			return false;
		},
		submitFinsh(){
			let tips = [
				{name:'dragPerImg',content:"请添加商品图片"},
				{name:'temp_name',content:"请添加商品名称"},
				{name:'temp_price',content:"请填写商品价格"},
				{name:'temp_num',content:"请填写商品数量"},
				{name:'temp_description',content:"请对商品进行描述"},
			];
			
			let c = (b)=>{
				let t,a;
				for(var item in tips){
					t=this[tips[item].name];
					a=tips[item].content;
					if(this.isnull(t)){
						this.toastMsg(a);
						return;
					}
				}
				b && b();
			}
			c(()=>{
				let data = this.getActivityOrder || [],len = this.getActivityOrder ? this.getActivityOrder.length : 0,
					add = this.$router.currentRoute.query.add,
					datas = {
						img: this.dragPerImg,
						name: this.temp_name,
						price: this.temp_price,
						num: this.temp_num,
						container: this.$refs.temp_description.innerHTML.replace(/&nbsp;/ig, "")
					};
				if(!add || !add.isAdd){
					data[len] = datas;
				}else{
					data.splice(Number(add.k) + 1,0,datas);
				}
				
				this.$store.dispatch('setActivityOrder',data);
				this.$router.replace({path:'/activityPublish',query:this.queryArr});
			})
			
		},
		
	},
}
</script>
<style lang="scss" scoped>
	.wrapper{
		font-size: .28rem;
		color: #333333;
	}
	.header{
		width:100%;
		min-height: 2rem;
	    display:flex;
	    justify-content: center;
	    position: relative;
	    overflow: hidden;
	    height: 5.9rem;
	}
	.addGoodsPic{
		display: inline-block;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top:50%;
		margin-top:-1rem;
		left:50%;
		margin-left:-1rem;
	}
	.dragPerBg{
		text-align: center;
		width: 100%;
		height: 100%;
	}
	
	.temp_name_wraapper{
		background-color: #FFFFFF;
		width: 100%;
		overflow: hidden;
	}
	.temp_name_wraapper input{
		padding: .3rem;
		width: 100%;
		box-sizing: border-box;
		border: 0;
	}
	.addGoodsPic .t_photo{
		width:2rem ;
		height: 2rem;
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
   .goods-price{
	   	display: block;
	   	background:#FFFFFF;
	   	margin: .2rem 0;
	   	padding: 0 .3rem;
	   	span{
	   		display: inline-block;
	   		padding: 0 .2rem 0 0;
	    }
	    input{
	   		padding: .3rem .2rem;;
	   		width: 4.9rem;
	   		border: 0;
	   		box-sizing: border-box;
		}
   }
   
	.goods_description{
		width: 100%;
		background-color: #FFFFFF;
		padding: .3rem;
		textarea{
			height: 2.3rem;
			box-sizing: border-box;
			border: 0;
			width: 100%;
			outline:none;
			min-height: 2.3rem;
			font-size: .3rem;
        	font-family: "\5FAE\8F6F\96C5\9ED1";
			-webkit-font-smoothing: antialiased;
		}
		p{
			font-size: .3rem;
   	        word-break:break-all; 
   	        word-wrap:break-word;
   	        visibility: hidden;
   	        position: absolute;
   	        left: 0;
   	        top: 0;
   	        padding: 0 .2rem;
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		color: #fff;
		background: #E7580C;
		font-size: .32rem;
	}
	.footer_dg{
		height: 1.2rem;
	}
</style>
