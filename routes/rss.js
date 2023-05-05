const express = require("express");
const postsService = require("../services/posts-service");
const feedsService = require("../services/feeds-service");

const rssRoutes = express.Router();

rssRoutes.get("/", async (req, res) => {
  try {
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
      params.text = req.query.text;
    }

    const posts = await postsService.get(params);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

rssRoutes.post("/", async (req, res) => {
  try {
    await postsService.create(req.body);
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

rssRoutes.put("/", async (req, res) => {
  try {
    await postsService.update(req.body);
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

rssRoutes.delete("/", async (req, res) => {
  try {
    await postsService.delete(req.query.id);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = rssRoutes;
