const { Model, DataTypes } = require("sequelize");

class AppointmentTimeVote extends Model {
  static init(sequelize) {
    return super.init(
      {
        selectedDate: {
          type: DataTypes.DATE,
        },
      },
      {
        modelName: "AppointmentTimeVote",
        tableName: "appointment_time_votes",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }

  static associate(db) {
    db.AppointmentTimeVote.belongsTo(db.Appointment, {
      foreignKey: "appointmentCode",
      targetKey: "code",
    });

    db.AppointmentTimeVote.belongsTo(db.User);
  }
}

module.exports = AppointmentTimeVote;
