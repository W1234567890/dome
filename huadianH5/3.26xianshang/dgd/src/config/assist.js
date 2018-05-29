import store from 'src/store'
const merchant = function(){
	let merchants = GetRequest().merchant || "326407336442855424";
	return merchants;
}
const getEs = function (type){
	switch (type){
		case "es":
			return {
			  	k : 'pengji20172017~!',
			    i :  '0126039201260300',
			}
			break;
		case "app":
			let apptoken = "50e3d181d17d4af9a663a863f8c9ddb6";
			let appid = "lV7lHXt0CzS";
			try{
				GetRequest().appid && (appid = GetRequest().appid);
				GetRequest().apptoken && (apptoken = GetRequest().apptoken);
			}catch(e){
				//TODO handle the exception
			}
			return {
			  	t: apptoken,//token 为合作商注册时给定的token,一个合作商一个token 一个appid.
			  	a: appid,
			}
			break;
		case "logo":
			return {
			  	logoImg: "http://guoteng.oss-cn-shenzhen.aliyuncs.com/default/default.png",
			  	logoSave: "?x-oss-process=image/resize,m_fill,h_600,w_300",
			}
			break;
		default:
			break;
	}
}
const shareGoods = function( msg,c,arr){
	let ua = navigator.userAgent.toLowerCase();
	let data = {
		msg: msg || "testSyn",
		data: arr,
		callback: c,
	};
	if (/iphone|ipad|ipod/.test(ua)) {
		try{
			let bridge = getJsBridge();//调用ios的方法
        	let cc=bridge.call("goAccountCenter",data);
        	c && c(JSON.stringify(cc));  //cc为返回的值
		}catch(e){
			c && c();  //cc为返回的值
		}
	}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
		try{
			let cc=js.goAccountCenter(JSON.stringify(data));//调用android的方法
			c && c(cc);
		}catch(e){
			c && c();  //cc为返回的值
		}
	}else{
		c && c();
		return;  //pc端
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

const navbar = function(to,from){
	if(isData(to)){
		return;
	}
	if(from.query.token && !to.query.token){
		to.query.token = from.query.token;
	}
	if(from.query.id && !to.query.id){
		to.query.id = from.query.id;
	}
	var ua = navigator.userAgent.toLowerCase();
	let data = {
		navbar: false,
		isBack: false,
		isBtn: false,
		title: null,
	};
	let url = [{
		name: 'activityPublish',
		meta: (c)=>{
			if(to.query.type == "enroll"){
				c && c();
			}
		}
	}]
	if(ua.match(/MicroMessenger/i) != "micromessenger") {
		if(!isData(to.meta) && !isData(to.meta.title)){
			data.navbar = true;
			data.title = to.meta.title;
			data.isBack = !!to.meta.isBack;
			for(var i in url){
				if(url[i].name == to.name){
					url[i].meta(res=>{
    					data.title = "发布报名";
					})
				}
			}
			data.isBtn = !isData(to.meta.isBtn) ? to.meta.isBtn : false;
		}
	}
	store.dispatch("setNavbar",data);
}

const Encrypt = function(data){
	let user = getEs("es"),
    	encrypted = CryptoJS.AES.encrypt(data,CryptoJS.enc.Utf8.parse(user.k),
            {
                iv:CryptoJS.enc.Utf8.parse(user.i),
                mode:CryptoJS.mode.CBC,
                padding:CryptoJS.pad.Pkcs7
            });
    return encrypted;
}
const setData = function( res,success){
	if(typeof res == "string"){
		res = Decrypt(res.replace(/[\r\n]/g,""));
	}
	let type = typeof res;
	if(type == 'string'){
		try{
			success(JSON.parse(res))
		}catch(e){
			success();
		}
    }else{
    	success(res);
    }
}
const Decrypt = function( encrypted){
	let user = getEs("es"),
    	decrypted = CryptoJS.AES.decrypt(encrypted,CryptoJS.enc.Utf8.parse(user.k),
            {
                iv:CryptoJS.enc.Utf8.parse(user.i),
                mode:CryptoJS.mode.CBC,
                padding:CryptoJS.pad.Pkcs7
            });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

//加密
const getByUrl = function( res,callback){
	let appid = getEs("app").a,
		token = getEs("app").t,
		millis = new Date().getTime(),
		str = typeof res.data == "object" ? JSON.stringify(res.data) : res.data.toString();
		str = Encrypt(str).toString();  
	
	let lol = digest(str),
		signature = generateSignature(appid, token, lol, millis);
		callback({
			url : res.url+"?s="+signature+'&a='+appid+'&t='+millis+'&l='+lol,
			data : str
		})
}
const generateSignature = function(appid,token,lol,millis) {
	let timestamp = new Date().getTime(),
		signature = null;
	if (token && timestamp && appid) {
		let srcList = [timestamp,appid,token,lol];
		// 按照字典序逆序拼接参数
		srcList.sort();
		srcList.reverse();
		let data = "";
		forEach(srcList, (i,o)=>{
			data += o;
		});
		signature = digest(data);
		srcList = [];
		srcList = null;
	}
	return signature;
}

const forEach = function( res, c){
	let isnull = [null,undefined,"",NaN];
	if(isnull.indexOf(res) > -1) return;
	for(let i = 0;i<res.length;i++){
		c(i,res[i]);
	}
}

const digest = function(strSrc, encName) {
	let res = Encrypt(strSrc).toString();
	let strDes = res.substring(0, 20);
	return strDes;
}

const pageScroll = (function () {
    const fn = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    let islock = false;

    return {
        lock: function () {
            if (islock)return;
            islock = true;
            document.addEventListener('touchmove', fn);
        },
        unlock: function () {
            islock = false;
            document.removeEventListener('touchmove', fn);
        }
    };
})();

const isIOS = !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

const isColor = function (value) {
    const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
    const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/;
    const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;

    return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value);
};

const getScrollview = function (el) {
    let currentNode = el;
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
};

const checkInview = function (scrollView, el) {
    const contentHeight = scrollView == window ? document.body.offsetHeight : scrollView.offsetHeight;
    const contentTop = scrollView === window ? 0 : scrollView.getBoundingClientRect().top;

    const post = el.getBoundingClientRect().top - contentTop;
    const posb = post + el.offsetHeight;

    return (post >= 0 && post < contentHeight) || (posb > 0 && posb <= contentHeight);
};

const hasClass = function (elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
};

const addClass = function (ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
};

const removeClass = function (ele, cls) {
    if (hasClass(ele, cls)) {
        let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
};

//Copy from iView. https://www.iviewui.com/
const scrollTop = function (el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }

    scroll(from, to, step);
};
const GetRequest = function() {
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
}
export { GetRequest, pageScroll, isIOS, isColor, getScrollview, checkInview, addClass, removeClass, scrollTop, getByUrl, setData, Decrypt, merchant,shareGoods,navbar,JsBridgeRoute,isData};
