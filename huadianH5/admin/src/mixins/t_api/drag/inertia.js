import { mapGetters,mapActions } from 'vuex'


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
           	 	not_dom_class:[
	    			'view'
	    		],
	    		not_dom_id:[
	    			'businPosterDt',
	    			'app'
	    		],
	    		api:null
        	}
        }
    },
    computed: {
      ...mapGetters([
          'getBusinlist',
          'getBusinDomData',
          'getBusinData',
      ]),
    },
    methods: {
    	inertiaInit(){
    		this.win = window;
    		// 浏览器窗体尺寸
	        this.winWidth = this.win.innerWidth;
	        this.winHeight = this.win.innerHeight;
	        this.distanceY = 0;
	        this.distanceX = 0;
	        this.params = {
           	 	// 是否吸附边缘
            	edge: false
           	}
	        this.localStorages();
    	},
    	initBound(){
    		// 显示拖拽元素
	        this.dom.style.visibility = 'visible';
	        // 如果元素在屏幕之外，位置使用初始值
	        let initBound = this.dom.getBoundingClientRect();
	        if (initBound.left < -0.5 * initBound.width ||
	            initBound.top < -0.5 * initBound.height ||
	            initBound.right > this.winWidth + 0.5 * initBound.width ||
	            initBound.bottom > this.winHeight + 0.5 * initBound.height
	            ) {
	            this.dom.distanceX = 0;
	            this.dom.distanceY = 0;
	            this.fnTranslate(0, 0);
	        }
    	},
    	seachDom(e,callback){//递归查找点击的元素是否有id，如果没有 向上查找 直到找到为止
    		if(!this.domParent){
    			if(!e.target.id){
	    			this.domParent = e.target.parentElement;
	    			this.seachDom(e,callback);
	    		}else{
	    			if(e.target.className && $(e.target.className).hasClass('view')){
	    				return;
	    			}else{
		    			this.dom = e.target;
		    			callback();
	    			}
	    		}
    		}else{
    			if(!this.domParent.id){
	    			this.domParent = this.domParent.parentElement;
	    			this.seachDom(e,callback);
	    		}else{
	    			if(this.domParent.className && $(this.domParent).hasClass('view')){
	    				return;
	    			}else{
	    				this.dom = this.domParent;
	    				callback();
	    			}
	    		}
    		}
    	},
    	//手指按下
    	_touchStart( e){
    			
    			this.isEnd = false;
	    		this.domParent = "";
	    		this.isScrolls = false;
	    		this.seachDom(e,()=>{
		    		this.$nextTick(()=>{
		    			/*let api = this.$store.state.t_api.businDomtd;*/
		    			this.isScrolls = true;
		    			this.stopBubble(e);
			    		this.initBound();
			    		this.startTouche = e.touches[0] || e.changedTouches[0];
			    		this.posX = this.startTouche.pageX;
			            this.posY = this.startTouche.pageY;
			            this.touching = true;
			            this.distanceX = 0;
			            this.distanceY = 0;
			            if (this.dom.distanceX) {
			                this.distanceX = this.dom.distanceX;
			            }else{
			            	this.distanceX = 0;
			            }
			            if (this.dom.distanceY) {
			                this.distanceY = this.dom.distanceY;
			            }else{
			            	this.distanceX = 0;	
			            }
			            // 元素的位置数据
			            this.bound = this.dom.getBoundingClientRect();
			            this.timerready = true;
			        })
	    		})
    		
        },
    	//手指滑动
    	_touchMove(e){
    		if(!this.isEnd){
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
		    		this.nowX = this.moveTouche.pageX;
		            this.nowY = this.moveTouche.pageY;
		
		            var distanceX = this.nowX - this.posX,
		                distanceY = this.nowY - this.posY;
					
		            // 此时元素的位置
		            var absLeft = this.bound.left + distanceX,
		                absTop = this.bound.top + distanceY,
		                absRight = absLeft + this.bound.width,
		                absBottom = absTop + this.bound.height;
		            // 边缘检测
		            if (absLeft < 0) {
		                distanceX = distanceX - absLeft;
		            }
		            if (absTop < 0) {
		                distanceY = distanceY - absTop;
		            }
		            if (absRight > this.winWidth) {
		                distanceX = distanceX - (absRight - this.winWidth);
		            }
		            if (absBottom > this.winHeight) {
		                distanceY = distanceY - (absBottom - this.winHeight);
		            }
		            
		            // 元素位置跟随
		            var x = this.distanceX + distanceX,
		            	y = this.distanceY + distanceY;
		            this.stopBubble(e);
		            this.fnTranslate(x, y);
		
		            // 缓存移动位置
		            this.dom.distanceX = x;
		            this.dom.distanceY = y;
	            }
    		}
    	},
    	//手指松开
		_touchEnd(e){
			this.isEnd = true;
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
	
	            if (!this.nowX || !this.nowY) {
	                return;
	            }
	
	            // 移动的水平和垂直距离
	            var distanceX = this.nowX - this.posX,
	                distanceY = this.nowY - this.posY;
	
	            if (Math.abs(distanceX) < 5 && Math.abs(distanceY) < 5) {
	                return;
	            }
	
	            // 距离和时间
	            var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY), time = this.timerend - this.timerstart;
	
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
	
	                // 根据运动角度，分配给x, y方向
	                var moveX = reverseX * speed * distanceX / distance, moveY = reverseY * speed * distanceY / distance;
	
	                // 此时元素的各个数值
	                var bound = this.dom.getBoundingClientRect();
	
	                if (moveX < 0 && bound.left + moveX < 0) {
	                    moveX = 0 - bound.left;
	                    // 碰触边缘方向反转
	                    reverseX = reverseX * -1;
	                } else if (moveX > 0 && bound.right + moveX > this.winWidth) {
	                    moveX = this.winWidth - bound.right;
	                    reverseX = reverseX * -1;
	                }
	
	                if (moveY < 0 && bound.top + moveY < 0) {
	                    moveY = -1 * bound.top;
	                    reverseY = -1 * reverseY;
	                } else if (moveY > 0 && bound.bottom + moveY > this.winHeight) {
	                    moveY = this.winHeight - bound.bottom;
	                    reverseY = -1 * reverseY;
	                }
	
	                var x = this.dom.distanceX + moveX, 
	                	y = this.dom.distanceY + moveY;
	                // 位置变化
	                this.fnTranslate(x, y);
	
	                this.dom.distanceX = x;
	                this.dom.distanceY = y;
					
	                if (speed < 0.1) {
	                    speed = 0;
	                    if (this.params.edge == false) {
	                        this.inertiaing = false;
	                        if(this.getBusinDomData == null || this.getBusinDomData == undefined){
	                        	return;
	                        }
							let data = this.getBusinDomData;
							
							if(data.length < 0 || data.name.length < 0   || data.page.length < 0 ){
								return;
							}
							
							if(!this.getBusinData){
								if(data.name == "ewm"){
									this.getBusinlist[data.page]['h5settings'][data.name].distanceX = x;
									this.getBusinlist[data.page]['h5settings'][data.name].distanceY = y;
									this.getBusinlist[data.page]['h5settings'][data.name].winWidth = this.winWidth;
								}else{
									this.getBusinlist[data.page]['h5settings'][data.name][data.key].distanceX = x;
									this.getBusinlist[data.page]['h5settings'][data.name][data.key].distanceY = y;
									this.getBusinlist[data.page]['h5settings'][data.name][data.key].winWidth = this.winWidth;
								}
								this.editBusin(this.getBusinlist)
							}else{
								if(data.name == "ewm"){
									this.getBusinData[data.page]['h5settings'][data.name].distanceX = x;
									this.getBusinData[data.page]['h5settings'][data.name].distanceY = y;
									this.getBusinData[data.page]['h5settings'][data.name].winWidth = this.winWidth;
								}else{
									this.getBusinData[data.page]['h5settings'][data.name][data.key].distanceX = x;
									this.getBusinData[data.page]['h5settings'][data.name][data.key].distanceY = y;
									this.getBusinData[data.page]['h5settings'][data.name][data.key].winWidth = this.winWidth;
								}
								this.$store.dispatch("setBusinData",this.getBusinData);
							}
							
							
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
	                var init = this.dom.distanceX, y = this.dom.distanceY, change = 0;
	                // 判断元素现在在哪个半区
	                var bound = this.dom.getBoundingClientRect();
	                if (bound.left + bound.width / 2 < this.winWidth / 2) {
	                    change = -1 * bound.left;
	                } else {
	                    change = this.winWidth - bound.right;
	                }
	
	                var run =  () =>{
	                    // 如果用户触摸元素，停止继续动画
	                    if (this.touching == true) {
	                        this.inertiaing = false;
	                        return;
	                    }
	
	                    start++;
	                    var x = this.easeOutBounce(start, init, change, during);
	                    this.fnTranslate(x, y);
						
	                    if (start < during) {
	                        requestAnimationFrame(run);
	                    } else {
	                        this.dom.distanceX = x;
	                        this.dom.distanceY = y;
	
	                        this.inertiaing = false;
	                    }
	                };
	                run();
	            };
	
	            step();
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
		fnTranslate(x, y) {
            x = Math.round(1000 * x) / 1000;
            y = Math.round(1000 * y) / 1000;
            
            this.dom.style.webkitTransform = 'translate(' + [x + 'px', y + 'px'].join(',') + ')';
            this.dom.style.transform = 'translate3d(' + [x + 'px', y + 'px', 0].join(',') + ')';
       	},
        localStorages(){
        	/*// 居然有android机子不支持localStorage
        	if(locache.get("Inertia")){
        		let Inertia = locache.get("Inertia");
        		for(var i= 0;i< Inertia.length;i++){
        			let rems = this.remd(Inertia[i]);
        			this.setPosit(Inertia[i].id,rems.x,rems.y);
        		}
        	}*/
        },
        //设置位置
        setPosit(dom,x,y){
        	this.dom = document.getElementById(dom);
        	if(this.dom){
        		this.dom.distanceX = x;
	            this.dom.distanceY = y;
	        	this.fnTranslate(x, y);
        	}
        	
        },
        // easeOutBounce算法
        /*
        * t: current time（当前时间）；
         * b: beginning value（初始值）；
         * c: change in value（变化量）；
         * d: duration（持续时间）。
        **/
        easeOutBounce(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
            }
        },
        handler() {
        	let type = event.target.getAttribute('type') || '';
        	if(!type || type != 'range'){
        		event.preventDefault();
        	}
		},
		remd( o){
			let y = o.distanceY/o.winWidth * this.winWidth,
				x = o.distanceX/o.winWidth * this.winWidth,
				data = {
					y,
					x
				};
			return data;
		},
		BusinInits(){
			$.each(this.getBusinlist, (i,o)=>{
				let rems = this.remd({
					distanceX : o["h5settings"].ewm.distanceX,
	    	    	distanceY : o["h5settings"].ewm.distanceY,
	    	    	winWidth  : o["h5settings"].ewm.winWidth
				});
				this.setPosit('dragPerEwm'+i,rems.x,rems.y);
				$.each(o["h5settings"].text, (ti,to)=>{
					let texts = this.remd({
						distanceX : to.distanceX,
		    	    	distanceY : to.distanceY,
		    	    	winWidth  : to.winWidth
					});
					this.setPosit(to.id,texts.x,texts.y);
				});
				$.each(o["h5settings"].logo, (li,lo)=>{
					let logo = this.remd({
						distanceX : lo.distanceX,
		    	    	distanceY : lo.distanceY,
		    	    	winWidth  : lo.winWidth
					});
					this.setPosit(lo.id,logo.x,logo.y);
				});
			});
			
		},
    },
    mounted() {
		this.inertiaInit();
	},
    created(){
        // 绑定事件
	    document.body.addEventListener('touchmove', this.handler, false);
	},
	destroyed(){//组件销毁后
	  	// 解绑事件
		document.body.removeEventListener('touchmove', this.handler, false);
	}
};