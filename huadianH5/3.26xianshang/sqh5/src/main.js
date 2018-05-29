// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import './config/rem'
import router from './route'
import store from './store'
import mui from 'src/assets/js/mui.min.js'
import 'src/assets/js/mui.picker.min.js' 
import AwesomeSwiper from 'vue-awesome-swiper'

import "./config/locache"
import './config/aes.js'
import component from "./config/component.js"
import api from 'src/mixins/api'

import config from 'src/config/im.js'

import "./assets/css/style.css"
import "./assets/css/index.css" 
import './assets/css/swiper-3.3.1.min.css'
/*import "./config/vconsole.min.js"*/

Vue.use( AwesomeSwiper);
localStorage.removeItem('token');
Vue.config.debug = true;
Vue.config.productionTip = false;

Vue.directive('textarea', component.textareas);
Vue.directive('slide', component.scrollt);

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
const JsBridgeRoute = function(allowBack,c){
	let ua = navigator.userAgent.toLowerCase();
	let data = {
		allowBack,
	};
	if (/iphone|ipad|ipod/.test(ua)) {
		try{
			let bridge = getJsBridge();//调用ios的方法
        	let cc=bridge.call("allowBack",data);
        	console.info(bridge)
        	c && c(JSON.stringify(cc));  //cc为返回的值
		}catch(e){
			c && c();  //cc为返回的值
		}
	}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
		try{
			let cc=js.allowBack(JSON.stringify(data));//调用android的方法
			c && c(cc);
		}catch(e){
			c && c();  //cc为返回的值
		}
	}else{
		c && c();
	}
}
const isData = function(res){
	let isnull =[null,undefined,"",NaN];
	if(isnull.indexOf(res) > -1){
		return true;
	}
	if(typeof res == "object" || typeof res == "array"){
		if(res.length <= 0){
			return true;
		}
	}
	return false;
};
const  getUrlParam=function(name) {
		   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		   var _pIndex=window.location.href.indexOf(name);
		   var r = window.location.href.substr(_pIndex).match(reg); //匹配目标参数
		   if (r != null) return unescape(r[2]); return null; //返回参数值
};
router.beforeEach((to, from, next) => {
	Vue.prototype.pdSNum="326407336442855424";   //少花点的合作商Id
	switch(Vue.prototype.pdSNum){
        case "326407336442855424":   //少花点的正式线
             Vue.prototype.sassAppName="少花点";
             Vue.prototype.sassAppLogoUrl="http://shaohuadian17.oss-cn-beijing.aliyuncs.com/normal/h5/static/shdLogo.png";
             Vue.prototype.logoSave="?x-oss-process=image/resize,m_fill,h_600,w_300";
             Vue.prototype.mainColor="#e1282e";
             Vue.prototype.downLoadAppUrl="http://a.app.qq.com/o/simple.jsp?pkgname=com.uniaip.android";
             break;
	}
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
	if(isData(window.fromName)){
   		window.fromName = {};
   		window.fromName.name = to.name;
   	}
   	window.fromName.toName = to.name;
   	window.fromName.fromName = from.name;
   	//if((window.fromName.toName == window.fromName.name) || isData(window.fromName.fromName)){
   	if(to.meta.allowBack !== undefined){	
		JsBridgeRoute(true,res=>{
			/*window.fromName = null;*/
		});
	}else{
		JsBridgeRoute(false,res=>{
			/*window.fromName = null;*/
		});
	}
	store.dispatch('updateAppSetting', {
	    allowBack: win.allowBack
	})
	if(isnull.indexOf( to.path) > -1){
		next('/activityIndex');
	}else{
		next();
	}
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
})
