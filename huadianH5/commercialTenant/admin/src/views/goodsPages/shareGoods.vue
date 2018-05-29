<template>
	<div class="wrapper">
		<div class="contentBox">
			<img :src="addSuccess"  class="addSuccess"/>
			<div class="">添加成功</div>
			<router-link :to="{path:'merChantIndex'} " class="addBtn">
				<span class="icon iconfont">&#xe600;</span>
				<span class="">继续添加</span>
			</router-link>
		</div>
		<div class="footer" @click="">完成</div>
	</div>
</template> 
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
			addSuccess:'http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500549285590success.png',
		}
	},
	methods: {
		
	},
	beforeMount(){
	},
	watch: {
			
	},
}
</script>
<style lang="scss" scoped>
	@import "~src/assets/css/z_config.scss";
	.contentBox{
		text-align: center;
	    font-size: $fz30;
	    color: $C333333;
	}
	.addSuccess{
		margin: .7rem 0 .3rem 0;
		height: 1rem;
		width: auto;
	}
	.addBtn{
		width: 2.6rem;
		height: 0.9rem;
		margin: 0.6rem auto 0 auto;
		color: #fff;
		background: #E7580C;
		border-radius: .1rem;
		display:-webkit-box;
	    display:-webkit-flex;
	    display:-ms-flexbox;
	    display:flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	    justify-content: center;
	}
	.addBtn .icon{
		font-size:.5rem;
		margin-right: .1rem;
	}
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		color: #fff;
		background: #E7580C;
		font-size: .36rem;
	}
</style>

