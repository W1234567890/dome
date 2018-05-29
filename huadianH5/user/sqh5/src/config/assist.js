import store from 'src/store'
import route from 'src/router'
const merchant = function(){
	let merchant = this.$router.currentRoute.query.merchant || "1";
	return merchant;
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
			let apptoken = "#@!1234567890!@#";
			let appid = "canairport001";
			try{
				route.currentRoute.query.appid && (appid = route.currentRoute.query.appid);
				route.currentRoute.query.apptoken && (apptoken = route.currentRoute.query.apptoken);
			}catch(e){
				//TODO handle the exception
			}
			return {
			  	t: apptoken,//token 为合作商注册时给定的token,一个合作商一个token 一个appid.
			  	a: appid,
			}
			/*return {
			  	t: "#@!1234567890!@#",//token 为合作商注册时给定的token,一个合作商一个token 一个appid.
			  	a: "canairport001",
			}*/
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
	let query = {};
//	if(from.query.token && !to.query.token){
//		to.query.token = from.query.token;
//	}
//	if(from.query.id && !to.query.id){
//		to.query.id = from.query.id;
//	}
	for(var i in from.query){
		if(from.query[i] && !to.query[i]){
			if(i != 'all'){
				to.query[i] = from.query[i];
			}
		}
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
	if(to.name == 'inviteFriends'){
		store.dispatch("setNavbar",data);
		return;
	}
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
const ease = {
    quadratic: {
      style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fn: function (k) {
        return k * (2 - k);
      }
    },
    circular: {
      style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
      fn: function (k) {
        return Math.sqrt(1 - (--k * k));
      }
    },
    back: {
      style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      fn: function (k) {
        var b = 4;
        return (k = k - 1) * k * ((b + 1) * k + b) + 1;
      }
    },
    bounce: {
      style: '',
      fn: function (k) {
        if ((k /= 1) < (1 / 2.75)) {
          return 7.5625 * k * k;
        } else if (k < (2 / 2.75)) {
          return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        } else if (k < (2.5 / 2.75)) {
          return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        } else {
          return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
      }
    },
    elastic: {
      style: '',
      fn: function (k) {
        var f = 0.22,
			e = 0.4;

        if (k === 0) { return 0; }
        if (k == 1) { return 1; }

        return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
      }
    }
}
const _elementStyle = document.createElement('div').style;
const _vendor = (function () {
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
    var transform;
    var i = 0;
    var l = vendors.length;

    for (; i < l; i++) {
      transform = vendors[i] + 'ransform';
      if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
    }
    return false;
})();

const _prefixStyle = function(style) {
    if (_vendor === false) return false;
    if (_vendor === '') return style;
    return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
};
const style = {
    transform: _prefixStyle('transform'),
    transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
    transitionDuration: _prefixStyle('transitionDuration'),
    transitionDelay: _prefixStyle('transitionDelay'),
    transformOrigin: _prefixStyle('transformOrigin')
};
function CPos(x, y){
	this.x = x;
	this.y = y;
}
function GetObjPos(ATarget){
	var target = ATarget;
	var pos = new CPos(target.offsetLeft, target.offsetTop);
	var target = target.offsetParent;
	while (target){
		pos.x += target.offsetLeft;
		pos.y += target.offsetTop;
	    target = target.offsetParent
	}
	return pos;
}
function isOther(){
	var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
	    //在微信中打开
	    return true;
	}else if (ua.match(/WeiBo/i) == "weibo") {
	    //在新浪微博客户端打开
	    return true;
	}else if (ua.match(/QQ/i) == "qq"){
		return true;
	}
	return false;
}


export {isOther,GetObjPos,ease, style, pageScroll, isIOS, isColor, getScrollview, checkInview, addClass, removeClass, scrollTop, getByUrl, setData, Decrypt, merchant,shareGoods,navbar,JsBridgeRoute,isData};
