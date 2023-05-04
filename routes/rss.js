const express = require("express");
const postsService = require("../services/posts-service");
const feedsService = require("../services/feeds-service");

const rssRoutes = express.Router();

rssRoutes.get("/", async (req, res) => {
  const params = {};
  const feed = await feedsService.getByLink(req.query.link);

  if (feed) {
    params.feedId = feed.id;
  } else {
    res.status(404).send("Feed not found");
  }

  if (req.query.limit) {
    params.limit = Number(req.query.limit);
  }
  if (req.query.offset) {
    params.offset = Number(req.query.offset);
  }
  if (req.query.text) {
    params.limit = req.query.text;
  }

  const posts = await postsService.get(params);
  res.json(posts);
});

module.exports = rssRoutes;
