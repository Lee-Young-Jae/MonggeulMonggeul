const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(40),
          allowNull: true,
          unique: true,
        },
        kakaoId: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
        profileImage: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
        updatedAt: false,
      }
    );
  }
  static associate(db) {
    db.User.belongsToMany(db.Group, { through: "UserGroup" });
    db.User.hasMany(db.Vote);
  }
}

module.exports = User;
