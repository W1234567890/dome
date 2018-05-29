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
			    title:"申请说明",
			    data:[{
			    	name:'一、代理期限',
			    	list:[
			    	     '平台授权大区代理商期限为三年（期满在同等条件下拥有优先续约权）。',
			    	]},{
			    	name:'二、代理区域',
			    	list:[
			    	     '平台授权每家大区代理商的范围为：800至1000万名居住人口的区域。',
			    	]},{
			    	name:'三、代理义务',
			    	list:[
			    	     '1、签约后2个月内，在代理区域内招募10家市级代理商，指导和管理该市级 代理商完成代理区域内的各项义务。',
			    	     '2、指导和管理属下代理商签订5000家以上特约商户协议。',
			    	     '3、指导和管理属下代理商将签约商户图片及优惠规则等数据上传到少花点平 台上。',
			    	     '4、指导属下代理商及特约商户引导最高限额200万名新老顾客，采用智能手机下载“少花点平台APP”，并管理属下代理商做好用户的投诉处理、消费咨询等客情服务工作。',
			    	     '5、指导和管理属下代理商做好物流中转配送和线下产品体验店的设立工作。',
			    	     '6、接受总部总裁办的日常管理，遵守平台制定的《代理商管理制度》。'
			    	]},{
			    	name:'四、代理收益',
			    	list:[
			    	      '1、用户消费酬金',
			    	      '<p style="margin-left:.5rem">大区代理商名下的最高限额200万名“少花点用户”在平台消费后产生毛利的2%，作为其代理酬金。</p>',
			    	      '2、招商酬金',
			    	      '<p style="margin-left:.5rem">大区代理商为平台每招募一家市级代理商，可获20%招商酬金。</p>',
			    	]},{
			    	name:'五、需具备条件',
			    	list:[
			    	     '1、拥有办公场所和合法经营执照等手续。',
			    	     '2、拥有200万元大区代理费用支付能力（原已经签约的省级代理商若将名额转让，不得低于该金额，否则，平台公司不予过户）。',
			    	]},{
			    	name:'六、代理流程',
			    	list:[
			    	     '第一步：在少花点平台“我要合作”专栏填写申请表。',
			    	     '第二步：平台审核通过后到总部签约并接受运营专业培训。',
			    	     '第三步：培训考核合格后开始运营800至1000万名居民人口的区域。'
			    	]}
			    ]
			}
		},
	   beforeMount(){
     	  this.$store.dispatch('showTitle',this.showTitle),
		  this.$store.dispatch('title',this.title)
	   },
	    beforeCreate(){
            document.title="大区代理政策";
			this.setWebTittle('大区代理政策');
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