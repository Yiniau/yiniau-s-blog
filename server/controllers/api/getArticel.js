const {
  getArticleByTitle,
  MongoClient,
} = require('../../lib/db.js');

module.exports = {
  'GET /api/getArticle': async (ctx, next) => {
    const title = ctx.request.body.title;
    ctx.response.body = getArticleByTitle(title, MongoClient);
  }
};