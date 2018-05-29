import * as type from '../type'
import config from 'src/config/im.js'
/**
 * App通用配置
 */

const state = {
    cryptojsAESKey: null,
    defaultTimer: {},
    defaultTimerKey: null,
    timestamp: null,
    refresh: null,
    PlatformList: null,
    BusinessList: null,
    SelectPoster: null,
    UserPosters: null,
    ActivityMyList: null,
    ActivityList: null,
    listCard: null,
    reply_value: null,
    ActivityOrder: null,
    ActivityArr: null,
    AddBoxArr: [],
    
    ActivityDetail:null,
    EnrollList: null,
    ActivityCommentList: null,
    ActivityRewardDetailList:null,
    ActivityGoodActGoods: null,
    toComment: null,
    ActivityEnlist: null,
    
    ActivityTypeList: null,
    
    ActivityHomeIndex: null,
    
    loginRefresh: null,
    
    focuslist: null,
}

const actions = {
    getCryptojsAESKey({ commit }, res) {
    	commit(type.GET_CRYPTOJS_AES_KEY, res);
    },
    setDefaultTimer({ commit }, res) {
    	commit(type.SET_DEFAULT_TIMER, res);
    },
    setDefaultTimerKey({ commit }, res) {
    	commit(type.SET_DEFAULT_TIMER_KEY, res);
    },
    setRefresh({ commit}, res) {
    	locache.set('refresh',res);
    	commit(type.SET_REFRESH, res);
    },
    setPlatformList({ commit}, res) {
    	locache.set('PlatformList',res);
    	commit(type.SET_PLAT_FORM_LIST, res);
    },
    setBusinessList({ commit}, res) {
    	locache.set('BusinessList',res);
    	commit(type.SET_BUSINESS_LIST, res);
    },
    setSelectPoster({ commit}, res){
    	locache.set('SelectPoster',res);
    	commit(type.SET_SELECT_POSTER, res);
    },
    setUserPosters({ commit}, res){
    	locache.set('UserPosters',res);
    	commit(type.SET_USER_POSTERS, res);
    },
    setActivityMyList({ commit}, res){
    	locache.set('ActivityMyList',res);
    	commit(type.SET_ACTIVITY_MY_LIST, res);
    },
    setActivityList({ commit}, res){
    	locache.set('ActivityList',res);
    	commit(type.SET_ACTIVITY_LIST, res);
    },
    setListCard({ commit}, res){
    	locache.set('listCard',res);
    	commit(type.SET_LIST_CARD, res);
    },
    setReplyValue({commit},str){
    	commit(type.SET_REPLY_VALUE,str)
    },
    setActivityOrder({commit},str){
    	commit(type.SET_ACTIVITY_ORDER,str)
    },
    setActivityArr({commit},str){
    	commit(type.SET_ACTIVITY_ARR,str)
    },
    setAddBoxArr({commit},str){
    	commit(type.SET_ADD_BOX_ARR,str)
    },
    setActivityDetail({commit},str){
    	commit(type.SET_ACTIVITY_DETAIL,str)
    },
    setEnrollList({commit},str){
    	commit(type.SET_ENROLL_LIST,str)
    },
    setActivityCommentList({commit},str){
    	commit(type.SET_ACTIVITY_COMMENT_LIST,str)
    },
    setActivityRewardDetailList({commit},str){
    	commit(type.SET_ACTIVITY_REWARD_DETAIL_LIST,str)
    },
    setActivityGoodActGoods({commit},str){
    	commit(type.SET_ACTIVITY_GOODACT_GOODS,str)
    },
    setActivityEnlist({commit},str){
    	commit(type.SET_ACTIVITY_ENLIST,str)
    },
    setToComment({commit},str){
    	commit(type.SET_TO_COMMENT,str)
    },
    
    
    setActivityTypeList({commit},str){
    	locache.set('ActivityTypeList',str);
    	commit(type.SET_ACTIVITY_TYPE_LIST,str)
    },
    
    setActivityHomeIndex({commit},str){
    	locache.set('ActivityHomeIndex',str);
    	commit(type.SET_ACTIVITY_HOME_INDEX,str);
    },
    
    setloginRefresh({commit},str){
    	locache.set('loginRefresh',str);
    	commit(type.SET_LOGIN_REFRESH,str);
    },
    
    setfocuslist({commit},str){
    	commit(type.SET_FOCUSLIST,str);
    },
}

