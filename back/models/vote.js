const { Model, DataTypes } = require("sequelize");

class Vote extends Model {
  static init(sequelize) {
    return super.init(
      {
        isAgree: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      {
        modelName: "Vote",
        tableName: "votes",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
        updatedAt: false,
      }
    );
  }
  static associate(db) {
    db.Vote.belongsTo(db.Poll);
    db.Vote.belongsTo(db.User);
  }
}

module.exports = Vote;
