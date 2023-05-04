"use strict";
const { Model } = require("sequelize");
const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      post: DataTypes.TEXT,
      feedId: DataTypes.STRING,
      guid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  Post.beforeCreate((post) => (post.id = v4()));
  return Post;
};
