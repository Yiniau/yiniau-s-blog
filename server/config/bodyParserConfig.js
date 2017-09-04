// koa-bodyparser set object
module.exports = {
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  }
}