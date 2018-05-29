<template>
	<div class="headerComponent">
		<div class="headerWrap">
		   	  <span class="icon iconfont routerBack" @click="routerBack" v-html="iconLeft"></span>
		   	  <p class="headerTitle" v-html="title"></p>
		</div>
	</div>
</template>

<script type="text/babel">
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
    export default {
        data() {
        	 return{
        	 	iconLeft:"&#xe608;",
            };
        },
        computed: mapState({
        title: state => state.com.title
       }),
        created(){
        	
        },
        mounted(){
        	
        },
        methods: {
        	routerBack(){
        		this.backtoPage();
        	}
      }
    };
</script>

<style scoped>

.headerComponent{
    width: 100%;
    height:.8rem;
    line-height:.8rem;
    top:0;
	position: fixed;
	z-index: 100;
	background:#FFFFFF;
}
.headerWrap{
	width: 100%;
    height: 0.79rem;
    line-height:.79rem;
	position: fixed;
	background:#FFFFFF;
	border-bottom:.02rem solid #eaeaea;
	
}
.routerBack{
	display: inline-block;
	position: absolute;
	font-size:.36rem;
	left:.1rem;
	z-index: 12;
	color:#666;
	transform: rotate(180deg);
	cursor:pointer;
}
.headerTitle{
	font-size:.32rem;
	width:100%;
	text-align: center;
}
</style>