"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('cartItems', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("cart_items", {
      id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      crochetId: {
        type: Sequelize.STRING(128),
        allowNull: false,
        references: {
          model: "crochets",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.STRING(128),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('cartItems');
     */
    await queryInterface.dropTable("cart_items");
  },
};
