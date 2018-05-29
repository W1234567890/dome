<template>
	<div>
		<router-link to="/home">home</router-link>
		<div class=" slidesClassMain" ref='slidesClassMain' v-viewPage>
			<div class="slides_main" ref="slides_main" v-slide>
				<div v-for="i in 14" class="list">这是第 {{i}} 行</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
        	
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
    	
    },
    mounted () {
    	
    }
}
</script>

<style>
.slidesClassMain{
	height: 100%;
	position: relative;
}
.slides_main{
	position: absolute;
	background-color: #FFFFFF;
	width: 100%;
}
.list{
	height: 60px;
    line-height: 60px;
    font-size: 18px;
    padding-left: 20px;
    border-bottom: 1px solid #e5e5e5;
}
 
</style>