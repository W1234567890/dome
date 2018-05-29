<template>
	<div class="wrap"> 
		<div class="Introducebox slidesClassMain" ref='slidesClassMain'>
			<div class="boxBd" v-scrollt>
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
			    	name:'供应商：',
			    	list:[
			    	     '1、平台具有完善的支付体系和合理的交易保障制度',
			    	     '2、平台拥有庞大的用户群体，可共享平台流量',
			    	     '3、供应商可利用平台的营销组件进行商品促销',
			    	     '4、平台为供应商提供视频直播功能',
			    	     ' 更多......'
			    	]}
			    ]
			}
		},
		beforeCreate(){
			document.title="申请说明";
			this.setWebTittle('申请说明');
        },
	   beforeMount(){
     	  this.$store.dispatch('showTitle',this.showTitle),
		  this.$store.dispatch('title',this.title)
	   },
	    mounted(){
	   	this.$refs.slidesClassMain.style.height = window.innerHeight +"px";
	   }
	}
</script>

<style lang="scss" scoped>
</style>