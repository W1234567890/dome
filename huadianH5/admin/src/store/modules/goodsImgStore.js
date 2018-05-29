import * as type from '../type'
import api from 'src/mixins/api'

/**
 * App通用配置
 */
//报名相关
const state = {
	goodsImg:{},
	imgCache:{},
	storeSate:{
		guige:'请选择',
		leimu:'请选择',
		yunfei:'请选择',
		fpName:'请选择',
	},
	goodsStandard:[],
	classify:{},
}

const actions = {
   goodsImg({ commit },obj) {
    	commit(type.GET_GOODS_IMG,obj)
   },
   imgCache({ commit },obj) {
    	commit(type.GET_IMG_CACHE,obj)
   },
   storeSate({ commit },obj) {
    	commit(type.GET_STORE_STATE,obj)
   },
   goodsStandard({ commit },obj) {
    	commit(type.GET_GOODS_STANDARD,obj)
   },
   classify({ commit },obj) {
    	commit(type.GET_CLASSIFY,obj)
   },
}

const getters = {
	goodsImg:state=>state.goodsImg,
	imgCache:state=>state.imgCache,
	storeSate:state=>state.storeSate,
	goodsStandard:state=>state.goodsStandard,
	classify:state=>state.classify,
}


const mutations = {
	[type.GET_GOODS_IMG](state,obj) {
        state.goodsImg =obj
   },
   [type.GET_IMG_CACHE](state,obj) {
        state.imgCache =obj
   },
   [type.GET_STORE_STATE](state,obj) {
        state.storeSate =obj
   },
   [type.GET_GOODS_STANDARD](state,obj) {
        state.goodsStandard =obj
   },
    [type.GET_CLASSIFY](state,obj) {
        state.classify =obj
   },
}


export default {
    state,
    actions,
    getters,
    mutations
}