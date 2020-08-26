/*
 * @Descripttion: 
 * @version: 
 * @Author: cholee
 * @Date: 2020-08-25 17:21:00
 * @LastEditors: cholee
 * @LastEditTime: 2020-08-26 10:31:37
 */

const webpackCommon = require("./webpack.common.js");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const cfg = require("./webpack.cfg.js");
const { resolve, styleLoader } = require("./webpack.until.js");
module.exports = (env, argv) => {
  return merge(webpackCommon(env, argv), {
    mode: "production", // 当mode值为'production'时，webpack-dev-server 变动刷新反应很慢
    devtool: cfg.build.productionSourceMap ? "#source-map" : undefined, //此选项控制是否生成，以及如何生成 source map
    module: {
      rules: [
        // 配置style文件加载器
        {
          test: /\.(css|scss|sass)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: styleLoader,
            publicPath: "../../",
          }),
        },
      ],
    },
    plugins: [
      //清除打包文件夹
      new CleanWebpackPlugin(),
      // 拷贝静态文件
      new CopyWebpackPlugin([
        {
          from: resolve(cfg.build.assetsSubDirectory), //定义要拷贝的源文件'../static'
          to: cfg.build.assetsSubDirectory, //定义要拷贝到的目标文件夹'static'
          ignore: [".*"], //模糊匹配
        },
      ]),
      // 抽取css样式，防止将样式打包在js中引起页面样式加载错乱的现象。
      new ExtractTextPlugin({
        // css文件输出位置
        filename: `${
          cfg.build.assetsSubDirectory
        }/css/[name].[md5:contenthash:hex:20].css`, //[name].[md5:contenthash:hex:20]动态多个文件名
      }),
      // 代码压缩
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
          },
        },
        sourceMap: cfg.build.productionSourceMap, //cheap-source-map时为false
        parallel: true, //是否多进程并行运行(提高构建速度)
      }),
    ],
    //优化项 js代码拆分
    /**
     * webpack中实现代码分割的两种方式：
     * 1.同步代码：只需要在webpack配置文件总做optimization的配置即可
     * 2.异步代码(import)：异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中
     */
    optimization: {
      runtimeChunk: {
        name: "manifest",
      },
      splitChunks: {
        minSize: 20000, // 超过20k才会被打包
        cacheGroups: {
          //缓存组，将所有加载模块放在缓存里面一起分割打包
          // node_modules中的代码单独打包
          vendor: {
            //自定义打包模块
            name: "vendor", //打包的chunks的名字
            test: /[\\/]node_modules[\\/]/,
            chunks: "all", //async异步代码分割，initial同步代码分割，all同步异步分割都开启
            minChunks: 1, //模块至少使用次数
          },
          // 模块被使用超过两次就单独打包
          commons: {
            name: "commons",
            chunks: "all",
            minChunks: 2,
          },
        },
      },
    },
  });
};
