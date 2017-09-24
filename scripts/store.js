const fs = require('fs');
const { mdArticles, appLib } = require('../config/paths');
const { getFullDir, getPaths } = require(appLib + '/utils');
const { saveArticles } = require(appLib + '/db');
const MC = require('mongodb').MongoClient;

const { log } = console;

saveArticles(getFullDir(fs, mdArticles), MC);
// log(getFullDir(fs, mdArticles));