const getters = {
	getCryptojsAESKey: state => state.cryptojsAESKey,
	getDefaultTimer: state => {
		if(state.defaultTimer && state.defaultTimerKey){
			return state.timestamp;
		}
	},
	getDefaultTimerKey: state => state.defaultTimerKey,
	getRefresh: state => state.refresh || locache.get('refresh'),
	getPlatformList: state => state.PlatformList || locache.get('PlatformList'),
	getBusinessList: state => state.BusinessList || locache.get('BusinessList'),
	getSelectPoster: state => state.SelectPoster || locache.get('SelectPoster'),
	getUserPosters: state => state.UserPosters || locache.get('UserPosters'),
	getActivityMyList: state => state.ActivityMyList || locache.get('ActivityMyList'),
	getActivityList: state => {
		let list = state.ActivityList || locache.get('ActivityList');
		list && list[0].list.sort(function(a,b){
		    return b.createDate - a.createDate;
		})
		return list;
	},
	getListCard: state => state.listCard || locache.get('listCard'),
	getReplyValue: state => state.reply_value,
	getActivityOrder: state => state.ActivityOrder,
	getActivityArr: state => state.ActivityArr,
	getAddBoxArr: state => state.AddBoxArr,
	getActivityDetail: state => state.ActivityDetail,
	getEnrollList: state => state.EnrollList,
	getActivityCommentList: state => state.ActivityCommentList,
	getActivityRewardDetailList: state => state.ActivityRewardDetailList,
	getActivityGoodActGoods: state => state.ActivityGoodActGoods,
	getActivityEnlist: state => state.ActivityEnlist,
	getToComment: state => state.toComment,
	
	
	getActivityTypeList: state => state.ActivityTypeList || locache.get('ActivityTypeList'),
	
	getActivityHomeIndex: state => state.ActivityHomeIndex || locache.get('ActivityHomeIndex'),
	
	getloginRefresh: state => state.loginRefresh || locache.get('loginRefresh'),
	
	getfocuslist: state=>state.focuslist,
}


const mutations = {
    [type.GET_CRYPTOJS_AES_KEY](state, res) {
        state.cryptojsAESKey = {
        	key : CryptoJS.enc.Utf8.parse('pengji20172017~!'),
        	iv :  CryptoJS.enc.Utf8.parse('0126039201260300')
        };
    },
    [type.SET_DEFAULT_TIMER](state, res) {
    	if(state.defaultTimerKey){
    		if(state.defaultTimer[state.defaultTimerKey]){
    			/*for(var i in state.defaultTimer[state.defaultTimerKey]){
					if(i in res){
						console.info(res[i],state.defaultTimer[state.defaultTimerKey][i])
						state.defaultTimer[state.defaultTimerKey][i] = res[i];
					}else{
						for(var b in res){
							state.defaultTimer[state.defaultTimerKey][b] = res[b];
						}
					}
				}*/
				let timer = state.defaultTimer,key = state.defaultTimerKey;
				let timestamp = timer[key].mintimer +(timer[key].timer - parseInt((new Date().getTime())/1000));
				state.timestamp = timestamp;
    		}else{
    			state.defaultTimer[state.defaultTimerKey] = res;
    			locache.set('defaultTimer',state.defaultTimer);
    		}
    		
    	}
    },
    [type.SET_DEFAULT_TIMER_KEY](state, res) {
        state.defaultTimerKey = res;
    },
    [type.SET_REFRESH](state, res) {
        state.refresh = res;
    },
    [type.SET_PLAT_FORM_LIST](state, res) {
        state.PlatformList = res;
    },
    [type.SET_BUSINESS_LIST](state, res) {
        state.BusinessList = res;
    },
    [type.SET_SELECT_POSTER](state, res) {
        state.SelectPoster = res;
    },
    [type.SET_USER_POSTERS](state, res) {
        state.UserPosters = res;
    },
    [type.SET_ACTIVITY_MY_LIST](state, res) {
        state.ActivityMyList = res;
    },
    [type.SET_ACTIVITY_LIST](state, res) {
        state.ActivityList = res;
    },
    [type.SET_LIST_CARD](state, res) {
        state.listCard = res;
    },
    [type.SET_REPLY_VALUE](state,str){
    	state.reply_value = str;
    },
    [type.SET_ACTIVITY_ORDER](state,str){
    	state.ActivityOrder = str;
    },
    [type.SET_ACTIVITY_ARR](state,str){
    	state.ActivityArr = str;
    },
    [type.SET_ADD_BOX_ARR](state,str){
    	state.AddBoxArr = str;
    },
    [type.SET_ACTIVITY_DETAIL](state,str){
    	state.ActivityDetail = str;
    },
    [type.SET_ENROLL_LIST](state,str){
    	state.EnrollList = str;
    },
    [type.SET_ACTIVITY_COMMENT_LIST](state,str){
    	state.ActivityCommentList = str;
    },
    [type.SET_TO_COMMENT](state,str){
    	state.toComment = str;
    },
    [type.SET_ACTIVITY_REWARD_DETAIL_LIST](state,str){
    	state.ActivityRewardDetailList = str;
    },
    [type.SET_ACTIVITY_GOODACT_GOODS](state,str){
    	state.ActivityGoodActGoods = str;
    },
    [type.SET_ACTIVITY_ENLIST](state,str){
    	state.ActivityEnlist = str;
    },
    [type.SET_ACTIVITY_TYPE_LIST](state,str){
    	state.ActivityTypeList = str;
    },
    
    [type.SET_ACTIVITY_HOME_INDEX](state,str){
    	state.ActivityHomeIndex = str;
    },
    
    [type.SET_LOGIN_REFRESH](state,str){
    	state.loginRefresh = str;
    },
    [type.SET_FOCUSLIST](state,str){
    	state.focuslist = str;
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}