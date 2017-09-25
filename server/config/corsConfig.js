// koa-cors config object
// white list
const whiteList = [
  'http://localhost:3000',
  'http://yiniau.com',
  'http://yiniau.com:5000',
  'http://yiniau.com:8090',
  'http://45.77.16.113:5000',
  'http://45.77.16.113:8090',
];

module.exports = {
  origin: whiteList,
};