/*
 * @Descripttion:
 * @version:
 * @Author: cholee
 * @Date: 2020-08-25 17:21:00
 * @LastEditors: cholee
 * @LastEditTime: 2020-08-26 10:19:24
 */
const path = require("path");
// const { resolve } = require('./webpack.until.js')
module.exports = {
  // 主要用于移动端的rem适配
  // px2rem:{
  //   remUni:100,
  //   remPrecision: 6
  // },
  dev: {
    assetsPublicPath: "/", // 资源公共路径
    port: 8093,
    proxy: [
      // 代理
      {
        context: ["/api", "/comapi"],
        target: "http://120.24.175.113:6662",
        changeOrigin: true,
      },
    ],
  },
  build: {
    buildSubDirectory: "dist", // 打包输出位置
    assetsPublicPath: "./", // 也可是cdn地址
    assetsSubDirectory: "static", // 打包后资源路径
    productionSourceMap: false, // 打包生成sourceMap
  },
};
