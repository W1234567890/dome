<template>
	<div class="wrap"> 
		<div class="Introducebox slidesClassMain" ref='slidesClassMain'>
			<div class="boxHd">
				<h3>特别提醒：</h3>
			</div>
			<div class="boxBd" v-scrollt>
				<div class="listContain" v-for="(item,key) in data">
					<h3 v-html="item.name"></h3>
					<ul>
						<li v-for="(vo,keyChild) in item.list">
							<p>{{vo}}</p>
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
			    	name:'一、申请条件：',
			    	list:[
			    	     '黄金微米、白金微米、微米商号掌柜和店员',
			    	]},{
			    	name:'二、享受权益：',
			    	list:[
			    	     '1、享有推荐商家入驻平台的权益；',
			    	     '2、获得推荐成功的商家销售产品的利润分成权益。'
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
      },
      mounted(){
	   	this.$refs.slidesClassMain.style.height = window.innerHeight +"px";
	   }
	}
</script>

<style lang="scss" scoped>
.boxHd h3{
	text-align: left;
}
</style>