import store from 'src/store'

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

const getTime = Date.now || function getTime() { return new Date().getTime(); };

const activeListener = {passive: false, capture: false};

const addEvent = function (el, type, fn, capture) {
	var supportsPassive = false;
	try {
	  var opts = Object.defineProperty({}, 'passive', {
	    get: function() {
	      supportsPassive = true;
	    }
	  });
	  el.addEventListener(type, null, opts);
	} catch (e) {};
    if (el[0]) el = el[0];
    el.addEventListener(type, fn, !!capture);
}

const removeEvent = function (el, type, fn, capture) {
	var supportsPassive = false;
	try {
	  var opts = Object.defineProperty({}, 'passive', {
	    get: function() {
	      supportsPassive = true;
	    }
	  });
	  el.removeEventListener(type, null, opts);
	} catch (e) {};
    if (el[0]) el = el[0];
    el.removeEventListener(type, fn, !!capture);
}
 /*
 *parem:current：当前鼠标位置
 *parem:start：touchStart时候记录的Y（可能是X）的开始位置，但是在touchmove时候可能被重写
 *parem:time： touchstart到手指离开时候经历的时间，同样可能被touchmove重写
 *parem:lowerMargin：y可移动的最大距离，这个一般为计算得出 this.wrapperHeight - this.scrollerHeight
 *parem:wrapperSize：如果有边界距离的话就是可拖动，不然碰到0的时候便停止
 */
const momentum = function (current, start, time, lowerMargin, wrapperSize) {
    var distance = current - start,
	speed = Math.abs(distance) / time,
	destination,
	duration,
	deceleration = 0.0006;

    destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
    duration = speed / deceleration;

    if (destination < lowerMargin) {
      destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
      distance = Math.abs(destination - current);
      duration = distance / speed;
    } else if (destination > 0) {
      destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
      distance = Math.abs(current) + destination;
      duration = distance / speed;
    }

    return {
      destination: Math.round(destination),
      duration: duration
    };
};

const hasTouch = 'ontouchstart' in window;

const style = {
    transform: _prefixStyle('transform'),
    transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
    transitionDuration: _prefixStyle('transitionDuration'),
    transitionDelay: _prefixStyle('transitionDelay'),
    transformOrigin: _prefixStyle('transformOrigin')
};

