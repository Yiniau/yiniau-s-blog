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


const FILE_HASH_MAP = new Map();
const WATCH_CONFIG = {
  persistent: true,
  recursive: false,
  encoding: 'utf8',
};
const OPEN_SYNC_CONFIG = {
  flags: 'w+',
  encoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
};
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
      .filter(fn => !fn.endsWith('.js')) // 去掉不需要的文件
      .forEach(function insertIntoMap(dn) { //
        const cfns = fs.readdirSync(`${dir}/${dn}`);
        cfns.forEach(cfn => {
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
          wstream.write(`  '${v}': '${k}',\n`);
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
