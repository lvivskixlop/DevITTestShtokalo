const db = require("../models/index");
const { XMLParser, XMLBuilder } = require("fast-xml-parser");
const { Op } = require("sequelize");

module.exports = {
  createOrUpdatePostsById: (id, items) => {
    items.forEach(async (item) => {
      const post = await db.Post.findOne({
        where: { guid: item.guid, feedId: id },
      });
      if (!post) {
        const builder = new XMLBuilder();
        const newPost = await db.Post.build({
          post: builder.build(item),
          feedId: id,
          guid: item.guid,
        });
        await newPost.save();
      }
    });
  },

  create: async (post) => {
    const parser = new XMLParser();
    const newPost = await db.Post.build(post);
    newPost.guid = parser.parse(newPost.post)?.guid || null;
    await newPost.save();
  },

  get: async (params) => {
    const conditions = { where: {} };

    if (params.limit) {
      conditions.limit = params.limit;
    }
    if (params.offset) {
      conditions.offset = params.offset * params.limit;
    }

    if (params.feedId) {
      conditions.where.feedId = params.feedId;
    }
    if (params.guid) {
      conditions.where.guid = params.guid;
    }
    if (params.text) {
      //TODO search not including tags
      conditions.where.post = {
        [Op.like]: "%" + params.text + "%",
      };
    }

    return await db.Post.findAndCountAll(conditions);
  },

  getOne: async (guid) => {
    return await db.Post.findOne({ where: { guid } });
  },

  update: async (post) => {
    const newPost = await db.Post.findOne({
      where: { id: post.id },
    });
    newPost.post = post.post;
    newPost.feedId = post.feedId;
    newPost.guid = post.guid;
    await newPost.save();
  },

  delete: async (id, feedId) => {
    const conditions = { where: {} };
    if (feedId) {
      conditions.where.feedId = feedId;
    }
    if (id) {
      conditions.where.id = id;
    }

    await db.Post.destroy(conditions);
  },
};
