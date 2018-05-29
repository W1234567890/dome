import Vue from 'vue'

import App from './App'

import './config/rem'
import "./config/locache"
import "./assets/css/style.css"
import 'src/assets/js/aes.js'
import './assets/css/swiper-3.3.1.min.css'
import "./assets/css/index.css" 

import VueRouter from "vue-router"
import router from './route'

import FastClick from 'fastclick'
import component from "./config/component.js"
import store from './store'
import api from 'src/mixins/api'
import AwesomeSwiper from 'vue-awesome-swiper'
import mui from 'src/assets/js/mui.min.js'
import 'src/assets/js/mui.picker.min.js'
import $ from 'jquery'
/*import "./config/vconsole.min.js"*/

window.getXTokenApp=function(msg,c){
	let ua = navigator.userAgent.toLowerCase();
	let data = {
		msg: msg || "testSyn"
	};
	let cc=null;
	if (/iphone|ipad|ipod/.test(ua)) {
		try{
			let bridge = getJsBridge();//调用ios的方法
        	 cc=bridge.call("getXTokenData",data);
        	c && c(JSON.stringify(cc));  //cc为返回的值
		}catch(e){
			c && c();  //cc为返回的值
		}
	}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
		try{
			 cc=js.getXTokenData(JSON.stringify(data));//调用android的方法
			c && c(cc);
		}catch(e){
			c && c();  //cc为返回的值
		}
	}else{
		c && c();
		return;  //pc端
	}
};

if(!locache.get('XToken')||!locache.get('XToken').token){
	//判断如果缓存中没有用户token，则调取方法向app请求用户信息
	window.getXTokenApp('token',res=>{
		let reg=/^\"/;
		if(reg.test(res)){
			res=res.substring(1,res.length-1); 
			res=res.replace(/\\/g,""); 
		}
		res=JSON.parse(res);
		locache.set('XToken',res);   //存储用户信息
	});
}
window.setXTokenApp=function(res){
	let reg=/^\"/;
	if(reg.test(res)){
		res=res.substring(1,res.length-1); 
		res=res.replace(/\\/g,""); 
	}
	res=JSON.parse(res);
	locache.set('XToken',res);
}
/*window.$Vue = Vue.prototype;

window.backtoPage=function(){
	console.info(33);
	window.$Vue.backtoPage();
}*/
//开启debug模式
Vue.config.debug = true;
Vue.config.productionTip = false;

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
//console.info(window.$Vue)
Vue.prototype.productSerialNumber="326407336442855424";  //产品序列号
Vue.prototype.backNum=true;
ex(api.mixins)
Vue.directive('textarea', component.textareas)
Vue.directive('scrollt', component.scrollt)
Vue.config.errorHandler = function (err, vm, info) {
  console.info(err, vm, info)
}
router.beforeEach((to, from, next) => {
	let not_login = [
		'/login'
	],
	win = window,
	token = locache.get('XToken') || "";
	win.allowBack = true;//    给个默认值true
	!token ? not_login.push('notfound') : '';
	if (to.meta.allowBack !== undefined) {
	    win.allowBack = to.meta.allowBack;
	    if (!win.allowBack) {
	        history.pushState(null, null, location.href);
	    }
	}
	store.dispatch('updateAppSetting', {
	    allowBack: win.allowBack
	})
    if( not_login.indexOf( to.path) > -1){
		if( token){
			next( false);
			//next('/merChantIndex');
		}else{
			next();
		}
	}else if( !token){
		win.getXTokenApp('token',res=>{
			res=JSON.parse(res);
			locache.set('XToken',res);
		});
		//next('/login');
	}else{
		/*store.dispatch("connectNim");*/
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



