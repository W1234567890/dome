import {
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
	resetStyles,
	setScrollData
} from './init'

import {iscroll,iscrollInit} from './scroll'
import {iswiper,iswiperInit} from './iswiper'
export default {
	iswiper:{
		inserted: function(el, binding, vnode) {
			vnode.context.$nextTick(()=>{
				iswiperInit(el, binding, vnode)
			})
		},
		componentUpdated: function(el, binding, vnode) {
			vnode.context.$nextTick(()=>{
				
			})
		},
		unbind: function(el, binding, vnode) {
			window.watchPage = null;
			delete window.watchPage;
		},
	},
	iscroll:{
		inserted: function(el, binding, vnode) {
			vnode.context.$nextTick(()=>{
				iscrollInit(el, binding, vnode)
			})
		},
		componentUpdated: function(el, binding, vnode) {
			vnode.context.$nextTick(()=>{
				
			})
		},
	},
	video:{
		inserted: function(el, binding, vnode) {
			vnode.context.$nextTick(()=>{
				//binding.value.DPlayer = el;
				//binding.value.video = el;
				binding.value.video = el.querySelectorAll('video')[0];
				binding.value.plays = false;
				binding.value.DPlayer = null;
				//binding.value.plays = false;
				//el.play();
				/*binding.value.DPlayer =  new DPlayer({
			   	 	element: el,
				    video: {
				        url: binding.value.mp4_url,
				    }
				});*/
			})
		},
		componentUpdated: function(el, binding, vnode) {
			vnode.context.$nextTick(()=>{
				//resetStyles(el,binding.value)
			})
		},
	},
	styles:{
		inserted: function(el, binding, vnode) {
			vnode.context.$nextTick(()=>{
				resetStyles(el,binding.value)
			})
		},
		componentUpdated: function(el, binding, vnode) {
			vnode.context.$nextTick(()=>{
				resetStyles(el,binding.value)
			})
		},
	},
	focus: {
        inserted: function (el, {value},vnode) {
            if (value) {
           		el.scrollIntoView(true);
           		el.focus();
            }
        }
    },
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
				setScrollData(el, binding, vnode);
			});
		},
		bind: function(el, binding, vnode) {
			
	    },
	    unbind: function(el, binding, vnode) {
		    	if(binding.value){
				var num = binding.value.num;
	    			delete window._scroll_[num];
			}
	    },
	   	componentUpdated(el, binding, vnode) {
		    	setTimeout(()=>{	
		    		if(binding.value && !vnode.context.isData(window._scroll_)){
					var num = binding.value.num
					if(!window._scroll_[num]){
						return;
					}
					//console.info(window._scroll_[num])
					
					if(!window._scroll_[num].moved && !window._scroll_[num].isStart){
			    			window._scroll_[num].$lazy._initLazy();
			    			window._scroll_[num].$lazy.watch( window._scroll_[num].y || 0);
			    			window._scroll_[num].refresh();
			    		}
				}
		    	})
	    },
	}
}