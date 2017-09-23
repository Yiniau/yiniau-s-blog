/* eslint-disable strict */


const fs = require('fs');
const paths = require('../config/paths');
const crypto = require('crypto');
const {
  red,
  blue,
  green,
  yellow,
} = require('chalk');
const {
  cd,
  echo,
  exec,
  which,
} = require('shelljs');

const {
  getPaths,
// } = require(paths.appLib);
} = require('../server/lib/utils');

const {
  log,
  error,
  dir,
  table,
  group,
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
 *   储存结构为数组[[map.key, map.value]]
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
        wstream.write('module.exports = [\n');
        FILE_HASH_MAP.forEach((v, k) => {
          // 当对象属性key中含有中文时似乎会引发编码混乱
          // 因此储存为文件的时候选择了将md5作为key
          wstream.write(`\r\r['${k}', '${v}'],\n`);
        });
        wstream.end(']');
      }
    });
  } catch (e) {
    error(e)
  }

  // fs.watch(paths.mdArticles + '/javascript', watchConfig, (eventType, filename) => {
  // })
}

/**
 * 将map反向存储在hash.js中的数据对象还原成
 * @param arr
 * @returns {Map}
 */
function restoreStructure(arr) {
  return new Map(arr);
}

/**
 * 通过对比md5值判断需要被推送到服务器的文件
 *    约定：
 *      远端服务器的hash文件名称为 hash.js, 储存到本地并重命名为 remote.hash.js
 * @returns {Array}
 */
function getChangedFilesList() {
  if (!which('scp')){
    throw new Error('commond scp not exsited');
  }
  exec('scp -v yiniau@45.77.16.113:~/github/yiniau-s-blog/articles/hash.js ~/github/yiniau-s-blog/articles/remote.hash.js');
  const remoteHash = require(paths.mdArticles + '/remote.hash.js');
  const localHash = require(paths.mdArticles + '/hash.js');

  const remoteHashMap = restoreStructure(remoteHash);
  const localHashMap = restoreStructure(localHash);

  const pushList = [];
  localHashMap.forEach((v, k) => {
    if (remoteHashMap.has(k)) {
      remoteHashMap.get(k) === v || pushList.push(v);
    } else {
      pushList.push(v);
    }
  });
  return pushList;
}

function pushToRemote (user, ip) {
  exec('clear');
  log(`now push.js run in ${blue(process.cwd().toString())}`);
  const path = paths.mdArticles + '/hash.js';

  // 更新hash.js文件
  log('making hash.js first...');
  setFileMap(paths.mdArticles);
  makeHashFile(paths.mdArticles);
  log(`... ${green('down')}`);

  // 上传
  try {
    log(`the files should be pushed :`);
    const fileList = getChangedFilesList();
    for (let fn of fileList) {
      log('  ' + yellow(fn) + '  ...');
      exec(`scp -v ${paths.mdArticles}/${fn} ${user}@${ip}:~/github/yiniau-s-blog/articles/${fn}`);
    }
  } catch (e) {
    error(e)
  }
}

// pushToRemote();

log(`now push.js run in ${blue(process.cwd().toString())}`);
log(`the file should be push was :`);
for (let fn of ['asd','asd','aaaaa','asdewfas']) {
  log('    ' + green(fn));
}