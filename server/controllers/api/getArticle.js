
const {
  getArticleByTitle,
  MongoClient,
} = require('../../lib/db.js');

const marked = require('../../config/markedConfig.js');

module.exports = {
  'GET /api/getArticle': async (ctx, next) => {
    const titleUTF8 = ctx.request.header.referer.split('/').pop();
    const title = decodeURI(titleUTF8);
    // console.log(`the article's title : ${title}`);
    const docs = await getArticleByTitle(title, MongoClient);
    // console.log(docs);

    // markdown parse
    docs[0].content = await marked(docs[0].content);
    // console.log(docs);
    ctx.response.body = docs;
  }
};