const { Model, DataTypes, NUMBER } = require("sequelize");
class Appointment extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(20),
        },
        sub_title: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        // 가능 시간 start 0000 ~ 2359
        start_date_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        // 가능 시간 end 0000 ~ 2359
        end_date_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        // appointment 고유 코드
        code: {
          type: DataTypes.STRING(25),
          allowNull: false,
          unique: true,
        },
        // 진행상태
        status: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        // 마감시간
        deadline: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        // 진행시간
        duration_minutes: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
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
