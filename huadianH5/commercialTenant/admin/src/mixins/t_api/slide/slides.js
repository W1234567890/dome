import tips from './tips.js'
import store from '@/store'
export default {
    computed: {
        this () {
        	return {
        		strStoreDistance: null,
        		win: null,
        		winWidth: null,
        		winHeight: null,
        		distanceX: 0,
           	 	distanceY: 0,
           	 	dataArr:[],
           	 	isScrolls:false,
           	 	boundTop:null,
           	 	theOverBottom:false,
           	 	theOverTop:false,
           	 	absTop:0,
           	 	absHeight:0,
           	 	remSize: 0,
           	 	rems:0,
           	 	isResetDom:false,
           	 	isBottomResetDom:false
        	}
        }
    },
    watch: {
    	isResetDom( e){
    		console.info(e)
    	}
	},
	mixins: [ tips],
    methods: {
    	slinit(){
    		this.win = window;
    		// 浏览器窗体尺寸
	        this.winWidth = this.win.innerWidth;
	        this.winHeight = this.win.innerHeight;
	        this.distanceY = 0;
	        this.distanceX = 0;
	       	this.isResetY = true;
	       	this.rems = this.winWidth/640;
	        this.params = {
           	 	// 是否吸附边缘
            	edge: true
            }
	        this.scrollbar = this.$refs.slide_scrollbar;
	        this.isTopCallback = typeof this.callbackResetTop == 'function';
	        this.isBottomCallback = typeof this.callbackResetBottom == 'function';
    	},
    	remSize( i){
    		let remSize = i;
	       	remSize = (remSize * this.rems) * 100 ;
	       	return remSize;
    	},
    	initBound( e){
    		// 显示拖拽元素
	        this.dom.style.visibility = 'visible';
	        // 如果元素在屏幕之外，位置使用初始值
	        let initBound = this.dom.parentElement.getBoundingClientRect(),
	        touchd = e.touches[0] || e.changedTouches[0];
	        if(touchd.pageY < 0 || touchd.pageY > initBound.bottom){
	        	this._touchEnd(e);
	        }
	        if(!this.$refs.slide_scrollbar){
	        	return;
	        }
			let refs = this.$refs,
	    		x = refs.slidesClassMain.getBoundingClientRect().height,//父级的高度
				x2 = refs.slides_main.getBoundingClientRect().height,//子级的高度
	    		x3 = x2 - x,//超出父级的高度
	    		c = (x / 2),
	    		b = x * x / x2,
	    		top = refs.slidesClassMain.getBoundingClientRect().top,
	    		footer = !this.footer ? 0 : this.footer,
    			height = this.winHeight - top - footer;
	    		refs.slide_scrollbar.style.height = (b > x) ? x : b + "px";
	    		refs.slidesClassMain.style.height = height + 'px';
	    		
	    		this.sildeSand = x2 / x;
	    		$(refs.slide_scrollbar).show();
    	},
    	seachDom(e,callback){//递归查找点击的元素是否有id，如果没有 向上查找 直到找到为止
    		if(!this.domParent){
    			if(!e.target.className){
	    			this.domParent = e.target.parentElement;
	    			this.seachDom(e,callback);
	    		}else{
	    			if(e.target.className && $(e.target.className).hasClass('view')){
	    				return;
	    			}else{
	    				if(e.target.className.indexOf('slides_main') > -1){
	    					this.dom = e.target;
		    				callback();
	    				}else{
	    					this.domParent = e.target.parentElement;
	    					this.seachDom(e,callback);
	    				}
	    			}
	    		}
    		}else{
    			if(!this.domParent.className){
	    			this.domParent = this.domParent.parentElement;
	    			this.seachDom(e,callback);
	    		}else{
	    			if(this.domParent.className && $(this.domParent).hasClass('view')){
	    				return;
	    			}else{
	    				if(this.domParent.className.indexOf('slides_main') > -1){
	    					this.dom = this.domParent;
	    					callback();
	    				}else{
	    					this.domParent = this.domParent.parentElement;
	    					this.seachDom(e,callback);
	    				}
	    			}
	    		}
	    		
    		}
    	},
    	//手指按下
    	_touchStart(e){
    		this.domParent = "";
    		this.isScrolls = false;
    		this.isParent = false;
    		this.seachDom(e,()=>{
	    		this.$nextTick(()=>{
	    			this.stopBubble(e);
		    		
		    		this.startTouche = e.touches[0] || e.changedTouches[0];
		    		this.initBound( e);
		    		
		            this.posY = this.startTouche.pageY;
		            this.distanceY = 0;
		            
		            this.touching = true;
		            
		            if (this.dom.distanceY) {
		                this.distanceY = this.dom.distanceY;
		            }
		            
		            // 元素的位置数据
		            this.bound = this.dom.getBoundingClientRect();
		            this.boundParent = this.parentDom();
		            this.boundParentTop = this.boundParent.top;
		            this.boundParentHeight = this.boundParent.height;

		            this.timerready = true;
		        })
    		})
    		
        },
        parentDom(){
    		if(this.dom.parentElement.className && !this.dom.parentElement.id){
    			return this.dom.parentElement.getBoundingClientRect()
    		}else{
    			return this.dom.getBoundingClientRect()
    		}
    	},
    	//手指滑动
    	_touchMove(e){
    		this.isScrolls = true;
    		this.theOverTop = false;
    		this.theOverBottom = false;
    		if(this.isScrolls){
				
	    		if (this.touching !== true) {
	                return;
	           	}
	    		
	            // 当移动开始的时候开始记录时间
	            if (this.timerready == true) {
	                this.timerstart = +new Date();
	                this.timerready = false;
	            }
	            
	            e.preventDefault();
	            
	    		this.moveTouche = e.touches[0] || e.changedTouches[0];
	    		
	    		this.initBound( e);
	    		
	            this.nowY = this.moveTouche.pageY;
	
	            var distanceY = this.nowY - this.posY;
				
	            // 此时元素的位置
	            this.absTop = this.bound.top + distanceY;
	            this.absHeight = this.bound.height - this.boundParentHeight;
	           	
	            var y = this.distanceY + distanceY;
	            // 边缘检测
	            if (y > 0) {
	            	this.theOverTop = true;
	            	y = y / 4;
	            	if(this.isTopCallback){
	            		if(!store.state.com.isSlidesTop){
	            			this.editTipsDom.topDom('下拉可以刷新')
	            		}
		            	this.isResetDom = false;
		            	if(y > this.remSize(1)){
		            		if(!store.state.com.isSlidesTop){
		            			this.editTipsDom.topDom('松开立即刷新')
		            		}
		            		this.isResetDom = true;
		            	}
	            	}
	            }
	            if (y < -this.absHeight) {
	                this.theOverBottom = true;
	                if(this.isResetY){
	                	this.ResetY = distanceY;
	                	this.isResetY = false;
	                }
	                
	                if(this.bound.height >　this.boundParentHeight){
	                	y = -this.absHeight - (this.ResetY - distanceY)/5;
	                	this.isBottomResetDom = true;
	                	/*this.editTipsDom.bottomDom('下拉加载数据');*/
	                }else{
	                	y = -(this.ResetY - distanceY)/5;
	                	if(this.isBottomCallback){
	                		this.isBottomResetDom = false;
		            		/*this.editTipsDom.bottomDom('已经是全部数据了');*/
		            	}
	                }
	               
	            }
	            // 元素位置跟随
	            this.stopBubble(e);
	            this.fnTranslate( y);
	            this.fnScrollbar( this.scrollbar, -y)
	            // 缓存移动位置
	            this.dom.distanceY = y;
            }
    	},
    	//手指松开
		_touchEnd(e){
			if(this.isScrolls){
				this.endTouche = e.touches[0] || e.changedTouches[0];
				if (this.touching === false) {
	                // fix iOS fixed bug
	                return;
	            }
	            this.touching = false;
				e.preventDefault();
	            // 计算速度
	            this.timerend = +new Date();
	            
	            if ( this.nowY == undefined) {
	                return;
	            }
	
	            // 移动的水平和垂直距离
	            var distanceY = this.nowY - this.posY;
	            
	            if (Math.abs(distanceY) < 5) {
	                return;
	            }
				
	            // 距离和时间
	            var distance = Math.sqrt(distanceY * distanceY), time = this.timerend - this.timerstart;
	            
	            // 速度，每一个自然刷新此时移动的距离
	            var speed = distance / time * 16.666;
	            
	            // 经测试，2~60多px不等
	            // 设置衰减速率
	            // 数值越小，衰减越快
	            var rate = Math.min(10, speed);

	            // 开始惯性缓动
	            this.inertiaing = true;
	
	            // 反弹的参数
	            var reverseX = 1, reverseY = 1;
				
	            // 速度计算法
	            var step =  ()=> {
	                if (this.touching == true) {
	                    this.inertiaing = false;
	                    return;
	                }
	                speed = speed - speed / rate;
	
	                // 根据运动角度，分配给  y方向
	                var moveY = reverseY * speed * distanceY / distance;

	                // 此时元素的各个数值
	                var bound = this.dom.getBoundingClientRect();
	                
	                var y = this.dom.distanceY + moveY;
	                
	                var numMin = 0.1;
					// 超出检测
		            if (y > 0) {
		            	this.theOverTop = true;
		            	numMin = 100;
		            }
		            
		            if (y < -this.absHeight) {
		                this.theOverBottom = true;
		                numMin = 100
		            }
	                // 位置变化
	                this.fnTranslate(y);
	                this.fnScrollbar( this.scrollbar, -y)
	                this.dom.distanceY = y;
	                
	                if (speed < numMin) {
	                    speed = 0;
	                    if (this.params.edge == false) {
	                        this.inertiaing = false;
	                    } else {
	                        // 边缘吸附
	                        edge();
	                    }
	                } else {
	                    requestAnimationFrame(step);
	                }
	                
	            };
				
		       
	            var edge =  () =>{
	                // 时间
	                var start = 0, during = 25;
	                // 初始值和变化量
	                var init = this.dom.distanceY, y = this.dom.distanceY, change = 0;
	                // 判断元素现在在哪个半区
	                var bound = this.dom.getBoundingClientRect();
	                
	                var run = () =>{
	                    // 如果用户触摸元素，停止继续动画
	                    if (this.touching == true) {
	                        this.inertiaing = false;
	                        this.isResetY = true;
	                        if(this.$refs.slide_scrollbar){
	                        	$(this.$refs.slide_scrollbar).show();
	                        }
	                        return;
	                    }
	
	                    start++;
	                    var y = this.easeOutBounce(start, init, change, during);

	                    this.fnTranslate( y);
	                    this.fnScrollbar( this.scrollbar, -y)
						this.dom.distanceY = y;
						
	                    if (start < during) {
	                    	if(this.isTopCallback && this.isResetDom){
	                    		this.slidesTop(run,y);
	                    	}else if(this.isBottomCallback && this.isBottomResetDom){
	                    		this.slidesBottom(run,y);
	                    	}else{
	                    		requestAnimationFrame(run);
	                    	}
	                    } else {
	                        this.dom.distanceY = y;
	                        this.isResetDom = false;
	                        this.isResetY = true;
	                        if(this.$refs.slide_scrollbar){
	                        	$(this.$refs.slide_scrollbar).fadeOut(400);
	                        }
	                       
	                    }
	                };
	                
	                if(this.theOverTop){
	                	change = -this.dom.distanceY;
						run();
					}else if(this.theOverBottom){
						if(this.bound.height >　this.boundParentHeight){
							change = -(this.dom.distanceY + this.absHeight);
						}else{
							change = -(this.dom.distanceY);
						}
						run();
					}else{
						if(this.$refs.slide_scrollbar){
                        	$(this.$refs.slide_scrollbar).fadeOut(400);
                        }
					}
	            };
	
	            step();
            }
		},
		slidesTop( run, y){
			if(y < this.remSize(1)){
				if(!store.state.com.isSlidesTop){
	    			this.editTipsDom.topDom('<i class="index_loading"></i>');
	    			this.callbackResetTop(( isReset)=>{
	        			if(isReset){
	        				this.$store.state.user.time = Date.parse(new Date()) / 1000;
	        				this.editTipsDom.topDom('<label class="iconfont slidesIcon">&#xe61c;</label>刷新成功');
	        			}else{
	        				this.editTipsDom.topDom('<label class="iconfont slidesIcon">&#xe617;</label>刷新失败');
	        			}
	        			this.isResetDom = false;
	        			setTimeout(()=>{
	        				requestAnimationFrame(run);
	        				setTimeout(()=>{
	        					this.editTipsDom.topDom('╮(╯▽╰)╭');
	        				},200)
	        			},200)
	        		});
        		}else{
        			requestAnimationFrame(run);
        		}
        	}else{
        		requestAnimationFrame(run);
        	}
		},
		slidesBottom( run, y){
			if(y > -this.absHeight -this.remSize(.6)){
				if(!store.state.com.isSlidesBottom){
					if(!store.state.com.isMaxPage){
	    				this.editTipsDom.bottomDom('<i class="index_loading"></i>');
	    			}
	    			this.callbackResetBottom(( isReset)=>{
	        			if(isReset){
	        				/*this.editTipsDom.bottomDom('加载成功');*/
	        			}else{
	        				/*this.editTipsDom.bottomDom('加载失败');*/
	        			}
	        			this.isBottomResetDom = false;
	        			if(!store.state.com.isMaxPage){
		        			setTimeout(()=>{
		        				requestAnimationFrame(run);
		        				this.editTipsDom.bottomDom(' ');
		        			},200)
	        			}else{
	        				requestAnimationFrame(run);
	        				this.editTipsDom.bottomDom(' ');
	        			}
	        			
	        		});
	        	}else{
        			requestAnimationFrame(run);
        		}
        	}else{
        		requestAnimationFrame(run);
        	}
		},
		stopBubble(e){
		　　if(e&&e.stopPropagation){//非IE
		　　	  e.stopPropagation();
		　　}
		　　else{//IE
		　　	  window.event.cancelBubble=true;
		　　}
		},
		// 设置transform坐标等方法
		fnTranslate( y) {
            y = Math.round(1000 * y) / 1000;
            
            this.dom.style.webkitTransform = 'translate(' + [0, y + 'px'].join(',') + ')';
            this.dom.style.transform = 'translate3d(' + [0, y + 'px', 0].join(',') + ')';
            this.dom.style.transitionDuration = "0ms";
            this.dom.style.transitionTimingFunction= "cubic-bezier(0.165, 0.84, 0.44, 1)";
      	},
      	scrollChatListDown( y){
      		let refs = this.$refs,
      			x2 = refs.slides_main.getBoundingClientRect().height,
      			x = refs.slidesClassMain.getBoundingClientRect().height,
      			x3 = x2 - x;
      			y = x3 < x ? 0 : -x3;
	      		this.dom =  this.$refs.slides_main;
	      		this.fnTranslate(y)
	      		this.dom.distanceY = y;
      	},
      	fnScrollbar( dom, y){
      		if(!dom){
      			return;
      		}
      		y = y / this.sildeSand;
            y = Math.round(1000 * y) / 1000;
            
            dom.style.webkitTransform = 'translate(' + [0, y + 'px'].join(',') + ')';
            dom.style.transform = 'translate3d(' + [0, y + 'px', 0].join(',') + ')';
            dom.style.transitionDuration = "0ms";
            dom.style.transitionTimingFunction= "cubic-bezier(0.165, 0.84, 0.44, 1)";
      	},
        //设置位置
        setPosit(dom,x,y){
        	this.dom = document.getElementById(dom);
        	if(this.dom){
	            this.dom.distanceY = y;
	        	this.fnTranslate(y);
        	}
        	
        },
        // easeOutBounce算法
        /*
         * t: current time（当前时间）；
         * b: beginning value（初始值）；
         * c: change in value（变化量）；
         * d: duration（持续时间）。
         * Linear：无缓动效果
		 * Quadratic：二次方的缓动（t^2）
		 * Cubic：三次方的缓动（t^3）
		 * Quartic：四次方的缓动（t^4）
		 * Quintic：五次方的缓动（t^5）
		 * Sinusoidal：正弦曲线的缓动（sin(t)）
		 * Exponential：指数曲线的缓动（2^t）
		 * Circular：圆形曲线的缓动（sqrt(1-t^2)）
		 * Elastic：指数衰减的正弦曲线缓动
		 * 超过范围的三次方缓动（(s+1)*t^3 – s*t^2）
		 * 指数衰减的反弹缓动
        **/
        easeOutBounce(t, b, c, d) {
        	/*
			 * Tween.js
			 * t: current time（当前时间）
			 * b: beginning value（初始值）
			 * c: change in value（变化量）
			 * d: duration（持续时间）
			*/
			var Tween = {
			    Linear: function(t, b, c, d) { return c*t/d + b; },
			    Quad: {
			        easeIn: function(t, b, c, d) {
			            return c * (t /= d) * t + b;
			        },
			        easeOut: function(t, b, c, d) {
			            return -c *(t /= d)*(t-2) + b;
			        },
			        easeInOut: function(t, b, c, d) {
			            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			            return -c / 2 * ((--t) * (t-2) - 1) + b;
			        }
			    },
			    Cubic: {
			        easeIn: function(t, b, c, d) {
			            return c * (t /= d) * t * t + b;
			        },
			        easeOut: function(t, b, c, d) {
			            return c * ((t = t/d - 1) * t * t + 1) + b;
			        },
			        easeInOut: function(t, b, c, d) {
			            if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
			            return c / 2*((t -= 2) * t * t + 2) + b;
			        }
			    },
			    Quart: {
			        easeIn: function(t, b, c, d) {
			            return c * (t /= d) * t * t*t + b;
			        },
			        easeOut: function(t, b, c, d) {
			            return -c * ((t = t/d - 1) * t * t*t - 1) + b;
			        },
			        easeInOut: function(t, b, c, d) {
			            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			            return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
			        }
			    },
			    Quint: {
			        easeIn: function(t, b, c, d) {
			            return c * (t /= d) * t * t * t * t + b;
			        },
			        easeOut: function(t, b, c, d) {
			            return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
			        },
			        easeInOut: function(t, b, c, d) {
			            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			            return c / 2*((t -= 2) * t * t * t * t + 2) + b;
			        }
			    },
			    Sine: {
			        easeIn: function(t, b, c, d) {
			            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			        },
			        easeOut: function(t, b, c, d) {
			            return c * Math.sin(t/d * (Math.PI/2)) + b;
			        },
			        easeInOut: function(t, b, c, d) {
			            return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
			        }
			    },
			    Expo: {
			        easeIn: function(t, b, c, d) {
			            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			        },
			        easeOut: function(t, b, c, d) {
			            return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			        },
			        easeInOut: function(t, b, c, d) {
			            if (t==0) return b;
			            if (t==d) return b+c;
			            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			        }
			    },
			    Circ: {
			        easeIn: function(t, b, c, d) {
			            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			        },
			        easeOut: function(t, b, c, d) {
			            return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
			        },
			        easeInOut: function(t, b, c, d) {
			            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			        }
			    },
			    Elastic: {
			        easeIn: function(t, b, c, d, a, p) {
			            var s;
			            if (t==0) return b;
			            if ((t /= d) == 1) return b + c;
			            if (typeof p == "undefined") p = d * .3;
			            if (!a || a < Math.abs(c)) {
			                s = p / 4;
			                a = c;
			            } else {
			                s = p / (2 * Math.PI) * Math.asin(c / a);
			            }
			            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			        },
			        easeOut: function(t, b, c, d, a, p) {
			            var s;
			            if (t==0) return b;
			            if ((t /= d) == 1) return b + c;
			            if (typeof p == "undefined") p = d * .3;
			            if (!a || a < Math.abs(c)) {
			                a = c; 
			                s = p / 4;
			            } else {
			                s = p/(2*Math.PI) * Math.asin(c/a);
			            }
			            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
			        },
			        easeInOut: function(t, b, c, d, a, p) {
			            var s;
			            if (t==0) return b;
			            if ((t /= d / 2) == 2) return b+c;
			            if (typeof p == "undefined") p = d * (.3 * 1.5);
			            if (!a || a < Math.abs(c)) {
			                a = c; 
			                s = p / 4;
			            } else {
			                s = p / (2  *Math.PI) * Math.asin(c / a);
			            }
			            if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
			        }
			    },
			    Back: {
			        easeIn: function(t, b, c, d, s) {
			            if (typeof s == "undefined") s = 1.70158;
			            return c * (t /= d) * t * ((s + 1) * t - s) + b;
			        },
			        easeOut: function(t, b, c, d, s) {
			            if (typeof s == "undefined") s = 1.70158;
			            return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
			        },
			        easeInOut: function(t, b, c, d, s) {
			            if (typeof s == "undefined") s = 1.70158; 
			            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			            return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
			        }
			    },
			    Bounce: {
			        easeIn: function(t, b, c, d) {
			            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
			        },
			        easeOut: function(t, b, c, d) {
			            if ((t /= d) < (1 / 2.75)) {
			                return c * (7.5625 * t * t) + b;
			            } else if (t < (2 / 2.75)) {
			                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			            } else if (t < (2.5 / 2.75)) {
			                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			            } else {
			                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			            }
			        },
			        easeInOut: function(t, b, c, d) {
			            if (t < d / 2) {
			                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
			            } else {
			                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
			            }
			        }
			    }
			}
			Math.tween = Tween;
			Math.tween.Linear(t, b, c, d)
			return Math.tween.Linear(t, b, c, d);
        },
        handler() {
        	let type = event.target.getAttribute('type') || '';
        	if(!type || type != 'range'){
        		event.preventDefault();
        	}
		},
    },
    mounted() {
		this.slinit();
	},
    /*created(){
        // 绑定事件
	    document.body.addEventListener('touchmove', this.handler, false);
	},
	destroyed(){//组件销毁后
	  	// 解绑事件
		document.body.removeEventListener('touchmove', this.handler, false);
	}*/
};