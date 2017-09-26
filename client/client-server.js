const fs = require('fs');
const Koa = require('koa');
const compose = require('koa-compose');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const morgan = require('koa-morgan');
const paths = require('../config/paths');


// TODO: 从http转移到https
const app = new Koa();

// define constants
let SERVER_PORT = 5000;
if (process.env.NODE_ENV !== "production") {
  SERVER_PORT = process.env.PORT || 5000;
}

//========= Pretreatment =============================
app.use(compose([
  require('koa-static')(paths.appBuild, require('./config/staticServerConfig')),
]));
app.use(async (ctx, next) =>{
  ctx.type = 'html';
  ctx.body = await fs.createReadStream(paths.appBuild + '/index.html');
});
//====================================================


//============ app listen ============================
app.listen(SERVER_PORT);
//====================================================

console.log(`app listened on ${SERVER_PORT}`);
