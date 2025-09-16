"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("shifts", "patient");
  },
  down: async (queryInterface, Sequelize) => {
    // En caso de que necesites revertir, este comando la agregará de vuelta.
    await queryInterface.addColumn("shifts", "patient", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
