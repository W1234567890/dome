<template>
	<div class="wrapper">
		<div class="contentBox">
			<form method="get" action="">
				<ul class="ulItem">
					<li>
						<span>名称</span>
						<input type="text" class="" placeholder="请输入真实姓名/公司名称" v-model="userName"/>
					</li>
					<li>
						<span>证件号</span>
						<input type="text"  class="" placeholder="请输入身份证号/营业执照号"  v-model="cardNum"  maxlength="36"/>
					</li>
					<li>
						<span>银行卡号</span>
						<input type="text" class="" placeholder="请输入银行卡号" v-model="bankNum" maxlength="19"/>
					</li>
					<li>
						<span>所属银行</span>
						<input type="text" @click="selectBank" class="" placeholder="请选择所属银行"  readonly="true" v-model="bankName"  />
					</li>
					<li>
						<span>所属地区</span>
						<input type="text" @click="selectCity" class="" placeholder="请选择所属地区"   readonly="true" v-model="curCity"/>
					</li>
					<li>
						<span>开户支行</span>
						<input type="text" class="" placeholder="请输入开户支行"  v-model="branch"/>
					</li>
				</ul>
			</form>
			<div class="noteInf">注：支行填写格式如："南山支行"</div>
			<div class="footer" @click="finishSelect">确定</div>
		</div>
	</div>
</template> 

<script>
import { mapGetters,mapActions } from 'vuex'
import api from 'src/mixins/api'
export default {
	data(){
		return {
			bankNum:'',
			bankName:'',
			curCity:'',
			cityStr:'',
			branch:'',
			title:'添加银行卡',
			showTitle:true,
			bankList:[],
			userName:'',
			cardNum:''
		}
	},
	mixins: [ api],
	computed: {
      ...mapGetters([
          'getXToken',
          'getListCard'
      ]),
    },
    watch:{
    	bankNum(e){
    		this.bankNum = e.replace(/\D/,'');
    	},
    },
   beforeMount(){
		this.$store.dispatch('showTitle',this.showTitle);
		this.$store.dispatch('title',this.title);
		this.getSeverData();
	},
	methods: {
		selectCity(){
			this.cityStr = '';
    		this.PickerShow(cityData,(items)=>{
    			for(var i=0;i<items.length;i++){
    				this.cityStr += items[i].text+' ';
    			}
        		//console.info(this.cityStr);
        		this.curCity = this.cityStr;
        	},3);//选择城市
    	},
    	//选择银行卡
		selectBank(){
    		this.PickerShow(this.bankList,(items)=>{//回调函数
    			for(let i in this.bankGather){//筛选选择银行卡的id
    				if(items == this.bankGather[i].bankName){
    					this.bankCardId=this.bankGather[i].id;
    				};
				};
    			this.bankName = items;
	    	},1);
    	},
		finishSelect(){//完成设置提交数据
	       	var bkReg = /^\d{16}|\d{19}$/;//银行卡号
	       	/*let cardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; */
	       	if(this.userName==""){
	       		this.toastMsg("姓名不能为空","fail");
	       		return ;
	       	}
	       	if(this.cardNum==""){
	       		this.toastMsg("身份证号不能为空","fail");
	       		return ;
	       	}
	      /* 	if(cardReg.test(this.cardNum) === false) { 
				this.toastMsg("身份证号输入不合法","fail");
				return; 
			} */
	       	if(this.bankNum==""){
	       		this.toastMsg("银行卡号不能为空","fail");
	       		return ;
	       	};
	       	if(!bkReg.test(this.bankNum)){
	       		this.toastMsg("银行卡号不正确","fail");
	       		return ;
	       	};
	       	if(this.bankName==''){
       			this.toastMsg("请选择银行","fail");
       			return ;
       		};
       		if(this.curCity == ''){
   				this.toastMsg("请选择地区","fail");
   				return ;
   			};
   			if(this.branch == ''){
				this.toastMsg("请填写支行","fail");
				return ;
			};
	       	this.sendData();
	    },
	    sendData(){//提交数据方法
			let data = {
				bankCard:this.bankNum,
				branch:this.branch,
				addr:this.curCity,
				bankId:this.bankCardId,
				cardType:2,
				cardNum:this.cardNum,
				userName:this.userName
			},
			url="syscash/addCard";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						//console.log(res);
						if(res.meta.code == "10000"){
							this.toastMsg("您的银行卡已添加成功！","fail");
							setTimeout(()=>{
								this.$router.go(-1);
							},1500)
						}else{
							this.toastMsg("添加银行卡失败！","fail");
						}
					}
				});
			});
		},
		getSeverData(){//获取银行卡列表数据
			let data = {},
			url="syscash/listBank";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						this.bankGather  = res.data;
						for(let i in res.data){
							this.bankList.push(res.data[i].bankName);
						};
					}
				});
			});
		},
	}
}
</script>

<style lang="scss" scoped>
	.contentBox{
		margin-top: .2rem;
	}
	.ulItem>li{
		height:1rem ;
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
		border-bottom: solid 1px #E6E6E6;
		font-size: .3rem;
		color: #333;
		padding: 0 .2rem;
		background: #fff;
	}
	.ulItem>li>span{
		width:1.6rem ;
	}
	.ulItem>li>input{
		height: .6rem;
		width: 5.5rem;
		font-size: .3rem;
		border: 0;
		outline: none;
		text-align: end;
	}
	::-webkit-input-placeholder{
		font-size: .28rem;
		color: #999;
	}
	.ulItem li:last-child{border: 0;}
	.noteInf{
		padding: .3rem .2rem 0 .2rem;
		color: #999;
		font-size: .28rem;
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
	}
	
</style>