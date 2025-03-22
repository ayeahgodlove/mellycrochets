// models/CartItem.ts
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      crochetId: {
        type: DataTypes.STRING(128),
        allowNull: false,
        references: {
          model: "crochets",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.STRING(128),
        allowNull: false,
        references: {
          model: "users",
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
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "cart_items",
      timestamps: true,
    }
  );

  return CartItem;
};
