// models/Size.ts
module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define(
    "Size",
    {
      id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "sizes",
      timestamps: true,
    }
  );

  return Size;
};
