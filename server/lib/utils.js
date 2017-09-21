const fs = require('fs');
const paths = require('../../config/paths.js');

/**
 * 路由注册函数
 * @param  {Object} router  koa-router的实例
 * @param  {Object} mapping key为请求路径，value为方法体的对象
 * @reutrn {Object} router  传入的router实例
 */
function methodMapping(router, mapping) {
  mapping.map((handler) => {
    const url = Object.keys(handler)[0];
    if (url.startsWith('GET')) {
      const path = url.substring(4); // 截取路径
      router.get(path, handler[url]); // register router
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST')) {
      const path = url.substring(5);
      router.post(path, handler[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
    return null;
  });
  console.log('\r');
  return router;
}

/**
 * 文件树路径解析函数
 * @param {String} path 需要解析的根路径
 * @return {Object} 文件树对象
 */
function getArticleDir(path) {
  const paths = fs.readdirSync(path);
  const dir = Object.create(null);
  paths.map((p) => {
    if (p.endsWith('.md')) {
      dir[p] = p;
      return null;
    }
    dir[p] = getArticleDir(`${path}/${p}`);
    return null;
  });
  return dir;
}

/**
 * 将2层的文件树对象转换成单层的数组
 * @param dir {Object} 两层的文件树
 * @returns {Array}
 */
function obj2KeyValue(dir) {
  const en = Object.entries(dir);
  const result = [];
  en.reduce((res, cur) => {
    Object.keys(cur[1]).map(key => res.push([
      `${cur[0]}/${key}`,
      key.slice(0, -3)
    ]));
    return res;
  }, result);
  return result;
}
// obj2KeyValue(getArticleDir(paths.mdArticles));

/**
 * 将markdown字符串解析成html字符串
 * @param {String} mdString .md 文件解析后的字符串
 * @reutrn {String} 解析后的html字符串
 */
function resolveMarkdown(mdString) {
  const marked = require(`${paths.appServerConfig}/markedConfig.js`);
  return marked(mdString);
}

/**
 * 将h5字符串保存为html文件
 * @method saveAsHTML
 * @param  {String}   h5Str    html 字符串
 * @param  {[type]}   fileName 大写字母开头的用于保存文件的文件名
 */
function saveAsHTML(h5Str, fileName) {
  try {
    let fn = fileName;
    if (fileName.endsWith('.js')) {
      fn = fn.slice(0, -3);
    } else if (fileName.endsWith('.jsx')) {
      fn = fn.slice(0, -4);
    } else {
      throw new Error('invalid file name');
    }

    const fnPath = `${paths.appComponents}/Articles/${fn}`;
    fs.mkdirSync(fnPath);
    // create file
    fs.open(`${fnPath}/index.jsx`, 'wx', (err, fd) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.log('file already exists');
        }
        console.log('something terrible happend');
      }
      // write into file
      fs.writeSync(fd, `
        import React, { Component } from 'react'
        const ${fn} = (props) => {
          return (
            <div id="md-${fn}">
              ${h5Str}
            </div>
          )
        };
        export default ${fn}
      `);
      console.log('==========file options success==========');
      console.log(`${fn} write finished`);
      // close file
      fs.close(fd, (err) => {
        if (err) {
          console.log(err);
        }
      });
      console.log('========================================');
    });
    fs.appendFile(
      `${fnPath}/../index.jsx`,
      `export ${fn} from './${fn}'; \n`,
      (err) => {
        if (err) {
          throw err;
        }
      });
  } catch (err) {
    console.log('============file options err============');
    console.log(err);
    console.log('========================================');
  }
}


module.exports = {
  methodMapping,
  getArticleDir,
  resolveMarkdown,
  saveAsHTML,
  obj2KeyValue,
};
