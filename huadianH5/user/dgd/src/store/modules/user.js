import * as type from '../type'
/**
 * App通用配置
 */

const state = {
	//发布类型列表
	actylelist: [],
	//预览
	Preview: [],
	//报名
	enroll: null,
	//详情
	acdetail: [],
	//弹出评论
	commentPush: null,
	//评论列表
	commentlist: [],
	//商品列表
	goodslist: null,
	//我的卖出：订单列表
	sellerOrders: [],
	//订单详情
	orderDetail: {},
	//物流信息
	logisticsInfo: {},
	//报名列表
    enrolllist: {},
}

const actions = {
	//发布类型列表
    setActylelist({commit},str){
    	commit(type.SET_AC_TYPE_LIST,str);
    },
	//预览
    setPreview({commit},str){
    	commit(type.SET_PREVIEW,str);
    },
    //报名
    setEnroll({commit},str){
    	commit(type.SET_ENROLL,str);
    },
    //详情
    setAcdetail({commit},str){
    	commit(type.SET_ACDETAIL,str);
    },
    //评论框弹出
    setCommentPush({commit},str){
    	commit(type.SET_COMMENT_PUSH,str);
    },
    //评论列表
    setCommentList({commit},str){
    	commit(type.SET_COMMENT_LIST,str);
    },
	//商品列表
    setGoodsList({commit},str){
    	commit(type.SET_GOODS_LIST,str);
    },
    //我的卖出：订单列表
    setSellerOrders({commit},str){
    	commit(type.SET_SELLER_ORDERS,str);
    },
    //订单详情
    setOrderDetail({commit},str){
    	commit(type.SET_ORDER_DETAIL,str);
    },
    //物流信息
    setlogisticsInfo({commit},str){
    	commit(type.SET_LOGISTICS_INFO,str);
    },
    //报名列表
    setEnrolllist({commit},str){
    	commit(type.SET_ENROLL_LIST,str);
    },
}

const getters = {
	//发布类型列表
    getActylelist: state=>state.actylelist,
	//预览
    getPreview: state=>state.Preview,
    //报名
    getEnroll: state=>state.enroll,
    //详情
    getAcdetail: state=>state.acdetail,
    //弹出评论
    getCommentPush: state=>state.commentPush,
    //评论列表
    getCommentList: state=>state.commentlist,
    //商品列表
    getGoodsList: state=>state.goodslist,
    //我的卖出：订单列表
    getSellerOrders: state=>state.sellerOrders,
    //订单详情
    getOrderDetail: state=>state.orderDetail,
    //物流信息
    getlogisticsInfo: state=>state.logisticsInfo,
    //报名列表
    getEnrolllist: state=>state.enrolllist,
}


const mutations = {
    //发布类型列表
    [type.SET_AC_TYPE_LIST](state,str){
    	state.actylelist = str;
    },
    //预览
    [type.SET_PREVIEW](state,str){
    	state.Preview = str;
    },
    //报名
    [type.SET_ENROLL](state,str){
    	state.enroll = str;
    },
    //详情
    [type.SET_ACDETAIL](state,str){
    	state.acdetail = str;
    },
    //弹出评论
    [type.SET_COMMENT_PUSH](state,str){
    	state.commentPush = str;
    },
    //评论列表
    [type.SET_COMMENT_LIST](state,str){
    	state.commentlist = str;
    },
    //商品列表
    [type.SET_GOODS_LIST](state,str){
    	state.goodslist = str;
    },
    //我的卖出：订单列表
    [type.SET_SELLER_ORDERS](state,str){
    	state.sellerOrders = str;
    },
    //订单详情
    [type.SET_ORDER_DETAIL](state,str){
    	state.orderDetail = str;
    },
    //物流信息
    [type.SET_LOGISTICS_INFO](state,str){
    	state.logisticsInfo = str;
    },
    //报名列表
    [type.SET_ENROLL_LIST](state,str){
    	state.enrolllist = str;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}