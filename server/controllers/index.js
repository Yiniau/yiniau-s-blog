const fs = require('fs');
const paths = require('../../config/paths.js');

const filePaths = fs
  .readdirSync(`${paths.appServerControllers}/api`, 'utf8')
  .filter(f => f.endsWith('.js'));

if (!filePaths) {
  module.exports = new Error('file reads failed');
} else {
  // 自动导出所有路由
  module.exports = filePaths.map((path) => require(`./api/${path}`));

  if (process.env.NODE_ENV !== 'production') {
    console.log('===========the file paths array============');
    console.log(module.exports);
    console.log('===========================================');
  }
}

