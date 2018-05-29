<template>
	<div class="wrapper">
		<div class="slidesClassMain" ref='slidesClassMain'>
			<div v-scrollt>
				<header class="header">
					<img :src="bgImg" class="bannerImg" />
				</header>
				<div id="center_Box">		
					<div class="center_text">
						<span>成功邀请一名好友注册成功，您将获得</span><br />
						<span>{{jiFenNum}}元代金劵一张，每天最高可得10000元</span>
					</div>
				</div>
				
				<div class="inviteFriends">
					<div class="squareBg">						
						<img :src="qrCode" class="qrCode" />
					</div>						
				</div>
				
				<div>
					<div class="inviteBtn" @click="shareToFriend">邀请好友</div>
				</div>
					
				<div class="footer">
					<div class="invitation_Title">
					<span>您已成功邀请<span class="amount">{{friendList}}</span>位好友，获得奖励<span class="totalSum">{{this.data.money}}</span>元</span>
				</div>
				<div class="invitation_Content">
					<ul>
						<li>							
							<table>
							  <td>好友账号</td>	
							  <td>加入时间</td>
							</table>
						</li>						
						
						<div class="dataModule">						
							<swiper :options="swiperOption">
						        <swiper-slide class="text">
							        <ul v-if="data.memberList">
										<li v-for="z in data.memberList" >	
											<table>
											    <td>{{toTel(z.phone)}}</td>	
					   					        <td>{{dateFormat(z.createDate)}}</td>												
											</table>															
										</li>	
									</ul>	
						        </swiper-slide>
						        <div class="swiper-pagination" slot="pagination"></div>
						     </swiper>																								
						</div>
					</ul>
				</div>
				</div>
			</div>
		</div>
	</div>
</template> 
<script>
export default {
	data(){
		return {
			showTitle:false,
			title:"邀请好友",
			qrCode:'',
			jiFenNum:10,
			inviteCode:123456,
			bgImg:require("src/assets/img/ifBg.png"),
			data:{},
			friendList: 0,
			direction: 'vertical',
	        slidesPerView: 1,
	        spaceBetween: 30,
	        mousewheel: true,
	        pagination: {
	            el: '.swiper-pagination',
	            clickable: true
	        }
		}
	},		   
	beforeCreate(){
        document.title="好事共享";
        this.setWebTittle('好事共享');      
    },
	methods: {
		shareToFriend(){
		 	//this.share({url:"http://192.168.1.211:8080/spendless/dist/#/linkRegister"});
		 	this.share({url:"http://apph5.pengjipay.com/#/linkRegister"});
		},	
		init(){	 
		    let url = "myhome/connectList",
			    data = "";
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						this.data = res.data;						
						if(this.data.money == 0){
							this.friendList = 0;
						}else{
							this.friendList = this.data.memberList.length;
						}																								
					}
				});
			});
		},
		dateFormat(time) {
			if(time != 0 && time) {
				let date = new Date(time * 1000),
				Y = date.getFullYear() + '-',
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
				D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',			
				data = Y + M + D;
			           			  			
				return data;
			}
        },
		beforeMount(){
			if(this.$router.currentRoute.query.qrCode){
			    this.qrCode=this.$router.currentRoute.query.qrCode;	
			}		
			this.$store.dispatch('showTitle',this.showTitle);
			this.$store.dispatch('title',this.title);
		},
		mounted(){
		   	this.$refs.slidesClassMain.style.height = window.innerHeight +"px";		   	
		},
		toTel (str) {
		    let start = str.slice(0,3);
		  	let end = str.slice(-4);
		  	return `${start}******${end}`;
		}
    },
    mounted() {
        this.init();
        this.dateFormat();
        this.beforeMount();
    }	
}
</script>
<style lang="scss" scoped>
.ulItem .warmNote{
	font-size:.28rem ;
	color: #555555;
	background: #ffbb22;
}
.wrapper .slidesClassMain{
	width: 100%;
	height: 100%;
	background: #ffbb22;
}
.header{
	width: 100%;
	height: 100%;
	margin-bottom: .6rem;
}
.header .bannerImg{
	width: 100%;
	height: auto;
}
.center{
    width: 100%; 
    height: 100%;  
}
#center_Box{
	width: 100%;
    height: 3.2857em;
    background-size: 100%;
    position: absolute;
    top: 68%;
}
.center_text{
	text-align: center;
    width: 72%;
    height: 3.2857em;
    /* position: fixed; */
    /* bottom: 67%; */
    margin-left: 14%;
    font-size: 14px;
    color: #333;
    line-height: 1.75em;
    font-weight: bold;
}
.squareBg{
	width: 3rem;
	height: 3rem;
	background: cover;
	-webkit-background-size: cover;
	position: relative;
	justify-content: center;
}
.squareBg .qrCode{
    width: 100%;
	height: 100%;
}
.squareBg .inviteCode{
	color: #666666;
	font-size: .24rem;
}
.inviteFriends{
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 88%;
    left: 33%;		
}
.squareBg{
	width: 100%;
	height: 100%;
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
.squareBg{
	width: 100%;
	height: 100%;
	/*background: url('~src/assets/img/squareBg.png') no-repeat center center;*/
	background: cover;
	-webkit-background-size: cover;
	position: relative;
	justify-content: center;
}
.inviteBtn{
    width: 74%;
    height: .6rem;
	line-height: .6rem;
	color: #fff;
	font-size: .36rem;
	border-radius: 1rem;
    text-align: center;
   	margin-left: 13%;
   	background-color: #e7580c;
	position: absolute;
	top: 145%;
}
.footer{
    width: 90%;
    height: 4rem;
    margin-left: 5%;
    position: absolute;
    top: 156%;
}
.invitation_Title{
    width: 100%;
    height: 14.5%;
    margin-top: 1.5em;
    background-color: #ffe180;
    text-align: center;
    font-size: 16px;
    color: #9e2d17;
    font-weight: 600;
    line-height: 2em;
    border-radius: 10px 10px 0 0;
}
.invitation_Content{
	width: 100%;
    height: 74%;
    background-color: #fff;
    position: relative;
    overflow: hidden;
}
.invitation_Content>ul{
	width: 100%;
	list-style:none;
	margin: 0;
	padding: 0;
	text-align: center;
}
.invitation_Content>ul>li>table{
	width: 100%;
}
.invitation_Content>ul>li>table>table>tr>td:first-of-type{
	float: left;
    margin-left: 18%;	
}
.invitation_Content>ul>li>table>table>tr>td:last-of-type{
	float: right;
	margin-right: 17%;
}
.invitation_Content>ul>li{
	font-size: 15px;
    font-weight: 600;
    color: #333;
    margin-top: 0;
    padding-top: 0.5em;
}
.dataModule{
    width: 100%;
}
.swiper-slide{
    font-size: 18px!important;
    text-align: left!important;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 30px;
}
.dataModule .text{
	width: 100%;
	height: 100%;
	list-style:none;
	margin: 0;
	padding: 0;
}
.dataModule ul>li{
	width: 100%;
    height: 1.43em;
    margin-top: 0.2143em;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    text-align: center;
}
.dataModule ul>li>table{
	width: 95%;
}
</style>
