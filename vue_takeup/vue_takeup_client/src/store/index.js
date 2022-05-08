//引入vuex
import Vue from 'vue'
import Vuex from 'vuex'
//引入配置项
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

//使用vuex插件
Vue.use(Vuex)


export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
})