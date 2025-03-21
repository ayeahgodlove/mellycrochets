// models/Post.ts
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      readTime: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      publishedAt: {
        type: DataTypes.DATE,
      },
      authorId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      crochetTypeId: {
        type: DataTypes.STRING(128),
        allowNull: false,
        references: {
          model: "crochet_types",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "posts",
      timestamps: true,
    }
  );

  return Post;
};
