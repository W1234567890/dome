export default {
	textareas:{
		bind: function(el, binding, vnode) {
			binding.def.textInput(el, binding)
	  	},
	  	inserted: function(el, binding, vnode) {},
	  	update: function(el, binding, vnode) {},
	  	componentUpdated: function(el, binding, vnode) {
	  		binding.def.textInput(el, binding)
	  	},
	 	unbind: function(el, binding, vnode) {},
	  	textInput: function(e, binding) {
	  		if(!e.previousElementSibling){
		    	setTimeout(()=>{binding.def.textInput(e, binding)},0)
		    	return;
		    }
			var i,result = "",c,v = binding.value || "";
		    for (i = 0; i < v.length; i++) {
		        c = v.substr(i, 1);
		        if (c == "\n")
		            result = result + "<br />&nbsp;";
		        else if (c != "\r")
		            result = result + c;
		    }
		   
		    e.previousElementSibling.innerHTML = result;
		    e.style.height = e.previousElementSibling.getBoundingClientRect().height + "px";
			let time = e.previousElementSibling.onElementHeightChangeTimer;
			if(time == null || time == undefined){
				binding.def.onElementHeightChange(e.previousElementSibling, ()=>{
					e.style.height = e.previousElementSibling.getBoundingClientRect().height + "px";
				});
			}
	  	},
	  	onElementHeightChange: function(elm, callback){
		    var lastHeight = elm.clientHeight, newHeight;
		    (function run(){
		        newHeight = elm.clientHeight;
		        if( lastHeight != newHeight )
		            callback();
		        lastHeight = newHeight;
		        if( elm.onElementHeightChangeTimer )
		            clearTimeout(elm.onElementHeightChangeTimer);
				
				elm.onElementHeightChangeTimer = setTimeout(run, 0);
		    })();
		},
	},
	scrollt:{
		inserted: function(el, binding, vnode) {
			vnode.context.$nextTick(()=>{
				/*document.body.addEventListener('touchmove', vnode.context.handler, false);*/
				vnode.context.$scroll._initScroll();
				vnode.context.$lazy._initLazy();
			});
			/*字符串转对象var obj = JSON.parse(strJSON); var str = JSON.stringify(obj) 替换：replace*/
			
			vnode.context.scrollChatListDown = function(){
				if(!vnode.context.$scroll){
					return;
				}
			}
		},
		bind: function(el, binding, vnode) {
			let 
			win = vnode.context.win = window,
			winHeight = vnode.context.winHeight = window.innerHeight,
			winWidht = vnode.context.winWidht = window.innerWidth,
			_elementStyle = document.createElement('div').style,
			configimg = "http://static.oschina.net/uploads/img/201409/26073943_nCX5.gif",
			_vendor = (function () {
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
	      	function _prefixStyle(style) {
		        if (_vendor === false) return false;
		        if (_vendor === '') return style;
		        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
		    };
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
		
		      return scrollbar;
		    }
		    function createDefaultTopTips() {
		    	if(typeof vnode.context.ResetTop == "function"){
					let topDomMain = document.createElement('div'),
						topDomTime = document.createElement('div'),
						topDomContent = document.createElement('div'),
						topDomLabel = document.createElement('label'),
						topDomSpan = document.createElement('span');
						
						topDomMain.style.cssText = 'color: #3C3C3C;font-size: .28rem;text-align: center;position: absolute;top: -1rem;left: 0;right: 0;margin: auto;height: 1rem;';
						topDomMain.style.cssText += ';display: flex;align-items: center;justify-content: space-around;flex-direction: column;';
						topDomMain.style.cssText += ';word-break:break-all; word-wrap:break-word;';
						
						topDomContent.style.cssText = 'position: relative;';
						topDomLabel.style.cssText = 'display: inline-block;height: .4rem;line-height: 0.44rem;';
						topDomSpan.style.cssText = 'display: inline-block;height: .4rem;line-height: .4rem;';
						/*topDomLabel.style.cssText = 'font-family: iconfont!important;font-style: normal;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;'
						topDomLabel.style.cssText += ';bottom: 0;margin: auto;position: absolute;top: 0;left: -.3rem;font-size: .3rem;display: inline-block;';
						*/
						
						
						topDomLabel.className = 'iconfont';//label
						topDomLabel.innerHTML = '&#xe652;';//label
						topDomSpan.innerHTML = '下拉可以刷新';//span
						
						/*topDomTime.innerHTML =  vnode.context.getLocalTime(new Date() / 1000);//time*/
						
						
						topDomMain.appendChild(topDomContent);
						/*topDomMain.appendChild(topDomTime);*/
						topDomContent.appendChild(topDomLabel);
						topDomContent.appendChild(topDomSpan);
						el.appendChild(topDomMain);
						
					return {
						topDomMainHeight: topDomMain.offsetHeight,
						topDomLabel: topDomLabel,
						topDomLabelStyle: topDomLabel.style,
						topDomTime: topDomTime.innerHTML,
						topDomSpan: topDomSpan.innerHTML,
						rest: function( res){
							 switch (res) {
					          case 'loading':
					          	this.isloading = true;
					          	topDomLabel.className = 'index_loading top_loading';//label
								topDomLabel.innerHTML = '';//label
								topDomSpan.innerHTML = '正在刷新';//span
					            break;
					          case 'text':
					          	this.isloading = false;
					          	topDomLabel.className = 'iconfont';//label
								topDomLabel.innerHTML = '&#xe652;';//label
								topDomSpan.innerHTML = '下拉可以刷新';//span
					            break;
					          case 'content':
					          	this.isloading = false;
					            topDomSpan.innerHTML = '松开立即刷新';//span
					            break;
							}
						}
					};
				}
		    	return null;
		    }
		    function createDefaultBottomTips(){
		    	if(typeof vnode.context.ResetBottom == "function"){
			    	let bottomDomMain = document.createElement('div'),
			    		bottomDomContent = document.createElement('div'),
			    		bottomLoading = document.createElement('i');;
			    		
						bottomDomMain.style.cssText = 'color: #3C3C3C;font-size: .28rem;text-align: center;position: absolute;bottom: -.6rem;left: 0;right: 0;margin: auto;height: .6rem;width: 100%;';
						bottomDomMain.style.cssText += ';display: flex;align-items: center;justify-content: space-around;flex-direction: column;';
						bottomDomMain.style.cssText += ';word-break:break-all; word-wrap:break-word;';
						
						
						bottomLoading.className = 'index_loading';
						
						bottomDomContent.appendChild(bottomLoading);
						
						bottomDomContent.style.cssText = 'position: relative;';
						
						bottomDomMain.appendChild(bottomDomContent);
						el.appendChild(bottomDomMain)
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
		    function createScrollTop(){
		    	let scrollTop = document.createElement('div'),
		    		scrollTopLabel = document.createElement('label');
		    		scrollTop.style.cssText = "position: fixed;bottom: 1rem;width: .68rem;height:.68rem;line-height: .68rem;right: .4rem;font-size: .65rem;color: rgba(153,153,153,.6);text-align: center;background-color: transparent;border-radius: 100%;";
		    		scrollTopLabel.className = "iconfont";
		    		scrollTopLabel.innerHTML =  "&#xe6a5;";
		    		scrollTop.appendChild(scrollTopLabel);
		    		vnode.context.$refs.slidesClassMain.appendChild(scrollTop);
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
						
				        st[$utils.style.transitionDuration] = time + 'ms';
				        
				        this.fadeTimeout = setTimeout((function (val) {
				          st.opacity = val;
				          this.visible = +val;
				        }).bind(this, val), delay);
					}
		    	}
		    }
		    let $utils = vnode.context.$utils = {
	    		getTime: Date.now || function getTime() { return new Date().getTime(); },
		        addEvent: function (el, type, fn, capture) {
			        if (el[0]) el = el[0];
			        el.addEventListener(type, fn, !!!capture);
		        },
		      
		        removeEvent: function (el, type, fn, capture) {
			        if (el[0]) el = el[0];
			        el.removeEventListener(type, fn, !!!capture);
		        },
		
			    /*
			     *parem:current：当前鼠标位置
			     *parem:start：touchStart时候记录的Y（可能是X）的开始位置，但是在touchmove时候可能被重写
			     *parem:time： touchstart到手指离开时候经历的时间，同样可能被touchmove重写
			     *parem:lowerMargin：y可移动的最大距离，这个一般为计算得出 this.wrapperHeight - this.scrollerHeight
			     *parem:wrapperSize：如果有边界距离的话就是可拖动，不然碰到0的时候便停止
			     */
		      	momentum: function (current, start, time, lowerMargin, wrapperSize) {
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
		      	},
				hasTouch: 'ontouchstart' in window,
		      	style: {
			        transform: _prefixStyle('transform'),
			        transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
			        transitionDuration: _prefixStyle('transitionDuration'),
			        transitionDelay: _prefixStyle('transitionDelay'),
			        transformOrigin: _prefixStyle('transformOrigin')
		       	},
		        eventType: {
			        touchstart: 1,
			        touchmove: 1,
			        touchend: 1,
			
			        mousedown: 2,
			        mousemove: 2,
			        mouseup: 2
		        },
		     	ease: {
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
		    }
		    let $Indicator = vnode.context.$Indicator = {
		    	init: function(scroller, opts) {
			      this.wrapper = typeof opts.el == 'string' ? document.querySelector(opts.el) : opts.el;
			      this.indicator = this.wrapper.children[0];
			
			      this.wrapperStyle = this.wrapper.style;
			      this.indicatorStyle = this.indicator.style;
			      this.scroller = scroller;
			
			      this.sizeRatioY = 1;
			      this.maxPosY = 0;
			
			      this.wrapperStyle[$utils.style.transform] = this.scroller.translateZ;
			      this.wrapperStyle[$utils.style.transitionDuration] = '0ms';
			      this.wrapperStyle.opacity = '0';
			
			    },
			    transitionTime: function (time) {
			        time = time || 0;
			        this.indicatorStyle[$utils.style.transitionDuration] = time + 'ms';
			    },
			    transitionTimingFunction: function (easing) {
			        this.indicatorStyle[$utils.style.transitionTimingFunction] = easing;
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
			        this.indicatorStyle[$utils.style.transform] = 'translate(0px,' + y + 'px)' + this.scroller.translateZ;
			
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
			
			        this.wrapperStyle[$utils.style.transitionDuration] = time + 'ms';
			
			        this.fadeTimeout = setTimeout((function (val) {
			          this.wrapperStyle.opacity = val;
			          this.visible = +val;
			        }).bind(this, val), delay);
			
			    } 
			    
		    }
		    let $lazy = vnode.context.$lazy = {
		    	_initLazy: function(){
		    		if(this.imgArr && this.imgArr.length > 0){
		    			setTimeout(()=>{
		    				this.watch( $scroll && $scroll.y, false, res=>{
		    					this._initLazy()
		    				});
		    			})
		    			return;
		    		}
		    		
		    		let arr = [].slice.call(document.querySelectorAll(".lazyImg"));
		    		
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
								arr[item].src = configimg;
							}
						}
		    		}
		    		this.imgArr = arr;
		    		setTimeout(()=>{
						this.watch( $scroll && $scroll.y);
		    		})
		    	},
		    	watch: function( y, hold, c){
		    		if(el.offsetHeight != $scroll.scrollerHeight){
		    			$scroll.refresh();
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
			        
			        var time = y ? 600 : 600,
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
			        	if(str.y <= (-y + winHeight)){
			        		st[$utils.style.transitionDuration] = time + 'ms';
					        st.opacity = val;
					        str.src = str.dataset.lazy;
							str.className = str.className.replace("lazy_position"," ");
					        this.visible = +val;
					        this.imgArr.splice(this.index,1)
					        this.watch( $scroll && $scroll.y);
					        c && c();
						}
			        }).bind(this, val), delay);
		    	},
		    }
		    let $scroll = vnode.context.$scroll = {
		    	_initScroll: function(){
		    		let 
		    		ref = vnode.context.$refs,
		    		opts = {
		    			wrapper: ref.slidesClassMain,
		    			scroller: el,
		    		},
		    		res = vnode.context.$store.getters.getRouterScroll || [],
		    		path = this.path = vnode.context.$router.history.current.path;
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
				        bounceEasing: $utils.ease.circular,
				
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
				    	}
				    }
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
			        var eventType = remove ? $utils.removeEvent : $utils.addEvent;
			        var target = this.options.bindToWrapper ? this.wrapper : window;
			
			        eventType(window, 'orientationchange', this);
			        eventType(window, 'resize', this);
			
			        if ($utils.hasTouch) {
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
			        if (!this.enabled || (this.initiated && $utils.eventType[e.type] !== this.initiated)) {
			          return;
			        }
					if(el.offsetHeight != this.scrollerHeight){
			        	this.refresh();
			        }
			        var point = e.touches ? e.touches[0] : e, pos;
			        this.initiated = $utils.eventType[e.type];
					
					this.isBeyond.isTop = false;
					this.isBeyond.isBottom = false;
			        this.moved = false;
			        
					this.isStart = true;
					
			        this.distY = 0;
			
			        //开启动画时间，如果之前有动画的话，便要停止动画，这里因为没有传时间，所以动画便直接停止了
			        this._transitionTime();
			
			        this.startTime = $utils.getTime();
			
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
			
			    },
			
			    _move: function (e) {
			        if (!this.enabled || $utils.eventType[e.type] !== this.initiated) {
			          return;
			        }
			        // 判断默认行为是否可以被禁用
			        if (e.cancelable) {
				        // 判断默认行为是否已经被禁用
				        if (!e.defaultPrevented) {
				            e.preventDefault();
				        }
				    }
			        
			
			        var point = e.touches ? e.touches[0] : e,
			      deltaX = point.pageX - this.pointX,
			      deltaY = point.pageY - this.pointY,
			      timestamp = $utils.getTime(),
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
			        if (newY > 0 || newY < this.maxScrollY) {
			          	newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			        }
					
			        if (!this.moved) {
			          this._execEvent('scrollStart');
			        }
			        
			        this.moved = true;
			        
			        this._translate(0, newY);
			        
			        if (timestamp - this.startTime > 300) {
			          this.startTime = timestamp;
			          this.startX = this.x;
			          this.startY = this.y;
			        }
					if(this.pointY < 0 || this.pointY > winHeight){
						this._end(e);
					}
			
			    },
			    _end: function (e) {
			        if (!this.enabled || $utils.eventType[e.type] !== this.initiated) {
			          return;
			        }
			
			        var point = e.changedTouches ? e.changedTouches[0] : e,
					    momentumY,
					    duration = $utils.getTime() - this.startTime,
					    newX = Math.round(this.x),
					    newY = Math.round(this.y),
					    distanceX = Math.abs(newX - this.startX),
					    distanceY = Math.abs(newY - this.startY),
					    time = 0,
					    easing = '';
			
			        this.isInTransition = 0;
			        this.initiated = 0;
			        this.endTime = $utils.getTime();
					
					this.isStart = false;
					
			        if (this.resetPosition(this.options.bounceTime)) {
			            this.moved = false;
			            this._execEvent('scrollEnd');
			          	return;
			        }
			        
			        this.scrollTo(newX, newY);
			        if (!this.moved) {
			          	//click 的情况
			          	this._execEvent('scrollCancel');
			          	return;
			        }
			        
			        if (duration < 300) {
			
			          momentumY = $utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0);
			          //      newX = momentumX.destination;
			          newY = momentumY.destination;
			          time = Math.max(momentumY.duration);
			          this.isInTransition = 1;
			        }
					this.moved = false;
			        if (newY != this.y) {
			          if (newY > 0 || newY < this.maxScrollY) {
			            easing = $utils.ease.quadratic;
			          }
			          this.scrollTo(newX, newY, time, easing);
			          return;
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
			        this.scrollerStyle[$utils.style.transitionTimingFunction] = easing;
			
			        this.indicator && this.indicator.transitionTimingFunction(easing);
			    },
			
			    //开始或者停止动画
			    _transitionTime: function (time) {
			        time = time || 0;
			        this.scrollerStyle[$utils.style.transitionDuration] = time + 'ms';
			        
			        //滚动条，我们这里只会出现一个滚动条就不搞那么复杂了
			        this.indicator && this.indicator.transitionTime(time);
			    },
			
			    getComputedPosition: function () {
			        var matrix = window.getComputedStyle(this.scroller, null), x, y;
			
			        matrix = matrix[$utils.style.transform].split(')')[0].split(', ');
			        x = +(matrix[12] || matrix[4]);
			        y = +(matrix[13] || matrix[5]);
			
			        return { x: x, y: y };
			    },
			
			    _initIndicator: function () {
			        //滚动条
			    	var els = createDefaultScrollbar();
			        this.wrapper.appendChild(els);
			        
			        this.topTips = createDefaultTopTips();
			        this.bottomTips = createDefaultBottomTips();
			        if(vnode.context.scrollTop){
			        	this.scrollTop = createScrollTop();
			        }
			        $Indicator.init(this, { el: els });
			        this.indicator = $Indicator;
					
			        this.on('scrollEnd', function () {
			          this.indicator.fade();
			        });
			
			        var scope = this;
			        this.on('scrollCancel', function () {
			          scope.indicator.fade();
			        });
			
			        this.on('scrollStart', function () {
			          scope.indicator.fade(1);
			        });
			
			        this.on('beforeScrollStart', function () {
			          scope.indicator.fade(1, true);
			        });
			
			        this.on('refresh', function () {
			          scope.indicator.refresh();
			        });
			
			    },
			
			      //移动x，y这里比较简单就不分离y了
			     _translate: function (x, y) {
			        this.scrollerStyle[$utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
					
			       	this.x = x;
			        this.y = y;
			        
			        if (this.options.scrollbars) {
			          	this.indicator.updatePosition();
			        }
			        
			        if(this.topTips && y > 0) {
			        	this.topBeyondUpdate( y);
			        }
			        
			       	if(this.bottomTips && this.wrapperHeight <= this.scrollerHeight && y < this.maxScrollY && !vnode.context.isMaxPage){
			       		this.bottomBeyondUpdate( y);
			       	}
			       	
			       	this.scrollTop && this.scrollTop.rest.call(this,-y >= winHeight);
			       	$lazy.watch( y);
			    },
			    topBeyondUpdate: function(y, isMax){
			    	y = Math.floor(y * 180 / this.topTips.topDomMainHeight);
			    	this.isBeyond.isTop = isMax = (y >= 180); 
			    	
			    	this.topTips.topDomLabelStyle[$utils.style.transform] = 'rotate(' + (isMax ? 180 : y) +'deg)';
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
			    		vnode.context.ResetTop(bool=>{
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
			    		vnode.context.ResetBottom(bool=>{
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
			    scrollTo: function (x, y, time, easing) {
			        easing = easing || $utils.ease.circular;
			        this.isInTransition = time > 0;
			        if (!time || easing.style) {
			          	this._transitionTimingFunction(easing.style);
			          	this._transitionTime(time);
			          	
			          	if(this.wrapperHeight >= this.scrollerHeight){
		        			y = 0;
				     	}
			          	
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
			        this.indicatorStyle[$utils.style.transitionDuration] = time + 'ms';
			
			        if (!time) {
			          this.indicatorStyle[$utils.style.transitionDuration] = '0.001s';
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
	    },
	    componentUpdated(el, binding, vnode) {
	    	setTimeout(()=>{
	    		if(!vnode.context.$scroll.moved && !vnode.context.$scroll.isStart){
	    			vnode.context.$lazy.watch( vnode.context.$scroll.y || 0);
	    			vnode.context.$scroll.refresh();
	    		}
	    	})
	    },
	    update(el, binding, vnode) {
	    	
	    },
	    unbind(el, binding, vnode) {
	    	setTimeout(()=>{
	    		vnode.context.$scroll._initEvents();
	    	})
	    	
    		let data = {
            	path: vnode.context.$scroll.path,
            	y: vnode.context.$scroll.y,
           	},
           	res = vnode.context.$store.getters.getRouterScroll || [];
           	for(var item in res){
   				if(res[item].path == data.path){
   					res[item] = data;
   					vnode.context.$store.dispatch('setRouterScroll',res);
   					return;
   				}
   			}
           	res.push(data);
	    	vnode.context.$store.dispatch('setRouterScroll',res);
	    	/*document.body.removeEventListener('touchmove', vnode.context.handler, false);*/
	    },
	},
}