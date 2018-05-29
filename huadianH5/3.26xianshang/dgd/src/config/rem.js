/**
 * rem计算方式：设计图尺寸px / 100 = 实际rem  例: 100px = 1rem
 */
!function (window) {

    /* 设计图文档宽度 */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* 添加倍屏标识，安卓倍屏为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }
    window.addEventListener("popstate",function(){
		window.BackInfo = true;
	})
    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
	
	
	var winHeight = window.innerHeight;   //获取当前页面高度
	window.addEventListener('resize',function(){
	    var thisHeight=this.innerHeight;
	    var scrollTop=document.body.scrollTop;
	    if(winHeight - thisHeight >50){
	         //当软键盘弹出，在这里面操作
	        typeof window.keyBoards == 'function' && window.keyBoards(true);
	    }else{
	    	//当软键盘收起，在此处操作
	    	typeof window.keyBoards == 'function' && window.keyBoards(false);
	    }
	});
}(window);

//  Import support https://stackoverflow.com/questions/13673346/supporting-both-commonjs-and-amd
;(function(name, definition) {
    if (typeof module !== "undefined") { window.clipboard = definition(); }
    else if (typeof define === "function" && typeof define.amd === "object") { define(definition); }
    else { window[name] = definition(); }
}("clipboard", function() {
  if (typeof document === 'undefined' || !document.addEventListener) {
    return null;
  }

  var clipboard = {};

  clipboard.copy = (function() {
    var _intercept = false;
    var _data = null; // Map from data type (e.g. "text/html") to value.
    var _bogusSelection = false;

    function cleanup() {
      _intercept = false;
      _data = null;
      if (_bogusSelection) {
        window.getSelection().removeAllRanges();
      }
      _bogusSelection = false;
    }

    document.addEventListener("copy", function(e) {
      if (_intercept) {
        for (var key in _data) {
          e.clipboardData.setData(key, _data[key]);
        }
        e.preventDefault();
      }
    });

    // Workaround for Safari: https://bugs.webkit.org/show_bug.cgi?id=156529
    function bogusSelect() {
      var sel = document.getSelection();
      // If "nothing" is selected...
      if (!document.queryCommandEnabled("copy") && sel.isCollapsed) {
        // ... temporarily select the entire body.
        //
        // We select the entire body because:
        // - it's guaranteed to exist,
        // - it works (unlike, say, document.head, or phantom element that is
        //   not inserted into the DOM),
        // - it doesn't seem to flicker (due to the synchronous copy event), and
        // - it avoids modifying the DOM (can trigger mutation observers).
        //
        // Because we can't do proper feature detection (we already checked
        // document.queryCommandEnabled("copy") , which actually gives a false
        // negative for Blink when nothing is selected) and UA sniffing is not
        // reliable (a lot of UA strings contain "Safari"), this will also
        // happen for some browsers other than Safari. :-()
        var range = document.createRange();
        range.selectNodeContents(document.body);
        sel.removeAllRanges();
        sel.addRange(range);
        _bogusSelection = true;
      }
    };

    return function(data) {
      return new Promise(function(resolve, reject) {
        _intercept = true;
        if (typeof data === "string") {
          _data = {"text/plain": data};
        } else if (data instanceof Node) {
          _data = {"text/html": new XMLSerializer().serializeToString(data)};
        } else if (data instanceof Object){
          _data = data;
        } else {
          reject("Invalid data type. Must be string, DOM node, or an object mapping MIME types to strings.")
        }

        function triggerCopy(tryBogusSelect) {
          try {
            if (document.execCommand("copy")) {
              // document.execCommand is synchronous: http://www.w3.org/TR/2015/WD-clipboard-apis-20150421/#integration-with-rich-text-editing-apis
              // So we can call resolve() back here.
              cleanup();
              resolve();
            }
            else {
              if (!tryBogusSelect) {
                bogusSelect();
                triggerCopy(true);
              } else {
                cleanup();
                throw new Error("Unable to copy. Perhaps it's not available in your browser?");
              }
            }
          } catch (e) {
            cleanup();
            reject(e);
          }
        }
        triggerCopy(false);

      });
    };
  })();

  clipboard.paste = (function() {
    var _intercept = false;
    var _resolve;
    var _dataType;

    document.addEventListener("paste", function(e) {
      if (_intercept) {
        _intercept = false;
        e.preventDefault();
        var resolve = _resolve;
        _resolve = null;
        resolve(e.clipboardData.getData(_dataType));
      }
    });

    return function(dataType) {
      return new Promise(function(resolve, reject) {
        _intercept = true;
        _resolve = resolve;
        _dataType = dataType || "text/plain";
        try {
          if (!document.execCommand("paste")) {
            _intercept = false;
            reject(new Error("Unable to paste. Pasting only works in Internet Explorer at the moment."));
          }
        } catch (e) {
          _intercept = false;
          reject(new Error(e));
        }
      });
    };
  })();

  // Handle IE behaviour.
  if (typeof ClipboardEvent === "undefined" &&
      typeof window.clipboardData !== "undefined" &&
      typeof window.clipboardData.setData !== "undefined") {

    /*! promise-polyfill 2.0.1 */
    (function(a){function b(a,b){return function(){a.apply(b,arguments)}}function c(a){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof a)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],i(a,b(e,this),b(f,this))}function d(a){var b=this;return null===this._state?void this._deferreds.push(a):void j(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(e){return void a.reject(e)}a.resolve(d)})}function e(a){try{if(a===this)throw new TypeError("A promise cannot be resolved with itself.");if(a&&("object"==typeof a||"function"==typeof a)){var c=a.then;if("function"==typeof c)return void i(b(c,a),b(e,this),b(f,this))}this._state=!0,this._value=a,g.call(this)}catch(d){f.call(this,d)}}function f(a){this._state=!1,this._value=a,g.call(this)}function g(){for(var a=0,b=this._deferreds.length;b>a;a++)d.call(this,this._deferreds[a]);this._deferreds=null}function h(a,b,c,d){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.resolve=c,this.reject=d}function i(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var j=c.immediateFn||"function"==typeof setImmediate&&setImmediate||function(a){setTimeout(a,1)},k=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};c.prototype["catch"]=function(a){return this.then(null,a)},c.prototype.then=function(a,b){var e=this;return new c(function(c,f){d.call(e,new h(a,b,c,f))})},c.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&k(arguments[0])?arguments[0]:arguments);return new c(function(b,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},c.resolve=function(a){return a&&"object"==typeof a&&a.constructor===c?a:new c(function(b){b(a)})},c.reject=function(a){return new c(function(b,c){c(a)})},c.race=function(a){return new c(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},"undefined"!=typeof module&&module.exports?module.exports=c:a.Promise||(a.Promise=c)})(this);

    clipboard.copy = function(data) {
      return new Promise(function(resolve, reject) {
        // IE supports string and URL types: https://msdn.microsoft.com/en-us/library/ms536744(v=vs.85).aspx
        // We only support the string type for now.
        if (typeof data !== "string" && !("text/plain" in data)) {
          throw new Error("You must provide a text/plain type.");
        }

        var strData = (typeof data === "string" ? data : data["text/plain"]);
        var copySucceeded = window.clipboardData.setData("Text", strData);
        if (copySucceeded) {
          resolve();
        } else {
          reject(new Error("Copying was rejected."));
        }
      });
    };

    clipboard.paste = function() {
      return new Promise(function(resolve, reject) {
        var strData = window.clipboardData.getData("Text");
        if (strData) {
          resolve(strData);
        } else {
          // The user rejected the paste request.
          reject(new Error("Pasting was rejected."));
        }
      });
    };
  }

  return clipboard;
}));



