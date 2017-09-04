const {

} = require('../../lib/db.js');

module.exports = {
  'POST /api/store': (ctx, next) => {
    const {
      title,
      tags,
      categories,
      content,
      putTime,
      editTime,
    } = ctx.request.body;
    ctx.response.type = 'application/json';
    ctx.response.body = {title, tags};
  }
};