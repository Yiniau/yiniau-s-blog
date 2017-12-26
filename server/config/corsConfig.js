// koa-cors config object
// white list
const whiteList = process.env.NODE_ENV === 'production' ?
  [
    'https://yiniau.com',
    'https://test.yiniau.com',
    'http://192.168.1.104:9999',
  ] : '*';

module.exports = {
  origin: whiteList,
};
