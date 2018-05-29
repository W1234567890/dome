<template>
	<div class="wrap"> 
		<div class="Introducebox">
			<div class="boxBd">
				<div class="listContain" v-for="(item,key) in data">
					<h3 v-html="item.name"></h3>
					<ul>
						<li v-for="(vo,keyChild) in item.list">
							<p v-html="vo"></p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showTitle:false,
			    title:"说明",
			    data:[{
			    	name:'一、代理期限',
			    	list:[
			    	     '平台公司授权社区代理商兼体验店期限为三年（期满在同等条件下拥有优先续约权）。',
			    	]},{
			    	name:'二、代理区域',
			    	list:[
			    	     '平台授权每家社区代理商的范围为：8至10万名居住人口的区域。',
			    	]},{
			    	name:'三、代理义务',
			    	list:[
			    	     '1、负责签订50家以上特约商户协议，监督管理特约商户履行协议约定的各项义务。',
			    	     '2、指导或帮助签约特约商户将图片及优惠规则等数据上传到少花点平台上。',
			    	     '3、指导自身门店及特约商户的2万名新老顾客，采用智能手机下载“少花点平台APP”，并做好下载用户的投诉处理、消费咨询等客情服务工作。',
			    	     '4、安排50平米左右场地、送货员等，负责代理区域的物流中转配送和线下产品体验工作。',
			    	     '5、接受平台市级代理商的日常运营管理，遵守平台制定的《代理商管理制度》。'
			    	]},{
			    	name:'四、代理酬金',
			    	list:[
			    	      '1、 社区代理商发展的最高限额2万名“少花点会员”在平台消费后产生毛利的20%，作为其代理酬金及部份商品终端配送费用。',
			    	      '2、少花点平台上部份供应商，将委托社区代理商向周边用户进行最后1公里左右的用户订购商品终端配送服务，除平台给予上述费用外，供应商将额外给予社区代理商3-5%左右的中转配送费用。',
			    	]},{
			    	name:'五、需具备条件',
			    	list:[
			    	     '1、拥有1000平米以上超市或餐厅并具有合法经营执照等手续。',
			    	     '2、拥有10万元社区代理费用支付能力（原已经签约体验店者若将名额转让，不得低于该金额，否则，平台公司不予过户）。'
			    	]},{
			    	name:'六、代理流程',
			    	list:[
			    	     '第一步：在少花点平台“我要合作”专栏填写申请表。',
			    	     '第二步：平台审核通过后到总部签约并接受运营专业培训。',
			    	     '第三步：培训考核合格后开始运营8至10万名居民人口的区域。'
			    	]}
			    ]
			}
		},
	   beforeMount(){
     	  this.$store.dispatch('showTitle',this.showTitle),
		  this.$store.dispatch('title',this.title)
	   },
	    beforeCreate(){
            document.title="社区代理商/线下体验店代理合作政策";
			this.setWebTittle('社区代理商/线下体验店代理合作政策');
       }
	}
</script>

<style lang="scss" scoped>
.wrap{
	width:calc(100vw);
	height:calc(100vh);
	background: #FFFFFF;
	padding:.15rem 2%;
	color:#333;
}
.boxHd h3{
	margin-top:.1rem;
	font-size:.34rem;
	text-align: center;
}
.boxBd{
	margin-top:.15rem;
}
.listContain{
	margin-bottom:.2rem;
}
.listContain h3{
	font-size:.32rem;
}
.listContain li{
	font-size:.30rem;
	line-height:.45rem;
	padding:.05rem .1rem;
}
</style>