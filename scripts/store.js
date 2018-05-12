import fs from "fs";
import { MongoClient as MC } from "mongodb";
import { mdArticles, appLib } from "../config/paths";

const { getFullDir, getPaths } = require(appLib + '/utils');
const { saveArticles } = require(appLib + '/db');

saveArticles(getFullDir(fs, mdArticles), MC);
