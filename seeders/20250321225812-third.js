"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { nanoid } = await import("nanoid");
    await queryInterface.bulkInsert("crochets", [
      {
        id: nanoid(20),
        name: "Handmade Summer Dress",
        description:
          "A lightweight crochet summer dress perfect for casual outings.",
        crochetTypeId: "dU2pKy4TfNwZqRaLbXsj", // replace with actual id
        imageUrls: JSON.stringify([
          "product-template.png",
          "product-template2.png",
        ]),
        color: "Red",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(20),
        name: "Chunky Knit Sweater",
        description: "Warm and stylish crochet sweater ideal for cold weather.",
        crochetTypeId: "kP1xY9mLs0zW4vRQeTnB", // replace with actual id
        imageUrls: JSON.stringify([
          "product-template3.png",
          "product-template4.png",
        ]),
        color: "Cream",
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
    await queryInterface.bulkDelete("crochets", null, {});
  },
};
