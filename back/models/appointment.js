const { Model, DataTypes } = require("sequelize");
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
        // 가능 날짜 start
        start_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        // 가능 날짜 end
        end_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        // 가능 시간 start 00:00 ~ 23:59
        start_time: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        // 가능 시간 end 00:00 ~ 23:59
        end_time: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        // appointment 고유 코드
        code: {
          type: DataTypes.STRING(25),
          allowNull: false,
          unique: true,
        },
        // 진행상태  "진행중", "마감", "취소"
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
