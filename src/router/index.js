/*
 * @Descripttion:
 * @version:
 * @Author: cholee
 * @Date: 2020-08-25 17:21:03
 * @LastEditors: cholee
 * @LastEditTime: 2020-08-26 10:40:54
 */
/**
 * 路由
 */
import Vue from "vue";
import VueRouter from "vue-router";
import { message } from "ant-design-vue";

Vue.use(VueRouter);

// 解决路由跳转同一个报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  // mode: 'history',  //使用history模式、去掉url中的#
  routes: [
    {
      path: "/index",
      component: () => import("@/view/index/index.vue"),
      hidden: true,
      children: [],
    },
  ],
});
export default router;
