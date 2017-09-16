// koa-cors config object
// white list
const whiteList = [
  'http://localhost:3000',
];

module.exports = {
  origin: whiteList,
};