/**
 * WebAudio.js
 * HTML5的音频播放组件，兼容解决iOS系统下自动播放(autoplay)和循环播放(loop)的问题
 * https://github.com/tjuking/audio.js
 */

(function (global, factory) {
    "use strict";

    if (typeof define === "function" && define.amd) {
        define(function () {
            return factory();
        });
    } else if (typeof exports !== "undefined") {
        module.exports = factory();
    } else {
        global.WebAudio = factory();
    }
})(window, function () {
    "use strict";

    /**
     * 封装的audio操作对象
     * @param option {object} 传入的参数
     * @constructor
     */
    var WebAudio = function (option) {
        var events = [
            "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error",
            "onloadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing",
            "progress", "ratechange", "readystatechange", "seeked", "seeking", "stalled",
            "suspend", "timeupdate", "volumechange", "waiting"
        ];
        var noop = function () { //空函数
        };
        var i;
        var key;
        option = option || {};
        this._events = events;
        this.options = {
            src: "", //声音来源
            autoPlay: false, //是否自动播放，默认是false
            loop: false, //是否循环播放，默认是false
            duration: 0 //声音长度，单位是秒
        };
        for (i = 0; i < events.length; i++) {
            this.options["on" + firstLetterUppercase(events[i])] = noop; //例如："onEnded"
        }
        for (key in option) {
            if (option.hasOwnProperty(key)) {
                this.options[key] = option[key];
            }
        }
        this.audio = new Audio();
        this._init();
    };
    WebAudio.prototype = {

        constructor: WebAudio,

        /**
         * 初始化入口函数
         * @private
         */
        _init: function () {
            var that = this;
            var i;
            var inIOS = isIOS();
            var options = this.options;
            for (i = 0; i < this._events.length; i++) { //添加事件
                this._addEventListener(this._events[i]);
            }
            if (inIOS) { //在iOS中的处理比较特殊一些
                if (options.loop) { //设置了循环播放
                    //通过时间更新来判断是否需要开始重新播放
                    this.audio.addEventListener("timeupdate", function (e) {
                        if (_getDuration() - that.audio.currentTime <= 0.8) { //当距离总时间小于0.2秒时，将重新播放
                            that.audio.currentTime = 0;
                        }
                    }, false);
                }
                if (options.autoPlay) { //设置了自动播放
                    document.addEventListener("touchstart", _autoPlay, false); //需要用户交互才能开始播放
                }
            } else { //非iOS环境下
                if (options.loop) { //设置了循环播放
                    this.audio.loop = true;
                }
                if (options.autoPlay) { //设置了自动播放
                    _autoPlay();
                }
            }

            /**
             * iOS下自动播放开始，完成后需要移除事件绑定
             * @private
             */
            function _autoPlay() {
                that.load();
                that.play();
                if (inIOS) {
                    document.removeEventListener("touchstart", _autoPlay, false);
                }
            }

            /**
             * 获取音频的时长
             * @returns {number} 音频的时长
             * @private
             */
            function _getDuration() {
                var duration = that.options.duration; //默认是用户传入的时间
                var audioDuration = that.audio.duration; //实际的音频长度（优先级更高）
                if (typeof audioDuration === "number" && !isNaN(audioDuration) && isFinite(audioDuration)) {
                    duration = audioDuration;
                }
                return duration;
            }
        },

        /**
         * 加载音频文件
         * @param [src] {string} 音频文件的地址
         */
        load: function (src) {
            this.audio.src = src || this.options.src;
        },

        /**
         * 播放
         */
        play: function () {
            this.audio.play();
        },

        /**
         * 暂停
         */
        pause: function () {
            this.audio.pause();
        },

        /**
         * 添加事件
         * @param event {string} 事件名称
         * @private
         */
        _addEventListener: function (event) {
            var that = this;
            this.audio.addEventListener(event, function (e) {
                that.options["on" + firstLetterUppercase(event)].call(that, e);
            }, false);
        }
    };

    /**
     * 首字母大写
     * @param word {string} 传入的字符串
     * @returns {string} 首字母大写后的字符串
     */
    function firstLetterUppercase(word) {
        if (typeof word === "string" && word.length) { //是字符串且长度不为0
            return word[0].toUpperCase() + word.substring(1);
        } else {
            return word;
        }
    }

    /**
     * 检测是否为iOS中
     * @returns {boolean} 是否在iOS中
     */
    function isIOS() {
        return /iPad|iPhone|iPod/i.test(navigator.userAgent) && !window.MSStream;
    }

    return WebAudio;
});