const db = require("../models/index");
const { XMLBuilder } = require("fast-xml-parser");
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
    const newPost = await db.Post.build(post);
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

  update: async (feedId, newPost) => {
    const post = await db.Post.findOne({
      where: { guid: newPost.guid, feedId },
    });
    post.post = newPost.post;
    post.feedId = newPost.feedId;
    post.guid = newPost.guid;
    await post.save();
  },

  delete: async (feedId, guid) => {
    const conditions = { where: {} };
    if (feedId) {
      conditions.where.feedId = feedId;
    }
    if (guid) {
      conditions.where.guid = guid;
    }

    await db.Post.destroy(conditions);
  },
};
