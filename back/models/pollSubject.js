const { Model, DataTypes } = require("sequelize");

class PollSubject extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        modelName: "PollSubject",
        tableName: "pollSubjects",
        charset: "utf8mb4",
        collate: "utf8_general_ci",
        timestamps: false,
        sequelize,
      }
    );
  }
  static associate(db) {
    db.PollSubject.belongsTo(db.Poll);
    db.PollSubject.hasMany(db.Vote);
  }
}

module.exports = PollSubject;
