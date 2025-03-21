// models/CrochetSize.ts
module.exports = (sequelize, DataTypes) => {
  const CrochetSize = sequelize.define(
    "CrochetSize",
    {
      id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      crochetId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "crochets",
          key: "id",
        },
      },
      sizeId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "sizes",
          key: "id",
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "crochet_sizes",
      timestamps: true,
    }
  );

  return CrochetSize;
};
