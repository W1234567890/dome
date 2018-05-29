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
const iswiperInit = function(el, binding, vnode){
	window.iswiper = new iswiper(el, binding, vnode);
}
const iswiper = function(el, binding, vnode){
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
    }
    window.watchPage = ()=>{
    		return this.watchPage;
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
iswiper.prototype = {
	_initScroll: function(){
		
	},
	remSizes: function(size){
		if(!size) return;
		let rems = window.innerWidth/750,
			remSize = (size * rems) * 100;
		return remSize;
	},
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
        this.scrollerWidth = this.scroller.offsetWidth * this.scroller.children.length;
        this.scrollerClientWidth = this.scroller.clientWidth * this.scroller.children.length;
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
        
        if(window.scrollToMove){
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
        
        typeof this.watchMove == 'function' && this.watchMove(newX,{
        		style,
        		translateZ: this.translateZ,
        		page: this.watchPage,
        });
        
        this.watchMove1(newX,{
        		page: this.watchPage,
        });
        
        this.switchIswiper(newX,newY,true);
        
        this._translate(newX, newY);
        
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
    acStyle: function(c){
    		if(!window.iscroll) return;
    		this.tabStyle(dom=>{
	    		if(isData(this.active)){
	    			this.active = window.iscroll.wrapper.querySelectorAll('.dynamic_active')[0];
	    		}
	    		c && c(this.active);
    		});
    },
    tabStyle: function(c){
    		if(!window.iscroll) return;
    		if(isData(this.tabs)){
    			this.tabs = [];
    			this.tabs.dom = window.iscroll.wrapper.querySelectorAll('a');
    			if(this.tabs.dom){
    				this.tabs.width = this.tabs.dom[0].offsetWidth;
    				this.tabs.length = this.tabs.dom.length;
    				this.times = Math.ceil(winWidht / this.tabs.width);
    				c && c(this.tabs);
    			}
    		}else{
    			c && c(this.tabs);
    		}
    },
    watchMove1: function(x,str){
    		this.acStyle(dom=>{
    			dom && (dom.style[style.transform] = 'translate(' + -x / this.times + 'px,' + 0 + 'px)' + this.translateZ);
    		})
    },
    watchScrollTo1: function(str){
   	 	this.acStyle(dom=>{
	    		dom.style[style.transitionTimingFunction] = str.easing;
			dom.style[style.transitionDuration] = str.time;
			dom.style[style.transform] = 'translate(' + -str.x / this.times + 'px,' + 0 + 'px)' + this.translateZ;
		})
    },
    iswiperPage1: function(page,str){
    		this.tabStyle(dom=>{
    			let l = dom.length,
    				w = dom.width - 2,
				x = str.x / this.times,
				lw = winWidht - l * w,
				end = winWidht * ((w / winWidht) - 1);
			this.easings(str,0,w*(l - this.times),end);
    		})
		
    },
    easings: function(str,x,max,end){
		x = str.x / Math.ceil(this.times/2);
		x = x - end > 0 ? 0 : x - end;
		if(x <= -max){
			x = -max;
		}
		window.iscroll.scrollTo(x,0,300)
	},
    _end: function (e) {
        if (!this.enabled || eventType[e.type] !== this.initiated) {
	        this._scrollEnd(e);
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
        
	    
	    this.switchIswiper(newX,newY);
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
          //time = Math.max(momentumY.duration);
          time = Math.max(momentumX.duration);
          this.isInTransition = 1;
        }
        
		this.moved = false;
        /*if (newY != this.y) {
          if (newY > 0 || newY < this.maxScrollY) {
            easing = ease.quadratic;
          }
          this.scrollTo(newX, newY, time, easing);
          return;
        }*/
        
        if (newX != this.x) {
          if (newX > 0 || newX < this.maxScrollX) {
            easing = ease.quadratic;
          }
          
          //this.scrollTo(newX, newY, time, easing);
          return;
        }
        this._scrollEnd(e);
        this._execEvent('scrollEnd');
    },
    _scrollEnd: function(e){
    		window.iswiperToMove && (window.iswiperToMove = false);
    },
    switchIswiper: function(newX,newY,bool){
    		this.direction = GetSlideDirection(this.startX, this.startY, newX, newY);  
        this.watchPage = Math.floor(newX/winWidht);
	    this.lp = winWidht * this.watchPage;
	    if(this.direction == 4 || this.direction == 3){
	    		this.enableScrollTo(bool);
	    }
    		switch(this.direction) {
           case 4://右
         	  newX = this.lp < 0 ? this.lp + winWidht : 0;
         	  !bool && this.scrollTo(newX, newY,300,ease.quadratic);
              break;  
           default:        
          	 newX = this.lp < this.maxScrollX ? this.maxScrollX : this.lp;
        		 !bool && this.scrollTo(newX, newY, 300,ease.quadratic);
	    }
    },
    enableScrollTo: function(bool){
    		!window.iswiperToMove && (window.iswiperToMove = true);
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
     	
        this.scrollerStyle[style.transform] = 'translate(' + x + 'px,' + 0 + 'px)' + this.translateZ;
		
       	this.x = x;
        this.y = y;
        
    },
    
    resetPosition: function (time) {
        var x = this.x,
		y = this.y;
		
        time = time || 0;

        /*if (this.y > 0) {
          y = 0;
        } else if (this.y < this.maxScrollY) {
          y = this.maxScrollY;
        }

        if (y == this.y) {
          return false;
        }*/
       	
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
    },

    //移动
    scrollTo: function (x, y, time, easing, bool) {
        easing = easing || ease.circular;
        this.isInTransition = time > 0;
        	this.switchIswiper(x,y,true);
        	
        if (!time || easing.style) {
          	this._transitionTimingFunction(easing.style);
          	this._transitionTime(time);
          	/*if(this.wrapperHeight >= this.scrollerHeight){
          		if(!bool){
    					y = 0;
          		}
	     	}*/
	     	typeof this.watchScrollTo == 'function' && this.watchScrollTo({
	     		transitionTimingFunction: style.transitionTimingFunction,
	     		transitionDuration: style.transitionDuration,
	     		style,
	     		easing: easing.style,
	     		time: (time || 0) + 'ms',
	     		x: x,
	     		translateZ: this.translateZ,
	     	})
	     	this.watchScrollTo1({
	     		time: (time || 0) + 'ms',
	     		easing: easing.style,
	     		x: x,
	     	})
	     	if(this.wrapperWidth >= this.scrollerWidth){
          		if(!bool){
    					y = 0;
          		}
	     	}
          	if(y != 0){
          		typeof this.watchY == 'function' && this.watchY(y,time);
          	}
          	if(x != 0){
          		typeof this.watchX == 'function' && this.watchX(x,time);
          	}
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
	page: function(){
        typeof this.iswiperPage == 'function' && this.iswiperPage(this.watchPage,{
        		x: this.x,
     		transitionTimingFunction: style.transitionTimingFunction,
     		transitionDuration: style.transitionDuration,
     		style,
     		easing: ease.quadratic.style,
     		translateZ: this.translateZ,
        });
        this.iswiperPage1(this.watchPage,{
     		easing: ease.quadratic.style,
        		x: this.x,
        });
	},
    _transitionEnd: function (e) {
        if (e.target != this.scroller || !this.isInTransition) {
          return;
        }
		this.page();
        this._transitionTime();
        this._scrollEnd(e);
        
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
export { iswiper,iswiperInit };