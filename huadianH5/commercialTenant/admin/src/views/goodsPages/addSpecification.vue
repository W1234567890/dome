<template>
	<div class="wrap">
		<div class="headeRight" @click="finishSet()">
			<span class="btn">
				<span>完成</span>
			</span>
	   </div>
	   
	   <div class="goodsSpecification">
	   		<span class="title">规格：</span>
	   		<!--<input class="" placeholder="请选择商品规格" readonly="readonly"/>-->
	   		<div v-for='(vo,key) in dataArr' class="text-ell" style="width: 4rem;overflow: hidden;" v-if="key == 0">
			   	<span v-for="(v,k) in vo" v-if="v.matter && data.indexOf(v.matter) <= -1">
			   		{{v.matter}}
			   	</span>
			</div>
	   		<span @click="isPopWinShow = !isPopWinShow" class="optBtn">
				<span>请选择</span>
				<span class="icon iconfont">&#xe608;</span>
			</span>
	   </div>
	   <div class="goodsInf"  v-for='(vo,key) in dataArr'>
			<ul class="goodsStandard " v-for="(v,k) in vo"  :class="key !=0 && 'addDecreaBtn'">
				<li>
					<span>{{v.matter}}</span>
					<input type="text" v-model:value="v.content" :placeholder="v.placeHolder" @input="k>(vo.length-6) && k!= (vo.length-2) ? inputs(v,k) :((k==vo.length-2) ? limitInp(v,k) : '')"/>
					<span @click="postArr('picker',{k,key})" class="optBtn" v-if="k<=(vo.length-6) ? true : false">
						<span>请选择</span>
						<span class="icon iconfont">&#xe608;</span>
					</span>
					<a v-if="k==vo.length-1 && v.content">kg</a>
				</li>
			</ul>
			<div class="reduceBtn" @click="postArr('del',key)" v-if="key==0 ? false :true">
				<span>删除规格</span>
			</div>
		</div>
		
		<!--地区选择弹出层-->
		<div class="mask"  v-if="isPopWinShow">
			<div class="popWin">
				<div class="contentBox">
					<div class="operateBtn">
						<span @click="isPopWinShow = !isPopWinShow" class="cancleBtn">取消</span>
						<span @click="!postArr('push') && (isPopWinShow = !isPopWinShow)">确定</span>
					</div>
					<div class="settingMain">
						<!--规格类型选择-->
						<ul class="settingList" ref="setting">
							<li v-for="(item,key) in standardList" @click="item.state = !item.state">
								<span id="" class="radioBox" :class="item.state ? 'active' :''">
									<span class="icon iconfont">&#xe707;</span>
								</span>
								<div class="matter">{{item.matter}}</div>
							</li>
						</ul>
						<!--添加规格-->
					</div>
					<div class="addStandard">
						<input placeholder="请输入商品规格" v-model="newStandard"/>
						<span class="addBtn" @click="addSpecification">添加</span>
					</div>
				</div>
			</div>
		</div>
		<!--添加商品规格单元按钮-->
		<div class="addSize" @click="postArr('add')">
			<span class="">+添加商品规格</span>
		</div>
	</div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			showTitle:true,
			title:"商品规格",
			newStandard:'',
			isPopWinShow:false,
			standardList:[],
			dataArr:[],
			dataList:[],
			data: ["原价","卖价","供货价","库存","重量"],
			clone: [],
		}
	},
	watch:{
	},
	computed: {
      ...mapGetters([
          'goodsStandard',
      ]),
    },
	methods: {
		inputs(items,key){
			let reg = /^[\+\-]?\d*?\.?\d*?$/;
			if(!reg.test(items.content)){
				items.content = items.content.substring(0,items.content.length-1);
			}
		},
		limitInp(v,k){
			v.content = v.content.replace(/\D/g,'');
		},
		finishSet(){
			this.$store.dispatch('goodsStandard',this.dataArr);
			for(var i=0;i<this.dataArr.length;i++){
				for(var y=0;y<this.dataArr[i].length;y++){
					if(this.dataArr[i][y].content==null|| this.dataArr[i][y].content == ''){
						this.toastMsg("所有字段内容不能为空");
						return;
					}
				}
			}
			this.toastMsg("规格设置成功");
			setTimeout(()=>{
				/*this.$router.push({path:'/addGoods',query:{isSet: "已设置"}});*/
				this.$router.go(-1);
			},1500)
		},
		getData(){//获取数据方法
			let data = {},
			url="goodsmanager/getSpecOptions";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						this.dataList = res.data;
						for(var i=0;i<res.data.length;i++){
							this.standardList.push({
								id:res.data[i].id,
								matter:res.data[i].specName,
								state:false,
								specValue:[],
							});
							for(var k=0;k<this.dataArr[0].length;k++){
								if(this.dataArr[0][k].matter==this.standardList[i].matter){
									this.standardList[i].state=true;
								}
							}
						};
						for(var i=0;i<res.data.length;i++){
							//[{text:"13",value:"123"},{text:"14",value:"123"}]
							var arr = res.data[i].specValue.split(',');
							for(var y=0;y<arr.length;y++){
								this.standardList[i].specValue.push({
									text:arr[y],
									value:"123",
								})
							}
							
						};
						this.postArr('push');
						for(var k=0;k<this.dataArr[0].length-5;k++){
								for(var i=0;i<this.standardList.length;i++){
									if(this.dataArr[0][k].matter==this.standardList[i].matter){
										i=res.data.length;
									}
									if(i==res.data.length-1&&this.dataArr[0][k].matter!=this.standardList[i].matter){
										this.newStandard=this.dataArr[0][k].matter;
										this.addSpecificationState();
									}
								};
						}
					}
				});
			});
		},
		//当完成再重新编辑规格时调用
		addSpecificationState(){
			this.isExist = false;
			if(this.newStandard != ''){
				for(var i=0; i<this.standardList.length;i++){
					if(this.standardList[i].matter == this.newStandard){
						this.isExist = true;
						this.toastMsg("已存在");
						return false;
					}
					//console.log(this.standardList[i].matter);
				}
				if(this.isExist == false){
					this.standardList.push({
		            	matter:this.newStandard,
		            	state:true,
					});
					this.newStandard = '';
				}
			}else{
				this.toastMsg("请填写商品规格");//底部弹窗
			};
			//console.log(this.standardList)
		},
		//添加规格
		addSpecification(){
			this.isExist = false;
			if(this.newStandard != ''){
				for(var i=0; i<this.standardList.length;i++){
					if(this.standardList[i].matter == this.newStandard){
						this.isExist = true;
						this.toastMsg("已存在");
						return false;
					}
					//console.log(this.standardList[i].matter);
				}
				if(this.isExist == false){
					this.standardList.push({
		            	matter:this.newStandard,
		            	state:false,
					});
					this.newStandard = '';
					this.$nextTick(()=>{
						this.$refs.setting.scrollTop = 100000;
					})
				}
			}else{
				this.toastMsg("请填写商品规格");//底部弹窗
			};
			//console.log(this.standardList)
		},
		postArr( type, k){
			var len = this.dataArr && this.dataArr.length || 0,
				data = this.data,
				i = null,
				data1 = [];
			switch (type){
				case "picker":
				//alert(this.standardList[k.k].id)
				//[{text:"13",value:"123"},{text:"14",value:"123"}]
					this.PickerShow(this.dataArr[k.key][k.k].specValue,(items)=>{//回调函数
						this.dataArr[k.key][k.k].content = items[0].text;
		    		},1);
		    		console.info()
					break;
				case "add":
					!this.dataArr[len] && (this.dataArr[len] = []);
					for(i in data){
						data1.push({
							matter: data[i],
							placeHolder:"请填写商品"+data[i],
							content: null,
							id:''
						});
					}
					this.dataArr.splice(len,1,data1);
					this.postArr('reset');
					break;
				case "del":
					this.dataArr.splice(k,1);
					break;
				case "reset":
					let arr = this.dataArr;
					let clone= this.standardList;
					let maxi = this.standardList.length || 0;
					let i = 0;
					var num = [];
					let pu = (a, res)=>{
						arr[a].unshift({
							matter: res.matter,
							placeHolder:"请填写商品"+res.matter,
							content: null,
							id:res.id,
							specValue: res.specValue
						})
					}
					var a = 0;
					let func = (i, z) => {
						var r = res=>{
							if(i >= maxi){
								if(a >= arr.length - 1){
									return;
								}
								a++;
								for(i = 0;i <= maxi;i++){
									func( i, z)
								}
								return;
							}
							
							for(let b in arr[a]){
								if(arr[a][b].matter != clone[i].matter){
									num = {
										"type": clone[i].state,
										"cra": i,
										"matter": clone[i].matter,
										"id": clone[i].id,
										"specValue": clone[i].specValue
									};
								}
								
							}
							if(num.type){
								for(var e = 0;e < arr[a].length;e++){
									if(arr[a][e].matter == num.matter){
										z && z(z);
										return;
									}
								}
								pu(a,num);
								z && z(z);
							}else{
								var w = 0,
								q = res =>{
									if(arr[a][w].matter == num.matter){
										arr[a].splice(w,1);
										w = 1 - w;
										w < 0 && (w = 0)
									}else{
										w++;
									}
									if(w < arr[a].length - 1){
										q()
									}else{
										z && z(z);
									}
									
								}
								q();
							}
							
						}
						r();
					}
					func(i,( z)=>{
						if(i >= maxi){
							return;
						}else{
							i++;
							func(i,z);
						}
					})
					break;
				case "push":
					let list = this.standardList;
					this.clone = [];
					for(i in list) {
						list[i].state && this.clone.push(list[i].matter);
					}
					this.postArr('reset');
					break;
				default:
					break;
			}
		},
	},
	beforeMount(){
		//this.$store.dispatch('goodsStandard',this.dataArr);
		this.$store.dispatch('showTitle',this.showTitle);
	    this.$store.dispatch('title',this.title);
	},
    mounted(){
		this.postArr('add');
		this.getData();
		if(this.goodsStandard.length){
			this.dataArr=this.goodsStandard;
		}
    },
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/z_config.scss";
.headeRight{
    height: 0.78rem;
    line-height:.78rem;
	position: fixed;
	top:0;
	right:.2rem;
	z-index:100;
	background:#FFFFFF;
	.btn{
		display: inline-block;
		padding-right:.2rem;
		font-size:.28rem;
		color:#333;
	}	
}
.goodsStandard>li,.setGoodsInf>li>a,
  .operateBtn,.reduceBtn,.goodsSpecification{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    font-size:.3rem;
  }
  .goodsStandard,.goodsSpecification{
  	background: #fff;
  	position: relative;
  }
  .goodsSpecification{
  	padding: 0 .2rem;
  	height: .88rem;
  	margin-top: .2rem;
  }
  .goodsSpecification .title{
  	width:1.4rem;
  	color:#666;
  }
   .reduceBtn{
  	 font-size: .32rem;
  	 height: 1rem;
  	 justify-content: flex-end;
  	 border-radius: 0.06rem;
  	 text-align: center;
  	 color: #333;
  	 background: #fff;
  }
 .reduceBtn>span{
  	 font-size: .32rem;
  	 width: 1.6rem;
  	 height: .7rem;
  	 line-height: .7rem;
  	 display: block;
  	 border-radius: 0.1rem;
  	 color: #333;
  	 border: solid 1px $lineColor;
  	 margin-right: .2rem;
  }
  .goodsInf{
  	margin-top: .2rem;
  }
  .goodsStandard>li>span{
  	width:1.4rem;
  	color:#666;
  }
   .wrap input{
   	 border: 0;
   	 outline: none;
   	 height: .6rem;
   	 width:5rem;
   	 font-size: .30rem;
   	 color:#333;
   }
   ::-webkit-input-placeholder {
   	  font-size: $fz28; 
   	  color: #999;
	}
  .goodsStandard>li{
  	height: .88rem;
  	padding: 0 .2rem;
  	border-bottom: solid 1px $lineColor;
  	background: #fff;
  	position: relative;
  }
  .addSize{
  	width:90%;
  	margin:.5rem auto .5rem;
  	height:.9rem;
  	border:1px solid #E7580C;
  	color:#E7580C;
  	line-height:.9rem;
  	text-align: center;
  	border-radius: .1rem;
  	
  }
  .wrap .optBtn{
  	position: absolute;
  	top: .22rem;
  	right: .2rem;
  	width: auto;
  	color: #E7580C;
  	font-size: .28rem;
  	border-left: solid 1px $lineColor;
  	padding-left:.2rem ;
  }
  .optBtn .icon{
  	font-size: .3rem;
  }
  .mask,.popWin{
  	width: 100%;
  	height: 100%;
  	background: rgba(0, 0, 0, 0.2);
  	position: fixed;
  	left: 0;
  	top: 0;
  	z-index: 100;
  }
  .contentBox{
 		width: 6.4rem;
	  	height: 6.4rem;
	  	border-radius: .2rem;
	  	background: #fff;
	  	position: fixed;
	  	left: 50%;
	  	top: 50%;
	  	margin-left: -3.2rem;
	  	margin-top: -4.5rem;
	  	overflow: hidden;
	  	font-size: .28rem;
	  	color: #333;
	  	padding-top: 1rem;
	  	padding-bottom: 1rem;
  }
  .settingMain{
  	    position: relative;
	    display: block;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
  }
  .settingList{
  	position: relative;
    display: block;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .settingList .title{
  	font-size: $fz30;
  	color:$mainBtnColor;
  	justify-content: center;
  	margin: 0;
  	border-bottom: solid 1px $lineColor;
  	
  }
  .operateBtn{
  	justify-content: space-between;
  	padding: 0 .45rem;
  	font-size: .36rem;
  	color: #E7580C;
  	height: 1rem;
  	background:#fff ;    
  	width: 100%;
  	position: absolute;
    top: 0;
    left: 0;
    margin: 0;
  }
  .operateBtn .cancleBtn{
  	color: #666;
  }
  .operateBtn span:first-child{
  		border-right: solid 2px #fff;
  	}
  .settingList>li,.checkDefault,.radioBox,.addStandard{
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
	    background: #F5F5F5;
	    height: 0.88rem;
	    justify-content: flex-start;
	    border-top: solid 1px $lineColor;
	}
	.radioBox{
		width: .4rem;
		height: .4rem;
		border-radius: 50%;
		border: solid 1px #AFAFAF;
		margin-right: .2rem;
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
	.addStandard{
		width: 100%;
	  	position: absolute;
	  	left: 0;
	  	bottom: 0;
	  	z-index: 100;
	  	height:1rem ;
	  	color: #E7580C;
	  	background: #fff;
	}
	.addBtn{
		font-size: .36rem;
		color: #E7580C;
		padding-right:.45rem ;
		height: .7rem;
		line-height: .7rem;
	}
	.addStandard>input{
		width: 4.4rem;
		height: 100%;
		text-indent: 0.2rem;
		background: #F5F5F5;
		border: none;
		height: .7rem;
		margin-left: .2rem;
		border-radius: 0.06rem;
	}
</style>




