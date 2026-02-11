// models/Contact.ts
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "contacts",
      timestamps: true,
    }
  );

  return Contact;
};
