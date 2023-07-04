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
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
        updatedAt: false,
      }
    );
  }
  static associate(db) {
    db.Group.belongsToMany(db.User, { through: "UserGroup" });
  }
}

module.exports = Group;
