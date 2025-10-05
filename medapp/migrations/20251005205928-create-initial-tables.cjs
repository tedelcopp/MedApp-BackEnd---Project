"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // <--- ASEGÚRATE DE USAR module.exports
  async up(queryInterface, Sequelize) {
    // 1. Creación de la tabla Patients
    await queryInterface.createTable("Patients", {
      // ... tus columnas de Patients ...
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // ... otras columnas ...
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 2. Creación de la tabla Shifts
    await queryInterface.createTable("Shifts", {
      // ... tus columnas de Shifts ...
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Patients",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      // ... otras columnas ...
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Shifts");
    await queryInterface.dropTable("Patients");
  },
};
