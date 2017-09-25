const fs = require('fs');
const Koa = require('koa');
const compose = require('koa-compose');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const morgan = require('koa-morgan');
const paths = require('../config/paths');

// controllers路径
const {
  appServer,
  appServerControllers,
  appServerConfig,
} = require('../config/paths.js');
// 工具函数
const {
  methodMapping,
} = require(`${appServer}/lib/utils.js`);

const app = new Koa();

// define constants
let SERVER_PORT = 8090;
if (process.env.NODE_ENV !== "production") {
  SERVER_PORT = process.env.PORT || 8090;
}

//========= Pretreatment =============================
if (process.env.NODE_ENV !== 'production') {
  app.use(compose([
    cors(require(`${appServerConfig}/corsConfig.js`)),
    logger(),
  ]));
  /***///===============================================
  /***/  console.log('\r');
  /***/  console.log('pretreatment finished');
  /***/  console.log('\r');
  /***///===============================================
} else {
  app.use(compose([
    cors(require(`${appServerConfig}/corsConfig.js`)),
    require('koa-static')(paths.appBuild, require('./config/staticServerConfig')),
    morgan(
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms',
      { stream: fs.createWriteStream('/log/access.log', { flags: 'a' }) }
    ),
  ]));
  // app.use(async (ctx, next) =>{
  //   ctx.type = 'html';
  //   ctx.body = await fs.createReadStream(paths.appBuild + '/index.html');
  // })
  // 将静态资源服务转移到nginx
}
//====================================================


//========= routers about ============================
app.use(methodMapping(
  require('koa-router')(),                    // router
  require(`${appServerControllers}/index.js`) // controllers
).routes());                                  // router.routes
//====================================================

//============ app listen ============================
app.listen(SERVER_PORT);
//====================================================

console.log(`app listened on ${SERVER_PORT}`);
