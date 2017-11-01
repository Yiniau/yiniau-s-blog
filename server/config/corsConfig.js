// koa-cors config object
// white list
const whiteList = process.env.NODE_ENV === 'production' ?
  [
    'https://yiniau.com',
    'https://test.yiniau.com',
  ] : '*';

module.exports = {
  origin: whiteList,
};
