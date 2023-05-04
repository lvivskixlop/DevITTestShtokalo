const axios = require("axios");
const { XMLParser, XMLBuilder } = require("fast-xml-parser");
const postsService = require("./posts-service");
const feedService = require("./feeds-service");

module.exports = async (url) => {
  if (typeof url !== "string") {
    url = "https://lifehacker.com/rss";
  }

  const urlObject = new URL(url);
  const parser = new XMLParser();

  let feedResponse;
  let items;

  try {
    const response = await axios.get(url);
    feedResponse = parser.parse(response.data);
    items = feedResponse.rss.channel.item;
  } catch (err) {
    console.log(err);
  }

  const feed = await feedService.getByLink(urlObject.origin);
  if (!feed) {
    const newFeed = await feedService.create(feedResponse);
    await postsService.createOrUpdatePostsById(newFeed.id, items);
  } else {
    await postsService.createOrUpdatePostsById(feed.id, items);
  }
};
