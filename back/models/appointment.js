const { Model, DataTypes } = require("sequelize");
class Appointment extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(20),
        },
        description: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        // 진행시간
      },
      {
        modelName: "Appointment",
        tableName: "appointments",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
        updatedAt: false,
      }
    );
  }
  static associate(db) {
    db.Appointment.belongsTo(db.Group, {
      foreignKey: "groupCode",
      targetKey: "code",
    });
    db.Appointment.belongsTo(db.User, {
      foreignKey: "hostId",
      targetKey: "id",
    });
  }
}

module.exports = Appointment;
