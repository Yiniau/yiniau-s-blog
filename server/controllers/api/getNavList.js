const {
  getTitlesByCategory,
  getAllCategories,
  MongoClient,
} = require('../../lib/db.js');

module.exports = {
  'GET /api/getNavList': async (ctx, next) => {
    try {
      const cateList = await getAllCategories(MongoClient);
      const navTree = {};
      // cateList.map(async cate => navTree[cate] = await getTitlesByCategory(cate, MongoClient));
      for (let i = cateList.length - 1; i >= 0; i -= 1) {
        const cate = cateList[i];
        navTree[cate] = await getTitlesByCategory(cate, MongoClient);
      }
      ctx.response.body = navTree;
    } catch (e) {
      console.error(e);
    }
  }
};
