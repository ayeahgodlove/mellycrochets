// models/crochet.ts

module.exports = (sequelize, DataTypes) => {
  const crochet = sequelize.define(
    "crochet",
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      crochetTypeId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "crochet_types",
          key: "id",
        },
      },
      imageUrls: {
        type: DataTypes.JSON, // Stores multiple image URLs
      },
      color: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "crochets",
      timestamps: true,
    }
  );
  return crochet;
};
