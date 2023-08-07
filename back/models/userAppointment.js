const { Model, DataTypes } = require("sequelize");

class UserAppointment extends Model {
  static init(sequelize) {
    return super.init(
      {
        start_date_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        modelName: "UserAppointment",
        tableName: "user_appointments",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
        updatedAt: false,
      }
    );
  }
  static associate(db) {
    db.UserAppointment.belongsTo(db.User);
    db.UserAppointment.belongsTo(db.Appointment);
  }
}

module.exports = UserAppointment;
