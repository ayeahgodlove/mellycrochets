"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { nanoid } = await import("nanoid");

    await queryInterface.bulkInsert("sizes", [
      {
        id: nanoid(20),
        label: "XS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(20),
        label: "S",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(20),
        label: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(20),
        label: "L",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(20),
        label: "XL",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(20),
        label: "XXL",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("sizes", null, {});
  },
};
