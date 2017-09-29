module.exports = {
  maxage: 24 * 60 * 60 * 1000,           // 缓存一天
  hidden: false,       // 允许传输隐藏文件。默认为false
  index: 'index.html', // Default file name, defaults to 'index.html'
  defer: false,        // If true, serves after return next(), 允许下游中间件先响应。
  gzip: true,          // 尝试在客户端支持gzip时自动提供gzip压缩的文件，如果存在.gz扩展名的请求文件。默认为true。
  extensions: false,   // 尝试匹配传递数组的扩展名，以便在URL中没有扩展名时搜索文件。首先找到了。 （默认为false）
};