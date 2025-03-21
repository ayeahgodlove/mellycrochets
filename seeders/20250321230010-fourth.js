'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { nanoid } = await import("nanoid");
    await queryInterface.bulkInsert('crochet_sizes', [
      {
        id: nanoid(20),
        crochetId: '8aqX5MgWFCk2OiL8F-F8', // replace with actual ID from crochet seed
        sizeId: '42E8oRMbpz77SawFNOIt', // replace with actual XS/S/M ID
        price: 45.00,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: nanoid(20),
        crochetId: '8W4DqZVMjdGeXpzEPBzs',
        sizeId: 'ElH36Yi0ju34pNnadPHm',
        price: 50.00,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: nanoid(20),
        crochetId: '8W4DqZVMjdGeXpzEPBzs',
        sizeId: 'ercDCNBCVRm9p0sv26K1',
        price: 65.00,
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('crochet_sizes', null, {});
  }
};
