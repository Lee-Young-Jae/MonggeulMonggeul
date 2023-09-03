const { Model, DataTypes } = require("sequelize");
class GroupInviteCode extends Model {
  static init(sequelize) {
    return super.init(
      {
        code: {
          type: DataTypes.STRING(25),
          allowNull: false,
          unique: true,
        },

        expiredAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        expireCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        status: {
          type: DataTypes.STRING(10),
          allowNull: false,
          defaultValue: "valid",

          validate: {
            isIn: [["valid", "invalid"]],
          },

          comment: "valid: 유효한 초대 코드, invalid: 유효하지 않은 초대 코드",

          get() {
            return this.getDataValue("status");
          },
        },
      },
      {
        modelName: "GroupInviteCode",
        tableName: "group_invite_codes",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
        updatedAt: false,
      }
    );
  }
  static associate(db) {
    db.GroupInviteCode.belongsTo(db.Group);
    db.GroupInviteCode.belongsTo(db.User);
  }
}

module.exports = GroupInviteCode;
