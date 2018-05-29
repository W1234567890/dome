import axios from 'axios'
import qs from 'qs'

import * as _ from './tool'
import t_api from '../t_api'
import config from 'src/config/im.js'
import routes from '@/route'
import store from '@/store'
import tjs from 'translation.js'

tjs.add(new tjs.GoogleCN())

// axios 配置
axios.defaults.timeout = 5000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头
//axios.defaults.baseURL = 'http://192.168.1.146:8099/a/rest/';//测试线接口地址
//axios.defaults.baseURL = 'http://118.31.69.71:8089/a/rest/';//正式线接口地址

 axios.defaults.baseURL = 'http://testapph5.pengjipay.com:8090/a/rest/';//测试线接口地址
//axios.defaults.baseURL = 'http://192.168.1.110:8182/linker-webs-sellerapi-indubbo/a/rest/';
/*axios.defaults.withCredentials = true;*/
//POST传参序列化
axios.interceptors.request.use((config)=> {
	config.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
	let XToken = locache.get('XToken');
	if(XToken){
		if(XToken.token)
		config.headers.common['x-Token'] = XToken.token;
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
			/*if(res.data.meta.code != "10000"){
				_.toastMsg("服务器异常！");
			}*/
			if(res.data.meta.code == "10000"){
			}else if(res.data.meta.code == "10001"){
		        if(res.data.meta.message){
		        	/*tjs.translate({ api: 'GoogleCN', text: res.data.meta.message.toLowerCase() })
					  .then(function (lan) {
					    _.toastMsg(lan.result[0])
					  }, function (errMsg) {
					    console.log(errMsg)
					    _.toastMsg(res.data.meta.message)
					  })*/
					 _.toastMsg(res.data.meta.message)
		        }
				_.goloading(false);
			}else if(res.data.meta.code == "10002"){
				//console.log(res.data);
				var msg  = res.data.meta.message;
				 if(msg){
					 	if((msg.indexOf("token")!=-1)&&(msg.indexOf("invalid")!=-1)){
							  locache.remove('userInfo');
							  locache.remove('XToken');
							  locache.remove('loginInfo');
							 let ua = navigator.userAgent.toLowerCase(),
						  	     data={msg:"logout"};
								if (/iphone|ipad|ipod/.test(ua)) {
									//调用ios的方法
									  let bridge = getJsBridge();
					    	          let cc=bridge.call("getXTokenData",data);
								}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
									//调用android的方法
									 let cc=js.getXTokenData(JSON.stringify(data));
								}else{
									return;  //pc端
								}
								return;
						}else{
			        	_.toast('未授权!', 'fail');
			        }
				 }else{
				 	_.toast('未授权!', 'fail');
				 }
				_.goloading(false);
				_.logout();
			}else if(res.data.meta.code == "10003"){
				var msg  = res.data.meta.message;
				 if(msg){
					 	if((msg.indexOf("token")!=-1)&&(msg.indexOf("invalid")!=-1)){
							  locache.remove('userInfo');
							  locache.remove('XToken');
							  locache.remove('loginInfo');
							 let ua = navigator.userAgent.toLowerCase(),
						  	     data={msg:"logout"};
								if (/iphone|ipad|ipod/.test(ua)) {
									//调用ios的方法
									  let bridge = getJsBridge();
					    	          let cc=bridge.call("getXTokenData",data);
								}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
									//调用android的方法
									 let cc=js.getXTokenData(JSON.stringify(data));
								}else{
									return;  //pc端
								}
								return;
						}else{
							console.log(msg);
			        	//_.toast('系统错误!', 'fail');
			        }
				 }else{
				 	console.log(res.data);
				 	//_.toast('系统错误!', 'fail');
				 }
				_.goloading(false);
			}else if(res.data.meta.code == "10004"){
				_.toast('登录超时，请重新登录！！！', 'fail');				
			}else if(!res.data.meta.code){
				_.goloading(false);
			}else{
				_.toast('攻城狮正在抢修!', 'fail');
				_.goloading(false);
			}
		}
		
	}
   	if(!res.data){
   		return Promise.reject(res);
   	}
    return res;
}, (error) => {
    _.toast("网络异常", 'fail');
    _.goloading(false);
    return Promise.reject(error);
});
Date.prototype.toLocaleString = function() {
		return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + "  " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
 };
