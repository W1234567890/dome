<template>
	<div class="wrap"> 
		<div class="Introducebox slidesClassMain" ref='slidesClassMain'>
			<div class="boxBd" v-scrollt>
				<p class="conditionWrap">
					<span class="conditionName">{{condition.name}}</span>
					<span>{{condition.txt}}</span>
					
				</p>
				<div class="listContain" v-for="(item,key) in data">
					 <h3 class="listName">{{item.name}}</h3>
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
			    title:"vip特权",
			    condition:{
			    	name:'入会条件：',
			    	txt:'交纳**现金'
			      },
			    data:[{
			    	name:'特权：',
			    	list:[
			    	    '1.获取**元购物卡' ,
			    	    '2.获取价值***元超值商品组合',
			    	    '3.获取***元左右电器1台'
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