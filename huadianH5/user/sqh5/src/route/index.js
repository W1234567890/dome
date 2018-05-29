import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use( VueRouter);
//公共方法 禁止修改
export default new VueRouter({
  //mode:'history',
  mode:'hash',
	base:'/dist/',
  routes: [
  		{
	      path: '/',
	      redirect: '/activityIndex'
			},
			{ 
	      name: 'notfound',
	      path:'*',
	      component: resolve => { require(['src/views/other/notfound.vue'], resolve)}
	  	},
	  	{
	  		name: 'index',
	      path:'/index',
	      component: resolve => { require(['src/views/index/index.vue'], resolve)}
	  	},
	  	{
	  		name: 'home',
	      path:'/home',
	      component: resolve => { require(['src/views/index/home.vue'], resolve)}
	  	},
	    {
	      name: 'lazy',
	      path:'/lazy',
	      component: resolve => { require(['src/views/other/lazy.vue'], resolve)}
	    },
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
  ]
})