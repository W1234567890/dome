 <template>
	<div class="wrap"> 
		<div class="Introducebox slidesClassMain" ref='slidesClassMain'>
			<div v-scrollt>
				<ul class="boxHd">
				<li v-for="(item,key) in dataHeader" :class="key<2?'hdItem':'hdItemB'">
					<span class="label" :class="{specLabel:key==0}">{{item.label}}</span>
				    <span>{{item.txt}}</span>
				</li>
			</ul>
			<div class="boxBd">
				<div class="listContain">
					<ul>
						<li v-for="(vo,key) in dataContent1">
							<p>{{vo}}</p>
						</li>
					</ul>
				</div>
				<div class="listContain">
					<ul>
						<li v-for="(item,key) in dataContent2">
							<h3 class="itemName">{{item.item}}</h3>
							<ul>
								<li v-for="vo in item.content">
									<p v-html="vo"></p>
								</li> 
							</ul>
							<div v-if="item.tip" class="tipWrap">
								<span class="tipName">注：</span>
								<span v-html='item.tip'></span>
							</div>
						</li>
					</ul>
				</div>
				<div class="listContain">
					<ul>
						<li v-for="(vo,key) in dataContent3">
							<p>{{vo}}</p>
						</li>
					</ul>
				</div>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
 
	export default {
		data() {
			return {
				showTitle:false,
			    title:"说明",
			    dataHeader:[
			          {label:'甲方：',txt:'少花点科技有限公司'},
			          {label:'住所：',txt:'天津生态城国家动漫园文三路105号读者大厦二层'},
			          {label:'法定代表人：谢小波',txt:'联系电话：022-25265396 '},
			    ],
			    dataContent1:[
			       '甲方是一家提供线上+线下的第三方信息技术服务平台，线上（即少花点线上商城）产品展示与宣传以及线下（即少花点线下体验店）产品体验与推广。',
			       '会员委托甲方平台代收购物款(通过微信支付、支付宝支付和银行转账等方式)人民币1500元以上（含1500元），获得黄金微米资格，获得等额微米币，获得等值赠品。黄金微米须满足当月最后一日前在少花点线上商城消费微米币1500元以上（含1500元），之后每月至少购物一次，否则甲方平台有权依据《微米手册》的规定进行调整。',
			       '会员委托甲方平台代收购物款（通过微信支付、支付宝支付和银行转账等方式）人民币20000元以上，获得白金微米资格，获得等额微米币，获得等值赠品。白金微米须满足当月最后一日之前在少花点线上商城消费微米币1500元以上（含1500元），之后每月消费不得低于500元，否则甲方平台有权依据《微米手册》的规定进行调整。',
			       '黄金微米和白金微米确认其支付的购物款（即代收款）全权委托甲方代收，甲方代收后再与供应商进行结算。',
			       '黄金微米和白金微米开具发票，以微米币消费额度对应金额由供应商开具，甲方不承担开具发票的义务。'
			    ],
			    dataContent2:[{
			    	item:'黄金微米权益如下：',
			    	content:[
			    	'1、参与试吃试用；',
			    	'2、参与甲方平台（线上+线下）活动体验；',
			    	'3、对参与试吃试用活动的，获得该商品进入“少花点线上商城”的投票权；',
			    	'4、用微米币消费获得少花点线上商城规定的微积分的权利；',
			    	'5、黄金微米委托少花点线上商城代收购物款(通过微信支付、支付宝支付和银行转账等方式支付，可续费)人民币1500元以上获得：<br>1）黄金微米资格；<br>2）等值赠品（一次性提走）；<br>3）等额微米币（可在少花点线上商城持续消费）；<br>4）晋级白金微米的权利；<br>5）获得甲方平台“微蜂”资格，参与最后一公里配送盈利。'
			    	]},{
			    	item:'白金微米权益如下：',
			    	content:[
			    	'1、参与试吃试用；',
			    	'2、参与甲方平台（线上+线下）活动体验；',
			    	'3、对参与试吃试用活动的，获得该商品进入“少花点线上商城”的投票权；',
			    	'4、用微米币消费获得少花点线上商城规定的微积分的权利；',
			    	'5、白金微米委托少花点线上商城代收购物款(通过微信支付、支付宝支付和银行转账等方式支付，可续费)人民币20000元以上获得：<br>1）白金微米资格；<br>2）等值赠品（一次性提走）；<br>3）等额微米币（可在少花点线上商城持续消费）；<br>4）成为该少花点项目合伙人，获得该少花点线下体验店分红权；<br>5）晋级成为该少花点股权合伙人的权利；<br>6）获得甲方平台“微蜂”资格，参与最后一公里配送盈利；<br>7）共享该少花点线下体验店，开通掌柜资格，赚取掌柜收益；<br>8）可以有偿使用少花点，为自己的产品作推广活动（前提是通过公司产品部门审核通过）；<br>9）分阶段接受各类培训，有资格参与互联网大咖授课及面对面交流机会。'
			    	],
			    	tip:'白金微米作为项目合伙人，通过自己所属少花点线下体验店，依据各自为少花点线下体验店推荐的微米会员人数、参与该少花点线下体验店成为掌柜的销售业绩、当月在平台消耗掉的微米币数量加权平均获得各自的分红收益。'
			      }
			    ],
			    dataContent3:[
			    '本协议用户注册、会员等级、会员权益、会员的升级、保级、降级规则、微积分获得、微积分使用途径、微积分有效期等细则以甲方制定、公布的《微米手册》等制度为准。',
			    '本协议的制定权、发布权、解释权、终止权等权利归甲方所有，黄金微米和白金微米有任何问题应在第一时间与甲方沟通。',
			    '本协议自乙方点击“确认”时成立并生效。'
			    ]
			}
		},
	   beforeMount(){
     	  this.$store.dispatch('showTitle',this.showTitle),
		  this.$store.dispatch('title',this.title)
	   },
	    beforeCreate(){
            document.title="代收款委托协议";
			this.setWebTittle('代收款委托协议');
       },
	   mounted(){
	         this.$refs.slidesClassMain.style.height = window.innerHeight +"px";
	   },
}
</script>

<style lang="scss" scoped>
.wrap{
	background: #FFFFFF;
	padding:.15rem .2rem;
	color:#333;
	moz-user-select: -moz-none;
	-moz-user-select: none;
	-o-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.boxHd{
	margin-top:.1rem;
	font-size:.32rem;
}
.boxHd li{
	display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
	display: flex;
	margin:.1rem 0;
}
.hdItem .label{
	width:1.2rem;
}
.hdItem .specLabel{
	font-weight: 700;
}
.boxHd .hdItemB {
	display: flex;
	justify-content: space-between;
}
.boxBd{
	margin-top:.15rem;
}
.listContain{
	margin-bottom:.2rem;
}
.listContain li{
	font-size:.3rem;
	line-height:.45rem;
	padding:.05rem 0;
}
.listContain  p{
	text-indent: .6rem;
}
.itemName{
	font-weight: 700;
}
.tipName{
	font-weight: 700;
}
</style>
