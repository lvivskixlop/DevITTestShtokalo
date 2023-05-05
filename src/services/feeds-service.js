const db = require("../models/index");
const { XMLBuilder } = require("fast-xml-parser");

module.exports = {
  create: async (feed) => {
    const newFeed = await db.Feed.build({ link: feed.rss.channel.link });
    const builder = new XMLBuilder();
    delete feed.rss.channel.item;
    newFeed.feed = builder.build(feed);
    await newFeed.save();

    return newFeed;
  },

  get: async (id) => {
    return await db.Feed.findOne({ where: { id } });
  },

  getByLink: async (link) => {
    const linkObject = new URL(link);
    return await db.Feed.findOne({ where: { link: linkObject.origin } });
  },

  update: async (id, newFeed) => {
    const feed = await db.Feed.findOne({
      where: { id },
    });
    feed.feed = newFeed.feed;
    feed.link = newFeed.link;
    await feed.save();
  },

  delete: async (feedId) => {
    await db.Feed.destroy({ where: { feedId } });
    await db.Post.destroy({ where: { feedId } });
  },
};