export default {
	mixins: [ t_api],
	//公共方法 禁止修改
	methods:{
		//用户登录//用户登录
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
			!message ? message = "" : message;
			typeof callback == 'function' ? callback : callback = (()=>{});
			tjs.translate({ api: 'GoogleCN', text: message })
			.then(function (lan) {
			    callback(lan.result[0])
			}, function (errMsg) {
			    callback(res.data.meta.message)
			})
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
				locache.remove('timer');
				locache.remove('MinTimer');
				return 0;
			}
			return timestamp;
		},
		TimerInterval( bool,MinTimer){
			if(MinTimer){
				locache.set('MinTimer',MinTimer);
			}
			let mintimer = MinTimer || locache.get('MinTimer') || 300;
			if(bool || locache.get('timer')){
				if(locache.get('timer')){
					//console.info(mintimer,-(locache.get('timer') - this.getDateTimer(new Date().getTime())))
					if(mintimer < -(locache.get('timer') - this.getDateTimer(new Date().getTime()))){
						locache.remove('timer');
						locache.remove('MinTimer');
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
        //加密
		getByUrl( res,callback){
			let appid = config.userRes.appid,
				token = config.userRes.token,
				millis = new Date().getTime(),
				str = typeof res.data == "object" ? JSON.stringify(res.data) : res.data.toString();
				str = this.Encrypt(str).toString();  
			
			let lol = this.digest(str),
				signature = this.generateSignature(appid, token, lol, millis);
				callback({
					url : res.url+"?s="+signature+'&a='+appid+'&t='+millis+'&l='+lol,
					data : str
				})
		},
		generateSignature(appid,token,lol,millis) {
			let timestamp = new Date().getTime(),
				signature = null;
			if (token && timestamp && appid) {
				let srcList = [timestamp,appid,token,lol];
				// 按照字典序逆序拼接参数
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
				locache.remove('MinTimer');
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
					s = date.getSeconds() + ':',
					ss = date.getMilliseconds(),
					data = Y + M + D + h + m + s + ss;
					console.info()
				return data;
			} else {
				return " ";
			}
		},
		handler() {
		  event.preventDefault();
		},
		oss(url,resut,src){
			return new Promise((resolve, reject) => {
				let client = new OSS.Wrapper({
			     accessKeyId :"LTAI3qipQ6vhd7Ua",
			     accessKeySecret:"qOkUZfbMwooMA18RvlS65Mz1f5QbDU",
				 bucket:'tjweimi',
				 endpoint:'oss-cn-zhangjiakou.aliyuncs.com',
			    }),
			    baseurl = "http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/",
			    sysUserId = locache.get('XToken').sysUserId,
	      		data = new Date(),
	      		name = url.name,
	      		//storeAs = (src ? src : "images/test/h5")+"/"+sysUserId+'/'+ data.getTime() + name,
				storeAs = (src ? src : "normal/h5")+"/static"+ data.getTime() + name,
				haibao_url = baseurl + storeAs;
				client.multipartUpload(storeAs, url).then((result)=>{
					this.$nextTick(()=>{
						if(this.getURL(haibao_url)){
							resut && resut(storeAs);
							resolve && resolve(storeAs)
						}else{
							window.msg("上传失败");
							reject && reject()
						}
					})
				}).catch((err)=>{
					reject && reject(err)
					console.log(err);
				});
			})
		},
		getURL(url){
			try{
	            var xmlhttp =new XMLHttpRequest();
	            xmlhttp.open("GET",url,false);   
	            xmlhttp.send();
	            if(xmlhttp.readyState==4){  
	                if(xmlhttp.status!=200){
	            	  return   false;   
	                } else {
	            	  return true;
	                }
	            }
	            return true;   
            }catch(e){
				return false;
			}
	  	},
	  	pickers( e){
			this.time = this.getLocalTime1( new Date() / 1000);
			this.pickerTimer( res=>{
				this.$set(this,e,{
					texts:	res.text,
					dates:  new Date(res.y.text,res.m.text - 1,res.d.text,res.h.text,res.i.text,0)
				})
			})
		},
		pickerTimer( callback){
			var picker = new mui.DtPicker({"value":this.time,"beginYear":2010,"endYear":2020});
				picker.show((res)=>{
					callback && callback(res)
				})
		},
		getLocalTime1(nS) {
			if(nS != 0 && nS) {
				let date = new Date(nS * 1000),
					Y = date.getFullYear() + '-',
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
					D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
					h = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ':',
					m = (date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + '',
					s = (date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds()) + ':',
					ss = date.getMilliseconds(),
					data = Y + M + D + h + m;
				return data;
			} else {
				return " ";
			}
		},
		xhrRequest(url,callback){  
		    var xhr = this.createXHR();  
		    xhr.onreadystatechange = function(){  
		        if(xhr.readyState == 4){  
		            if((xhr.status >= 200 && xhr.status<300) || xhr.status == 304){  //200 表示相应成功 304 表示缓存中存在请求的资源  
		                // 对响应的信息写在回调函数里面  
		                var str = xhr.responseText;  
		                callback && callback(str);  
		            }else{  
		                return 'request is unsucessful '+xhr.status;  
		            }  
		        }  
		    }  
		    xhr.open('get',url,true);  
		    xhr.send();  
		},
		createXHR() {  
		    if(typeof XMLHttpRequest != 'undefined'){  
		        return new XMLHttpRequest();  
		    }  
		    else if(typeof ActiveXObject != 'undefined'){  
		        if(typeof arguments.callee.activeXString != 'string'){  
		            var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0' ,'MSXML2.XMLHttp'], // ie browser different vesions  
		                i,len;  
		            for(i=0,len=versions.length; i<len;i++){  
		                try{  
		                    new ActiveXObject(versions[i]);  
		                    arguments.callee.activeXString = versions[i];  
		                    break;  
		                }  
		                catch(ex){  
		                    // jump  
		                }  
		            }  
		        }  
		        return new ActiveXObject(arguments.callee.activeXString);  
		          
		    }  
		    else{  
		        throw new Error('No XHR object available.');  
		    }
		},
		formatDate(datetime, simple = false) {
		  let tempDate = (new Date()).getTime()
		  let result = this.stringifyDate(datetime, simple)
		  let thatDay = result.thatDay
		  let deltaTime = (tempDate - thatDay) / 1000
		
		  if (deltaTime < 3600 * 24) {
		    return result.withHour
		  } else if (deltaTime < 3600 * 24 * 2) {
		    return result.withLastDay
		  } else if (deltaTime < 3600 * 24 * 7) {
		    return result.withDay
		  } else if (deltaTime < 3600 * 24 * 30) {
		    return result.withMonth
		  } else {
		    return result.withYear
		  }
		},
	  	Geolocation( callback){
	  		let that = this;
			BMap.Convertor = {};
		    BMap.Convertor.translate = this.translate;
			let geolocation = new BMap.Geolocation(),self = this,map = new BMap.Map("allmap");
				geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
					    //let new_point = new BMap.Point(r.point.lat,r.point.lng);
						let url = "http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location="+r.point.lat+","+r.point.lng+"&output=json&pois=1&ak=GlQQK78gEUpvO1hCgeM95WKE";
						that.xhrRequest(url,res=>{
							res = res.replace("renderReverse&&renderReverse(","")
						 	res = res.substr(0,res.length-1);
					 		res = JSON.parse(res);
					 		self.address = res.result.formatted_address;
					 		callback && callback(res);
						})
					}
				},{enableHighAccuracy: true})
		},
	  	isnull( t){
			if(t == "" || t == null || t == undefined || (typeof t == 'object' && t.length <= 0))
				return true;
			
			return false;
		},
		shareGoods( msg,c,b){
			let ua = navigator.userAgent.toLowerCase();
			let data = {
				msg: msg || "testSyn"
			};
			if(msg == "share"){
				b && function(){
					for(var i in b){
						data[i] = b[i]
					}
				}()
			}
			
			if (/iphone|ipad|ipod/.test(ua)) {
				try{
					let bridge = getJsBridge();//调用ios的方法
		        	let cc=bridge.call("getToken",data);
		        	c && c(JSON.stringify(cc));  //cc为返回的值
				}catch(e){
					c && c();  //cc为返回的值
				}
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				try{
					let cc=js.getToken(JSON.stringify(data));//调用android的方法
					c && c(cc);
				}catch(e){
					c && c();  //cc为返回的值
				}
			}else{
				c && c();
				return;  //pc端
			}
		},
		likeNumber( res){
			if(res<=0){
				res = "点赞";
			}else if(res >= 1000 && res <          10000){
				res = Math.floor(res / 1000) + "千";
			}else if(res >= 10000 && res <         100000){
				res = Math.floor(res / 10000) + "万";
			}else if(res >= 100000 && res <        1000000){
				res = Math.floor(res / 100000) + "十万";
			}else if(res >= 1000000 && res <       10000000){
				res = Math.floor(res / 1000000) + "百万";
			}else if(res >= 10000000 && res <      100000000){
				res = Math.floor(res / 10000000) + "千万";
			}else if(res >= 100000000 && res < 	   1000000000){
				res = Math.floor(res / 100000000) + "亿";
			}else if(res >= 1000000000 && res <    10000000000){
				res = Math.floor(res / 1000000000) + "十亿";
			}else if(res >= 10000000000 && res <   100000000000){
				res = Math.floor(res / 10000000000) + "百亿";
			}else if(res >= 100000000000 && res <  1000000000000){
				res = Math.floor(res / 100000000000) + "千亿";
			}else if(res >= 1000000000000 && res < 10000000000000){
				res = Math.floor(res / 1000000000000) + "万亿";
			}else if(res >= 10000000000000 && res <100000000000000){
				res = Math.floor(res / 10000000000000) + "亿亿";
			}
			return res;
		},
		/*
	     * @param： width	int	N		图片宽度
		 * @param： height	int	N		图片高度
		 * @param： bool		int	N		是否返回图片url
	     * */
		getlogoUrl( width,height, imgUrl,bool,isMax){
			let url = config.logoUrl.logoImg,
				save = config.logoUrl.logoSave;
				width = this.remSizes(width) || 0,
				height = this.remSizes(height) || 0,
				imgUrl = imgUrl || "";
			let urs = url + save.replace("h_600","h_" + Math.floor(height)).replace("w_300","w_" + Math.floor(width));
			let getUrl = (this.isnull(imgUrl) || !this.IsPicture(imgUrl)) ? urs : imgUrl;
			isMax = !isMax ? 'cover' : 'auto 100%';
			let color = " #E2E1E1";
			return !bool ? 'url(' + getUrl +') no-repeat center center / ' + isMax + color : getUrl;
		},
		remSizes(size){
			if(!size) return;
			let rems = window.innerWidth/750,
				remSize = (size * rems) * 100;
			return remSize;
		},
		IsPicture( res){
	        //判断是否是图片 - strFilter必须是小写列举
	        let strFilter=".jpeg|.gif|.jpg|.png|.bmp|.pic|";
	        if(res.indexOf(".")>-1){
	            let p = res.lastIndexOf(".");
	            let strPostfix=res.substring(p,res.length) + '|';        
	            strPostfix = strPostfix.toLowerCase();
	            if(strFilter.indexOf(strPostfix)>-1){
	                return true;
	            }
	        }
	        return false;            
	   	},
	   	getLocalTime2(nS) {
			if(nS != 0 && nS) {
				let date = new Date(nS * 1000),
					Y = date.getFullYear() + '-',
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
					D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
					h = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ':',
					m = (date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + '',
					s = (date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds()) + ':',
					ss = date.getMilliseconds(),
					data = Y + M + D;
				return data;
			} else {
				return " ";
			}
		},
		 setWebTittle(title){
		/* let ua = navigator.userAgent.toLowerCase();
		 let data={title:title};
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				  let bridge = getJsBridge();
    	          let cc=bridge.call("setWebTittle",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				// let cc=js.setWebTittle(JSON.stringify(data));
			}else{
				return;  //pc端
			}*/
	  },
	toDate(data){
				let b=new Date(data);				
				b.setTime(data);
				let year=b.getUTCFullYear();
				let month=b.getUTCMonth()+1;
				let day=b.getUTCDate();
				let hour=b.getUTCHours();
				let min=b.getUTCMinutes();
				let sec=b.getUTCSeconds();
				if(month<10){
					month = '0'+month;
				}
				if(day<10){
					day = '0'+day;
				}
				if(hour<10){
					hour = '0'+hour;
				}
				if(min<10){
					min = '0'+min;
				}
				if(sec<10){
					sec = '0'+sec;
				}
				let time=`${year}-${month}-${day} ${hour}:${min}:${sec}`;
				return time;
			},
	  copyText(str){
	  	//复制订单号
	  	  let ua = navigator.userAgent.toLowerCase(),
	  	      data={orderNo:str};
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				  let bridge = getJsBridge();
    	          let cc=bridge.call("copyTextFromh5",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				 let cc=js.copyTextFromh5(JSON.stringify(data));
			}else{
				return;  //pc端
			}
	  },
	  backtoPage(){
	  	//回退到app首页
			 if(!this.backNum){
			 	routes.go(-1);
			 	this.$router.replace({path:'/merChantIndex'});
        		let ua = navigator.userAgent.toLowerCase();
					if (/iphone|ipad|ipod/.test(ua)) {
						//调用ios的方法
						  let bridge = getJsBridge();
		    	          let cc=bridge.call("backToIndex");
					}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
						//调用android的方法
						 let cc=js.backToIndex();
					}else{
						return;  //pc端
					}
					this.backNum=true;
        		}else{
        			routes.go(-1);
         }
	  },
	  concatBuyer(id){
	  	//联系买家
	  	 let ua = navigator.userAgent.toLowerCase(),
	  	      data={buyerId:id};
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				  let bridge = getJsBridge();
    	          let cc=bridge.call("toConcatBuyer",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				 let cc=js.toConcatBuyer(JSON.stringify(data));
			}else{
				return;  //pc端
			}
	  },
	  returnToback(msg,c){
	  	  //退出登录
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
	  },
	  share(data){ //邀请好友注册
			let ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				  let bridge = getJsBridge();
    	          let cc=bridge.call("shareInfoWithUrl",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				 let cc=js.shareInfoWithUrl(JSON.stringify(data));
			}else{
				return;  //pc端
			}
		}
    },
    beforeDestroy(){//实例已经创建完成，属性已经绑定
	   	if(window.TimerInterval){
	   		clearInterval(window.TimerInterval);
	   		let timer = this.TimerInterval(false);
	   	}
    },
}
