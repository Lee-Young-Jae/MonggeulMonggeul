const { Model, DataTypes } = require("sequelize");

class AppointmentTimeVote extends Model {
  static init(sequelize) {
    return super.init(
      {
        // 날짜
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        // 시간
        time: {
          type: DataTypes.TIME,
          allowNull: false,
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
      foreignKey: "appointmentId",
      targetKey: "id",
    });

    db.AppointmentTimeVote.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "id",
    });
  }
}

module.exports = AppointmentTimeVote;
