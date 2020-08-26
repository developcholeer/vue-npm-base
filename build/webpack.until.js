/**
 * 自动生成文件路径
 */
const path = require('path')
const resolve = function (_path) {
  return  path.resolve(path.resolve( __dirname, '../'), _path)
}
const cfg = require('./webpack.cfg')

let until = {
  resolve,
  // 样式文件配置
  styleLoader: [
    'css-loader?sourceMap', // 将 CSS 转化成 CommonJS 模块
    // 'vue-style-loader',// 用于处理vue文件中的style标签
    // 添加浏览器前缀
    'postcss-loader?sourceMap'].concat(
      cfg.px2rem ? {
        loader: 'px2rem-loader',
        options: cfg.px2rem
      } : [],
      {
        loader: 'sass-loader',
      }
    )
}


module.exports = until

