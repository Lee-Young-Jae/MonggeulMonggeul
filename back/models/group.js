const { Model, DataTypes } = require("sequelize");
class Group extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING(25),
          allowNull: false,
          unique: true,
        },
      },
      {
        modelName: "Group",
        tableName: "groups",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
        updatedAt: false,
      }
    );
  }
  static associate(db) {
    db.Group.belongsToMany(db.User, { through: "UserGroup" });
    db.Group.hasMany(db.Appointment, {
      foreignKey: "groupCode",
      sourceKey: "code",
    });
  }
}

module.exports = Group;
