const express = require("express");
const rssRoutes = require("./rss");
const loginRoutes = require("./login");

const apiRouter = express.Router();

apiRouter.use("/rss", rssRoutes);
apiRouter.use("/authenticate", loginRoutes);

module.exports = apiRouter;
