import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use( VueRouter);
//公共方法 禁止修改
export default new VueRouter({
  mode:'hash',
  /*mode:'abstract',*/
  /*mode:'hash',*/
	base:'/static/dist',
    routes: [{
	      path: '/',
	      redirect: '/linkRegister'
			},
			{
	      name: 'notfound',
	      path:'*',
	      component: resolve => { require(['src/views/other/notfound.vue'], resolve)}
		  },
	    {//商品详情
	      name: 'goods',
	      path:'/goods',
	      component: resolve => { require(['src/views/goods/goods.vue'], resolve)}
	    },
	    {//新商品详情
	      name: 'newgoods',
	      path:'/newgoods',
	      component: resolve => { require(['src/views/goods/newgoods.vue'], resolve)}
	    },{//商品评价列表
	      name: 'evaluateList',
	      path:'/evaluateList',
	      component: resolve => { require(['src/views/goods/evaluateList.vue'], resolve)}
	    },
	    
	    
	    {//vip特权
	    	name: 'vipPrivilege',
	      path:'/vipPrivilege',
	      component: resolve => { require(['src/views/pages/vipPrivilege.vue'], resolve)}
	    },{//邀请好友
	    	name: 'inviteFriends',
	      path:'/inviteFriends',
	      component: resolve => { require(['src/views/pages/inviteFriends.vue'], resolve)}
	    },
	    {//下载选择
	    	name: 'downloadingMode',
	      path:'/downloadingMode',
	      component: resolve => { require(['src/views/pages/downloadingMode.vue'], resolve)}
	    }
	    ,{//一星合伙人特权
	    	name: 'oneLevel',
	      path:'/oneLevel',
	      component: resolve => { require(['src/views/pages/oneLevel.vue'], resolve)}
	    },
	    {//链接用户
	    	name: 'linkRegister',
	      path:'/linkRegister',
	      component: resolve => { require(['src/views/pages/linkRegister.vue'], resolve)}
	    },{//链接用户成功
	    	name: 'linkSuccess',
	      path:'/linkSuccess',
	      component: resolve => { require(['src/views/pages/linkSuccess.vue'], resolve)}
	    },{//供应商说明
	    	name: 'introduce_1',
	      path:'/introduce_1',
	      component: resolve => { require(['src/views/pages/introduce_1.vue'], resolve)}
	    },{//采购商说明
	    	name: 'introduce_2',
	      path:'/introduce_2',
	      component: resolve => { require(['src/views/pages/introduce_2.vue'], resolve)}
	    },{//线下体验店
	    	name: 'introduce_3',
	      path:'/introduce_3',
	      component: resolve => { require(['src/views/pages/introduce_3.vue'], resolve)}
	    },{//次定点商户
	    	name: 'introduce_4',
	      path:'/introduce_4',
	      component: resolve => { require(['src/views/pages/introduce_4.vue'], resolve)}
	    },{//市级代理商
	    	name: 'introduce_5',
	      path:'/introduce_5',
	      component: resolve => { require(['src/views/pages/introduce_5.vue'], resolve)}
	    },{//大区代理商
	    	name: 'introduce_6',
	      path:'/introduce_6',
	      component: resolve => { require(['src/views/pages/introduce_6.vue'], resolve)}
	    },{//关于说明
	    	name: 'about',
	      path:'/about',
	      component: resolve => { require(['src/views/pages/about.vue'], resolve)}
	    },{//代收款委托协议
	    	name: 'deliveryProtocol',
	      path:'/deliveryProtocol',
	      component: resolve => { require(['src/views/pages/deliveryProtocol.vue'], resolve)}
	    },{//注册协议
	    	name: 'registeriProtocol',
	      path:'/registeriProtocol',
	      component: resolve => { require(['src/views/pages/registeriProtocol.vue'], resolve)}
	    },{//推荐商家资料说明
	    	name: 'sellerIntroduce',
	      path:'/sellerIntroduce',
	      component: resolve => { require(['src/views/pages/sellerIntroduce.vue'], resolve)}
	    },{
	    	name: 'msgDetail',
	      path:'/msgDetail',
	      component: resolve => { require(['src/views/pages/msgDetail.vue'], resolve)}
	    },{//商户详情
	    	name: 'merchantDetail',
	      path:'/merchantDetail',
	      component: resolve => { require(['src/views/pages/merchantDetail.vue'], resolve)}
	    },{//新商户详情
	    	name: 'newmerchantDetail',
	      path:'/newmerchantDetail',
	      component: resolve => { require(['src/views/pages/newmerchantDetail.vue'], resolve)}
	    },{//壹元尊享流程
	    	name: 'flowPath',
	      path:'/flowPath',
	      component: resolve => { require(['src/views/goods/flowPath.vue'], resolve)}	    
	    }
    ]
})
