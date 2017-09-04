const {
  getTitlesByTags,
  MongoClient,
} = require('../../lib/db.js');

module.exports = {
  'POST /api/getTitlesByTags': async (ctx, next) => {
    const tags = ctx.request.body.tags;
    const docs = await getTitlesByTags(JSON.parse(tags), MongoClient);
    ctx.response.body = docs;
  }
};