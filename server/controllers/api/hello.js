// get to '/api/hello/:name'
module.exports = {
  'GET /api/hello/:name': (ctx, next) => {
    ctx.body = `<h2>hello ${ctx.params.name}</h2>`;
  },
}
