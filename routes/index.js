const express = require("express");
const rssRoutes = require("./rss");

const apiRouter = express.Router();

apiRouter.use("/rss", rssRoutes);

module.exports = apiRouter;
