import {
	_vendor,
	_prefixStyle,
	getTime,
	addEvent,
	removeEvent,
	momentum,
	hasTouch,
	style,
	eventType,
	ease,
	GetObjPos,
	isData,
	hasClass,
	addClass,
	removeClass,
	GetSlideAngle,
	GetSlideDirection,
} from './init'

const winHeight = window.innerHeight,winWidht = window.innerWidth;
const iscrollInit = function(el, binding, vnode){
	window.iscroll = new iscroll(el, binding, vnode);
}
const iscroll = function(el, binding, vnode){
	let 
	opts = {
		scroller: el,
		wrapper:el.parentNode,
	};
  	if (!opts.wrapper || !opts.scroller) throw 'param error';
    this.wrapper = opts.wrapper;
  	this.scroller = opts.scroller;

    //这个属性会被动态改变的，如果这里
    this.scrollerStyle = this.scroller.style;
    let fst = binding.value;
    
    if(typeof fst == 'object'){
	    	if(typeof fst.watchX == 'function'){
	    		this.watchX = fst.watchX;
	    }
	    	if(typeof fst.iswiperPage == 'function'){
	    		this.iswiperPage = fst.iswiperPage;
	    	}
	    	if(typeof fst.watchMove == 'function'){
	    		this.watchMove = fst.watchMove;
	    	}
	    if(typeof fst.watchScrollTo == 'function'){
	    		this.watchScrollTo = fst.watchScrollTo;
	    	}
	    if(typeof fst.isX == 'boolean'){
	    		this.isX = fst.isX;
	    	}
    }
    
    this.options = {
        //是否具有滚动条
        scrollbars: true,
        // 其实时期Y的位置
        startY: 0,
        // 其实时期X的位置
        startX: 0,
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
	
    for (var i in opts) {
        this.options[i] = opts[i];
    }
    
    this.translateZ = ' translateZ(0)';

    this.x = 0;
    this.y = 0;
    
    this.direction = 0;//方向
    
    this.lp = 0;//tab索引
    
    this.directionX = 0;
    
    this._events = {};
    
    this._init();

      //更新滚动条位置
    this.refresh();
    
      //更新本身位置
    this.scrollTo(this.options.startX, this.options.startY);
    
    this.enable();
}
iscroll.prototype = {
	_init: function () {
        this._initEvents();
    },
    refresh: function () {
        var rf = this.wrapper.offsetHeight; 	// Force reflow

        this.wrapperHeight = this.wrapper.clientHeight;
        this.scrollerHeight = this.scroller.offsetHeight;
        this.scrollerClientHeight = this.scroller.clientHeight;
        this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
        
        this.wrapperWidth = this.wrapper.clientWidth;
        this.scrollerWidth = this.scroller.querySelectorAll('a')[0].offsetWidth * this.scroller.querySelectorAll('a').length;
        this.scrollerClientWidth = this.scroller.querySelectorAll('a')[0].offsetWidth * this.scroller.querySelectorAll('a').length;
        this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
        
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
        
        this.moved = false;
        
		this.isStart = true;
		
        this.distY = 0;
        this.distX = 0;

        //开启动画时间，如果之前有动画的话，便要停止动画，这里因为没有传时间，所以动画便直接停止了
        this._transitionTime();

        this.startTime = getTime();

        //如果正在进行动画，需要停止，并且触发滑动结束事件
        if (this.isInTransition) {
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

    },

    _move: function (e) {
        if (!this.enabled || eventType[e.type] !== this.initiated) {
          return;
        }
    	 	//e.stopPropagation();
        if(window.scrollToMove){
        		return;
        }
        
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
        
        this._translate(newX, newY);
        
        if (timestamp - this.startTime > 300) {
          this.startTime = timestamp;
          this.startX = this.x;
          this.startY = this.y;
        }
		if(this.pointY < 0 || this.pointY > winHeight){
			this._end(e);
		}
		
		if(this.pointX < 0 || this.pointX > winWidht){
			this._end(e);
		}
		
    },
    _end: function (e) {
        if (!this.enabled || eventType[e.type] !== this.initiated) {
          return;
        }

        var point = e.changedTouches ? e.changedTouches[0] : e,
		    momentumY,
		    momentumX,
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
        
        if (!this.moved) {
          	//click 的情况
          	this._execEvent('scrollCancel');
          	return;
        }
        
        if (duration < 300) {

          momentumY = momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0);
          momentumX = momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0);
          
          newX = momentumX.destination;
          newY = momentumY.destination;
          if(this.isY){
          	time = Math.max(momentumY.duration);
          }else{
          	time = Math.max(momentumX.duration);
          }
          this.isInTransition = 1;
        }
        
		this.moved = false;
		if(this.isX){
			if (newX != this.x) {
	          if (newX > 0 || newX < this.maxScrollX) {
	            easing = ease.quadratic;
	          }
	          
	          this.scrollTo(newX, newY, time, easing);
	          return;
	        }
		}else if(this.isY){
			if (newY != this.y) {
	          if (newY > 0 || newY < this.maxScrollY) {
	            easing = ease.quadratic;
	          }
	          this.scrollTo(newX, newY, time, easing);
	          return;
	        }
		}else{
			/*if (newX != this.x) {
	          if (newX > 0 || newX < this.maxScrollX) {
	            easing = ease.quadratic;
	          }
	          this.scrollTo(newX, newY, time, easing);
	          return;
	        }else if(newY != this.y){
	        	  if (newY > 0 || newY < this.maxScrollY) {
	            easing = ease.quadratic;
	          }
	          this.scrollTo(newX, newY, time, easing);
	          return;
	        }*/
		}
        
        
        this._execEvent('scrollEnd');
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
    },

    //开始或者停止动画
    _transitionTime: function (time) {
        time = time || 0;
        this.scrollerStyle[style.transitionDuration] = time + 'ms';
    },

    getComputedPosition: function () {
        var matrix = window.getComputedStyle(this.scroller, null), x, y;

        matrix = matrix[style.transform].split(')')[0].split(', ');
        x = +(matrix[12] || matrix[4]);
        y = +(matrix[13] || matrix[5]);

        return { x: x, y: y };
    },
      //移动x，y这里比较简单就不分离y了
     _translate: function (x, y) {
     	if(this.isY && y >= 0){
     		y = 0;
     	}
     	if(this.isY){
        		this.scrollerStyle[style.transform] = 'translate(' + 0 + 'px,' + y + 'px)' + this.translateZ;
        }else{
        		this.scrollerStyle[style.transform] = 'translate(' + x + 'px,' + 0 + 'px)' + this.translateZ;
        }
		
       	this.x = x;
        this.y = y;
        
    },
    
    resetPosition: function (time) {
        var x = this.x,
		y = this.y;
		
        time = time || 0;
		if(this.isY){
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
       	}else{
       		if (this.x > 0) {
	          x = 0;
	        } else if (this.x < this.maxScrollX) {
	          x = this.maxScrollX;
	        }
	        
	        if (x == this.x) {
	          return false;
	        }
	        this.scrollTo(x, y, time, this.options.bounceEasing);
	        
	        return true;
       	}
        
    },

    //移动
    scrollTo: function (x, y, time, easing, bool) {
        easing = easing || ease.circular;
        this.isInTransition = time > 0;
        if (!time || easing.style) {
          	this._transitionTimingFunction(easing.style);
          	this._transitionTime(time);
          	this._translate(x, y);
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
        this._transitionTime();
        
        
        if (!this.resetPosition(this.options.bounceTime)) {
          this.isInTransition = false;
          this._execEvent('scrollEnd');
        }
    },

    //事件具体触发点
    handleEvent: function (e) {
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
export { iscroll,iscrollInit };