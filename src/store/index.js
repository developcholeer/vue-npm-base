/*
 * @Descripttion: 
 * @version: 
 * @Author: cholee
 * @Date: 2020-08-25 17:21:03
 * @LastEditors: cholee
 * @LastEditTime: 2020-08-26 10:16:43
 */
/**
 * 
 */

import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
// import getters from './getters'
// import createLogger from 'vuex/dist/logger'// vuex日志打印
Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [createLogger()],
  modules: {
    app
  },
//   getters
})
export default store