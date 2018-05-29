import * as type from '../type'

/**
 * App通用配置
 */
const state = {
    isMaxPage: false,//是否是最大的页数
    routerScroll: [],//滑动历史
    
    shareShow: false,//是否弹出分享
    
    allComment: false,//是否显示全部评论
    
    confirm: false,//confirm
    
    prompt: false,//prompt
    
    _navbar_: {//导航栏
    	navbar: false,
		isBack: false,
		isBtn: null,
		title: null,
    },
}

const actions = {
	//是否是最大的页数
    isMaxPage({commit},str){
    	commit(type.IS_MAX_PAGE,str)
    },
    //滑动历史
    setRouterScroll({commit},str){
    	commit(type.SET_ROUTER_SCROLL,str)
    },
    //是否弹出分享
    setShare({commit},str){
    	commit(type.SET_SHARE,str)
    },
    //是否显示全部评论
    setAllComment({commit},str){
    	commit(type.SET_ALL_COMMENT,str)
    },
    //是否显示confirm
    setConfirm({commit},str){
    	commit(type.SET_CONFIRM,str)
    },
    //是否显示prompt
    setPrompt({commit},str){
    	commit(type.SET_PROMPT,str)
    },
    //导航栏
    setNavbar({commit},str){
    	commit(type.SET_NAVBAR,str)
    },
}

const getters = {
	//是否是最大的页数
    isMaxPage: state=>state.isMaxPage,
    //滑动历史
    getRouterScroll: state=>state.routerScroll,
    //是否弹出分享
    getShare: state=>state.shareShow,
    //是否显示全部评论
    getAllComment: state=>state.allComment,
    //是否显示confirm
    getConfirm: state=>state.confirm,
    //是否显示prompt
    getPrompt: state=>state.prompt,
    //是否显示prompt
    getNavbar: state=>state._navbar_,
}

const mutations = {
	//是否是最大的页数
    [type.IS_MAX_PAGE](state,str){
    	state.isMaxPage = str;
    },
    //滑动历史
    [type.SET_ROUTER_SCROLL](state,str){
    	state.routerScroll = str;
    },
    //是否弹出分享
    [type.SET_SHARE](state,str){
    	state.shareShow = str;
    },
    //是否显示全部评论
    [type.SET_ALL_COMMENT](state,str){
    	state.allComment = str;
    },
    //是否显示confirm
    [type.SET_CONFIRM](state,str){
    	state.confirm = str;
    },
    //是否显示prompt
    [type.SET_PROMPT](state,str){
    	state.prompt = str;
    },
    //导航栏
    [type.SET_NAVBAR](state,str){
    	state._navbar_ = str;
    },
}


export default {
    state,
    actions,
    getters,
    mutations
}