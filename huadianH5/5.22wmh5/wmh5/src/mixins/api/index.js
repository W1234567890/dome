import axios from 'axios'
import qs from 'qs'

import * as _ from './tool'
import t_api from '../t_api'

/*import config from 'src/config/im.js'*/
import routes from '@/route'
import store from '@/store'

import tjs from 'translation.js'

// tjs.add(new tjs.GoogleCN())

// axios 配置
axios.defaults.timeout = 60000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头
//axios.defaults.baseURL = 'http://192.168.1.146:8090/a/rest/';//配置接口地址
axios.defaults.baseURL = 'http://apph5.pengjipay.com:8085/a/rest/';
/*axios.defaults.withCredentials = true;*/
//POST传参序列化
axios.interceptors.request.use((config)=> {
	config.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
	
	let xurl = config.url;
    
    if (xurl.slice(39,57) == "myhome/connectList") {
    	_.shareGoods( "token",res=>{
			res = res && res.replace(/"/g,"");
			config.headers.common['x-Token'] = res;
		});
    }else{
    	let XToken = locache.get('XToken');
			if(XToken){
				if(XToken.token){
					config.headers.common['x-Token'] = XToken.token;
				}
			}
    }
    /*if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }*/
    return config;
},(error) =>{
    _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
	if(typeof res.data == "string"){
		res.data = _.Decrypt(res.data.replace(/[\r\n]/g,""));
	}
	if(typeof res.data == 'string'){
    	res.data = JSON.parse(res.data)
   	}
	if(typeof res.data == 'object'){
		if(res.data.meta){
			console.log(res.data.meta)
			if(res.data.meta.code != "10000"){
				console.log("服务器异常!")
    		   //_.toastMsg('服务器异常!');   		  
    		}
			// if(res.data.meta.code == "10000"){
    		
			// }else if(res.data.meta.code == "10001"){
		 //        if(res.data.meta.message){
		 //        	tjs.translate({ api: 'GoogleCN', text: res.data.meta.message.toLowerCase() })
			// 		  .then(function (lan) {
			// 		    _.toastMsg(lan.result[0])
			// 		  }, function (errMsg) {
			// 		    console.log(errMsg)
			// 		    _.toastMsg(res.data.meta.message)
			// 		  })
		 //        }
			// 	_.goloading(false);
			// }else if(res.data.meta.code == "10002"){
			// 	_.toast('未授权!', 'fail');
			// 	_.goloading(false);
			// 	_.logout();
			// }else if(res.data.meta.code == "10003"){
			// 	var msg  = res.data.meta.message
			// 	if(msg){
			// 		msg = msg.toLowerCase();
			// 		msg = msg.replace('invalid',"") + ' invalid';
		 //        	tjs.translate({ api: 'GoogleCN', text: msg})
			// 		  .then(function (lan) {
			// 		    _.toastMsg(lan.result[0])
			// 		  }, function (errMsg) {
			// 		    console.log(errMsg)
			// 		    _.toastMsg(res.data.meta.message)
			// 		  })
		 //        }else{
		 //        	_.toast('系统错误!', 'fail');
		 //        }
			// 	_.goloading(false);
			// }else if(!res.data.meta.code){
			// 	_.goloading(false);
			// }else{
			// 	_.toast(res.data.msg, 'fail');
			// 	_.goloading(false);
			// }
		}
		
	}
   	if(!res.data){
   		return Promise.reject(res);
   	}
    return res;
}, (error) => {
    _.toast("网络异常", 'fail');
    _.goloading(false);
    alert(error)
    return Promise.reject(error);
});

export default {
	mixins: [ t_api],
	//公共方法 禁止修改
	methods:{
		//加密
		getByUrl( res,callback){
			let appid,token;
			
			//测试
			appid= "canairport001";			
			token = "#@!1234567890!@#";
			
			
			// appid = "NgF7yYqyWqy";		
			// token= "c08d1cf33d7d4ed499a709f07221f866";			
			let millis = new Date().getTime(),
				str = typeof res.data == "object" ? JSON.stringify(res.data) : res.data.toString();
				str = this.Encrypt(str).toString();  
			
			let lol = this.digest(str),
				signature = this.generateSignature(appid, token, lol, millis);
				callback({
					url : res.url+"?s="+signature+'&a='+appid+'&t='+millis+'&l='+lol,
					data : str
				})
		},
		//用户登录
	    ajax( o, bool,isloading) {
	    	if(!isloading){
	    		this.$store.dispatch('setLoadingState', true);
	    	}
	        this.fetch(o.url, o.data).then(res => {
	        	this.setData(res,o,bool);
	        	if(!bool){
          			this.$store.dispatch('setLoadingState', false);
          		}
          }).catch(res => {
          		this.setData(res,o,bool);
          		if(!bool){
          			this.$store.dispatch('setLoadingState', false);
          		}
            })
	    },
	    PickerShow(data,factory,num){
			let Picker = new mui.PopPicker({layer: num || 1});
			Picker.setData(data);
			Picker.show((items) =>{
				factory(items);
			});
		},
	    fetch(url, params) {
		    return new Promise((resolve, reject) => {
		        axios.post(url, params)
		            .then(response => {
		                resolve(response.data);
		            }, err => {
		                reject(err);
		            })
		            .catch((error) => {
		               	reject(error)
		            })
		    })
		},
		toast(str, icon) {
		    this.$store.dispatch('showToast', true)
		    if (icon == 'success') {
		        this.$store.dispatch('showSuccess', true)
		        this.$store.dispatch('showFail', false)
		    } else {
		        this.$store.dispatch('showSuccess', false)
		        this.$store.dispatch('showFail', true)
		    }
		    this.$store.dispatch('toastMsg',str);
		    
		    setTimeout(() => {
		        this.$store.dispatch('showToast', false); 
		    },1500); 
		},
		alert( o){
			let callback = typeof o.callback == "function" ? o.callback : (()=>{}),
				content = o.content || ' ',
				title = o.title || ' ';
				
				mui.alert(title, content, ()=>{
					callback();
				});
		},
		confirm( o){
			let callback = typeof o.callback == "function" ? o.callback : (()=>{}),
				content = o.content || ' ',
				title = o.title || ' ',
				Array = o.Array || ['是', '否'];
				
				mui.confirm(title, content, Array, (e)=>{
					if (e.index == 0) {
						callback(true);
					} else {
						callback(false);
					}
				})
		},
		prompt( o){
			let callback = typeof o.callback == "function" ? o.callback : (()=>{}),
				content = o.content || ' ',
				title = o.title || ' ',
				Array = o.Array || ['确定', '取消'],
				placeholder = o.placeholder || '';
				
				mui.prompt(title, placeholder, content, Array, (e)=>{
					if (e.index == 0) {
						callback(true,e.value);
					} else {
						callback(false);
					}
				})
		},
		toastMsg(content){
			let contents = content || '';
			mui.toast(contents);
		},
		GoogleTranslate( message,callback){
			/*!message ? message = "" : message;
			typeof callback == 'function' ? callback : callback = (()=>{});
			tjs.translate({ api: 'GoogleCN', text: message })
			.then(function (lan) {
			    callback(lan.result[0])
			}, function (errMsg) {
			    callback(res.data.meta.message)
			})*/
		},
		cDownDefaultTimer(timerKey){
			let win = window;
			win.defaultInterval = setInterval
			if(win.defaultInterval){
				clearInterval(win.defaultInterval);
			}
			win.defaultInterval = setInterval(()=>{
				if(this.$store.state.user.timestamp < 0){
					clearInterval(win.defaultInterval);
					let defaultTimer = delete(locache.get('defaultTimer')[timerKey]);
					locache.set('defaultTimer',defaultTimer);
					return;
				}
				this.$store.dispatch('setDefaultTimer',{
					timer: locache.get('defaultTimer')[timerKey].timer,
					id: locache.get('defaultTimer')[timerKey].id,
					mintimer: locache.get('defaultTimer')[timerKey].mintimer,
				});
			},1000);
		},
		defaultTimer(bool,MinTimer,timerKey){
			var mintimer = MinTimer || 300;
			var timers = this.$store.state.user.defaultTimer;
			if(timerKey){
				if(timers[timerKey]){
					/*console.info(timers[timerKey].timer)*/
				}else{
					if(!locache.get('defaultTimer') || !locache.get('defaultTimer')[timerKey]){
						this.$store.dispatch('setDefaultTimerKey', timerKey);
						this.$store.dispatch('setDefaultTimer',{
							timer: this.getDateTimer(new Date().getTime()),
							id: timerKey,
							mintimer: mintimer,
						});
					}else{
						this.$store.dispatch('setDefaultTimerKey', timerKey);
						this.$store.dispatch('setDefaultTimer',{
							timer: locache.get('defaultTimer')[timerKey].timer,
							id: locache.get('defaultTimer')[timerKey].id,
							mintimer: locache.get('defaultTimer')[timerKey].mintimer,
						});
					}
					this.cDownDefaultTimer(timerKey);
				}
			}
			
		},
		countDownTimer( timer,MinTimer){
			if(!locache.get('timer')){
				locache.set('timer',this.getDateTimer(new Date().getTime()));
			}
			return this.counDownGetTimer(MinTimer);
		},
		counDownGetTimer(MinTimer){
			let timestamp = MinTimer + (locache.get('timer') - this.getDateTimer(new Date().getTime()));
			if(timestamp <= 0){
				locache.remove('timer')
				return 0;
			}
			return timestamp;
		},
		TimerInterval( bool,MinTimer){
			let mintimer = MinTimer || 300;
			if(bool || locache.get('timer')){
				if(locache.get('timer')){
					console.info(mintimer,-(locache.get('timer') - this.getDateTimer(new Date().getTime())))
					if(mintimer < -(locache.get('timer') - this.getDateTimer(new Date().getTime()))){
						locache.remove('timer')
						return;
					}
				}
				let win = window;
				if(win.TimerInterval){
					clearInterval(win.TimerInterval);
				}
				this.counDownSetTimer( mintimer);
				win.TimerInterval = setInterval(()=>{
					this.counDownSetTimer( mintimer);
				},1000);
			}
		},
		Encrypt(data){
			_.CryptoJSAESKey();
			let user = this.$store.state.user.cryptojsAESKey,
            	encrypted = CryptoJS.AES.encrypt(data,user.key,
                    {
                        iv:user.iv,
                        mode:CryptoJS.mode.CBC,
                        padding:CryptoJS.pad.Pkcs7
                    });
            return encrypted;
       	},
       	Decrypt( encrypted){
       		_.CryptoJSAESKey();
       		let user = this.$store.state.user.cryptojsAESKey,
            	decrypted = CryptoJS.AES.decrypt(encrypted,user.key,
	                {
	                    iv:user.iv,
	                    mode:CryptoJS.mode.CBC,
	                    padding:CryptoJS.pad.Pkcs7
	                });
            return decrypted.toString(CryptoJS.enc.Utf8);
        },
		generateSignature(appid,token,lol,millis) {
			let timestamp = new Date().getTime(),
				signature = null;
			if (token && timestamp && appid) {
				let srcList = [timestamp,appid,token,lol];
				// 按照字典序逆序拼接参数qrCode
				srcList.sort();
				srcList.reverse();
				let data = "";
				$.each(srcList, (i,o)=>{
					data += o;
				});
				signature = this.digest(data);
				srcList = [];
				srcList = null;
			}
			return signature;
		},
		digest(strSrc, encName) {
			let res = this.Encrypt(strSrc).toString();
			let strDes = res.substring(0, 20);
			return strDes;
		},
		counDownSetTimer( MinTimer){
			let timestamp = this.countDownTimer( new Date(),MinTimer),win = window;;
			if(timestamp <= 0){
				locache.remove('timer');
				clearInterval(win.TimerInterval);
			}
			this.$store.dispatch('timer', timestamp);
		},
		getDateTimer( timer){
			let timestamp = parseInt(timer/1000);
			return timestamp;
		},
	    setData( res,o,bool){
	    	if(typeof res == "string"){
	    		res = this.Decrypt(res.replace(/[\r\n]/g,""));
	    	}
	    	let type = typeof res,success = o.success || {};
        	if(type == 'string'){
            	success(JSON.parse(res))
            }else{
            	success(res);
            }
           
            if(!bool){
            	this.$store.dispatch('setLoadingState', false)
            }
	    },
		getLocalTime(nS) {
			if(nS != 0 && nS) {
				let date = new Date(nS * 1000),
					Y = date.getFullYear() + '-',
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
					D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
					h = date.getHours() + ':',
					m = date.getMinutes() + ':',
					s = date.getSeconds() + ' ',
					ss = date.getMilliseconds(),
					data = Y + M + D + h + m + s;
				return data;
			} else {
				return " ";
			}
		},
		pickerTimer( callback){
			var picker = new mui.DtPicker({"value":this.time,"beginYear":2010,"endYear":2020});
				picker.show((res)=>{
					callback && callback(res)
				})
		},
		
		handler() {
		  event.preventDefault();
		},
    },
    beforeDestroy(){//实例已经创建完成，属性已经绑定
	   	if(window.TimerInterval){
	   		clearInterval(window.TimerInterval);
	   		let timer = this.TimerInterval(false);
	   	}
    }
}