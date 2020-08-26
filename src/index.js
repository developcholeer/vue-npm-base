/*
 * @Descripttion: 
 * @version: 
 * @Author: cholee
 * @Date: 2020-08-25 17:21:00
 * @LastEditors: cholee
 * @LastEditTime: 2020-08-26 10:34:06
 */
/**
 * @author lichao
 * @version 1.0.0
 * @description 用于初始化vue的
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router/index';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

import ECharts from 'echarts';
Vue.prototype.$echarts = ECharts;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,
  router
})
