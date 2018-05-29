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
	      redirect: '/merChantIndex'
			},
			{
	      name: 'notfound',
	      path:'*',
	      component: resolve => { require(['src/views/other/notfound.vue'], resolve)}
		 },{//登录
	      name: 'login',
	      path:'/login',
	      component: resolve => {require(['src/views/pages/login.vue'], resolve)}
	   },{//商家版首页
	      name: 'merChantIndex',
	      path:'/merChantIndex',
	      component: resolve => {require(['src/views/merChantIndex.vue'], resolve)}
	   },
	   
		 // 商品模块
		 { //商品出售下架
      name: 'saleShelves',
      path:'/saleShelves',
      component: resolve => {require(['src/views/goodsPages/saleShelves.vue'], resolve)}
    },
		 {//添加商品
      name: 'addGoods',
      path:'/addGoods',
      component: resolve => {require(['src/views/goodsPages/addGoods.vue'], resolve)}
     },{//添加商品
      name: 'goodsImgPreview',
      path:'/goodsImgPreview',
      component: resolve => {require(['src/views/goodsPages/goodsImgPreview.vue'], resolve)}
     },{//商品详情
	      name: 'goods',
	      path:'/goods',
	      component: resolve => { require(['src/views/goodsPages/goods.vue'], resolve)}
	    },{//商品评价列表
	      name: 'evaluateList',
	      path:'/evaluateList',
	      component: resolve => { require(['src/views/goodsPages/evaluateList.vue'], resolve)}
	    },{  //选择类目
      name: 'selectCategory',
      path:'/selectCategory',
      component: resolve => {require(['src/views/goodsPages/selectCategory.vue'], resolve)}
   },{
   	   //类目列表
      name: 'categoryList',
      path:'/categoryList',
      component: resolve => {require(['src/views/goodsPages/categoryList.vue'], resolve)}
   },{//增加商品规格
      name: 'addSpecification',
      path:'/addSpecification',
      component: resolve => {require(['src/views/goodsPages/addSpecification.vue'], resolve)}
   },{//分享商品
      name: 'shareGoods',
      path:'/shareGoods',
      component: resolve => {require(['src/views/goodsPages/shareGoods.vue'], resolve)}
   },{//添加商品详情
      name: 'addGoodsDetail',
      path:'/addGoodsDetail',
      component: resolve => {require(['src/views/goodsPages/addGoodsDetail.vue'],resolve)}
   },
    
    //订单模块
	    {//订单列表   供应商
      name: 'orderList',
      path:'/orderList',
      component: resolve => {require(['src/views/order/orderList.vue'], resolve)}
    },{//订单详情
      name: 'orderDetail',
      path:'/orderDetail',
      component: resolve => {require(['src/views/order/orderDetail.vue'], resolve)}
    },{//修改买家信息
      name: 'editBuyerMes',
      path:'/editBuyerMes',
      component: resolve => {require(['src/views/order/editBuyerMes.vue'], resolve)}
    },{//订单备注
      name: 'orderRemark',
      path:'/orderRemark',
      component: resolve => {require(['src/views/order/orderRemark.vue'], resolve)}
    },{//物流信息
      name: 'logisticsMes',
      path:'/logisticsMes',
      component: resolve => {require(['src/views/order/logisticsMes.vue'], resolve)}
    },{//物流详情
      name: 'logisticsDetail',
      path:'/logisticsDetail',
      component: resolve => {require(['src/views/order/logisticsDetail.vue'], resolve)}
    },{//拒绝退款原因
      name: 'refuseRefund',
      path:'/refuseRefund',
      component: resolve => {require(['src/views/order/refuseRefund.vue'], resolve)}
    },{//退款详情
      name: 'drawBackDetail',
      path:'/drawBackDetail',
      component: resolve => {require(['src/views/order/drawBackDetail.vue'], resolve)}
    },
    {//联盟商户、一元蛋糕、一元家具的订单列表
      name: 'merOrderList',
      path:'/merOrderList',
      component: resolve => {require(['src/views/order/merOrderList.vue'], resolve)}
    },{ //蛋糕详情
    	 name: 'merOrderDetail',
       path:'/merOrderDetail',
       component: resolve => {require(['src/views/order/merOrderDetail.vue'], resolve)}
    },
	    //收入模块
	    {
	   	//收入首页
      name: 'incomeIndex',
      path:'/incomeIndex',
      component: resolve => {require(['src/views/income/incomeIndex.vue'], resolve)}
   },{//收支明细
      name: 'tradeList',
      path:'/tradeList',
      component: resolve => {require(['src/views/income/tradeList.vue'], resolve)}
   },{//提现
      name: 'tiXian',
      path:'/tiXian',
      component: resolve => {require(['src/views/income/tiXian.vue'], resolve)}
   }, {//提现方式
      name: 'tiXianWay',
      path:'/tiXianWay',
      component: resolve => {require(['src/views/income/tiXianWay.vue'], resolve)}
   },,{//添加银行卡
      name: 'addBankCard',
      path:'/addBankCard',
      component: resolve => {require(['src/views/income/addBankCard.vue'], resolve)}
   },{//重置支付密码
      name: 'resetPayPassword',
      path:'/resetPayPassword',
      component: resolve => {require(['src/views/income/resetPayPassword.vue'], resolve)}
   },
   
   //活动模块
   {  //活动首页
      name: 'activitiesIndex',
      path:'/activitiesIndex',
      component: resolve => {require(['src/views/activities/activitiesIndex.vue'], resolve)}
   },
   { //限时抢购
      name: 'flashSale',
      path:'/flashSale',
      component: resolve => {require(['src/views/activities/flashSale.vue'], resolve)}
   },
   {//选择折扣商品
      name: 'selectDiscountGoods',
      path:'/selectDiscountGoods',
      component: resolve => {require(['src/views/activities/selectDiscountGoods.vue'], resolve)}
   },
   { //设置折扣商品属性
      name: 'setDiscount',
      path:'/setDiscount',
      component: resolve => {require(['src/views/activities/setDiscount.vue'], resolve)}
   },
   //统计模块
   {//统计
      name: 'statistics',
      path:'/statistics',
      component: resolve => {require(['src/views/pages/statistics.vue'], resolve)}
   },
   
   //设置模块
   {//设置页面
      name: 'setting',
      path:'/setting',
      component: resolve => {require(['src/views/goodsPages/setting.vue'], resolve)}
   },{  //个人资料
      name: 'setPersonalData',
      path:'/setPersonalData',
      component: resolve => {require(['src/views/goodsPages/setPersonalData.vue'], resolve)}
   },{  //修改密码
      name: 'editorPassWord',
      path:'/editorPassWord',
      component: resolve => {require(['src/views/goodsPages/editorPassWord.vue'], resolve)}
   },{//运费设置
      name: 'yunFeiSetting',
      path:'/yunFeiSetting',
      component: resolve => {require(['src/views/goodsPages/yunFeiSetting.vue'], resolve)}
   },
   
   //帖子模块
  {
      name: 'activityPublish',
      path:'/activityPublish',
      component: resolve => { require(['src/views/consumption/activity/activityItem/activityPublish.vue'], resolve)}
    },
    {
      name: 'activityOrder',
      path:'/activityOrder',
      component: resolve => { require(['src/views/consumption/activity/activityItem/activityOrder.vue'], resolve)}
    },
    {
      name: 'activityPreview',
      path:'/activityPreview',
      component: resolve => { require(['src/views/consumption/activity/activityItem/activityPreview.vue'], resolve)}
    },
    {
      name: 'activityEnlist',
      path:'/activityEnlist',
      component: resolve => { require(['src/views/consumption/activity/activityItem/activityEnlist.vue'], resolve)}
    },
    {
      name: 'costSetting',
      path:'/costSetting',
      component: resolve => { require(['src/views/consumption/activity/activityItem/activityComment/costSetting.vue'], resolve)}
    },
    {
      name: 'enlistSetting',
      path:'/enlistSetting',
      component: resolve => { require(['src/views/consumption/activity/activityItem/activityComment/enlistSetting.vue'], resolve)}
    },
    {
      name: 'activityTab',
      path:'/activityTab',
      component: resolve => { require(['src/views/consumption/activity/activityItem/activityTab.vue'], resolve)}
    },
    {
      name: 'activityType',
      path:'/activityType',
      component: resolve => { require(['src/views/consumption/activity/activityItem/activityType.vue'], resolve)}
    },
    {
      name: 'activityDetail',
      path:'/activityDetail',
      component: resolve => { require(['src/views/consumption/activity/activityEnroll/activityDetail.vue'], resolve)}
    },
    {
      name: 'activityRelease',
      path:'/activityRelease',
      component: resolve => { require(['src/views/consumption/activity/activityEnroll/activityRelease.vue'], resolve)}
    },
    {
      name: 'activityEnroll',
      path:'/activityEnroll',
      component: resolve => { require(['src/views/consumption/activity/activityEnroll/activityEnroll.vue'], resolve)}
    },
    {
      name: 'activityEnrollList',
      path:'/activityEnrollList',
      component: resolve => { require(['src/views/consumption/activity/activityEnroll/activityEnrollList.vue'], resolve)}
    },
    {
      name: 'activityToJoin',
      path:'/activityToJoin',
      component: resolve => { require(['src/views/consumption/activity/activityEnroll/activityToJoin.vue'], resolve)}
    },
    {
      name: 'activityBountyList',
      path:'/activityBountyList',
      component: resolve => { require(['src/views/consumption/activity/activityEnroll/activityBountyList.vue'], resolve)}
    },
    {
      name: 'myActivities',
      path:'/myActivities',
      component: resolve => { require(['src/views/consumption/activity/myActivity/myActivities.vue'], resolve)}
    },
    {
      name: 'activityIndex',
      path:'/activityIndex',
      meta: {allowBack: false},
      component: resolve => { require(['src/views/consumption/activity/activityIndex/activityIndex.vue'], resolve)}
    },
    {
      name: 'activityIndexList',
      path:'/activityIndexList',
      component: resolve => { require(['src/views/consumption/activity/activityIndex/activityIndexList.vue'], resolve)}
    },
    //邀请好友
    {
    	name: 'tuiguang',
      path:'/tuiguang',
      component: resolve => { require(['src/views/tuiguang/tuiguang.vue'], resolve)}
    },{
    		name: 'record',
	      path:'/record',
	      component: resolve => { require(['src/views/tuiguang/record.vue'], resolve)}
    }
  ]
})
