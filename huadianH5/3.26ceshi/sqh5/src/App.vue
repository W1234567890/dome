<template>
  <div id="app">
  		<v-loading v-show="loading"></v-loading>
  		<v-toast v-show="showToast"></v-toast>
  		<!--<transition :name="transitionName" >-->
					<router-view class="view"></router-view>
			<!--</transition>-->
  </div>
</template>

<script>
import toast from '@/components/other/toast'
import loading from '@/components/other/loading'
import config from 'src/config/im.js'

import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'app',
    components: {
    	'v-toast': toast,
    	'v-loading': loading,
		},
    data () {
        return {
						transitionName: 'slide-left',
						leave: "fold-leave-active1",
						enter: "fold-enter-active1",
						mode: "in-out",
						token: null,
						tab:[
							'index',
							'msglist',
							'uploadPay',
							'spread',
							'myIndex',
							'activityIndex'
						],
						not_login:[
							'/register_1',
							'/register_2',
							'/resetPaymentPassword',
							'/retrievePassword',
							'/resetLoginPassword',
							'/login',
						]
        }
    },
    computed: {
      ...mapGetters([
          'loading',
          'showToast',
          'showAlert',
          'browser',
          'showTitle',
          'getBackInfo',
          'getXToken'
      ]),
    },
    watch: {
        '$route' ( to, from) {
        		/*let toName = this.tab.indexOf( to.name) > -1,
        				fromName = this.tab.indexOf( from.name) > -1,
        				isnull = [null,undefined,"",NaN],
        				isfrom = isnull.indexOf(from.name) > -1,
        				tologin = this.not_login.indexOf( to.path) > -1;
		        		if(window.BackInfo){
		        			this.transitionName = 'slide-left';
		        		}else{
		        			this.transitionName = 'slide-right';
		        		}
		        		if(!window.allowBack && (fromName || isfrom) && toName){
		        			this.transitionName = null;
		        		}*/
		        		this.transitionName = null;
								window.BackInfo = false;
        }
    },
    methods: {
    	...mapActions({ setNavState: 'setNavState' }),
    },
    mounted () {
    	/*let ua = navigator.userAgent.toLowerCase();
		  if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
			  this.$router.push({path:"/home",query:{pdSNum:this.pdSNum}});
			}*/
    }
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 306004 */
  src: url('http://at.alicdn.com/t/font_7nc15h5vlki0ms4i.eot');
  src: url('http://at.alicdn.com/t/font_7nc15h5vlki0ms4i.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_7nc15h5vlki0ms4i.woff') format('woff'),
  url('http://at.alicdn.com/t/font_7nc15h5vlki0ms4i.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_7nc15h5vlki0ms4i.svg#iconfont') format('svg');
}
.iconfont {
    font-family: iconfont!important;
    /*font-size: 28px;*/
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
body,html{
	width: 100%;
	height: 100%;
}
#app {
	font-family: "微软雅黑";
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	width: 100%;
	height: 100%;
	margin: auto;
	background-color: rgb(246,246,246);
  opacity: 1;
}

.slide-right-enter-active,
.slide-right-enter,
.slide-right-leave,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-enter,
.slide-left-leave,
.slide-left-leave-active{
	position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e6e6e6;
  opacity: 1;
  overflow: hidden;
}
.view{
	background-color: #e6e6e6;
  opacity: 1;
  width: 100%;
  height: 100%;
}

.slide-right-enter-active {
  transition: all .4s ease;
}
  
.slide-right-enter {
  transform: translate3d(100%, 0, 0);
  -webkit-transform: translate3d(100%, 0, 0);
}
  
.slide-right-leave {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
}
  
.slide-right-leave-active {
  transition: all .4s ease;
  transform: translate3d(-20%, 0, 0);
  -webkit-transform: translate3d(-20%, 0, 0);
}

.slide-left-enter-active {
  transition: all .4s ease;
  transform: translate3d(0%, 0, 0);
  -webkit-transform: translate3d(0%, 0, 0);
  z-index: 0;
}
  
.slide-left-enter {
  transform: translate3d(-20%, 0, 0);
  -webkit-transform: translate3d(-20%, 0, 0);
  z-index: 0;
}
  
.slide-left-leave {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  z-index: 1111;
}
  
.slide-left-leave-active {
  transition: all .4s ease;
  transform: translate3d(100%, 0, 0);
  -webkit-transform: translate3d(100%, 0, 0);
  z-index: 1111;
}
</style>
