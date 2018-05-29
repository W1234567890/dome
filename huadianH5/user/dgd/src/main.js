import Vue from 'vue'
//import Framework7 from 'framework7'
import Framework7 from 'src/assets/js/framework7'
import Framework7Vue from 'framework7-vue'

import AppStyles from './css/app.css'
import Routes from './routes.js'

import App from './app'
import store from './store'

import component from "./config/component.js"
import api from './mixins/api/'

import './config/rem'
import "./config/locache"
import './config/aes.js'
import YDUI from 'vue-ydui';
import {ScrollTab, ScrollTabPanel} from 'vue-ydui/dist/lib.rem/scrolltab';
Vue.use(YDUI);
Vue.component(ScrollTab.name, ScrollTab);
Vue.component(ScrollTabPanel.name, ScrollTabPanel);
//import './config/vconsole.min.js'

window.theme = (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ? 'ios' : 'material';

Vue.use(Framework7Vue)
for(var item in api){
	Vue.prototype[item] = api[item]
}


import keypadCss from './assets/css/framework7.keypad.min.css'
import keypadJs from './assets/js/framework7.keypad.min.js'

Vue.config.productionTip = false;
Vue.directive('textarea', component.textareas);
Vue.directive('styles', component.styles);
Vue.directive('focus', component.focus);
Vue.directive('slide', component.scrollt);
Vue.directive('iswiper', component.iswiper);
Vue.directive('iscroll', component.iscroll);
Vue.directive('video', component.video);

var fadeTimeout = null;
new Vue({
  el: '#app',
  template: '<app/>',
  store,
  framework7: {
    root: '#app',
    routes: Routes,
    onPageInit: res=>{
    		/*document.addEventListener('message', function(e) {
	       alert(e.data)
	    });*/
	    
    },
    preroute: (views,res)=>{
    		clearTimeout(fadeTimeout);
    		if(fadeTimeout){
    			fadeTimeout = null;
    		}
        fadeTimeout = setTimeout((function (val) {
        		try{
        			let data = {}
	        		if(res.isBack && views.history.length <= 1 && res.url == "#"){
	        			data = {
	        				page: views.history.length,
	        				isBack: true,
	        			}
					if(window.theme == 'ios'){
				       	let cc = getJsBridge().call("goBack",data);
					}else if(window.theme == 'material'){
						let cc = js.goBack(JSON.stringify(data));
					}
	       		}else{
	        			data = {
	        				page: views.history.length,
	        				isBack: false,
	        			}
	        		}
	        		window.postMessage(JSON.stringify(data));
        		}catch(e){}
        }).bind(this), 0);
    		return true
    }
  },
  components: {
    app: App
  }
});

