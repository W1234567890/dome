export default {
  // appkey: 'fe416640c8e8a72734219e1847ad2547',
  // postUrl: 'https://apptest.netease.im',
  // 用户的appkey
  appkey: '45c6af3c98409b18a84451215d0bdd6e',
 	/*appkey: 'adbdcf714e168de53955d909a1700dbf',*/
 
  // 用于在web demo中注册账号异步请求demo 服务器中使用
  postUrl: 'https://app.netease.im',

  // 用户自定义的登录注册地址
  loginUrl: 'src/views/personalCenter/login.vue',
  registUrl: 'src/views/personalCenter/register_1.vue',
  homeUrl: 'src/views/personalCenter/index.vue',

  // 资源路径根目录，为了方便用户部署在二级以上URL路径上
  resourceUrl: 'http://yx-web.nos.netease.com/webdoc/h5',
  // 用户logo地址
  logo: 'http://yx-web.nos.netease.com/webdoc/h5/im/logo.png',
  // 默认用户头像
  defaultUserIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-icon.png',
  // 系统通知图标
  noticeIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/notice-icon.png',
  // 我的手机图标
  myPhoneIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/my-phone.png',
  // 本地消息显示数量，会影响性能
  localMsglimit: 36,
  
  logoUrl: {
  	logoImg: "http://guoteng.oss-cn-shenzhen.aliyuncs.com/default/default.png",
  	logoSave: "?x-oss-process=image/resize,m_fill,h_600,w_300",
  },
 
  uid: "123456",
  sdktoken: "18888888888",
  
  
  userRes: {
  	token: "#@!1234567890!@#",//token 为合作商注册时给定的token,一个合作商一个token 一个appid.  //测试用
  	appid: "canairport001",
 //  appid:"lV7lHXt0CzS",
	// token:"50e3d181d17d4af9a663a863f8c9ddb6"
  }
}