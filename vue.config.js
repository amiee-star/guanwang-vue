const webpack = require("webpack");
// const router = require("./src/router");
let path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 选项...
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
  },
  productionSourceMap: process.env.NODE_ENV !== "production", //默认true，设置上线后是否加载webpack文件，线上不需要加载 webpack文件
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "assets", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: "index.html", //默认为 index.html
  lintOnSave: false,
  devServer: {
    open: false,
    proxy: "http://mo.3dyunzhan.com",
    // 陈本地
    // proxy: "http://192.168.20.156:8091",
    // 何苗本地
    // proxy: "http://192.168.20.104:8091",
    // proxy: "http://192.168.10.112:8091",
  },
  chainWebpack: (config) => {
    // key,value自行定义，比如.set('@@', resolve('src/components'))
    config.resolve.alias
      .set("@", resolve("src"))
      .set("web", resolve("src/views/web"))
      .set("mobile", resolve("src/views/mobile"));

    const svg = config.module.rule("svg");
    svg.uses.clear();
    svg
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });

    config.performance.set("maxEntrypointSize", 1024 * 1024);
    config.performance.set("maxAssetSize", 1024 * 1024 * 2);
    // config.performance.set("assetFilter", (name) => name.endsWith(".js"));

    config.optimization.splitChunks({
      cacheGroups: {
        common: {
          name: "chunk-common", // 打包后的文件名
          chunks: "initial", //
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          reuseExistingChunk: true,
        },
        vendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    });
  },
  // pluginOptions: {
  //   sitemap: {
  //     baseURL: 'https://3dyunzhan.com',
  //     routes: router,
  //   }
  // }
};