const eventType = {
    touchstart: 1,
    touchmove: 1,
    touchend: 1,

    mousedown: 2,
    mousemove: 2,
    mouseup: 2
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
const GetSlideAngle = function(dx, dy) {  
   return Math.atan2(dy, dx) * 180 / Math.PI;  
}
const GetSlideDirection = function(startX, startY, endX, endY) {  
   var dy = startY - endY;  
   var dx = endX - startX;  
   var result = 0;  
   
       //如果滑动距离太短  
   if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {  
       return result;  
   }  
   var angle = GetSlideAngle(dx, dy);  
   if(angle >= -45 && angle < 45) {  
       result = 4;  
   }else if (angle >= 45 && angle < 135) {  
       result = 1;  
   }else if (angle >= -135 && angle < -45) {  
       result = 2;  
   }else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {  
       result = 3;  
   }
   return result;  
}
const scroll = function(el,vnode,resetArr){
//	this.wrapper = el.parentNode;
//  this.scroller = el;
//	this.vnode = vnode;
//	addEvent(el.parentNode, 'touchstart', this);
//	addEvent(el.parentNode, 'touchmove', this);
//	addEvent(el.parentNode, 'touchcancel', this);
//	addEvent(el.parentNode, 'touchend', this);
	let 
	opts = {
		//wrapper: ref.slide,
		scroller: el,
		wrapper:el.parentNode,
	},
	res = store.getters.getRouterScroll || [];
	if (!opts.wrapper || !opts.scroller) throw 'param error';
	this.wrapper = opts.wrapper;
	this.scroller = opts.scroller;
	
	//这个属性会被动态改变的，如果这里
	this.scrollerStyle = this.scroller.style;
	
	this.options = {
	    //是否具有滚动条
	    scrollbars: true,
	    // 其实时期Y的位置
	    startY: 0,
	    //超出边界还原时间点
	    bounceTime: 600,
	    //超出边界返回的动画
	    bounceEasing: ease.circular,
	    //
		bindToWrapper: true,
	    //超出边界时候是否还能拖动
	    bounce: true,
	
	    //当window触发resize事件60ms后还原
	    resizePolling: 60
	};
	this.isMaxPage = res=>{
		return false;
	}
	if(resetArr){
		if(resetArr.ResetBottom){
			this.ResetBottom = resetArr.ResetBottom
		}
		if(resetArr.ResetTop){
			this.ResetTop = resetArr.ResetTop
		}
		if(resetArr.isY){
			this.isY = resetArr.isY
		}
		if(resetArr.watchY){
			this.watchY = resetArr.watchY
		}
		if(resetArr.handleEvents){
			this.handleEvents = resetArr.handleEvents
		}
		if(resetArr.watchEnd){
			this.watchEnd = resetArr.watchEnd
		}
		if(typeof resetArr.isMaxPage == 'function'){
			this.isMaxPage = resetArr.isMaxPage
		}
		if(typeof resetArr.watchsY == 'function'){
			this.watchsY = resetArr.watchsY
		}
		this.resetArr = resetArr;
	}
	this.isBeyond = {
		isTop: false,
		isTopCallback: false,
		isBottom: false,
		isBottomCallback: false,
	}
	
	for (var i in opts) {
	    this.options[i] = opts[i];
	}
	
	this.translateZ = ' translateZ(0)';
	
	this.x = 0;
	this.y = 0;
	this.directionX = 0;
	
	this._events = {};
	
	
	
	this._init();
	
	  //更新滚动条位置
	this.refresh();
	
	  //更新本身位置
	this.scrollTo(this.options.startX, this.options.startY);
	
	this.enable();
}
const 
winHeight = window.innerHeight,
winWidht = window.innerWidth,
configimg = "http://static.oschina.net/uploads/img/201409/26073943_nCX5.gif";

function createDefaultScrollbar() {
	var scrollbar = document.createElement('div'),
		indicator = document.createElement('div');
		scrollbar.className = "_scrollbar";
		indicator.className = "_indicator";
      	scrollbar.style.cssText = 'position:absolute;z-index:9999';
      	scrollbar.style.cssText += ';width: 3px;bottom:.04rem;top:.04rem;right:.02rem';
      	scrollbar.style.cssText += ';overflow:hidden';

      	indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(159,159,159,0.7);border-radius:.09rem;';
     	indicator.style.width = '100%';

      	scrollbar.appendChild(indicator); 
      	this.wrapper.appendChild(scrollbar);
		/*setTimeout(()=>{
			let _scrollbar = document.getElementsByClassName("_scrollbar");
			console.info(_scrollbar)
			if(_scrollbar && _scrollbar.length > 1){
				_scrollbar[0].parentNode.removeChild(_scrollbar[0])
			}
		})*/
    return {
    		scrollbar,
    		indicator
    }
}
function createDefaultTopTips() {
	if(typeof this.ResetTop == "function"){
		let topMain = document.createElement('div'),
			topLabel = document.createElement('label'),
			topDivCenter = document.createElement('div'),
			topDivContent = document.createElement('div'),
			topDivTime = document.createElement('div'),
			topSpan = document.createElement('span');
			
			topMain.className = "scrollTopTips";
			topMain.style.cssText = "width: 100%;top: -1rem;left: 0;position: absolute;font-size: .28rem;color: #333333;text-align: center;justify-content: center;align-items: center;height: 1rem;display: flex;";
			topLabel.style.cssText = "display: inline-block; color: rgb(90, 90, 90); font-size: .4rem; font-weight: 400; margin-right: .2rem; transform: rotate(180deg);";
			topLabel.className = "iconfont";
			topLabel.innerHTML = "&#xe660;";
			topDivCenter.style.cssText = "font-weight: 400;text-align: center;display: inline-block;vertical-align: middle;margin-right: .1rem;";
			topDivContent.innerHTML = "下拉可以刷新";
			topDivTime.innerHTML = "最后更新：";
			topDivTime.style.cssText = "padding-top: .1rem;";
			topSpan.innerHTML = "无记录";
			
			topDivCenter.appendChild(topDivContent);
			topDivTime.appendChild(topSpan);
			topDivCenter.appendChild(topDivTime);
			topMain.appendChild(topLabel);
			topMain.appendChild(topDivCenter);
			this.scroller.appendChild(topMain);
		return {
			topDomMainHeight: topMain.offsetHeight,
			topDomLabelStyle: topLabel.style,
			rest: function( res){
				 switch (res) {
		          case 'loading':
		          	this.isloading = true;
		          	topLabel.className = 'index_loading top_loading';//label
					topLabel.innerHTML = '';//label
					topDivContent.innerHTML = '正在刷新数据中...';//span
		            break;
		          case 'text':
		          	this.isloading = false;
		          	topLabel.className = 'iconfont';//label
					topLabel.innerHTML = '&#xe660;';//label
					topDivContent.innerHTML = '下拉可以刷新';//span
		            break;
		          case 'content':
		          	this.isloading = false;
		            topDivContent.innerHTML = '松开立即刷新';//span
		            break;
				}
			}
		};
	}
	return null;
}
function createDefaultBottomTips(){
	if(typeof this.ResetBottom == "function"){
    	let bottomDomMain = document.createElement('div'),
    		bottomDomContent = document.createElement('div'),
    		bottomLoading = document.createElement('i');
    		
		bottomDomMain.style.cssText = 'color: #3C3C3C;font-size: .28rem;text-align: center;position: absolute;bottom: -.6rem;left: 0;right: 0;margin: auto;height: .6rem;width: 100%;';
		bottomDomMain.style.cssText += ';display: flex;align-items: center;justify-content: space-around;flex-direction: column;';
		bottomDomMain.style.cssText += ';word-break:break-all; word-wrap:break-word;';
		
		
		bottomLoading.className = 'index_loading';
		
		bottomDomContent.appendChild(bottomLoading);
		
		bottomDomContent.style.cssText = 'position: relative;';
		
		bottomDomMain.appendChild(bottomDomContent);
		this.scroller.appendChild(bottomDomMain)
		let st = bottomLoading.style;
		st.opacity = 0;
		return {
			bottomDomMainHeight: bottomDomMain.offsetHeight,
			bottomDomContent: bottomDomContent.innerHTML,
			rest: function( res){
				st.opacity = res;
				this.isloading = !!res;
			}
		}
	}
	return null;
}
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
const setScrollData = function(el, binding, vnode){
	var that = vnode.context,
		isData = that.isData,
		footer = that.footer || 0,
		num = 0;
		el.parentNode.style.height = window.innerHeight - footer + "px";
		if(!isData(binding.value)){
			num = binding.value.num
		}
		if(isData(window._scroll_)){
			window._scroll_  = [];
		}
		if(isData(window._scroll_[num])){
			window._scroll_[num] = new scroll(el,vnode,binding.value);
		}
}
const isData = function(res){
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
}
const getlogoUrl = function( width,height, imgUrl,bool,isMax){
	var config = {
		logoUrl: {
		  	logoImg: "http://guoteng.oss-cn-shenzhen.aliyuncs.com/default/default.png",
		  	logoSave: "?x-oss-process=image/resize,m_fill,h_600,w_300",
	  	}
	}
	let url = config.logoUrl.logoImg,
		save = config.logoUrl.logoSave;
		width = remSizes(width) || 0,
		height = remSizes(height) || 0,
		imgUrl = imgUrl || "";
	let urs = url + save.replace("h_600","h_" + Math.floor(height)).replace("w_300","w_" + Math.floor(width));
	let getUrl = (isData(imgUrl) || !IsPicture(imgUrl)) ? urs : imgUrl;
	isMax = !isMax ? 'cover' : 'auto 100%';
	let color = " #E2E1E1";
	return !bool ? 'url(' + getUrl +') no-repeat center center / ' + isMax + color : getUrl;
}
const IsPicture = function( res){
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
}
const remSizes = function(size){
	if(!size) return;
	let rems = window.innerWidth/750,
		remSize = (size * rems) * 100;
	return remSize;
}

function createScrollTop(){
	let scrollTop = document.createElement('div'),
		scrollTopLabel = document.createElement('label');
		scrollTop.style.cssText = "position: fixed;bottom: 1rem;width: .68rem;height:.68rem;line-height: .68rem;right: .4rem;font-size: .65rem;color: rgba(153,153,153,.6);text-align: center;background-color: rgba(216, 216, 216,.6);border-radius: 100%;";
		scrollTopLabel.className = "iconfont";
		scrollTopLabel.innerHTML =  "&#xe6a5;";
		scrollTop.appendChild(scrollTopLabel);
		this.scroller.appendChild(scrollTop);
		this.wrapper.appendChild(scrollTop);
		scrollTop.addEventListener("click",function(){
		 	$scroll.scrollTo(0, 0, 300, $scroll.options.bounceEasing);
		},false);
		
		let st = scrollTop.style;
			st.opacity = 0;
	return {
		rest: function( val,hold){
			if (hold && !this.visible) {
	          return;
	        }
			
	        clearTimeout(this.fadeTimeout);
	        this.fadeTimeout = null;
	        
	        var time = val ? 500 : 500,
				delay = val ? 0 : 0;
	
	        val = val ? '1' : '0';
			
	        st[style.transitionDuration] = time + 'ms';
		        
		        this.fadeTimeout = setTimeout((function (val) {
		          st.opacity = val;
		          this.visible = +val;
		        }).bind(this, val), delay);
			}
    	}
}
const hasClass = function(ele, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}

const addClass = function(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}

const removeClass = function(ele, cls) {
  if (hasClass(ele, cls)) {
    var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

const resetStyles = function(el,val){
	if(isData(val) || isData(el)) return;
	if(theme == 'material'){
		switch (val){
			case 'navbar':
				let center = el.querySelectorAll('.center')[0];
				let left = el.querySelectorAll('.left')[0];
				let navbarinner = el.querySelectorAll('.navbar-inner')[0];
				addClass(center,theme+'-r-navbar');
				addClass(navbarinner,theme+'-r-navbar-inner')
				break;
			case 'pageContent':
				let pageContent = el.querySelectorAll('.page-content');
				for(var i = 0;i<pageContent.length;i++){
					addClass(pageContent[i],theme+'-r-page-content');
				}
				break;
			case 'toolbar':
				addClass(el,theme+'-r-toolbar');
				removeClass(el,'toolbar');
				break;
			case 'back':
				console.info(el)
				break;
			default:
				break;
		}
	}
}
scroll.prototype = {
	_initScroll: function(){
		let 
		opts = {
			//wrapper: ref.slide,
			scroller: el,
			wrapper:el.parentNode,
		},
		res = store.getters.getRouterScroll || [],
		path = this.path = vnode.context.$router.path;
      	if (!opts.wrapper || !opts.scroller) throw 'param error';
		//if(!ref.slide.style.height){
			//ref.slide.style.height = winHeight - ref.slide.offsetTop + "px";
		//}
	    this.wrapper = opts.wrapper;
      	this.scroller = opts.scroller;
	
	    //这个属性会被动态改变的，如果这里
	    this.scrollerStyle = this.scroller.style;
	    
	    this.options = {
	        //是否具有滚动条
	        scrollbars: true,
	        // 其实时期Y的位置
	        startY: 0,
	        //超出边界还原时间点
	        bounceTime: 600,
	        //超出边界返回的动画
	        bounceEasing: ease.circular,
	
	        //超出边界时候是否还能拖动
	        bounce: true,
	
	        //当window触发resize事件60ms后还原
	        resizePolling: 60
	    };
		
		this.isBeyond = {
			isTop: false,
			isTopCallback: false,
			isBottom: false,
			isBottomCallback: false,
		}
		
	    for (var i in opts) {
	        this.options[i] = opts[i];
	    }
	    
	    this.translateZ = ' translateZ(0)';
	
	    this.x = 0;
	    this.y = 0;
	    
	    this.direction = 0;
	    
	    this.directionX = 0;
	    
	    this._events = {};
	    
	    
	    
	    
	    this._init();
	
	      //更新滚动条位置
	    this.refresh();
	    
	      //更新本身位置
	    this.scrollTo(this.options.startX, this.options.startY);
	    
	    this.enable();
	    for( var item in res){
	    	if(res[item].path == path){
	    		res[item].y = -(this.scroller.offsetHeight - this.wrapper.clientHeight) <= res[item].y ? res[item].y : 0;
	    		this.y = res[item].y;
	    		this.scrollTo(this.options.startX, res[item].y);
	    		this._translate(0, res[item].y);
	    		return;
	    	}
	    }
	},
	remSizes: function(size){
		if(!size) return;
		let rems = window.innerWidth/750,
			remSize = (size * rems) * 100;
		return remSize;
	},
	_init: function () {
        this._initEvents();

        //初始化滚动条，滚动条此处需要做重要处理
        if (this.options.scrollbars) {
          this._initIndicator();
        }
    },
    refresh: function () {
        var rf = this.wrapper.offsetHeight; 	// Force reflow

        this.wrapperHeight = this.wrapper.clientHeight;
        this.scrollerHeight = this.scroller.offsetHeight;
        this.scrollerClientHeight = this.scroller.clientHeight;
        this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
        this.endTime = 0;
        var offsetTop = this.wrapper.offsetTop,
        	offsetLeft = this.wrapper.offsetLeft;

        this.wrapperOffset = {
          left: offsetLeft * (-1),
          top: offsetTop * (-1)
        };
        
        this._execEvent('refresh');

        this.resetPosition();

    },
    _initEvents: function (remove) {
        var eventType = remove ? removeEvent : addEvent;
        if(!this.options){
        	return;
        }
        var target = this.options.bindToWrapper ? this.wrapper : window;

        eventType(window, 'orientationchange', this);
        eventType(window, 'resize', this);

        if (hasTouch) {
          eventType(this.wrapper, 'touchstart', this);
          eventType(target, 'touchmove', this);
          eventType(target, 'touchcancel', this);
          eventType(target, 'touchend', this);
        } else {
          eventType(this.wrapper, 'mousedown', this);
          eventType(target, 'mousemove', this);
          eventType(target, 'mousecancel', this);
          eventType(target, 'mouseup', this);
        }

        eventType(this.scroller, 'transitionend', this);
        eventType(this.scroller, 'webkitTransitionEnd', this);
        eventType(this.scroller, 'oTransitionEnd', this);
        eventType(this.scroller, 'MSTransitionEnd', this);
    },
    _start: function (e) {
        if (!this.enabled || (this.initiated && eventType[e.type] !== this.initiated)) {
          return;
        }
		if(this.scroller.offsetHeight != this.scrollerHeight){
        	this.refresh();
        }
        var point = e.touches ? e.touches[0] : e, pos;
        this.initiated = eventType[e.type];
		
		this.isBeyond.isTop = false;
		this.isBeyond.isBottom = false;
        this.moved = false;
        
		this.isStart = true;
		
        this.distY = 0;

        //开启动画时间，如果之前有动画的话，便要停止动画，这里因为没有传时间，所以动画便直接停止了
        this._transitionTime();

        this.startTime = getTime();

        //如果正在进行动画，需要停止，并且触发滑动结束事件
        if (this.isInTransition && !this.isloading) {
          this.isInTransition = false;
          pos = this.getComputedPosition();

          //移动过去
          this._translate(Math.round(pos.x), Math.round(pos.y));
          
          this._execEvent('scrollEnd');
        }

        this.startX = this.x;
        this.startY = this.y;
        this.absStartX = this.x;
        this.absStartY = this.y;
        this.pointX = point.pageX;
        this.pointY = point.pageY;

        this._execEvent('beforeScrollStart');
        //      e.preventDefault();
		this.pageOnLeft = document.getElementsByClassName('page-on-center')[0];
    },

    _move: function (e) {
    		if(this.pageOnLeft){
    			 if(this.pageOnLeft.style.transform){
	        		this._end(e);
	        		return;
	        }
    		}
    		
        if (!this.enabled || eventType[e.type] !== this.initiated) {
          return;
        }
        
        if(window.iswiperToMove){
        		return;
        }
        e.preventDefault();
        var point = e.touches ? e.touches[0] : e,
	        deltaX = point.pageX - this.pointX,
	        deltaY = point.pageY - this.pointY,
	        timestamp = getTime(),
	        newX, newY,
	        absDistX, absDistY;

        this.pointX = point.pageX;
        this.pointY = point.pageY;

        this.distX += deltaX;
        this.distY += deltaY;
        absDistX = Math.abs(this.distX);
        absDistY = Math.abs(this.distY);

        // 如果一直按着没反应的话这里就直接返回了
        if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
          return;
        }
		
        newY = this.y + deltaY;
        newX = this.x + deltaX;
        if (newY > 0 || newY < this.maxScrollY) {
          	newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
        }
		if (newX > 0 || newX < this.maxScrollX) {
          	newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
        }
        if (!this.moved) {
          this._execEvent('scrollStart');
        }
        
        this.moved = true;
	    
        this.switchScroll(newX,newY,true);
        
        this._translate(0, newY);
        
        if (timestamp - this.startTime > 300) {
          this.startTime = timestamp;
          this.startX = this.x;
          this.startY = this.y;
        }
		if(this.pointY < 0 || this.pointY > winHeight){
			this._end(e);
		}else if(this.pointX < 0 || this.pointX > winWidht){
			this._end(e);
		}
    },
    _end: function (e) {
        if (!this.enabled || eventType[e.type] !== this.initiated) {
		  this._scrollEnd(e);
          return;
        }
        var point = e.changedTouches ? e.changedTouches[0] : e,
		    momentumY,
		    duration = getTime() - this.startTime,
		    newX = Math.round(this.x),
		    newY = Math.round(this.y),
		    distanceX = Math.abs(newX - this.startX),
		    distanceY = Math.abs(newY - this.startY),
		    time = 0,
		    easing = '';

        this.isInTransition = 0;
        this.initiated = 0;
        this.endTime = getTime();
		
		this.isStart = false;
		
        if (this.resetPosition(this.options.bounceTime)) {
            this.moved = false;
            this._execEvent('scrollEnd');
          	return;
        }
		this.switchScroll(newX,newY);
        this.scrollTo(newX, newY);
        if (!this.moved) {
          	//click 的情况
          	this._execEvent('scrollCancel');
          	return;
        }
        
        if (duration < 300) {

          momentumY = momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0);
          //      newX = momentumX.destination;
          newY = momentumY.destination;
          time = Math.max(momentumY.duration);
          this.isInTransition = 1;
        }
		this.moved = false;
        if (newY != this.y) {
          if (newY > 0 || newY < this.maxScrollY) {
            easing = ease.quadratic;
          }
          this.scrollTo(newX, newY, time, easing);
          return;
        }
        this._scrollEnd(e);
        this._execEvent('scrollEnd');
    },
    _scrollEnd: function(e){
    		window.scrollToMove && (window.scrollToMove = false);
	    typeof this.watchEnd == 'function' && this.watchEnd(this.y, this.x,this);
    },
    switchScroll: function(newX,newY,bool){
    		this.direction = GetSlideDirection(this.startX, this.startY, newX, newY);
    		
    		if(this.direction == 1 || this.direction == 2){
	    		this.enableIswiper(bool);
	    }
    		switch(this.direction) {
	      case 0://没滑动
              break;
          case 1://上
              break;  
          case 2://下
              break;
          default:             
	    }
    },
    enableIswiper: function(bool){
    		!window.scrollToMove && (window.scrollToMove = true);
    },

    _resize: function () {
        var that = this;

        clearTimeout(this.resizeTimeout);

        this.resizeTimeout = setTimeout(function () {
          that.refresh();
        }, this.options.resizePolling);
    },

    _transitionTimingFunction: function (easing) {
        this.scrollerStyle[style.transitionTimingFunction] = easing;

        this.Indicator && this.Indicator.transitionTimingFunction(easing);
    },

    //开始或者停止动画
    _transitionTime: function (time) {
        time = time || 0;
        this.scrollerStyle[style.transitionDuration] = time + 'ms';
        
        //滚动条，我们这里只会出现一个滚动条就不搞那么复杂了
        this.Indicator && this.Indicator.transitionTime(time);
    },

    getComputedPosition: function () {
        var matrix = window.getComputedStyle(this.scroller, null), x, y;

        matrix = matrix[style.transform].split(')')[0].split(', ');
        x = +(matrix[12] || matrix[4]);
        y = +(matrix[13] || matrix[5]);

        return { x: x, y: y };
    },
	
    _initIndicator: function () {
		this.Indicator = {
		    	init: function(els) {
		      this.wrapper = typeof els.scrollbar == 'string' ? document.querySelector(els.scrollbar) : els.scrollbar;
		      this.indicator = els.indicator;
		      this.wrapperStyle = this.wrapper.style;
		      this.indicatorStyle = this.indicator.style;
		      this.sizeRatioY = 1;
		      this.maxPosY = 0;
		      
		      this.wrapperStyle[style.transform] = this.translateZ;
		      this.wrapperStyle[style.transitionDuration] = '0ms';
		      this.wrapperStyle.opacity = '0';
		    },
		    transitionTime: function (time) {
		        time = time || 0;
		        this.indicatorStyle[style.transitionDuration] = time + 'ms';
		    },
		    transitionTimingFunction: function (easing) {
		        this.indicatorStyle[style.transitionTimingFunction] = easing;
		    },
		    refresh: function () {
                
		        this.transitionTime();
		        
		        var r = this.wrapper.offsetHeight; // force refresh
		
		        this.wrapperHeight = this.wrapper.clientHeight;
		        
		        this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
		
		        this.indicatorStyle.height = (this.indicatorHeight >= this.wrapperHeight ? this.wrapperHeight : this.indicatorHeight) + 'px';
				
		        this.maxPosY = this.wrapperHeight - this.indicatorHeight;
		        this.sizeRatioY = (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
				
		        this.updatePosition();
		    },
		    updatePosition: function () {
		        var y = Math.round(this.sizeRatioY * this.scroller.y) || 0;
		        this.y = y;
				
		        //不需要兼容方式了
		        this.indicatorStyle[style.transform] = 'translate(0px,' + y + 'px)' + this.scroller.translateZ;
		
		    },
		    fade: function (val, hold) {
		        if (hold && !this.visible) {
		          return;
		        }
		
		        clearTimeout(this.fadeTimeout);
		        this.fadeTimeout = null;
		
		        var time = val ? 250 : 500,
					delay = val ? 0 : 300;
		
		        val = val ? '1' : '0';
		
		        this.wrapperStyle[style.transitionDuration] = time + 'ms';
		
		        this.fadeTimeout = setTimeout((function (val) {
		          this.wrapperStyle.opacity = val;
		          this.visible = +val;
		        }).bind(this, val), delay);
		
		    } 
		    
		}
        //滚动条
    		var els = createDefaultScrollbar.call(this);
    		this.Indicator.init(els);
        this.topTips = createDefaultTopTips.call(this);
        this.bottomTips = createDefaultBottomTips.call(this);
	    if(window.scrollTop){
	      	this.scrollTop = createScrollTop.call(this);
      	}
        this.Indicator.scroller = this;
        this.$lazy = {
		    	_initLazy: function(){
		    		if(this.imgArr && this.imgArr.length > 0){
		    			setTimeout(()=>{
		    				this.watch( this.scroll && this.scroll.y, false, res=>{
		    					this._initLazy()
		    				});
		    			})
		    			return;
		    		}
		    		let arr = [].slice.call(this.scroller.getElementsByClassName('lazyImg'));
		    		if(arr.length <= 0){
					return;
				}
		    		let item,img;
		    		for(item in arr){
		    			if(arr[item] &&arr[item].dataset.lazy){
						if(!arr[item].lazy){
							arr[item].parentElement.style.position = "relative";
							arr[item].parentElement.style.backgroundColor = "#FFF";
							arr[item].className = "lazy_position";
							if(arr[item].nodeName == "DIV"){
								arr[item].style.background = getlogoUrl(7.4,3.5,configimg)
							}else{
								arr[item].src = configimg;
							}
						}
					}
		    		}
		    		this.imgArr = arr;
		    		setTimeout(()=>{
					this.watch( this.scroll && this.scroll.y);
		    		})
		    	},
		    	watch: function( y, hold, c){
		    		if(this.scroller.offsetHeight != this.scroll.scrollerHeight){
					this.scroll.refresh();
					this._initLazy();
					return;
				}
		    		var arr = this.imgArr;
		    		if(!arr){
		    			return;
		    		}
		    		
				if (hold && !this.visible) {
		          return;
		        }
				
		        clearTimeout(this.fadeTimeout);
		        this.fadeTimeout = null;
		        
		        var time = y ? 50 : 50,
					delay = y ? 50 : 50;
		
		        var val = 1;
		        
				this.index = this.index || 0;
				
				var str = arr[this.index];
				
				if(!str){
					return;
				}
				
				var st = str && str.style;
				st.opacity = 0;
			        
			        
		        this.fadeTimeout = setTimeout((function (val) {
		        		//console.info(str.getBoundingClientRect().top,-y + winHeight,GetObjPos(str)['y'])
		        		if(GetObjPos(str)['y'] <= (-y + winHeight)){
		        			st[style.transitionDuration] = time + 'ms';
				        st.opacity = val;
				        if(str.nodeName == "DIV"){
							str.style.background = getlogoUrl(7.4,3.5,str.dataset.lazy);
						}else{
							str.src = str.dataset.lazy;
						}
						str.className = str.className.replace("lazy_position"," ");
				        this.visible = +val;
				        this.imgArr.splice(this.index,1)
				        this.watch( this.scroll && this.scroll.y);
				        c && c();
					}
		        }).bind(this, val), delay);
		    	}
		}

        this.$lazy.scroller = this.scroller;
        this.$lazy.scroll = this;
        this.$lazy._initLazy();
        this.on('scrollEnd', function () {
          this.Indicator.fade();
        });

        var scope = this;
        this.on('scrollCancel', function () {
          scope.Indicator.fade();
        });

        this.on('scrollStart', function () {
          scope.Indicator.fade(1);
        });

        this.on('beforeScrollStart', function () {
          scope.Indicator.fade(1, true);
        });

        this.on('refresh', function () {
          scope.Indicator.refresh();
        });

    },

      //移动x，y这里比较简单就不分离y了
     _translate: function (x, y) {
     	if(this.isY && y >= 0){
     		y = 0;
     	}
        this.scrollerStyle[style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
		
       	this.x = x;
        this.y = y;
        typeof this.watchsY == 'function' && this.watchsY(y,x);
        if (this.options.scrollbars) {
          	this.Indicator && this.Indicator.updatePosition();
        }
        
        if(this.topTips && y > 0) {
        		this.topBeyondUpdate( y);
        }
        
       	if(this.bottomTips && this.wrapperHeight <= this.scrollerHeight && y < this.maxScrollY && !this.isMaxPage()){
       		this.bottomBeyondUpdate( y);
       	}
       	
       	this.scrollTop && this.scrollTop.rest.call(this,-y >= winHeight);
       	this.$lazy && this.$lazy.watch( y);
    },
    topBeyondUpdate: function(y, isMax){
	    	y = Math.floor(y * 180 / this.topTips.topDomMainHeight);
	    	this.isBeyond.isTop = isMax = (y >= 180); 
	    	
	    	this.topTips.topDomLabelStyle[style.transform] = 'rotate(' + (isMax ? 180 : y) +'deg)';
	    	!this.isloading && this.topTips.rest.call(this,(isMax ? 'content' : 'text'));
    },
    bottomBeyondUpdate: function( y){
    		this.isBeyond.isBottom = y + this.scrollerHeight - this.wrapperHeight <= -this.bottomTips.bottomDomMainHeight;
    },
    BeyondUpdate: {
	    	top: function( x,y){
	    		if(this.isloading){
	    			return;
	    		}
	    		this.topTips.rest.call(this,'loading');
	    		this.ResetTop(bool=>{
	    			if(this.isBeyond.isTop && !this.moved){
	    				this._translate(x, y);
	    				this.isBeyond.isTop = false;
	    			}
	    			this.topTips.rest.call(this,'text');
	    		})
	    	},
	    	bottom: function( x,y){
	    		if(this.isloading){
	    			return;
	    		}
	    		this.bottomTips.rest.call(this,1);
	    		this.ResetBottom(bool=>{
	    			this.isBeyond.isBottom = this.y + this.scrollerHeight - this.wrapperHeight <= -this.bottomTips.bottomDomMainHeight;
	    			if(this.isBeyond.isBottom && !this.moved){
		    			this._translate(x, y);
	    			}
	    			this.bottomTips.rest.call(this,0);
	    		})
	    	},
    },
    resetPosition: function (time) {
        var x = this.x,
		y = this.y;

        time = time || 0;

        if (this.y > 0) {
          y = 0;
        } else if (this.y < this.maxScrollY) {
          y = this.maxScrollY;
        }

        if (y == this.y) {
          return false;
        }
        
        this.scrollTo(x, y, time, this.options.bounceEasing);
        
        return true;
    },

    //移动
    scrollTo: function (x, y, time, easing, bool) {
        easing = easing || ease.circular;
        this.isInTransition = time > 0;
        
        if (!time || easing.style) {
          	this._transitionTimingFunction(easing.style);
          	this._transitionTime(time);
          	if(this.wrapperHeight >= this.scrollerHeight){
          		if(!bool){
    					y = 0;
          		}
	     	}
      		typeof this.watchY == 'function' && this.watchY(y,x);
          	if(!this.isloading && ((this.topTips && this.isBeyond.isTop) || (this.bottomTips && this.isBeyond.isBottom))){
	          	this.BeyondUpdate[(this.isBeyond.isTop ? 'top' : (this.isBeyond.isBottom ? 'bottom' : null))].call(this,x,y);
	        }
          	if(!this.isloading || !this.isBeyond.isTop){
          		if(!this.isBeyond.isBottom){
          			this._translate(x, y);
          		}else if(this.isBeyond.isBottom){
	          		this._translate(x, y - this.bottomTips.bottomDomMainHeight);
	          	}
          	}else if(this.isBeyond.isTop){
          		this._translate(x, this.topTips.topDomMainHeight);
          	}else{
          		this._translate(x, y);
          	}
          	
        }
    },

    //统一的关闭接口
    disable: function () {
        this.enabled = false;
    },
    //统一的open接口
    enable: function () {
        this.enabled = true;
    },

    transitionTime: function (time) {
        time = time || 0;
        this.indicatorStyle[style.transitionDuration] = time + 'ms';

        if (!time) {
          this.indicatorStyle[style.transitionDuration] = '0.001s';
        }
    },

    on: function (type, fn) {
        if (!this._events[type]) {
          this._events[type] = [];
        }

        this._events[type].push(fn);
    },

    _execEvent: function (type) {
        if (!this._events[type]) {
          return;
        }

        var i = 0,
			l = this._events[type].length;

        if (!l) {
          return;
        }

        for (; i < l; i++) {
          this._events[type][i].call(this);
        }
    },
    destroy: function () {
        this._initEvents(true);

        this._execEvent('destroy');
    },

    _transitionEnd: function (e) {
        if (e.target != this.scroller || !this.isInTransition) {
          return;
        }
		this._scrollEnd(e);
		
        this._transitionTime();
        
        if (!this.resetPosition(this.options.bounceTime)) {
          this.isInTransition = false;
          this._execEvent('scrollEnd');
        }
    },

    //事件具体触发点
    handleEvent: function (e) {
    		typeof this.handleEvents == 'function' && this.handleEvents(e);
        switch (e.type) {
          case 'touchstart':
          case 'mousedown':
            this._start(e);
            break;
          case 'touchmove':
          case 'mousemove':
            this._move(e);
            break;
          case 'touchend':
          case 'mouseup':
          case 'touchcancel':
          case 'mousecancel':
            this._end(e);
            break;
          case 'orientationchange':
          case 'resize':
            this._resize();
            break;
          case 'transitionend':
          case 'webkitTransitionEnd':
          case 'oTransitionEnd':
          case 'MSTransitionEnd':
            this._transitionEnd(e);
            break;
        }
    }
}

export {
	_prefixStyle,
	getTime,
	addEvent,
	removeEvent,
	momentum,
	hasTouch,
	style,
	eventType,
	ease,
	scroll,
	GetObjPos,
	resetStyles,
	hasClass,
	removeClass,
	addClass,
	setScrollData,
	GetSlideAngle,
	GetSlideDirection,
	isData
};
