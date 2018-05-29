import store from '@/store'
import routes from '@/route'
import * as type from '@/store/type'
import config from 'src/config/im.js'
/** 
*   Toast公共方法
*/
export function toast(str, icon) {
    store.dispatch('showToast', true)
    if (icon == 'success') {
        store.dispatch('showSuccess', true)
        store.dispatch('showFail', false)
    } else {
        store.dispatch('showSuccess', false)
        store.dispatch('showFail', true)
    }
    store.dispatch('toastMsg',str);
    setTimeout(() => {
        store.dispatch('showToast', false); 
    },1500); 
}
export function toastMsg(content){
	let contents = content || '';
	mui.toast(contents);
} 

export function logout(str) {
	locache.remove('userInfo');
	locache.remove('XToken');
	locache.remove('loginInfo')
	routes.push({path:'/personalCenter/login'})
}

export function goloading( bool) {
	store.dispatch("isSlidesTop",false);
	store.dispatch('setLoadingState', bool);
}

export function CryptoJSAESKey( bool) {
	store.dispatch('getCryptojsAESKey', bool);
}

// 所有页面更新都会触发此函数
export function updated() {
	// 提交sdk连接请求
	store.dispatch('connect')
	store.dispatch('updateRefreshState')
}

export function Decrypt( encrypted){
	CryptoJSAESKey();
	let user = store.state.user.cryptojsAESKey,
    	decrypted = CryptoJS.AES.decrypt(encrypted,user.key,
            {
                iv:user.iv,
                mode:CryptoJS.mode.CBC,
                padding:CryptoJS.pad.Pkcs7
            });
    return decrypted.toString(CryptoJS.enc.Utf8);
}


export function resetChatroomSDK (chatroomId) {
  if (chatroomId) {
    state.chatroomInsts[chatroomId].disconnect()
  } else {
    for (let tempRoomId in state.chatroomInsts) {
      state.chatroomInsts[tempRoomId].disconnect()
    }
  }
  commit('resetCurrChatroom')
}

export function object2query ( obj) {
  let keys = Object.keys(obj)
  let queryArray = keys.map(item => {
    return `${item}=${encodeURIComponent(obj[item])}`
  })
  return queryArray.join('&');
}
export function getLocalTime(nS) {
	if(nS != 0 && nS) {
		let date = new Date(nS * 1000),
			Y = date.getFullYear() + '-',
			M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
			D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
			h = date.getHours() + ':',
			m = date.getMinutes() + ':',
			s = date.getSeconds() + ':',
			ss = date.getMilliseconds(),
			data = Y + M + D + h + m + s;
		return data;
	} else {
		return " ";
	}
}

export function shareGoods( msg,c){
  let ua = navigator.userAgent.toLowerCase();
  let data = {
    msg: msg || "testSyn"
  };
  if (/iphone|ipad|ipod/.test(ua)) {
    try{
      let bridge = getJsBridge();//调用ios的方法
          let cc=bridge.call("getToken",data);
          c && c(JSON.stringify(cc));  //cc为返回的值
    }catch(e){
      c && c();  //cc为返回的值
    }
  }else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
    try{
      let cc=js.getXToken();//调用android的方法
      c && c(cc);
    }catch(e){
      c && c();  //cc为返回的值
    }
  }else{
    c && c();
    return;  //pc端
  }
}

export function formatUserInfo (obj) {
  let gender = ''
  switch (obj.gender) {
    case 'male':
      gender = '男'
      break
    case 'female':
      gender = '女'
      break
    case 'unknown':
      gender = ''
      break
  }
	
  let custom = obj.custom || ''
  try {
    custom = JSON.parse(custom)
  } catch (e) {
    custom = {
      data: custom
    }
  }
  
  if (obj.avatar) {
    obj.avatar += '?imageView&thumbnail=40x40&quality=85'
  } else {
    obj.avatar = config.defaultUserIcon
  }

  let result = Object.assign(obj, {
    account: obj.account,
    nick: obj.nick || '',
    avatar: obj.avatar || config.defaultUserIcon,
    birth: obj.birth || '',
    email: obj.email || '',
    tel: obj.tel || '',
    gender,
    sign: obj.sign || '',
    custom,
    createTime: obj.createTime || (new Date()).getTime(),
    updateTime: obj.updateTime || (new Date()).getTime()
  })
  
  return result
}
// https://cn.vuejs.org/v2/guide/reactivity.html
// Vue 不能检测到对象属性的添加或删除。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上
export function mergeObject(dest, src) {
  if (typeof dest !== 'object' || dest === null) {
    dest = Object.create(null)
  }
  dest = Object.assign(Object.create(null), dest, src)
  return dest
}