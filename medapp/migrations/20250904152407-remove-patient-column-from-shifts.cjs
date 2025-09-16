"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("shifts", "patient");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shifts", "patient", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
