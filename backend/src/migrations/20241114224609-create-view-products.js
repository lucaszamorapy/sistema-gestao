"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE VIEW viewproducts AS
      SELECT
        p.product_id,
        t.name as type_name,
        p.name,
        p.description,
        p.price,
        p.image
      FROM products p
      LEFT JOIN types t ON p.type_id = t.type_id
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("DROP VIEW IF EXISTS viewproducts;");
  },
};
