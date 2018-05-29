import Vue from 'vue'

import App from './App'

import './config/rem'
import "./config/locache"
import "./assets/css/style.css"
import 'src/assets/js/aes.js'
import "./assets/css/index.css" 
import "./assets/css/swiper-3.3.1.min.css"
import VueRouter from "vue-router"
import router from './route'
import component from "./config/component.js"
import store from './store'
import api from 'src/mixins/api'
import AwesomeSwiper from 'vue-awesome-swiper'
import mui from 'src/assets/js/mui.min.js'

import $ from 'jquery'


Vue.use( VueRouter);
Vue.use( AwesomeSwiper);

for(var item in api.methods){
	Vue.prototype[item] = api.methods[item]
}
let ex = ( res)=>{
	for(var obj in res){
		if(res[obj] && res[obj].methods){
			ex(res[obj].methods);
		}else{
			Vue.prototype[obj] = res[obj]
		}
	}
}

ex(api.mixins)
Vue.directive('textarea', component.textareas)
Vue.directive('slide', component.scrollt)
Vue.directive('scrollt', component.scrollt)


router.beforeEach((to, from, next) => {
	let isnull =[null,undefined,"",NaN],
	win = window,
	token = locache.get('userInfo') || "";
	win.allowBack = true;//    给个默认值true
	if (to.meta.allowBack !== undefined) {
	    win.allowBack = to.meta.allowBack;
	    if (!win.allowBack) {
	        history.pushState(null, null, location.href);
	    }
	}
	store.dispatch('updateAppSetting', {
	    allowBack: win.allowBack
	})
	if(isnull.indexOf( to.path) > -1){
		next('/linkRegister');
	}else{
		next();
	}
})

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
})