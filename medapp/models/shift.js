export default (sequelize, DataTypes) => {
  const Shift = sequelize.define(
    "Shift",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "patients",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      tableName: "shifts",
    }
  );

  return Shift;
};
