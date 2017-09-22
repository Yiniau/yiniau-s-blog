/* eslint-disable strict */


const fs = require('fs');
const chalk = require('chalk');
const paths = require('../config/paths');
const crypto = require('crypto');

const {
  getPaths,
// } = require(paths.appLib);
} = require('../server/lib/utils');

const {
  log,
  error,
} = console;

// 文章hash映射表
const FILE_HASH_MAP = new Map();
// options of fs.watch()
const WATCH_CONFIG = {
  persistent: true,
  recursive: false,
  encoding: 'utf8',
};
// options of fs.openSync() || fs.open()
const OPEN_SYNC_CONFIG = {
  flags: 'w+',
  encoding: 'utf8',
  mode: 0o666,
};
// options of fs.createWriteStream()
const WRITE_STREAM_CONFIG = {
  flags: 'w+',
  encoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
};


/**
 * 将指定目录的文件内容生成md5码并插入FILE_HASH_MAP
 * @require 文件目录需要为两层，即以文件夹分类。
 * @param dir 文件所在目录
 */
function setFileMap(dir) {
  try {
    fs.readdirSync(dir)
      .filter(fn => !fn.startsWith('.')) // 去掉不需要的文件
      .filter(fn => !fn.endsWith('.js'))
      .forEach(function insertIntoMap(dn) { // 对每个分类文件夹进行访问
        const cfilenames = fs.readdirSync(`${dir}/${dn}`); // 获取每个分类下的文件名
        cfilenames.forEach(cfn => {
          // 读取文件并使用crypto解析成md5码，写入FILE_HASH_MAP映射中
          const buffer = fs.readFileSync(`${dir}/${dn}/${cfn}`);
          const hash = crypto.createHash('md5');
          hash.update(buffer);
          FILE_HASH_MAP.set(`${dn}/${cfn}`, hash.digest('hex'));
        })
      });
  } catch (e) {
    error(e);
  }
}

/**
 * save the FILE_HASH_MAP to local file
 * @param dir
 */
function makeHashFile(dir) {
  const path = dir + '/hash.js';
  const {
    flags,
    mode,
  } = OPEN_SYNC_CONFIG;
  try {
// eslint-disable-next-line strict
    fs.open(path, flags, mode, (err, fd) => {
      if (err) {
        throw new Error('file open error');
      } else {
        const wstream = fs.createWriteStream(path, {...WRITE_STREAM_CONFIG, fd});
        wstream.on('close', () => log('fd or stream had closed'));
        wstream.on('finish', () => log('write stream finished'));
        wstream.write('module.exports = {\n');
        FILE_HASH_MAP.forEach((v, k) => {
          // 当对象属性key中含有中文时似乎会引发编码混乱
          // 因此储存为文件的时候选择了将md5作为key
          wstream.write(`\r\r'${v}': '${k}',\n`);
        });
        wstream.end('}');
      }
    });
  } catch (e) {
    error(e)
  }

  // fs.watch(paths.mdArticles + '/javascript', watchConfig, (eventType, filename) => {
  // })
}

function isFileChanged(dir) {
  fs.readdir()
}

setFileMap(paths.mdArticles);
log(fs.readFileSync(paths.mdArticles + '/hash.js').toString());
makeHashFile(paths.mdArticles);
// FILE_HASH_MAP.forEach((V, K) => {
//   log({V, K});
// });
// const buffer = fs.readFileSync(paths.mdArticles + '/javascript/test-rename.md');
// hash.update(buffer);
// log(hash.digest('hex'));
