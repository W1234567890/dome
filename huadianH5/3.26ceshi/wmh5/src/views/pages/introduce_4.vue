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
			    	name:'一、合作期限',
			    	list:[
			    	     '平台与联营超市合作期限为三年（合作期满在同等条件下拥有优先续约权）。',
			    	]},{
			    	name:'二、合作区域',
			    	list:[
			    	     '平台授权每家联营超市/餐厅的合作区域为：8至10万名人口的区域。',
			    	]}
			    ]
			}
		},
	   beforeMount(){
     	  this.$store.dispatch('showTitle',this.showTitle),
		  this.$store.dispatch('title',this.title)
	   },
	    beforeCreate(){
            document.title="定点商户";
			this.setWebTittle('定点商户');
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