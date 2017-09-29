const fs = require('fs');
const Koa = require('koa');
const compose = require('koa-compose');
const crypto = require('crypto');
const morgan = require('koa-morgan');
const logger = require('koa-logger');
const staticCache = require('koa-static-cache');
const paths = require('../config/paths');


// TODO: 从http转移到https
const app = new Koa();

// define constants
let SERVER_PORT = 5000;
if (process.env.NODE_ENV !== "production") {
  SERVER_PORT = process.env.PORT || 5000;
}
// const hash = crypto.createHash('md5');

//========= Pretreatment =============================
const baseConfig = {
  // maxAge: 24 * 60 * 60,
  buffer: true,
  gzip: true,
  usePrecompiledGzip: true,
  cacheControl: 'private, max-age=86400',
  // filter: file => !file.split('/')[1],
};
app.use(compose([
  logger(),
  staticCache(paths.appBuild, baseConfig),
  // staticCache(`${paths.appBuild}/static/media`, {
  //   ...baseConfig,
  //   cacheControl: `public, max-age: ${365 * 24 * 60 * 60}`,
  // }),
  // staticCache(`${paths.appBuild}/static/css`, baseConfig),
  // staticCache(`${paths.appBuild}/static/js`, baseConfig),
]));
// app.use(async (ctx, next) =>{
//   const data = await fs.createReadStream(paths.appBuild + '/index.html');
//   ctx.type = 'html';
//   // ctx.set('Cache-Control', 'public, max-age=31536000'); // 缓存静态资源
//   // ctx.set('ETags', hash.digest('hex'));
//   ctx.body = data;
// });
//====================================================


//============ app listen ============================
app.listen(SERVER_PORT);
//====================================================

console.log(`app listened on ${SERVER_PORT}`);
