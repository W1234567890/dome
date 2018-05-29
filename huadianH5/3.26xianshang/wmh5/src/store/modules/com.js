import * as type from '../type'

/**
 * App通用配置
 */
const state = {
    loading: false,
    showToast: false,
    leftNavStatus: false,
    showSuccess: true,
	showFail: false,
    toastMsg: '操作成功',
    showTimePicker: false,
    alertMsg: '退出登录',
    timer: null,
    browser:false,  //是否在浏览器中
    title:null,     //标题
    showTitle:false,  //标题是否显示
    XToken:null,
    backInfo: false, 
    appSetting: true,
    isMaxPage: false,
    isSlidesTop: false,
    isSlidesBottom: false,
    
    routerScroll: [],//滑动历史
}

const actions = {
    setLoadingState({ commit }, status) {
        commit(type.COM_LOADING_STATUS, status)
    },
    setNavState({ commit }, status) {
        commit(type.COM_NAV_STATUS, status)
    },
    showToast({ commit }, status) {
        commit(type.COM_SHOW_TOAST, status)
    },
    showSuccess({ commit }, status) {
        commit(type.COM_SHOW_SUCCESS, status)
    },
    showFail({ commit }, status) {
        commit(type.COM_SHOW_FAIL, status)
    },
    toastMsg({ commit }, str) {
        commit(type.COM_TOAST_MSG, str)
    },
    showTimePicker({ commit }, status) {
        commit(type.COM_SHOW_TIME_PICKER, status)
    },
    timer({ commit }, str) {
        commit(type.COM_SELECT_TIMER, str)
    },
    browser({commit},str){
    	commit(type.COM_IN_BROWER,str)
    },
    title({commit},str){
    	commit(type.COM_PAGE_TITLE,str)
    },
    showTitle({commit},str){
    	commit(type.COM_SHOW_TITLE,str)
    },
    setXToken({commit},str){
    	locache.set('XToken',str);
    	commit(type.COM_SELECT_TOKEN,str)
    },
    setBackInfo({commit},str){
    	commit(type.COM_GET_BACK_INFO,str)
    },
    updateAppSetting({commit},str){
    	commit(type.COM_UPDATE_APP_SETTING,str)
    },
    isMaxPage({commit},str){
    	commit(type.IS_MAX_PAGE,str)
    },
	isSlidesTop({commit},str){
    	commit(type.IS_SLIDES_TOP,str)
    },
    isSlidesBottom({commit},str){
    	commit(type.IS_SLIDES_BOTTOM,str)
    },
    setRouterScroll({commit},str){
    	commit(type.SET_ROUTER_SCROLL,str)
    }
}

const getters = {
    loading: state => state.loading,
    showToast: state => state.showToast,
    timer: state => state.timer,
    browser:state=>state.browser,
    title:state=>state.title,
    showTitle:state=>state.showTitle,
    getXToken:state=>state.XToken || locache.get('XToken'),
    getBackInfo:state=>state.backInfo,
    getAppSetting:state=>state.appSetting,
    isMaxPage: state=>state.isMaxPage,
    isSlidesTop: state=>state.isSlidesTop,
    isSlidesBottom: state=>state.isSlidesBottom,
    getRouterScroll: state=>state.routerScroll,
}


const mutations = {
    [type.COM_LOADING_STATUS](state, status) {
        state.loading = status;
    },

    [type.COM_SHOW_TOAST](state, status) {
        state.showToast = status;
    },

    [type.COM_SHOW_SUCCESS](state, status) {
        state.showSuccess = status;
    },

    [type.COM_SHOW_FAIL](state, status) {
        state.showFail = status;
    },

    [type.COM_TOAST_MSG](state, str) {
        state.toastMsg = str;
    },

    [type.COM_NAV_STATUS](state, status) {
        state.leftNavStatus = status;
    },

    [type.COM_SHOW_TIME_PICKER](state, status) {
        state.showTimePicker = status;
    },
    
    [type.COM_SELECT_TIMER](state, str) {
        state.timer = str;
    },
    [type.COM_SELECT_TOKEN](state, str) {
    	state.XToken = str;
    },
    [type.COM_IN_BROWER](state,str){
    	state.browser=str;
    },
    [type.COM_PAGE_TITLE](state,str){
    	state.title=str;
    },
    [type.COM_SHOW_TITLE](state,str){
    	state.showTitle=str;
    },
    [type.COM_GET_BACK_INFO](state,str){
    	window.backInfo = str;
    	state.backInfo = str;
    },
    [type.COM_UPDATE_APP_SETTING](state,str){
    	state.appSetting = str;
    },
    [type.IS_MAX_PAGE](state,str){
    	state.isMaxPage = str;
    },
    [type.IS_SLIDES_TOP](state,str){
    	state.isSlidesTop = str;
    },
    [type.IS_SLIDES_BOTTOM](state,str){
    	state.isSlidesBottom = str;
    },
    [type.SET_ROUTER_SCROLL](state,str){
    	state.routerScroll = str;
    },
    
}


export default {
    state,
    actions,
    getters,
    mutations
}