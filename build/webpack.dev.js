var webpackCommon = require("./webpack.common.js");
const merge = require("webpack-merge");//node合并函数，将多个对象合并成一个
const { styleLoader } = require("./webpack.until.js");
const cfg = require("./webpack.cfg.js");
module.exports = (env, argv) => {
  return merge(webpackCommon(env, argv), {
    mode: "development", // 当mode值为'production'时，webpack-dev-server 变动刷新反应很慢
    devtool: "cheap-module-eval-source-map", //映射关系，定位错误信息。cheap(低开销)，映射到原始源代码（仅限行）
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          use: ["style-loader"].concat(styleLoader),
        },
      ],
    },
    //开发中的server
    devServer: {
      hot: true, //配置是否启用模块的热替换功能
      open: true, //是否启用默认浏览器打开网页
      port: cfg.dev.port, //指定要监听请求的端口号
      host: "localhost", //指定主机,可以是ip
      openPage: "/", //指定打开浏览器时导航到的页面
      proxy: cfg.dev.proxy, //代理设置，处理本地跨域
      overlay: {//是否提示编译出错。默认false，可配置显示警告和错误信息
        warnings: true,
        errors: true,
      }, 
      stats: "", //控制编译的时候shell上输出的内容，不配置答应全部信息.errors-only只打印错误信息。详见http://www.mamicode.com/info-detail-2709301.html
    },
  });
};
