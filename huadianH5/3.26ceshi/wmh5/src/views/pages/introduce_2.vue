<template>
	<div class="wrap"> 
		<div class="Introducebox">
			<div class="boxBd">
				<div class="listContain" v-for="(item,key) in data">
					<!--<h3 v-html="item.name"></h3>-->
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
			    	name:'采购商：',
			    	list:[
			    	     '1、拥有推荐优质商家的权益',
			    	     '2、拥有商家的管理权益',
			    	     '3、拥有推荐商品的补贴权益',
			    	     '更多......'
			    	]}
			    ]
			}
		},
	   beforeMount(){
     	  this.$store.dispatch('showTitle',this.showTitle),
		  this.$store.dispatch('title',this.title)
	   },
	    beforeCreate(){
            document.title="申请说明";
			this.setWebTittle('申请说明');
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