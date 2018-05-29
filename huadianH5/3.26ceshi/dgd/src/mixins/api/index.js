import axios from 'axios'
import qs from 'qs'
//import route from 'src/router'
import store from 'src/store'
import { GetRequest,getByUrl, setData, Decrypt, merchant,shareGoods,JsBridgeRoute,isData} from 'src/config/assist.js';

!window.myApp && (window.myApp = new Framework7())
// axios 配置
axios.defaults.timeout = 5000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头
//axios.defaults.baseURL = 'http://192.168.1.146:8090/a/rest/';//配置接口地址
 axios.defaults.baseURL = 'http://apph5.pengjipay.com:8085/a/rest/';
//POST传参序列化
axios.interceptors.request.use((configs)=> {
	let postUrl = GetRequest().postUrl;
	if(postUrl){
		try{
			configs.url = configs.url.replace(configs.baseURL,postUrl);
		}catch(e){}
	}
	configs.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
	let token = GetRequest().token;
	token && (configs.headers.common['x-Token'] = token);
    return configs;
},(error) =>{//错误的传参
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
	if(typeof res.data == "string"){
		res.data = Decrypt(res.data.replace(/[\r\n]/g,""));
	}
	if(typeof res.data == 'string'){
    	res.data = JSON.parse(res.data)
   	}
	if(typeof res.data == 'object'){
		if(res.data.meta){
			let code = res.data.meta.code;
			switch (code){
				case "10000"://成功
    				return res.data;
					break;
				case "10001"://普通错误
					break;
				case "10002"://没有权限
					break;
				case "10003"://登陆失败等错误
					break;
				default:
					break;
			}
		}
		
	}
   	return Promise.reject(res);
}, (error) => {
    return Promise.reject(error);
});
export default{
	$ajax(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = this.formatParams(options.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }
        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    },
    //格式化参数
    formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".",""));
        return arr.join("&");
    },
	ajax( obj){
		obj = Object.assign({
			data: {},
			url: "",
			success: (res)=>{},
			error: (err)=>{
				console.info(err)
				if(!err || !err.data || !err.data.meta){
					return;
				}
				let msg = err.data.meta.message;
				myApp.addNotification({
			        title: '错误消息',
			        message: msg,
			        closeOnClick: true,
			   });
			}
		},obj);
		obj.data = Object.assign(obj.data,{
			//merchantinfoId: merchant()
			productSerialNumber: merchant()
		});
		//console.info(JSON.stringify(obj));
		let data = obj.data,url = obj.url;
		getByUrl({data,url}, res=>{
			this.fetch(res.url, res.data).then(res => {
	        	setData(res,obj.success);
          	}).catch(res => {
          		setData(res,obj.error);
           	})
		})
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
	filerTime(nS){
		if(nS != 0 && nS) {
			let date = new Date(nS * 1000),
				Y = date.getFullYear() + '-',
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
				D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
				h = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ':',
				m = (date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + ':',
				s = (date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds()) + '',
				ss = date.getMilliseconds(),
				data = M + D;
			return data;
		} else {
			return " ";
		}
	},
	tips(title,msg){
		myApp.addNotification({
	        title: title || "提示",
	        message: msg,
	        closeOnClick: true,
	   });
	},
	Play(data){
		if(!data){
			this.errs && this.errs.call(this)
			return;
		}
		if(theme == 'ios'){
			try{
	       	 	let cc = getJsBridge().call("Pay",data);
			}catch(e){this.errs && this.errs.call(this)}
		}else if(theme == 'material'){
			try{
				let cc = js.Pay(JSON.stringify(data));
			}catch(e){this.errs && this.errs.call(this)}
		}else{
			this.errs && this.errs.call(this);
		}
	},
	errTips(err){
		setTimeout( ()=> {
	        this.$f7.hidePreloader()
	    }, 160)
		if(!err || !err.data || !err.data.meta){
			return;
		}
		let msg = err.data.meta.message;
		this.tips("提示",msg);
	},
	AppLink(facname,data){
		let cc;
		data = data || [];
		if(!facname){
			return cc;
		}
		try{
			if(theme == 'ios'){
		        cc = getJsBridge().call(facname,data);
			}else if(theme == 'material'){
				cc = js[facname](JSON.stringify(data));
			}else{
			}
			
		}catch(e){}
		return cc;
	},
	keypad(el,change){
		let myKeypad = myApp.keypad({
	        input: el,
	        valueMaxLength: 4,
	        dotButton: false,
	        toolbarCloseText: "关闭",
	        onChange: change
	    });
	    return myKeypad;
	},
	isData(res){
		if(typeof res == 'boolean'){
			return true;
		}
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
	},
	back(){
   		/*route.back();
		if((window.fromName.toName == window.fromName.name) || isData(window.fromName.fromName)){
			JsBridgeRoute(true,res=>{
    			window.fromName = null;
			});
		}*/
   	},
	transdate(endTime){ 
		var date=new Date(); 
		date.setFullYear(endTime.substring(0,4)); 
		date.setMonth(endTime.substring(5,7)-1); 
		date.setDate(endTime.substring(8,10)); 
		date.setHours(endTime.substring(11,13)); 
		date.setMinutes(endTime.substring(14,16)); 
		date.setSeconds(endTime.substring(17,19)); 
		return Date.parse(date)/1000; 
		/*this.ajax({
				data: {
					publishType: "post",
					pageNum: 1,
					pageSize: 10,
				},
				url: "activity/myList",
				success: (res)=>{
					console.info(res)
				},
			});*/
			/*this.ajax({
				data: {
					phone: "17688548064",
					tempCode: "register",
				},
				url: "sms/send",
				success: (res)=>{
					
					console.info(res)
				},
			})	
			this.ajax({
				data: {
					phone:"17688548064",
					password:"123456",
					checkCode:"7207",
				},
				url: "user/register",
				success: (res)=>{
					console.info(res)
				},
			})	
			this.ajax({
				data: {
					phone: "17688548064",//手机号码
					password: "123456",//密码
				},
				url: "user/login",
				success: (res)=>{
					console.info(res)
				},
			});*/
	},
	getlogoUrl( width,height, imgUrl,bool,isMax){
		var config = {
			logoUrl: {
			  	logoImg: "http://guoteng.oss-cn-shenzhen.aliyuncs.com/default/default.png",
			  	logoSave: "?x-oss-process=image/resize,m_fill,h_600,w_300",
		  	}
		}
		let url = config.logoUrl.logoImg,
			save = config.logoUrl.logoSave;
			width = this.remSizes(width) || 0,
			height = this.remSizes(height) || 0,
			imgUrl = imgUrl || "";
		let urs = url + save.replace("h_600","h_" + Math.floor(height)).replace("w_300","w_" + Math.floor(width));
		let getUrl = (this.isData(imgUrl) || !this.IsPicture(imgUrl)) ? urs : imgUrl;
		isMax = !isMax ? 'cover' : 'auto 100%';
		let color = " #E2E1E1";
		return !bool ? 'url(' + getUrl +') no-repeat center center / ' + isMax + color : getUrl;
	},
	IsPicture( res){ 
        //判断是否是图片 - strFilter必须是小写列举
        let strFilter=".jpeg|.gif|.jpg|.png|.bmp|.pic|";
    		res = res.replace('_250x250','');
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
	remSizes(size){
		if(!size) return;
		let rems = window.innerWidth/750,
			remSize = (size * rems) * 100;
		return remSize;
	},
	getTime(nS) {
		if(nS != 0 && nS) {
			let date = new Date(nS * 1000),
				Y = date.getFullYear() + '-',
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
				D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
				h = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ':',
				m = (date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + ':',
				s = (date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds()) + '',
				ss = date.getMilliseconds(),
				data = Y + M + D + h + m + s;
			return data;
		} else {
			return " ";
		}
	},
	filerTime(nS){
		if(nS != 0 && nS) {
			let date = new Date(nS * 1000),
				Y = date.getFullYear() + '-',
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
				D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
				h = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ':',
				m = (date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + ':',
				s = (date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds()) + '',
				ss = date.getMilliseconds(),
				data = M + D;
			return data;
		} else {
			return " ";
		}
	},
	match(value) {
	  if (!value) { return ''};
	  value = value.toString();
	  return value.match(/\d+(\.\d{0,2})?/) && value.match(/\d+(\.\d{0,2})?/)[0] || "";
	},
	num(value){
		if (!value) { return ''};
	  	value = value.toString();
		return value.replace(/\D/g,'');
	},
	oss(url,resut,src){
		return new Promise((resolve, reject) => {
			this.userRefresh((res,bool)=>{
				if(!bool){
					this.errTips();
					myApp.addNotification({
				        title: '错误消息',
				        message: "图片上传失败",
				        closeOnClick: true,
				    });
	                return;
				}
				let merchantinfoId = merchant.call(this);
				let client = new OSS.Wrapper({
			      //accessKeyId: 'LTAIZDPSHKoPQDqa',
			      //accessKeySecret: 'apQX0IJlgyzt8cawM13UPSgDbJ47Ih',
			      //bucket: 'pengchuang',
			      //endpoint: 'oss-cn-shenzhen.aliyuncs.com'
			      accessKeyId: 'LTAIMiCbPWCbEUFV',
			      accessKeySecret: 'zOAfX2sSisNKZnQtOckYgMSTs6Fxvg',
			      bucket: 'zhihuituiguang-imgs',
			      endpoint: 'oss-cn-beijing.aliyuncs.com'
			    }),
			    //baseurl = "http://pengchuang.oss-cn-shenzhen.aliyuncs.com/",
			    baseurl = "http://zhihuituiguang-imgs.oss-cn-beijing.aliyuncs.com/",
			    token = this.GetRequest().token || 'test',
			    id = res.userId,
	      		data = new Date(),
	      		name = url.name,
				storeAs = (src ? src : merchantinfoId + "/h5")+"/"+id+'/'+ data.getTime() + name,
				haibao_url = baseurl + storeAs;
				client.multipartUpload(storeAs, url).then((result)=>{
					this.$nextTick(()=>{
						if(this.getURL(haibao_url)){
							resut && resut(haibao_url);
							resolve && resolve(haibao_url)
						}else{
							reject && reject()
						}
					})
				}).catch((err)=>{
					this.errTips();
					myApp.addNotification({
				        title: '错误消息',
				        message: "图片上传失败",
				        closeOnClick: true,
				    });
					reject && reject(err)
					console.log(err);
				});
			})
			
		})
	},
	userRefresh(c){
		this.ajax({
			url: "login/refresh",
			data: {},
			success:res=>{
				c && c(res,true);
			},
			error:res=>{
				console.info(res)
				c && c(res,false);
			}
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
  	GetQuery(name,res){
  		var s = this.GetRequest()[name] || res;
  		return s;
  	},
  	GetRequest() {
	   var url = location.search; //获取url中"?"符后的字串
	   var theRequest = new Object();
	   if (url.indexOf("?") != -1) {
	      var str = url.substr(1);
	      var strs = str.split("&");
	      for(var i = 0; i < strs.length; i ++) {
	         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
	      }
	   }
	   return theRequest;
	},
	voucher(nS){
		if(nS != 0 && nS) {
			let date = new Date(nS * 1000),
				Y = date.getFullYear() + '.',
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.',
				D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
				h = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ':',
				m = (date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + ':',
				s = (date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds()) + '',
				ss = date.getMilliseconds(),
				data = Y + M + D;
			return data;
		} else {
			return " ";
		}
	},
	voucher1(nS){
		if(nS != 0 && nS) {
			let date = new Date(nS * 1000),
				Y = date.getFullYear() + '-',
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
				D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
				h = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ':',
				m = (date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + ':',
				s = (date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds()) + '',
				ss = date.getMilliseconds(),
				data = Y + M + D;
			return data;
		} else {
			return " ";
		}
	},
	content(res){
		if(res){
			c = res;
		    c = this.escape2Html(c);
		    c = c.replace(/img src=/g,"img class='lazyImg' data-lazy=");
		    c = c.replace(/preload="none"/g,"preload='metadata'");
		    c = c.replace(/controls=""/g,"controls='' x5-video-player-type='h5' webkit-playsinline poster='http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500453310139videoBgBack4.png'");
			return c;
		};
		return "";
	},
	escape2Html(str) {
		let arrEntities = {'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
		return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
	},
	mobil(tel){
		if(!tel) return;
		return tel.substring(0,3) + '****' + tel.substring(tel.length-4,tel.length)
	},
	smartSelectAddOption(el){
		
	}
}
