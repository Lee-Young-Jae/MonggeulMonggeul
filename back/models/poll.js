const { Model, DataTypes } = require("sequelize");

class Poll extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },

        isMultiple: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        isAnonymous: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        closedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
      },
      {
        modelName: "Poll",
        tableName: "polls",
        charset: "utf8",
        collate: "utf8_general_ci",
        updatedAt: false,
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Poll.belongsTo(db.Group);
    db.Poll.hasMany(db.PollSubject);
  }
}

module.exports = Poll;
