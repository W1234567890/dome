import * as type from '../type'
import api from 'src/mixins/api'

/**
 * App通用配置
 */
const state = {
    cryptojsAESKey: null,
    defaultTimer: {},
    defaultTimerKey: null,
    timestamp: null,
    refresh: null,
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
    }
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
}

export default {
    state,
    actions,
    getters,
    mutations
}