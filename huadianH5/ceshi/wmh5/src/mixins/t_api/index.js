export default {
	methods:{
		share(data){
			let ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				  let bridge = getJsBridge();
    	          let cc=bridge.call("shareInfoWithUrl",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				 let cc=js.shareInfoWithUrl(JSON.stringify(data));
			}else{
				return;  //pc端
			}
		},
		callbackPageHeights(data){
			let ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				  let bridge = getJsBridge();
    	          let cc=bridge.call("shareInfoWithUrl",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				 let cc=js.callbackPageHeight(JSON.stringify(data));
			}else{
				return;  //pc端
			}
		},
		setWebTittle(title){
		 let ua = navigator.userAgent.toLowerCase();
		 let data={title:title};
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				  let bridge = getJsBridge();
    	          let cc=bridge.call("setWebTittle",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				 let cc=js.setWebTittle(JSON.stringify(data));
			}else{
				return;  //pc端
			}
	    },
	 	merDShareContent(obj){
	  	  let ua = navigator.userAgent.toLowerCase();
		  let data=obj;
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				  let bridge = getJsBridge();
    	          let cc=bridge.call("merDShareContent",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				 let cc=js.merDShareContent(JSON.stringify(data));                 
			}else{
				return;  //pc端
			}	  	
	    },
	    goodsToShare(obj){
	   		let ua = navigator.userAgent.toLowerCase();
		 	let data=obj;
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				let bridge = getJsBridge();
    	        let cc=bridge.call("goodsToShare",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				let cc=js.goodsToShare(JSON.stringify(data));                 
			}else{
				return;  //pc端
			}	
	    },
	    OpenNavigation(longitude, latitude, location){
		 	let ua = navigator.userAgent.toLowerCase();
		 	let data = 0;
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
			    let bridge = getJsBridge();
		        let cc=bridge.call("OpenNavigation",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
			    try{ 
			       let cc=js.OpenNavigation(longitude, latitude, location);//调用android的方法 		     
			    }catch(e){
			       //alert(e);  //cc为返回的值
			    }
			}else{
				return;  //pc端	
			}
		},
		serveExplains(){	
			let ua = navigator.userAgent.toLowerCase();
			let data = 0;
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				let bridge = getJsBridge();
				let cc=bridge.call("serveExplain",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				try{   	
				   let cc=js.serveExplain();//调用android的方法 			       
				}catch(e){
				   alert(e);  //cc为返回的值
				}
			}else{
				return;  //pc端	
			}
		},
		showMore(){	
			let ua = navigator.userAgent.toLowerCase();
			let data = 0;
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				let bridge = getJsBridge();
				let cc=bridge.call("showMore",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				try{   	
				   let cc=js.showMore();//调用android的方法 				 
				}catch(e){
				   //alert(e);  //cc为返回的值
				}
			}else{
				return;  //pc端	
			}
		},
		returnDetails(){	
			let ua = navigator.userAgent.toLowerCase();
			let data = 0;
			if (/iphone|ipad|ipod/.test(ua)) {
				//调用ios的方法
				let bridge = getJsBridge();
				let cc=bridge.call("returnDetails",data);
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				//调用android的方法
				try{   	
				   let cc=js.returnDetails();//调用android的方法 
				}catch(e){
				   alert(e);  //cc为返回的值
				}
			}else{
				return;  //pc端	
			}
		},
	    login( o){
	    	let data = o.data,url = o.url;
	    	this.getByUrl({data,url},( res)=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						if(!res){
							return;
						}
						if(typeof o.callback == 'function'){
							o.callback( res);
						}
					}
				})
			});
	    },
	    updated() {
			// 提交sdk连接请求
			/*this.$store.dispatch('connect')*/
			this.$store.dispatch('updateRefreshState')
		},
		formatDate(datetime, simple = false) {
		  let tempDate = (new Date()).getTime()
		  let result = this.stringifyDate(datetime, simple)
		  let thatDay = result.thatDay
		  let deltaTime = (tempDate - thatDay) / 1000
		
		  if (deltaTime < 3600 * 24) {
		    return result.withHour
		  } else if (deltaTime < 3600 * 24 * 2) {
		    return result.withLastDay
		  } else if (deltaTime < 3600 * 24 * 7) {
		    return result.withDay
		  } else if (deltaTime < 3600 * 24 * 30) {
		    return result.withMonth
		  } else {
		    return result.withYear
		  }
		},
		ms640(){
			window.isMs640 = true;
			this.setDocFontSize( 640);
		},
		pickers( e){
			this.time = this.getLocalTime1( new Date() / 1000);
			this.pickerTimer( res=>{
				this.$set(this,e,{
					texts:	res.text,
					dates:  new Date(res.y.text,res.m.text - 1,res.d.text,res.h.text,res.i.text,0)
				})
			})
		},
		getLocalTime1(nS) {
			if(nS != 0 && nS) {
				let date = new Date(nS * 1000),
					Y = date.getFullYear() + '-',
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
					D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
					h = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ':',
					m = (date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + '',
					s = (date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds()) + ':',
					ss = date.getMilliseconds(),
					data = Y + M + D + h + m;
				return data;
			} else {
				return " ";
			}
		},
        destroyed(){
			let win = window;
			if(win.isMs640){
				win.isMs640 = false;
				this.setDocFontSize( 750);
			}
	    },
    }
}