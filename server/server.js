const Koa = require('koa');
const compose = require('koa-compose');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

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
const SERVER_PORT = 3090;


//========= Pretreatment =============================
app.use(compose([
  cors(require(`${appServerConfig}/corsConfig.js`)),
  logger(),
  // bodyParser(require(`${appServerConfig}/bodyParserConfig.js`)),R
]));
//====================================================

/***///===============================================
/***/  console.log('\r');
/***/  console.log('pretreatment finished');
/***/  console.log('\r');
/***///===============================================

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
