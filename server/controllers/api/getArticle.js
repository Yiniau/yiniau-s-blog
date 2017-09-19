
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
    let docs = await getArticleByTitle(title, MongoClient);
    // console.log(docs);

    // markdown parse
    if (docs[0].content) {
      docs[0].content = await marked(docs[0].content);
    } else {
      docs = '<h3>There seems to be a mistake</h3>';
    }
    // console.log(docs);
    ctx.response.body = docs;
  }
};