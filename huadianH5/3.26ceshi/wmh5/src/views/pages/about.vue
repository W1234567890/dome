<template>
	<div class="wrap"> 
		<div class="Introducebox slidesClassMain" ref='slidesClassMain'>
			<div v-scrollt>
				<div class="boxBd">
					<div class="protocolContain">
						<ul>
							<li v-for="(item,key) in dataContent">
								<p v-if="item.item">{{item.item}}</p>
							</li>
						</ul>
					</div>
				</div>
				<div class="emptyBottom"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
			    dataContent:[{
			    	item:'少花点...',
			    	},{
			    	item:'少花点...',
			    	},{
			    	item:'少花点...',
			      },{
			    	item:'少花点...',
			      }
			    ],
			}
		},
	    beforeCreate(){
            document.title="关于少花点";
			this.setWebTittle('关于少花点');
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
.protocolContain{
	margin-bottom:.2rem;
}
.protocolContain p{
	font-size:.32rem;
	line-height:.45rem;
	padding:.05rem 0;
	text-indent: .6rem;
	margin:.15rem 0;
}
.emptyBottom{
	width: 100%;
	height:2rem;
}
</style>
