"use strict"
// const mongoose = require('mongoose');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const {
  getArticleDir,
  obj2KeyValue,
} = require('./utils');
const {
  mdArticles
} = require('../../config/paths');


/**
 * 为了使用 async 函数打开文件的 polyfill
 *    出问题了会 reject err 并 return null。
 * @param url {String} 文件字符串路径
 * @returns {Promise}
 */
const es7FsOpen = url => {
  return new Promise((reslove, reject) => {
    fs.readFile(url, (err, data) => {
      if (err) {
        reject(err);
        return null;
      }
      reslove(data);
    });
  });
};


/**
 * 对两层的文章地址进行处理，获得完整地址
 *  eg： /usr/admin/db/articles/xxx.md
 * @returns {*}
 */
function getFullDir() {
  const dir = obj2KeyValue(getArticleDir(mdArticles));
  if (!Array.isArray(dir)) {
    throw new TypeError('dir should be a array or having a map method');
  }
  return dir.map(d => [mdArticles + '/' + d[0], d[1], d[0].split('/')]); // get all articles' full path
}

/**
 * 获取对应collection，返回collection和db连接
 * @param name collection 的名字
 * @param MC MongoClient
 * @returns {Promise.<{db: *, col}>}
 */
async function getCollection(name, MC) {
  try {
    const db = await MC.connect('mongodb://localhost:27017/blog');
    return {
      db,
      col: db.collection(name),
    };
  } catch (e) {
    console.error(e);
  }
}

/**
 * 将所有描述文章的对象存入数据库
 *
 *  约定 store article 的 collection 为 'artiles'
 *
 *  约定格式：
 *    {
 *      title: String,
 *      tags: [String],
 *      categories: String,
 *      content: String,
 *      putTime: String,
 *      editTime: String,
 *    }
 *
 * @param fullDir 存放文章位置的完整地址
 * @param MC MongoClient
 * @returns {Promise.<void>}
 */
async function saveArticles(fullDir, MC) {
  try {
    // {
    //   title: String,
    //   tags: [String],
    //   categories: String,
    //   content: String,
    //   putTime: String,
    //   editTime: String,
    // }
    fullDir.forEach(async d => {
      try {
        const {db, col} = await getCollection('articles', MC);
        const data = await es7FsOpen(d[0]);
        const result = await col.insert({
          title: d[1],
          tags: [],
          categories: d[2][0],
          content: data.toString(),
          putTime: new Date(),
          editTime: new Date(),
        });
        console.log(result);
        db.close();
      } catch (e) {
        console.error(e);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

async function saveData(data, col) {

}

/**
 * 通过 title 获取 article
 * @param title {String} article's title
 * @param MC {MongoClient} MongoClient
 * @returns {Promise.<*>} 完整的 article 的对象描述符
 */
async function getArticleByTitle(title, MC) {
  try {
    const {db, col} = await getCollection('articles', MC);
    const docs = await col.find({title}).toArray();
    // console.log(docs);
    db.close();
    return docs;
  } catch (e) {
    console.error(e);
  }
}

/**
 * 通过 tags 获取 article 的 title
 * @param tags {[String]} article's tags
 * @param MC {MongoClient} MongoClient
 * @returns {Promise.<*>} 包含了 mongodb 中储存文章的 _id 和 title 的对象数组
 */
async function getTitlesByTags(tags, MC) {
  try {
    const {db, col} = await getCollection('articles', MC);
    const docs = await col.find({tags}, {title: 1}).toArray();
    // console.log(docs);
    db.close();
    return docs;
  } catch (e) {
    console.error(e);
  }
}

/**
 * 获取全部的categotie
 * @param MC {MongoClient} MongoClient
 * @returns {Promise.<*>} [categories]
 */
async function getAllCategories(MC) {
  try {
    const {db, col} = await getCollection('articles', MC);
    const docs = await col.find({}, {_id: 0, categories: 1}).toArray();
    const categories = docs.map(item => item.categories);
    db.close();
    return Array.from(new Set(categories)); // 去重并返回categories数组
  } catch (e) {
    console.error(e);
  }
}

/**
 * 通过categories标签获得所有文章的title
 * @param cate {String} categroies
 * @param MC {MongoClient} MongoClient
 * @returns {Promise.<void>} [String]
 */
async function getTitlesByCategory(cate, MC) {
  try {
    const {db, col} = await getCollection('articles', MC);
    const docs = await col.find({categories: cate}, {_id: 0, title: 1}).toArray();
    db.close();
    return docs.map(item => item.title);
  } catch (e) {
    console.error(e);
  }
}

// getTitlesByCategory('docker', MongoClient).then(data => console.log(data));

module.exports = {
  MongoClient,
  saveArticles,
  saveData,
  getArticleByTitle,
  getTitlesByTags,
  getAllCategories,
  getTitlesByCategory,
};
