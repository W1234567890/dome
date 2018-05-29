<template>
	<div id="myIndex">
		<div class="footer-dg"></div>
		<footer id="footerComponent" class="footerComponent" ref='footer'>
			<template v-for="( vo, key) in list">
				<router-link :to="vo.path" class="footer-unit" :class="vo.color">
					<div class="footer-icon iconfont" :style=[vo.style] v-html="vo.icon"></div>
					<div class="footer-name">{{ vo.name}}</div>
				</router-link>
			</template>
		</footer>
	</div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
	data() {
		return {
			list: {
				communityIndex: 
				{icon: '&#xe677;',style:{"font-size":".38rem"},active:'&#xe60d;',name: '活动吧',path: '/consumption/activity/activityIndex',color: "chui"},
			}
		}
	},
	computed: {
      	...mapGetters([
          'userInfo',
          'getUserData',
          'getXuyuelist'
      	]),
    },
	props:['showMenu'],	
	watch: {
        messages( v){
        	this.$emit("childsay",this.messages);
        }
	},
	created(){
        this.list[this.showMenu].color = "ccheng";
        this.list[this.showMenu].icon = this.list[this.showMenu].active
	},
    mounted() {
		this.$emit('childsay', this.$refs.footer.getBoundingClientRect().height )
    },
	methods: {
		
	}
}
</script>

<style scoped>

.footerComponent{
	position: fixed;
    width: 100%;
    height: 0.99rem;
    line-height: 30px;
    bottom: 0;
	font-size:.28rem;
	border-top:.01rem solid #dbdbdb;
	background:#f8fbfc;
	z-index: 5;
	display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
}
.footer-unit{
	float: left;
	width: 100%;
	height: 100%;
}
.footer-icon{
	width: .38rem;
	height: .45rem;
	font-size: .38rem;
	line-height: .5rem;
	margin: auto;
	margin-top: .14rem;
}
.footer-name{
	color: #9d9d9d;
	width: 100%;
	height: .36rem;
	line-height: .36rem;
	text-align: center;
	font-size:.24rem;
}
a{
	text-decoration: none;
}

.ccheng{
	color: #fd850b;
}
.footer-dg{
	height: 1rem;
	width: 100%;
	background-color: #e6e6e6;
}
.chui{
	color: #555555;
}
</style>