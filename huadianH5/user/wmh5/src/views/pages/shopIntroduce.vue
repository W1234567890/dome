<template>
	<div class="wrap"> 
		<div class="Introducebox slidesClassMain" ref='slidesClassMain'>
			<div class="boxBd" v-scrollt>
				<div class="listContain" v-for="(item,key) in data">
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
			    	name:'微米商号：',
			    	list:[
			    	     '1、由GP发起招募LP一起在各小区成立微米商号线下体验店',
			    	     '2、会员可在微米商号线下体验店试吃试用，参与丰富多彩的体验活动，投票决定产品是否上线到微米商号线上商城',
			    	     '3、体验店以店长制，店长为大掌柜，其他人员为掌柜......',
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

</style>
