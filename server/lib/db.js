"use strict"
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const {
  getPaths,
} = require('./utils');
const {
  mdArticles
} = require('../../config/paths');

const DB_SERVER_URL = process.env.NODE_ENV === 'production' ?
  'mongodb://db:27017' : 'mongodb://localhost:27017';

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
 * 获取对应collection，返回collection和db连接
 * @param name collection 的名字
 * @param MC MongoClient
 * @returns {Promise}
 */
async function getCollection(name, MC) {
  try {
    const db = await MC.connect(`${DB_SERVER_URL}/blog`);
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
 * @returns {Promise}
 */
async function saveArticles(fullDir, MC) {
  try {
    fullDir.forEach(async d => {
      try {
        const {db, col} = await getCollection('articles', MC);
        const data = await es7FsOpen(d[0]);
        const stat = fs.statSync(d[0]);
        const result = await col.insert({
          title: d[2],
          tags: d[1],
          categories: d[1],
          content: data.toString(),
          putTime: stat.birthtime,
          editTime: stat.atime,
        });
        db.close();
      } catch (e) {
        console.error(e);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * 通过 title 获取 article
 * @param title {String} article's title
 * @param MC {MongoClient} MongoClient
 * @returns {Promise} 完整的 article 的对象描述符
 */
async function getArticleByTitle(title, MC) {
  try {
    const {db, col} = await getCollection('articles', MC);
    const docs = await col.find({title}).toArray();
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
 * @returns {Promise} 包含了 mongodb 中储存文章的 _id 和 title 的对象数组
 */
async function getTitlesByTags(tags, MC) {
  try {
    const {db, col} = await getCollection('articles', MC);
    const docs = await col.find({tags}, {title: 1}).toArray();
    db.close();
    return docs;
  } catch (e) {
    console.error(e);
  }
}

/**
 * 获取全部的categotie
 * @param MC {MongoClient} MongoClient
 * @returns {Promise} [categories]
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

module.exports = {
  MongoClient,
  saveArticles,
  getArticleByTitle,
  getTitlesByTags,
  getAllCategories,
  getTitlesByCategory,
};
