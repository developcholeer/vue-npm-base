const webpack = require("webpack");//导入webpack
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { resolve } = require("./webpack.until.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const cfg = require("./webpack.cfg.js");
module.exports = (env, argv) => {
  return {
    // js入口
    entry: {
      main: resolve("src/index.js"),
    },
    //映射关系
    //devtool: '映射关系，定位错误信息',//此选项控制是否生成，以及如何生成,适用生产环境，件dev.js。https://www.webpackjs.com/configuration/devtool/
    //设置模块如何解析
    resolve: {
      //导入的时候不用写拓展名
      extensions: [".js", ".vue", ".json", ".ts"], //import Button from '@/components/Button'
      //通过别名把原导入路径映射成一个新的导入路径
      alias: {
        vue$: "vue/dist/vue.esm.js", //精准匹配
        "@": resolve("src"), //import Button from '../../components/Button' => import Button from '@/components/Button'
        // components: './src/components/',//import Button from './src/components/button' => import Button from 'components/button'
      },
    },
    // 打包输出位置
    output: {
      path: resolve(cfg.build.buildSubDirectory), //所有输出文件的目标路径,必须是一个绝对路径
      filename: `${cfg.build.assetsSubDirectory}/js/[name].[hash].js`, //输出文件名，[name]模块名称,[chunkhash]chunk内容的hash
      // chunkFilename: `${cfg.build.assetsSubDirectory}/js/[name].[chunkhash].js`,
      // 图片、文件资源公共路径，路径相对于html
      publicPath:
        argv.mode === "production"
          ? cfg.build.assetsPublicPath
          : cfg.dev.assetsPublicPath,
    },
    //配置如何处理模块
    module: {
      //配置模块的读取和解析规则,数组
      rules: [
        {
          test: /\.js$/, //条件匹配，配置js文件
          exclude: /(node_modules|bower_components)/, //排除特定条件，排除node_modules下的js文件
          use: {
            loader: "babel-loader", //laoder名称
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader", //html-loader将HTML导出为字符串，处理html中的img，结合url-loader可以将html中的img的路径正确打包
              options: {
                //laoder配置
                attributes: true, //默认true,启用/禁用元素src,hrdf,data等属性处理,如img的src属性
                esMoudle: false, //默认false,是否使用ES模块语法
              },
            },
          ],
        },
        {
          // 如果html要使用img，url-loader里esModule需要设置为false
          // 否则打包后的html中，img的src为[object Module]
          test: /\.(gif|png|jpe?g|svg)$/i,
          // exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: "url-loader", //见文件转为base64编码
              options: {
                esModule: false, // 不加的话会有这种情况 img属性src="[object Module]"
                //limit: 8 * 1024,//当大于8 * 1024kb时候，将文件打包到publicPath中
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          use: [
            {
              loader: "vue-loader",
            },
          ],
        },
        // { test: /\.svg/, loader: "svg-url-loader" },
        {
          test: /\.(woff|eot|ttf)\??.*$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "url-loader",
            options: {
              name: `${
                cfg.build.assetsSubDirectory
              }/font/[name].[hash:7].[ext]`,
              limit: 8192,
            },
          },
        },
      ],
    },
    //以何种方式定义webpack构建过程
    plugins: [
      new VueLoaderPlugin(),
      //HtmlWebpackPlugin 插件:1.生成一个或者多个html入口文件,2.为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
      new HtmlWebpackPlugin({
        hash: true, //js文件生成hash值
        baseTagUrl: "../",
        template: resolve("src/index.html"), //模板所在路径
        filename: "./index.html", //输出文件名
        // title:"",//html标题名
        chunks: ["main", "vendor", "commons", "manifest"], //多入口js文件
        inject: true, //script注入html的位置，默认底部;head:位于head标签内
        minify:
          argv.mode !== "production"
            ? undefined
            : {
                removeComments: true, //移除注释
                collapseWhitespace: true, //去除空格
                removeAttributeQuotes: true, //移除属性引号
                minifyCSS: true, //压缩CSS
                minifyJS: true, //压缩JS
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
              },
      }),
      // new webpack.HotModuleReplacementPlugin(), // 启用 热更新
      // ...getHtmlWebpackPlugins(argv),// 镜像html文件
      new webpack.LoaderOptionsPlugin({
        options: {
          htmlLoader: {
            root: resolve("./src"), // 对于html中的绝对路径进行定位， /assets/a.jpg => path.resolve(__dirname, '/src/assets/a.jpg')
          },
        },
      }),
      new webpack.DefinePlugin({
        APPID: '"citywarn"', //系统标识
        COMAPI: '"comapi"', //网关标识
        uni: "false", //兼容App组件
      }),
    ],
  };
};
